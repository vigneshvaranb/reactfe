import React, { Component } from 'react';
import PropTypes from 'prop-types';
import MaskedInput from 'react-text-mask';
import DebounceInput from 'react-debounce-input';

import { withStyles } from '@material-ui/core/styles';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import { FormattedMessage, defineMessages } from 'react-intl';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';

import { uniqueId, extend, isNumber } from 'lodash';
import classnames from 'classnames';
import styles from './withStyles';
import { scrubPhoneMask, notEmpty } from '../Utilities';

const messages = defineMessages({
  missingLabel: {
    id: 'shop.field.missingLabel',
    defaultMessage: 'Missing Label',
  },
});

export const labelAbove = {
  style: {
    transform: 'translate(0, 1.5px) scale(0.75)',
    transformOrigin: 'top left',
    fontSize: 'inherit',
  },
};

function PhoneMask(props) {
  const { inputRef, ...other } = props;
  return (
    <MaskedInput
      {...other}
      ref={inputRef}
      mask={[
        '(',
        /[1-9]/,
        /\d/,
        /\d/,
        ')',
        ' ',
        /\d/,
        /\d/,
        /\d/,
        '-',
        /\d/,
        /\d/,
        /\d/,
        /\d/,
      ]}
      placeholderChar={'\u2000'}
      guide={scrubPhoneMask(props.value).length > 0}
      showMask
    />
  );
}
PhoneMask.propTypes = {
  inputRef: PropTypes.func.isRequired,
  value: PropTypes.string,
};

function DebouncedInput(props) {
  const { inputRef, ...other } = props;
  return (
    <DebounceInput
      {...other}
      ref={inputRef}
      minLength={2}
      debounceTimeout={500}
    />
  );
}
DebouncedInput.propTypes = {
  inputRef: PropTypes.func.isRequired,
};

