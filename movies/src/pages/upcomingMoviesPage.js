import React, { useState } from "react";
import { getUpcomingMovies } from "../api/tmdb-api";
import PageTemplate from '../components/templateMovieListPage';
import { useQuery } from 'react-query';
import Spinner from '../components/spinner';
import AddToMustWatchIcon from '../components/cardIcons/addToMustWatch';
import SortDropdown from "../components/sortDropdown";
import { sortMovies } from "../util";

const UpcomingMoviesPage = () => {
  const [sortBy, setSortBy] = useState("");
  const { data, error, isLoading, isError } = useQuery('upcoming', getUpcomingMovies);

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
      title="Upcoming Movies"
      movies={sortedMovies}
      action={(movie) => <AddToMustWatchIcon movie={movie} />}
    />
    </>
  );
};

export default UpcomingMoviesPage;