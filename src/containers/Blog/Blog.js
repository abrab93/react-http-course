import React, { Component } from 'react';

import Post from '../../components/Post/Post';
import FullPost from '../../components/FullPost/FullPost';
import NewPost from '../../components/NewPost/NewPost';
import './Blog.css';
import axios from 'axios';

class Blog extends Component {

    state = {
        loadedPosts : [],
        selectedPost: null
    }

    componentDidMount(){
        axios.get('https://jsonplaceholder.typicode.com/posts')
            .then(response => {
                let posts = response.data.splice(0, 4)
                    .map(post => {
                        return {...post, author:'abrab'}
                    });

                this.setState({loadedPosts: posts});
            });
    }

    postSelectionHandler = (post) =>{
        this.setState({selectedPost: post});
    }

    render () {
        const posts = this.state.loadedPosts
            .map(post => {
                return <Post 
                    key={post.id} 
                    title={post.title} 
                    author={post.author} 
                    clicked={()=>this.postSelectionHandler(post)}
                />
            })
        return (
            <div>
                <section className="Posts">
                    {posts}
                </section>
                <section>
                    <FullPost post={this.state.selectedPost}/>
                </section>
                <section>
                    <NewPost />
                </section>
            </div>
        );
    }
}

export default Blog;