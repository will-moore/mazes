
export class BinaryTree {

  on(grid) {
    grid.cells().forEach((cell) => {
      let neighbours = [cell.north, cell.east].filter(Boolean);
      let neighbour = neighbours[Math.floor(Math.random() * neighbours.length)];
      if (neighbour) {
        cell.link(neighbour);
      }
    });
  }
}
