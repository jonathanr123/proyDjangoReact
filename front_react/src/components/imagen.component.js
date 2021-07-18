import React, { Component } from "react";
import { connect } from "react-redux";
import { updateImagen, deleteImagen } from "../actions/imagenes";
import ImagenDataService from "../services/imagen.service";

class Imagen extends Component {
  constructor(props) {
    super(props);
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.getImagen = this.getImagen.bind(this);
    this.updateStatus = this.updateStatus.bind(this);
    this.updateContent = this.updateContent.bind(this);
    this.removeImagen = this.removeImagen.bind(this);

    this.state = {
      currentImagen: {
        id: null,
        title: "",
        description: "",
        published: false,
      },
      message: "",
    };
  }

  componentDidMount() {
    this.getImagen(this.props.match.params.id);
  }

  onChangeTitle(e) {
    const title = e.target.value;

    this.setState(function (prevState) {
      return {
        currentImagen: {
          ...prevState.currentImagen,
          title: title,
        },
      };
    });
  }

  onChangeDescription(e) {
    const description = e.target.value;

    this.setState((prevState) => ({
      currentImagen: {
        ...prevState.currentImagen,
        description: description,
      },
    }));
  }

  getImagen(id) {
    ImagenDataService.get(id)
      .then((response) => {
        this.setState({
          currentImagen: response.data,
        });
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  updateStatus(status) {
    var data = {
      id: this.state.currentImagen.id,
      title: this.state.currentImagen.title,
      description: this.state.currentImagen.description,
      published: status,
    };

    this.props
      .updateImagen(this.state.currentImagen.id, data)
      .then((reponse) => {
        console.log(reponse);

        this.setState((prevState) => ({
          currentImagen: {
            ...prevState.currentImagen,
            published: status,
          },
        }));

        this.setState({ message: "The status was updated successfully!" });
      })
      .catch((e) => {
        console.log(e);
      });
  }

  updateContent() {
    this.props
      .updateImagen(this.state.currentImagen.id, this.state.currentImagen)
      .then((reponse) => {
        console.log(reponse);
        
        this.setState({ message: "The imagen was updated successfully!" });
      })
      .catch((e) => {
        console.log(e);
      });
  }

  removeImagen() {
    this.props
      .deleteImagen(this.state.currentImagen.id)
      .then(() => {
        this.props.history.push("/imagenes");
      })
      .catch((e) => {
        console.log(e);
      });
  }

  render() {
    const { currentImagen } = this.state;

    return (
        <div>
        {currentImagen ? (
          <div className="edit-form">
            <h4>Imagen</h4>
            <form>
              <div className="form-group">
                <label htmlFor="title">Title</label>
                <input
                  type="text"
                  className="form-control"
                  id="title"
                  value={currentImagen.title}
                  onChange={this.onChangeTitle}
                />
              </div>
              <div className="form-group">
                <label htmlFor="description">Description</label>
                <input
                  type="text"
                  className="form-control"
                  id="description"
                  value={currentImagen.description}
                  onChange={this.onChangeDescription}
                />
              </div>

              <div className="form-group">
                <label>
                  <strong>Status:</strong>
                </label>
                {currentImagen.published ? "Published" : "Pending"}
              </div>
            </form>

            {currentImagen.published ? (
              <button
                className="badge badge-primary mr-2"
                onClick={() => this.updateStatus(false)}
              >
                UnPublish
              </button>
            ) : (
              <button
                className="badge badge-primary mr-2"
                onClick={() => this.updateStatus(true)}
              >
                Publish
              </button>
            )}

            <button
              className="badge badge-danger mr-2"
              onClick={this.removeImagen}
            >
              Delete
            </button>

            <button
              type="submit"
              className="badge badge-success"
              onClick={this.updateContent}
            >
              Update
            </button>
            <p>{this.state.message}</p>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a Imagen...</p>
          </div>
        )}
      </div>
    );
  }
}

export default connect(null, { updateImagen, deleteImagen })(Imagen);