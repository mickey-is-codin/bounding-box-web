import React from 'react';
import '../index.css';

class ResetButton extends React.Component {
  constructor(props) {
    super(props);
    this.handleReset = this.handleReset.bind(this);
  }

  handleReset() {
    this.props.onReset();
  }

  render() {
    return(
      <div id="resetButtonCol" className="col d-flex justify-content-around">
        <button id="resetButton" className="btn-lg btn-primary" onClick={this.handleReset}>
          Reset Bounding Box
        </button>
      </div>
    );
  }
}

export default ResetButton;
