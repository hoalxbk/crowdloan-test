/* import { useState, useEffect } from 'react'; */
/* import useFetch from '../../../hooks/useFetch'; */
import { Link } from 'react-router-dom';
import { Tier } from '../../../hooks/usePoolDetails';
import { convertTimeToStringFormat } from '../../../utils/convertDate';
import withWidth, {isWidthDown} from '@material-ui/core/withWidth';

/* import Tooltip from '@material-ui/core/Tooltip'; */
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import useStyles from './style';
import TierTableWithWeightRate from "./TierTableWithWeightRate";

type MyTierProps = {
  tiers: Tier[] | undefined,
  poolDetails: any,
}

const headers = ['Tier', 'Allocation (%)', 'Start Buy Time', 'End Buy Time'];

const MyTier: React.FC<MyTierProps> = ({ tiers, poolDetails }: MyTierProps) => {
  const styles = useStyles();
  const poolPickWeight = 27;
  // const poolPickWeight = 860;
  const isPickeWeight = poolDetails.id == poolPickWeight;
  console.log('poolDetails -- poolDetails===>', poolDetails);

  return (
    <div className={styles.MyTier}>
      {/* <p className={styles.MyTierAccountRedirect}> */}
      {/*   To upgrade your tier, please click <Link to="/account" style={{ color: '#6399FF', textDecoration: 'underline' }}>here</Link> ! */}
      {/* </p> */}
      <p className={styles.MyTierRulesHeader}>
        At current tier, you will be able to purchase with the following rules:
      </p>
        <TableContainer component={Paper} className={styles.tableContainer}>
          <Table className={styles.table} aria-label="simple table">
            <TableHead className={styles.tableHeaderWrapper}>
              <TableRow>
              {
                headers.map(header => (
                  <TableCell key={header} className={styles.tableHeader}>
                    <span>
                      {header}
                    </span>
                  </TableCell>
                ))
              }
              </TableRow>
            </TableHead>
            <TableBody>
              {!isPickeWeight &&
                <>
                  {tiers && tiers.length> 0 && tiers.map((row: any, index) => (
                    <TableRow key={index}>
                      <TableCell component="th" scope="row">
                        {row.name}
                      </TableCell>
                      <TableCell component="th" scope="row">
                        {row.allocation}
                      </TableCell>
                      <TableCell component="th" scope="row">
                        {!row.startTime && '--'}
                        {row.startTime &&convertTimeToStringFormat(new Date(row.startTime * 1000))}
                      </TableCell>
                      <TableCell component="th" scope="row">
                        {!row.endTime && '--'}
                        {row.endTime && convertTimeToStringFormat(new Date(row.endTime * 1000))}
                      </TableCell>
                    </TableRow>
                  ))}
                </>
              }

              {isPickeWeight &&
                tiers && tiers.length > 0 && (
                  <TierTableWithWeightRate
                    tiers={tiers}
                  />
                )
              }

            </TableBody>
            </Table>
        </TableContainer>
    </div>
  )
}

export default withWidth()(MyTier);
