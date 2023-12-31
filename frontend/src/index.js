/* The index.js file initializes and starts the application. It attaches it to the
DOM and sets up the main routes for the application */

//import 'bootstrap/dist/css/bootstrap.min.css';

// Import required libraries
import React from "react";
import ReactDOM from "react-dom";
import { HashRouter, Route, Switch, Redirect } from "react-router-dom";

// Import layout components
import AuthLayout from "layouts/Auth.js";
import AdminLayout from "layouts/Admin.js";
import PatientLayout from "layouts/Patient.js";
//import PatientProfile from "views/Dashboard/PatientRecord/patientProfile.js";

// Import authentication context provider
import { AuthProvider } from "auth-context/auth.context";

// Render the main app component
ReactDOM.render(
  <AuthProvider userData={""}>
    <HashRouter>
      <Switch>
        <Route path={`/auth`} component={AuthLayout} />
		<Route path={`/patient/:id`} component={PatientLayout} />
        <Route path={`/admin`} component={AdminLayout} />
        <Redirect from={`/`} to="/admin/dashboard" />
      </Switch>
    </HashRouter>
  </AuthProvider>,
  document.getElementById("root")
);
