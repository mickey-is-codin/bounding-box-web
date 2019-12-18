import React from 'react';
import '../index.css';

class Annotator extends React.Component {

  render() {
    return(
      <div id="leftContainer" className="col-8">
        <div id="apiTestRow" className="row my-2 align-middle">
          <div id="apiTestCol" className="col d-flex justify-content-around">
            <p>
              {this.props.apiResponse}
            </p>
          </div>
        </div>
        <div id="filenameRow" className="row my-2 align-middle">
          <div id="filenameCol" className="col d-flex justify-content-around">
            <h2>
              {this.props.filename}
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
    );
  }
}

export default Annotator;
