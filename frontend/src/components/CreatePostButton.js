import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Button, Modal, FormGroup, FormLabel, FormControl, Alert } from 'react-bootstrap';
import Urls from '../util/Urls';

class CreatePostButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      from: '',
      to: '',
      msg: '',
      url: '',
      isLoading: false,
      errors: [] };
  }

  close() {
    this.setState({ showModal: false });
  }

  open() {
    this.setState({ showModal: true });
  }

  handleChange(key, e) {
    const newState = {};
    newState[key] = e.target.value;
    this.setState(newState);
  }

  checkInput() {
    const errors = [];
    if (this.state.from.length === 0) {
      errors.push('\'From\' cannot be blank.');
    }

    if (this.state.to.length === 0) {
      errors.push('\'To\' cannot be blank.');
    }

    if (this.state.msg.length == 0 && this.state.url.length == 0) {
      errors.push('\'Message\' and \'RecordingUrl\' cannot both be blank.');
    }

    return errors;
  }

  createPost() {
    const { from, to, msg, url } = this.state;
    this.setState({ isLoading: true, errors: [] });
    const errors = this.checkInput();
    if (errors.length === 0) {
      axios.post(`${Urls.api}/posts`, {
        From: from,
        To: to,
        Message: msg,
        RecordingUrl: url
      })
        .then((res) => {
          this.props.addPost(res.data);
          this.setState({ isLoading: false, from: '', to: '', msg: '', url: '', showModal: false, errors: [] });
        },
      )
        .catch((err) => {
          this.setState({ isLoading: false, errors: [err.message] });
        },
      );
    } else {
      this.setState({ isLoading: false, errors });
    }
  }

  makeModalErrors() {
    const { errors } = this.state;
    if (errors.length > 0) {
      return (
        <Alert variant="warning">
          {this.state.errors.join('\n')}
        </Alert>
      );
    }

    return <div />;
  }

  render() {
    const { showModal, isLoading } = this.state;
    return (
      <div>
        <Button variant="primary" onClick={this.open.bind(this)}>Create Post</Button>
        <Modal show={showModal} onHide={this.close.bind(this)}>
          <Modal.Header closeButton>
            <Modal.Title>Create Post</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {this.makeModalErrors()}
            <form>
              <FormGroup>
                <FormLabel>From</FormLabel>
                <FormControl
                  type="text"
                  value={this.state.from}
                  placeholder="Enter where msg/call is from"
                  onChange={this.handleChange.bind(this, 'from')}
                />
              </FormGroup>
              <FormGroup>
                <FormLabel>To</FormLabel>
                <FormControl
                  type="text"
                  value={this.state.to}
                  placeholder="Enter where msg/call is sent to"
                  onChange={this.handleChange.bind(this, 'to')}
                />
              </FormGroup>
              <FormGroup>
                <FormLabel>Message</FormLabel>
                <FormControl
                  type="text"
                  value={this.state.msg}
                  placeholder="Enter the message content"
                  onChange={this.handleChange.bind(this, 'msg')}
                />
              </FormGroup>
              <FormGroup>
                <FormLabel>RecordingUrl</FormLabel>
                <FormControl
                  type="text"
                  value={this.state.url}
                  placeholder="Enter the URL of call recording"
                  onChange={this.handleChange.bind(this, 'url')}
                />
              </FormGroup>
            </form>
          </Modal.Body>
          <Modal.Footer>
            <Button
              onClick={this.createPost.bind(this)}
              disabled={isLoading}
            >
              {isLoading ? 'Submitting...' : 'Submit'}
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

CreatePostButton.propTypes = {
  addPost: PropTypes.func.isRequired,
};

export default CreatePostButton;
