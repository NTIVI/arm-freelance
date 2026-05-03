const fs = require('fs');
let code = fs.readFileSync('src/pages/Dashboard.tsx', 'utf8');

code = code.replace(/const SidebarItem = \(\{ active, icon: Icon, onClick, label \}: any\) => \(/g, `const SidebarItem = ({ active, icon: Icon, onClick, label }: any) => {
  const { t } = useLanguage();
  return (`);
code = code.replace(/<span className="text-\[8px\] font-black uppercase tracking-widest">\{label\}<\/span>\n  <\/button>\n\)/g, `<span className="text-[8px] font-black uppercase tracking-widest">{label}</span>\n  </button>\n  )\n}`);

code = code.replace(/const JobCard = \(\{ job \}: any\) => \(/g, `const JobCard = ({ job }: any) => {
  const { t } = useLanguage();
  return (`);
code = code.replace(/<span className="text-\[10px\] font-bold">\{job\.proposalsCount\} bids<\/span><\/div>\n      <\/div>\n    <\/div>\n  <\/Link>\n\)/g, `<span className="text-[10px] font-bold">{job.proposalsCount} bids</span></div>\n      </div>\n    </div>\n  </Link>\n  )\n}`);

code = code.replace(/const SpecialistCard = \(\{ spec \}: any\) => \(/g, `const SpecialistCard = ({ spec }: any) => {
  const { t } = useLanguage();
  return (`);
code = code.replace(/<\/div>\n  <\/div>\n\)/g, `</div>\n  </div>\n  )\n}`);

code = code.replace(/const MyJobCard = \(\{ job \}: any\) => \(/g, `const MyJobCard = ({ job }: any) => {
  const { t } = useLanguage();
  return (`);

code = code.replace(/const ProposalCard = \(\{ proposal, job \}: any\) => \(/g, `const ProposalCard = ({ proposal, job }: any) => {
  const { t } = useLanguage();
  return (`);

code = code.replace(/const ClientProposalCard = \(\{ proposal, job \}: any\) => \(/g, `const ClientProposalCard = ({ proposal, job }: any) => {
  const { t } = useLanguage();
  return (`);

fs.writeFileSync('src/pages/Dashboard.tsx', code);
