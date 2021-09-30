'use strict';

let res = undefined;
const n = 9;    

function solve(arr){

    backtrack(arr)
    
    return res;
}

const backtrack = function(board){
    //find row and column who is -1
    let row = null, col=null;

    (_=>{
        for(let i = 0; i < n; ++i){
            for(let j = 0; j < n; ++j){
                if(board[i][j] === -1){
                    [row,col] = [i,j];
                    return;
                }
            }
        }
    })();

    if(!row && !col){
        res = board;
        return true;
    }

    //implementation to try from 1 to 9 using backtracking
    for(let i = 1; i <= n; ++i){
        if(isValid(row,col,i,board)){
            board[row][col] = i;
            if(backtrack(board) === true){
                return true;
            }
            board[row][col] = -1;
        }
    }


    return false;
}


//solution to validate the sudoku before solving
const isSolvable = (board) => {
    
    //first check every box of board 
    //todo: Convert box to access the board precisely using nested loop
    //formula: let box loop through 0 - 8 then nest a for loop that starts from 0 and end in 8
    
    //array for holding values of box consist of booleans
    //use the index to hash: boxIndex[n-1]
    let boxIndex = new Array(9); 

    const boxRowNum = 3;

    for(let box = 0; box < n; ++box){
        //console.log(Math.floor(box*3/9), (box*3)%9)
        //formula: 
        //let boxRowNum = 3, box * boxRowNum / sudokuRowNum
        //box * boxRowNum % sudokuRowNum

        //reset the boxIndex value
        boxIndex.forEach(item => item = false);

        const rowBegin = Math.floor(box*boxRowNum/n),
            colBegin = Math.floor(box*boxRowNum%n);

        for(let row = rowBegin; row < rowBegin+3; ++row){
            for(let col = colBegin; col < colBegin+3; ++col){
                //if the board is -1 the skip
                if(board[row][col] === -1) continue;

                //validation of boxIndex using board[row][col]-1 check if true : return false
                if(boxIndex[board[row][col]-1]) return false;

                //mark box as visited
                boxIndex[board[row][col]-1] = true;
        
            }
        } 
    }

    return true;
}

//validation for each inserted tile
const isValid = function(r,c,num,board){
    let rbegin = parseInt(Number(r)/3)*3, cbegin = parseInt(Number(c)/3)*3;
    
    for(let i = rbegin; i < rbegin+3; ++i){
        for(let j = cbegin; j < cbegin+3; ++j){
            if(i!=r && j!= c && board[i][j] === num) return false;
        }
    }

    for(let i = 0; i < n; i++){
        if((c!=i && board[r][i] === num) || (i!=r && board[i][c] === num)) return false;
    }

    return true;
};


//exports
export {solve, isSolvable};
