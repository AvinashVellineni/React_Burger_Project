import React, { Fragment, Component } from 'react';
import classes from './Layout.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDraw from '../../components/Navigation/SideDraw/SideDraw';

class Layout extends Component {
  state = {
    showSideDraw: false
  };

  sideDrawCloseHandler = () => {
    this.setState({ showSideDraw: false });
  };

  sideDrawerToggleHandler = () => {
    this.setState(prevState => {
      return { showSideDraw: !prevState.showSideDraw };
    });
  };

  render() {
    return (
      <Fragment>
        <Toolbar toggleHandler={this.sideDrawerToggleHandler}></Toolbar>
        <SideDraw
          open={this.state.showSideDraw}
          closed={this.sideDrawCloseHandler}
        ></SideDraw>
        <main className={classes.Content}>{this.props.children}</main>
      </Fragment>
    );
  }
}

export default Layout;
