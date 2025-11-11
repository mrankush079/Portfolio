// import React, { useEffect, useState } from 'react';

// const AdminDashboardSection = () => {
//   const [activeTab, setActiveTab] = useState('summary');
//   const [stats, setStats] = useState({});
//   const [users, setUsers] = useState([]);
//   const [projects, setProjects] = useState([]);
//   const [messages, setMessages] = useState([]);
//   const [logs, setLogs] = useState([]);

//   const API_BASE = process.env.REACT_APP_API_BASE;
//   const token = localStorage.getItem('token');

//   useEffect(() => {
//     fetch(`${API_BASE}/api/admin/summary`, {
//       headers: { Authorization: `Bearer ${token}` }
//     })
//       .then(res => res.json())
//       .then(data => setStats(data));

//     fetch(`${API_BASE}/api/users`, {
//       headers: { Authorization: `Bearer ${token}` }
//     })
//       .then(res => res.json())
//       .then(data => setUsers(data));

//     fetch(`${API_BASE}/api/projects`, {
//       headers: { Authorization: `Bearer ${token}` }
//     })
//       .then(res => res.json())
//       .then(data => setProjects(data));

//     fetch(`${API_BASE}/api/contact`, {
//       headers: { Authorization: `Bearer ${token}` }
//     })
//       .then(res => res.json())
//       .then(data => setMessages(data));

//     fetch(`${API_BASE}/api/admin/audit-logs`, {
//       headers: { Authorization: `Bearer ${token}` }
//     })
//       .then(res => res.json())
//       .then(data => setLogs(data));
//   }, []);

//   return (
//     <div className="py-12">
//       <h2 className="text-3xl font-bold text-purple-400 mb-6">Admin Dashboard</h2>

//       {/* Tabs */}
//       <div className="flex space-x-4 mb-6">
//         {['summary', 'users', 'projects', 'messages', 'logs'].map(tab => (
//           <button
//             key={tab}
//             onClick={() => setActiveTab(tab)}
//             className={`px-4 py-2 rounded ${
//               activeTab === tab ? 'bg-purple-600 text-white' : 'bg-gray-800 text-gray-300'
//             }`}
//           >
//             {tab.charAt(0).toUpperCase() + tab.slice(1)}
//           </button>
//         ))}
//       </div>

//       {/* Tab Content */}
//       {activeTab === 'summary' && (
//         <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
//           <Card title="Projects" value={stats.projectCount} />
//           <Card title="Messages" value={stats.messageCount} />
//           <Card title="Users" value={stats.userCount} />
//         </div>
//       )}

//       {activeTab === 'users' && (
//         <List title="Users" items={users} fields={['name', 'email', 'role']} />
//       )}

//       {activeTab === 'projects' && (
//         <List title="Projects" items={projects} fields={['title', 'techStack']} />
//       )}

//       {activeTab === 'messages' && (
//         <>
//           <List title="Messages" items={messages} fields={['name', 'email', 'message']} />
//           <a
//             href={`${API_BASE}/api/contact/export/csv`}
//             target="_blank"
//             rel="noopener noreferrer"
//             className="inline-block mt-4 bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-4 rounded-lg transition-all"
//           >
//             📁 Export Messages as CSV
//           </a>
//         </>
//       )}

//       {activeTab === 'logs' && (
//         <List title="Audit Logs" items={logs} fields={['action', 'user', 'details', 'timestamp']} />
//       )}
//     </div>
//   );
// };

// const Card = ({ title, value }) => (
//   <div className="bg-[#1a102e] p-6 rounded shadow text-center">
//     <h3 className="text-lg font-semibold text-gray-300">{title}</h3>
//     <p className="text-2xl font-bold text-purple-400">{value}</p>
//   </div>
// );

// const List = ({ title, items, fields }) => (
//   <div>
//     <h3 className="text-xl font-semibold text-purple-400 mb-4">{title}</h3>
//     <div className="overflow-x-auto">
//       <table className="min-w-full bg-[#1a102e] text-sm text-left rounded">
//         <thead>
//           <tr>
//             {fields.map(f => (
//               <th key={f} className="px-4 py-2 text-gray-400">{f}</th>
//             ))}
//           </tr>
//         </thead>
//         <tbody>
//           {items.map((item, idx) => (
//             <tr key={idx} className="border-t border-gray-700">
//               {fields.map(f => (
//                 <td key={f} className="px-4 py-2 text-gray-200">
//                   {Array.isArray(item[f])
//                     ? item[f].join(', ')
//                     : typeof item[f] === 'object'
//                     ? JSON.stringify(item[f])
//                     : item[f]}
//                 </td>
//               ))}
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   </div>
// );

