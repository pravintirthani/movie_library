import React, { Component } from 'react';
import Header from './Header/Header'
import { Row,Col} from 'react-bootstrap';
export class App extends Component {

  constructor(props){
    super(props);
  }
  render() {        
    return (
      <div className="theme">
        <Row className="header-wrapper" >
          <Col md={12}>
              <Header />
          </Col>
        </Row>
        <Row>
          <Col md={12} className={"child"}>
            {this.props.children}     
          </Col>
        </Row>                             
      </div>      
    ); 
  }

}
export default App;