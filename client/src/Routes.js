import React, { Component } from 'react';
import { connect } from 'react-redux'
import { BrowserRouter,Route ,Switch} from 'react-router-dom'
import App from './components/App'
import { Provider } from 'react-redux'
import Collection from './components/Collection/Collection';
import FavouriteCollection from './components/Collection/FavoriteCollection';

class Routes extends Component {
constructor(props){
    super(props);
}
render(){         
    return(
        <Provider store={this.props.store}>
            <BrowserRouter>                            
                <Route path="/">
                    <App>                         
                        {localStorage.getItem("serverAccessToken")===null?
                            <Switch>   
                                <Route path="/collection" component={Collection} />                                 
                                <Route path="*" component={Collection} /> 
                            </Switch>   
                        :
                        <Switch>
                            <Route path="/favourite" component={FavouriteCollection} /> 
                            <Route path="/logout" render={()=>{localStorage.clear();window.location.href="/collection";}} />                                 
                            <Route path="*" component={Collection} /> 
                        </Switch>       
                        }
                    </App>    
                </Route>
                
            </BrowserRouter>        
        </Provider>
        )
    }
} 

export default (Routes)