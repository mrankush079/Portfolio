
import React, { useState, useEffect } from 'react';
import { Send, Mail, Phone, MapPin, GitHub, Linkedin } from 'react-feather';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    console.group(' VITE ENV DEBUG');
    console.log('import.meta.env:', import.meta.env);
    console.log('import.meta.env.VITE_API_BASE:', import.meta.env?.VITE_API_BASE);
    console.log('import.meta.env.MODE:', import.meta.env?.MODE);
    console.log('import.meta.env.DEV:', import.meta.env?.DEV);
    console.log('import.meta.env.PROD:', import.meta.env?.PROD);
    console.groupEnd();
  }, []);

  // Safely access the env-variable
  const API_BASE = (import.meta.env?.VITE_API_BASE)
    ? import.meta.env.VITE_API_BASE
    : 'http://localhost:5000';

  if (!import.meta.env?.VITE_API_BASE) {
    console.warn(' VITE_API_BASE not set — using fallback:', API_BASE);
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        toast.success(' Message sent successfully!');
        setFormData({ name: '', email: '', message: '' });
      } else {
        const errorData = await response.json();
        toast.error(` Failed to send message: ${errorData.error || 'Unknown error'}`);
      }
    } catch (err) {
      console.error('Fetch error:', err);
      toast.error(' Error connecting to server. Please check your backend.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" data-section className="py-24 bg-[#140c23] section">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-center text-white mb-4">
          Get In <span className="text-purple-400">Touch</span>
        </h2>
        <p className="text-lg text-gray-300 text-center mb-12 max-w-2xl mx-auto">
          Have a project in mind or just want to say hello? Drop me a message and let's build something amazing together.
        </p>

        <div className="flex flex-col lg:flex-row gap-12">
          {/* Contact Form */}
          <div className="lg:w-2/3">
            <form
              onSubmit={handleSubmit}
              className="bg-[#1a112b] p-8 rounded-lg border border-purple-800/50 shadow-lg animate-fadeIn"
            >
              {['name', 'email', 'message'].map(field => (
                <div className="mb-6" key={field}>
                  <label
                    htmlFor={field}
                    className="block text-sm font-medium text-gray-300 mb-2 capitalize"
                  >
                    {field}
                  </label>
                  {field !== 'message' ? (
                    <input
                      type={field === 'email' ? 'email' : 'text'}
                      id={field}
                      name={field}
                      value={formData[field]}
                      onChange={handleInputChange}
                      className="w-full bg-gray-700 text-white p-3 rounded-lg border border-gray-600 focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
                      placeholder={`Your ${field.charAt(0).toUpperCase() + field.slice(1)}`}
                      required
                    />
                  ) : (
                    <textarea
                      id="message"
                      name="message"
                      rows="5"
                      value={formData.message}
                      onChange={handleInputChange}
                      className="w-full bg-gray-700 text-white p-3 rounded-lg border border-gray-600 focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
                      placeholder="Tell me about your project..."
                      required
                    ></textarea>
                  )}
                </div>
              ))}
              <button
                type="submit"
                disabled={loading}
                className={`bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-8 rounded-lg transition-all transform shadow-lg flex items-center ${loading ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105'}`}
              >
                {loading ? 'Sending...' : 'Send Message'} <Send size={18} className="ml-2" />
              </button>
            </form>
          </div>
          {/* Contact Details */}
          <div className="lg:w-1/3">
            <div className="bg-[#1a112b] p-8 rounded-lg border border-purple-800/50 shadow-lg h-full animate-fadeIn">
              <h3 className="text-2xl font-semibold text-white mb-6">Let's Connect</h3>
              <div className="space-y-6">
                {[
                  { icon: <Mail size={20} className="text-purple-400" />, label: 'Email', value: 'ankushchoudhary2019@gmail.com', href: 'mailto:ankushchoudhary2019@gmail.com' },
                  { icon: <Phone size={20} className="text-purple-400" />, label: 'Phone', value: '7999182859', href: 'tel:+917999182859' },
                  { icon: <MapPin size={20} className="text-purple-400" />, label: 'Location', value: 'Indore, India' },
                ].map((item, idx) => (
                  <div className="flex items-center" key={idx}>
                    <div className="bg-purple-600/20 p-3 rounded-full">{item.icon}</div>
                    <div className="ml-4">
                      <h4 className="text-lg font-medium text-white">{item.label}</h4>
                      {item.href ? (
                        <a href={item.href} className="text-gray-300 hover:text-purple-400">{item.value}</a>
                      ) : (
                        <p className="text-gray-300">{item.value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              <a
                href="/media/docs/Ankush-java-mern-dev.pdf"
                download
                className="mt-6 inline-flex items-center bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-6 rounded-lg transition-all transform hover:scale-105 shadow-lg"
              >
                Download CV
              </a>

              <h4 className="text-lg font-medium text-white mt-8 mb-4">Follow Me</h4>
              <div className="flex space-x-4">
                {[
                  { icon: <GitHub size={28} />, label: 'GitHub', href: 'https://github.com/mrankush079' },
                  { icon: <Linkedin size={28} />, label: 'LinkedIn', href: 'https://www.linkedin.com/in/mrankush079/' },
                  { icon: (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" width="28" height="28" className="text-gray-400 group-hover:text-purple-400 transition-colors">
                      <path d="M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2zm0 1.5A4.25 4.25 0 0 0 3.5 7.75v8.5A4.25 4.25 0 0 0 7.75 20.5h8.5A4.25 4.25 0 0 0 20.5 16.25v-8.5A4.25 4.25 0 0 0 16.25 3.5h-8.5zm8.75 2.75a.75.75 0 1 1 0 1.5.75.75 0 0 1 0-1.5zM12 7.25a4.75 4.75 0 1 1 0 9.5a4.75 4.75 0 0 1 0-9.5zm0 1.5a3.25 3.25 0 1 0 0 6.5a3.25 3.25 0 0 0 0-6.5z"/>
                    </svg>
                  ), label: 'Instagram', href: 'https://www.instagram.com/mr_ankush_079/' },
                ].map((social, idx) => (
                  <a key={idx} href={social.href} className="group text-gray-400 hover:text-purple-400 transition-colors" aria-label={social.label} target="_blank" rel="noopener noreferrer">
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer position="bottom-right" autoClose={3000}/>
    </section>
  );
};

export default Contact;



