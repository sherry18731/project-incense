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
      setOrderData(res.data.order )
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getCart(orderId)
  }, [orderId])

  return (
    <div className='card rounded-0 py-4'>
      <div className='card-header border-bottom-0 bg-white px-4 py-0'>
        <h2>課程預約細節</h2>
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
                    className='object-fit-cover me-2'
                    style={{ width: '60px', height: '60px' }}
                  />
                  <div className='w-100 d-flex flex-column'>
                    <div className='d-flex justify-content-between fw-bold'>
                      <h5>{item.product.title}</h5>
                      <p className='mb-0'>x{item.qty}</p>
                    </div>
                    <div className='d-flex justify-content-between mt-auto'>
                      <p className='text-muted mb-0'>
                        <small>NT${item.product.price}</small>
                      </p>
                      <p className='mb-0'>NT${item.final_total}</p>
                    </div>
                  </div>
                </div>
              </li>
            );
          })}
          <li className='list-group-item px-0 pb-0'>
            <div className='d-flex justify-content-between mt-2'>
              <p className='mb-0 h4 fw-bold'>總計</p>
              <p className='mb-0 h4 fw-bold'>NT${orderData.total}</p>
            </div>
          </li>
        </ul>
      </div>
    </div>
  )
}