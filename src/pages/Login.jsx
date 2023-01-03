import React, { useState } from "react";
import Helmet from "../components/Helmet/Helmet";
import { Container, Row, Col, Form, FormGroup } from "reactstrap";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase.config";
import { toast } from "react-toastify";
import { useFormik } from "formik"
import * as Yup from "yup"

import "../styles/login.css";

const Login = () => {
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  const[errEmail, setErrEmail] = useState("")
  const[errPassword, setErrPassword] = useState("")
  const [loading, setLoading] = useState(false);
  
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },

    // validationSchema: Yup.object({
    //   email: Yup.string().required("Email is required").matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,"Please enter a valid email address"),
    //   password: Yup.string().required("Password is required").min(6,"Password must be 6 characters"),
    // }),

    onSubmit: async (values) => {
      setLoading(true);
  
      try {
        const userCredential = await signInWithEmailAndPassword(
          auth,
          values.email,
          values.password
        );
  
        const user = userCredential.user;
  
        console.log(user);
        setLoading(false);
        toast.success("Successfully logged in");
        navigate("/checkout");
      } catch (error) {
        setLoading(false);
        toast.error("Login failed");
        setErrEmail("Your email address is incorrect")
        setErrPassword("Your password address is incorrect")
      }
    }
  })

  const navigate = useNavigate();

  // const signIn = async (e) => {
  //   e.preventDefault();
  //   setLoading(true);

  //   try {
  //     const userCredential = await signInWithEmailAndPassword(
  //       auth,
  //       email,
  //       password
  //     );

  //     const user = userCredential.user;

  //     console.log(user);
  //     setLoading(false);
  //     toast.success("Successfully logged in");
  //     navigate("/checkout");
  //   } catch (error) {
  //     setLoading(false);
  //     toast.error(error.message);
  //   }
  // };

  return (
    <Helmet title="Login">
      <section>
        <Container>
          <Row>
            {loading ? (
              <Col lg="12" className="text-center">
                <h5 className="fw-bold">Loading</h5>
              </Col>
            ) : (
              <Col lg="6" className="m-auto text-center">
                <h3 className="fw-bold mb-4">Login</h3>
                <Form className="auth__form" onSubmit={formik.handleSubmit}>
                  <FormGroup className="form__group">
                    <input
                      type="email"
                      id="email"
                      name="email"
                      placeholder="Enter your email"
                      value={formik.values.email}
                      onChange={formik.handleChange}
                    />
                    {errEmail && (<p className="errorMsg">{errEmail}</p>)}
                  </FormGroup>

                  <FormGroup className="form__group">
                    <input
                      type="password"
                      id="password"
                      name="password"
                      placeholder="Enter your password"
                      value={formik.values.password}
                      onChange={formik.handleChange}
                    />
                    {errPassword && (<p className="errorMsg">{errPassword}</p>)}
                  </FormGroup>

                  <button type="submit" className="buy__btn auth__btn">
                    Login
                  </button>
                  <p>
                    Don't have an account ?{" "}
                    <Link to="/signup">Create an account</Link>
                  </p>
                </Form>
              </Col>
            )}
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default Login;
