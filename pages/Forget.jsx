import { useState } from 'react';
import { Container, Row, Col, Form, Image } from 'react-bootstrap';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import { CustomButton, InputField } from '../components';
import { EMAIL_REGEX } from '../config/regex';
import loginBanner from '../assets/images/login/login-banner.png';
// import './LoginForm.css'
import { GoMail } from 'react-icons/go'
import NestoLogo from '../assets/images/login/nestoLogo.svg'
// import {Link} from 'react-router-dom'


const Forget = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [validated, setValidated] = useState(false);

  const handleSubmit = event => {
    const form = event.currentTarget;
    event.preventDefault();
    event.stopPropagation();
    if (form.checkValidity() === false) {
      setValidated(true);
    } else {
      // Handle login logic
    }
  };


  return (
    <div className='container-fluid login-page_container'>
      <Row className='login-page_row'>
        <Col xs={12} md={6}>
          <div className="login-page_form_div">
            <img src={NestoLogo} alt='NestoLogo' />
            <Form
              noValidate
              validated={validated}
              onSubmit={handleSubmit}
              className="login-page_form"
            >
              <h1 className="login-page_form_heading">Forget Password</h1>
              <span className='login-page_form_sub-heading'>If yor remember your password</span>
              <span className='login-page_form_sub-heading'>Go back Login here!</span>
              <div className="login-page_form-inputs">
                <InputField
                  id="email"
                  label="Email "
                  type="email"
                  placeholder="Enter your email address"
                  value={email}
                  className="login-page_input"
                  onChange={e => setEmail(e.target.value)}
                  required
                  pattern={EMAIL_REGEX}
                  feedback="Please enter valid email"
                  InputFieldClassName="input-bottom"
                />
                {/* <GoMail className="login-page_input_icon" /> */}
              </div>
              <div className="login-page_form-inputs">
                <InputField
                  id="password"
                  label="Password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter your Password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  required
                  minLength={8}
                  InputFieldClassName="input-bottom"
                />
              </div>
              <div className="login-page_form-inputs">
                <InputField
                  id="password"
                  label="Confirm Password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Confirm your Password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  required
                  minLength={8}
                  InputFieldClassName="input-bottom"
                />
              </div>
             
              <div className="login-page_btn_div">
                <CustomButton>Verify</CustomButton>
              </div>
            </Form>
          </div>
        </Col>
        <Col xs={12} md={6}>
          <Image src={loginBanner} alt="placeholder" fluid className='login-page_half_img' />
        </Col>
      </Row>
    </div>
  );
};

export default Forget;
