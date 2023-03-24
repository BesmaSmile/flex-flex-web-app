/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import {
  Formik, Field, Form, ErrorMessage,
} from 'formik';
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import logo from 'assets/img/logo.png';
import './style.scss';
import { Link } from 'react-router-dom';
import { UpcomingMovies } from 'components';

function Login() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const userSchema = yup.object().shape({
    username: yup.string().required('Username is required'),
    password: yup.string().required('Password is required'),
  });
  const initialValues = {
    username: '',
    password: '',
  };

  const submit = async (values) => {
    dispatch({
      type: 'user/LOGIN',
      payload: values,
    });
  };
  return (
    <div className="login d-flex flex-row justify-content-center align-items-center">
      <div className="container g-0">
        <div className="row g-0 justify-content-md-center">
          <div className="slider col-6">
            <UpcomingMovies />
          </div>
          <div className="form-container col-6">
            <Formik validationSchema={userSchema} initialValues={initialValues} onSubmit={submit}>
              {({ errors, touched, isValid }) => (
                <Form className="form d-flex flex-column align-items-center justify-content-center p-4">

                  <img className="logo mb-4" src={logo} alt="logo" />
                  <h1>Sign In</h1>
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
                    <button disabled={!isValid || user.loading} type="submit" className="btn btn-danger mb-2">
                      {user?.loading ? (
                        <div className="spinner-border spinner-border-sm text-light" role="status" />
                      )
                        : 'Sign in'}

                    </button>
                    {/* <button type="button" className="btn btn-light">Register</button> */}
                    <div>
                      New to
                      {' '}
                      <b>Flix Flex</b>
                      ?
                      {' '}
                      <Link to="/register">Sign up now</Link>

                    </div>
                  </div>
                </Form>
              )}
            </Formik>

          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
