import React, { Component } from 'react';
import { Controlled as CodeMirror } from 'react-codemirror2';
import Selector from '../Selector';
import { Grid, Button, Box } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import axios from 'axios';
import 'codemirror/mode/clike/clike';
import 'codemirror/keymap/sublime';
import 'codemirror/keymap/vim';
import 'codemirror/keymap/emacs';
import './editor.css';

const styles = (theme) => ({
  codeMirror: {
    borderColor: theme.palette.primary.main,
  },
  button: {
    color: theme.palette.primary.main,
  },
});

const Editor = withStyles(styles)(
  class extends Component {
    keyMaps = ['sublime', 'vim', 'emacs'];
    themes = [
      'default',
      'material',
      'material-darker',
      'eclipse',
      'monokai',
      'dracula',
    ];

    constructor(props) {
      super(props);

      this.state = {
        options: {
          mode: 'text/x-c++src',
          lineNumbers: true,
          smartIndent: true,
          indentUnit: 4,
          keyMap: 'sublime',
          theme: 'eclipse',
        },
        code: '# Write your code here',
        isSubmitDisabled: false,
      };
    }

    onSubmit = async () => {
      let isSubmitDisabled = true;
      this.setState({ isSubmitDisabled });
      try {
        const { data } = await axios.post('/api/run', {
          code: this.state.code,
        });
        const { status, error, output } = data;
        const {onResponse, onError} = this.props;
        if(error.length > 0){
          onResponse(error);
          onError(true);
        }else{
          onResponse(output);
          onError(false);
        }
      } catch (error) {
        //FIXME: Catch all the network errors
        console.log(error);
        const status = error.response.status;
        if (status === 200) {
          this.props.handleResponse(error, true);
        }
      } finally {
        isSubmitDisabled = false;
        this.setState({ isSubmitDisabled });
      }
    };

    onBeforeChange = (_editor, _data, value) => {
      this.setState({ code: value });
    };

    onChange = (_editor, _data, value) => {};

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
      const { classes } = this.props;
      return (
        <Grid container direction='column' spacing={1}>
          <Grid item>
            <Grid container justify='flex-start' spacing={1}>
              <Grid item>
                <Selector list={this.themes} onChange={this.onSelectChange}>
                  Theme
                </Selector>
              </Grid>
              <Grid item>
                <Selector list={this.keyMaps} onChange={this.onKeyMapChange}>
                  Keymap
                </Selector>
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <Box className={classes.codeMirror} border={1}>
              <CodeMirror
                value={this.state.code}
                options={{ ...this.state.options }}
                onBeforeChange={this.onBeforeChange}
                onChange={this.onChange}
              />
            </Box>
          </Grid>
          <Grid item>
            <Button
              onClick={() => this.onSubmit()}
              disabled={this.state.isSubmitDisabled}
              variant='contained'
              className={classes.button}>
              Submit
            </Button>
          </Grid>
        </Grid>
      );
    }
  }
);

export default Editor;
