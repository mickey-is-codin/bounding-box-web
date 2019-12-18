import React from 'react';
import '../index.css';

class SubmitButton extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit() {
    this.props.onSubmit();
  }

  render() {
    return(
      <div id="submitButtonCol" className="col d-flex justify-content-around">
        <button id="submitButton" className="btn-lg btn-success" onClick={this.handleSubmit}>
          Submit Bounding Box
        </button>
      </div>
    );
  }
}

export default SubmitButton;
