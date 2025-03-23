import { useEffect, useState } from "react";
import axios from "axios";
import Pagination from "../../components/Pagination"
import CouponModal from "../../components/CouponModal";
import DelCouponModal from "../../components/DelCouponModal";
import Toast from "../../components/Toast";
import { useDispatch } from "react-redux";
import { pushMessage } from "../../redux/toastSlice";
import Loading from '../../components/Loading';

const BASE_URL = import.meta.env.VITE_BASE_URL;
const API_PATH = import.meta.env.VITE_API_PATH;

const defaultModalState = {
  title: "",
  is_enabled: 0,
  percent: 0,
  due_date: new Date(),
  code: ""
};

function AdminCoupons() {
  const [coupons, setCoupons] = useState([]);
  const [modalMode, setModalMode] = useState(null);
  const [isCouponsModalOpen, setIsCouponsModalOpen] = useState(false);
  const [isDelCouponsModalOpen, setIsDelCouponsModalOpen] = useState(false);
  const [tempCoupon, setTempCoupon] = useState(defaultModalState);
  const [isScreenLoading, setIsScreenLoading] = useState(false)
  const [date, setDate] = useState(new Date());
  const dispatch = useDispatch();

  const getCoupons = async (page = 1) => {
    setIsScreenLoading(true);
    try {
      const res = await axios.get(
        `${BASE_URL}/v2/api/${API_PATH}/admin/coupons?page=${page}`
      );
      setCoupons(res.data.coupons);
      setPageInfo(res.data.pagination);
    } catch (error) {
      dispatch(pushMessage({ text: "取得產品失敗", status: "danger", error }));
    } finally {
      setIsScreenLoading(false);
    }
  };

  useEffect(() => {
    getCoupons()
  },[])


const handleOpenDelCouponModal = (item) => {
  setTempCoupon(item)
  setIsDelCouponsModalOpen(true)
}



  const handleOpenCouponModal = (mode, coupon) => {
    setModalMode(mode);
    console.log(mode, coupon)
    
    switch (mode) {
      case 'create':
        setTempCoupon({...defaultModalState});
        setDate(new Date());
        break;
  
        case 'edit':
          setTempCoupon({
            ...coupon,
          });
          console.log(coupon);
          setDate(new Date(coupon.due_date));
          break;
    
      default:
        break;
    }
  
    setIsCouponsModalOpen(true)
  }

  const  [pageInfo, setPageInfo] = useState({})

  const handlePageChange = (page) => {
    getCoupons(page)
  }

  useEffect(() => {
    getCoupons()
  },[])

  return (
    <>
      <div className="container py-5">
        <Loading isScreenLoading={isScreenLoading}/>
        <div className="row">
          <div className="col">
            <div className="d-flex justify-content-between">
            <h2>優惠卷列表</h2>
            <button onClick={() => handleOpenCouponModal('create')} type="button" className="btn btn-primary">建立新優惠卷</button>
            </div>
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">標題</th>
                  <th scope="col">折扣%</th>
                  <th scope="col">到期日</th>
                  <th scope="col">優惠碼</th>
                  <th scope="col">是否啟用</th>
                  <th scope="col"></th>
                </tr>
              </thead>
              <tbody>
                {coupons.map((coupon) => (
                  <tr key={coupon.id}>
                    <th scope="row">{coupon.title}</th>
                    <td>{coupon.percent}%</td>
                    <td>{new Date(coupon.due_date).toLocaleDateString()}</td>
                    <td>{coupon.code}</td>
                    <td>{coupon.is_enabled == true ? <span className="text-success">啟用</span> : <span className="text-secondary">未啟用</span>}</td>
                    <td>
                    <div className="btn-group">
                      <button onClick={() => handleOpenCouponModal('edit', coupon)} type="button" className="btn btn-outline-primary btn-sm">編輯</button>
                      <button onClick={() => handleOpenDelCouponModal(coupon)} type="button" className="btn btn-outline-danger btn-sm">刪除</button>
                    </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <Pagination pageInfo={pageInfo} handlePageChange={handlePageChange}></Pagination>
        </div>
      </div>

      <CouponModal 
      modalMode={modalMode} 
      tempCoupon={tempCoupon} 
      isOpen={isCouponsModalOpen} 
      setIsOpen={setIsCouponsModalOpen}
      getCoupons={getCoupons}
      setDate={setDate} 
      />

      <DelCouponModal 
      tempCoupon={tempCoupon} 
      isOpen={isDelCouponsModalOpen} 
      setIsOpen={setIsDelCouponsModalOpen}
      getCoupons={getCoupons}/>

      <Toast/>
    </>
  )
}

export default AdminCoupons;