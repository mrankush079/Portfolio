// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import App from './App';
// import './index.css'; // Global styles

// // Mount React App
// const rootElement = document.getElementById('root');

// if (rootElement) {
//   const root = ReactDOM.createRoot(rootElement);
//   root.render(
//     <React.StrictMode>
//       <App />
//     </React.StrictMode>
//   );
// } else {
//   console.error(
//     "❌ Root element not found. Make sure <div id='root'></div> exists in public/index.html."
//   );
// }



// // index.js
// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import App from './App';
// import './index.css'; // Global styles

// const rootElement = document.getElementById('root');

// if (rootElement) {
//   const root = ReactDOM.createRoot(rootElement);
//   root.render(
//     // ✅ Only App is rendered — no StrictMode, no duplication
//     <App />
//   );
// } else {
//   console.error(
//     "❌ Root element not found. Make sure <div id='root'></div> exists in public/index.html."
//   );
// }










// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import { BrowserRouter } from 'react-router-dom';
// import App from './App';
// import './index.css';

// const rootElement = document.getElementById('root');

// if (rootElement) {
//   const root = ReactDOM.createRoot(rootElement);
//   root.render(
//     <BrowserRouter>
//       <App />
//     </BrowserRouter>
//   );
// } else {
//   console.error("❌ Root element not found. Make sure <div id='root'></div> exists in public/index.html.");
// }










// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import { BrowserRouter } from 'react-router-dom';
// import App from './App';
// import './index.css';

// const rootElement = document.getElementById('root');

// if (rootElement) {
//   const root = ReactDOM.createRoot(rootElement);
//   root.render(
//     <BrowserRouter>
//       <App />
//     </BrowserRouter>
//   );
// }



import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';

const rootElement = document.getElementById('root');

if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </React.StrictMode>
  );
} else {
  const timestamp = new Date().toISOString();
  console.error(`[${timestamp}] ❌ Root element not found. Ensure <div id="root"></div> exists in public/index.html.`);
}
