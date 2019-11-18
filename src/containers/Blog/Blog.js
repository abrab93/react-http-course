import React, { Component } from 'react';
import Posts from '../Posts/Posts';
// import NewPost from '../NewPost/NewPost';
import {Route, NavLink, Switch, Redirect} from 'react-router-dom';//navLink so i can apply some styling to the links, it adds a class active to <a> element
import './Blog.css';

import asyncComponent from '../../hoc/asyncComponent';

const AsyncNewPost = asyncComponent(() =>{
    return import('../NewPost/NewPost');
})


class Blog extends Component {

    state= {
        auth: true
    }

    render () {
  
        return (
            <div className="Blog">
                <header>
                    <ul>
                        <li>
                            <NavLink to="/posts" exact activeStyle={{textDecoration: 'underline'}} >Posts</NavLink> {/* in orther to use an other active class , not the one genrated 
                                                                       use the props activeClassName then assign a class to it 
                                                                       or we can use an inline style by using activeStyle props  */}
                        </li>
                        <li>
                            <NavLink to={{
                                pathname: "/new-post",
                                hash: "#submit",
                                search: "?quick-submit=true"
                            }}>New Post</NavLink>
                        </li>
                    </ul>
                </header>
                {/*<Route path="/" exact render={() =><h1>Home</h1>} />
                <Route path="/" render={() =><h1>Home2</h1>} />*/}
                
                <Switch>{/* to load only one route in a time , bqz the /new-post is a valide route for the flexible route /:id as result th two routes get loaded on click on new Post*/}
                    {this.state.auth ? <Route path="/new-post" component={AsyncNewPost} /> : null}
                    <Route path="/posts" component={Posts} />
                    <Route render={()=> <h1>Not Found</h1>} />
                    {/*<Redirect from='/' to='/posts' />*/}
                </Switch>
            </div>
        );
    }
}

export default Blog;