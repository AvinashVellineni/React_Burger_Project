import React, { Fragment } from 'react';
import classes from './Burger.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const burger = props => {
  let transformedIngredients = Object.keys(props.ingredients)
    .map(ingredientKey => {
      return [...Array(props.ingredients[ingredientKey])].map((_, i) => {
        return (
          <BurgerIngredient
            type={ingredientKey}
            key={ingredientKey + i}
          ></BurgerIngredient>
        );
      });
    })
    .reduce((arr, el) => {
      return arr.concat(el);
    }, []);
  if (transformedIngredients.length === 0) {
    transformedIngredients = <p>Please start adding ingredients!!</p>;
  }
  return (
    <Fragment>
      <div className={classes.Burger}>
        <BurgerIngredient type="bread-top"></BurgerIngredient>
        {transformedIngredients}
        <BurgerIngredient type="bread-bottom"></BurgerIngredient>
      </div>
    </Fragment>
  );
};

export default burger;
