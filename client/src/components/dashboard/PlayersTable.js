import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
    maxWidth: 200,
  },
});

export default function PlayersTable(props) {
  const classes = useStyles();
  const rows = [];
  Object.keys(props.data).forEach(function (key) {
    rows.push(props.data[key]);
  });
  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label='simple table'>
        <TableHead>
          <TableRow>
            <TableCell align='right'>Number</TableCell>
            <TableCell align='right'>game_key</TableCell>
            <TableCell align='right'>Group</TableCell>
            <TableCell align='right'>Score</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.userNumber}>
              <TableCell align='right'>{row.userNumber}</TableCell>
              <TableCell align='right'>{row.game_key}</TableCell>
              <TableCell align='right'>{row.group_num}</TableCell>
              <TableCell align='right'>{row.curr_score}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