// export default AdminDashboardSection;









// import React, { useEffect, useState } from 'react';
// import { FiLoader } from 'react-icons/fi';

// const AdminDashboardSection = () => {
//   const [activeTab, setActiveTab] = useState('summary');
//   const [stats, setStats] = useState({});
//   const [users, setUsers] = useState([]);
//   const [projects, setProjects] = useState([]);
//   const [messages, setMessages] = useState([]);
//   const [logs, setLogs] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [page, setPage] = useState(1);
//   const itemsPerPage = 10;

//   const API_BASE = process.env.REACT_APP_API_BASE;
//   const token = localStorage.getItem('token');

//   const logAction = async (action, details = {}) => {
//     try {
//       await fetch(`${API_BASE}/api/admin/audit-logs`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           Authorization: `Bearer ${token}`
//         },
//         body: JSON.stringify({ action, user: 'admin', details })
//       });
//     } catch (err) {
//       console.error('Audit log error:', err);
//     }
//   };

//   useEffect(() => {
//     const fetchData = async () => {
//       setLoading(true);
//       try {
//         const headers = { Authorization: `Bearer ${token}` };

//         const [summaryRes, usersRes, projectsRes, messagesRes, logsRes] = await Promise.all([
//           fetch(`${API_BASE}/api/admin/summary`, { headers }),
//           fetch(`${API_BASE}/api/users`, { headers }),
//           fetch(`${API_BASE}/api/projects`, { headers }),
//           fetch(`${API_BASE}/api/contact`, { headers }),
//           fetch(`${API_BASE}/api/admin/audit-logs`, { headers }),
//         ]);

//         const [summary, users, projects, messages, logs] = await Promise.all([
//           summaryRes.json(),
//           usersRes.json(),
//           projectsRes.json(),
//           messagesRes.json(),
//           logsRes.json(),
//         ]);

//         setStats(summary);
//         setUsers(users);
//         setProjects(projects);
//         setMessages(messages);
//         setLogs(logs);
//       } catch (err) {
//         console.error('Dashboard fetch error:', err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, [API_BASE, token]);

//   const handleTabSwitch = (tab) => {
//     setActiveTab(tab);
//     setSearchTerm('');
//     setPage(1);
//     logAction('Switch Tab', { tab });
//   };

//   const filteredItems = (items) =>
//     items.filter((item) =>
//       Object.values(item)
//         .join(' ')
//         .toLowerCase()
//         .includes(searchTerm.toLowerCase())
//     );

//   const paginatedItems = (items) =>
//     filteredItems(items).slice((page - 1) * itemsPerPage, page * itemsPerPage);

//   const totalPages = (items) =>
//     Math.ceil(filteredItems(items).length / itemsPerPage);

//   const tabDataMap = {
//     users,
//     projects,
//     messages,
//     logs
//  };

//   const currentTabData = tabDataMap[activeTab] || [];

//   return (
//     <div className="py-12">
//       <h2 className="text-3xl font-bold text-purple-400 mb-6">Admin Dashboard</h2>

//       {/* Tabs */}
//       <div className="flex space-x-4 mb-6">
//         {['summary', 'users', 'projects', 'messages', 'logs'].map(tab => (
//           <button
//             key={tab}
//             onClick={() => handleTabSwitch(tab)}
//             className={`px-4 py-2 rounded ${
//               activeTab === tab ? 'bg-purple-600 text-white' : 'bg-gray-800 text-gray-300'
//             }`}
//           >
//             {tab.charAt(0).toUpperCase() + tab.slice(1)}
//           </button>
//         ))}
//       </div>

//       {/* Search */}
//       {activeTab !== 'summary' && (
//         <input
//           type="text"
//           placeholder={`Search ${activeTab}...`}
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//           className="mb-6 px-4 py-2 rounded bg-[#1a102e] text-white placeholder-gray-400 border border-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
//         />
//       )}

//       {/* Content */}
//       {loading ? (
//         <div className="flex justify-center items-center h-40 text-purple-400 animate-pulse">
//           <FiLoader className="text-3xl animate-spin" />
//           <span className="ml-2">Loading dashboard...</span>
//         </div>
//       ) : (
//         <>
//           {activeTab === 'summary' && (
//             <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
//               <Card title="Projects" value={stats.projectCount} />
//               <Card title="Messages" value={stats.messageCount} />
//               <Card title="Users" value={stats.userCount} />
//             </div>
//           )}

