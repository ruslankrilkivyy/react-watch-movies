import React from 'react';
import classNames from 'classnames';
import { useSelector } from 'react-redux';

import createPages from '../utils/createPages';

const Paginator = ({ onSelectPage }) => {
  const { currentPage, totalPages } = useSelector(({ filters }) => filters);
  const perPage = 5;
  const countPages = Math.ceil(totalPages / perPage);
  const pages = [];
  createPages(pages, countPages, currentPage);

  return (
    <nav>
      <ul className="pagination">
        {pages.map((num, index) => (
          <li
            key={`${num}-${index}`}
            onClick={() => onSelectPage(num)}
            className={classNames('page-item', {
              active: num === currentPage,
            })}>
            {num}
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Paginator;
