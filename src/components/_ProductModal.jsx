import { useEffect, useState } from "react";
import axios from "axios";
import { asyncThunkCreator } from "@reduxjs/toolkit";

const BASE_URL = import.meta.env.VITE_BASE_URL;
const BASE_API_PATH = import.meta.env.VITE_API_PATH

function ProductModal({ closeProducModal, getProducts, type, tempProduct }) {
  const [tempData, setTempData] = useState({
    title: '',
    category: '',
    origin_price: 0,
    price: 0,
    unit: '',
    description: '',
    content: '',
    is_enabled: 1,
    imageUrl: '',
    imagesUrl: [],
  });

  useEffect(() => {
    if (type === 'create') {
      setTempData({
        title: '',
        category: '',
        origin_price: 0,
        price: 0,
        unit: '',
        description: '',
        content: '',
        is_enabled: 1,
        imageUrl: '',
        imagesUrl: [],
      });
    } else if (type === 'edit') {
      setTempData(tempProduct)
  }}, [type, tempProduct]) 

  const handleProductChange = (e) => {
    const { name, value } = e.target;
    if(['origin_price', 'price'].includes(name)) {
      setTempData({ ...tempData, [name]: Number(value) });
    } else if (name === 'is_enabled') {
      setTempData({ ...tempData, [name]: e.target.checked ? 1 : 0 });
    } else {
      setTempData({ ...tempData, [name]: value });
  }}

  const submit = async () => {
    try {
      // 設定預設情況下使用 post 方法
      let api = `${BASE_URL}/v2/api/${BASE_API_PATH}/admin/product`;
      let method = 'post';
      if  (type === 'edit') {
        api = `${BASE_URL}/v2/api/${BASE_API_PATH}/admin/product/${tempProduct.id}`;
        method = 'put';
      }
      const res = await axios[method](
        api, {
        data: tempData,
      });
      console.log(res);
      getProducts();
      closeProducModal(); 
    } catch (error) {
      console.error(error);
    }
  }

  const uploadFile = async (file) => {
    // 若沒有資料將終止函式
    if (!file) {
      return
    }
    
    // 建立出新的物件資料
    const formData = new FormData()
    formData.append('file-to-upload', file)

    // 接 API 上傳
    try {
      const ret = await axios.post(`${BASE_URL}/v2/api/${BASE_API_PATH}/admin/upload`, formData, {
        // 帶入驗證欄位
        // headers: {
        //   authorization: useToken
        // }
      })
      console.log(res)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div
      id='productModal'
      className='modal fade'
      tabIndex='-1'
      aria-labelledby='exampleModalLabel'
      aria-hidden='true'>
      <div className='modal-dialog modal-lg'>
        <div className='modal-content'>
          <div className='modal-header'>
            <h1 className='modal-title fs-5' id='exampleModalLabel'>
              { type === 'create' ? '建立新活動' : `正在編輯 ${tempProduct.title}` }
            </h1>
            <button
              onClick={closeProducModal}
              type='button'
              className='btn-close'
              aria-label='Close'
            />
          </div>
          <div className='modal-body'>
            <div className='row'>
              <div className='col-sm-4'>
                <div className='form-group mb-2'>
                  <img
                    src={tempProduct.imageUrl}
                    alt={tempProduct.title}
                    className="img-fluid"
                  />
                  {/* <img src={tempProduct.imageUrl} alt="imageUrl" /> */}
                  <label className='w-100' htmlFor='image'>
                    輸入圖片網址
                    <input
                      type='text'
                      name='imageUrl'
                      id='image'
                      placeholder='請輸入圖片連結'
                      className='form-control'
                    />
                  </label>
                </div>
                <div className='form-group mb-2'>
                  <label className='w-100' htmlFor='customFile'>
                    或 上傳圖片
                    <input
                      onClick={(e) => uploadFile(e.target.files[0])}
                      type='file'
                      id='customFile'
                      className='form-control'
                    />
                  </label>
                </div>
                <img src="null" alt='' className='img-fluid' />
              </div>
              <div className='col-sm-8'>
                <div className='form-group mb-2'>
                <pre>
                  {JSON.stringify(tempData)}
                </pre>
                  <label className='w-100' htmlFor='title'>
                    標題
                    <input
                      type='text'
                      id='title'
                      name='title'
                      placeholder='請輸入標題'
                      className='form-control'
                      onChange={handleProductChange}
                      value={tempData.title}
                    />
                  </label>
                </div>
                <div className='row'>
                  <div className='form-group mb-2 col-md-6'>
                    <label className='w-100' htmlFor='category'>
                      分類
                      <input
                        type='text'
                        id='category'
                        name='category'
                        placeholder='請輸入分類'
                        className='form-control'
                        onChange={handleProductChange}
                        value={tempData.category}
                      />
                    </label>
                  </div>
                  <div className='form-group mb-2 col-md-6'>
                    <label className='w-100' htmlFor='unit'>
                      單位
                      <input
                        type='unit'
                        id='unit'
                        name='unit'
                        placeholder='請輸入單位'
                        className='form-control'
                        onChange={handleProductChange}
                        value={tempData.unit}
                      />
                    </label>
                  </div>
                </div>
                <div className='row'>
                  <div className='form-group mb-2 col-md-6'>
                    <label className='w-100' htmlFor='origin_price'>
                      原價
                      <input
                        type='number'
                        id='origin_price'
                        name='origin_price'
                        placeholder='請輸入原價'
                        className='form-control'
                        onChange={handleProductChange}
                        value={tempData.origin_price}
                      />
                    </label>
                  </div>
                  <div className='form-group mb-2 col-md-6'>
                    <label className='w-100' htmlFor='price'>
                      售價
                      <input
                        type='number'
                        id='price'
                        name='price'
                        placeholder='請輸入售價'
                        className='form-control'
                        onChange={handleProductChange}
                        value={tempData.price}
                      />
                    </label>
                  </div>
                </div>
                <hr />
                <div className='form-group mb-2'>
                  <label className='w-100' htmlFor='description'>
                    產品描述
                    <textarea
                      type='text'
                      id='description'
                      name='description'
                      placeholder='請輸入產品描述'
                      className='form-control'
                      onChange={handleProductChange}
                      value={tempData.description}
                    />
                  </label>
                </div>
                <div className='form-group mb-2'>
                  <label className='w-100' htmlFor='content'>
                    說明內容
                    <textarea
                      type='text'
                      id='content'
                      name='content'
                      placeholder='請輸入產品說明內容'
                      className='form-control'
                      onChange={handleProductChange}
                      value={tempData.content}
                    />
                  </label>
                </div>
                <div className='form-group mb-2'>
                  <div className='form-check'>
                    <label
                      className='w-100 form-check-label'
                      htmlFor='is_enabled'
                    >
                      是否啟用
                      <input
                        type='checkbox'
                        id='is_enabled'
                        name='is_enabled'
                        placeholder='請輸入產品說明內容'
                        className='form-check-input'
                        onChange={handleProductChange}
                        checked={!!tempData.is_enabled}
                      />
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='modal-footer'>
            <button onClick={closeProducModal} type='button' className='btn btn-secondary'>
              關閉
            </button>
            <button onClick={submit} type='button' className='btn btn-primary'>
              儲存
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}


// export default ProductModal;