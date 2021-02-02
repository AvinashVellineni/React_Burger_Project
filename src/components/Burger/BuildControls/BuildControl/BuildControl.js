import React from 'react';
import classes from './BuildControl.css';

const buildControl = props => {
  return (
    <div className={classes.BuildControl}>
      <div className={classes.Label}>{props.label}</div>
      <button
        className={classes.Less}
        onClick={() => props.removeIngredient(props.label.toLowerCase())}
        disabled={props.disabled}
      >
        Less
      </button>
      <button
        className={classes.More}
        onClick={() => props.addIngredient(props.label.toLowerCase())}
      >
        More
      </button>
    </div>
  );
};

export default buildControl;
