import React from "react"
// Include bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route } from "react-router-dom";
import { AuthProvider } from "./services/Auth";
import PrivateRoute from "./services/PrivateRoute";
import Registration from './Registration';
import Login from './Login';
import Home from './home';
import Upload from './Upload';
import Create from "./Create";


function App() {
  return (
    <div>
      <AuthProvider>
        <Router>
          <PrivateRoute exact path="/" component={Home} />
          <PrivateRoute exact path="/upload" component={Upload} />
          <PrivateRoute exact path="/posts/create" component={Create} />
          <Route exact path="/register" component={Registration} />
          <Route exact path="/login" component={Login} />
        </Router>
      </AuthProvider>
    </div>
  );
}

export default App;
