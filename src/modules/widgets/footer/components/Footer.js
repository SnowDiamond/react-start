import React from 'react';
import { Link } from 'react-router';
import '../styles.scss';

export default () => (
  <footer className='footer'>
    <div className='footer-wrapper'>
      <nav className='footer-navigation clearfix'>
        <ul className='pull-right'>
          <li>
            <Link to='/'>Home</Link>
          </li>
          <li>
            |
          </li>
          <li>
            <Link to='#'>Language</Link>
          </li>
          <li>
            |
          </li>
          <li>
            <a href='mailto:support@mail.com'>Contact us</a>
          </li>
          <li>
            |
          </li>
          <li>
            <Link to='#'>Terms of user</Link>
          </li>
        </ul>
      </nav>
      <p className='text-center copy unauthorised'>
        All Rights Reserved © 2016 Artur Babagulyyev
      </p>
    </div>
  </footer>
);

