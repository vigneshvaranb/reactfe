import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import { FormattedMessage } from 'react-intl';
import styles from './withStyles';

const PageHeader = props => {
  const { classes, style, header, children, variant = 'h4' } = props;
  return (
    <Typography className={classes.pageHeader} style={style} variant={variant}>
      {header && <FormattedMessage {...props.header} />}
      {children}
    </Typography>
  );
};

PageHeader.propTypes = {
  variant: PropTypes.oneOf(['h4', 'h6']),
  header: PropTypes.shape({
    id: PropTypes.string.isRequired,
    defaultMessage: PropTypes.string.isRequired,
  }),
};
export default withStyles(styles)(PageHeader);
