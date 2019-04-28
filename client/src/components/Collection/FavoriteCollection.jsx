import React, { Component } from 'react';
import {connect}  from 'react-redux'
import * as MovieActions from './CollectionAction'
import {bindActionCreators} from 'redux'
import {Row,Col} from 'react-bootstrap';
import MovieCard from '../MovieCard/MovieCard'
import * as Constant from '../AppConstant';

export class FavoriteCollection extends Component {
  constructor(props){
    super(props)
    this.state = {      
    };
    this.changeGenreFilter=this.changeGenreFilter.bind(this);
  }
  componentWillMount(){    
    this.props.actions.getUserMovieList();
    this.props.actions.getPendingMovieListOfUser({"genre_ids":""});    
  }  
  componentDidUpdate(){
      if(this.props.state.MovieCardReducer.addFavouriteMovieStatus){
        this.props.actions.getUserMovieList();
        this.props.actions.getPendingMovieListOfUser({"genre_ids":""});    
        this.props.state.MovieCardReducer.addFavouriteMovieStatus=false;
      }
      if(this.props.state.MovieCardReducer.removeFavouriteMovieStatus){
        this.props.actions.getUserMovieList();
        this.props.actions.getPendingMovieListOfUser({"genre_ids":""});    
        this.props.state.MovieCardReducer.removeFavouriteMovieStatus=false;
      }
  }
  changeGenreFilter(genreId){
    this.props.actions.getPendingMovieListOfUser({"genre_ids":genreId});
  }
  render() {      
    return (
      <React.Fragment>
        <Row className="favorite-movie-header">
            <Col md={12}>
                <h4>Favorite Movies</h4>
            </Col>
        </Row>  
        <Row className="movie-cards-collection">
            {
            this.props.state.CollectionReducer.userMovieList && this.props.state.CollectionReducer.userMovieList.length!==0?
            this.props.state.CollectionReducer.userMovieList.map((v,k)=>{
            return(
                <Col md={3} sm={12} xs={12} className="movie-card-wrapper" key={k} >
                    <MovieCard data={v} key={k} type={Constant.favoriteMovieCard}/>
                </Col>
            );
            })
            :null
            }        
        </Row>  
        <Row className="favorite-movie-header">
            <Col md={12}>
                <h4>Movies</h4>
            </Col>
        </Row>
        <Row className="movie-cards-collection">
        {
            this.props.state.CollectionReducer.pendingMovieList && this.props.state.CollectionReducer.pendingMovieList.length!==0?
            this.props.state.CollectionReducer.pendingMovieList.map((v,k)=>{
            return(
            <Col md={3} sm={12} xs={12} className="movie-card-wrapper" key={k} >
                <MovieCard data={v} key={k} type={Constant.otherMovieCard}/>
            </Col>
            );
        })
        :null
        }        
        </Row>  
    </React.Fragment>    
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
    actions: bindActionCreators(MovieActions, dispatch)    
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
  )(FavoriteCollection);
  