const BASE_URL = import.meta.env.VITE_API_URL;

if (!BASE_URL) {
  throw new Error('VITE_API_URL is not set');
}

const apiUrls = {
  reports: `${BASE_URL}/reports`,
  clients: `${BASE_URL}/clients`,
};

export default apiUrls;
