import React from 'react';
import { Typography } from '@material-ui/core';

function ResponseRender({ response, isError }) {
  const list = response.map((value, index) => (
    <Typography color={isError ? 'error' : 'inherit'}>{value}</Typography>
  ));
  return list;
}

export default ResponseRender;