//           {activeTab === 'users' && (
//             <List title="Users" items={paginatedItems(users)} fields={['name', 'email', 'role']} />
//           )}

//           {activeTab === 'projects' && (
//             <List title="Projects" items={paginatedItems(projects)} fields={['title', 'techStack']} />
//           )}

//           {activeTab === 'messages' && (
//             <>
//               <List title="Messages" items={paginatedItems(messages)} fields={['name', 'email', 'message']} />
//               <a
//                 href={`${API_BASE}/api/contact/export/csv?token=${token}`}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 onClick={() => logAction('Export Messages CSV')}
//                 className="inline-block mt-4 bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-4 rounded-lg transition-all"
//               >
//                 📁 Export Messages as CSV
//               </a>
//             </>
//           )}

//           {activeTab === 'logs' && (
//             <List title="Audit Logs" items={paginatedItems(logs)} fields={['action', 'user', 'details', 'timestamp']} />
//           )}

//           {/* Pagination */}
//           {activeTab !== 'summary' && totalPages(currentTabData) > 1 && (
//             <div className="flex justify-center mt-6 space-x-2">
//               {Array.from({ length: totalPages(currentTabData) }, (_, i) => (
//                 <button
//                   key={i}
//                   onClick={() => setPage(i + 1)}
//                   className={`px-3 py-1 rounded ${
//                     page === i + 1 ? 'bg-purple-600 text-white' : 'bg-gray-800 text-gray-300'
//                   }`}
//                 >
//                   {i + 1}
//                 </button>
//               ))}
//             </div>
//           )}
//         </>
//       )}
//     </div>
//   );
// };

// const Card = ({ title, value }) => (
//   <div className="bg-[#1a102e] p-6 rounded shadow text-center">
//     <h3 className="text-lg font-semibold text-gray-300">{title}</h3>
//     <p className="text-2xl font-bold text-purple-400">{value ?? '—'}</p>
//   </div>
// );

// const List = ({ title, items, fields }) => (
//   <div>
//     <h3 className="text-xl font-semibold text-purple-400 mb-4">{title}</h3>
//     <div className="overflow-x-auto">
//       <table className="min-w-full bg-[#1a102e] text-sm text-left rounded">
//         <thead>
//           <tr>
//             {fields.map(f => (
//               <th key={f} className="px-4 py-2 text-gray-400">{f}</th>
//             ))}
//           </tr>
//         </thead>
//         <tbody>
//           {items.length === 0 ? (
//             <tr>
//               <td colSpan={fields.length} className="px-4 py-4 text-center text-gray-500">
//                 No data available
//               </td>
//             </tr>
//           ) : (
//             items.map((item, idx) => (
//               <tr key={idx} className="border-t border-gray-700">
//                 {fields.map(f => (
//                   <td key={f} className="px-4 py-2 text-gray-200">
//                     {Array.isArray(item[f])
//                       ? item[f].join(', ')
//                       : typeof item[f] === 'object'
//                       ? JSON.stringify(item[f])
//                       : item[f] ?? '—'}
//                   </td>
//                 ))}
//               </tr>
//             ))
//           )}
//         </tbody>
//       </table>
//     </div>
//   </div>
// );



// import React, { useEffect, useState } from 'react';
// import { FiLoader } from 'react-icons/fi';

// const AdminDashboardSection = () => {
//   const [activeTab, setActiveTab] = useState('summary');
//   const [stats, setStats] = useState({});
//   const [users, setUsers] = useState([]);
//   const [projects, setProjects] = useState([]);
//   const [messages, setMessages] = useState([]);
//   const [logs, setLogs] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [page, setPage] = useState(1);
//   const itemsPerPage = 10;

//   const API_BASE = process.env.REACT_APP_API_BASE;
//   const token = localStorage.getItem('token');

//   const logAction = async (action, details = {}) => {
//     if (!token) return;
//     try {
//       await fetch(`${API_BASE}/api/admin/audit-logs`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           Authorization: `Bearer ${token}`
//         },
//         body: JSON.stringify({ action, user: 'admin', details })
//       });
//     } catch (err) {
//       console.error('Audit log error:', err);
//     }
//   };

