import React, { useState, useEffect } from "react";
import {
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Header from "./components/Header";
import Message from "./components/Message";
import Posts from "./components/Posts";
import Post from "./components/Post";
import PostForm from "./components/PostForm";
import NotFound from "./components/NotFound";
import Login from "./components/Login";

import "./App.css";

const axios = require("axios").default;

const App = (props) => {
  const [posts, setPosts] = useState([]);
  const [message, setMessage] = useState(null);

  const setFlashMessage = (message) => {
    setMessage(message);
    setTimeout(() => {
      setMessage(null);
    }, 1600);
  };

  const getPosts = async () => {
    const postsdata = await axios.get("http://localhost:3001/posts")
    console.log(postsdata.data);

    setPosts(postsdata.data);
  }

  useEffect(()=> getPosts(),[])
  

  const getNewSlugFromTitle = (title) =>
    encodeURIComponent(title.toLowerCase().split(" ").join("-"));

  const addNewPost = (post) => {
    post.id = posts.length + 1;
    post.slug = getNewSlugFromTitle(post.title);
    if(post.title.length < 5) {
      alert ("post not accepted, keep trying")
    } else {
      setPosts([...posts, post]);
      setFlashMessage(`saved`);
    }
  };

  const updatePost = (post) => {
    post.slug = getNewSlugFromTitle(post.title);
    const index = posts.findIndex((p) => p.id === post.id);
    const oldPosts = posts.slice(0, index).concat(posts.slice(index + 1));
    const updatedPosts = [...oldPosts, post].sort((a, b) => a.id - b.id);
    setPosts(updatedPosts);
    setFlashMessage(`updated`);
  };

  return (
      <div className="App">
        <Header />
        
        {message && <Message type={message} />}
        <Switch>
          <Route exact path="/" render={() => <Posts posts={posts} />} />
          <Route
            path="/post/:postSlug"
            render={(props) => {
              const post = posts.find(
                (post) => post.slug === props.match.params.postSlug
              );
              if (post) {
                return <Post post={post} />;
              } else {
                return <Redirect to="/" />;
              }
            }}
          />
          <Route
            exact
            path="/new"
            render={() => (
              <PostForm
                addNewPost={addNewPost}
                post={{ id: 0, slug: "", title: "", content: "" }}
              />
            )}
          />

          <Route path="/login" component={Login}/>

          
          <Route
            path="/edit/:postSlug"
            render={(props) => {
              const post = posts.find(
                (post) => post.slug === props.match.params.postSlug
              );
              if (post) {
                return <PostForm updatePost={updatePost} post={post} />;
              } else {
                return <Redirect to="/" />;
              }
            }}
          />
          <Route component={NotFound} />
        </Switch>
      </div>
  );
};

// function App () {
//   return (
//   <div>
//     <Switch>
//       <Route path="/login" component={Login}/>
//       <Route component={NotFound} />
//     </Switch>
//   </div>)

// }


export default App;
