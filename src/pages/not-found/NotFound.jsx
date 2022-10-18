import React, { Component } from "react";
import { Link } from "react-router-dom";
import ROUTE_URLS from "../../config/routes";

export default class NotFound extends Component {
  render() {
    return (
     
      <div className="text-center mt-5">
        <h1>Page not found</h1>
        <Link to={ROUTE_URLS.LOGIN} >Go to login</Link>
      </div>
    );
  }
}
