import router from '@/router';

const BASE_URL =
  process.env.NODE_ENV === 'production' ? '/quiz' : '//localhost:3000/quiz';

import Axios from 'axios';
var axios = Axios.create({
  withCredentials: true
});

async function ajax(endpoint, method = 'get', data = null) {
  try {
    const res = await axios({
      url: `${BASE_URL}${endpoint}`,
      method,
      data
    });
    return res.data;
  } catch (err) {
    if (err.response.status === 401) {
      router.push('/');
    } else {
      throw new error();
    }
  }
}

export default {
  get(endpoint, data) {
    return ajax(endpoint, 'GET', data);
  },
  post(endpoint, data) {
    return ajax(endpoint, 'POST', data);
  },
  put(endpoint, data) {
    return ajax(endpoint, 'PUT', data);
  },
  delete(endpoint, data) {
    return ajax(endpoint, 'DELETE', data);
  }
};
