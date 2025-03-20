import CartCheck from "../components/CartCheck"

export default function CheckoutSuccess() {

  return (
    <div className='container full-height'>
      <div
        style={{
          minHeight: '200px',
          backgroundImage:
            'url(https://images.unsplash.com/photo-1480399129128-2066acb5009e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80)',
          backgroundPosition: 'center center',
        }}
      ></div>
      <div className='mt-5 mb-7'>
        <div className='row'>
          <div className='col-md-6'>
            <h2>課程預約成功</h2>
            <p className='text-muted'>
              親愛的朋友，感謝您在本平台訂餐。我們非常感激您對我們的信任和支持，讓我們有機會為您提供優質的服務。
            </p>
            <p className='text-muted'>
              感謝您選擇本平台，祝您生活愉快！
            </p>
            <Link to='/' className='btn btn-outline-dark me-2 rounded-0 mb-4'>
              回到首頁
            </Link>
          </div>
          <div className='col-md-6'>
            <CartCheck />
          </div>
        </div>
      </div>
    </div>
  )
}