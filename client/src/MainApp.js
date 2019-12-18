import React from 'react';
import './index.css';
import $ from 'jquery';

import Annotator from './components/Annotator';
import Textbox from './components/Textbox';
import ResetButton from './components/ResetButton';
import SubmitButton from './components/SubmitButton';

class MainApp extends React.Component {

  constructor() {
    super();
    this.callAPI = this.callAPI.bind(this);
    this.getHeatmaps = this.getHeatmaps.bind(this);

    this.handleReset = this.handleReset.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

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
      filename: "test filename",
      bbox: {
        left: 0,
        top: 0,
        width: 0,
        height: 0,
        label: "sacral region"
      }
    }
  }

  componentDidMount() {
    this.callAPI();
    this.getHeatmaps();
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
          this.generateAnnotator();
        });
      })
      .catch(err => err);
  }

  generateAnnotator() {
    var self = this;
    var receivedTraits = {
      url: this.state.imgPaths[this.state.imgIx],
      input_method: 'fixed',
      labels: "sacral region",
      guide: true,
      onchange: function(entries) {
        $("#textbox").text(JSON.stringify(entries, null, "  "));
        self.setState({bbox: entries[0]});
      }
    }

    this.setState({annotatorTraits: receivedTraits}, function() {
      this.annotator = new window.BBoxAnnotator(this.state.annotatorTraits);
      var splitURL = receivedTraits.url.split("/");
      var newFilename = splitURL[splitURL.length - 1].split(".")[0];
      this.setState({filename: newFilename});
    });
  }

  replaceAnnotator() {
    this.annotator.clear_all();
    var bboxParent = this.destroyAnnotator();
    this.newAnnotatorElement(bboxParent);
  }

  destroyAnnotator() {
    var oldBBoxElem = document.getElementById('bbox_annotator');
    var bboxParent = oldBBoxElem.parentNode;
    bboxParent.removeChild(oldBBoxElem);
    return(bboxParent);
  }

  newAnnotatorElement(bboxParent) {
    var newBBoxElem = document.createElement('div');
    newBBoxElem.setAttribute('id', 'bbox_annotator');
    bboxParent.appendChild(newBBoxElem);
    this.generateAnnotator();
  }

  handleReset() {
    this.annotator.clear_all();
  }

  handleSubmit() {
    this.setState({
      imgIx: Math.floor(Math.random() * Math.floor(this.state.imgPaths.length))
    }, function() {
        this.sendBBoxPayload();
        this.replaceAnnotator();
    });
  }

  sendBBoxPayload() {
    var payload = {
      "filename": this.state.filename,
      "bbox": this.state.bbox
    }

    fetch('http://localhost:9000/storeBBox', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(payload)
    });
  }

  render() {
    return(
      <div id="mainContainer" className="container-fluid">
        <div id="fullPageRow" className="row">
          <Annotator
            apiResponse={this.state.apiResponse}
            filename={this.state.filename}
          />
          <div id="rightContainer" className="col-4">
            <Textbox/>
            <div id="buttonsRow" className="row my-4 align-middle">
              <ResetButton
                onReset={this.handleReset}
              />
              <SubmitButton
                onSubmit={this.handleSubmit}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default MainApp;
