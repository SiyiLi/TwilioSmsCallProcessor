import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Table, Alert } from 'react-bootstrap';
import PostRow from './PostRow';

class PostBoard extends Component {
  constructor(props) {
    super(props);
    this.state = { error: '' };
  }

  addError(error) {
    this.setState({ error });
  }

  clearErrors() {
    this.setState({ error: '' });
  }

  makePostRows() {
    const { removePost, posts } = this.props;
    return posts.map((post, i) =>
      <PostRow
        key={i}
        index={i}
        post={post}
        removePost={removePost}
        addError={this.addError.bind(this)}
        clearErrors={this.clearErrors.bind(this)}
      />,
    );
  }

  makeError() {
    const { error } = this.state;
    if (error) {
      return <Alert variant="danger">{error}</Alert>;
    }

    return <div />;
  }

  render() {
    return (
      <div style={{ marginTop: '10px' }}>
        {this.makeError()}
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>From</th>
              <th>To</th>
              <th>Message</th>
              <th>RecordingURL</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {this.makePostRows()}
          </tbody>
        </Table>
      </div>
    );
  }
}

PostBoard.propTypes = {
  posts: PropTypes.arrayOf(PropTypes.object),
  removePost: PropTypes.func.isRequired,
};

export default PostBoard;
