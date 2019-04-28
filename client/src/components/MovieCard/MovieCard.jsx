/**
   * @Description:Its Single Card with movie detail 
   * @Input: Movie Detail
   * @Output: return output single card with full column width
   */
  import React, { Component } from 'react';
  import { Row, Col, Card } from 'react-bootstrap';
  import { connect } from 'react-redux'
  import {bindActionCreators} from 'redux'
  import * as MovieActions from './MovieCardAction';
  import * as Constant from '../AppConstant';  
  import moment from 'moment';
  import Cast from './Cast';
  export class MovieCard extends Component {
    constructor(props) {
      super(props)
      this.state = {       
      };
      this.addFavouriteMove=this.addFavouriteMove.bind(this);
      this.removeFavouriteMove=this.removeFavouriteMove.bind(this);
    }
    addFavouriteMove(e){
      this.props.actions.addFavouriteMovie({movieid:this.props.data.id});
    }
    removeFavouriteMove(e){
      this.props.actions.removeFavouriteMovie({movieid:this.props.data.id});
    }
    render() {      
      return (
        <Card className="movie-card">
          <Card.Header className="movie-card-header">
              <Row>
                <Col md={10}>
                  <span>{this.props.data.name+" ("+this.props.data.year+")"}</span>
                </Col>
                <Col md={2} className="text-right">
                  {this.props.type===Constant.otherMovieCard?<div onClick={this.addFavouriteMove}>+</div>:null}
                  {this.props.type===Constant.favoriteMovieCard?<div onClick={this.removeFavouriteMove}>X</div>:null}
                </Col>
              </Row>                
            </Card.Header>
          <Card.Body className="movie-card-body"> 
            <Row>
              <Col md={12}>
                <span><b>Ratings</b> {this.props.data.ratings+"/10"}</span>
              </Col>
              </Row>  
              <Row>
              <Col md={12}>
                <span><b>Language</b> {this.props.data.published_language}</span>
              </Col>  
            </Row>                
            <Row>
              <Col md={12}>
                <span>{this.props.data.overview}</span>
              </Col>  
            </Row> 
            <Row>
              <Col md={12} className="cast">
                <Cast data={this.props.data.cast.split(",")}/>                
              </Col>  
            </Row>    
            </Card.Body>
            <Card.Footer>
              <Card.Title className="movie-card-title">
                <Row>
                  <Col md={12}>
                    <small>{this.props.data.genre}</small>
                  </Col>
                </Row>
                <Row>  
                  <Col md={12}>
                  <small className="text-muted">Released : {moment(new Date(this.props.data.publish_date)).format("MMMM Do YYYY")}</small>
                  </Col>
                </Row>
              </Card.Title>
              
            </Card.Footer>
        </Card>
      );
    }
  }
  function mapStateToProps(state) {
    return {
      state: state
    };
  }
  function mapDispatchToProps(dispatch){
    return {
      actions: bindActionCreators(MovieActions, dispatch)    
    }
  }
  
  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(MovieCard);
  