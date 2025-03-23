import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

const BASE_URL = import.meta.env.VITE_BASE_URL;
const API_PATH = import.meta.env.VITE_API_PATH;

export default function CartCheck() {
  const { orderId } = useParams();
  const [ orderData, setOrderData ] = useState({})

  const getCart = async (orderId) => {
    try {
      const res = await axios.get(`${BASE_URL}/v2/api/${API_PATH}/order/${orderId}`)
      setOrderData( res.data.order )
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getCart(orderId)
  }, [orderId])

  return (
    <div className='card border-0 bg-gray-04 rounded-0 py-4'>
      <div className='card-header bg-gray-04 border-bottom-0 px-4 py-0'>
        <p className="fw-semibold bg-primary-03 text-primary-01 text-center rounded p-3 mb-4">訂單詳情</p>
      </div>
      <div className='card-body px-4 py-0'>
        <ul className='list-group list-group-flush'>
          {Object.values(orderData?.products || {}).map((item) => {
            return (
              <li className='list-group-item px-0' key={item.id}>
                <div className='d-flex mt-2'>
                  <img
                    src={item.product.imageUrl}
                    alt=''
                    className='object-fit-cover rounded me-2'
                    style={{ width: '60px', height: '60px' }}
                  />
                  <div className='w-100 d-flex flex-column'>
                    <div className='d-flex justify-content-between fw-bold'>
                      <h5>{item.product.title}</h5>
                      <p className='mb-0'>人數：{item.qty}</p>
                    </div>
                    <div className='d-flex justify-content-end mt-auto'>
                      <p className='mb-0'>NT${item.product.price}/每位</p>
                    </div>
                  </div>
                </div>
              </li>
            );
          })}
          <li className='list-group-item px-0 pb-0'>
            <div className='d-flex justify-content-between mt-2'>
              <p className='mb-0 h4 fw-bold'>總計<small className="fs-12 fw-light">*含折扣</small></p>
              <p className='mb-0 h4 fw-bold'>NT${orderData?.total}</p>
            </div>
          </li>
        </ul>
      </div>
    </div>
  )
}