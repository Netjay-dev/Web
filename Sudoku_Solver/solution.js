'use strict';
var res = undefined;

export default function solve(arr){

    backtrack(arr);
    
    return res;
}

const n = 9;    

const backtrack = function(board){
        //find row and column who is -1
        let row = null, col=null;


        //validation for each inserted tile
        const isValid = function(r,c,num){
            let rbegin = parseInt(Number(r)/3)*3, cbegin = parseInt(Number(c)/3)*3;
            
            for(let i = rbegin; i < rbegin+3; ++i){
                for(let j = cbegin; j < cbegin+3; ++j){
                    if(board[i][j] == num) return false;
                }
            }

            for(let i = 0; i < n; i++){
                if(board[r][i] == num || board[i][c] == num) return false;
            }

            return true;
        };

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
            if(isValid(row,col,i)){
                board[row][col] = i;
                if(backtrack(board) === true){
                    return true;
                }
                board[row][col] = -1;
            }
        }


        return false;
}
