import React, { Component } from "react";
import PropTypes from "prop-types";
import _ from "lodash";

class Pagination extends Component {
  render() {
    const { itemsCount, pageSize, currPage, onPageChange } = this.props;

    const PagesCount = Math.ceil(itemsCount / pageSize);
    if (PagesCount === 1) return null;
    const Page = _.range(1, PagesCount + 1);

    return (
      <nav aria-label="Page navigation example">
        <ul className="pagination">
          {Page.map(page => (
            <li
              key={page}
              className={page === currPage ? "page-item active" : "page-item"}
            >
              <a
                className="page-link"
                onClick={() => onPageChange(page)}
                href="/#"
              >
                {page}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    );
  }
}

Pagination.propTypes = {
  itemsCount: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  currPage: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired
};

export default Pagination;
