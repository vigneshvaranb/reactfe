import React, { useState } from 'react';
import { IconButton, Toolbar, Input } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import CloseIcon from '@material-ui/icons/Close';
import ExportButton from '../ExportButton';
import { Wrapper, exportableData, keys, serializise } from '../Utilities';

export const styles = () => ({
  root: {
    width: '100%',
    justifyContent: 'flex-end',
  },
});
export default withStyles(styles)(
  ({
    classes,
    handleSearch,
    searchValue,
    exportables,
    exportData = [],
    fetchCSVData = () => {},
    exportFileName = 'ExportData',
    headCells,
    style,
  }) => {
    const [value, setValue] = useState(searchValue);

    const getExportData = (() => {
      const records = exportables
        ? exportableData(exportables, exportData)
        : exportData;
      return (records || []).map(rec => {
        const newRec = {};
        keys(serializise(rec)).forEach(key => {
          newRec[(headCells.find(x => x.id === key) || {}).label || key] =
            rec[key];
        });
        return newRec;
      });
    })();

    return (
      <Toolbar className={classes.root} style={style}>
        <Wrapper>
          <ExportButton
            filename={`${exportFileName}.csv`}
            data={getExportData}
            fetchCSVData={() => fetchCSVData()}
          />
        </Wrapper>
        <Wrapper>
          <Input
            placeholder="Search..."
            onChange={e => {
              if (e.target.value === '') {
                handleSearch(e.target.value);
              }
              setValue(e.target.value);
            }}
            value={value}
            onKeyUp={v => v.key === 'Enter' && handleSearch(value)}
            startAdornment={
              <IconButton onClick={() => handleSearch(value)}>
                <SearchIcon />
              </IconButton>
            }
          />
          <IconButton
            onClick={() => {
              setValue('');
              handleSearch('');
            }}
          >
            <CloseIcon />
          </IconButton>
        </Wrapper>
      </Toolbar>
    );
  },
);
