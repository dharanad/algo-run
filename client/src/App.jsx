import React from 'react';
import TitleBar from './components/TitleBar';
import MainBoard from './components/MainBoard';
import { makeStyles } from '@material-ui/core';
const useStyles = makeStyles(theme => ({
  root : {
    flexGrow : 1
  }
}))
function App(props) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <TitleBar />
      <MainBoard />
    </div>
  );
}

export default App;