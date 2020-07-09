import React, { Component } from "react";
import { Controlled as CodeMirror } from "react-codemirror2";
import Selector from "../Selector/Selector";
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
  state = {};

  constructor() {
    super();

    this.state = {
      options: {
        mode: "text/x-c++src",
        lineNumbers: true,
        smartIndent: true,
        indentUnit: 4,
        keyMap: "sublime",
        theme: "eclipse",
      },
      value: "# Write your code here",
    };
  }

  onSubmit = () => {
    console.log(`Clicked Submit`);
  };

  onBeforeChange = (editor, data, value) => {
    this.setState({ value });
  };

  onChange = (editor, data, value) => {
    console.log(this.state.value);
  };

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
      <div style={{ margin: "2%" }}>
        <Selector list={this.themes} onChange={this.onSelectChange}>
          Theme
        </Selector>
        <Selector list={this.keyMaps} onChange={this.onKeyMapChange}>
          Keymap
        </Selector>
        <div style={{ border: "double", width: "60%" }}>
          <CodeMirror
            value={this.state.value}
            options={{ ...this.state.options }}
            onBeforeChange={this.onBeforeChange}
            onChange={this.onChange}
          />
        </div>
        <p></p>
        <button onClick={() => this.onSubmit()}>Submit</button>
      </div>
    );
  }
}

export default Editor;