//   useEffect(() => {
//     if (!token) {
//       console.warn('⚠️ No token found in localStorage');
//       return;
//     }

//     const fetchData = async () => {
//       setLoading(true);
//       try {
//         const headers = { Authorization: `Bearer ${token}` };

//         const endpoints = [
//           `${API_BASE}/api/admin/summary`,
//           `${API_BASE}/api/users`,
//           `${API_BASE}/api/projects`,
//           `${API_BASE}/api/contact`,
//           `${API_BASE}/api/admin/audit-logs`
//         ];

//         const responses = await Promise.allSettled(endpoints.map(url => fetch(url, { headers })));
//         const results = await Promise.all(
//           responses.map(res => res.status === 'fulfilled' ? res.value.json() : [])
//         );

//         setStats(results[0] || {});
//         setUsers(results[1] || []);
//         setProjects(results[2] || []);
//         setMessages(results[3] || []);
//         setLogs(results[4] || []);
//       } catch (err) {
//         console.error('Dashboard fetch error:', err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, [API_BASE, token]);

//   useEffect(() => {
//     setPage(1);
//   }, [searchTerm]);

//   const handleTabSwitch = (tab) => {
//     setActiveTab(tab);
//     setSearchTerm('');
//     setPage(1);
//     logAction('Switch Tab', { tab });
//   };

//   const filteredItems = (items) =>
//     items.filter((item) =>
//       Object.values(item)
//         .join(' ')
//         .toLowerCase()
//         .includes(searchTerm.toLowerCase())
//     );

//   const paginatedItems = (items) =>
//     filteredItems(items).slice((page - 1) * itemsPerPage, page * itemsPerPage);

//   const totalPages = (items) =>
//     Math.ceil(filteredItems(items).length / itemsPerPage);

//   const tabDataMap = {
//     users,
//     projects,
//     messages,
//     logs
//   };

//   const currentTabData = tabDataMap[activeTab] || [];

//   return (
//     <div className="py-12">
//       <h2 className="text-3xl font-bold text-purple-400 mb-6">Admin Dashboard</h2>

//       {/* Tabs */}
//       <div className="flex space-x-4 mb-6">
//         {['summary', 'users', 'projects', 'messages', 'logs'].map(tab => (
//           <button
//             key={tab}
//             onClick={() => handleTabSwitch(tab)}
//             className={`px-4 py-2 rounded ${
//               activeTab === tab ? 'bg-purple-600 text-white' : 'bg-gray-800 text-gray-300'
//             }`}
//           >
//             {tab.charAt(0).toUpperCase() + tab.slice(1)}
//           </button>
//         ))}
//       </div>

//       {/* Search */}
//       {activeTab !== 'summary' && (
//         <input
//           type="text"
//           placeholder={`Search ${activeTab}...`}
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//           className="mb-6 px-4 py-2 rounded bg-[#1a102e] text-white placeholder-gray-400 border border-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
//         />
//       )}

//       {/* Content */}
//       {loading ? (
//         <div className="flex justify-center items-center h-40 text-purple-400 animate-pulse">
//           <FiLoader className="text-3xl animate-spin" />
//           <span className="ml-2">Loading dashboard...</span>
//         </div>
//       ) : (
//         <>
//           {activeTab === 'summary' && (
//             <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
//               <Card title="Projects" value={stats.projectCount} />
//               <Card title="Messages" value={stats.messageCount} />
//               <Card title="Users" value={stats.userCount} />
//             </div>
//           )}

//           {activeTab === 'users' && (
//             <List title="Users" items={paginatedItems(users)} fields={['name', 'email', 'role']} />
//           )}

//           {activeTab === 'projects' && (
//             <List title="Projects" items={paginatedItems(projects)} fields={['title', 'techStack']} />
//           )}

//           {activeTab === 'messages' && (
//             <>
//               <List title="Messages" items={paginatedItems(messages)} fields={['name', 'email', 'message']} />
//               <a
//                 href={`${API_BASE}/api/contact/export/csv?token=${token}`}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 onClick={() => logAction('Export Messages CSV')}
//                 className="inline-block mt-4 bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-4 rounded-lg transition-all"
//               >
//                 📁 Export Messages as CSV
//               </a>
//             </>
//           )}

//           {activeTab === 'logs' && (
//             <List title="Audit Logs" items={paginatedItems(logs)} fields={['action', 'user', 'details', 'timestamp']} />
//           )}

