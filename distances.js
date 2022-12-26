
export class Distances{

  _cells = {}
  
  constructor(root) {
    this.root = root;
    this.add_cell(root, 0);
  }

  get_key(cell) {
    return `${cell.row},${cell.column}`
  }

  add_cell(cell, distance){
    let key = this.get_key(cell);
    if (!this._cells[key]) {
      this._cells[key] = distance;
    }
  }

  get_dist(cell){
    let key = this.get_key(cell);
    return this._cells[key];
  }

  has_cell(cell){
    return this._cells[this.get_key(cell)] !== undefined;
  }

  get_value(cell) {
    return this._cells[this.get_key(cell)];
  }

  get_max_value() {
    return Object.values(this._cells).reduce((prev, highest) => Math.max(prev, highest), 0);
  }
}
