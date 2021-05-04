import axios from 'axios';

const API_URL = 'http://localhost:4000/'||'http://f8111a0b2e1d.ngrok.io'||'https://generated-gold-dolphin.glitch.me/';
const instance = axios.create({ baseURL: API_URL, headers: {
    'Content-Type': 'application/json'
  },        withCredentials: true});

export default instance;