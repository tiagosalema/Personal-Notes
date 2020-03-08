import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchPosts } from "../actions";
import UserHeader from "./UserHeader";

class PostList extends Component {
  componentDidMount = () => {
    this.props.fetchPosts();
  };

  renderList = () => {
    return this.props.posts.map(post => {
      return (
        <div key={post.id}>
          <div>
            <h2>{post.title}</h2>
            <p>{post.body}</p>
          </div>
          <UserHeader userId={post.userId} />
        </div>
      );
    });
  };

  render() {
    return (
      <React.Fragment>
        <div>Post List</div>
        {this.renderList()}
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return { posts: state.posts };
};

export default connect(
  mapStateToProps,
  { fetchPosts }
)(PostList);
