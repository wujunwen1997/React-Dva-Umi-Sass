import React, { PureComponent, Fragment } from 'react';
import { Button } from 'antd';
import style from './Add.scss'
import PropTypes from 'prop-types';

class RouterComponent extends PureComponent {
  render() {
    const {show} = this.props;
    return (
      <Fragment>
        <Button icon="plus-circle" ghost className={style.Addbtn} onClick={show}>新 增</Button>
      </Fragment>
    );
  }
}
RouterComponent.propTypes = {
  show: PropTypes.func.isRequired
};

export default RouterComponent;
