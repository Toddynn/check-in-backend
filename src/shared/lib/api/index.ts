import axios from 'axios';
import 'dotenv/config';

const base_url = process.env.AUTH_BASE_URL;

export const passin_key = process.env.APP_KEY_FOR_GET_ADMINS;

const api = axios.create({
	baseURL: base_url,
});

export default api;
