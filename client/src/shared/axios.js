import axios from 'axios';
import {URL} from './url';

const token = localStorage.getItem('jwt_token');

export default axios.create({
  baseURL: URL + '/api/',
  headers: {
    'Authorization': token,
    'Content-Type': 'application/json;charset=utf-8'}
})
