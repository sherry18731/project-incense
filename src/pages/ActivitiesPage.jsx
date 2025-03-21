import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router";
import Pagination from "../components/Pagination";
import Loading from "../components/Loading";

const BASE_URL = import.meta.env.VITE_BASE_URL;
const API_PATH = import.meta.env.VITE_API_PATH;

export default function ActivitiesPage() {
  const [products, setProducts] = useState([]);
  const [isScreenLoading, setIsScreenLoading] = useState(false)
  // eslint-disable-next-line no-unused-vars
  const [isLoading, setIsLoading] = useState(false)
  const [pageInfo, setPageInfo] = useState({})

  const getProducts = async (page = 1) => {
    setIsScreenLoading(true);
    try {
      const res = await axios.get(`${BASE_URL}/v2/api/${API_PATH}/products?page=${page}`);
      setProducts(res.data.products);
      setPageInfo(res.data.pagination);
    } catch (error) {
      alert("取得產品失敗", error);
    } finally {
      setIsScreenLoading(false);
    }
  };

  useEffect(() => {
    getProducts(1);
  }, []);

  const addCartItem = async (product_id, qty) => {
    setIsLoading(true);
    try {
      await axios.post(`${BASE_URL}/v2/api/${API_PATH}/cart`, {
        data: {
          product_id,
          qty: Number(qty)
        }
      });
      alert("成功加入購物車");
    } catch (error) {
      alert("加入購物車失敗", error);
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <>
      <div className="container mt-md-5 mt-3 mb-7">
      <Loading isScreenLoading={isScreenLoading}/>
        <div className="row justify-content-center">
          <div className="col-lg-8 col-md-10">
            <div className="row row-cols-1 g-5 mb-5">
              {
                products.map((product) => (
                  <div key={product.id} className="col border-bottom pb-5">
                    <div className="card flex-column flex-md-row border-0">
                      <div className="position-relative">
                        <img
                          src={product.imageUrl}
                          className="card-img object-fit-cover"
                          alt={product.title}
                          style={{height: "180px"}}
                        />
                        <span class="position-absolute top-0 start-0 badge fw-normal text-bg-primary-04 text-primary-01 m-3">{product.category}</span>
                      </div>
                      <div className="card-body bg-gray-04 d-flex flex-column p-2">
                        <h4 className="my-1">{product.title}</h4>
                        <p className="card-text text-muted mb-3">
                        {product.content}
                        </p>
                        <div className="d-flex align-items-center mb-2">
                          <p className="text-theme-red-01 fw-semibold me-3">NT$ {product.price?.toLocaleString()}</p>
                          <p className="fs-10 text-gray-03 text-decoration-line-through">NT$ {product.origin_price?.toLocaleString()}</p>
                        </div>
                        {/* <p className="">地點： {product.location}</p>
                        <p className="">時間： {new Date(product.date).toLocaleString()}</p> */}
                        <div className="d-flex justify-content-end mt-auto">
                          <Link to={`/product/${product.id}`} className="btn-sm btn btn-outline-primary-03 text-primary-01 me-3">活動詳情</Link>
                          <Link onClick={addCartItem} to={`/product/${product.id}`} className="btn-sm btn btn-primary-03 text-primary-01">加入購物車</Link>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              }

            </div>

          </div>
        </div>
        {/* <nav className="d-flex justify-content-center">
          <ul className="pagination">
            <li className="page-item">
              <a className="page-link" href="#" aria-label="Previous">
                <span aria-hidden="true">«</span>
              </a>
            </li>
            <li className="page-item active">
              <a className="page-link" href="#">
                1
              </a>
            </li>
            <li className="page-item">
              <a className="page-link" href="#">
                2
              </a>
            </li>
            <li className="page-item">
              <a className="page-link" href="#">
                3
              </a>
            </li>
            <li className="page-item">
              <a className="page-link" href="#" aria-label="Next">
                <span aria-hidden="true">»</span>
              </a>
            </li>
          </ul>
        </nav> */}
        <Pagination pageInfo={pageInfo} handlePageChange={getProducts}></Pagination>
        
      </div>
      

    </>
  )
}