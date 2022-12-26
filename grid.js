
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

    link(cell, bidirection=true) {
        this._links.add(cell);
        if (bidirection) {
            cell.link(this, false);
        }
    }

    unlink(cell, bidirection=true) {
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
        for (let r=0; r<this.rows; r++) {
            let row = [];
            for (let c=0; c<this.columns; c++) {
                row.push(new Cell(r, c));
            }
            this.grid.push(row);
        }
    }

    configure_cells() {
        this.cells().forEach(cell => {
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
        return this.grid.flatMap(row => row);
    }

    get_cell(row, column) {
        return this.grid[row]?.[column];
    }

    random_cell() {
        let r = [Math.floor(Math.random() * this.rows)];
        let c = [Math.floor(Math.random() * this.columns)];
        return this.get_cell(r, c);
    }

    to_html() {

        let html = this.grid.map(row => {
            let rowHtml = row.map(cell => {
                let north = cell.linked_north() ? "0" : "1px";
                let east = cell.linked_east() ? "0" : "1px";
                let south = cell.linked_south() ? "0" : "1px";
                let west = cell.linked_west() ? "0" : "1px";
                return `<td style="border-top-width:${north}; border-left-width:${west}; border-right-width:${east}; border-bottom-width:${south}">
                
                </td>`
            });
            return `<tr>${rowHtml.join("")}</tr>`;
        }).join("\n");
        return `<table><tbody>${html}</tbody></table>`;
    }
}