import React, {useState} from 'react';
import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Editor from './Editor/Editor';
import OutputTextView from './OutputTextView';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(2),
  },
}));
function MainBoard(props) {
  const classes = useStyles();
  const [response, setResponse] = useState([]);
  const [isError, setIsError] = useState(false); 
  return (
    <div className={classes.root}>
      <Grid container spacing={2} alignItems='stretch' direction='column'>
        <Grid item xs={9} className={classes.selction}>
          <Editor onResponse={setResponse} onError={setIsError}/>
        </Grid>
        <Grid item xs={6} className={classes.selction}>
          <OutputTextView isError={isError} response={response}/>
        </Grid>
      </Grid>
    </div>
  );
}

export default MainBoard;
