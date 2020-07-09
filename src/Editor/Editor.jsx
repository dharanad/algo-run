import React, { Component } from "react";
import { Controlled as CodeMirror } from "react-codemirror2";
import axios from "axios";
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
    };
  }

  onSubmit = async () => {
    alert('Code Submitted') //FIXME: Notify users properly
    const api = `http://localhost:8080/run`;
    try {
      const data = await axios.post(api, { code: this.state.code });
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  onBeforeChange = (editor, data, value) => {
    this.setState({ code : value });
  };

  onChange = (editor, data, value) => {

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
            value={this.state.code}
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