//           {/* Pagination */}
//           {activeTab !== 'summary' && totalPages(currentTabData) > 1 && (
//             <div className="flex justify-center mt-6 space-x-2">
//               {Array.from({ length: totalPages(currentTabData) }, (_, i) => (
//                 <button
//                   key={i}
//                   onClick={() => setPage(i + 1)}
//                   className={`px-3 py-1 rounded ${
//                     page === i + 1 ? 'bg-purple-600 text-white' : 'bg-gray-800 text-gray-300'
//                   }`}
//                 >
//                   {i + 1}
//                 </button>
//               ))}
//             </div>
//           )}
//         </>
//       )}
//     </div>
//   );
// };

// const Card = ({ title, value }) => (
//   <div className="bg-[#1a102e] p-6 rounded shadow text-center">
//     <h3 className="text-lg font-semibold text-gray-300">{title}</h3>
//     <p className="text-2xl font-bold text-purple-400">{value ?? '—'}</p>
//   </div>
// );

// const List = ({ title, items, fields }) => (
//   <div>
//     <h3 className="text-xl font-semibold text-purple-400 mb-4">{title}</h3>
//     <div className="overflow-x-auto">
//       <table className="min-w-full bg-[#1a102e] text-sm text-left rounded">
//         <thead>
//           <tr>
//             {fields.map(f => (
//               <th key={f} className="px-4 py-2 text-gray-400">{f}</th>
//             ))}
//           </tr>
//         </thead>
//         <tbody>
//           {items.length === 0 ? (
//             <tr>
//               <td colSpan={fields.length} className="px-4 py-4 text-center text-gray-500">
//                 No data available
//               </td>
//             </tr>
//           ) : (
//             items.map((item, idx) => (
//               <tr key={idx} className="border-t border-gray-700">
//                 {fields.map(f => (
//                   <td key={f} className="px-4 py-2 text-gray-200">
//                     {Array.isArray(item[f])
//                       ? item[f].join(', ')
//                       : typeof item[f] === 'object'
//                       ? <pre className="whitespace-pre-wrap">{JSON.stringify(item[f], null, 2)}</pre>
//                       : item[f] ?? '—'}
//                   </td>
//                 ))}
//               </tr>
//             ))
//           )}
//          </tbody>
//        </table>
//      </div>
//    </div>
//  );

// export default AdminDashboardSection;



















// import React, { useEffect, useState } from 'react';
// import { FiLoader } from 'react-icons/fi';

// const AdminDashboardSection = () => {
//   const [activeTab, setActiveTab] = useState('summary');
//   const [stats, setStats] = useState({});
//   const [users, setUsers] = useState([]);
//   const [projects, setProjects] = useState([]);
//   const [messages, setMessages] = useState([]);
//   const [logs, setLogs] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [page, setPage] = useState(1);
//   const itemsPerPage = 10;

//   const API_BASE = process.env.REACT_APP_API_BASE;
//   const token = localStorage.getItem('token');

//   const logAction = async (action, details = {}) => {
//     if (!token) return;
//     try {
//       await fetch(`${API_BASE}/api/admin/audit-logs`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           Authorization: `Bearer ${token}`
//         },
//         body: JSON.stringify({ action, user: 'admin', details })
//       });
//     } catch (err) {
//       console.error('Audit log error:', err);
//     }
//   };

//   useEffect(() => {
//     if (!token) {
//       console.warn('⚠️ No token found in localStorage');
//       return;
//     }

//     const fetchData = async () => {
//       setLoading(true);
//       try {
//         const headers = { Authorization: `Bearer ${token}` };

//         const endpoints = [
//           `${API_BASE}/api/admin/summary`,
//           `${API_BASE}/api/users`,
//           `${API_BASE}/api/projects`,
//           `${API_BASE}/api/contact`,
//           `${API_BASE}/api/admin/audit-logs`
//         ];

//         const responses = await Promise.allSettled(endpoints.map(url => fetch(url, { headers })));
//         const results = await Promise.all(
//           responses.map(res => res.status === 'fulfilled' ? res.value.json() : [])
//         );

//         setStats(results[0] || {});
//         setUsers(results[1] || []);
//         setProjects(results[2] || []);
//         setMessages(results[3] || []);
//         setLogs(results[4] || []);
//       } catch (err) {
//         console.error('Dashboard fetch error:', err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, [API_BASE, token]);

