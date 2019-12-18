import React from 'react';
import './index.css';

import $ from 'jquery';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      apiResponse: "",
      imgPaths: [],
      imgIx: 0,
      annotatorTraits: {
        url: "",
        input_method: "",
        labels: "",
        guide: false,
        onchange: null
      },
      filename: "test filename"
    };

    this.callAPI = this.callAPI.bind(this);
    this.getHeatmaps = this.getHeatmaps.bind(this);
    this.handleReset = this.handleReset.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  callAPI() {
    fetch("http://localhost:9000/testAPI")
      .then(res => res.text())
      .then(res => this.setState({ apiResponse: res }))
      .catch(err => err);
  }

  getHeatmaps() {

    const dataRoot = 'http://localhost:3000/img/avg-heatmaps/'
    fetch("http://localhost:9000/heatmaps")
      .then(response => response.json())
      .then(data => {
        var paths = data.map((path) =>
          dataRoot.concat(path)
        );
        this.setState({imgPaths: paths}, function() {
          this.makeAnnotator();
        });
      })
      .catch(err => err);
  }

  makeAnnotator() {

    console.log("Updating annotator on page");

    var receivedTraits = {
      url: this.state.imgPaths[this.state.imgIx],
      input_method: 'fixed',
      labels: "sacral region",
      guide: true,
      onchange: function(entries) {
        $("#textbox").text(JSON.stringify(entries, null, "  "));
      }
    }

    console.log("Annotator URL being updated to: " + receivedTraits.url);

    this.setState({annotatorTraits: receivedTraits}, function() {
      console.log("State annotator URL is now: " + this.state.annotatorTraits.url);
      this.annotator = new window.BBoxAnnotator(this.state.annotatorTraits);
      var splitURL = receivedTraits.url.split("/");
      var newFilename = splitURL[splitURL.length - 1].split(".")[0];
      this.setState({filename: newFilename});
    });

  }

  handleReset() {
    this.annotator.clear_all();
  }

  handleSubmit() {

    console.log("Submit pressed");

    this.setState({imgIx: Math.floor(Math.random() * Math.floor(this.state.imgPaths.length))}, function() {
      console.log("Image Index is now: " + this.state.imgIx);

      this.annotator.clear_all();

      var oldBBoxElem = document.getElementById('bbox_annotator');
      var bboxParent = oldBBoxElem.parentNode;
      bboxParent.removeChild(oldBBoxElem);

      var newBBoxElem = document.createElement('div');
      newBBoxElem.setAttribute('id', 'bbox_annotator');
      bboxParent.appendChild(newBBoxElem);
      this.makeAnnotator();
    });

  }

  componentDidMount() {
    this.callAPI();
    this.getHeatmaps();
  }

  render() {

    // const imgPathTags = this.state.imgPaths.map((path) =>
    //   <img src={path} alt="heatmap"/>
    // );

    return (
      <div id="mainContainer" className="container-fluid">
        <div id="fullPageRow" className="row">
          <div id="leftContainer" className="col-8">
            <div id="apiTestRow" className="row my-2 align-middle">
              <div id="apiTestCol" className="col d-flex justify-content-around">
                <p>
                  {this.state.apiResponse}
                </p>
              </div>
            </div>
            <div id="filenameRow" className="row my-2 align-middle">
              <div id="filenameCol" className="col d-flex justify-content-around">
                <h2>
                  {this.state.filename}
                </h2>
              </div>
            </div>
            <div id="annotatorRow" className="row my-4 align-middle">
              <div id="annotatorCol" className="col d-flex justify-content-around">
                <div id="bbox_annotator">
                </div>
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
                <button id="resetButton" className="btn-lg btn-primary" onClick={this.handleReset}>
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
