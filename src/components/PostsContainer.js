import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { graphql, gql } from 'react-apollo';
import PostInput from './PostInput';
import PostList from './PostList';

const container = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  backgroundColor: '#eee',
  width: '50%',
  height: '60%'
};

const PostsContainer = ({ data, createPost }) => {
  if (data.loading) return <div>Loading...</div>;

  const user = data.user;
  const posts = data.user.posts;

  return (
    <div style={container}>
      <PostInput userId={user.id} createPost={createPost} />
      <PostList user={user} posts={posts} />
    </div>
  );
};

PostsContainer.propTypes = {
  data: PropTypes.object.isRequired,
  createPost: PropTypes.func.isRequired
};

const createPost = gql`
  mutation createPost($text: String!, $userId: ID!) {
    createPost(text: $text, userId: $userId) {
      id
      createdAt
      text
    }
  }
`;

const postsQuery = gql`
  query {
    user {
      id
      username
      posts(orderBy: createdAt_DESC) {
        id
        createdAt
        text
      }
    }
  }
`;

export default graphql(createPost, {
  name: 'createPost',
  options: {
    update: (store, { data: { createPost } }) => {
      const data = store.readQuery({ query: postsQuery });
      data.user.posts.unshift(createPost);
      store.writeQuery({ query: postsQuery, data });
    }
  }
})(
  graphql(postsQuery, { options: { fetchPolicy: 'network-only' } })(
    withRouter(PostsContainer)
  )
);
