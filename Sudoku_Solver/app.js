const tiles = document.querySelectorAll('.tile');
let lastTile = null; //container for last tile

tiles.forEach(tile => {
    tile.addEventListener('click', tilesClicked);
})

for(let row = 0, counter = 0; row < 9; ++row){
    let col = 0;
    for( ; col < 9; ++col, ++counter){
        tiles[counter].classList.add(row,col);
        console.log(tiles[counter].classList)
    }
}

function tilesClicked(){

    if (lastTile) lastTile.style.backgroundColor = 'white';

    this.style.backgroundColor = 'rgb(245, 245, 245)';

    lastTile = this;

    console.log(this.classList[1])
}

window.addEventListener('keypress',function(key){
    if(key.key >= 1 && key.key <= 9){
        lastTile.innerText = key.key;
    }
})

class Sudoku{

    fillTiles(){
        const ans = [[9,7,6,5,1,3,2,4,8],
            [1,5,8,6,4,2,7,9,3],
            [2,3,4,7,9,8,5,1,6],
            [7,6,1,8,3,5,9,2,4],
            [8,2,3,4,7,9,1,6,5],
            [5,4,9,1,2,6,8,3,4],
            [6,9,7,3,5,1,4,8,2],
            [3,1,5,2,8,4,6,7,9],
            [4,8,2,9,6,7,3,5,1]];

        for(let row = 0; row < 9; ++row){
            for(let col = 0; col < 9; ++col){
                tiles[(row*9)+col].innerText = ans[row][col];
            }
        }
    }

}

const game = new Sudoku();