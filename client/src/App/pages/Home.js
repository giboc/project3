import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import Button from 'react-bootstrap/Button';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Modal from 'react-bootstrap/Modal';

import Axios from 'axios';

class Home extends Component {

  constructor(props) {
    super(props);
    this.state = {
      char: "",
      realm: "",
      charNotFound: false,
      formSubmit: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleModal = this.handleModal.bind(this);
  }

  handleModal(event) {
    this.setState(
      {
        char: "",
        realm: "",
        charNotFound: false,
        formSubmit: false
      }, () => {
        this.forceUpdate();
      });
      this.forceUpdate();
  };

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleSubmit(event) {
    const input = {
      char: this.state.char,
      realm: this.state.realm
    }

    Axios.post('/api/charData', { input })
      .then(response => {
        this.setState({
          formSubmit: true
        });

      })
      .catch(err => {
        console.log(err)
        this.setState({
          charNotFound: true
        })
      });


    event.preventDefault();
  }

  render() {
    const formSubmit = this.state.formSubmit;
    if (formSubmit === true) {
      return <Redirect to="/char" />
    }
    else
      return (

        <div className="App">


          <link
            rel="stylesheet"
            href="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
            integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T"
            crossOrigin="anonymous"
          />

          <Modal show={this.state.charNotFound} onHide={this.handleModal}>
            <Modal.Header closeButton>
              <Modal.Title>Character Not Found</Modal.Title>
            </Modal.Header>
            <Modal.Body>We couldn't find your character. Make sure the Character name and realm are spelled correctly!</Modal.Body>
          </Modal>



          <Jumbotron><h1>Item finder!</h1></Jumbotron>
          <Container>
            <form
              method="POST"
              onSubmit={this.handleSubmit}
              action="/moo">

              <Form.Group controlId="char_name">
                <Form.Control
                  name="char"
                  required
                  type="text"
                  placeholder="Enter Character Name"
                  onChange={this.handleChange}
                  value={this.state.char}
                />
              </Form.Group>

              <Form.Group controlId="realm_name">
                <Form.Control
                  name="realm"
                  required
                  type="text"
                  placeholder="Enter Realm"
                  onChange={this.handleChange}
                  realm={this.state.realm}
                />
              </Form.Group>

              <Button variant="primary" type="submit" to={"./char"}>

                Submit
            </Button>
            </form>
          </Container>


        </div>
      );
  }
}
export default Home;
