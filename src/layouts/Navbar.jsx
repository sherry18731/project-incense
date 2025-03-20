import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";

export default function Navbar({ routes, cartData }) {
  const activeClass = ({ isActive }) => `position-relative nav-link front-nav-link text-primary-01 ${isActive ? "text-primary-02" : ""}`;

  const [isNavbarOpen, setIsNavbarOpen] = useState(false);

  const toggleNavbar = () => {
    setIsNavbarOpen(!isNavbarOpen);
  };

  const handleLinkClick = () => {
    setIsNavbarOpen(false);
  };

  // 監聽窗口大小的變化
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 992) {
        setIsNavbarOpen(true); // 在桌面斷點時強制展開
      } else {
        setIsNavbarOpen(false); // 在移動設備上折疊
      }
    };

    // 初始檢查
    handleResize();

    // 添加事件監聽器
    window.addEventListener("resize", handleResize);

    // 清除事件監聽器
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <nav className="position-relative navbar navbar-expand-lg bg-brand-03 py-4 overflow-hidden">
      <img className="opacity-75 position-absolute translate-middle z-1" src="https://firebasestorage.googleapis.com/v0/b/homework-b5f67.appspot.com/o/header-bg.png?alt=media&token=6ad62b15-f928-4dd2-a728-2eff65a879e1" alt="..." style={{height: '100px', top: '20px'}}/>
      <img className="opacity-75 position-absolute top-50 start-100 translate-middle z-1" src="https://firebasestorage.googleapis.com/v0/b/homework-b5f67.appspot.com/o/header-bg.png?alt=media&token=6ad62b15-f928-4dd2-a728-2eff65a879e1" alt="..." style={{height: '80px'}}/>
      <div className="container d-flex flex-lg-column flex-row justify-content-between align-items-center">
        <NavLink className="mb-lg-3 z-2" to='/'>
          {/* <img src="logo-02.svg" alt="logo" style={{width: '200px'}}/> */}
          <img src="https://firebasestorage.googleapis.com/v0/b/homework-b5f67.appspot.com/o/logo-02.svg?alt=media&token=f30b0f83-d31b-4c6e-a331-ac8efef49ca1" alt="logo" style={{height: '70px'}}/>
        </NavLink>
        <button
          className="navbar-toggler border-0 z-1"
          type="button"
          onClick={toggleNavbar}
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon text-primary-01"></span>
        </button>

        <div className={`collapse navbar-collapse ${isNavbarOpen ? "show" : ""}`} id="navbarNav">
          <ul className="navbar-nav ms-auto gap-4 text-center my-5 my-md-0">
          {
            routes.map((routes) => (
              <li key={routes.path} className="nav-item">
                <NavLink 
                onClick={handleLinkClick}
                className={activeClass}
                to={routes.path}>
                <i className={`bi bi-${routes.icon} me-1`}></i>
                {routes.name !== "購物車" ? `${routes.name}` : 
                <span className="position-absolute top-25 start-75 translate-middle badge rounded-pill bg-theme-red-01">{cartData.carts?.length}</span> }
                </NavLink>
                {/* {cartData.carts?.length} */}
              </li>
            )) 
          }
          {/* <li className="nav-item">
            <NavLink className={`${activeClass} position-relative`} to="cart">
              <i className="bi bi-cart-fill me-1"></i>
              購物車
            </NavLink>
          </li> */}
          </ul>
        </div>
      </div>
    </nav>
  )
}