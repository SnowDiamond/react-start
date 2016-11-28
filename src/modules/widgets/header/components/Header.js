import React from 'react';
import { Link } from 'react-router';

import '../styles.scss';

class Header extends React.Component {
  render() {
    return (
      <div className='navbar navbar-static navbar-default'>
        <div className='header-wrapper'>
          <div className='navbar-header'>
            <Link to='/' className='navbar-brand logo'>
              React start
            </Link>
          </div>
          <div className='collapse navbar-collapse' id='bs-example-navbar-collapse-1'>
            <ul className='nav navbar-nav'>
              <li>
                <Link to='/page'>Sample Page</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default (Header);
