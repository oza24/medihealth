// import axios from 'axios';

// const api = axios.create({
//   baseURL: process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000',  // ✅ fallback
// });

// export default api;

import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000', // ✅ FIXED: only the server base, no /api/vendors
});

export default api;
