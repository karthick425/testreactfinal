import config from 'config';
import { authHeader } from '../_helpers';
import axios from "axios";

export const userService = {
    login,
    logout
};

function login(username, password) {
    return axios.post(`${config.authUrl}/Validate`, {
        userName: username,
        password: password
    },
        {
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => res.data).then(user => {
            if (!user.isAuthenticated) {

                return Promise.reject('Username or password is incorrect');

            }
            {
                user.isAuthenticated &&
                localStorage.setItem('user', JSON.stringify(user));
            }
            return user;
        });

}

function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('user');
}
