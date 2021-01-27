/* eslint-disable react/prop-types */
import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import {
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
  Checkbox,
} from '@material-ui/core';

const styles = theme => ({
  columnHeader: {
    color: theme.palette.primary.light,
  },
  columnRow: {
    width: '100%',
  },
});

export default withStyles(styles)(
  ({
    classes,
    headCells,
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
    style = {},
  }) => {
    const createSortHandler = property => event => {
      onRequestSort(event, property);
    };
    return (
      <TableHead>
        <TableRow className={classes.columnRow}>
          <TableCell colSpan="1" padding="checkbox">
            <Checkbox
              indeterminate={numSelected > 0 && numSelected < rowCount}
              checked={rowCount > 0 && numSelected === rowCount}
              onChange={onSelectAllClick}
            />
          </TableCell>
          {headCells.map(headCell => {
            const colwidth = headCell.width ? { width: headCell.width } : {};
            return (
              <TableCell
                colSpan="1"
                key={headCell.id}
                className={classes.columnHeader}
                style={{ ...colwidth, ...style }}
                padding={headCell.disablePadding ? 'none' : 'default'}
                sortDirection={orderBy === headCell.id ? order : false}
              >
                <TableSortLabel
                  direction={orderBy === headCell.id ? order : 'asc'}
                  onClick={createSortHandler(headCell.id)}
                >
                  {headCell.label}
                </TableSortLabel>
              </TableCell>
            );
          })}
        </TableRow>
      </TableHead>
    );
  },
);
