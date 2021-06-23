import React from "react";
import _ from "lodash";

const Pagination = (props) => {
  const { itemsCount, pageSize, onPageChange, currentPage } = props;
  const pagesCount = itemsCount / pageSize;
  if (itemsCount <= pageSize) return null;
  const pages = _.range(1, pagesCount + 1);
  return (
    <nav>
      <ul className="pagination">
        {pages.map((p) => (
          <li
            key={p}
            className={currentPage === p ? "page-item active" : "page-item"}
          >
            <button onClick={() => onPageChange(p)} className="btn btn-light">
              {p}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;
