import React, { useState } from 'react';
import { useSelector, connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';

import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Card from '../Card/Card';
import search from '../../reducers/search';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    maxWidth: 1000,
    color: theme.palette.secondary.main,
  },
  gridItem: {
    display: 'flex',
    justifyContent: 'center',
    padding: theme.spacing(2),
    minWidth: '320px',
  },
  button: {
    margin: theme.spacing(1),
  },
  noResults: {
    height: '500px',
    paddingTop: theme.spacing(10),
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
}));

function CardList(props) {
  const classes = useStyles();
  const { data } = props;

  let mdWidth = 6;
  let lgWidth = 4;
  if (data.length === 1) {
    mdWidth = 12;
    lgWidth = 12;
  }
  if (data.length > 0) {
    return (
      <div className={classes.root}>
        <Grid container>
          {data.map((movie) => (
            <Grid item xs={12} md={mdWidth} lg={lgWidth} key={movie._id} className={classes.gridItem}>
              <Card
                title={movie.title}
                shortDescription={movie.plot}
                imgUrl={movie.poster}
                id={movie._id}
              />
            </Grid>
          ))}
        </Grid>
      </div>
    );
  }

  props.onLastPage(true);
  return (
    <div className={classes.root}>
      <div className={classes.noResults}>
        No more results
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  search: state.search,
});

const mapDispatchToProps = (dispatch) => ({
  onLastPage: (val) => dispatch({ type: 'LAST_PAGE', val }),
});

export default connect(mapStateToProps, mapDispatchToProps)(CardList);