import React, { Component } from "react";
import { Controlled as CodeMirror } from "react-codemirror2";
import Selector from "../Selector/Selector";
import { Button, Container, Row, Col } from "reactstrap";
import axios from "axios";
import "./editor.css";
import "codemirror/mode/clike/clike";
import "codemirror/keymap/sublime";
import "codemirror/keymap/vim";
import "codemirror/keymap/emacs";

class Editor extends Component {
  keyMaps = ["sublime", "vim", "emacs"];
  themes = [
    "default",
    "material",
    "material-darker",
    "eclipse",
    "monokai",
    "dracula",
  ];

  constructor(props) {
    super(props);

    this.state = {
      options: {
        mode: "text/x-c++src",
        lineNumbers: true,
        smartIndent: true,
        indentUnit: 4,
        keyMap: "sublime",
        theme: "eclipse",
      },
      code: "# Write your code here",
      isSubmitDisabled : false
    };
  }

  onSubmit = async () => {
    let isSubmitDisabled = !this.state.isSubmitDisabled;
    this.setState({isSubmitDisabled});
    try {
      const { data, status } = await axios.post("/api/run", {
        code: this.state.code,
      });

      this.props.handleOutput(data, false);
    } catch (error) { //FIXME: Catch all the network errors
      const status = error.response.status;
      if(status === 200){
        this.props.handleOutput(error, true);
      }
    }
    isSubmitDisabled = !this.state.isSubmitDisabled;
    this.setState({isSubmitDisabled});
  };

  onBeforeChange = (editor, data, value) => {
    this.setState({ code: value });
  };

  onChange = (editor, data, value) => {};

  onSelectChange = (event) => {
    const theme = event.target.value;
    const options = { ...this.state.options, theme };
    this.setState({ options });
  };

  onKeyMapChange = (event) => {
    const keyMap = event.target.value;
    const options = { ...this.state.options, keyMap };
    this.setState({ options });
  };

  render() {
    return (
      <Container>
        <Row noGutters>
          <Col>
            <Selector list={this.themes} onChange={this.onSelectChange}>
              Theme
            </Selector>
          </Col>
          <Col>
            <Selector list={this.keyMaps} onChange={this.onKeyMapChange}>
              Keymap
            </Selector>
          </Col>
        </Row>
        <Row noGutters className="mb-2">
          <Col className="border border-primary">
            <CodeMirror
              value={this.state.code}
              options={{ ...this.state.options }}
              onBeforeChange={this.onBeforeChange}
              onChange={this.onChange}
            />
          </Col>
        </Row>
        <Row noGutters>
          <Col>
            <Button onClick={() => this.onSubmit()} disabled={this.state.isSubmitDisabled} color="success">
              Submit
            </Button>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Editor;
