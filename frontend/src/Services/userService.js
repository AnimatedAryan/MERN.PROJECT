import axios from 'axios';

export const fetchUserProfile = async () => {
    const backend=import.meta.env.VITE_BACKEND_URL;
    try {
        const response = await axios.get(`${backend}/api/user/profile`, {
            withCredentials: true 
        });
        return response.data.user;
    } catch (err){
        console.error('Error fetching user profile:', err);
        throw err;
    }
};
export default fetchUserProfile;
