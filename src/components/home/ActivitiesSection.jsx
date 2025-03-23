import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router";
import { useDispatch } from "react-redux";
import { pushMessage } from "../../redux/toastSlice";

const BASE_URL = import.meta.env.VITE_BASE_URL;
const API_PATH = import.meta.env.VITE_API_PATH;

export default function ActivitiesSection() {
  const [products, setProducts] = useState([]);
  const dispatch = useDispatch();

  const getProducts = async (page = 1) => {
    try {
      const res = await axios.get(`${BASE_URL}/v2/api/${API_PATH}/products?page=${page}`);
      setProducts(res.data.products);
    } catch (error) {
      dispatch(pushMessage({ text: "取得產品失敗", status: "danger"}));
    } 
  };

  useEffect(() => {
    getProducts(1);
  }, []);


  return (<>
    <section className="py-15">
      <div className="container mt-10">
        <div className="row justify-content-center">
          <div className="col-md-10">
            <h3 data-aos="fade-left" className='text-primary-01 fs-5 fw-bold hina-mincho-regular pb-5'>四時流轉，以香會友——品香會邀君共賞</h3>
            <div className="row row-cols-1 row-cols-md-2">
              {
                products.map((product) => (
                  <Link to={`/product/${product.id}`} key={product.id} className="col pb-5">
                    <div className="card flex-column flex-md-row border-0">
                      <div className="position-relative">
                        <img
                          src={product.imageUrl}
                          className="card-img object-fit-cover"
                          alt={product.title}
                          style={{height: "120px"}}
                        />
                        <span className="position-absolute top-0 start-0 badge fw-normal text-bg-primary-04 text-primary-01 m-3">{product.category}</span>
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
                      </div>
                    </div>
                  </Link>
                ))
              }
            </div>
          </div>
        </div>
      </div>
    </section>
  </>)
}