//   useEffect(() => {
//     setPage(1);
//   }, [searchTerm]);

//   const handleTabSwitch = (tab) => {
//     setActiveTab(tab);
//     setSearchTerm('');
//     setPage(1);
//     logAction('Switch Tab', { tab });
//   };

//   const filteredItems = (items) =>
//     items.filter((item) =>
//       Object.values(item)
//         .join(' ')
//         .toLowerCase()
//         .includes(searchTerm.toLowerCase())
//     );

//   const paginatedItems = (items) =>
//     filteredItems(items).slice((page - 1) * itemsPerPage, page * itemsPerPage);

//   const totalPages = (items) =>
//     Math.ceil(filteredItems(items).length / itemsPerPage);

//   const tabDataMap = {
//     users,
//     projects,
//     messages,
//     logs
//   };

//   const currentTabData = tabDataMap[activeTab] || [];

//   return (
//     <div className="py-12">
//       <h2 className="text-3xl font-bold text-purple-400 mb-6">Admin Dashboard</h2>

//       {/* Tabs */}
//       <div className="flex space-x-4 mb-6">
//         {['summary', 'users', 'projects', 'messages', 'logs'].map(tab => (
//           <button
//             key={tab}
//             onClick={() => handleTabSwitch(tab)}
//             className={`px-4 py-2 rounded ${
//               activeTab === tab ? 'bg-purple-600 text-white' : 'bg-gray-800 text-gray-300'
//             }`}
//           >
//             {tab.charAt(0).toUpperCase() + tab.slice(1)}
//           </button>
//         ))}
//       </div>

//       {/* Search */}
//       {activeTab !== 'summary' && (
//         <input
//           type="text"
//           placeholder={`Search ${activeTab}...`}
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//           className="mb-6 px-4 py-2 rounded bg-[#1a102e] text-white placeholder-gray-400 border border-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
//         />
//       )}

//       {/* Content */}
//       {loading ? (
//         <div className="flex justify-center items-center h-40 text-purple-400 animate-pulse">
//           <FiLoader className="text-3xl animate-spin" />
//           <span className="ml-2">Loading dashboard...</span>
//         </div>
//       ) : (
//         <>
//           {activeTab === 'summary' && (
//             <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
//               <Card title="Projects" value={stats.projectCount} />
//               <Card title="Messages" value={stats.messageCount} />
//               <Card title="Users" value={stats.userCount} />
//             </div>
//           )}

//           {activeTab === 'users' && (
//             <List title="Users" items={paginatedItems(users)} fields={['name', 'email', 'role']} />
//           )}

//           {activeTab === 'projects' && (
//             <List title="Projects" items={paginatedItems(projects)} fields={['title', 'techStack']} />
//           )}

//           {activeTab === 'messages' && (
//             <>
//               <List title="Messages" items={paginatedItems(messages)} fields={['name', 'email', 'message']} />
//               <a
//                 href={`${API_BASE}/api/contact/export/csv?token=${token}`}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 onClick={() => logAction('Export Messages CSV')}
//                 className="inline-block mt-4 bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-4 rounded-lg transition-all"
//               >
//                 📁 Export Messages as CSV
//               </a>
//             </>
//           )}

//           {activeTab === 'logs' && (
//             <List title="Audit Logs" items={paginatedItems(logs)} fields={['action', 'user', 'details', 'createdAt']} />
//           )}

//           {/* Pagination */}
//           {activeTab !== 'summary' && totalPages(currentTabData) > 1 && (
//             <div className="flex justify-center mt-6 space-x-2">
//               {Array.from({ length: totalPages(currentTabData) }, (_, i) => (
//                 <button
//                   key={i}
//                   onClick={() => setPage(i + 1)}
//                   className={`px-3 py-1 rounded ${
//                     page === i + 1 ? 'bg-purple-600 text-white' : 'bg-gray-800 text-gray-300'
//                   }`}
//                 >
//                   {i + 1}
//                 </button>
//               ))}
//             </div>
//           )}
//         </>
//       )}
//     </div>
//   );
// };

// const Card = ({ title, value }) => (
//   <div className="bg-[#1a102e] p-6 rounded shadow text-center">
//     <h3 className="text-lg font-semibold text-gray-300">{title}</h3>
//     <p className="text-2xl font-bold text-purple-400">{value ?? '—'}</p>
//   </div>
// );

