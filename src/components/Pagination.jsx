import PropTypes from 'prop-types';

function Pagination({pageInfo, handlePageChange}) {

  const handleClick = (page) => (e) => {
    e.preventDefault();
    handlePageChange(page);
  };
  
  return (
    <div className="d-flex justify-content-center">
      <nav>
        <ul className="pagination">
          <li className={`page-item ${!pageInfo.has_pre && 'disabled'}`}>
            <a onClick={handleClick(pageInfo.current_page - 1)} className="page-link" href="#">
              上一頁
            </a>
          </li>
          
          {
            Array.from({length: pageInfo.total_pages}).map((_, index) => (
              <li key={index} className={`page-item ${pageInfo.current_page === index +1 && 'active'}`}>
              <a onClick={handleClick(index + 1)} className="page-link bg-primary-01 border-primary-02" href="#">
                {index +1} 
              </a>
            </li>
            ))
          }
          <li className={`page-item ${!pageInfo.has_next && 'disabled'}`}>
            <a onClick={handleClick(pageInfo.current_page + 1)} className="page-link" href="#">
              下一頁
            </a>
          </li>
        </ul>
      </nav>
    </div>
  )

}

// Pagination.prototype = {
//   pageInfo = 
// }

export default Pagination;