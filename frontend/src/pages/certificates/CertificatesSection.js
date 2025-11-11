// // // --- CERTIFICATES SECTION ---
// // const Certificates = () => {
// //     return (
// //         <section id="certificates" data-section className="py-24">
// //             <div className="container mx-auto px-6">
// //                 <h2 className="text-4xl font-bold text-center text-white mb-16">
// //                     My <span className="text-purple-400">Certificates</span>
// //                 </h2>
// //                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
// //                     {certificatesData.map((cert, index) => (
// //                         <div
// //                             key={index}
// //                             className="bg-[#1a112b] rounded-lg overflow-hidden border border-purple-800/50 shadow-lg hover:shadow-purple-500/20 transition-all transform hover:scale-105 group"
// //                         >
// //                             <img
// //                                 src={cert.imageUrl}
// //                                 alt={cert.title}
// //                                 className="w-full h-48 object-cover"
// //                             />
// //                             <div className="p-6">
// //                                 <h3 className="text-2xl font-semibold text-white mb-2">{cert.title}</h3>
// //                                 <p className="text-purple-300 font-medium mb-1">{cert.issuer}</p>
// //                                 <p className="text-gray-400 text-sm mb-4">{cert.date}</p>
// //                                 <a
// //                                     href={cert.verifyUrl}
// //                                     target="_blank"
// //                                     rel="noopener noreferrer"
// //                                     className="text-purple-400 hover:text-purple-300 font-medium inline-flex items-center"
// //                                 >
// //                                     View Certificate <ExternalLink size={16} className="ml-1.5" />
// //                                 </a>
// //                             </div>
// //                         </div>
// //                     ))}
// //                 </div>
// //             </div>
// //         </section>
// //     );
// // };









// import React, { useEffect, useState } from 'react';
// import { ExternalLink, X } from 'react-feather';

// const Certificates = () => {
//   const [certificates, setCertificates] = useState([]);
//   const [selectedCert, setSelectedCert] = useState(null);

//   // Simulate dynamic fetch from CMS/backend
//   useEffect(() => {
//     const fetchCertificates = async () => {
//       try {
//         const response = await fetch('/api/certificates'); // Replace with actual CMS endpoint
//         const data = await response.json();
//         setCertificates(data);
//       } catch (error) {
//         console.warn('Using fallback certificate data');
//         setCertificates([
//           {
//             title: 'Full Stack Web Development',
//             issuer: 'Coursera',
//             date: 'June 2024',
//             imageUrl: 'https://placehold.co/600x400/1a112b/4f3286?text=Full+Stack+Cert',
//             verifyUrl: 'https://coursera.org/verify/fullstack-cert',
//             alt: 'Full Stack Web Development Certificate from Coursera',
//           },
//           {
//             title: 'React – The Complete Guide',
//             issuer: 'Udemy',
//             date: 'March 2024',
//             imageUrl: 'https://placehold.co/600x400/1a112b/4f3286?text=React+Cert',
//             verifyUrl: 'https://udemy.com/certificate/react-complete-guide',
//             alt: 'React Complete Guide Certificate from Udemy',
//           },
//           {
//             title: 'MongoDB for Developers',
//             issuer: 'MongoDB University',
//             date: 'January 2024',
//             imageUrl: 'https://placehold.co/600x400/1a112b/4f3286?text=MongoDB+Cert',
//             verifyUrl: 'https://university.mongodb.com/certificates/mongodb-dev',
//             alt: 'MongoDB for Developers Certificate from MongoDB University',
//           },
//         ]);
//       }
//     };

//     fetchCertificates();
//   }, []);

//   return (
//     <section id="certificates" data-section className="section py-24 bg-[#140c23] px-4 sm:px-6 lg:px-8">
//       <div className="max-w-screen-xl mx-auto">
//         {/* Section Heading */}
//         <h2 className="text-4xl sm:text-5xl font-bold text-center text-white mb-16 animate-fadeIn">
//           My <span className="text-purple-400">Certificates</span>
//         </h2>

//         {/* Certificate Grid */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
//           {certificates.map((cert, index) => (
//             <div
//               key={index}
//               className={`bg-[#1a112b] rounded-lg overflow-hidden border border-purple-800/50 shadow-lg transition-all transform hover:scale-105 group cursor-pointer animate-fadeIn delay-${index * 100}`}
//               onClick={() => setSelectedCert(cert)}
//             >
//               <img
//                 src={cert.imageUrl}
//                 alt={cert.alt || `Certificate: ${cert.title}`}
//                 className="w-full h-48 object-cover"
//               />
//               <div className="p-6">
//                 <h3 className="text-xl sm:text-2xl font-semibold text-white mb-2">{cert.title}</h3>
//                 <p className="text-purple-300 font-medium mb-1">{cert.issuer}</p>
//                 <p className="text-gray-400 text-sm mb-4">{cert.date}</p>
//                 <a
//                   href={cert.verifyUrl}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="text-purple-400 hover:text-purple-300 font-medium inline-flex items-center"
//                   aria-label={`Verify ${cert.title} certificate`}
//                   onClick={(e) => e.stopPropagation()}
//                 >
//                   View Certificate <ExternalLink size={16} className="ml-1.5" />
//                 </a>
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* Modal Preview */}
//         {selectedCert && (
//           <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
//             <div className="bg-[#1a112b] rounded-lg overflow-hidden shadow-xl max-w-xl w-full relative animate-fadeIn">
//               <button
//                 onClick={() => setSelectedCert(null)}
//                 className="absolute top-4 right-4 text-gray-400 hover:text-white"
//                 aria-label="Close modal"
//               >
//                 <X size={24} />
//               </button>
//               <img
//                 src={selectedCert.imageUrl}
//                 alt={selectedCert.alt}
//                 className="w-full h-auto object-cover"
//               />
//               <div className="p-6">
//                 <h3 className="text-2xl font-bold text-white mb-2">{selectedCert.title}</h3>
//                 <p className="text-purple-300 font-medium mb-1">{selectedCert.issuer}</p>
//                 <p className="text-gray-400 text-sm mb-4">{selectedCert.date}</p>
//                 <a
//                   href={selectedCert.verifyUrl}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="text-purple-400 hover:text-purple-300 font-medium inline-flex items-center"
//                 >
//                   Verify Certificate <ExternalLink size={16} className="ml-1.5" />
//                 </a>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </section>
//   );
// };

