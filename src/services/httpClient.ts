  import axios from 'axios';

  export const httpClient = axios.create({
    baseURL: 'https://wisibid.bravy.club/api/v1',
    timeout: 10000,
  });
