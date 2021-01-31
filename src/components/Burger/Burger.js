import React, { Fragment } from 'react';
import classes from './Burger.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const burger = props => {
  return (
    <Fragment>
      <div className={classes.Burger}>
        <BurgerIngredient type="bread-top"></BurgerIngredient>
        <BurgerIngredient type="meat"></BurgerIngredient>
        <BurgerIngredient type="cheese"></BurgerIngredient>
        <BurgerIngredient type="bread-bottom"></BurgerIngredient>
      </div>
    </Fragment>
  );
};

export default burger;
