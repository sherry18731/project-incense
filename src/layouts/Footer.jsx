import { NavLink } from 'react-router';
import { useSelector } from 'react-redux';

export default function Footer({routes}) {
  const isLoggedIn = useSelector((state) => state.auth?.isLoggedIn ?? false);
  
  return (
    <>
      <footer className='bg-brand-04 py-4'>
        <div className="container py-lg-4">
          <div className='row row-cols-1 row-cols-lg-2'>
            <div className="col-lg-3 d-flex justify-content-center justify-content-lg-start align-items-lg-center">
              <NavLink to=''>
                  <img src="https://firebasestorage.googleapis.com/v0/b/homework-b5f67.appspot.com/o/logo-02.svg?alt=media&token=f30b0f83-d31b-4c6e-a331-ac8efef49ca1" alt="logo" style={{width:'150px'}}/>
              </NavLink>
            </div>
            <div className='col-lg-9'>
              <div className='d-flex flex-column my-4 py-2 my-lg-0 py-lg-0'>
                <div className='d-flex flex-column justify-content-between align-items-center flex-lg-row'>
                  <ul className="grid gap-3 d-flex flex-column flex-lg-row mb-5 mb-lg-4">
                    {routes.slice(1, 4).map((route) => (
                      <li key={route.name}>
                        <NavLink className="nav-link text-brand-01" to={route.path}>{route.name}</NavLink>
                      </li>
                    ))}
                      <li>
                        <NavLink className="nav-link text-brand-01" to={isLoggedIn ? "/admin/products" : "/login"}>後台管理</NavLink>
                      </li>
                  </ul>
                  <ul className='d-flex justify-content-start grid gap-0 column-gap-4 mb-lg-4'>
                    <li><NavLink><i className="fs-6 text-brand-01 hover-brand-04 bi bi-facebook"></i></NavLink></li>
                    <li> <NavLink><i className="fs-6 text-brand-01 bi bi-instagram"></i></NavLink></li>
                    <li><NavLink><i className="fs-6 text-brand-01 bi bi-line"></i></NavLink></li>
                  </ul>
                </div>
              </div>

              <div className='text-start px-5 px-lg-0'>
                <div className='d-flex flex-column-reverse align-self-start flex-lg-row justify-content-lg-between align-items-lg-end'>
                  <div className='text-brand-01 text-small me-lg-5'>
                    <p className="mb-2">Copyright@2025 Search for incense All rights reserved.</p>
                    <p>本專題僅為學習用途，不做任何商業使用。</p>
                  </div>
                  <div className='d-none d-sm-flex flex-column grid gap-0 row-gap-1 text-brand-01 mb-4 mb-lg-0'> 
                    <a className="text-brand-01" href="tel:+0800123456">客服專線：0800-123-456</a>
                    <a className="text-brand-01" href="mailto:shw18731@gmail.com">客服信箱：service@incense.com</a>
                    <span>服務時間：暫無營業時間</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}