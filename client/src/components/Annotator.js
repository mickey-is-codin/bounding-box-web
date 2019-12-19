import React from 'react';
import '../index.css';

class Annotator extends React.Component {

  makeFlexRow(idLabel, contentElem) {
    var rowId = idLabel.concat('Row');
    var colId = idLabel.concat('Col');
    return(
      <div id={rowId} className="row my-2 align-middle">
        <div id={colId} className="col d-flex justify-content-around">
          {contentElem}
        </div>
      </div>
    );
  }

  render() {

    var apiResponseP = <p>{this.props.apiResponse}</p>;
    var filenameH = <h2>{this.props.filename}</h2>;
    var annotatorDiv = <div id="bbox_annotator"></div>;

    return(
      <div id="leftContainer" className="col-8">
        {this.makeFlexRow("apiTest", apiResponseP)}
        {this.makeFlexRow("filename", filenameH)}
        {this.makeFlexRow("annotatorRow", annotatorDiv)}
      </div>
    );
  }
}

export default Annotator;
