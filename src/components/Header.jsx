import React from 'react';
import { Link } from 'react-router-dom';

import SearchMovie from './SearchMovie';

const Header = React.memo(function Header({ onSearch }) {
  return (
    <header className="header">
      <div className="container">
        <div className="header__inner">
          <div className="header__logo">
            <Link to="/">
              Watch <span>Movies!</span>
            </Link>
          </div>
          <SearchMovie onSearch={onSearch} />
        </div>
      </div>
    </header>
  );
});

export default Header;
