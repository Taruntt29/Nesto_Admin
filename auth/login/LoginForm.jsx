// import { useState } from 'react';
// import { Container, Row, Col, Form, Image } from 'react-bootstrap';
// import { FiEye, FiEyeOff } from 'react-icons/fi';
// import { CustomButton, InputField } from '../../../components';
// import { EMAIL_REGEX } from '../../../config/regex';
// import loginBanner from '../../../assets/images/login/login-banner.png';
// import { Link } from 'react-router-dom';
// const Login = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [showPassword, setShowPassword] = useState(false);
//   const [rememberMe, setRememberMe] = useState(false);
//   const [validated, setValidated] = useState(false);

//   const handleSubmit = event => {
//     const form = event.currentTarget;
//     event.preventDefault();
//     event.stopPropagation();

//     if (form.checkValidity() === false) {
//       setValidated(true);
//     } else {
//       // Handle login logic
//     }
//   };

//   return (
//     <Container>
//       <Row>
//         <Col xs={12} md={6}>
//           <div className="d-flex align-items-center flex-column h-100">
//             <Form
//               noValidate
//               validated={validated}
//               onSubmit={handleSubmit}
//               className="w-100 my-auto"
//             >
//               <h1 className="mb-4">Sign In</h1>
//               <InputField
//                 id="email"
//                 label="Email Address"
//                 type="email"
//                 placeholder="Enter email"
//                 value={email}
//                 onChange={e => setEmail(e.target.value)}
//                 required
//                 pattern={EMAIL_REGEX}
//                 feedback="Please enter valid email"
//                 InputFieldClassName="input-bottom"
//               />
//               <InputField
//                 id="password"
//                 label="Password"
//                 type={showPassword ? 'text' : 'password'}
//                 placeholder="Password"
//                 value={password}
//                 onChange={e => setPassword(e.target.value)}
//                 required
//                 minLength={8}
//                 InputFieldClassName="input-bottom"
//               />
//               <Form.Group controlId="rememberMe" className="mb-3">
//                 <Form.Check
//                   type="checkbox"
//                   label="Remember me"
//                   checked={rememberMe}
//                   onChange={e => setRememberMe(e.target.checked)}
//                 />
//                 <Form.Text className="text-muted">
//                   <Link to="/forget" className="login-page_forgot-link">
//                     Forgot password?
//                   </Link>
//                 </Form.Text>
//               </Form.Group>
//               <CustomButton>Login</CustomButton>
//             </Form>
//           </div>
//         </Col>
//         <Col xs={12} md={6}>
//           <Image src={loginBanner} alt="placeholder" fluid />
//         </Col>
//       </Row>
//     </Container>
//   );
// };

// export default Login;


import { useState } from 'react';
import { Container, Row, Col, Form, Image } from 'react-bootstrap';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import { CustomButton, InputField } from '../../../components';
import { EMAIL_REGEX } from '../../../config/regex';
import loginBanner from '../../../assets/images/login/login-banner.png';
import './LoginForm.css'
import { GoMail } from 'react-icons/go'
import { AiTwotoneLock } from 'react-icons/ai'
import NestoLogo from '../../../assets/images/login/nestoLogo.svg'
import { Link } from 'react-router-dom';
const Login = () => {
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
              <h1 className="login-page_form_heading">Sign in</h1>
              <span className='login-page_form_sub-heading'>Sign in to dashboard</span>
              <div className="login-page_form-inputs">
                <InputField
                  id="email"
                  label="Email Address"
                  type="email"
                  placeholder="Enter email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                  pattern={EMAIL_REGEX}
                  feedback="Please enter valid email"
                  InputFieldClassName="input-bottom"
                  icon={<GoMail />}
                />
                {/* <GoMail className="login-page_input_icon" /> */}
              </div>
              <div className="login-page_form-inputs">
                <InputField
                  id="password"
                  label="Password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  required
                  minLength={8}
                  InputFieldClassName="input-bottom"
                  icon={<AiTwotoneLock />}
                />
              </div>
              <Form.Group controlId="rememberMe" className="d-flex justify-content-between align-items-center mt-3">
                <Form.Check
                  type="checkbox"
                  label="Remember me"
                  checked={rememberMe}
                  onChange={e => setRememberMe(e.target.checked)}
                />
                <Form.Text className="login-page_forgot-div">
                  <Link to="/forget" className='login-page_forgot-link'>Forgot password?</Link>
                </Form.Text>
              </Form.Group>
              <CustomButton>Login</CustomButton>
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
export default Login;