import React, { Component } from 'react';
import {connect}  from 'react-redux'
import * as MovieActions from './CollectionAction'
import {bindActionCreators} from 'redux'
import {Row,Col} from 'react-bootstrap';
import MovieCard from '../MovieCard/MovieCard'
import { GenreList } from './GenreList';
export class Collection extends Component {
  constructor(props){
    super(props)
    this.state = {      
    };
    this.changeGenreFilter=this.changeGenreFilter.bind(this);
  }
  componentWillMount(){    
    this.props.actions.getMovieList({"genre_ids":""});
    this.props.actions.getGenreList();
  }  
  changeGenreFilter(genreId){
    this.props.actions.getMovieList({"genre_ids":genreId});
  }
  render() {      
    return (
      <React.Fragment>
      <Row>
        <Col md={{size:4,offset:8}} className="text-right">
            <GenreList changeGenreFilter={this.changeGenreFilter} data={this.props.state.CollectionReducer.genreListData}/>
        </Col>
      </Row>  
      <Row className="movie-cards-collection">
        {
          this.props.state.CollectionReducer.movieCollectionData && this.props.state.CollectionReducer.movieCollectionData.length!==0?
          this.props.state.CollectionReducer.movieCollectionData.map((v,k)=>{
          return(
            <Col md={3} sm={12} xs={12} className="movie-card-wrapper" key={k} >
              <MovieCard data={v} key={k}/>
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

// export default Movie;
export default connect(
  mapStateToProps,
  mapDispatchToProps
  )(Collection);
  