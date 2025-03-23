import { useEffect, useState } from "react";
import { useOutletContext, useNavigate, Link, useParams } from "react-router-dom"
import CartCheck from "../components/CartCheck"
import CartContact from "../components/CartContact"
import axios from "axios"

const BASE_URL = import.meta.env.VITE_BASE_URL;
const API_PATH = import.meta.env.VITE_API_PATH;

export default function CheckoutSuccess() {
  const { orderId } = useParams();
  const [ orderData, setOrderData ] = useState({})
  const navigate = useNavigate();

  const getCart = async (orderId) => {
    try {
      const res = await axios.get(`${BASE_URL}/v2/api/${API_PATH}/order/${orderId}`)
      setOrderData( res.data.order )
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getCart(orderId);
  },[orderId])

  const payOrder = async () => {
    if (!orderId) {
      console.error("orderId 未定義");
      return;
    }
    try {
      const res = await axios.post(`${BASE_URL}/v2/api/${API_PATH}/pay/${orderId}`,{
        "success": true,
        "message": "付款完成"
      })
    } catch (error) {
      console.log(error)
    }
    navigate(`/pay-success/${orderId}`)
  }

  return (
    <div className='container full-height'>
      <div className='my-7'>
        <div className='row justify-content-center'>
          <div className='col-md-4'>
          <h3 className='text-primary-02 fs-5 hina-mincho-regular'>確認訂單</h3>
            <p className='text-primary-01'>
              請您確認訂單資訊
            </p>
            <p className='text-primary-01'>
              若有任何問題請與我們聯繫，謝謝
            </p>
            <div className="d-flex justify-content-end mt-5">
              <Link to={`/`} className="btn btn btn-outline-primary-03 text-primary-01 me-3">回到首頁</Link>
              <Link onClick={payOrder} className="btn btn btn-primary-03 text-primary-01">前往結賬</Link>
            </div>
          </div>
          <div className='col-md-4 '>
            <CartCheck />
            <CartContact />
          </div>
        </div>
      </div>
    </div>
  )
}