import apiInstance from './api';
import history from '../CustomRouter/history';

type signupType = {
    email: string;
    password: string;
};

const signUp = async ({ email, password }: signupType) => {
    try {
        const response = await apiInstance.post('/auth/signup', {
            email: email,
            password: password,
        });

        console.log(response.data);
        history.replace('/login');
    } catch (err) {
        console.log(err);
    }
};

export default signUp;
