import React from 'react';
import classnames from 'classnames';
import { usePagination, DOTS } from './usePagination';
import "./pagination.css";

const Pagination = props => {
  const {
    onPageChange,
    totalCount,
    siblingCount = 1,
    currentPage,
    pageSize,
    className
  } = props;

  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize
  });

  if (currentPage === 0 || paginationRange.length < 2) {
    return null;
  }

  const onNext = (allow) => {
    if (allow) {
      onPageChange(currentPage + 1);
    }
  };

  const onPrevious = (allow) => {
    if (allow) {
      onPageChange(currentPage - 1);
    }
  };

  let lastPage = paginationRange[paginationRange.length - 1];

  const prevDisabled = (currentPage === 1);
  const nextDisabled = (currentPage === lastPage);
  return (
    <div className={`${className}`}>
      <nav aria-label={`Page navigation example`}>
        <ul className="pagination">
          <li
            className={`page-item ${prevDisabled ? 'disabled' : ''}`}
            onClick={() => onPrevious(!prevDisabled)}
          > <a className="page-link"> Previous</a>  </li>

          {paginationRange.map(pageNumber => {
            if (pageNumber === DOTS) {
              return <li className="page-item dots"><a className="page-link">&#8230;</a></li>;
            }

            return (
              <li key={pageNumber} className={`page-item ${pageNumber === currentPage ? 'active' : ''}`}
                onClick={() => onPageChange(pageNumber)}
              > <a className="page-link">{pageNumber}</a>

              </li>
            );
          })}
          <li
            className={`page-item ${nextDisabled ? 'disabled' : ''}`}
            onClick={() => onNext(!nextDisabled)}
          ><a className="page-link">
              Next
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Pagination;
