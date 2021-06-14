import React from 'react';
import useStyles from './style_dark';

const TextTitle = (props: any) => {
  const classes = useStyles();

  return (
    <div className={classes.textTitleHeader}>
      {props.children}
    </div>
  );
}

export default TextTitle;
