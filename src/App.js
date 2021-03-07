import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Route } from 'react-router-dom';

import { Home, Movies, MovieItem } from './pages';
import {
  setMovieId,
  setChosenItem,
  getGenres,
  getCredits,
  getMoviesBySearch,
  getTrailerById,
  getMovieDetails,
} from './redux/actions/movies';
import { filterByRate } from './redux/actions/filters';
import { getToken, getSessionId } from './redux/actions/auth';

function App() {
  const dispatch = useDispatch();
  const {
    items,
    movieDetails,
    credits,
    trailerById,
    searchValue,
    genres,
    chosenItem,
    movieId,
  } = useSelector(({ movies }) => movies);
  const rateNumber = useSelector(({ filters }) => filters.rateNumber);
  const { token } = useSelector(({ auth }) => auth);

  const onSetMovieId = (id) => {
    const item = items.results.filter((obj) => obj.id === id);
    dispatch(setChosenItem(item));
    dispatch(setMovieId(id));
  };

  React.useEffect(() => {
    dispatch(getMovieDetails(movieId));
  }, [dispatch, movieId]);

  React.useEffect(() => {
    dispatch(getSessionId(token));
  }, [dispatch, token]);

  React.useEffect(() => {
    dispatch(getTrailerById(movieId));
  }, [dispatch, movieId]);

  React.useEffect(() => {
    dispatch(getToken());
  }, [dispatch]);

  React.useEffect(() => {
    dispatch(getCredits(movieId));
  }, [movieId, dispatch]);

  React.useEffect(() => {
    dispatch(getGenres(chosenItem));
  }, [chosenItem, dispatch]);

  React.useEffect(() => {
    const localStorageRef = localStorage.getItem('chosenItem');
    const localStorageIdRef = localStorage.getItem('chosenItemId');
    const localStorageSearchInput = localStorage.getItem('searchInput');
    const localStorageRefRate = localStorage.getItem('rateNumber');
    if (localStorageRef && localStorageSearchInput) {
      dispatch(setChosenItem(JSON.parse(localStorageRef)));
      dispatch(setMovieId(JSON.parse(localStorageIdRef)));
      dispatch(getMoviesBySearch(JSON.parse(localStorageSearchInput)));
      dispatch(filterByRate(JSON.parse(localStorageRefRate)));
    }
  }, [dispatch]);

  React.useEffect(() => {
    localStorage.setItem('chosenItem', JSON.stringify(chosenItem));
    localStorage.setItem('chosenItemId', JSON.stringify(movieId));
    localStorage.setItem('searchInput', JSON.stringify(searchValue));
    localStorage.setItem('rateNumber', JSON.stringify(rateNumber));
  }, [chosenItem, rateNumber, searchValue, movieId]);

  return (
    <div className="App">
      <Route exact path="/" render={() => <Home token={token} />} />
      <Route
        exact
        path="/watchmovies"
        render={() => <Movies movieId={movieId} onSetMovieId={onSetMovieId} />}
      />
      <Route
        path={`/watchmovies/${movieId}`}
        render={() => (
          <MovieItem
            movieDetails={movieDetails}
            trailer={trailerById}
            credits={credits}
            genre={genres}
            {...chosenItem[0]}
          />
        )}
      />
    </div>
  );
}

export default App;
