import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";


export default function TablePoints({ rows }) {
  return (
    <Paper>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Tipo</TableCell>
            <TableCell>Hora</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Object.keys(rows).map(k => (
            <TableRow key={rows[k]._id}>
              <TableCell>{rows[k][0]}</TableCell>
              <TableCell>{rows[k][1]}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
}