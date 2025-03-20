import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import axios from "axios";

import Navbar from "./Navbar";
import Footer from "./Footer";

const BASE_URL = import.meta.env.VITE_BASE_URL;
const API_PATH = import.meta.env.VITE_API_PATH;

export default function FrontLayout() {
  const routes = [
    { path: "/", name: "首頁", icon: "book_5" },
    { path: "/activities", name: "近期活動", icon: "people-fill" },
    // { path: "/about", name: "關於香遇", icon: "chat-right-text-fill" },
    // { path: "/center", name: "會員中心", icon: "house-fill" },
    // { path: "/login", name: "登入", icon: "" },
    { path: "/cart", name: "購物車", icon: "cart-fill" },
  ];

  const [cartData, setCartData] = useState({});

  const getCart = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/v2/api/${API_PATH}/cart`);
      setCartData(res.data.data);
    } catch (error) {
    }
  }

  useEffect(() => {
    getCart()
  },[])
 

  return (
    <div className="d-flex flex-column justify-content-between min-vh-100">
      <Navbar routes={routes} cartData={cartData}/>
      <Outlet context={{ getCart, cartData }} />
      <Footer routes={routes}/>
    </div>
  )
}