import React from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';


const Pagination = (props) => {
const {itemsCount, pageSize, currentPage, onPageChange} = props;

// calculate the number of pages
const pagesCount = Math.ceil (itemsCount / pageSize);
if (pagesCount === 1) return null;

// first page and last page (page count)
const pages = _.range(1, pagesCount + 1)



    return ( 
        <nav aria-label="Page navigation example">
  <ul className="pagination">
    {pages.map(page => (
      // apply the active class to the currentpage dynamically
        <li key={page} className={page === currentPage ? "page-item active" : "psge-item"}>
          <a className="page-link" 
          onClick={() => onPageChange(page)}>{page}
        </a></li>))}
    
  </ul>
</nav>
     );
}

Pagination.propTypes = {
  itemsCount: PropTypes.number.isRequired, 
  pageSize: PropTypes.number.isRequired,  
  currentPage: PropTypes.number.isRequired, 
  onPageChange: PropTypes.func.isRequired, 
}
 
export default Pagination;