// export default Certificates;









import React, { useEffect, useState } from 'react';
import { ExternalLink, X, Download } from 'react-feather';

const Certificates = () => {
  const [certificates, setCertificates] = useState([]);
  const [selectedCert, setSelectedCert] = useState(null);

  useEffect(() => {
    setCertificates([
      {
        title: 'Java Full Stack Development',
        issuer: 'Code For Success',
        date: 'October 2025',
        imageUrl: '/media/images/javacertificate .png',
        verifyUrl: '#',
        downloadUrl: '/javacertificate.pdf',
        certId: '68596033fde7402d40da858d',
        alt: 'Java Full Stack Development Certificate from Code For Success',
      },
      {
        title: 'Delta – Full Stack Web Development',
        issuer: 'Apna College',
        date: 'Issued by Shradha Khapra',
        imageUrl: '/media/images/deltacertificate.png',
        verifyUrl: '#',
        downloadUrl: '/certificate-delta.pdf',
        certId: '685bbbf12038292ba40b2107',
        alt: 'Delta Full Stack Web Development Certificate from Apna College',
      },
    ]);
  }, []);

  return (
    <section id="certificates" data-section className="section py-24 bg-[#140c23] px-4 sm:px-6 lg:px-8">
      <div className="max-w-screen-xl mx-auto">
        <h2 className="text-4xl sm:text-5xl font-bold text-center text-white mb-16 animate-fadeIn">
          My <span className="text-purple-400">Certificates</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {certificates.map((cert, index) => (
            <div
              key={index}
              className={`certificate-card glass project-card rounded-lg overflow-hidden border border-purple-800/50 shadow-lg transition-all transform hover:scale-105 group cursor-pointer delay-[${index * 100}ms]`}
              onClick={() => setSelectedCert(cert)}
            >
              <div className="relative">
                <img
                  src={cert.imageUrl}
                  alt={cert.alt || `Certificate: ${cert.title}`}
                  className="w-full h-48 object-cover"
                />
                <div className="ribbon animate-float">🎓</div>
              </div>
              <div className="p-6">
                <h3 className="text-xl sm:text-2xl font-semibold text-white mb-2">{cert.title}</h3>
                <p className="text-purple-300 font-medium mb-1">{cert.issuer}</p>
                <p className="text-gray-400 text-sm mb-4">{cert.date}</p>
                <div className="flex gap-4 items-center">
                  <a
                    href={cert.verifyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-purple-400 hover:text-purple-300 font-medium inline-flex items-center"
                    aria-label={`Verify ${cert.title} certificate`}
                    onClick={(e) => e.stopPropagation()}
                  >
                    View <ExternalLink size={16} className="ml-1.5" />
                  </a>
                  <a
                    href={cert.downloadUrl}
                    download
                    className="text-gray-400 hover:text-purple-400 font-medium inline-flex items-center"
                    onClick={(e) => e.stopPropagation()}
                  >
                    Download <Download size={16} className="ml-1.5" />
                  </a>
                  <span className="tooltip group ml-auto text-xs text-purple-300">
                    ID
                    <span className="tooltip-text group-hover:scale-100">{cert.certId}</span>
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {selectedCert && (
          <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4 modal-fade">
            <div className="bg-[#1a112b] rounded-lg overflow-hidden shadow-xl max-w-xl w-full relative animate-slideUp">
              <button
                onClick={() => setSelectedCert(null)}
                className="absolute top-4 right-4 text-gray-400 hover:text-white"
                aria-label="Close modal"
              >
                <X size={24} />
              </button>
              <img
                src={selectedCert.imageUrl}
                alt={selectedCert.alt}
                className="w-full h-auto object-cover"
              />
              <div className="p-6">
                <h3 className="text-2xl font-bold text-white mb-2">{selectedCert.title}</h3>
                <p className="text-purple-300 font-medium mb-1">{selectedCert.issuer}</p>
                <p className="text-gray-400 text-sm mb-4">{selectedCert.date}</p>
                <div className="flex gap-4">
                  <a
                    href={selectedCert.verifyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-purple-400 hover:text-purple-300 font-medium inline-flex items-center"
                  >
                    Verify <ExternalLink size={16} className="ml-1.5" />
                  </a>
                  <a
                    href={selectedCert.downloadUrl}
                    download
                    className="text-gray-400 hover:text-purple-400 font-medium inline-flex items-center"
                  >
                    Download <Download size={16} className="ml-1.5" />
                  </a>
                </div>
                <div className="mt-4 text-xs text-purple-300 tooltip group">
                  Certificate ID
                  <span className="tooltip-text group-hover:scale-100">{selectedCert.certId}</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Certificates;









