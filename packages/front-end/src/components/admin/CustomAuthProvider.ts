import { API_ROOT, CustomDataProvider } from './CustomDataProvider';
import { JwtPayload, jwtDecode } from 'jwt-decode';

const CustomAuthProvider = {
  login: async ({ username, password }) => {
    try {
      const response = await fetch(`${API_ROOT}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('access_token', data.access_token);
        return Promise.resolve();
      } else {
        return Promise.reject('Invalid username or password');
      }
    } catch (error) {
      return Promise.reject('Invalid username or password');
    }
  },
  register: async ({ username, password, ...otherUserData }) => {
    try {
      const response = await fetch(`${API_ROOT}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: username, password, ...otherUserData }),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('access_token', data.access_token); // Adjust based on your API response
        return Promise.resolve();
      } else {
        return Promise.reject('Registration failed');
      }
    } catch (error) {
      return Promise.reject('Network error or server is down');
    }
  },
  logout: () => {
    localStorage.removeItem('access_token');
    return Promise.resolve();
  },
  checkError: (error) => {
    if (error?.status === 401) {
      // Log the user out by removing the access_token from local storage
      localStorage.removeItem('access_token');
      return Promise.reject();
    }
    return Promise.resolve();
  },
  checkAuth: () =>
    localStorage.getItem('access_token') ? Promise.resolve() : Promise.reject(),
  getPermissions: () => {
    const token = localStorage.getItem('access_token');
    if (!token) {
      return Promise.reject();
    }
    const userType = extractKeyFromToken(token, 'userType');
    return userType ? Promise.resolve(userType) : Promise.reject();
  },
  getUserDetails: () => {
    return new Promise((resolve, reject) => {
      // Extract userId from JWT token stored in localStorage or wherever you keep it
      const token = localStorage.getItem('access_token');
      if (!token) {
        reject('No token found');
        window.location.href = '/manage/login';
        return;
      }

      const userId = extractKeyFromToken(token, 'userId');

      // Use CustomDataProvider to fetch user details
      CustomDataProvider.getOne('Users', { id: userId })
        .then((response) => resolve(response.data))
        .catch((error) => {
          reject(error);
        });
    });
  },
};

const extractKeyFromToken = (token: string, key: string) => {
  const decodedPayload: JwtPayload & { userType: string } = jwtDecode(token);
  return decodedPayload[key];
};

export default CustomAuthProvider;
