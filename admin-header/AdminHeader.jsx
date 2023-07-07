import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import './AdminHeader.css';
import { AiOutlineSearch } from 'react-icons/ai';
import HeaderNestoLogo from '../../../assets/images/header/nestoHeaderLogo.svg';
import HeaderHelp from '../../../assets/images/header/headerHelp.svg';
import headerNotification from '../../../assets/images/header/headerNotification.svg';
import headerProfile from '../../../assets/images/header/headerProfile.svg';
import { Image } from 'react-bootstrap';

export default function AdminHeader() {
  return (
    <>
      <Navbar bg="light" expand="lg" className="admin-header">
        <Container fluid>
          <Navbar.Brand>
            <Link to="/">
              <Image
                src={HeaderNestoLogo}
                className="admin-header_logo"
                fluid
              />
            </Link>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll" className="">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: '100px' }}
              navbarScroll
            >
              <Form className="d-flex position-relative">
                <Form.Control
                  type="search"
                  placeholder="Search..."
                  className="admin-header_search"
                  aria-label="Search"
                />
                <AiOutlineSearch className="admin-header_search_icon" />
              </Form>
            </Nav>
            {/* Left Content Start ===========
            ============================== */}
            <div className="d-flex align-items-center justify-content-center gap-4">
              <li>
                <Nav.Item className="" as={Link} to="/">
                  <Image
                    src={HeaderHelp}
                    className="admin-header_help_icon"
                    fluid
                  />
                </Nav.Item>
              </li>
              <li>
                <Nav.Item className="" as={Link} to="/">
                  <img
                    src={headerNotification}
                    className="admin-header_help_icon"
                  />
                </Nav.Item>
              </li>
              <li className="">
                <Nav.Item className="d-flex align-items-center gap-2">
                  <span className="">
                    {' '}
                    <img
                      src={headerProfile}
                      className="admin-header_profile_img"
                    />{' '}
                  </span>
                  <div className="">
                    <span className="admin-header_profile_name">
                      Katie Pena
                    </span>
                    <span className="admin-header_profile_role">admin</span>
                  </div>
                </Nav.Item>
              </li>
            </div>
            {/* Left Content End ==================
            ==================================== */}
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}
