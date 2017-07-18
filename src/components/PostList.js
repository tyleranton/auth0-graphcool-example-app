import React from 'react';
import PropTypes from 'prop-types';
import Post from './Post';

const container = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  width: '80%'
};

const PostList = ({ user, posts }) => {
  return (
    <div style={container}>
      {posts.map(post => <Post key={post.id} user={user} post={post} />)}
    </div>
  );
};

PostList.propTypes = {
  user: PropTypes.object.isRequired,
  posts: PropTypes.array.isRequired
};

export default PostList;
