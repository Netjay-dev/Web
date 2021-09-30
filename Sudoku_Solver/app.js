'use strict'

const tiles = document.querySelectorAll('.tile');
let lastTile = null; //container for last tile

for(let row = 0, counter = 0; row < 9; ++row){
    let col = 0;
    for( ; col < 9; ++col, ++counter){
        tiles[counter].classList.add(row,col);
    }
}

//function when user clicked outside the tile
const tilesClickedOut = function(e){
    let cls = e.target; // to store the clicked element 

    //conditions not met, user clicked outside, detect through class Names
    if(cls.classList.length > 0 && cls.classList[0] != 'tile'){
        if(lastTile) game.resetLastTile(); //reset style and lastTile
    }
}

//functions when tiles clicked
const tilesClicked = function(){

    //reseting the previous element style to normal
    if (lastTile) game.resetLastTile();

    //changing the style of the current one
    this.style.backgroundColor = 'rgb(235, 235, 235)';

    //store the last value
    lastTile = this;

}

//When Arrow keys clicked
const arrowKeysClicked = (keyCode) => {

    if(!lastTile) return;

    //the current index of last tile coverted into just single value
    const index = game.extractTileClass(lastTile.classList);

    //the code executes the coresponding keycode on arrowKeys Object    
    (arrowKeysMove[keyCode])(index); 
}


//TODO : 
//if move up row must not <= 8
//if move down row must no > 71
//if move left then index in index mod 9 === 0 then invalid
//if move right then index in [8,17,26,35,44,53,63,71,80]
const arrowKeysMove = {

    //arrow key 38 is up
    38: index =>{
        index-=9; // decreamenting the index to match
        if(index<0) return;
        game.applyStyle(tiles[index]);
    },

    //arrow key 40 is down
    40: index => {
        index+=9;
        if(index>80) return;
        game.applyStyle(tiles[index]);
    },

    //arrow key 37 is left
    37: index => {
        if(index<=0) return;
        index--;
        game.applyStyle(tiles[index]);
    },
    
    39: index => {
        if(index>=80) return;
        index++;
        game.applyStyle(tiles[index]);
    }
}

class Sudoku{

    //methods for filling the .tiles class with array ans
    fillTiles(ans = null){
        if(!ans) return; //Exit emidaitely when ans is null

        for(let row = 0; row < 9; ++row){
            for(let col = 0; col < 9; ++col){
                tiles[(row*9)+col].innerText = ans[row][col];
            }
        }
    }

    //methods for collecting inputs of .tile class
    collectInput(){
        const arr = new Array(9);
        
        for(let row = 0; row < 9; ++row){
            arr[row] = new Array(9);
            for(let col = 0; col < 9; ++col){
                arr[row][col] = Number(tiles[row*9+col].innerText) || -1;
            }
        }

        return arr;
    }

    //Implementations of the solution to solve sudoku
    solveSudoku(){

        const arr = game.collectInput();

        // if(!isSolvable(arr)){
        //     alert('Not solvable');
        //     return;
        // }

        if(solve(arr)){
            game.fillTiles(arr);
        }

    }

    //Clear all the input text of tiles
    clear(){
        tiles.forEach(tile =>{
            tile.innerText = '';
        });
    }


    applyStyle(tile){
        tile.style.backgroundColor = 'rgb(235, 235, 235)';
        game.resetLastTile();
        lastTile = tile;
    }

    //reset the lastTile styling
    resetLastTile(){
        lastTile.style.backgroundColor = 'white';
        lastTile = null;
    }

    //methods to extracts tile class to objects
    extractTileClass(tile){
        if(tile.length <= 1 || tile[0] !== 'tile') return; 

        let [ ,row, col] = [...tile];

        return (parseInt(row) * 9) + (col ? parseInt(col) : parseInt(row));
    }
}

//detect keypress from 1-9 
window.addEventListener('keypress', (key) => {
    if(!lastTile) return;

    if(key.key >= 1 && key.key <= 9){
        lastTile.innerText = key.key;
    }
})

//event listener to listen keypressed on backspace
//TODO: clear the input if clicked backspace
//Also implementations of arrow keys clicked
window.addEventListener('keydown', (event) => {
    let key = event.keyCode || event.charCode;

    if(key === 8){
        lastTile.innerText = '';
        return;
    }else if(key >= 37 && key <= 40){
        //Arrow keys clicked
        arrowKeysClicked(key);
    }
})


//to add Eventlistener to every tile class when user clicked it
tiles.forEach(tile => {
    tile.addEventListener('click', tilesClicked);
})

//event listener when clicked outside the sudoku container
window.addEventListener('click',tilesClickedOut);

const game = new Sudoku();

document.querySelector('#btn-solve').addEventListener('click',game.solveSudoku);
document.querySelector('#btn-clear').addEventListener('click',game.clear);

import {solve, isSolvable} from './solution.js';

