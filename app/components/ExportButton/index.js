import React from 'react';
import { injectIntl } from 'react-intl';
import Tooltip from '@material-ui/core/Tooltip';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import { withStyles } from '@material-ui/core/styles';
import isEmpty from 'lodash/isEmpty';
import { CSVLink } from 'react-csv';
import styles from './styles';

import messages from './messages';

const ExportButton = withStyles(styles)(
  ({ data, fetchCSVData, filename, intl, classes }) => {
    if (isEmpty(data)) {
      fetchCSVData();
      return null;
    }
    return (
      <React.Fragment>
        <Tooltip title={intl.formatMessage(messages.export)}>
          <CSVLink
            className="csv-download"
            style={{ textDecoration: 'none' }}
            target="_self"
            filename={filename}
            data={data}
          >
            <Button
              variant="outlined"
              size="small"
              color="primary"
              className={classes.button}
            >
              Export
              <Icon
                color="primary"
                className={classes.rightIcon}
                style={{ fontSize: 18 }}
              >
                save_alt
              </Icon>
            </Button>
          </CSVLink>
        </Tooltip>
      </React.Fragment>
    );
  },
);
export default withStyles(styles)(injectIntl(ExportButton));
