import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AddImagen from "./components/add-imagen.component";
import Imagen from "./components/imagen.component";
import ImagenList from "./components/imagen-list.component";

class App extends Component {
  render() {
    return (
      <Router>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <Link to={"/imagen"} className="navbar-brand">
            bezKoder
          </Link>
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/imagen"} className="nav-link">
                Imagenes
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/add"} className="nav-link">
                Add
              </Link>
            </li>
          </div>
        </nav>

        <div className="container mt-3">
          <Switch>
            <Route exact path={["/", "/imagen"]} component={ImagenList} />
            <Route exact path="/add" component={AddImagen} />
            <Route path="/imagen/:id" component={Imagen} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;