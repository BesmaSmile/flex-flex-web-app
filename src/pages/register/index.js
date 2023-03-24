/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import {
  Formik, Field, Form, ErrorMessage,
} from 'formik';
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import logo from 'assets/img/logo.png';

import { Link } from 'react-router-dom';
import { UpcomingMovies } from 'components';
import './style.scss';

function Register() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const userSchema = yup.object().shape({
    firstname: yup.string().required('Fisrtname is required'),
    lastname: yup.string().required('Fisrtname is required'),
    username: yup.string().required('Username is required'),
    password: yup.string().required('Password is required'),
  });
  const initialValues = {
    firstname: '',
    lastname: '',
    username: '',
    password: '',
  };
  const submit = async (values) => {
    dispatch({
      type: 'user/REGISTER',
      payload: values,
    });
  };
  return (
    <div className="register d-flex flex-row justify-content-center align-items-center">
      <div className="container g-0">
        <div className="row g-0 justify-content-md-center">
          <div className="form-container col-6">
            <Formik validationSchema={userSchema} initialValues={initialValues} onSubmit={submit}>
              {({ errors, touched, isValid }) => (
                <Form className="form d-flex flex-column align-items-center justify-content-center p-4">

                  <img className="logo mb-1" src={logo} alt="logo" />
                  <h1>Sign Up</h1>
                  <div className="m-3">
                    <div className="row g-1">
                      <div className="col-6">
                        <label htmlFor="firstname" className="form-label">
                          First name
                        </label>
                        <Field id="firstname" name="firstname" type="text" className={`form-control ${errors.firstname && touched.firstname && 'form-control-error'}`} />
                        <ErrorMessage name="firstname">
                          {(msg) => <div className="error">{msg}</div>}
                        </ErrorMessage>
                      </div>
                      <div className="col-6">
                        <label htmlFor="lastname" className="form-label">
                          Last name
                        </label>
                        <Field id="lastname" name="lastname" type="text" className={`form-control ${errors.lastname && touched.lastname && 'form-control-error'}`} />
                        <ErrorMessage name="lastname">
                          {(msg) => <div className="error">{msg}</div>}
                        </ErrorMessage>
                      </div>
                    </div>
                  </div>
                  <div className="m-3">
                    <label htmlFor="username" className="form-label">
                      Username
                    </label>
                    <Field id="username" name="username" type="text" className={`form-control ${errors.username && touched.username && 'form-control-error'}`} />
                    <ErrorMessage name="username">
                      {(msg) => <div className="error">{msg}</div>}
                    </ErrorMessage>
                  </div>
                  <div className="m-3">
                    <label htmlFor="password" className="form-label">
                      Password
                    </label>
                    <Field id="password" name="password" type="password" className={`form-control ${errors.password && touched.password && 'form-control-error'}`} />
                    <ErrorMessage name="password">
                      {(msg) => <div className="error">{msg}</div>}
                    </ErrorMessage>
                  </div>
                  <div className="d-flex flex-column mt-4">
                    <button disabled={!isValid} type="submit" className="btn btn-danger mb-2">
                      {user?.loading ? (
                        <div className="spinner-border spinner-border-sm text-light" role="status" />
                      )
                        : 'Sign up'}

                    </button>
                    {/* <button type="button" className="btn btn-light">Register</button> */}
                    <div>
                      Already registered to
                      {' '}
                      <b>Flix Flex</b>
                      ?
                      {' '}
                      <Link to="/login">Sign in now</Link>

                    </div>
                  </div>
                </Form>
              )}
            </Formik>

          </div>
          <div className="slider col-6">
            <UpcomingMovies />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
