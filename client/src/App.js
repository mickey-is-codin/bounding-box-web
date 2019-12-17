import React from 'react';
import './index.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { apiResponse: "" };
  }

  callAPI() {
    fetch("http://localhost:9000/testAPI")
      .then(res => res.text())
      .then(res => this.setState({ apiResponse: res }))
      .catch(err => err);
  }

  componentDidMount() {
    this.callAPI();
    console.log(this.state.apiResponse);
  }

  render() {
    return (
      <div id="mainContainer" className="container-fluid">
        <div className="row">
          <div id="leftContainer" className="col">
          </div>
          <div id="rightContainer" className="col">
          </div>
        </div>
      </div>
    );
  }
}

export default App;
