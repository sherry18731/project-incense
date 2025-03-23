import { useEffect, useState } from "react";
import { useOutletContext, useParams, Link } from "react-router";
import ReactLoading from 'react-loading';
import axios from "axios";
import { useDispatch } from "react-redux";
import { pushMessage } from "../redux/toastSlice";
import Toast from "../components/Toast";
import Loading from "../components/Loading";

const BASE_URL = import.meta.env.VITE_BASE_URL;
const API_PATH = import.meta.env.VITE_API_PATH;

export default function ActivitieDetail() {
  const dispatch = useDispatch();
  const [product, setProduct] = useState({});
  const [qtySelect, setQtySelect] = useState(1);
  const [isScreenLoading, setIsScreenLoading] = useState(false)
  const [isLoading, setIsLoading] = useState(false);
  const { id } = useParams();
  const { getCart } = useOutletContext();

  const getProduct = async (id) => {
    setIsScreenLoading(true);
    try {
      const res = await axios.get(
        `${BASE_URL}/v2/api/${API_PATH}/product/${id}`
      );
      setProduct(res.data.product)
    } catch (error) {
      dispatch(pushMessage({ text: "取得產品失敗", status: "danger"}));
    } finally {
      setIsScreenLoading(false);
    }
  };

  useEffect(() => {
    getProduct(id)
  }, [id])

  const addCartItem = async () => {
    setIsLoading(true);
    try {
      await axios.post(`${BASE_URL}/v2/api/${API_PATH}/cart`, {
        data: {
          product_id: product.id,
          qty: qtySelect
        }
      });
      dispatch(pushMessage({ text: "成功加入購物車", status: "success" }));
      getCart();
    } catch (error) {
      dispatch(pushMessage({ text: "加入購物車失敗", status: "danger" }));
    } finally {
      setIsLoading(false);
    }
  };

  return (<>
    <div className="container">
      <Loading isScreenLoading={isScreenLoading}/>
      <div className="row justify-content-center mt-4 my-7">
        <div className="col-9 mb-3">
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb text-primary-02">
              <li className="breadcrumb-item"><Link to="/">首頁</Link></li>
              <li className="breadcrumb-item"><Link to="/activities">近期活動</Link></li>
              <li className="breadcrumb-item text-primary-01 active" aria-current="page">{product.title}</li>
            </ol>
          </nav>
        </div>
        <div className="col-md-4">
          <div>
            <img
              src={product.imageUrl}
              alt="{product.title}"
              className="img-fluid rounded"
            />
          </div>
        </div>
        <div className="col-md-5 d-flex flex-column">
          <div>
            <span className="badge fw-normal text-bg-primary-04 text-primary-01 mb-3 mt-3 mt-lg-0">{product.category}</span>
          </div>
          <h2 className="fs-5">{product.title}</h2>
          
          <p className="mb-3">地點： {product.location}</p>
          <p className="mb-3">時間：   {new Date(product.date).toLocaleString("zh-TW", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
            hour12: false
          })}</p>
          <p className="mb-3">人數： {product.unit} 位</p>
          <p className="mb-5">{product.content}</p>
          
          <div className="d-flex align-items-center mb-2">
            <p className="fs-8 text-theme-red-01 fw-semibold me-3">NT$ {product.price?.toLocaleString()}</p>
            <p className="fs-9 text-gray-03 text-decoration-line-through">NT$ {product.origin_price?.toLocaleString()}</p>
          </div>
          <div className="input-group align-items-center rounded mt-3 mb-3">
          <span className="me-5">報名人數</span>
            <div className="input-group-prepend">
              <button
                className="btn btn-primary-04 rounded border-0 py-2"
                type="button"
                id="button-addon1"
                max={product.unit}
                onClick={() => setQtySelect((pre) => pre ===1 ? pre : pre - 1)}
                disabled={ qtySelect === 1 }
              >
                <i className="bi bi-dash" />
              </button>
            </div>
            <input
              type="text"
              className="form-control border-0 text-center shadow-none"
              placeholder=""
              aria-label="Example text with button addon"
              aria-describedby="button-addon1"
              value={qtySelect}
              readOnly
            />
            <div className="input-group-append">
              <button
                className="btn btn-primary-04 rounded border-0 py-2"
                type="button"
                id="button-addon2"
                onClick={() => setQtySelect((pre) => pre < product.unit ? pre + 1 : pre)}
                disabled={ qtySelect >= product.unit }
              >
                <i className="bi bi-plus" />
              </button>
            </div>
          </div>
          <button
            type="button"
            className="position-relative btn btn-primary-03 text-primary-01 rounded py-3 w-100"
            onClick={() => addCartItem()}
            disabled={isLoading}
          >
            <span>報名活動</span>
            {isLoading && (
              <div
                className="position-absolute"
                style={{
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                }}
              >
                <ReactLoading
                  type={"spin"}
                  color={"#FF5049"}
                  height={"1.5rem"}
                  width={"1.5rem"}
                />
              </div>
            )}
          </button>
          
        </div>
        <div className="col-md-9 wrap">
          <h2>
            <span className="title-decorate hina-mincho-regular text-primary-02 mb-3">香聚</span>
          </h2>
          <div className="fs-8 fw-light text-center">
            <p className="mb-3">在這個特別的時刻，我們誠邀您共赴一場與香氣交融的雅集</p>
            <p>於幽然沉香中，聆聽四季變換的呢喃，品味歲月沉澱的韻味</p>
          </div>
        </div>
      </div>
    </div>
    <Toast/>
  </>)
}