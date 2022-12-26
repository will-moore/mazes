import { Distances } from "./distances";

class Cell {
  _links = new Set();
  // neighbours
  north;
  east;
  south;
  west;

  constructor(row, column) {
    this.row = row;
    this.column = column;
  }

  link(cell, bidirection = true) {
    this._links.add(cell);
    if (bidirection) {
      cell.link(this, false);
    }
  }

  unlink(cell, bidirection = true) {
    this._links.delete(cell);
    if (bidirection) {
      cell.unlink(this, false);
    }
  }

  links() {
    return Array.from(this._links);
  }

  linked(cell) {
    return this._links.has(cell);
  }

  linked_north() {
    return this.linked(this.north);
  }

  linked_east() {
    return this.linked(this.east);
  }

  linked_south() {
    return this.linked(this.south);
  }

  linked_west() {
    return this.linked(this.west);
  }

  neighbours() {
    const n = [this.north, this.east, this.south, this.west].filter(Boolean);
    return n;
  }

  distances() {
    const dists = new Distances(this);
    let frontier = [this];

    while (frontier.length > 0) {
      const new_frontier = [];
      frontier.forEach((cell) => {
        cell.links().forEach((linked) => {
          let value = dists.get_dist(cell);
          // if not visited yet...
          if (!dists.has_cell(linked)) {
            dists.add_cell(linked, value + 1);
            new_frontier.push(linked);
          }
        });
      });
      frontier = new_frontier;

    }
    return dists;
  }

  toString() {
    return `cell:${this.row},${this.column}`;
  }
}

export class Grid {
  rows = 0;
  columns = 0;
  grid = [];

  constructor(rows, columns) {
    this.rows = rows;
    this.columns = columns;

    this.prepare_grid();
    this.configure_cells();
  }

  prepare_grid() {
    for (let r = 0; r < this.rows; r++) {
      let row = [];
      for (let c = 0; c < this.columns; c++) {
        row.push(new Cell(r, c));
      }
      this.grid.push(row);
    }
  }

  configure_cells() {
    this.cells().forEach((cell) => {
      let row = cell.row;
      let column = cell.column;

      cell.north = this.grid[row - 1]?.[column];
      cell.south = this.grid[row + 1]?.[column];
      cell.east = this.grid[row][column + 1];
      cell.west = this.grid[row][column - 1];
    });
  }

  each_row(func) {
    this.grid.forEach(func);
  }

  cells() {
    return this.grid.flatMap((row) => row);
  }

  get_cell(row, column) {
    return this.grid[row]?.[column];
  }

  random_cell() {
    let r = [Math.floor(Math.random() * this.rows)];
    let c = [Math.floor(Math.random() * this.columns)];
    return this.get_cell(r, c);
  }

  contents_of(cell) {
    return "";
  }

  to_html() {
    let html = this.grid
      .map((row) => {
        let rowHtml = row.map((cell) => {
          let north = cell.linked_north() ? "0" : "1px";
          let east = cell.linked_east() ? "0" : "1px";
          let south = cell.linked_south() ? "0" : "1px";
          let west = cell.linked_west() ? "0" : "1px";
          let bg = `rgb(0,125,${this.contents_of(cell) * 256})`
          return `<td style="background:${bg}; border-top-width:${north}; border-left-width:${west}; border-right-width:${east}; border-bottom-width:${south}">
                    
                </td>`;
        });
        return `<tr>${rowHtml.join("")}</tr>`;
      })
      .join("\n");
    return `<table><tbody>${html}</tbody></table>`;
  }
}

export class DistanceGrid extends Grid {
  // set externally
  distances = undefined;

  calculateDistances(row, column) {
    let start = this.grid[row][column];
    this.distances = start.distances();
  }

  contents_of(cell) {
    if (this.distances && this.distances.has_cell(cell)) {
      let maxValue = this.distances.get_max_value();
      return (this.distances.get_value(cell) / maxValue);
    }
  }
}
