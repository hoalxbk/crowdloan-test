import React from 'react';
import useStyles from './style_dark';

const TextSubTitle = (props: any) => {
  const classes = useStyles();

  return (
    <div className={classes.textSubTitleHeader}>
      {props.children}
    </div>
  );
}

export default TextSubTitle;
