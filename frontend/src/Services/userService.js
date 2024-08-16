import axios from 'axios';

export const fetchUserProfile = async () => {
    try {
        const response = await axios.get('http://localhost:8000/api/user/profile', {
            withCredentials: true 
        });
        return response.data.user;
    } catch (err){
        console.error('Error fetching user profile:', err);
        throw err;
    }
};
export default fetchUserProfile;
