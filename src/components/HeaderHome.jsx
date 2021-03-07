import React from 'react';
import classNames from 'classnames';
import { Link } from 'react-router-dom';

import logoPng from '../assets/images/logo.png';
import { Button } from '.';

const HeaderHome = ({ items, token, onSetVisibleLogin, onSetVisibleRegistration }) => {
  const [activeItem, setActiveItem] = React.useState(0);

  const onSetActiveItem = (index, e) => {
    setActiveItem(index);
  };

  return (
    <div className="home-header">
      <div className="container">
        <div className="home-header__inner">
          <div className="home-header__logo">
            <img src={logoPng} alt="logo png" />
          </div>
          <div className="home-header__nav">
            <ul className="home-header__menu">
              {items.map((item, index) => (
                <li key={`${item}-${index}`} className="home-header__menu-item">
                  <Link
                    to={`/${item.split(' ').join('').split('!').join('').toLowerCase()}`}
                    onClick={(e) => onSetActiveItem(index, e)}
                    className={classNames('home-header__menu-item-link', {
                      active: index === activeItem,
                    })}>
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="home-header-btns">
            <Button onClick={() => onSetVisibleRegistration()}>Sign Up</Button>
            <a href={`https://www.themoviedb.org/authenticate/${token && token.request_token}`}>
              <Button onClick={() => onSetVisibleLogin()}>Login</Button>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeaderHome;
