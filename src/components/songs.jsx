import React, { Component } from "react";
import { getSongs } from "../services/fakeSongService";
import Like from "./common/like";
import Pagination from "./common/pagination";
import { paginate } from "../utils/paginate";

class Songs extends Component {
  state = {
    songs: getSongs(),
    pageSize: 4,
    currentPage: 1,
  };

  handleDelete = (song) => {
    const songs = this.state.songs.filter((s) => s._id !== song._id);
    this.setState({ songs });
  };

  handleLike = (song) => {
    const songs = [...this.state.songs];
    const index = songs.indexOf(song);
    songs[index] = { ...songs[index] };
    songs[index].liked = !songs[index].liked;
    this.setState({ songs });
  };

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

  render() {
    const { length: songCount } = this.state.songs;
    const { pageSize, currentPage, songs: allSongs } = this.state;

    if (songCount === 0) return <h2>There are no songs in the database</h2>;

    const songs = paginate(allSongs, currentPage, pageSize);

    return (
      <React.Fragment>
        <p className="mb-1 pb-1 pt-1 mx-auto">
          There are {songCount} songs in the database.
        </p>
        <table className="table table-dark">
          <thead>
            <tr>
              <th>Song Title</th>
              <th>Artist</th>
              <th>Album</th>
              <th>Genre</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {songs.map((song) => (
              <tr key={song._id}>
                <td>{song.title}</td>
                <td>{song.artist}</td>
                <td>{song.album}</td>
                <td>{song.genre}</td>
                <td>
                  <Like
                    key={song._id}
                    onLike={() => this.handleLike(song)}
                    liked={song.liked}
                  />
                </td>
                <td>
                  <button
                    onClick={() => {
                      this.handleDelete(song);
                    }}
                    className="btn btn-danger btn-sm"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <Pagination
          onPageChange={this.handlePageChange}
          pageSize={pageSize}
          itemsCount={songCount}
          currentPage={currentPage}
        />
      </React.Fragment>
    );
  }
}

export default Songs;
