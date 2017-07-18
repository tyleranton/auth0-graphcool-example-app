import React from 'react';
import PropTypes from 'prop-types';

class PostInput extends React.Component {
  static propTypes = {
    createPost: PropTypes.func.isRequired,
    userId: PropTypes.string.isRequired
  };

  state = {
    text: ''
  };

  inputStyle = {
    margin: '5%',
    width: '40%',
    padding: '2%',
    borderRadius: '5px',
    outline: 'none'
  };

  handleSubmit = e => {
    if (e.key === 'Enter') {
      e.preventDefault();
      this.createPost();
      this.setState({ text: '' });
    }
  };

  createPost = () => {
    const variables = {
      text: this.state.text,
      userId: this.props.userId
    };

    this.props.createPost({ variables });
  };

  render() {
    return (
      <input
        style={this.inputStyle}
        value={this.state.text}
        onChange={e => this.setState({ text: e.target.value })}
        onKeyDown={this.handleSubmit}
      />
    );
  }
}

export default PostInput;
