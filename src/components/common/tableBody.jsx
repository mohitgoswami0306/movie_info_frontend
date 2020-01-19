import React, { Component } from "react";
import _ from "lodash";

class TableBody extends Component {
  renderCell = (movie, column) => {
    if (column.content) return column.content(movie);

    return _.get(movie, column.path);
  };

  createKey = (movie, column) => {
    return movie._id + (column.path || column.key);
  };

  render() {
    const { data, columns } = this.props;

    return (
      <tbody>
        {data.map(movie => (
          <tr key={movie._id}>
            {columns.map(column => (
              <td key={this.createKey(movie, column)}>
                {this.renderCell(movie, column)}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    );
  }
}

export default TableBody;
