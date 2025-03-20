import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useOutletContext, useNavigate, Link } from "react-router-dom"
import ProgressBar from "../components/ProgressBar";

const BASE_URL = import.meta.env.VITE_BASE_URL;
const API_PATH = import.meta.env.VITE_API_PATH;

export default function Cart() {
  const { cartData, getCart } = useOutletContext();
  const [loadingItem, setLoadingItem] = useState([]);
  const navigate = useNavigate();

  const removeCartItem = async (id) => {
    try {
      const res = await axios.delete(`${BASE_URL}/v2/api/${API_PATH}/cart/${id}`);
      getCart();
    } catch (error) {
      console.log("error", error)
    }
  }

  const removeCarts = async () => {
    try {
      const res = await axios.delete(`${BASE_URL}/v2/api/${API_PATH}/carts`);
      getCart();
    } catch (error) {
      console.log("error", error)
    }
  }

  const updateCartItem = async (item, qty) => {
    const data = {
      data: {
        "product_id": item.product_id,
        "qty": qty
      }
    };
    setLoadingItem([...loadingItem, item.id])
    try {
      const res = await axios.put(`${BASE_URL}/v2/api/${API_PATH}/cart/${item.id}`,
        data
      );
      console.log(res)
      setLoadingItem(loadingItem.filter((loadingObject) => loadingObject !== item.id))
      getCart();
    } catch (error) {
      console.log("error", error)
    }
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onTouched",
  });

  const onSubmit = async (data) => {
    const { name, email, tel, address } = data;

    const form = {
      data: {
        user: {
          name,
          email,
          tel,
          address
        },
        // message: "這是留言"
      },
    };
    const res = await axios.post(`${BASE_URL}/v2/api/${API_PATH}/order`, 
      form,
    )
    console.log(res)
    navigate(`/checkout-success/${res.data.orderId}`)
  };
  
  
  return (
    <div className="container">
      {/* <ProgressBar /> */}
      <div className="row justify-content-center my-6">
        <div className="col-md-6 bg-white py-2">
          <div className="p-4">
          <div className="d-flex justify-content-between align-items-center">
            <h4 className="fw-bold mb-0">報名課程</h4>
            <button 
              type="button" className="btn btn-sm btn-gray-03 text-gray-01 fs-11" onClick={removeCarts}
              >清除購物車</button>
          </div>
            { cartData?.carts?.map((item) => {
              return (
                <div key={item.id} className="d-flex mt-4 bg-light">
                <div className="d-flex align-items-center" style={{ width: 120, height: 120 }}>
                  <img
                    className="w-100 h-100 object-fit-cover"
                    src={item.product.imageUrl}
                    alt={item.product.title}
                  />
                </div>
                  <div className="w-100 p-3 position-relative">
                    <button
                      onClick={() => (removeCartItem(item.id))}
                      type="button"
                      className="position-absolute btn"
                      style={{ top: 8, right: 8 }}
                    >
                      <i className="bi bi-x-lg" />
                    </button>
                    <p className="mb-0 fw-bold">{item.product.title}</p>
                    <p className="mb-1 text-muted" style={{ fontSize: 14 }}>
                      {item.product.content}
                    </p>
                    <div className="d-flex justify-content-between align-items-center w-100">
                      <select name="" id="" 
                        className="form-select w-50" 
                        value={item.qty}
                        disabled={loadingItem.includes(item.id)}
                        onChange={
                          (e) =>{
                            updateCartItem( item, e.target.value * 1)
                          }}>
                        {
                          [...(new Array(6))].map((i, num) => {
                            return (
                              <option key={num} value={num + 1}>{num + 1}</option>
                            )
                          })
                        }
                      </select>
                      <p className="mb-0 ms-auto">NT${item.final_total}</p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          {/* 折價卷區域-未開發 */}
          {/* <table className="table mt-4 text-muted">
            <tbody>
              <tr>
                <th scope="row" className="border-0 px-0 font-weight-normal">
                  Lorem ipsum
                </th>
                <td className="text-end border-0 px-0">NT$24,000</td>
              </tr>
              <tr>
                <th scope="row" className="border-0 px-0 pt-0 font-weight-normal">
                  Lorem ipsum
                </th>
                <td className="text-end border-0 px-0 pt-0">NT$500</td>
              </tr>
            </tbody>
          </table> */}
          {/* <Link
            to="/checkout"
            className="btn btn-primary-01 text-brand-04 mt-4 rounded-0 py-3 w-100"
          >
            確認報名
          </Link> */}
            <div className="bg-white p-4">
              <h4 className="fw-bold">聯絡資料</h4>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-2">
                  <label htmlFor="ContactMail" className="text-muted mb-0 form-label">
                    信箱<span className="text-danger">*</span>
                  </label>
                  <input
                    type="email"
                    className="form-control rounded-0"
                    id="ContactMail"
                    placeholder="請輸入信箱"
                    {...register("email", {
                      required: "信箱為必填資料",
                      pattern: {
                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/i,
                        message: "請輸入正確的信箱格式",
                      },
                    })}
                  />
                  {errors.email && <p className="text-danger">{errors.email.message}</p>}
                </div>
                <div className="mb-2">
                  <label htmlFor="name" className="text-muted mb-0 form-label">
                  聯絡人<span className="text-danger">*</span>
                  </label>
                  <input
                    id="name"
                    type="text"
                    className="form-control rounded-0"
                    placeholder="請輸入聯絡人"
                    {...register("name", {
                      required: "聯絡人為必填資料",
                      maxLength: {
                        value: 12,
                        message: "聯絡人姓名請勿超過12個字",
                      },
                    })}
                  />
                  {errors.name && <p className="text-danger">{errors.name.message}</p>}
                </div>
                <div className="mb-2">
                  <label htmlFor="tel" className="text-muted mb-0 form-label">
                    聯絡電話<span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control rounded-0"
                    id="tel"
                    placeholder="請輸入聯絡電話"
                    {...register("tel", {
                      required: "聯絡電話為必填資料",
                      pattern: {
                        value: /^\d{4}\d{3}\d{3}$/,
                        message: "Invalid phone number format (0933-123-123)",
                      },
                    })}
                  />
                  {errors.tel && <p className="text-danger">{errors.tel.message}</p>}
                </div>
                <div className="mb-2">
                  <label htmlFor="address" className="text-muted mb-0 form-label">
                    聯絡地址<span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control rounded-0 mt-1"
                    id="address"
                    placeholder="請輸入聯絡地址"
                    {...register("address", { required: "聯絡地址為必填資料" })}
                  />
                  {errors.address && <p className="text-danger">{errors.address.message}</p>}
                </div>
              </form>
            </div>
            <div className="bg-white p-4">
              <h4 className="fw-bold">付款方式</h4>
              <form onSubmit={handleSubmit(onSubmit)}>
                {/* <p className="mt-4 mb-2">Payment</p> */}
                <div className="form-check mb-2">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="gridRadios"
                    id="gridRadios1"
                    value="WebATM"
                    {...register("payment", { required: "Payment method is required" })}
                  />
                  <label className="form-check-label text-muted" htmlFor="gridRadios1">
                    線上支付
                  </label>
                </div>
                <div className="form-check mb-2">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="gridRadios"
                    id="gridRadios2"
                    value="ATM"
                    {...register("payment", { required: "Payment method is required" })}
                  />
                  <label className="form-check-label text-muted" htmlFor="gridRadios2">
                    ATM 轉帳
                  </label>
                </div>
                <div className="form-check mb-2">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="gridRadios"
                    id="gridRadios3"
                    value="credit"
                    {...register("payment", { required: "Payment method is required" })}
                  />
                  <label className="form-check-label text-muted" htmlFor="gridRadios3">
                    信用卡
                  </label>
                </div>
                {errors.payment && <p className="text-danger">支付方式為必選</p>}
                <div className="d-flex flex-column-reverse flex-md-row mt-4 justify-content-between align-items-md-center align-items-end w-100">
                  <Link to="/activities" className="text-dark mt-md-0 mt-3">
                    <i className="bi bi-chevron-left me-2" /> 繼續選購
                  </Link>
                  <button type="submit" className="btn btn-primary-02 py-2 px-7 rounded-1">
                    確認送出 <i className="bi bi-chevron-right ms-2" />
                  </button>
                </div>
              </form>
            </div>
          </div>

          <div className="col-md-4">
            <div className="border p-4 mb-4">
              <h4 className="mb-4">訂單明細</h4>
              { cartData?.carts?.map((item) => {
                console.log(item)
                return (
                  <div className="d-flex mt-2">
                    <img
                      src={item.product.imageUrl}
                      alt={item.product.title}
                      className="me-2"
                      style={{ width: 48, height: 48, objectFit: "cover" }}
                    />
                    <div className="w-100">
                      <div className="d-flex justify-content-between fw-bold">
                        <p className="mb-0">{item.product.title}</p>
                        <p className="mb-0">x{item.qty}</p>
                      </div>
                      <div className="d-flex justify-content-between">
                        <p className="text-muted mb-0">
                          <small>NT${item.product.price}</small>
                        </p>
                        <p className="mb-0">NT${item.final_total}</p>
                      </div>
                    </div>
                  </div>
                )
              })}
              {/* <table className="table bg-light mt-4 border-top border-bottom text-muted">
                <tbody>
                  <tr>
                    <th scope="row" className="border-0 px-0 pt-4 font-weight-normal">
                      Subtotal
                    </th>
                    <td className="text-end border-0 px-0 pt-4">NT$24,000</td>
                  </tr>
                  <tr>
                    <th scope="row" className="border-0 px-0 pt-0 pb-4 font-weight-normal">
                      Payment
                    </th>
                    <td className="text-end border-0 px-0 pt-0 pb-4">ApplePay</td>
                  </tr>
                </tbody>
              </table> */}
              <div className="d-flex justify-content-between border-top pt-3 mt-4">
                <p className="mb-0 h4 fw-bold">總金額</p>
                <p className="mb-0 h4 fw-bold">NT${cartData?.final_total}</p>
              </div>
            </div>
          </div>
      </div>
    </div>
  )
}