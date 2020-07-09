import React from "react";
import {
  Container,
  Row,
  Col,
  Navbar,
  Nav,
  NavbarBrand,
  NavLink,
  NavItem,
} from "reactstrap";

const Header = () => (
  <header>
    <Navbar
      fixed="top"
      color="light"
      light
      expand="xs"
      className="border-bottom border-gray bg-white"
      style={{ height: 80 }}
    >
      <Container>
        <Row noGutters className="position-relative w-100 align-items-center">
          <Col className="d-none d-lg-flex justify-content-start">
            <Nav className="mrx-auto">
              <NavItem className="d-flex align-items-center">
                <NavLink className="font-weight-bold" href="/">
                  Editor
                </NavLink>
              </NavItem>
            </Nav>
          </Col>
          <Col className="d-none d-lg-flex justify-content-end">
              <NavbarBrand className="d-inline-block p-0" href="/" style={{ width: 80 }}>
                  AlgoRun
              </NavbarBrand>
          </Col>
        </Row>
      </Container>
    </Navbar>
  </header>
);

export default Header;
