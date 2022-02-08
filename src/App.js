import React from "react"
// Include bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route } from "react-router-dom";

import Registration from './Registration';
import Login from './Login';
import { AuthProvider } from "./services/Auth";
import PrivateRoute from "./services/PrivateRoute";
import Home from './home';
import Upload from './Upload'

function App() {
  return (
    <div>
      <AuthProvider>
        <Router>
          <PrivateRoute exact path="/upload" component={Upload} />
            <PrivateRoute path="/" component={Home} />
            <Route exact path="/register" component={Registration} />
            <Route exact path="/login" component={Login} />
        </Router>
      </AuthProvider>
    </div>
  );
}

export default App;
