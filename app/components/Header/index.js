import React from 'react';
import { FormattedMessage } from 'react-intl';
import { withRouter } from 'react-router-dom';
import A from './A';
import Img from './Img';
import NavBar from './NavBar';
import HeaderLink from './HeaderLink';
import Banner from './banner.jpg';
import messages from './messages';
import { ACCESS_TOKEN_NAME } from '../../constants/apiConstants';

const Header = (props) =>{
  const imgStyle = {
    width: '13%',
    'margin-left': '43.5%',
  };
  let state = {
    login: false
  }
  const changeState = () => {
    localStorage.getItem(ACCESS_TOKEN_NAME) ? state.login = false : state.login = true;
  };

  function renderLogout() {
    if(localStorage.getItem(ACCESS_TOKEN_NAME)){
        return(
            <div className="ml-auto">
                <button className="btn btn-danger" onClick={() => handleLogout()}>Logout</button>
            </div>
        )
    } else {
      return(
        <div>
        <div className="ml-auto">
            <button className="btn btn-danger" onClick={() => handleLogin()}>Login</button>
        </div>
        <HeaderLink to="/register">
          <FormattedMessage {...messages.register} />
        </HeaderLink>
        </div>
      )
    }
}
const handleLogout = () =>{
  localStorage.removeItem(ACCESS_TOKEN_NAME)
  props.history.push('/login')
}
const handleLogin = () =>{
  localStorage.setItem(ACCESS_TOKEN_NAME)
  props.history.push('/home')
}

  return (
    <div>
      <div style= { imgStyle }>
        <Img src={Banner} alt="Shop - Logo" />
      </div>
      <NavBar>
        {renderLogout()}
      </NavBar>
    </div>
  );
}

export default withRouter(Header);
