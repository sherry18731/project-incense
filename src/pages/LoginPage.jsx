import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useDispatch } from 'react-redux';
import { login } from '../redux/authSlice';
import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL;
const BASE_API_PATH = import.meta.env.VITE_API_PATH

export default function LoginPage() {
  const navigate = useNavigate();  
  const dispatch = useDispatch();
  
  const [loginState, setLoginState] = useState({});
  const [account, setAccount] = useState({
    username: "shw18731@gmail.com",
    password: "qaz123wsx456",
  });
  
  const handleInputChange = (e) => {
    const { value, name } = e.target;
    setAccount({...account, [name]: value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${BASE_URL}/v2/admin/signin`, account);
      // 存取 token, expired為到期日
      const { token, expired } = res.data;
      document.cookie = `hexToken=${token}; expires=${new Date(expired)}`;
      axios.defaults.headers.common["Authorization"] = token;
      if (res.data.success) {
        navigate("/admin/products");
      }
    } catch (error) {
      console.log(error);
      setLoginState(error.response.data);
    }
  };

  useEffect(() => {
    const token = document.cookie
      .split('; ')
      .find((row) => row.startsWith('hexToken='))
      ?.split('=')[1];
    axios.defaults.headers.common['Authorization'] = token;
  }, [])


  // const checkUserLogin = async () => {
  //   try {
  //     await axios.post(`${BASE_URL}/v2/api/user/check`);
  //     getProducts();
  //     setIsAuth(true);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  // useEffect(() => {
  //   const token = document.cookie.replace(
  //     // eslint-disable-next-line no-useless-escape
  //     /(?:(?:^|.*;\s*)hexToken\s*\=\s*([^;]*).*$)|^.*$/,
  //     "$1",
  //   );
  //   axios.defaults.headers.common['Authorization'] = token;
  //   checkUserLogin()
  // },[])

  return (
    <div className="d-flex flex-column justify-content-center align-items-center my-5">
      <h1 className="mb-5">請先登入</h1>
      
      <form onSubmit={handleLogin} className="d-flex flex-column gap-3">
        <div className="form-floating mb-3">
          <input
            name="username"
            value={account.username}
            onChange={handleInputChange}
            type="email"
            className="form-control"
            id="username"
            placeholder="name@example.com"
            autoComplete= "current-username"
          />
          <label htmlFor="username">Email address</label>
        </div>
        <div className="form-floating">
          <input
            name="password"
            value={account.password}
            onChange={handleInputChange}
            type="password"
            className="form-control"
            id="password"
            placeholder="Password"
            autoComplete= "current-password"
          />
          <label htmlFor="password">Password</label>
        </div>
        <button className="btn btn-primary-02" onClick={() => dispatch(login())}>登入</button>
        <div className={`alert alert-danger text-center ${loginState.message ? 'd-block' : 'd-none'}`} role='alert'>
        {loginState.message}</div>
      </form>

      <p className="mt-5 mb-3 text-muted">&copy; 2025~∞ - 香聚</p>
    </div>
  )
}