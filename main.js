import './style.css'

import {Grid} from "./grid";
import {BinaryTree} from "./binary-tree";
import {Sidewinder} from "./sidewinder";


let binaryTreeGrid = new Grid(15, 20);
let bt = new BinaryTree();
bt.on(binaryTreeGrid);

let sidewinderGrid = new Grid(15, 20);
let sw = new Sidewinder();
sw.on(sidewinderGrid);


document.querySelector('#app').innerHTML = `
  <div>
    Sidewinder
    ${sidewinderGrid.to_html()}

    Binary Tree
    ${binaryTreeGrid.to_html()}
  </div>
`
