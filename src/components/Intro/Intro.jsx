import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import info from "../../assets/info.svg";
import { Form } from "react-router-dom";
import { FiUserPlus } from "react-icons/fi";

const Intro = () => {
  return (
    <Container className="h-100 mt-4">
      <Row xs={1} sm={1} lg={2} xl={2} className="h-100">
        <Col className="d-flex justify-content-center align-items-center flex-column">
          <h3 className="text-white display-2">
            Take Control of&nbsp;
            <span className="text-info fw-bold">Your Money</span>
          </h3>
          <blockquote className="blockquote text-warning fs-3 text-center">
            <p>
              The simplest definition of a budget is “telling your money where
              to go.“
            </p>
          </blockquote>
          <br />
          <Form method="post">
            <div className="mb-3">
              <input
                type="text"
                name="userName"
                required
                className="form-control fs-2"
                placeholder="Enter your Name Please!"
                aria-label="Enter your Name Please!"
              />
              <input type="hidden" name="_action" value="newUser" />
              <Button type="submit" variant="warning" className="fs-3">
                Create Account <FiUserPlus />
              </Button>
            </div>
          </Form>
        </Col>
        <Col className="d-flex justify-content-center align-items-center flex-column">
          <img src={info} alt="info" width={700} className="intro-image" />
        </Col>
      </Row>
    </Container>
  );
};

export default Intro;
