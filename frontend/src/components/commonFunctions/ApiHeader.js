const token = sessionStorage.getItem("access_token");
const ApiHeader = { headers: { Authorization: `Bearer ${token}` } }

export default ApiHeader;