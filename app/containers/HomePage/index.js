import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import { injectIntl } from 'react-intl';
import PropTypes from 'prop-types';
import MuiTable from '../../components/MuiTable';
import { Wrapper, isEmpty } from '../../components/Utilities';
import { FlexRowContainer } from '../../components/FormField';
import PageHeader from '../../components/PageHeader';
import LoadingIndicator from '../../components/LoadingIndicator';
import styles from './styles';
import withResize from '../../components/withResize';
import { API_BASE_URL, ACCESS_TOKEN_NAME } from '../../constants/apiConstants';
import axios from 'axios';

// const data = [
//   { id: 0, title: 'Example' },
//   { id: 1, title: 'Demo' },
//   { id: 2, title: 'test' },
//   { id: 3, title: 'test1' },
// ];
const HomePage = props => {
  const [rows, setRows] = useState();
  const [refresh, setRefresh] = useState();
  useEffect(() => {
    loadData();
  }, []);

  const columns = [
    { name: 'product_id', title: 'ID' },
    { name: 'name', title: 'Product Name' },
    { name: 'brand', title: 'Brand' },
    { name: 'colors', title: 'Color' },
    { name: 'dimension', title: 'Product Dimension' },
    { name: 'weight', title: 'Weight' },
    { name: 'reviews_rating', title: 'Ratings' },
  ].map(x => ({ ...x, id: x.name, label: x.title }));

  const searchables = ['product_id', 'name', 'brand', 'colors', 'reviews_rating'];
  const exportables = ['product_id', 'name', 'brand', 'colors', 'dimension', 'weight', 'reviews_rating'];
  let data = [];
  const loadData = () => {
    axios
    .get(`${API_BASE_URL}/products`)
    .then(response => {
      console.log(response);
      if (response.status === 200) {
        data = response.data;
        console.log(data);
        // setState(prevState => ({
        //   ...prevState,
        //   successMessage:
        //     'Registration successful. Redirecting to home page..',
        // }));
        setRows(
          data.map(item => ({
            ...item,
            rowid: item.product_id,
          })),
        );
        localStorage.setItem(ACCESS_TOKEN_NAME, response.data.token);
        // redirectToHome();
        // props.showError(null);
      } else {
        props.showError('Some error ocurred');
      }
    })
    .catch(error => {
      console.log(error);
    });
  };

  if (isEmpty(rows)) return <LoadingIndicator />;
  const { classes, history } = props;
  const backButton = (
    <Button
      className={classes.openButton}
      onClick={() =>
        history.push({
          pathname: '/login',
          state: {},
          props,
        })
      }
    >
      Back
    </Button>
  );

  const addProductButton = (
    <Button
      className={classes.openButton}
      onClick={() =>
        history.push({
          pathname: '/addproduct',
          state: {},
        })
      }
    >
      Add Product
    </Button>
  );

  return (
    <Wrapper>
      <Helmet title="Users" />
      <FlexRowContainer>
        <PageHeader header={{
    id: `shop.components.HomePage.header`,
    defaultMessage: 'Product List',
  }} />
      </FlexRowContainer>
      <FlexRowContainer>{addProductButton}</FlexRowContainer>
      <Paper>
        <MuiTable
          searchables={searchables}
          exportables={exportables}
          headCells={columns}
          rows={rows}
          refreshData={() => setRefresh()}
          exportFileName="UserList"
        />
        <FlexRowContainer>{backButton}</FlexRowContainer>
      </Paper>
    </Wrapper>
  );
};
HomePage.propTypes = {
  history: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(injectIntl(withResize(withRouter(HomePage))));
