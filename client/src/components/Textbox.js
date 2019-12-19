import React from 'react';
import '../index.css';

class Textbox extends React.Component {

  render() {
    return(
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
    );
  }
}

export default Textbox;
