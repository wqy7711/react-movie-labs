import React, { useState } from "react";
import { getNowPlayingMovies } from "../api/tmdb-api";
import PageTemplate from '../components/templateMovieListPage';
import { useQuery } from 'react-query';
import Spinner from '../components/spinner';
import AddToFavoritesIcon from '../components/cardIcons/addToFavorites';
import SortDropdown from "../components/sortDropdown";
import { sortMovies } from "../util";

const NowPlayingMoviesPage = () => {
  const [sortBy, setSortBy] = useState("");
  const { data, error, isLoading, isError } = useQuery("nowPlaying", getNowPlayingMovies);

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }

  const movies = data.results;
  const sortedMovies = sortMovies(data.results, sortBy);

  return (
    <>
    <SortDropdown sortBy={sortBy} setSortBy={setSortBy} />
    <PageTemplate
      title="Now Playing Movies"
      movies={sortedMovies}
      action={(movie) => <AddToFavoritesIcon movie={movie} />}
    />
    </>
  );
};

export default NowPlayingMoviesPage;
