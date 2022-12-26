import './style.css'

import {Grid} from "./grid";


class BinaryTree {

  on(grid) {
    grid.cells().forEach(cell => {
      let neighbours = [cell.north, cell.east].filter(Boolean);
      let neighbour = neighbours[Math.floor(Math.random() * neighbours.length)];
      if (neighbour) {
        cell.link(neighbour);
      }
    });
  }
}

let binaryTreeGrid = new Grid(15, 20);
let bt = new BinaryTree();
bt.on(binaryTreeGrid);


document.querySelector('#app').innerHTML = `
  <div>
    Binary Tree
    ${binaryTreeGrid.to_html()}
  </div>
`
