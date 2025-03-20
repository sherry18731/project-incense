import { useEffect, useState } from "react";
import { useOutletContext, useParams } from "react-router";
import ReactLoading from 'react-loading';
import axios from "axios";
import { useDispatch } from "react-redux";
import { pushMessage } from "../redux/toastSlice";
import Toast from "../components/Toast";

const BASE_URL = import.meta.env.VITE_BASE_URL;
const API_PATH = import.meta.env.VITE_API_PATH;

export default function ActivitieDetail() {
  const dispatch = useDispatch();
  const [product, setProduct] = useState({});
  const [qtySelect, setQtySelect] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const { id } = useParams();
  const { getCart } = useOutletContext();

  const getProduct = async (id) => {
    try {
      const res = await axios.get(
        `${BASE_URL}/v2/api/${API_PATH}/product/${id}`
      );
      setProduct(res.data.product)
    } catch (error) {
      // alert("取得產品失敗",error);
      dispatch(pushMessage({ text: "取得產品失敗", status: "danger" }));
    }
  };

  useEffect(() => {
    getProduct(id)
  }, [id])

  const addCartItem = async () => {
    setIsLoading(true);
    try {
      const res = await axios.post(`${BASE_URL}/v2/api/${API_PATH}/cart`, {
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
      {/* <div
        style={{
          minHeight: 400,
          backgroundImage:
            `url(${product.imageUrl})`,
          backgroundPosition: "center center"
        }}
      ></div> */}
      <div className="row justify-content-center mt-4 mb-7">
        <div className="col-md-7">
          <div>
            <img
              src={product.imageUrl}
              alt=""
              className="img-fluid"
            />
          </div>
          {/* <div
            className="accordion border border-bottom border-top-0 border-start-0 border-end-0 mb-3"
            id="accordionExample"
          >
            <div className="card border-0">
              <div
                className="card-header py-4 bg-white border border-bottom-0 border-top border-start-0 border-end-0"
                id="headingOne"
                data-bs-toggle="collapse"
                data-bs-target="#collapseOne"
              >
                <div className="d-flex justify-content-between align-items-center pe-1">
                  <h4 className="mb-0">Lorem ipsum</h4>
                  <i className="fas fa-minus" />
                </div>
              </div>
              <div
                id="collapseOne"
                className="collapse show"
                aria-labelledby="headingOne"
                data-bs-parent="#accordionExample"
              >
                <div className="card-body pb-5">
                  Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
                  nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam
                  erat, sed diam voluptua. At vero eos et accusam et justo duo
                  dolores et ea
                </div>
              </div>
            </div>
            <div className="card border-0">
              <div
                className="card-header py-4 bg-white border border-bottom-0 border-top border-start-0 border-end-0"
                id="headingTwo"
                data-bs-toggle="collapse"
                data-bs-target="#collapseTwo"
              >
                <div className="d-flex justify-content-between align-items-center pe-1">
                  <h4 className="mb-0">Lorem ipsum</h4>
                  <i className="fas fa-plus" />
                </div>
              </div>
              <div
                id="collapseTwo"
                className="collapse"
                aria-labelledby="headingTwo"
                data-bs-parent="#accordionExample"
              >
                <div className="card-body pb-5">
                  Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
                  nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam
                  erat, sed diam voluptua. At vero eos et accusam et justo duo
                  dolores et ea
                </div>
              </div>
            </div>
            <div className="card border-0">
              <div
                className="card-header py-4 bg-white border border-bottom-0 border-top border-start-0 border-end-0"
                id="headingThree"
                data-bs-toggle="collapse"
                data-bs-target="#collapseThree"
              >
                <div className="d-flex justify-content-between align-items-center pe-1">
                  <h4 className="mb-0">Lorem ipsum</h4>
                  <i className="fas fa-plus" />
                </div>
              </div>
              <div
                id="collapseThree"
                className="collapse"
                aria-labelledby="headingThree"
                data-bs-parent="#accordionExample"
              >
                <div className="card-body pb-5">
                  Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
                  nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam
                  erat, sed diam voluptua. At vero eos et accusam et justo duo
                  dolores et ea
                </div>
              </div>
            </div>
          </div> */}
        </div>
        <div className="col-md-4 d-flex flex-column pt-lg-5">
          <h2 className="fs-5">{product.title}</h2>
          <p className="fw-bold mb-4">NT${product.price?.toLocaleString()}</p>
          <p>
            {product.description}
          </p>
          <div className="input-group mb-3 border mt-3">
            <div className="input-group-prepend">
              <button
                className="btn btn-primary-04 rounded-0 border-0 py-3"
                type="button"
                id="button-addon1"
                onClick={() => setQtySelect((pre) => pre ===1 ? pre : pre - 1)}
              >
                <i className="bi bi-dash" />
              </button>
            </div>
            <input
              type="text"
              className="form-control border-0 text-center my-auto shadow-none"
              placeholder=""
              aria-label="Example text with button addon"
              aria-describedby="button-addon1"
              value={qtySelect}
              readOnly
            />
            <div className="input-group-append">
              <button
                className="btn btn-primary-04 rounded-0 border-0 py-3"
                type="button"
                id="button-addon2"
                onClick={() => setQtySelect((pre) => pre + 1)}
              >
                <i className="bi bi-plus" />
              </button>
            </div>
          </div>
          <button
            type="button"
            className="position-relative btn btn-primary-03 text-primary-01 rounded-0 py-3 w-100"
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
      </div>
    </div>
    <Toast/>        
  </>)
}