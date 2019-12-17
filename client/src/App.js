import React from 'react';
import './index.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      apiResponse: "",
      imgPaths: []
    };

    this.callAPI = this.callAPI.bind(this);
    this.getHeatmaps = this.getHeatmaps.bind(this);
  }

  callAPI() {
    fetch("http://localhost:9000/testAPI")
      .then(res => res.text())
      .then(res => this.setState({ apiResponse: res }))
      .catch(err => err);
  }

  getHeatmaps() {
    fetch("http://localhost:9000/heatmaps")
      .then(response => response.json())
      .then(data => {
        const paths = data;
        this.setState({imgPaths: paths});
      })
      .catch(err => err);
  }

  componentDidMount() {
    this.callAPI();
    this.getHeatmaps();
  }

  render() {

    var imgPaths = this.state.imgPaths;
    const imgPathList = imgPaths.map((path) =>
      <li>{path}</li>
    );

    return (
      <div id="mainContainer" className="container-fluid">
        <div className="row">
          <div id="leftContainer" className="col-8">
            <p>
              {this.state.apiResponse}
            </p>
            <ul>
              {imgPathList}
            </ul>
          </div>
          <div id="rightContainer" className="col-4">
            <div id="textboxRow" className="row my-4 align-middle">
              <div id="textboxCol" className="col d-flex justify-content-around">
                <textarea
                  id="textbox"
                  rows="20"
                  placeholder="Your coordinates will show up here..."
                  readOnly>

                </textarea>
              </div>
            </div>
            <div id="buttonsRow" className="row my-4 align-middle">
              <div id="resetButtonCol" className="col d-flex justify-content-around">
                <button id="resetButton" className="btn btn-primary">
                  Reset
                </button>
              </div>
              <div id="submitButtonCol" className="col d-flex justify-content-around">
                <button id="submitButton" className="btn btn-success">
                  Success
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
