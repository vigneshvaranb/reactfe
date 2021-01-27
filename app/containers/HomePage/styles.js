const styles = theme => ({
  root: {
    marginBottom: theme.spacing(2),
  },
  button: {
    marginRight: theme.spacing.unit,
    marginTop: 0,
    float: 'right',
  },
  subHead: {
    fontWeight: '500',
    color: '#054087',
  },
  paperWidthLg: {
    minWidth: theme.spacing(60),
  },
  openButton: {
    marginRight: theme.spacing.unit,
    color: 'white',
    margin: theme.spacing.unit,
    backgroundColor: '#41addd',
  },
  buttonApp: {
    marginRight: theme.spacing.unit,
    color: 'white',
    marginTop: '2rem',
    whiteSpace: 'nowrap',
    backgroundColor: '#41addd',
  },
  buttonBg: {
    padding: '0 8rem',
  },
  marginBt2U: {
    marginBottom: theme.spacing(2),
  },
});

export default styles;
