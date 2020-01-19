import React, { Component } from "react";

import Pagination from "./common/pagination";
import ListGroup from "./common/listGroup";
import MoviesTable from "./moviesTable";
import { getMovies } from "../services/fakeMovieService";
import { getGenres } from "../services/fakeGenreService";
import { paginate } from "../utils/paginate";
import _ from "lodash";

class Movies extends Component {
  state = {
    movies: [],
    genres: [],
    pageSize: 4,
    currPage: 1,
    sortColumn: { path: "title", order: "asc" }
  };

  componentDidMount() {
    const genres = [{ _id: "", name: "All Genres" }, ...getGenres()];

    this.setState({ movies: getMovies(), genres });
  }

  showHeader(count) {
    let l1 = <p>{`There are no movies in the database`}</p>;
    let l2 = <p>{`Showing ${count} movies in the database`}</p>;
    return count === 0 ? l1 : l2;
  }

  handleDelete = movie => {
    const movies = this.state.movies.filter(m => m._id !== movie._id);
    this.setState({ movies });
  };

  handleLike = movie => {
    const movies = [...this.state.movies];
    let idx = movies.indexOf(movie);
    movies[idx].liked = true;
    this.setState({ movies });
  };

  handlePageChange = page => {
    this.setState({ currPage: page });
  };

  handleGenreSelect = genre => {
    this.setState({ selectedGenre: genre, currPage: 1 });
  };

  handleSort = sortColumn => {
    this.setState({ sortColumn });
  };

  getPagedData = () => {
    const {
      sortColumn,
      pageSize,
      currPage,
      selectedGenre,
      movies: allMovies
    } = this.state;

    const filtered =
      selectedGenre && selectedGenre._id
        ? allMovies.filter(m => m.genre._id === selectedGenre._id)
        : allMovies;

    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

    const movies = paginate(sorted, currPage, pageSize);

    return { totalCount: filtered.length, data: movies };
  };

  render() {
    const { sortColumn, pageSize, currPage } = this.state;

    const { totalCount, data: movies } = this.getPagedData();

    return (
      <div className="row">
        <div className="col-2">
          <ListGroup
            items={this.state.genres}
            selectedItem={this.state.selectedGenre}
            onItemSelect={this.handleGenreSelect}
          />
        </div>
        <div className="col">
          {this.showHeader(totalCount)}
          <MoviesTable
            movies={movies}
            sortColumn={sortColumn}
            onDelete={this.handleDelete}
            onLike={this.handleLike}
            onSort={this.handleSort}
          />
          <Pagination
            itemsCount={totalCount}
            pageSize={pageSize}
            currPage={currPage}
            onPageChange={this.handlePageChange}
          />
        </div>
      </div>
    );
  }
}

export default Movies;
