import { useEffect, useRef, useState } from "react";
import { Modal } from 'bootstrap';
import axios from "axios";
import { useDispatch } from "react-redux";
import { pushMessage } from "../redux/toastSlice";

const BASE_URL = import.meta.env.VITE_BASE_URL;
const API_PATH = import.meta.env.VITE_API_PATH;

function CouponModal({modalMode, tempCoupon, isOpen, setIsOpen, getCoupons}) {
  const couponModalRef = useRef(null);
  const [modalData, setModalData] = useState(tempCoupon);
  const [date, setDate] = useState(new Date());
  const dispatch = useDispatch();

  useEffect(() => {
    setModalData({
      ...tempCoupon,
      due_date: date.getTime()
    });
    setDate(new Date(tempCoupon.due_date))
  },[tempCoupon])
  
  useEffect(() => {
    new Modal(couponModalRef.current,{
      backdrop: false
    });
  },[])

  useEffect(() => {
    if(isOpen) {
      const modaInstance = Modal.getInstance(couponModalRef.current);
      modaInstance.show();
    }
  },[isOpen])

  const handleCloseModal = () => {
    const modaInstance = Modal.getInstance(couponModalRef.current);
    modaInstance.hide();
    setIsOpen(false)
  }

  const handleModalInputChange = (e) => {
    const {name, value, checked, type} = e.target;
  
    setModalData({
      ...modalData,
      [name]: type === "checkbox" ? checked : value
    })
  }

  const createCoupon = async() => {
    try {
      await axios.post(`${BASE_URL}/v2/api/${API_PATH}/admin/coupon` , {
        data: {
          ...modalData,
          due_date: date.getTime(),
          percent: Number(modalData.percent),
          is_enabled: modalData.is_enabled ? 1 : 0
        }
      })
      dispatch(pushMessage({text: '成功新增優惠卷', status: 'success'}))
    } catch (error) {
      const { message } = error.response.data;
      dispatch(pushMessage({text: message.join("、"), status: 'fail'}))
      console.log(error)
    }
  }
  
  const updateCoupon = async() => {
    try {
      const res = await axios.put(`${BASE_URL}/v2/api/${API_PATH}/admin/coupon/${modalData.id}` , {
        data: {
          ...modalData,
          due_date: date.getTime(),
          percent: Number(modalData.percent),
          is_enabled: modalData.is_enabled ? 1 : 0
        }
      });
      console.log(res)
      dispatch(pushMessage({text: '成功修改優惠卷', status: 'success'}))
    } catch (error) {
      dispatch(pushMessage({text: '修改產品失敗', status: 'fail'}))
      console.log(error)
    }
  }

  const handleUpdateCoupon = async() => {
    const apiCall = modalMode === 'create' ? createCoupon : updateCoupon;
    try {
    await apiCall();
    getCoupons();
    handleCloseModal();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div ref={couponModalRef} id="productModal" className="modal" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
      <div className="modal-dialog modal-dialog-centered modal-xl">
        <div className="modal-content border-0 shadow">
          <div className="modal-header border-bottom">
            <h5 className="modal-title fs-4">{modalMode === 'create' ? '新增優惠卷' : '編輯優惠卷'}</h5>
            <button onClick={handleCloseModal} type="button" className="btn-close" aria-label="Close"></button>
          </div>

          <div className="modal-body p-4">
            <div className="row g-4">

              <div className="col">
                <div className="mb-3">
                  <label htmlFor="title" className="form-label">
                    標題
                  </label>
                  <input
                    value={modalData.title}
                    onChange={handleModalInputChange}
                    name="title"
                    id="title"
                    type="text"
                    className="form-control"
                    placeholder="請輸入標題"
                  />
                </div>

                <div className="row g-3 mb-3">
                  <div className="col-6">
                    <label htmlFor="percent" className="form-label">
                      折扣％
                    </label>
                    <input
                      min={0}
                      value={modalData.percent}
                      onChange={handleModalInputChange}
                      name="percent"
                      id="percent"
                      type="text"
                      className="form-control"
                      placeholder="請輸入折扣％"
                    />
                  </div>
                  <div className="col-6">
                    <label htmlFor="du_date" className="form-label">
                      到期日
                    </label>
                    <input
                      value={`${date.getFullYear()}-${(date.getMonth() + 1)
                        .toString()
                        .padStart(2, "0")}-${date
                        .getDate()
                        .toString()
                        .padStart(2, "0")}`}
                      onChange={(e) => {
                        setDate(new Date(e.target.value));
                      }}
                      name="du_date"
                      id="du_date"
                      type="date"
                      className="form-control"
                      placeholder="請輸入到期日"
                    />
                  </div>
                </div>

                <div className="mb-3">
                  <label htmlFor="code" className="form-label">
                    優惠碼
                  </label>
                  <input
                    value={modalData.code}
                    onChange={handleModalInputChange}
                    name="code"
                    id="code"
                    type="text"
                    className="form-control"
                    placeholder="請輸入優惠碼"
                  />
                </div>

                <div className="form-check">
                  <input
                    checked={modalData.is_enabled}
                    onChange={handleModalInputChange}
                    name="is_enabled"
                    type="checkbox"
                    className="form-check-input"
                    id="isEnabled"
                  />
                  <label className="form-check-label" htmlFor="isEnabled">
                    是否啟用
                  </label>
                </div>
              </div>
            </div>
          </div>

          <div className="modal-footer border-top bg-light">
            <button onClick={handleCloseModal} type="button" className="btn btn-secondary">
              取消
            </button>
            <button onClick={handleUpdateCoupon} type="button" className="btn btn-primary">
              確認
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CouponModal;