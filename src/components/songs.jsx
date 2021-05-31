import React, { Component } from "react";
import { getSongs } from "../services/fakeSongService";

class Songs extends Component {
  state = {
    songs: getSongs(),
  };

  handleDelete = (song) => {
    const songs = this.state.songs.filter((s) => s._id !== song._id);
    this.setState({ songs });
  };

  render() {
    const { length: songCount } = this.state.songs;
    if (songCount === 0) return <h2>There are no songs in the database</h2>;
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
            </tr>
          </thead>
          <tbody>
            {this.state.songs.map((song) => (
              <tr key={song._id}>
                <td>{song.title}</td>
                <td>{song.artist}</td>
                <td>{song.album}</td>
                <td>{song.genre}</td>
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
      </React.Fragment>
    );
  }
}

export default Songs;
