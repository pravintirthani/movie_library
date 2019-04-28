/**
   * @Description:Its contain cast detail with role
   * @Input: Cast Detail name with role
   * @Output: will add the detail in card
   */
  import React, { Component } from 'react';
  import { Row, Col, Card } from 'react-bootstrap';
  import { connect } from 'react-redux'
  import * as Constant from '../AppConstant';
  import * as Util from '../Util';
  import moment from 'moment';
  
  export class Cast extends Component {
    constructor(props) {
      super(props)
      this.state = {
       
      };
  
    }
    render() {      
        let role="";  
      return (
          this.props.data.map((v,k)=>{
            let name=v.split("-")[0];
            if(role===v.split("-")[1]){
                return(
                    <span key={k+name}>{name}</span>
                  );
            }else{
                role=v.split("-")[1];
                return(
                    <React.Fragment key={k}>
                    <div key={k+role}><b>{role}</b>:</div>
                    <span key={k+name}>{name}</span>
                    </React.Fragment>
                  );
            }   
             
          }) 
      );
    }
  }
  function mapStateToProps(state) {
    return {
      state: state
    };
  }
  export default connect(
    mapStateToProps,
    null
  )(Cast);
  