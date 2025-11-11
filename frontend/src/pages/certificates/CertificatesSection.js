
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









