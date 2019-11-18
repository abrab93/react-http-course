import React , {Component} from 'react';
import Post from '../../components/Post/Post';
import './Posts.css';
import axios from 'axios';
//import { Link } from 'react-router-dom';
import {Route} from 'react-router-dom';
import FullPost from '../FullPost/FullPost';

class Posts extends Component {
    
 state = {
        loadedPosts : [],
        selectedPostId: null,
        error: false
    }

    componentDidMount(){
        console.log(this.props);
        axios.get('/posts')
            .then(response => {
                const posts = response.data.slice(0, 4)
                    .map(post => {
                        return {...post, author:'abrab'}
                    });

                this.setState({loadedPosts: posts});
            })
            .catch(error =>{
                console.log(error);
            });
    }

    postSelectionHandler = (id) =>{
        console.log(this.props.match.url+ '/'+id);
        this.props.history.push({pathname: this.props.match.url+ '/'+id});
        //this.props.history.push('/'+id);
    }


    render(){

        let posts = <p style={{textAlign: 'center'}}>Somthings went wrong!!</p>
        if(!this.state.error){
            posts = this.state.loadedPosts
                .map(post => {
                    return (
                        //<Link to={'/'+post.id} key={post.id}> // or programmatically
                                <Post  
                                    key={post.id}
                                    title={post.title} 
                                    author={post.author} 
                                    clicked={()=>this.postSelectionHandler(post.id)}/>
                        //</Link>
                    )
                })
        }
        return (
            <div>
                <section className="Posts">
                    {posts} 
                </section>
                <Route path={this.props.match.url+'/:id'} exact  component={FullPost} />
            </div>
        );
    };
}

export default Posts;