import React from 'react';
import { AppBar, Toolbar, Typography, withStyles } from '@material-ui/core';
const styles = (theme) => ({
  flex: {
    flex: 1,
  },
  toolbarMagin: theme.mixins.toolbar,
});
const TitleBar = withStyles(styles)(({ classes }) => {
  return (
    <React.Fragment>
      <AppBar>
        <Toolbar>
          <Typography variant='h4'>
            Algorun
          </Typography>
        </Toolbar>
      </AppBar>
      <div className={classes.toolbarMagin} />
    </React.Fragment>
  );
});
export default TitleBar;
