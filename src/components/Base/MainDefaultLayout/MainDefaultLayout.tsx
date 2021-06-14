import React from 'react';
import useStyles from './styles';

const Content: React.FC<any> = (props: any) => {
  const styles = useStyles();

  const {
    backgroundColor = '#030925'
  } = props

  return (
    <div className={styles.mainLayout} style={{backgroundColor: backgroundColor}}>
      {props.children}
    </div>
  );
};

export default Content;