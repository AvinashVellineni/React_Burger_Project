import React, { Fragment } from 'react';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import classes from './SideDraw.css';
import Backdrop from '../../UI/Backdrop/Backdrop';

const sideDraw = props => {
  let attachedClasses = [classes.SideDraw, classes.Close];
  if (props.open) {
    attachedClasses = [classes.SideDraw, classes.Open];
  }
  return (
    <Fragment>
      <Backdrop show={props.open} clicked={props.closed}></Backdrop>
      <div className={attachedClasses.join(' ')}>
        <div className={classes.Logo}>
          <Logo></Logo>
        </div>
        <nav>
          <NavigationItems></NavigationItems>
        </nav>
      </div>
    </Fragment>
  );
};

export default sideDraw;
