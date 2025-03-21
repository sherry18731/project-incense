import { useEffect, useRef, useState } from 'react';
import axios from "axios";
import OrderModal from "../../components/OrderModal";
import Pagination from "../../components/Pagination";
import { Modal } from "bootstrap";
import Loading from '../../components/Loading';

const BASE_URL = import.meta.env.VITE_BASE_URL;
const API_PATH = import.meta.env.VITE_API_PATH;

function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [pagination, setPagination] = useState({});
  // type: 決定 modal 展開的用途
  // const [type, setType] = useState('create'); // edit
  const [tempOrder, setTempOrder] = useState({});
  const [isScreenLoading, setIsScreenLoading] = useState(false)

  const orderModal = useRef(null);
  useEffect(() => {
    orderModal.current = new Modal('#orderModal', {
      backdrop: 'static',
    });

    getOrders();
  }, []);

  const getOrders = async (page = 1) => {
    setIsScreenLoading(true);
    try {
      const res = await axios.get(`${BASE_URL}/v2/api/${API_PATH}/admin/orders?page=${page}`);
      console.log(res);
      setOrders(res.data.orders);
      setPagination(res.data.pagination);
    } catch (error) {
      console.log(error)
    } finally {
      setIsScreenLoading(false);
    }
  }

  const openOrderModal = (order) => {
    setTempOrder(order);
    orderModal.current.show();
  }
  const closeOrderModal = () => {
    setTempOrder({});
    orderModal.current.hide();
  }

  return (
    <div className='p-3'>
      <Loading isScreenLoading={isScreenLoading}/>
      <OrderModal
        closeProductModal={closeOrderModal}
        getOrders={getOrders}
        tempOrder={tempOrder}
      />
      <h3>訂單列表</h3>
      <hr />
      <table className='table'>
        <thead>
          <tr>
            <th scope='col'>訂單 id</th>
            <th scope='col'>購買用戶</th>
            <th scope='col'>用戶信箱</th>
            <th scope='col'>訂單金額</th>
            <th scope='col'>付款狀態</th>
            <th scope='col'>付款日期</th>
            <th scope='col'>留言訊息</th>
            <th scope='col'>編輯</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => {
            return (
              <tr key={order.id}>
                <td>{order.id}</td>
                <td>
                  {order.user?.name}
                  
                </td>
                <td>{order.user?.email}</td>
                <td>${order.total}</td>
                <td>
                  {order.is_paid ? (
                    <span className='text-success fw-bold'>付款完成</span>
                  ) : (
                    '未付款'
                  )}
                </td>
                <td>
                  {order.paid_date
                    ? new Date(order.paid_date * 1000).toLocaleString()
                    : '未付款'}
                </td>
                <td>{order.message}</td>

                <td>
                  <button
                    type='button'
                    className='btn btn-primary btn-sm'
                    onClick={() => {
                      openOrderModal(order);
                    }}
                  >
                    查看
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <Pagination pageInfo={pagination} handlePageChange={getOrders} />
    </div>
  );
}

export default AdminOrders;