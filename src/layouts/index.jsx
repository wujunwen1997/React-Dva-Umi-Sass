import React, {Fragment} from 'react'
import PropTypes from 'prop-types'
import Login from './login/index'
import Logged from './logged/index'
import withRouter from 'umi/withRouter'
import { connect } from 'dva'
import { langFromPath } from '@/utils';
import intl from "react-intl-universal";
import EN from '@/locales/en/messages';
import CH from '@/locales/zh/messages';

const locales = {
  'en_US': EN,
  'zh_CN': CH
}
@withRouter
@connect(({user}) => ({ user}))
class BasicLayout extends React.Component{

  componentDidMount() {
    this.changeLang(langFromPath(this.props.location.pathname))
  }
  shouldComponentUpdate(nextProps, nextState) {
    const language = langFromPath(nextProps.location.pathname);
    const preLanguage = this.props.user.currLocale;
    preLanguage !== language && this.changeLang(language)
    return preLanguage === language
  }
  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      window.scrollTo(0, 0);
    }
  }
  changeLang = (language) => {
    const params = {
      currentLocale: language,
      locales
    };
    const {dispatch} = this.props;
    // 更改国际化
    dispatch({
      type: 'user/changeLocale',
      payload: language,
    });
    // 初始化国际化
    intl.init(params);
  };
  render() {
    const { children, location } = this.props;
    let Container = (location.pathname.indexOf('/login') === -1 && location.pathname.indexOf('/register') === -1) ? Logged : Login;

    return (
        <Fragment>
          <Container>{children}</Container>
        </Fragment>
    )
  }
}
BasicLayout.propTypes = {
  children: PropTypes.element.isRequired,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  user: PropTypes.object
};
export default BasicLayout
