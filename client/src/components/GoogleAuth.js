import React from 'react';
import { connect } from 'react-redux';
import { signIn, signOut} from '../actions/index';

class GoogleAuth extends React.Component {

  componentDidMount() {
    window.gapi.load('client:auth2', () => {
      window.gapi.client.init({
        clientId: '612191529046-t7j43j762jk2q651ar763dcb2uqs5bol.apps.googleusercontent.com',
        scope: 'email'
      }).then(() => {
        this.auth = window.gapi.auth2.getAuthInstance();
        this.onAuthChange(this.auth.isSignedIn.get());
        this.auth.isSignedIn.listen(this.onAuthChange);
      });
    });
  }

  onAuthChange = (isSignedIn) => {
    if(isSignedIn) {
      this.props.signIn(this.auth.currentUser.get().getId());
    }else{
      this.props.signOut();
    }
  };

  onSignInClick = () => {
    this.auth.signIn();
  }

  onSignOutClick = () => {
    this.auth.signOut();
  }

  renderAuthButton() {
    if (this.props.isSignedIn === null) {
      return null;
    } else if (this.props.isSignedIn) {
      return <button className="ui red google button" onClick={this.onSignOutClick}>
        <i className="google icon"></i>
        Sign Out
        </button>
    } else {
      return <button className="ui red google button" onClick={this.onSignInClick}>
        <i className="google icon"></i>
        Sign In With Google
        </button>
    }
  }

  render() {
    return <div>{this.renderAuthButton()}</div>
  }
}

const MapStateToProps = (state) => {
  return { isSignedIn : state.auth.isSignedIn};
}

export default connect(MapStateToProps, { signIn, signOut})(GoogleAuth);