export class FormField extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showPassword: false,
    };
  }

  handleClickShowPassword = () => {
    this.setState(state => ({ showPassword: !state.showPassword }));
  };

  passwordAdornment = () => (
    <InputAdornment position="end">
      <IconButton
        aria-label="Toggle password visibility"
        onClick={this.handleClickShowPassword}
      >
        {this.state.showPassword ? <VisibilityOff /> : <Visibility />}
      </IconButton>
    </InputAdornment>
  );

  amountAdornment = () => <InputAdornment position="start">$</InputAdornment>;

  render() {
    const {
      label,
      classes,
      value,
      onChange,
      onBlur,
      type,
      name,
      errors,
      margin,
      extErrors,
      justify,
      fullWidth,
      halfWidth,
      filled,
      halfWide,
      multiline,
      showAdornments,
      dollarAdornments,
      touched,
      usePhoneMask,
      placeholder,
      isSelect,
      options,
      readOnly,
      debounce,
    } = this.props;
    let placeholderVal = placeholder;

    const fieldid = uniqueId();
    const labelProps = () => {
      if (
        type === 'date' ||
        usePhoneMask ||
        isSelect ||
        notEmpty(value) ||
        isNumber(value)
      ) {
        return { className: classes.labelAbove };
      }
      return {
        className: classnames(
          classes.inputLabel,
          notEmpty(value) ? classes.labelAbove : null,
        ),
      };
    };

    const inputProps = {};
    if (readOnly) inputProps.readOnly = true;
    if (showAdornments && type === 'password') {
      inputProps.endAdornment = this.passwordAdornment();
    }
    if (usePhoneMask) {
      inputProps.inputComponent = PhoneMask;
      placeholderVal = '(___) ___-____';
    }
    if (dollarAdornments) {
      inputProps.startAdornment = this.amountAdornment();
    }
    if (debounce) {
      inputProps.inputComponent = DebouncedInput;
    }
    return (
      <div
        className={classnames(
          type === 'hidden' ? classes.formControlHidden : classes.field,
          justify ? classes.justify : null,
          halfWidth ? classes.halfWidth : null,
          fullWidth ? classes.fullWidth : null,
          halfWide ? classes.halfWide : null,
        )}
      >
        <TextField
          id={`field-${fieldid}-${label.id.split('.').pop(-1)}`}
          label={<FormattedMessage {...label} />}
          name={name}
          onChange={onChange}
          fullWidth={fullWidth || halfWidth}
          value={value}
          style={{ width: fullWidth ? '95%' : '90%' }}
          onBlur={onBlur}
          data-marker={this.props['data-marker']}
          className={readOnly ? classes.readOnly : null}
          variant={filled ? 'filled' : 'standard'}
          multiline={multiline}
          placeholder={placeholderVal}
          InputLabelProps={labelProps()}
          rows={5}
          margin={margin}
          type={this.state.showPassword ? 'text' : type}
          InputProps={inputProps}
          select={isSelect}
        >
          {options.map(option => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
        <Typography data-marker={`validationerrorfor-${name}`} color="error">
          {errors[name] && touched[name] && errors[name]}
          {extErrors && touched[name] && extErrors[name]}
        </Typography>
      </div>
    );
  }
}

FormField.propTypes = {
  label: PropTypes.object,
  classes: PropTypes.object.isRequired,
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func,
  type: PropTypes.string,
  margin: PropTypes.string,
  name: PropTypes.string.isRequired,
  errors: PropTypes.object,
  extErrors: PropTypes.object,
  touched: PropTypes.object,
  justify: PropTypes.bool,
  fullWidth: PropTypes.bool,
  halfWidth: PropTypes.bool,
  halfWide: PropTypes.bool,
  filled: PropTypes.bool,
  multiline: PropTypes.bool,
  labelProps: PropTypes.object,
  endAdornment: PropTypes.node,
  startAdornment: PropTypes.node,
  showAdornments: PropTypes.bool,
  dollarAdornments: PropTypes.bool,
  usePhoneMask: PropTypes.bool,
  isSelect: PropTypes.bool,
  debounce: PropTypes.bool,
  placeholder: PropTypes.string,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string,
      label: PropTypes.string,
    }),
  ),
  'data-marker': PropTypes.string,
  readOnly: PropTypes.bool,
};
FormField.defaultProps = {
  label: messages.missingLabel,
  value: null,
  errors: {},
  extErrors: {},
  touched: {},
  onBlur: null,
  justify: false,
  fullWidth: false,
  halfWidth: false,
  halfWide: false,
  filled: false,
  margin: 'dense',
  multiline: false,
  type: 'text',
  endAdornment: null,
  startAdornment: null,
  showAdornments: false,
  dollarAdornments: false,
  usePhoneMask: false,
  isSelect: undefined,
  options: [],
  readOnly: undefined,
  placeholder: '',
  debounce: false,
  'data-marker': '',
};
export const getFieldAttrs = (name, labels, props, state) => ({
  name,
  label: labels[name],
  value: props.values[name],
  onChange: props.handleChange,
  errors: props.errors,
  extErrors: state.errors,
  touched: props.touched,
});
export const FlexRowContainer = ({
  wrap,
  center,
  style,
  children,
  className,
}) => (
  <div
    className={className}
    style={{
      display: 'flex',
      flexDirection: 'row',
      flexWrap: wrap ? 'wrap' : 'none',
      justifyContent: center ? 'center' : 'space-between',
      alignItems: 'center',
      ...style,
    }}
  >
    {children}
  </div>
);

FlexRowContainer.propTypes = {
  center: PropTypes.object,
  wrap: PropTypes.bool,
  style: PropTypes.object,
  children: PropTypes.object,
  className: PropTypes.object,
};
export const FlexColumnContainer = ({ wrap, center, style, children }) => (
  <div
    style={{
      display: 'flex',
      width: 'inherit',
      zIndex: 777,
      flexDirection: 'column',
      justifyContent: center ? 'center' : 'space-between',
      flexWrap: wrap ? 'wrap' : 'none',
      alignItems: 'left',
      ...style,
    }}
  >
    {children}
  </div>
);

FlexColumnContainer.propTypes = {
  center: PropTypes.object,
  wrap: PropTypes.bool,
  style: PropTypes.object,
  children: PropTypes.object,
};
export const combineStyles = localStyles => theme => {
  const userStyles = localStyles(theme);
  const formStyles = styles(theme);
  return extend(userStyles, formStyles);
};
export const getLabel = (msgs, id) =>
  msgs && msgs[id] ? <FormattedMessage {...msgs[id]} /> : `!${id}!`;
export const FormikCheckbox = withStyles(styles)(props => {
  const {
    classes,
    label,
    name,
    value,
    onChange,
    errors,
    touched,
    getValue,
    disabled,
  } = props;
  return (
    <div className={classes.confirmation}>
      <FormControlLabel
        disabled={disabled}
        className={classes.formLabel}
        control={
          <Checkbox
            value={value}
            checked={getValue()}
            name={name}
            onChange={onChange}
          />
        }
        label={label}
      />
      <Typography data-marker={`validationerrorfor-${name}`} color="error">
        {errors[name] && touched[name] && errors[name]}
      </Typography>
    </div>
  );
});

export default withStyles(styles)(FormField);
