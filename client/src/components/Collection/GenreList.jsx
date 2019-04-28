/**
   * @Description:Its Single Card with Genres detail 
   * @Input: Genres Detail
   * @Output: return output Dropdown Selection
   */
  import React, { Component } from 'react';
  import { Row, Col, Card } from 'react-bootstrap';
  import { connect } from 'react-redux'
  import * as Constant from '../AppConstant';
  import * as Util from '../Util';
  import moment from 'moment';
  import {Form} from 'react-bootstrap';

  export class GenreList extends Component {
    constructor(props) {
      super(props)
      this.state = {
       
      };
      this.changeGenreFilter=this.changeGenreFilter.bind(this);
    }
    changeGenreFilter(e){
        this.props.changeGenreFilter(e.target.value);
    }
    render() {                      
      return (
        <Form.Group as={Col} controlId="exampleForm.ControlSelect1">
        <Form.Label>Genre Filter</Form.Label>
        <Form.Control as="select" onChange={this.changeGenreFilter}>
            <option value="">Filter Genre</option>
            {this.props.data && this.props.data.length!==0?
                this.props.data.map((v,k)=>{
                return (
                    <option key={k} value={v.id}>{v.name}</option>
                );
            })
            :null
            }         
        </Form.Control>
      </Form.Group>
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
  )(GenreList);
  