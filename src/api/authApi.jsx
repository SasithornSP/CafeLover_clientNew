import axios from '../configs/axios';

const authApi = {};

//axios.js มีการ configs tokenให้แล้ว ไม่ต้องส่งtokenเข้าไป
authApi.register = async (body) => axios.post('/register',body)
authApi.login = async (body) => axios.post('/login',body)
authApi.currentUser = async () => axios.get('/currentUser-user')

export default authApi;