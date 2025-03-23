import { useEffect, useState } from "react"
import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL;
const API_PATH = import.meta.env.VITE_API_PATH;

export default function Search() {
  const [ search, setSearch ] = useState('')
  const [ list, setList ] = useState([])

  // useEffect(async () => {
  //   const res = await axios.get(`${BASE_URL}/v2/api/${API_PATH}&query=${search}`)
  //   console.log(res.data)
  //   setList(res.data)
  // },[search])

  return (
    <div className="input-group w-25">
    
      <select
        className="form-select"
        id="inputGroupSelect04"
        aria-label="Example select with button addon"
        defaultValue=""
      >
        <option selected="">Choose...</option>
        <option value={1}>One</option>
        <option value={2}>Two</option>
        <option value={'占卜'}>占卜</option>
      </select>
      {/* <button className="btn btn-outline-secondary" type="button">
      {search}
      </button> */}
    </div>
  )
}