import React from "react";
import { Button, Form } from "react-bootstrap";
import { Formik } from "formik";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import ROUTE_URLS from "../../config/routes";
import { signUpUser, resetValue } from "../../middlewares/auth";
import ToastService from "../../helpers/toast-services";
import { withRouter } from "../../hocs/withRouter";
import ErrorList from "../../components/error-list/ErrorList";

import { connect } from "react-redux";

const signUpSchema = Yup.object({
  email: Yup.string()
    .email("Please enter valid Email Address.")
    .required("Email is required."),

  password: Yup.string()
    .required("Password is required.")
    .min(6, "Password must be at least 6 char"),
});

class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.initialvalue = { email: "", password: "" };
  }

  validate = (values) => {
    const errors = {};
    if (!values.email) {
      errors.name = "Required";
    }
    if (!values.password) {
      errors.password = "Required";
    }
    return errors;
  };

  handleSubmit = (values) => {
    this.props.signUpUserInRedux(values);
  };

  componentDidMount() {
    this.props.resetValueRedux();
  }

  componentDidUpdate() {
    let obj = this.props.values;
    if (!obj.signUpLoading && obj.loggedInUser) {
      ToastService.success("Registered Successfully!");
      this.props.navigate(ROUTE_URLS.LOGIN);
    }
  }

  render() {
    return (
      <>
        <section className="section-login">
          <div className="container">
            <div className="login-wrapper">
              <h4>Registration</h4>
              {this.props.values.signUpError && (
                <ErrorList error={this.props.values.signUpError} />
              )}
              <Formik
                initialValues={this.initialvalue}
                validationSchema={signUpSchema}
                onSubmit={this.handleSubmit}
              >
                {({
                  values,
                  errors,
                  touched,
                  showPassword = false,
                  handleChange,
                  handleBlur,
                  handleSubmit,
                  isSubmitting,
                }) => (
                  <Form className="form-login">
                    <div className="form-group">
                      <Form.Control
                        type="email"
                        id="email"
                        placeholder="Email"
                        onChange={(e) => handleChange(e)}
                        onBlur={handleBlur}
                        value={values.email}
                      />
                      <div className="invalid-feedback d-block">
                        {errors.email && touched.email && errors.email}
                      </div>
                    </div>
                    <div className="form-group">
                      <span className="span-eye">
                        <Form.Control
                          type="password"
                          id="password"
                          placeholder="Password"
                          value={values.password}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                        <Button
                          as="i"
                          size="sm"
                          variant="light"
                          className={`bg-transparent border-0 shadow-none p-0 ${
                            touched.password && errors.password && "with-error"
                          }`}
                          onClick={() => this.setState(!showPassword)}
                        ></Button>
                      </span>
                      {touched.password && errors.password && (
                        <div className="invalid-feedback d-block">
                          {errors.password}
                        </div>
                      )}
                    </div>
                    <div className="btn-submit">
                      <Button
                        type="submit"
                        onClick={handleSubmit}
                      >
                        Register
                      </Button>
                    </div>
                  </Form>
                )}
              </Formik>
              <p className="p-register-login">
                Already have an account?{" "}
                <Link to={ROUTE_URLS.LOGIN}>Login</Link>
              </p>
            </div>
          </div>
        </section>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    values: state.auth,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    signUpUserInRedux: (values) => dispatch(signUpUser(values)),
    resetValueRedux: (values) => dispatch(resetValue(values)),
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Signup));
