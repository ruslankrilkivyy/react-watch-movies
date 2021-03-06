import * as axios from 'axios';
import _ from 'lodash';

const instance = axios.create({
  baseURL: 'https://api.themoviedb.org/3/',
});

export const filmsAPI = {
  getPopularFilms(sortType, genreId, searchValue, page) {
    return instance
      .get(
        `${
          searchValue !== '' ? 'search' : 'discover'
        }/movie?api_key=74d41124b9d3bafd09d832463dd78216&sort_by=${sortType.type}.${
          sortType.order
        }&vote_count.gte=15&with_genres=${genreId}&query=${searchValue}&page=${page}&certification_country=US&language=en-US`,
      )
      .then(({ data }) => {
        return data;
      });
  },
  getGenresFilms(sortType) {
    return instance
      .get(`genre/movie/list?api_key=74d41124b9d3bafd09d832463dd78216`)
      .then(({ data }) => {
        return data;
      });
  },
  getCreditsFilms(id) {
    return instance
      .get(`movie/${id}/credits?api_key=74d41124b9d3bafd09d832463dd78216`)
      .then(({ data }) => {
        return data;
      });
  },
  getTrailer(id) {
    return instance
      .get(`movie/${id}/videos?api_key=74d41124b9d3bafd09d832463dd78216`)
      .then(({ data }) => {
        return data;
      });
  },
};
