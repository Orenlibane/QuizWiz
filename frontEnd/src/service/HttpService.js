const BASE_URL =
  process.env.NODE_ENV === 'production' ? '/' : '//localhost:3000/quizes';

import Axios from 'axios';
var axios = Axios.create({
  withCredentials: true
});

async function ajax(endpoint, method = 'get', data = null) {
  const res = await axios({
    url: `${BASE_URL}${endpoint}`,
    method,
    data
  });
  return res.data;
}

export default {
  ajax
};
