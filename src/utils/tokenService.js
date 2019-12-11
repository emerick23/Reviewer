function setToken(token) {
    if (token) {
      localStorage.setItem('token', token);
    } else {
      localStorage.removeItem('token');
    }
  }
  
  function getToken() {
    let token = localStorage.getItem('token');
    if (token) {
      // Convert to base64
      const decodedToken = decode(token)
      // Check if expired, remove if it is
      const payload = JSON.parse(atob(decodedToken.split('.')[1]))
      // JWT's exp is expressed in seconds, not milliseconds, so convert
      if (payload.exp < Date.now() / 1000) {
        localStorage.removeItem('token');
        token = null;
      }
    }
    return token;
  }
  
  function getUserFromToken() {
    const token = getToken();
    if (token) {
      const decodedToken = decode(token)
      return JSON.parse(atob(decodedToken.split('.')[1])).user
    } else {
      return null
    }
  }
  
  function removeToken() {
    localStorage.removeItem('token');
  }
  
  function decode(input) {
    input = input
      .replace(/-/g, '+')
      .replace(/_/g, '/');
    var pad = input.length % 4;
    if (pad) {
      input += new Array(5 - pad).join('=');
    }
    return input;
  }
  
  export default {
    setToken,
    getToken,
    removeToken,
    getUserFromToken
  };