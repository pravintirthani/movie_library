/**
   * Directly we can load this component it will login and set serverAccessToken into localstorage which help to further fetchd detail from server
   * @Input: "Not Input Required"
   * @Output: Logged Into System and routes will get updated.
   */
  import React, { Component } from 'react';
  import {connect}  from 'react-redux'
  import * as UtilActions from '../Util/Action'
  import {bindActionCreators} from 'redux'
  import { Row,Col,Button, Form,Modal } from 'react-bootstrap';
  
  import * as Constant from '../AppConstant';
  import * as Util from '../Util';
  import md5 from  'md5';
  import * as action from '../../Constant';
  export class Signup extends Component {
    constructor(props){
      super(props)
      this.state={
        email:"",
        password:"",
        name:"",
        validated:false,
        modalShow:false
       
      };    
      this.changeHandler=this.changeHandler.bind(this);
      this.signup=this.signup.bind(this);
    }
    componentDidUpdate(){      
      if(this.props.state.UtilReducer.loginStatus){
        this.setState({modalShow:false})
      }
    }
    signup(event) {
      const form = event.currentTarget;        
      if (form.checkValidity() === false) {
        event.preventDefault();
        event.stopPropagation();
      }
      if (!(Constant.emailRegex.test(this.state.email))){
        event.preventDefault();
        event.stopPropagation();      
      }else{
        if(this.state.email.length!==0 && this.state.password.length!==0){
          event.preventDefault();
          event.stopPropagation();
          let email=Constant.emailFieldText;
          let password=Constant.passwordFieldText;
          let name=Constant.nameFieldText;
          this.props.utilActions.signup({name:this.state.name,email:this.state.email,password:md5(this.state.password)})
        }
      }
      this.setState({ validated: true });    
    }
    changeHandler(){    
      if(this.password)
        this.setState({name:this.name.value})  
      if(this.email)
        this.setState({email:this.email.value})
      if(this.password)
        this.setState({password:this.password.value})  
    }  
    render() {           
      return (    
          <Row>
            <Col xs={12} sm={12} md={12}>  
              <div onClick={() => this.setState({ modalShow: true })}>Sign up</div>   
              <Modal size="sm"
                show={this.state.modalShow}
                onHide={() => this.setState({ modalShow: false })}
                aria-labelledby="example-modal-sizes-title-sm"
              >
                <Form
                      noValidate
                      validated={this.state.validated}
                      onSubmit={e => this.signup(e)}
                    >
                    <Modal.Header closeButton>
                      <Modal.Title id="example-modal-sizes-title-sm">
                        {Constant.getSignupHeaderText}                      
                      </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      <Form.Row>                      
                        <Form.Group as={Col} md="12" controlId="validationCustom01">
                          <Form.Label>{Constant.getNameFieldText}</Form.Label>
                          <Form.Control required type="text" placeholder="Name" onChange={this.changeHandler} ref={(node) => {this.name = node}} defaultValue={this.state.name} />
                          <Form.Control.Feedback type="invalid">{Util.genrateRequiredMsg(Constant.getNameFieldText)}</Form.Control.Feedback>
                        </Form.Group>                        
                      </Form.Row>  
                      <Form.Row>  
                        <Form.Group as={Col} md="12" controlId="validationCustom02">
                          <Form.Label>{Constant.getEmailIdFieldText}</Form.Label>
                          <Form.Control required type="email" placeholder="Email" onChange={this.changeHandler} ref={(node) => {this.email = node}} defaultValue={this.state.email} />                                                
                          {this.state.email.length!==0?
                          <Form.Control.Feedback type="invalid">{Util.genrateNotProperMsg(Constant.getEmailIdFieldText)}</Form.Control.Feedback>
                          :<Form.Control.Feedback type="invalid">{Util.genrateRequiredMsg(Constant.getEmailIdFieldText)}</Form.Control.Feedback>}
                        </Form.Group>
                      </Form.Row>
                      <Form.Row>  
                        <Form.Group as={Col} md="12" controlId="validationCustom03">
                          <Form.Label>{Constant.getPasswordFieldText}</Form.Label>
                          <Form.Control required type="password" placeholder="Password" onChange={this.changeHandler} ref={(node) => {this.password = node}} defaultValue={this.state.password} />
                          <Form.Control.Feedback type="invalid">{Util.genrateRequiredMsg(Constant.getPasswordFieldText)}</Form.Control.Feedback>
                        </Form.Group>
                      </Form.Row>    
                    </Modal.Body>              
                    <Modal.Footer>
                        <Button type="submit">Sign up</Button>
                    </Modal.Footer>
                </Form>                  
              </Modal>
            </Col>
          </Row>  
          
       
      );
    }
  }
  function mapStateToProps(state){
    return {
      state: state
    };
  }
  
  function mapDispatchToProps(dispatch){
    return {
      utilActions: bindActionCreators(UtilActions, dispatch)    
    }
  }
  export default connect(
    mapStateToProps,
    mapDispatchToProps
    )(Signup);
    