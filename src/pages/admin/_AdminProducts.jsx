import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { Modal } from "bootstrap";

import ProductModal from "../../components/ProductModal";

const BASE_URL = import.meta.env.VITE_BASE_URL;
const BASE_API_PATH = import.meta.env.VITE_API_PATH

function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [pagination, setPagination] = useState({});

  const [type, setType] = useState('create');  // type : 決定 modal 展開的的類型
  const [tempProduct, setTempProduct] = useState({});  // 用來暫存產品資料

  const productModal = useRef(null);

  useEffect(() => {
  productModal.current = new Modal("#productModal", {
  backdrop: "static",  // 點擊背景不關閉視窗
});
    
    getProducts();
  },[])

  const getProducts = async () => {
    try {
      const productRes = await axios.get(`${BASE_URL}/v2/api/${BASE_API_PATH}/admin/products`);
      setProducts(productRes.data.products);
      setPagination(productRes.data.pagination); 
    }
    catch (error) {
      console.error("取得產品資料失敗:" ,error);
    }
  }

  const openProducModal = (type, product) => {
    setType(type);
    setTempProduct(product);
    productModal.current.show();
  }

  const closeProducModal = () => {
    productModal.current.hide();
  }

  return (
    <div className="p-3">
      <ProductModal 
      closeProducModal={closeProducModal} 
      getProducts={getProducts}
      type={type}
      tempProduct={tempProduct}
      />
      <h3>
        活動列表
      </h3>
      <hr />
      <div className="text-end">
        <button
          onClick={() => openProducModal('create', {})} 
          type="button"
          className="btn btn-primary btn-sm"
        >
          建立新活動
        </button>
      </div>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">分類</th>
            <th scope="col">名稱</th>
            <th scope="col">售價</th>
            <th scope="col">啟用狀態</th>
            <th scope="col">編輯</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>{product.category}</td>
              <td>{product.title}</td>
              <td>{product.price}</td>
              <td>{product.is_enabled ? '啟用' : '未啟用'}</td>
              <td>
                <button
                  onClick={() => openProducModal('edit', product)}
                  type="button"
                  className="btn btn-primary btn-sm"
                >
                  編輯
                </button>
                <button
                  type="button"
                  className="btn btn-outline-danger btn-sm ms-2"
                >
                  刪除
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      
      <nav aria-label="Page navigation example">
        <ul className="pagination">
          <li className="page-item">
            <a className="page-link disabled" href="/" aria-label="Previous">
              <span aria-hidden="true">&laquo;</span>
            </a>
          </li>
          {
          [...new Array(5)].map((_, i) => (
            <li className="page-item" key={`${i}_page`}>
              <a
                className={`page-link ${(i + 1 === 1) && 'active'}`}
                href="/"
              >
                {i + 1}
              </a>

            </li>
          ))
        }
          <li className="page-item">
            <a className="page-link" href="/" aria-label="Next">
              <span aria-hidden="true">&raquo;</span>
            </a>
          </li>
        </ul>
      </nav>
    </div>
  )
}

// export default AdminProducts;