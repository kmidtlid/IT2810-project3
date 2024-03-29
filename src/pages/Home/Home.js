import React from 'react';
import { ThemeProvider, makeStyles } from '@material-ui/styles';
import { connect } from 'react-redux';
import Box from '@material-ui/core/Box';
import PreviewCardList from '../../components/CardList/PreviewCardList';
import SearchField from '../../components/SearchField/SearchField';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 'auto',
    marginTop: theme.spacing(15),
    maxWidth: 1000,
    color: theme.palette.text.primary,
    paddingBottom: theme.spacing(10),
  },
  mainTitle: {
    margin: 0,
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
  searchBox: {
    marginBottom: theme.spacing(4),
    textAlign: 'center',
    margin: 'auto',
    padding: theme.spacing(2),
    marginTop: theme.spacing(10),
    maxWidth: 1000,
  },
  searchAndGenreContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    maxwidth: 1000,
  },
  contentBox: {
    maxwidth: 1000,
    marginTop: theme.spacing(6),
  },
  latestTitle: {
    margin: 0,
    padding: theme.spacing(2),
    paddingBottom: theme.spacing(0),
  },
}));

function Home(props, theme) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <ThemeProvider theme={theme}>
        <Box className={classes.searchAndGenreContainer}>
          <div className={classes.searchBox}>
            <h1 className={classes.mainTitle} id="HomepageTitle">
              Search for thousands of movies
            </h1>
            <SearchField />
          </div>
        </Box>
        <Box className={classes.contentBox}>
          <h1 className={classes.latestTitle} id={"subtitle"}>Latest releases</h1>
          <PreviewCardList />
        </Box>
      </ThemeProvider>
    </div>
  );
}

const mapDispatchToProps = (dispatch) => ({
  addSearch: (searchString) => dispatch({ type: 'NEW_SEARCH', searchString }),
  resetSearch: () => dispatch({ type: 'RESET_SEARCH' }),
});

export default connect(null, mapDispatchToProps)(Home);
