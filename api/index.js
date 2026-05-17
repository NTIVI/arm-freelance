import express from 'express';
import cors from 'cors';
import pg from 'pg';
const { Pool } = pg;
import dotenv from 'dotenv';
dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Initialize Neon PostgreSQL Database Pool
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

// Test Connection
pool.connect((err, client, release) => {
  if (err) {
    console.error('Neon DB connection error in ArmTurn backend:', err.stack);
  } else {
    console.log('ArmTurn Express Backend connected to Neon PostgreSQL successfully!');
    release();
  }
});

// ==========================================
// 1. PUBLIC TRAVEL PATHS & OBJECTS
// ==========================================

// Get all travel routes with their attached objects (hotels & restaurants)
app.get('/api/routes', async (req, res) => {
  try {
    const routesRes = await pool.query('SELECT * FROM routes ORDER BY id ASC');
    const objectsRes = await pool.query('SELECT * FROM objects ORDER BY id ASC');
    
    // Group objects by route
    const routes = routesRes.rows.map(route => {
      return {
        ...route,
        objects: objectsRes.rows.filter(obj => obj.route_id === route.id)
      };
    });
    
    res.json(routes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ==========================================
// 2. AUTHENTICATION & REGISTRATION
// ==========================================

// Mock Gmail Login / Phone Registration
app.post('/api/auth/login', async (req, res) => {
  const { email, fullName, role, phone } = req.body;
  if (!email || !fullName) {
    return res.status(400).json({ error: 'Email and Full Name are required for login.' });
  }
  
  try {
    // Check if user exists
    let userRes = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    let user;
    
    if (userRes.rowCount === 0) {
      // Create user
      const id = 'u-' + Math.random().toString(36).substr(2, 9);
      const newUser = await pool.query(
        'INSERT INTO users (id, "fullName", email, role, phone, avatar_url) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
        [id, fullName, email, role || 'client', phone || '', req.body.avatarUrl || '']
      );
      user = newUser.rows[0];
    } else {
      user = userRes.rows[0];
      if (user.is_fired) {
        return res.status(403).json({ error: 'You have been fired from ArmTurn.', fired_reason: user.fired_reason });
      }
    }
    
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Driver Extended Registration Form
app.post('/api/auth/register-driver', async (req, res) => {
  const { email, fullName, phone, dob, carModel, carNumber, capacity, passportUrl } = req.body;
  
  if (!email || !fullName || !carModel || !carNumber || !capacity) {
    return res.status(400).json({ error: 'Missing required driver registration fields.' });
  }
  
  try {
    // 1. Create or get user in users table with role 'driver'
    let userRes = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    let user;
    
    if (userRes.rowCount === 0) {
      const id = 'u-' + Math.random().toString(36).substr(2, 9);
      const newUser = await pool.query(
        'INSERT INTO users (id, "fullName", email, role, phone, dob) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
        [id, fullName, email, 'driver', phone || '', dob || '']
      );
      user = newUser.rows[0];
    } else {
      user = userRes.rows[0];
      // Update role to driver
      const updatedUser = await pool.query('UPDATE users SET role = $1 WHERE id = $2 RETURNING *', ['driver', user.id]);
      user = updatedUser.rows[0];
      if (user.is_fired) {
        return res.status(403).json({ error: 'You have been fired.', fired_reason: user.fired_reason });
      }
    }
    
    // 2. Register driver records with status 'pending'
    const driverId = 'd-' + Math.random().toString(36).substr(2, 9);
    await pool.query(
      `INSERT INTO drivers (id, user_id, car_model, car_number, capacity, status, passport_url, car_photo_url, lat, lng, online) 
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)`,
      [driverId, user.id, carModel, carNumber, parseInt(capacity, 10), 'pending', passportUrl || '', req.body.carPhotoUrl || '', 40.1772, 44.5034, false]
    );
    
    res.json({ success: true, user, message: 'Driver registration submitted. Awaiting administrator approval.' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ==========================================
// 3. BOOKING ENGINE (CLIENT)
// ==========================================

// Create booking order
app.post('/api/orders', async (req, res) => {
  const { clientId, routeId, hotelId, restaurantId, date, groupSize } = req.body;
  
  if (!clientId || !routeId || !date) {
    return res.status(400).json({ error: 'Missing required booking fields.' });
  }
  
  try {
    // Check if client is shadow banned
    const userRes = await pool.query('SELECT shadow_banned FROM users WHERE id = $1', [clientId]);
    if (userRes.rowCount > 0 && userRes.rows[0].shadow_banned) {
      return res.status(403).json({ error: 'Your account is currently restricted. Booking is disabled.' });
    }
    
    // Calculate total price based on route, hotel, and restaurant
    const routeRes = await pool.query('SELECT price FROM routes WHERE id = $1', [routeId]);
    if (routeRes.rowCount === 0) return res.status(404).json({ error: 'Route not found.' });
    let total = parseFloat(routeRes.rows[0].price);
    
    if (hotelId) {
      const hotelRes = await pool.query('SELECT price FROM objects WHERE id = $1', [hotelId]);
      if (hotelRes.rowCount > 0) total += parseFloat(hotelRes.rows[0].price);
    }
    
    if (restaurantId) {
      const restRes = await pool.query('SELECT price FROM objects WHERE id = $1', [restaurantId]);
      if (restRes.rowCount > 0) total += parseFloat(restRes.rows[0].price);
    }
    
    // Smart Bonus Check: If booked from abroad for future date, grant free airport transfer
    // We mock "booked from abroad" by parsing dates or checking a flag
    const isFutureDate = new Date(date) > new Date();
    const vipTransfer = isFutureDate; // Grant free VIP transfer automatically for future bookings
    
    const orderId = 'ord-' + Math.random().toString(36).substr(2, 9);
    
    await pool.query(
      `INSERT INTO orders (id, client_id, route_id, hotel_id, restaurant_id, total_amount, status, date, vip_transfer, group_size) 
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)`,
      [orderId, clientId, routeId, hotelId || null, restaurantId || null, total, 'pending', date, vipTransfer, groupSize || 1]
    );
    
    res.json({ 
      success: true, 
      orderId, 
      totalAmount: total, 
      vipTransferGranted: vipTransfer, 
      message: vipTransfer ? 'Booking completed! Congratulations, you have been granted a free VIP Airport Transfer!' : 'Booking created successfully!' 
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get client's bookings
app.get('/api/client/orders/:clientId', async (req, res) => {
  const { clientId } = req.params;
  try {
    const ordersRes = await pool.query(`
      SELECT o.*, r.title as route_title, r.cover_image, d.car_model, d.car_number, u."fullName" as driver_name
      FROM orders o
      JOIN routes r ON o.route_id = r.id
      LEFT JOIN drivers d ON o.driver_id = d.id
      LEFT JOIN users u ON d.user_id = u.id
      WHERE o.client_id = $1
      ORDER BY o.created_at DESC
    `, [clientId]);
    
    res.json(ordersRes.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Mandatory Trip Rating & Review
app.post('/api/orders/:id/review', async (req, res) => {
  const { id } = req.params;
  const { rating, comment } = req.body;
  
  if (!rating || rating < 1 || rating > 5) {
    return res.status(400).json({ error: 'Valid rating (1 to 5) is required.' });
  }
  
  try {
    const reviewId = 'rev-' + Math.random().toString(36).substr(2, 9);
    await pool.query(
      'INSERT INTO reviews (id, order_id, rating, comment) VALUES ($1, $2, $3, $4)',
      [reviewId, id, parseInt(rating, 10), comment || '']
    );
    
    res.json({ success: true, message: 'Thank you for your rating! Your review helps us keep our services luxury.' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ==========================================
// 4. DRIVER APP OPERATIONS
// ==========================================

// Get available orders for driver or accepted orders
app.get('/api/driver/orders/:userId', async (req, res) => {
  const { userId } = req.params;
  try {
    // First find driver record
    const driverRes = await pool.query('SELECT id, status FROM drivers WHERE user_id = $1', [userId]);
    if (driverRes.rowCount === 0) {
      return res.status(404).json({ error: 'No driver profile found for this user.' });
    }
    
    const driver = driverRes.rows[0];
    if (driver.status !== 'approved') {
      return res.status(403).json({ error: 'Your driver account has not been approved by Admin yet.', status: driver.status });
    }
    
    // Fetch all orders that are either:
    // A) 'pending' AND date > CURRENT_DATE (anyone can accept for future)
    // B) Accepted/Started by THIS driver
    const todayStr = new Date().toISOString().split('T')[0];
    const ordersRes = await pool.query(`
      SELECT o.*, r.title as route_title, r.cover_image, r.duration, u."fullName" as client_name, u.phone as client_phone
      FROM orders o
      JOIN routes r ON o.route_id = r.id
      JOIN users u ON o.client_id = u.id
      WHERE (o.status = 'pending' AND o.date > $2) OR o.driver_id = $1
      ORDER BY o.created_at DESC
    `, [driver.id, todayStr]);
    
    res.json({
      driverId: driver.id,
      driverProfile: driver,
      orders: ordersRes.rows
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Driver Accepts Order
app.post('/api/orders/:id/accept', async (req, res) => {
  const { driverId } = req.body;
  const { id } = req.params;
  
  if (!driverId) return res.status(400).json({ error: 'Driver ID is required.' });
  
  try {
    // Rule: Driver can only have ONE active order in progress per day
    const activeCheck = await pool.query(
      "SELECT id FROM orders WHERE driver_id = $1 AND status IN ('accepted', 'started')",
      [driverId]
    );
    if (activeCheck.rowCount > 0) {
      return res.status(400).json({ error: 'You already have an active or started booking. Complete it first!' });
    }
    
    const updateRes = await pool.query(
      "UPDATE orders SET status = 'accepted', driver_id = $1 WHERE id = $2 AND status = 'pending' RETURNING *",
      [driverId, id]
    );
    
    if (updateRes.rowCount === 0) {
      return res.status(400).json({ error: 'This order is no longer available.' });
    }
    
    res.json({ success: true, message: 'Order accepted successfully!', order: updateRes.rows[0] });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Driver Starts Trip
app.post('/api/orders/:id/start', async (req, res) => {
  const { id } = req.params;
  try {
    const updateRes = await pool.query(
      "UPDATE orders SET status = 'started' WHERE id = $1 RETURNING *",
      [id]
    );
    res.json({ success: true, message: 'Trip started! GPS coordinates are streaming...', order: updateRes.rows[0] });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Driver Stops Trip (Triggers Review Window)
app.post('/api/orders/:id/stop', async (req, res) => {
  const { id } = req.params;
  try {
    const updateRes = await pool.query(
      "UPDATE orders SET status = 'completed' WHERE id = $1 RETURNING *",
      [id]
    );
    res.json({ success: true, message: 'Trip completed! Review window activated for the client.', order: updateRes.rows[0] });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ==========================================
// 5. SECRET ADMIN CMS PANEL (/admin-secret-url)
// ==========================================

// Get All Drivers for approval
app.get('/api/admin/drivers', async (req, res) => {
  try {
    const driversRes = await pool.query(`
      SELECT d.*, u."fullName", u.email, u.phone, u.dob
      FROM drivers d
      JOIN users u ON d.user_id = u.id
      ORDER BY d.status ASC, d.id DESC
    `);
    res.json(driversRes.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Approve/Reject Driver
app.post('/api/admin/drivers/:id/status', async (req, res) => {
  const { id } = req.params;
  const { status } = req.body; // approved, rejected
  
  try {
    const updateRes = await pool.query(
      'UPDATE drivers SET status = $1 WHERE id = $2 RETURNING *',
      [status, id]
    );
    res.json({ success: true, message: `Driver status updated to: ${status}`, driver: updateRes.rows[0] });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Admin Fire Driver
app.post('/api/admin/drivers/:id/fire', async (req, res) => {
  const { id } = req.params;
  const { reason } = req.body;
  try {
    const driverRes = await pool.query('SELECT user_id FROM drivers WHERE id = $1', [id]);
    if (driverRes.rowCount === 0) return res.status(404).json({ error: 'Driver not found' });
    const userId = driverRes.rows[0].user_id;

    await pool.query('UPDATE users SET is_fired = TRUE, fired_reason = $1 WHERE id = $2', [reason || 'Fired by Admin', userId]);
    // Optional: Delete from drivers table so they don't appear in lists anymore
    await pool.query('DELETE FROM drivers WHERE id = $1', [id]);

    res.json({ success: true, message: 'Driver fired completely.' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Client Edit Profile
app.put('/api/client/:id/profile', async (req, res) => {
  const { id } = req.params;
  const { fullName, avatarUrl } = req.body;
  try {
    const updated = await pool.query(
      'UPDATE users SET "fullName" = $1, avatar_url = $2 WHERE id = $3 RETURNING *',
      [fullName, avatarUrl, id]
    );
    res.json({ success: true, user: updated.rows[0], message: 'Profile updated!' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Driver Edit Profile
app.put('/api/driver/:id/profile', async (req, res) => {
  const { id } = req.params;
  const { carModel, carNumber, capacity, carPhotoUrl } = req.body;
  try {
    const driverRes = await pool.query('SELECT last_profile_edit FROM drivers WHERE id = $1', [id]);
    if (driverRes.rowCount === 0) return res.status(404).json({ error: 'Driver not found' });
    
    const lastEdit = driverRes.rows[0].last_profile_edit;
    if (lastEdit) {
      const daysSinceEdit = (new Date() - new Date(lastEdit)) / (1000 * 60 * 60 * 24);
      if (daysSinceEdit < 7) {
        return res.status(403).json({ error: `You can only edit your profile once every 7 days. (${Math.ceil(7 - daysSinceEdit)} days left)` });
      }
    }

    const updated = await pool.query(
      'UPDATE drivers SET car_model = $1, car_number = $2, capacity = $3, car_photo_url = $4, last_profile_edit = CURRENT_TIMESTAMP WHERE id = $5 RETURNING *',
      [carModel, carNumber, parseInt(capacity, 10), carPhotoUrl, id]
    );
    res.json({ success: true, driver: updated.rows[0], message: 'Profile updated successfully!' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Toggle Shadow Ban
app.post('/api/admin/users/:id/shadow-ban', async (req, res) => {
  const { id } = req.params;
  try {
    const userRes = await pool.query('SELECT shadow_banned FROM users WHERE id = $1', [id]);
    if (userRes.rowCount === 0) return res.status(404).json({ error: 'User not found' });
    
    const newStatus = !userRes.rows[0].shadow_banned;
    await pool.query('UPDATE users SET shadow_banned = $1 WHERE id = $2', [newStatus, id]);
    
    res.json({ success: true, shadowBanned: newStatus, message: newStatus ? 'User shadow banned!' : 'User shadow ban removed!' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update User Role
app.post('/api/admin/users/:id/role', async (req, res) => {
  const { id } = req.params;
  const { role } = req.body;
  try {
    await pool.query('UPDATE users SET role = $1 WHERE id = $2', [role, id]);
    res.json({ success: true, message: `User role updated to ${role}!` });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get List of All Users
app.get('/api/admin/users', async (req, res) => {
  try {
    const usersRes = await pool.query('SELECT * FROM users ORDER BY created_at DESC');
    res.json(usersRes.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Admin Route CMS: Add/Edit Routes
app.post('/api/admin/routes', async (req, res) => {
  const { id, title, description, coverImage, price, duration } = req.body;
  if (!id || !title || !price || !duration) {
    return res.status(400).json({ error: 'Missing required route parameters.' });
  }
  
  try {
    const exists = await pool.query('SELECT id FROM routes WHERE id = $1', [id]);
    if (exists.rowCount > 0) {
      // Update
      await pool.query(
        'UPDATE routes SET title = $1, description = $2, cover_image = $3, price = $4, duration = $5 WHERE id = $6',
        [title, description || '', coverImage || '', parseFloat(price), duration, id]
      );
      res.json({ success: true, message: 'Route updated in Neon DB!' });
    } else {
      // Insert
      await pool.query(
        'INSERT INTO routes (id, title, description, cover_image, price, duration) VALUES ($1, $2, $3, $4, $5, $6)',
        [id, title, description || '', coverImage || '', parseFloat(price), duration]
      );
      res.json({ success: true, message: 'Route added to Neon DB!' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete Route
app.delete('/api/admin/routes/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query('DELETE FROM routes WHERE id = $1', [id]);
    res.json({ success: true, message: 'Route deleted.' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Admin Objects CMS: Add/Edit Hotels/Restaurants
app.post('/api/admin/objects', async (req, res) => {
  const { id, routeId, name, type, image, price, description, menu, lat, lng } = req.body;
  if (!id || !routeId || !name || !type || !price) {
    return res.status(400).json({ error: 'Missing required object parameters.' });
  }
  
  try {
    const exists = await pool.query('SELECT id FROM objects WHERE id = $1', [id]);
    if (exists.rowCount > 0) {
      await pool.query(
        `UPDATE objects SET route_id = $1, name = $2, type = $3, image = $4, price = $5, description = $6, menu = $7, lat = $8, lng = $9 
         WHERE id = $10`,
        [routeId, name, type, image || '', parseFloat(price), description || '', menu || '', parseFloat(lat || 0), parseFloat(lng || 0), id]
      );
      res.json({ success: true, message: 'Venue object updated in database.' });
    } else {
      await pool.query(
        `INSERT INTO objects (id, route_id, name, type, image, price, description, menu, lat, lng) 
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)`,
        [id, routeId, name, type, image || '', parseFloat(price), description || '', menu || '', parseFloat(lat || 0), parseFloat(lng || 0)]
      );
      res.json({ success: true, message: 'Venue object added to database.' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete Object
app.delete('/api/admin/objects/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query('DELETE FROM objects WHERE id = $1', [id]);
    res.json({ success: true, message: 'Venue object deleted.' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all orders (for admin console)
app.get('/api/admin/orders', async (req, res) => {
  try {
    const ordersRes = await pool.query(`
      SELECT o.*, 
             r.title as route_title, 
             u."fullName" as client_name, u.email as client_email, u.phone as client_phone,
             ud."fullName" as driver_name, d.car_model, d.car_number,
             oh.name as hotel_name, oh.price as hotel_price,
             orst.name as restaurant_name, orst.price as restaurant_price
      FROM orders o
      JOIN routes r ON o.route_id = r.id
      JOIN users u ON o.client_id = u.id
      LEFT JOIN drivers d ON o.driver_id = d.id
      LEFT JOIN users ud ON d.user_id = ud.id
      LEFT JOIN objects oh ON o.hotel_id = oh.id
      LEFT JOIN objects orst ON o.restaurant_id = orst.id
      ORDER BY o.created_at DESC
    `);
    res.json(ordersRes.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ==========================================
// 6. LIVE RADER SIMULATION COORDINATES
// ==========================================

// Fetches live movement coordinates of active drivers (started trips)
app.get('/api/admin/radar', async (req, res) => {
  try {
    const driversRes = await pool.query(`
      SELECT d.id, d.car_model, d.car_number, d.lat, d.lng, u."fullName" as driver_name
      FROM drivers d
      JOIN users u ON d.user_id = u.id
      WHERE d.online = TRUE
    `);
    
    // Simulate real-time coordinates moving smoothly along standard routes in Armenia
    const movingDrivers = driversRes.rows.map(d => {
      const lat = parseFloat(d.lat) + (Math.random() - 0.5) * 0.005;
      const lng = parseFloat(d.lng) + (Math.random() - 0.5) * 0.005;
      
      // Update coordinates in DB so it actually saves/moves
      pool.query('UPDATE drivers SET lat = $1, lng = $2 WHERE id = $3', [lat, lng, d.id]);
      
      return {
        ...d,
        lat,
        lng
      };
    });
    
    res.json(movingDrivers);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ==========================================
// 7. WALLET & ANALYTICS BREAKDOWN
// ==========================================

app.get('/api/admin/wallet', async (req, res) => {
  try {
    // Get total order payouts
    const completedOrders = await pool.query("SELECT * FROM orders WHERE status = 'completed'");
    
    let totalRevenue = 0;
    let toursRevenue = 0;
    let hotelsRevenue = 0;
    let restaurantsRevenue = 0;
    
    for (const order of completedOrders.rows) {
      const total = parseFloat(order.total_amount);
      totalRevenue += total;
      
      // Break down based on items
      const routeRes = await pool.query('SELECT price FROM routes WHERE id = $1', [order.route_id]);
      const routePrice = routeRes.rowCount > 0 ? parseFloat(routeRes.rows[0].price) : 0;
      toursRevenue += routePrice;
      
      if (order.hotel_id) {
        const hotelRes = await pool.query('SELECT price FROM objects WHERE id = $1', [order.hotel_id]);
        const hotelPrice = hotelRes.rowCount > 0 ? parseFloat(hotelRes.rows[0].price) : 0;
        hotelsRevenue += hotelPrice;
      }
      
      if (order.restaurant_id) {
        const restRes = await pool.query('SELECT price FROM objects WHERE id = $1', [order.restaurant_id]);
        const restPrice = restRes.rowCount > 0 ? parseFloat(restRes.rows[0].price) : 0;
        restaurantsRevenue += restPrice;
      }
    }
    
    // Commission: 15% platform fee on tours and 10% on hotel/restaurant referrals
    const platformCommission = (toursRevenue * 0.15) + (hotelsRevenue * 0.10) + (restaurantsRevenue * 0.10);
    const driverPayout = toursRevenue * 0.85; // Drivers keep 85% of tour fare
    const partnerPayout = (hotelsRevenue * 0.90) + (restaurantsRevenue * 0.90); // Partners get 90%
    
    res.json({
      totalRevenue: totalRevenue.toFixed(2),
      toursRevenue: toursRevenue.toFixed(2),
      hotelsRevenue: hotelsRevenue.toFixed(2),
      restaurantsRevenue: restaurantsRevenue.toFixed(2),
      platformCommission: platformCommission.toFixed(2),
      driverPayout: driverPayout.toFixed(2),
      partnerPayout: partnerPayout.toFixed(2),
      completedCount: completedOrders.rowCount
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Start Express Server
if (process.env.NODE_ENV !== 'production' || process.env.RENDER) {
  app.listen(port, () => {
    console.log(`ArmTurn Fullstack API Server running on port ${port}`);
  });
}

export default app;