// const List = ({ title, items, fields }) => (
//   <div>
//     <h3 className="text-xl font-semibold text-purple-400 mb-4">{title}</h3>
//     <div className="overflow-x-auto">
//       <table className="min-w-full bg-[#1a102e] text-sm text-left rounded">
//         <thead>
//           <tr>
//             {fields.map(f => (
//               <th key={f} className="px-4 py-2 text-gray-400">{f}</th>
//             ))}
//           </tr>
//         </thead>
//         <tbody>
//           {items.length === 0 ? (
//             <tr>
//               <td colSpan={fields.length} className="px-4 py-4 text-center text-gray-500">
//                 No data available
//               </td>
//             </tr>
//           ) : (
//             items.map((item, idx) => (
//               <tr key={idx} className="border-t border-gray-700">
//                 {fields.map(f => (
//                   <td key={f} className="px-4 py-2 text-gray-200">
//                     {Array.isArray(item[f])
//                       ? item[f].join(', ')
//                       : typeof item[f] === 'object' && !(item[f] instanceof Date)
//                       ? <pre className="whitespace-pre-wrap">{JSON.stringify(item[f], null, 2)}</pre>
//                       : f === 'createdAt'
//                       ? new Date(item[f]).toLocaleString()
//                       : item[f] ?? '—'}
//                     </td>
//                  ))}
//                </tr>
//              ))
//            )}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );

//  export default AdminDashboardSection;















import React, { useEffect, useState } from 'react';
import { FiLoader } from 'react-icons/fi';

