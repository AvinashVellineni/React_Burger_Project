import React, { Component, Fragment } from 'react';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-order';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../errorHandling/withErrorHandler/withErrorHandler';

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
    purchasable: false,
    purchasing: false,
    loading: false
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

  purchaseHandler = () => {
    this.setState({ purchasing: true });
  };

  purchaseCancelHandler = () => {
    this.setState({ purchasing: false });
  };

  purchaseContinueHandler = () => {
    this.setState({ loading: true });
    const order = {
      ingredients: this.state.ingredients,
      price: this.state.totalPrice.toFixed(2),
      customer: {
        name: 'Avinash',
        address: {
          street: 'TestStreet',
          zipcode: '12345',
          country: 'USA'
        },
        emailAddress: 'test@test.com'
      },
      deliveryMethod: 'fastest'
    };
    axios
      .post('/orders.json', order)
      .then(response => this.setState({ loading: false, purchasing: false }))
      .catch(error => this.setState({ loading: false, purchasing: false }));
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

    let orderSummary = (
      <OrderSummary
        ingredients={this.state.ingredients}
        continue={this.purchaseContinueHandler}
        cancel={this.purchaseCancelHandler}
        price={this.state.totalPrice}
      ></OrderSummary>
    );

    if (this.state.loading) {
      orderSummary = <Spinner></Spinner>;
    }
    return (
      <Fragment>
        <Modal
          show={this.state.purchasing}
          clicked={this.purchaseCancelHandler}
        >
          {orderSummary}
        </Modal>
        <Burger ingredients={this.state.ingredients}></Burger>
        <BuildControls
          addIngredient={this.addIngredientHandler}
          removeIngredient={this.removeIngredientHandler}
          disabled={disabledInfo}
          price={this.state.totalPrice}
          purchasable={this.state.purchasable}
          purchasing={this.purchaseHandler}
        ></BuildControls>
      </Fragment>
    );
  }
}

export default withErrorHandler(BurgerBuilder, axios);
