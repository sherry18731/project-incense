import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

const BASE_URL = import.meta.env.VITE_BASE_URL;
const API_PATH = import.meta.env.VITE_API_PATH;

export default function CartContact() {
  const { orderId } = useParams();
  const [ orderData, setOrderData ] = useState({})

  const getCart = async (orderId) => {
    try {
      const res = await axios.get(`${BASE_URL}/v2/api/${API_PATH}/order/${orderId}`)
      setOrderData( res.data.order )
      console.log( res.data.order )
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getCart(orderId)
  }, [orderId])

  return (
    <div className='card rounded-0'>
      <div className='card-body'>
        <ul className='list-group list-group-flush text-start'>
          <li className='list-group-item'>
            聯絡信箱：{orderData?.user?.email}
          </li>
          <li className='list-group-item'>
            聯絡人：{orderData?.user?.name}
          </li>
          <li className='list-group-item'>
            電話：{orderData?.user?.tel}
          </li>
          <li className='list-group-item'>
            地址：{orderData?.user?.address}
          </li>
        </ul>
      </div>
    </div>
  )
}