import React from "react";
import { Button, Form } from "react-bootstrap";
import { Formik } from "formik";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import ROUTE_URLS from "../../config/routes";
import { loginUser, resetValue } from "../../middlewares/auth";
import { connect } from "react-redux";
import ToastService from "../../helpers/toast-services";
import "./login.scss";
import { withRouter } from "../../hocs/withRouter";
import ErrorList from "../../components/error-list/ErrorList";

const LoginSchema = Yup.object({
  email: Yup.string()
    .email("Please enter valid Email Address.")
    .required("Email is required."),

  password: Yup.string()
    .required("Password is required.")
    .min(6, "Password must be at least 6 char"),
});

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = { email: "", password: "" };
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

  componentDidMount(){
    this.props.resetValueRedux();
  }

  componentDidUpdate() {
    let obj = this.props.values;

    if (!obj.loginLoading) {
      if (obj.loginMessage) {
        ToastService.success(obj.loginMessage);
        this.props.navigate(ROUTE_URLS.HOME);
      }
    }
  }

  handleSubmit = (values) => {
    this.props.loginUserInRedux(values);
  };

  render() {
    return (
      <>
        <section className="section-login"> 
          <div className="container">
            <div className="login-wrapper">
              <h4>Login</h4>
              {this.props.values.loginError && (
                <ErrorList error={this.props.values.loginError} />
              )}
              <Formik
                initialValues={this.state}
                validationSchema={LoginSchema}
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
                          id="password"
                          placeholder="Password"
                          value={values.password}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          type="password"
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
                      <Button type="submit" onClick={handleSubmit}>
                        Login
                      </Button>
                    </div>
                  </Form>
                )}
              </Formik>
              <p className="p-register-login">
                Not Registered yet?{" "}
                <Link to={ROUTE_URLS.REGISTER}>Register here</Link>
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
    loginUserInRedux: (values) => dispatch(loginUser(values)),
    resetValueRedux: () => dispatch(resetValue()),
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Login));