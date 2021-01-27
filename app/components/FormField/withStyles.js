const styles = theme => ({
  root: {
    flexGrow: 1,
    paddingBottom: theme.spacing(2),
    alignItems: 'stretch',
  },
  paper: {
    boxShadow: 'none',
  },
  labelAbove: theme.styles.shop.labelAbove,
  leftPanel: {
    marginTop: theme.spacing(2),
    backgroundColor: theme.palette.shop.gray[8],
  },
  rightPanel: {
    marginTop: theme.spacing(2),
  },
  flexGroup: { flexGrow: '1', display: 'flex', flexWrap: 'wrap' },
  sectionMargin: {
    paddingRight: '2rem',
  },
  textField: {
    width: '40%',
    margin: '1rem 1rem 0 0',
    fontSize: theme.sizing.shop.formLabelSize,
  },
  formContent: {
    flexGrow: '1',
    display: 'flex',
    flexDirection: 'column',
  },
  field: {
    width: '50%',
    paddingTop: '1em',
  },
  justify: {
    marginRight: '50%',
  },
  fullWidth: {
    width: '100%',
  },
  halfWidth: {
    width: '50%',
  },
  halfWide: {
    width: '50%',
  },
  inputLabel: {
    fontSize: theme.sizing.shop.formLabelSize,
  },
  formControlHidden: {
    display: 'none',
  },
  formLabel: {
    fontSize: 'smaller',
    width: '100%',
  },
  confirmation: {
    marginTop: theme.spacing(1),
  },
  readOnly: {
    backgroundColor: theme.palette.shop.readOnly,
  },
});

export default styles;
