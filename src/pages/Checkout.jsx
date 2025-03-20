import { useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";

import ProgressBar from "../components/ProgressBar";
import { Input } from "../components/FormElements";
import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL;
const API_PATH = import.meta.env.VITE_API_PATH;

export default function Checkout() {
  const navigate = useNavigate();

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
    <div className="bg-light pt-5 pb-7">
      <div className="container">
        <div className="row justify-content-center flex-md-row flex-column-reverse">
          <div className="col-md-6">
            <div className="bg-white p-4">
              <h4 className="fw-bold">1. 聯絡資料</h4>
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

                {/* <div className="form-group form-check">
                  <input
                    type="checkbox"
                    className="form-check-input rounded-0"
                    id="ContactLorem"
                    {...register("terms", { required: "You must agree to the terms" })}
                  />
                  <label className="form-check-label" htmlFor="ContactLorem">
                    Lorem ipsum dolor sit amet, consetetur
                  </label>
                  {errors.terms && <p className="text-danger">{errors.terms.message}</p>}
                </div> */}

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

                {/* <div className="form-row">
                  <div className="col mb-2">
                    <select
                      id="inputState"
                      className="form-select rounded-0"
                      {...register("country", { required: "Country is required" })}
                    >
                      <option value="">Country/Region</option>
                      <option value="Taiwan">Taiwan</option>
                      <option value="USA">USA</option>
                    </select>
                    {errors.country && <p className="text-danger">{errors.country.message}</p>}
                  </div>
                  <div className="col mb-2">
                    <select
                      id="inputState"
                      className="form-select rounded-0"
                      {...register("city", { required: "City is required" })}
                    >
                      <option value="">City</option>
                      <option value="Taipei">Taipei</option>
                      <option value="New York">New York</option>
                    </select>
                    {errors.city && <p className="text-danger">{errors.city.message}</p>}
                  </div>
                </div> */}
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
            <div className="bg-white p-4 mt-3">
              <h4 className="fw-bold">2. 付款方式</h4>
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
                  <Link to="/cart" className="text-dark mt-md-0 mt-3">
                    <i className="bi bi-chevron-left me-2" /> 上一步
                  </Link>
                  <button type="submit" className="btn btn-primary-02 py-2 px-7 rounded-1">
                    送出
                  </button>
                </div>
              </form>
            </div>
          </div>
          <div className="col-md-4">
            <div className="border p-4 mb-4">
              <h4 className="mb-4">訂單明細</h4>
              
              <div className="d-flex mt-2">
                <img
                  src="https://images.unsplash.com/photo-1502743780242-f10d2ce370f3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1916&q=80"
                  alt=""
                  className="me-2"
                  style={{ width: 48, height: 48, objectFit: "cover" }}
                />
                <div className="w-100">
                  <div className="d-flex justify-content-between fw-bold">
                    <p className="mb-0">Lorem ipsum</p>
                    <p className="mb-0">x10</p>
                  </div>
                  <div className="d-flex justify-content-between">
                    <p className="text-muted mb-0">
                      <small>NT$12,000</small>
                    </p>
                    <p className="mb-0">NT$12,000</p>
                  </div>
                </div>
              </div>
              <table className="table bg-light mt-4 border-top border-bottom text-muted">
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
              </table>
              <div className="d-flex justify-content-between mt-4">
                <p className="mb-0 h4 fw-bold">Total</p>
                <p className="mb-0 h4 fw-bold">NT$24,000</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}