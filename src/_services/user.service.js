import config from 'config';
import { authHeader } from '../_helpers';
import { axios } from 'axios';

export const userService = {
    login,
    logout,
    // register,
    getAll,
    // getById,
    // update,
    // delete: _delete
};

const apiUrl = 'http://apisendev.paket.co.id/api/v1';

function login(email, password) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
    };

    return axios({
        method: requestOptions.method,
        url: `${apiUrl}/login`,
        headers: requestOptions.headers,
        data: requestOptions.body
    }).then( result => {
        // login successful if there's a access_token in the response
        if (result.status) {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem('user', JSON.stringify(result));
        }

        return result;
    });
}

function logout() {
    // remove user from local storage to log out
    localStorage.removeItem('user');
}

function getAll() {
    const requestOptions = {
        url: `${apiUrl}/users`,
        method: 'GET',
        headers: authHeader()
    };

    return axios.request(requestOptions)
        .then( result => {
            return result;
        });
}

// function handleResponse(response) {
//     return response.text().then(text => {
//         const data = text && JSON.parse(text);
//         if (!response.ok) {
//             if (response.status === 401) {
//                 // auto logout if 401 response returned from api
//                 logout();
//                 location.reload(true);
//             }

//             const error = (data && data.message) || response.statusText;
//             return Promise.reject(error);
//         }

//         return data;
//     });
// }