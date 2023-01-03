import React, { useState } from "react";
import Helmet from "../components/Helmet/Helmet";

import { useFormik } from "formik"
import * as Yup from "yup"

import { Container, Row, Col, Form, FormGroup } from "reactstrap";
import { Link } from "react-router-dom";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { setDoc, doc } from "firebase/firestore";

import { auth } from "../firebase.config";
import { storage } from "../firebase.config";
import { db } from "../firebase.config";

import { toast } from "react-toastify";

import "../styles/login.css";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  // const [username, setUsername] = useState("");
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  // const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
      confirmedPassword: "",
      file: null,
    },
    
    validationSchema: Yup.object({
      username: Yup.string().required("Name is required"),
      email: Yup.string().required("Email is required").matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,"Please enter a valid email address"),
      password: Yup.string().required("Password is required").min(6,"Password must be 6 characters"),
      confirmedPassword: Yup.string().required("Password confirm is required").oneOf([Yup.ref("password"),null], "Password must match"),
      file: Yup.mixed().required('File is required'),
    }),

    onSubmit: async(values) => {
    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        values.email,
        values.password
      );

      const user = userCredential.user;
      const storageRef = ref(storage, `images/${Date.now() + values.username}`);
      const uploadTask = uploadBytesResumable(storageRef, values.file);

      uploadTask.on(
        (error) => {
          toast.error(error.message);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            //update user profile
            await updateProfile(user, {
              displayName: values.username,
              photoURL: downloadURL,
            });

            //store user data in firestore database
            await setDoc(doc(db, "users", user.uid), {
              uid: user.uid,
              displayName: values.username,
              email: values.email,
              photoURL: downloadURL,
            });
          });
        }
      );

      setLoading(false);
      toast.success("Account created");
      navigate("/login");
    } catch (error) {
      setLoading(false);
      toast.error("something went wrong");
    }
    }
  })
  // const signup = async (e) => {
  //   console.log(file)
  //   e.preventDefault();
  //   setLoading(true);

  //   try {
  //     const userCredential = await createUserWithEmailAndPassword(
  //       auth,
  //       email,
  //       password
  //     );

  //     const user = userCredential.user;
  //     const storageRef = ref(storage, `images/${Date.now() + username}`);
  //     const uploadTask = uploadBytesResumable(storageRef, file);

  //     uploadTask.on(
  //       (error) => {
  //         toast.error(error.message);
  //       },
  //       () => {
  //         getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
  //           //update user profile
  //           await updateProfile(user, {
  //             displayName: username,
  //             photoURL: downloadURL,
  //           });

  //           //store user data in firestore database
  //           await setDoc(doc(db, "users", user.uid), {
  //             uid: user.uid,
  //             displayName: username,
  //             email,
  //             photoURL: downloadURL,
  //           });
  //         });
  //       }
  //     );

  //     setLoading(false);
  //     toast.success("Account created");
  //     navigate("/login");
  //   } catch (error) {
  //     setLoading(false);
  //     toast.error("something went wrong");
  //   }
  // };

  return (
    <Helmet title="Signup">
      <section>
        <Container>
          <Row>
            {loading ? (
              <Col lg="12" className="text-center">
                <h5 className="fw-bold">Loading.....</h5>
              </Col>
            ) : (
              <Col lg="6" className="m-auto text-center">
                <h3 className="fw-bold mb-4">Signup</h3>
                <Form className="auth__form" onSubmit={formik.handleSubmit}>
                  <FormGroup className="form__group">
                    <input
                      type="text"
                      id="username"
                      name="username"
                      placeholder="Username"
                      value={formik.values.username}
                      onChange={formik.handleChange}
                    />
                    {formik.errors.username && (<p className="errorMsg">{formik.errors.username}</p>)}
                  </FormGroup>

                  <FormGroup className="form__group">
                    <input
                      type="email"
                      placeholder="Enter your email"
                      id="email"
                      name="email"
                      value={formik.values.email}
                      onChange={formik.handleChange}
                    />
                  {formik.errors.email && (<p className="errorMsg">{formik.errors.email}</p>)}
                  </FormGroup>

                  <FormGroup className="form__group">
                    <input
                      type="password"
                      placeholder="Enter your password"
                      id="password"
                      name="password"
                      value={formik.values.password}
                      onChange={formik.handleChange}
                    />
                    {formik.errors.password && (<p className="errorMsg">{formik.errors.password}</p>)}
                  </FormGroup>

                  <FormGroup className="form__group">
                    <input
                      type="password"
                      placeholder="Confirm your password"
                      id="confirmedPassword"
                      name="confirmedPassword"
                      value={formik.values.confirmedPassword}
                      onChange={formik.handleChange}
                    />
                    {formik.errors.confirmedPassword && (<p className="errorMsg">{formik.errors.confirmedPassword}</p>)}
                  </FormGroup>

                  <FormGroup className="form__group">
                      <input
                        type="file"
                        id="file"
                        name="file"
                        onChange={(event) => {
                          formik.setFieldValue("file", event.target.files[0]);
                        }}
                      />
                      {formik.errors.file && (<p className="errorMsg">{formik.errors.file}</p>)}
                  </FormGroup>

                  <button type="submit" className="buy__btn auth__btn">
                    Create an Account
                  </button>
                  <p>
                    Already have an account ? <Link to="/login">Login</Link>
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

export default Signup;
