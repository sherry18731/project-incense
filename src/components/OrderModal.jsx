import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { pushMessage } from "../redux/toastSlice";

const BASE_URL = import.meta.env.VITE_BASE_URL;
const API_PATH = import.meta.env.VITE_API_PATH;

function OrderModal({ closeProductModal, getOrders, tempOrder }) {
  const [isLoading, setIsLoading] = useState(false);
  const [tempData, setTempData] = useState({
    is_paid: '',
    status: 0,
    ...tempOrder,
  });
  const dispatch = useDispatch();

  useEffect(() => {
    setTempData({
      ...tempOrder,
      is_paid: tempOrder.is_paid,
      status: tempOrder.status,
    });
  }, [tempOrder]);

  const handleChange = (e) => {
    const { name, value, checked } = e.target;
    if (['is_paid'].includes(name)) {
      setTempData((preState) => ({ ...preState, [name]: checked }));
    } else {
      setTempData((preState) => ({ ...preState, [name]: value }));
    }
  };

  const submit = async () => {
    setIsLoading(true);
    try {
      let api = `${BASE_URL}/v2/api/${API_PATH}/admin/order/${tempOrder.id}`;
      const res = await axios.put(api, {
        data: {
          ...tempData,
        },
      });
      console.log(res);
      dispatch(pushMessage({ text: "成功修改訂單", status: "success" }));
      setIsLoading(false);
      closeProductModal();
      getOrders();
    } catch (error) {
      dispatch(pushMessage({ text: "修改訂單失敗", status: "danger", error }));
      setIsLoading(false);
    }
  };

  return (
    <div
      className='modal fade'
      tabIndex='-1'
      id='orderModal'
      aria-labelledby='exampleModalLabel'
      aria-hidden='true'
    >
      <div className='modal-dialog modal-lg'>
        <div className='modal-content'>
          <div className='modal-header'>
            <h1 className='modal-title fs-5' id='exampleModalLabel'>
              {`編輯 ${tempData.id}`}
            </h1>
            <button
              type='button'
              className='btn-close'
              aria-label='Close'
              onClick={closeProductModal}
            />
          </div>
          <div className='modal-body'>
            <div className='mb-3 row'>
              <span className='col-sm-2 col-form-label'>Email</span>
              <div className='col-sm-10'>
                <input
                  type='email'
                  readOnly
                  className='form-control-plaintext'
                  id='staticEmail'
                  defaultValue={tempOrder?.user?.email}
                />
              </div>
            </div>
            <div className='mb-3 row'>
              <span className='col-sm-2 col-form-label'>訂購者</span>
              <div className='col-sm-10'>
                <input
                  type='text'
                  readOnly
                  className='form-control-plaintext'
                  id='staticEmail'
                  defaultValue={tempOrder?.user?.name}
                />
              </div>
            </div>
            <div className='mb-3 row'>
              <span className='col-sm-2 col-form-label'>地址</span>
              <div className='col-sm-10'>
                <input
                  type='text'
                  readOnly
                  className='form-control-plaintext'
                  defaultValue={tempOrder?.user?.address}
                />
              </div>
            </div>
            <div className='mb-3 row'>
              <span className='col-sm-2 col-form-label'>留言</span>
              <div className='col-sm-10'>
                <textarea
                  name=''
                  id=''
                  cols='30'
                  readOnly
                  className='form-control-plaintext'
                  defaultValue={tempOrder.message}
                />
              </div>
            </div>
            {tempOrder.products && (
              <table className='table'>
                <thead>
                  <tr>
                    <th>品項名稱</th>
                    <th>時間</th>
                    <th>數量</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.values(tempOrder.products).map((cart) => (
                    <tr key={cart.id}>
                      <td>{cart.product.title}</td>
                      <td>{cart.product.dute}</td>
                      <td>{cart.qty}</td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr>
                    <td className='border-0'></td>
                    <td className='border-0 text-end'>總金額</td>
                    <td className='border-0'>${tempOrder.total}</td>
                  </tr>
                </tfoot>
              </table>
            )}

            <div>
              <h5 className='mt-4'>修改訂單狀態</h5>
              <div className='form-check mb-4'>
                <label className='form-check-label' htmlFor='is_paid'>
                  <input
                    className='form-check-input'
                    type='checkbox'
                    name='is_paid'
                    id='is_paid'
                    checked={!!tempData.is_paid}
                    onChange={handleChange}
                    disabled={isLoading}
                  />
                  付款狀態 ({tempData.is_paid ? '已付款' : '未付款'})
                </label>
              </div>
              <div className='mb-4'>
                <span className='col-sm-2 col-form-label d-block'>
                  課程進度
                </span>
                <select
                  className='form-select'
                  name='status'
                  value={tempData.status}
                  onChange={handleChange}
                  disabled={isLoading}
                >
                  <option value={0}>未成團</option>
                  <option value={1}>已成團</option>
                  <option value={2}>已結束</option>
                </select>
              </div>
            </div>
          </div>
          <div className='modal-footer'>
            <button
              type='button'
              className='btn btn-secondary'
              onClick={closeProductModal}
            >
              關閉
            </button>
            <button type='button' className='btn btn-primary' onClick={submit}>
              儲存
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderModal;