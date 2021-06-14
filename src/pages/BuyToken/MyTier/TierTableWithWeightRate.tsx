import React from 'react';
import TableCell from "@material-ui/core/TableCell";
import {convertTimeToStringFormat} from "../../../utils/convertDate";
import TableRow from "@material-ui/core/TableRow";
import BigNumber from 'bignumber.js';


const NormalRow = ({row}: any) => {
  return (
    <TableRow>
      <TableCell component="th" scope="row">
        {row?.name}
      </TableCell>
      <TableCell component="th" scope="row">
        {row?.allocation}
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
  );
};

const GroupRow = ({ hawk, eagle, phoenix }: any) => {
  const totalAllowcation = new BigNumber(hawk?.allocation || 0)
    .plus(eagle?.allocation || 0)
    .plus(phoenix?.allocation || 0)
    .toFixed(2);
  console.log('totalAllowcation: Hawk + Eagle + Phoenix = ', totalAllowcation);

  return (
    <>
      <TableRow>
        <TableCell component="th" scope="row">
          {hawk?.name}
        </TableCell>
        <TableCell component="th" scope="row" rowSpan={3} style={{
          borderRight: '1px solid rgba(255, 255, 255, 0.1)',
          borderLeft: '1px solid rgba(255, 255, 255, 0.1)',
        }}>
          {totalAllowcation}
        </TableCell>
        <TableCell component="th" scope="row">
          {!hawk.startTime && '--'}
          {hawk.startTime && convertTimeToStringFormat(new Date(hawk.startTime * 1000))}
        </TableCell>
        <TableCell component="th" scope="row">
          {!hawk.endTime && '--'}
          {hawk.endTime && convertTimeToStringFormat(new Date(hawk.endTime * 1000))}
        </TableCell>
      </TableRow>


      <TableRow>
        <TableCell component="th" scope="row">
          {eagle?.name}
        </TableCell>

        <TableCell component="th" scope="row">
          {!eagle.startTime && '--'}
          {eagle.startTime && convertTimeToStringFormat(new Date(eagle.startTime * 1000))}
        </TableCell>
        <TableCell component="th" scope="row">
          {!eagle.endTime && '--'}
          {eagle.endTime && convertTimeToStringFormat(new Date(eagle.endTime * 1000))}
        </TableCell>
      </TableRow>

      <TableRow>
        <TableCell component="th" scope="row">
          {phoenix?.name}
        </TableCell>

        <TableCell component="th" scope="row">
          {!phoenix.startTime && '--'}
          {phoenix.startTime && convertTimeToStringFormat(new Date(phoenix.startTime * 1000))}
        </TableCell>
        <TableCell component="th" scope="row">
          {!phoenix.endTime && '--'}
          {phoenix.endTime && convertTimeToStringFormat(new Date(phoenix.endTime * 1000))}
        </TableCell>
      </TableRow>

    </>
  );

};

function TierTableWithWeightRate(props: any) {
  const { tiers } = props;
  return (
    <>
      <NormalRow row={tiers[0]} />
      <NormalRow row={tiers[1]} />
      <GroupRow
        hawk={tiers[2]}
        eagle={tiers[3]}
        phoenix={tiers[4]}
      />
    </>
  );
}

export default TierTableWithWeightRate;
