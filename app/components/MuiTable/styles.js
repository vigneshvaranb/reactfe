export default theme => ({
  root: {
    width: '100%',
  },
  table: {
    tableLayout: 'fixed',
  },
  tableCell: {
    paddingTop: 0,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  backButton: {
    marginRight: theme.spacing.unit,
    color: theme.palette.shop.btnTxtColor,
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.shop.btnBgColor,
  },
  emptyRows: {
    justifyContent: 'space-around',
    display: 'flex',
    padding: '5rem',
    fontWeight: 500,
  },
});
