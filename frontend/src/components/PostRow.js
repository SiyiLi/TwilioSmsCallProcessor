import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';
import axios from 'axios';
import Urls from '../util/Urls.js';

class PostRow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errors: [],
      isDeleteDisabled: false,
      isDeleteLoading: false,
      isEditDisabled: false,
    };
  }

  resetButtonsState() {
    this.setState({
      isDeleteLoading: false,
      isDeleteDisabled: false,
      isEditDisabled: false,
    });
  }

  deletePost() {
    const { removePost, index, post, addError, clearErrors } = this.props;
    clearErrors();
    this.setState({
      isEditDisabled: true,
      isDeleteLoading: true,
      isDeleteDisabled: false,
    });
    axios.delete(`${Urls.api}/posts/${post.ID}`)
      .then(() => {
        removePost(index);
        this.resetButtonsState();
      },
    )
      .catch((err) => {
        addError(err.message);
        this.resetButtonsState();
      },
    );
  }

  makeDeleteButton() {
    const { isDeleteLoading, isDeleteDisabled } = this.state;
    if (isDeleteLoading) {
      return <Button variant="danger" disabled>Deleting...</Button>;
    } else if (isDeleteDisabled) {
      return <Button variant="danger" disabled>Delete</Button>;
    }

    return <Button variant="danger" onClick={this.deletePost.bind(this)}>Delete</Button>;
  }

  makeEditButton() {
    const { isEditDisabled } = this.state;
    const buttonStyle = { marginRight: '10px' };
    // edit not fully implemented yet
    return <Button style={buttonStyle} disabled>{isEditDisabled ? 'Editing...' : 'Edit'}</Button>;
  }

  render() {
    const { post } = this.props;
    return (
      <tr>
        <td>{post.From}</td>
        <td>{post.To}</td>
        <td>{post.Message}</td>
        <td>{post.RecordingUrl}</td>
        <td>
          {this.makeEditButton()}
          {this.makeDeleteButton()}
        </td>
      </tr>
    );
  }
}

PostRow.propTypes = {
  post: PropTypes.shape({
    From: PropTypes.string.isRequired,
    To: PropTypes.string.isRequired,
    ID: PropTypes.number.isRequired,
  }),
  removePost: PropTypes.func.isRequired,
  addError: PropTypes.func.isRequired,
  clearErrors: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired,
};

export default PostRow;
