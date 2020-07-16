import React from 'react';
import { Grid , Typography} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles(theme => ({}));
const Selector = (props) => {
  const list = [...props.list];
  const classes = useStyles();
  return (
    <Grid container justify='flex-start' spacing={1} alignItems='baseline'>
      <Grid item>
        <Typography variant='subtitle1'>{props.children}</Typography>
      </Grid>
      <Grid item>
        <select onChange={(event) => props.onChange(event)}>
          {list.map((it) => (
            <option key={it} value={it}>
              {it}
            </option>
          ))}
        </select>
      </Grid>
    </Grid>
  );
};
export default Selector;
