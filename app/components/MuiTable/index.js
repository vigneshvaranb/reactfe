/* eslint-disable react/prop-types */
import React, { useState, useEffect, memo } from 'react';
import { injectIntl } from 'react-intl';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TablePagination,
  TableRow,
  Checkbox,
} from '@material-ui/core';

import { withStyles } from '@material-ui/core/styles';
import { debounce } from 'lodash';
import LoadingIndicator from '../LoadingIndicator';
import withResize from '../withResize';
import {
  Wrapper,
  searchTableData,
  sortTableData,
  addElements,
  isEqual,
} from '../Utilities';
import TableHeader from './TableHeader';
import TableToolbar from './TableToolbar';
import styles from './styles';

const MuiTable = ({
  classes,
  rows,
  headCells,
  searchables,
  refreshData,
  loading,
  callbacks,
  controlComponets = {},
  exportFileName,
  exportables,
  select = [],
  onSelect = () => {},
  windowWidth,
  width,
}) => {
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('');
  const [selected, setSelected] = useState(select);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [search, setSearch] = useState('');
  const [rowsData, setRowsData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const fetchData = debounce(refreshData, 100);

  const handleSelectAllClick = event => {
    if (event.target.checked) {
      const newSelecteds = rows
        .filter(r => !(r.disableCheckbox === true))
        .map(n => n.rowid);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const isSelected = name => selected.indexOf(name) !== -1;

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    setSelected(newSelected);
  };
  // const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);
  useEffect(() => {
    onSelect(selected);
  }, [selected]);

  useEffect(() => {
    fetchData();
    pagination();
  }, [search, order, orderBy, rowsPerPage, page]);

  useEffect(() => {
    pagination();
  }, [rows]);
  const pagination = () => {
    searchTableData({ filter: search }, rows, searchables)
      .then(results => {
        const orderby = order === 'desc' ? `${orderBy} desc` : orderBy;
        return sortTableData({ orderby }, results);
      })
      .then(results => addElements({ ...callbacks }, results))
      .then(results => {
        const value = results.slice(
          page * rowsPerPage,
          page * rowsPerPage + rowsPerPage,
        );
        setRowsData(results);
        setFilteredData(value);
      });
  };
  if (!Array.isArray(filteredData)) return <LoadingIndicator />;
  const emptyRows = filteredData.findIndex(x => x.rowid) === -1;
  const tableWidth =
    width && windowWidth > width
      ? `100%`
      : `${Number(((Number(width) - windowWidth) / windowWidth) * 100) + 100}%`;
  return (
    <Wrapper>
      <Paper>
        <TableToolbar
          searchValue={search}
          handleSearch={v => setSearch(v)}
          exportFileName={exportFileName}
          exportData={rowsData}
          exportables={exportables}
          fetchCSVData={fetchData}
          headCells={headCells}
        />
        <TableContainer>
          <Table className={classes.table} style={{ width: tableWidth }}>
            <TableHeader
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={
                (rows.filter(r => !(r.disableCheckbox === true)) || []).length
              }
              headCells={headCells}
            />
            <TableBody>
              {!emptyRows &&
                filteredData.map(row => {
                  const isItemSelected = isSelected(row.rowid);
                  return (
                    <TableRow
                      hover
                      tabIndex={-1}
                      role="checkbox"
                      selected={isItemSelected}
                    >
                      {headCells.map((x, i) => {
                        const cell = row[x.id];
                        if (i === 0) {
                          return (
                            <Wrapper>
                              <TableCell padding="checkbox">
                                <Checkbox
                                  disabled={row.disableCheckbox}
                                  checked={isItemSelected}
                                  onClick={event =>
                                    handleClick(event, row.rowid)
                                  }
                                />
                              </TableCell>
                              <TableCell className={classes.tableCell}>
                                {cell}
                              </TableCell>
                            </Wrapper>
                          );
                        }
                        if (x.type && controlComponets[x.id] && !emptyRows) {
                          const Component = controlComponets[x.id];
                          return (
                            <TableCell style={{ overflow: 'hidden' }}>
                              <Component column={x} row={row} />
                            </TableCell>
                          );
                        }
                        return (
                          <TableCell className={classes.tableCell}>
                            {cell}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })}
              {emptyRows && (
                <TableRow>
                  <TableCell colSpan={headCells.length + 1}>
                    <div className={classes.emptyRows}>No data</div>
                  </TableCell>
                </TableRow>
              )}
              {loading && <LoadingIndicator />}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10]}
          component="div"
          count={(rowsData || []).length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
    </Wrapper>
  );
};

export default memo(
  withStyles(styles)(injectIntl(withResize(MuiTable))),
  (x, y) => {
    const shouldRender = isEqual(x.rows, y.rows);
    return shouldRender;
  },
);
