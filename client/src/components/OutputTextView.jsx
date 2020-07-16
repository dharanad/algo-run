import React from 'react';
import { Paper, Typography, Grid, Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import ResponsRendered from './ResponseRender';

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
  },
  outputBox: {
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: theme.palette.primary.main,
    padding: theme.spacing(1),
    overflow: 'auto',
    maxHeight : "20vh"
  }
}));

const OutputTextView = ({isError, response}) => {
  const classes = useStyles();
  return (
    <Paper className={classes.paper} elevation={1} square={false}>
      <Grid
        container
        direction='column'
        spacing={1}
        justify='flex-start'
        alignItems='stretch'>
        <Grid item>
          <Typography variant='subtitle1'>Output</Typography>
        </Grid>
        <Box className={classes.outputBox}>
          <ResponsRendered response={response} isError={isError}/>
        </Box>
      </Grid>
    </Paper>
  );
};

export default OutputTextView;
