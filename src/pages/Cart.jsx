import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useOutletContext, useNavigate } from "react-router-dom"
// import ProgressBar from "../components/ProgressBar";

const BASE_URL = import.meta.env.VITE_BASE_URL;
const API_PATH = import.meta.env.VITE_API_PATH;

export default function Cart() {
  const { cartData, getCart } = useOutletContext();
  const [loadingItem, setLoadingItem] = useState([]);
  const navigate = useNavigate();

  const removeCartItem = async (id) => {
    try {
      await axios.delete(`${BASE_URL}/v2/api/${API_PATH}/cart/${id}`);
      getCart();
    } catch (error) {
      console.log("error", error)
    }
  }

  const removeCarts = async () => {
    try {
      await axios.delete(`${BASE_URL}/v2/api/${API_PATH}/carts`);
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
    <div className="container my-10">
      {/* <ProgressBar /> */}
      <div className="row flex-column flex-lg-row justify-content-center align-items-center align-items-lg-start">
        <div className="col-lg-6">
          <div className="p-4">
            <div className="d-flex align-items-center justify-content-between gap-3 bg-primary-03 text-primary-01 rounded py-3">
              <div className="d-flex align-items-center flex-grow-1">
              <div style={{ width: 60 }}></div>
                <p className="flex-grow-1 fw-semibold ms-3">課程</p>
                <p className="fw-semibold">人數</p>
              </div>
              <div style={{ width: "100px" }} className="text-end">
                <p className="fw-semibold">金額</p>
              </div>
              <div style={{ width: 60 }}></div>
            </div>
              
            { cartData?.carts?.map((item) => {
              return (
                <div key={item.id} className="border-bottom px-1 py-5">
                  <div className="d-flex align-items-center justify-content-between gap-3">
                    <img
                      style={{ width: 60, height: 60, objectFit: "cover", maxWidth: "none" }}
                      className="rounded"
                      src={item.product.imageUrl}
                      alt={item.product.title}
                    />

                    <div className="d-flex align-items-center flex-grow-1">
                      <div className="flex-grow-1">
                        <p>{item.product.title}</p>
                        <p className="text-muted">
                          <small>NT${item.product.price} / 每位</small>
                        </p>
                      </div>
                      <select
                        style={{ width: 60, height: 40 }}
                        className="form-select ms-2"
                        value={item.qty}
                        disabled={loadingItem.includes(item.id)}
                        onChange={(e) => updateCartItem(item, e.target.value * 1)}
                      >
                        {[...(new Array(6))].map((_, num) => (
                          <option key={num} value={num + 1}>{num + 1}</option>
                        ))}
                      </select>
                    </div>

                    <div className="text-end" style={{ width: "100px" }}>
                      <p className="fs-10 fw-bold">NT${item.final_total}</p>
                    </div>

                    <button
                      onClick={() => removeCartItem(item.id)}
                      type="button"
                      className="btn text-gray-02"
                    >
                      <i className="bi bi-trash-fill" />
                    </button>
                  </div>
                </div>
              )
            })}
            <div className="d-flex align-items-center">
              <div className="input-group my-8 w-75">
                <input
                  type="text"
                  className="form-control"
                  id="couponInput"
                  placeholder="請輸入優惠碼"
                />
                <button
                  className="btn btn-primary-03 text-primary-01"
                  type="button"
                  id="button-addon2"
                >
                  使用優惠碼
                </button>
              </div>
              <button type="button" className="btn text-gray-02 fs-11 ms-auto py-0" onClick={removeCarts}>清除購物車</button>
            </div>
            <div className="border-top py-3">
              <div className="d-flex justify-content-between pb-3 px-3">
                <p className="fs-10 fw-bold">小記</p>
                <p className="fs-9 fw-bold">NT${cartData?.final_total}</p>
              </div>
              <div className="d-flex justify-content-between pb-3 px-3">
                <p className="fs-10 fw-bold">優惠卷折扣</p>
                <p className="fs-10 fw-bold"></p>
              </div>
              
              <div className="d-flex justify-content-end bg-primary-03 text-primary-01 rounded p-4">
                <p className="mb-0 h4 fw-bold">總金額</p>
                <p className="mb-0 h4 fw-bold">NT${cartData?.final_total}</p>
              </div>
            </div>
            
          </div>

        </div>

        <div className="col-lg-4">
          <div className="p-4">
            <p className="fw-semibold bg-primary-03 text-primary-01 text-center rounded p-3 mb-4">聯絡資料</p>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-2">
                <label htmlFor="name" className="text-muted mb-0 form-label">
                聯絡人<span className="text-primary-02">*</span>
                </label>
                <input
                  id="name"
                  type="text"
                  className="form-control rounded mt-1"
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
                <label htmlFor="ContactMail" className="text-muted mb-0 form-label">
                  信箱<span className="text-primary-02">*</span>
                </label>
                <input
                  type="email"
                  className="form-control rounded mt-1"
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
                <label htmlFor="tel" className="text-muted mb-0 form-label">
                  電話<span className="text-primary-02">*</span>
                </label>
                <input
                  type="text"
                  className="form-control rounded mt-1"
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
                  地址
                </label>
                <input
                  type="text"
                  className="form-control rounded mt-1"
                  id="address"
                  placeholder="請輸入聯絡地址"
                  {...register("address")}
                />
                {errors.address && <p className="text-danger">{errors.address.message}</p>}
              </div>
              <div>
                <label htmlFor="message" className="text-muted mb-0 form-label">備註</label>
                <textarea
                  className="form-control mt-1"
                  placeholder=""
                  id="message"
                  defaultValue={""}
                  {...register("message")}
                />
                
              </div>

            </form>
          </div>
          <div className="p-4">
            <h4 className="fw-semibold mb-4">付款方式</h4>
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
              {/* <div className="form-check mb-2">
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
              </div> */}
              {errors.payment && <p className="text-danger">支付方式為必選</p>}
              <div className="d-flex flex-column-reverse flex-md-row mt-4 justify-content-end between align-items-md-center align-items-end w-100">
                <button type="submit" className="btn btn-primary-03 text-primary-01 fs-8 fw-bold py-2 w-100">
                  確認送出
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}