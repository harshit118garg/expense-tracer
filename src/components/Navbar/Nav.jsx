import React from "react";
import { Navbar, Container, Button, Badge } from "react-bootstrap";
import { Form, NavLink } from "react-router-dom";
import { MdOutlineDelete } from "react-icons/md";
import mobilePay from "../../assets/mobilePay.svg";

const Nav = ({ userName }) => {
  return (
    <Navbar bg="warning" className="shadow w-100">
      <Container className="d-flex justify-content-between">
        <NavLink to="/" aria-label="Go to Home">
          <Navbar.Brand>
            <img
              src={mobilePay}
              width="70"
              height="70"
              alt="Expense Tracker logo"
            />
            <Badge className="fs-4">Expense Tracker</Badge>
          </Navbar.Brand>
        </NavLink>

        {userName && (
          <>
            <Navbar.Text className="fs-1 p-2 rounded-3 fw-bold text-bg-danger text-uppercase shadow-sm">
              {userName}
            </Navbar.Text>
            <Form
              method="post"
              action="logout"
              onSubmit={(event) => {
                if (!confirm("Delete user and all data....?")) {
                  event.preventDefault();
                }
              }}
            >
              <Button
                type="submit"
                className="btn-warning btn-outline-warning text-white fs-4"
              >
                Delete User &nbsp;
                <MdOutlineDelete />
              </Button>
            </Form>
          </>
        )}
      </Container>
    </Navbar>
  );
};

export default Nav;
