import "bootstrap/dist/css/bootstrap.min.css";
import React, { Fragment, Component } from "react";
import Editor from "../Editor/Editor";
import Header from "../Header";
import TextView from "../TextView";
import { Container, Row, Col } from "reactstrap";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      output: null,
      isError : false
    };
  }
  
  handleOutput = (output, isError) => {
    this.setState({output,isError});
  }

  render() {
    return (
      <Fragment>
        <Header />
        <main className="my-5 py-3">
          <Container className="px-0">
            <Row className="pt-2 pt-md-5 w-100 px-4 px-xl-0 position-relative">
              <Col md={{ size: 9 }} tag="section">
                <Editor handleOutput={this.handleOutput}/>
              </Col>
              <Col md={{ size: 3 }} tag="aside" className="mt-5">
                <TextView isError={this.state.isError}>{this.state.output}</TextView>
              </Col>
            </Row>
          </Container>
        </main>
      </Fragment>
    );
  }
}

export default App;
