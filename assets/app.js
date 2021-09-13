
// Guessing number game the game asks the user to enter a number from 1
//  to 6 then the computer generates random number from that range. if it match 
//  the user will recieve two points then display the current points
//  if the difference is 1 then the score is 1

let score = 0;

const enterNumber = number => {
    let random_numer = Math.floor(Math.random() * 6) + 1;
    console.log(random_numer);
    return new Promise( (r,j) => {
        setTimeout(_ => {
            if(number == random_numer){
                score += 2;
                r("Success")
            }else if(Math.abs(random_numer - number) === 1){
                ++score;
                r("Success")
            }
            
            j("Failed");
        },1000)
    }
    )
}