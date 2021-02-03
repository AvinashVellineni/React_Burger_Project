import React from 'react';
import classes from './Toolbar.css';
import Logo from '../../Logo/Logo';

const toolbar = () => {
  return (
    <header className={classes.Toolbar}>
      <div>MENU</div>
      <Logo></Logo>
      <nav>
        <ul></ul>
      </nav>
    </header>
  );
};

export default toolbar;
