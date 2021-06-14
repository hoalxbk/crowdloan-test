import React from 'react';
import NavLeft from './NavLeft';
import Button from '@material-ui/core/Button';
import useStyles from './styles';
import { useTypedSelector } from '../../../hooks/useTypedSelector';
import { Link } from 'react-router-dom';
import {adminRoute} from "../../../utils";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "";

const LeftDefaultLayout = (props: any) => {
  const styles = useStyles();
  const [smallLeft, setSmallLeft] = React.useState(false);
  const { data: loginUser } = useTypedSelector(state => state.user);

  return (
    <div className={styles.leftLayout + ' ' + (smallLeft && styles.smallLeft)}>
      <div className={styles.headLeft}>
        <div className={styles.BoxInfoUser}>
          <Link to={adminRoute('/profile')}>
            <img className={styles.avatar} src={loginUser.avatar ? `${API_BASE_URL}/image/${loginUser.avatar}` :'/images/avatar.svg'} alt="" />
          </Link>
          {
            !smallLeft &&
            <div className={styles.infoUser}>
              <div className="name">{loginUser?.username}</div>
              <div className="status">
                Verified Profile
                <img className="icon" src={'/images/icon-verified.svg'} alt="" />
              </div>
            </div>
          }
        </div>
        <Button className={styles.btnSmallBig + ' ' + (smallLeft && 'btnSmall')} onClick={() => setSmallLeft(!smallLeft)}></Button>
      </div>
      <NavLeft smallLeft={smallLeft}/>

      {
        !smallLeft &&
        <div className={styles.Copyright}>Copyright @ 2021. All rights reserved.</div>
      }
    </div>
  );
};

export default LeftDefaultLayout;