const AdminDashboardSection = () => {
  const [activeTab, setActiveTab] = useState('summary');
  const [stats, setStats] = useState({});
  const [users, setUsers] = useState([]);
  const [projects, setProjects] = useState([]);
  const [messages, setMessages] = useState([]);
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);
  const itemsPerPage = 10;

  const API_BASE = process.env.REACT_APP_API_BASE;
  const token = localStorage.getItem('token');

  const logAction = async (action, details = {}) => {
    if (!token) return;
    try {
      await fetch(`${API_BASE}/api/admin/audit-logs`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ action, user: 'admin', details })
      });
    } catch (err) {
      console.error('Audit log error:', err);
    }
  };

  const handleLogout = async () => {
    try {
      await fetch(`${API_BASE}/api/admin/logout`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` }
      });
    } catch (err) {
      console.error('Logout error:', err);
    } finally {
      localStorage.removeItem('token');
      window.location.href = '/admin/login';
    }
  };

  useEffect(() => {
    if (!token) {
      console.warn('⚠️ No token found in localStorage');
      return;
    }

    const fetchData = async () => {
      setLoading(true);
      try {
        const headers = { Authorization: `Bearer ${token}` };
        const endpoints = [
          `${API_BASE}/api/admin/summary`,
          `${API_BASE}/api/admin/users`,
          `${API_BASE}/api/admin/projects`,
          `${API_BASE}/api/admin/messages`,
          `${API_BASE}/api/admin/audit-logs`
        ];

        const responses = await Promise.allSettled(endpoints.map(url => fetch(url, { headers })));
        const results = await Promise.all(
          responses.map(res => res.status === 'fulfilled' ? res.value.json() : [])
        );

        setStats(results[0] || {});
        setUsers(results[1] || []);
        setProjects(results[2] || []);
        setMessages(results[3] || []);
        setLogs(results[4] || []);

        console.log('✅ Dashboard data loaded:', {
          stats: results[0],
          users: results[1],
          projects: results[2],
          messages: results[3],
          logs: results[4]
        });
      } catch (err) {
        console.error('Dashboard fetch error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [API_BASE, token]);

  useEffect(() => {
    setPage(1);
  }, [searchTerm]);

  const handleTabSwitch = (tab) => {
    setActiveTab(tab);
    setSearchTerm('');
    setPage(1);
    logAction('Switch Tab', { tab });
  };

  const filteredItems = (items) =>
    items.filter((item) =>
      Object.values(item)
        .join(' ')
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    );

  const paginatedItems = (items) =>
    filteredItems(items).slice((page - 1) * itemsPerPage, page * itemsPerPage);

  const totalPages = (items) =>
    Math.ceil(filteredItems(items).length / itemsPerPage);

  const tabDataMap = {
    users,
    projects,
    messages,
    logs
  };

  const currentTabData = tabDataMap[activeTab] || [];

  return (
    <div className="py-12">
      {/* Header with Logout */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-purple-400">Admin Dashboard</h2>
        <button
          onClick={handleLogout}
          className="bg-red-600 hover:bg-red-700 text-white font-semibold px-4 py-2 rounded-lg transition-all"
        >
          🔓 Logout
        </button>
      </div>

      {/* Tabs */}
      <div className="flex space-x-4 mb-6">
        {['summary', 'users', 'projects', 'messages', 'logs'].map(tab => (
          <button
            key={tab}
            onClick={() => handleTabSwitch(tab)}
            className={`px-4 py-2 rounded ${
              activeTab === tab ? 'bg-purple-600 text-white' : 'bg-gray-800 text-gray-300'
            }`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {/* Search */}
      {activeTab !== 'summary' && (
        <input
          type="text"
          placeholder={`Search ${activeTab}...`}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="mb-6 px-4 py-2 rounded bg-[#1a102e] text-white placeholder-gray-400 border border-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
      )}

      {/* Content */}
      {loading ? (
        <div className="flex justify-center items-center h-40 text-purple-400 animate-pulse">
          <FiLoader className="text-3xl animate-spin" />
          <span className="ml-2">Loading dashboard...</span>
        </div>
      ) : (
        <>
          {activeTab === 'summary' && (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <Card title="Projects" value={stats.projectCount} />
              <Card title="Messages" value={stats.messageCount} />
              <Card title="Users" value={stats.userCount} />
            </div>
          )}

          {activeTab === 'users' && (
            <List title="Users" items={paginatedItems(users)} fields={['name', 'email', 'role']} />
          )}

          {activeTab === 'projects' && (
            <List title="Projects" items={paginatedItems(projects)} fields={['title', 'techStack']} />
          )}

          {activeTab === 'messages' && (
            <>
              <List title="Messages" items={paginatedItems(messages)} fields={['name', 'email', 'message']} />
              <a
                // href={`${API_BASE}/api/contact/export/csv?token=${token}`}
                href={`${API_BASE}/api/admin/messages/export/csv?token=${token}`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => logAction('Export Messages CSV')}
                className="inline-block mt-4 bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-4 rounded-lg transition-all"
              >
                📁 Export Messages as CSV
              </a>
            </>
          )}

          {activeTab === 'logs' && (
            <List title="Audit Logs" items={paginatedItems(logs)} fields={['action', 'user', 'details', 'createdAt']} />
          )}

          {/* Pagination */}
          {activeTab !== 'summary' && totalPages(currentTabData) > 1 && (
            <div className="flex justify-center mt-6 space-x-2">
              {Array.from({ length: totalPages(currentTabData) }, (_, i) => (
                <button
                  key={i}
                  onClick={() => setPage(i + 1)}
                  className={`px-3 py-1 rounded ${
                    page === i + 1 ? 'bg-purple-600 text-white' : 'bg-gray-800 text-gray-300'
                  }`}
                >
                  {i + 1}
                </button>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

const Card = ({ title, value }) => (
  <div className="bg-[#1a102e] p-6 rounded shadow text-center">
    <h3 className="text-lg font-semibold text-gray-300">{title}</h3>
    <p className="text-2xl font-bold text-purple-400">{value ?? '—'}</p>
  </div>
);

const List = ({ title, items, fields }) => (
  <div>
    <h3 className="text-xl font-semibold text-purple-400 mb-4">{title}</h3>
    <div className="overflow-x-auto">
      <table className="min-w-full bg-[#1a102e] text-sm text-left rounded">
        <thead>
          <tr>
            {fields.map(f => (
              <th key={f} className="px-4 py-2 text-gray-400 capitalize">{f}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {items.length === 0 ? (
            <tr>
              <td colSpan={fields.length} className="px-4 py-4 text-center text-gray-500">
                No data available
              </td>
            </tr>
          ) : (
            items.map((item, idx) => (
              <tr key={idx} className="border-t border-gray-700 hover:bg-purple-900/10">
                {fields.map(f => (
                  <td key={f} className="px-4 py-2 text-gray-200">
                    {Array.isArray(item[f])
                      ? item[f].join(', ')
                      : typeof item[f] === 'object' && !(item[f] instanceof Date)
                      ? <pre className="whitespace-pre-wrap">{JSON.stringify(item[f], null, 2)}</pre>
                      : f === 'createdAt' && item[f]
                      ? new Date(item[f]).toLocaleString()
                      : item[f] ?? '—'}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  </div>
);



export default AdminDashboardSection;