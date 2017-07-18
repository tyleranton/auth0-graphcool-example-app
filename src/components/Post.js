import React from 'react';
import PropTypes from 'prop-types';

const container = {
  padding: '4%',
  border: '1px solid #ddd',
  backgroundColor: 'white',
  width: '50%'
};

const header = {
  position: 'relative',
  marginLeft: '0',
  color: '#444'
};

const createdAt = {
  marginLeft: '35%',
  color: '#bbb'
};

const Post = ({ user, post }) => {
  return (
    <div style={container}>
      <div style={header}>
        <span>
          <strong>
            @{user.username}
          </strong>
        </span>
        <span style={createdAt}>
          {post.createdAt.split('T')[0]}
        </span>
        <p>
          {post.text}
        </p>
      </div>
    </div>
  );
};

Post.propTypes = {
  user: PropTypes.object.isRequired,
  post: PropTypes.object.isRequired
};

export default Post;
