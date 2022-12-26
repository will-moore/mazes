import './style.css'

import {Grid, DistanceGrid} from "./grid";
import {BinaryTree} from "./binary-tree";
import {Sidewinder} from "./sidewinder";


let binaryTreeGrid = new DistanceGrid(15, 20);
let bt = new BinaryTree();
bt.on(binaryTreeGrid);
binaryTreeGrid.calculateDistances(0, 0);

let sidewinderGrid = new DistanceGrid(15, 20);
let sw = new Sidewinder();
sw.on(sidewinderGrid);
sidewinderGrid.calculateDistances(0, 0);


document.querySelector('#app').innerHTML = `
  <div>
    Sidewinder
    ${sidewinderGrid.to_html()}

    Binary Tree
    ${binaryTreeGrid.to_html()}
  </div>
`
