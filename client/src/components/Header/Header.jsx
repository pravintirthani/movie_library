import React, { Component } from 'react';
import { connect } from 'react-redux'
import * as UtilActions from '../Util/Action'
import { bindActionCreators } from 'redux'
import {Row, Col,Nav } from 'react-bootstrap';
import Login from '../Login/Login';
import Signup from '../Signup/Signup';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export class Header extends Component {
  constructor(props) {
    super(props)
    this.loginPopOverToggle = this.loginPopOverToggle.bind(this);
    this.signUpPopoverToggle = this.signUpPopoverToggle.bind(this);
    this.state = {
      loginPopOverOpen: false,
      signUpPopoverOpen:false
    };
  }
  componentWillMount() {
    // this.props.actions.getMovieList({data:"data"});
  }
  loginPopOverToggle() {
    this.setState({
      loginPopOverOpen: !this.state.loginPopOverOpen,
      signUpPopoverOpen:false
    });
  }
  signUpPopoverToggle() {
    this.setState({
      signUpPopoverOpen: !this.state.signUpPopoverOpen,
      loginPopOverOpen:false
    });
  }
  render() {
    return (
      <Row className="row-header">
        <Col xs={8} md={{size:4}} className="text-left">
          <h4><FontAwesomeIcon icon="film" /> Show Case</h4>
        </Col>
        <Col xs={4} md={8}>
          {
            localStorage.getItem("serverAccessToken")===null?        
            <React.Fragment>
              <div className="div"><Login /></div>
              <div className="div"><Signup /></div>
            </React.Fragment>
          :
            <React.Fragment>
              <div className="div"><Nav.Link href="/favourite">Favourite</Nav.Link></div>
              <div className="div"><Nav.Link href="/logout">Logout</Nav.Link></div>
            </React.Fragment>
          }
        </Col>
      </Row>
    );
  }
}
function mapStateToProps(state) {
  return {
    state: state
  };
}

function mapDispatchToProps(dispatch) {
  return {
    utilActions: bindActionCreators(UtilActions, dispatch)
  }
}

// export default Movie;
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Header);
