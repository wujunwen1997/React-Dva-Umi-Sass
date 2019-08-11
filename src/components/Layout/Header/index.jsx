import Breadcrumds from '../Breadcrumb/index'
import UserSet from '../UserSet/index'
import s from './contentHeader.scss'
import PropTypes from 'prop-types';

const Header = (props) => {
    return(
      <header className={s.content}>
        <Breadcrumds/>
        <UserSet event={props.layout} langs={props.langs}/>
      </header>
    )
}
Header.propTypes = {
  layout: PropTypes.func.isRequired,
  langs: PropTypes.array
};
export default Header
