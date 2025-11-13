
// import React, { useEffect, useState } from 'react';

// const AdminMessages = () => {
//   const [messages, setMessages] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');

//   const token = localStorage.getItem('token');
//   const API_BASE = import.meta.env?.VITE_API_BASE || 'http://localhost:5000';
//   if (!import.meta.env?.VITE_API_BASE) {
//     console.warn(' VITE_API_BASE is undefined — using fallback:', API_BASE);
//   }

//   useEffect(() => {
//     if (!token) {
//       console.warn(' No token found in localStorage');
//       setError('Unauthorized: No token found');
//       setLoading(false);
//       return;
//     }

//     const fetchMessages = async () => {
//       const timestamp = new Date().toISOString();
//       console.log(`[${timestamp}]  Fetching admin messages from ${API_BASE}/api/admin/messages`);

//       try {
//         const res = await fetch(`${API_BASE}/api/admin/messages`, {
//           headers: { Authorization: `Bearer ${token}` }
//         });

//         console.log(`[${timestamp}] Response status:`, res.status);
//         if (!res.ok) {
//           const errData = await res.json().catch(() => ({}));
//           const errMsg = errData.message || `Failed to fetch messages: status ${res.status}`;
//           throw new Error(errMsg);
//         }

//         const data = await res.json();
//         setMessages(data);
//         console.log(`[${timestamp}]  Messages loaded: ${Array.isArray(data) ? data.length : 'unknown'}`, data);

//       } catch (err) {
//         console.error(' Error fetching messages:', err.message);
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchMessages();
//   }, [API_BASE, token]);

//   return (
//     <section className="p-8 bg-[#1a112b] text-white rounded-lg shadow-lg">
//       <h2 className="text-2xl font-bold mb-4">📨 Contact Messages</h2>

//       {loading ? (
//         <p className="text-purple-400 animate-pulse">Loading messages...</p>
//       ) : error ? (
//         <p className="text-red-400">Error: {error}</p>
//       ) : messages.length === 0 ? (
//         <p className="text-gray-400">No messages found.</p>
//       ) : (
//         <div className="overflow-x-auto">
//           <table className="w-full text-left border-collapse">
//             <thead>
//               <tr className="bg-purple-800/40">
//                 <th className="p-3">Name</th>
//                 <th className="p-3">Email</th>
//                 <th className="p-3">Message</th>
//                 <th className="p-3">Date</th>
//               </tr>
//             </thead>
//             <tbody>
//               {messages.map((msg) => (
//                 <tr key={msg._id || `${msg.email}-${msg.createdAt}`} className="border-b border-purple-700/30">
//                   <td className="p-3">{msg.name || '—'}</td>
//                   <td className="p-3">{msg.email || '—'}</td>
//                   <td className="p-3 whitespace-pre-wrap break-words max-w-xs">{msg.message || '—'}</td>
//                   <td className="p-3">
//                     {msg.createdAt
//                       ? new Date(msg.createdAt).toLocaleString()
//                       : '—'}
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}
//     </section>
//   );
// };

// export default AdminMessages;









import React, { useEffect, useState } from 'react';

const AdminMessages = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [deletingId, setDeletingId] = useState(null);

  const token = localStorage.getItem('token');
  const API_BASE = import.meta.env?.VITE_API_BASE || 'http://localhost:5000';
  if (!import.meta.env?.VITE_API_BASE) {
    console.warn('⚠️ VITE_API_BASE is undefined — using fallback:', API_BASE);


  }

  useEffect(() => {
    if (!token) {
      console.warn('❌ No token found in localStorage');
      setError('Unauthorized: No token found');
      setLoading(false);
      return;
    }

    const fetchMessages = async () => {
      const timestamp = new Date().toISOString();
      console.log(`[${timestamp}] 📩 Fetching admin messages from ${API_BASE}/api/admin/messages`);

      try {
        const res = await fetch(`${API_BASE}/api/admin/messages`, {
          headers: { Authorization: `Bearer ${token}` }
        });

        console.log(`[${timestamp}] Response status:`, res.status);
        if (!res.ok) {
          const errData = await res.json().catch(() => ({}));
          const errMsg = errData.message || `Failed to fetch messages: status ${res.status}`;
          throw new Error(errMsg);
        }

        const data = await res.json();
        setMessages(data);
        console.log(`[${timestamp}] ✅ Messages loaded: ${Array.isArray(data) ? data.length : 'unknown'}`, data);

      } catch (err) {
        console.error('❌ Error fetching messages:', err.message);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();
  }, [API_BASE, token]);

  const handleDelete = async (id) => {
    const timestamp = new Date().toISOString();
    if (!window.confirm('Are you sure you want to delete this message?')) return;

    setDeletingId(id);
    try {
      const res = await fetch(`${API_BASE}/api/admin/messages/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.message || `Failed to delete message: status ${res.status}`);
      }

      setMessages(prev => prev.filter(msg => msg._id !== id));
      console.log(`[${timestamp}] 🗑️ Message deleted: ${id}`);
    } catch (err) {
      console.error(`[${timestamp}] ❌ Error deleting message:`, err.message);
      alert(`Error deleting message: ${err.message}`);
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <section className="p-8 bg-[#1a112b] text-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4">📨 Contact Messages</h2>

      {loading ? (
        <p className="text-purple-400 animate-pulse">Loading messages...</p>
      ) : error ? (
        <p className="text-red-400">Error: {error}</p>
      ) : messages.length === 0 ? (
        <p className="text-gray-400">No messages found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-purple-800/40">
                <th className="p-3">Name</th>
                <th className="p-3">Email</th>
                <th className="p-3">Message</th>
                <th className="p-3">Date</th>
                <th className="p-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {messages.map((msg) => (
                <tr key={msg._id || `${msg.email}-${msg.createdAt}`} className="border-b border-purple-700/30">
                  <td className="p-3">{msg.name || '—'}</td>
                  <td className="p-3">{msg.email || '—'}</td>
                  <td className="p-3 whitespace-pre-wrap break-words max-w-xs">{msg.message || '—'}</td>
                  <td className="p-3">
                    {msg.createdAt ? new Date(msg.createdAt).toLocaleString() : '—'}
                  </td>
                  <td className="p-3">
                    <button
                      onClick={() => handleDelete(msg._id)}
                      disabled={deletingId === msg._id}
                      className={`bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm transition-all ${deletingId === msg._id ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105'}`}
                    >
                      {deletingId === msg._id ? 'Deleting...' : 'Delete'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
};

export default AdminMessages;