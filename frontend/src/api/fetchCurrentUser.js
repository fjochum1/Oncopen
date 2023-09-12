import axios from './index.js';

/* The fetchUser function sends a GET request to the backend API
to find the data of the users in the database. */
const fetchCurrentUser = async () => {
  try {
    const response = await axios.get(`userGet`);
    return response.data;

  } catch (error) {
    console.error(`Fetch operation failed: ${error}`);
    return [];
  }
};

export default fetchCurrentUser;
