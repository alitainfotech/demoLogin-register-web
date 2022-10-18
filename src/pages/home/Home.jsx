import React from "react";
import { Button } from "react-bootstrap";
import ROUTE_URLS from "../../config/routes";
import LocalstorageService from "../../helpers/localstorage-services";
import { withRouter } from "../../hocs/withRouter";

class Home extends React.Component {
  handleLogout = () => {
    LocalstorageService.logoutUser();
    this.props.navigate(ROUTE_URLS.LOGIN);
  }

  render() {
    return (
      <div className="text-center mt-5">
        <h1>Welcome!</h1>
        <Button onClick={this.handleLogout} style={{backgroundColor:"#d3235f",border:"none"}} >Logout</Button>
      </div>
    );
  }
}

export default withRouter(Home);