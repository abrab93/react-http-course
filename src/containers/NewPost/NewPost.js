import React, { Component } from 'react';
import axios from '../../axios';
import './NewPost.css';
import {Redirect} from 'react-router-dom';

class NewPost extends Component {
    state = {
        title: '',
        content: '',
        author: 'Max',
        submited: false
    }

    componentDidMount() {
        console.log(this.props);
    }

    postDataHandler = () => {
        const post = {
            title: this.state.title,
            content: this.state.content,
            author: this.state.author
        }
        axios.post('/posts',post)
            .then(response =>{
                console.log(response);
                //this.setState({submited: true});
                //this.props.history.push('/posts');// back btn return us to the newPost page
                this.props.history.replace('/posts');// back btn give us the current page /posts
            });
    }

    render () {

        let redirect = this.state.submited ? <Redirect to="/posts" /> : null;
        return (
            <div className="NewPost">
                {redirect}
                <h1>Add a Post</h1>
                <label>Title</label>
                <input type="text" value={this.state.title} onChange={(event) => this.setState({title: event.target.value})} />
                <label>Content</label>
                <textarea rows="4" value={this.state.content} onChange={(event) => this.setState({content: event.target.value})} />
                <label>Author</label>
                <select value={this.state.author} onChange={(event) => this.setState({author: event.target.value})}>
                    <option value="Max">Max</option>
                    <option value="Manu">Manu</option>
                </select>
                <button onClick={this.postDataHandler}>Add Post</button>
            </div>
        );
    }
}

export default NewPost;