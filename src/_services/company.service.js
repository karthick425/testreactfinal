import config from 'config';
import { authHeader } from '../_helpers';
import axios from "axios";

export const companyService = {
    getAll,
    getById
};


function getAll() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return axios.get(`${config.apiUrl}/api/v1.0/market/company/getall`, requestOptions).then(res => res.data);     
}

function getById(id) {
    const requestOptions = {
        method: 'GET'
    };

    return fetch(`${config.apiUrl}/api/v1.0/market/company/info/${id}`, requestOptions).then(res => res.data); 
}
