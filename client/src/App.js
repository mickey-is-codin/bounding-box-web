import React from 'react';
import './index.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      apiResponse: "",
      imgPaths: [],
      imgIx: 0,
      top: 0,
      left: 0,
      height: 0,
      width: 0
    };

    this.callAPI = this.callAPI.bind(this);
    this.getHeatmaps = this.getHeatmaps.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
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

  handleSubmit() {
    var currIx = this.state.imgIx;
    this.setState({imgIx: ++currIx})
    console.log(this.state.imgIx);
  }

  componentDidMount() {
    this.callAPI();
    this.getHeatmaps();
  }

  render() {

    const dataRoot = 'http://localhost:3000/img/avg-heatmaps/'
    var imgPaths = this.state.imgPaths;
    const imgPathList = imgPaths.map((path) =>
      <li>{dataRoot.concat(path)}</li>
    );
    const imgPathTags = imgPaths.map((path) =>
      <img src={dataRoot.concat(path)} alt="heatmap"/>
    );

    return (
      <div id="mainContainer" className="container-fluid">
        <div id="fullPageRow" className="row">
          <div id="leftContainer" className="col-8">
            <div id="apiTestRow" className="row my-4 align-middle">
              <div id="apiTestCol" className="col d-flex justify-content-around">
                <p>
                  {this.state.apiResponse}
                </p>
              </div>
            </div>
            <div id="heatmapImgRow" className="row my-4 align-middle">
              <div id="heatmapImgCol" className="col d-flex justify-content-around">
                {imgPathTags[this.state.imgIx]}
              </div>
            </div>
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
                <button id="resetButton" className="btn-lg btn-primary">
                  Reset Bounding Box
                </button>
              </div>
              <div id="submitButtonCol" className="col d-flex justify-content-around">
                <button id="submitButton" className="btn-lg btn-success" onClick={this.handleSubmit}>
                  Submit Bounding Box
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
