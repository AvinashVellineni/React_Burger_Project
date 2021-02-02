import React, { Component, Fragment } from 'react';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7
};
class BurgerBuilder extends Component {
  state = {
    ingredients: {
      salad: 0,
      bacon: 0,
      cheese: 0,
      meat: 0
    },
    totalPrice: 4,
    purchasable: false
  };

  updatePurchaseHandler = updatedIngredient => {
    const ingredients = { ...updatedIngredient };
    const sum = Object.keys(ingredients)
      .map(key => {
        return ingredients[key];
      })
      .reduce((sum, currel) => {
        return sum + currel;
      }, 0);
    this.setState({ purchasable: sum > 0 });
  };

  addIngredientHandler = ingredientType => {
    const oldCount = this.state.ingredients[ingredientType];
    const updatedIngredient = {
      ...this.state.ingredients
    };
    updatedIngredient[ingredientType] = oldCount + 1;
    this.setState(prevState => {
      return {
        ingredients: updatedIngredient,
        totalPrice: prevState.totalPrice + INGREDIENT_PRICES[ingredientType]
      };
    });
    this.updatePurchaseHandler(updatedIngredient);
  };

  removeIngredientHandler = ingredientType => {
    const oldCount = this.state.ingredients[ingredientType];
    if (oldCount <= 0) {
      return;
    }
    const updatedIngredient = {
      ...this.state.ingredients
    };
    updatedIngredient[ingredientType] = oldCount - 1;
    this.setState(prevState => {
      return {
        ingredients: updatedIngredient,
        totalPrice: prevState.totalPrice - INGREDIENT_PRICES[ingredientType]
      };
    });
    this.updatePurchaseHandler(updatedIngredient);
  };

  render() {
    const disabledInfo = {
      ...this.state.ingredients
    };
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }
    return (
      <Fragment>
        <Modal></Modal>
        <Burger ingredients={this.state.ingredients}></Burger>
        <BuildControls
          addIngredient={this.addIngredientHandler}
          removeIngredient={this.removeIngredientHandler}
          disabled={disabledInfo}
          price={this.state.totalPrice}
          purchasable={this.state.purchasable}
        ></BuildControls>
      </Fragment>
    );
  }
}

export default BurgerBuilder;
