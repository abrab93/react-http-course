import React, { Component } from 'react';

import Post from '../../components/Post/Post';
import FullPost from '../../components/FullPost/FullPost';
import NewPost from '../../components/NewPost/NewPost';
import './Blog.css';
import axios from 'axios';

class Blog extends Component {

    state = {
        loadedPosts : [],
        selectedPostId: null,
        error: false
    }

    componentDidMount(){
        axios.get('/posts')
            .then(response => {
                const posts = response.data.slice(0, 4)
                    .map(post => {
                        return {...post, author:'abrab'}
                    });

                this.setState({loadedPosts: posts});
            })
            .catch(error =>{
                this.setState({error: true});
            });
    }

    postSelectionHandler = (id) =>{
        this.setState({selectedPostId: id});
    }

    render () {
        let posts = <p style={{textAlign: 'center'}}>Somthings went wrong!!</p>
        if(!this.state.error){
            posts = this.state.loadedPosts
                .map(post => {
                    return <Post 
                        key={post.id} 
                        title={post.title} 
                        author={post.author} 
                        clicked={()=>this.postSelectionHandler(post.id)}
                    />
                })
        }
  
        return (
            <div>
                <section className="Posts">
                    {posts}
                </section>
                <section>
                    <FullPost postId={this.state.selectedPostId}/>
                </section>
                <section>
                    <NewPost />
                </section>
            </div>
        );
    }
}

export default Blog;