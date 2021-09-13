const counter = document.querySelector('.counter');
const bg = document.querySelector('.bg');

let count = 0;

let int = setInterval(blurr,30);

function blurr(){
    count++;
    if(count > 99){
        clearInterval(int);
    }
    counter.innerText = `${count}%`;
    counter.style.opacity = scale(count, 0, 100, 1, 0);
    bg.style.filter = `blur(${scale(count,0,100,30,0)}px)`;
}

const scale = (num, in_min, in_max, out_min, out_max) => {
    return (num -in_min) * (out_max - out_min) / (in_max - in_min) + out_min
}