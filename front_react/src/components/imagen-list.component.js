import React, { Component } from "react";
import { connect } from "react-redux";
import { retrieveImagenes, findImagenesByTitle, deleteAllImagenes } from "../actions/imagenes";

import { Link } from "react-router-dom";

class ImagenesList extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearchTitle = this.onChangeSearchTitle.bind(this);
    this.refreshData = this.refreshData.bind(this);
    this.setActiveImagen = this.setActiveImagen.bind(this);
    this.findByTitle = this.findByTitle.bind(this);
    this.removeAllImagenes = this.removeAllImagenes.bind(this);

    this.state = {
      currentImagen: null,
      currentIndex: -1,
      searchTitle: "",
    };
  }

  componentDidMount() {
    this.props.retrieveImagenes();
  }

  onChangeSearchTitle(e) {
    const searchTitle = e.target.value;

    this.setState({
      searchTitle: searchTitle,
    });
  }

  refreshData() {
    this.setState({
      currentImagen: null,
      currentIndex: -1,
    });
  }

  setActiveImagen(imagen, index) {
    this.setState({
      currentImagen: imagen,
      currentIndex: index,
    });
  }

  removeAllImagenes() {
    this.props
      .deleteAllImagenes()
      .then((response) => {
        console.log(response);
        this.refreshData();
      })
      .catch((e) => {
        console.log(e);
      });
  }

  findByTitle() {
    this.refreshData();

    this.props.findImagenesByTitle(this.state.searchTitle);
  }

  render() {
    const { searchTitle, currentImagen, currentIndex } = this.state;
    const { imagenes } = this.props;

    return (
        <div className="list row">
        <div className="col-md-8">
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Search by title"
              value={searchTitle}
              onChange={this.onChangeSearchTitle}
            />
            <div className="input-group-append">
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={this.findByTitle}
              >
                Search
              </button>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <h4>Imagenes List</h4>

          <ul className="list-group">
            {imagenes &&
              imagenes.map((imagen, index) => (
                <li
                  className={
                    "list-group-item " +
                    (index === currentIndex ? "active" : "")
                  }
                  onClick={() => this.setActiveImagen(imagen, index)}
                  key={index}
                >
                  {imagen.title}
                </li>
              ))}
          </ul>

          <button
            className="m-3 btn btn-sm btn-danger"
            onClick={this.removeAllImagenes}
          >
            Remove All
          </button>
        </div>
        <div className="col-md-6">
          {currentImagen ? (
            <div>
              <h4>Imagen</h4>
              <div>
                <label>
                  <strong>Title:</strong>
                </label>{" "}
                {currentImagen.title}
              </div>
              <div>
                <label>
                  <strong>Description:</strong>
                </label>{" "}
                {currentImagen.description}
              </div>
              <div>
                <label>
                  <strong>Status:</strong>
                </label>{" "}
                {currentImagen.published ? "Published" : "Pending"}
              </div>

              <Link
                to={"/imagenes/" + currentImagen.id}
                className="badge badge-warning"
              >
                Edit
              </Link>
            </div>
          ) : (
            <div>
              <br />
              <p>Please click on a Imagen...</p>
            </div>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    imagenes: state.imagenes,
  };
};

export default connect(mapStateToProps, { retrieveImagenes, findImagenesByTitle, deleteAllImagenes })(ImagenesList);