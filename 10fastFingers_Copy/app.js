'use strict'

const userInput = document.querySelector("#inputs"),
    resetButton = document.querySelector('#reset-button'),
    timer = document.querySelector('#timer'),
    sentence = document.querySelector('.sentence');

let timeCount = 0, clear = undefined;

const game = {
    word:0,
    letter:0,
    top:2,
    started:false,
    totalWidth: 0,
    chars:0,
    keystrokes:0,
    error:0,
    reset(){
        this.started = false;
        this.word = 0;
        this.chars = 0;
        this.error = 0;
        sentence.style.top = `2px`;
        userInput.value = '';
        timer.innerText = "00:00";
        this.letter = 0;
        this.keystrokes = 0;
        this.top = 2;
        this.totalWidth = 0;
    },
    showScores(){
        console.log(Math.floor(this.chars/5), 'words per minute');
        console.log('With Accuracy of', Math.floor(((this.chars - this.error) / this.chars) * 100));
    }
}

const words = 'the at there some my of be use her than and this an would first a have each make water to from which like been in or she him call is one do into who you had how time oil that by their has its it word if look now he but will two find was not up more long for what other write down on all about go day are were out see did as we many number get with when then no come his your them way made they can these could may I said so people part tail rings multiply thin craven unite toy angry weak second-hand picture disturbed crabby playground aspiring sign lip torpid abandoned ajar happen remember efficacious whirl';
const setOfSpans = [];

//timer if user click start 

const timerTick = function(){
    timeCount = 0;
    
    clearInterval(clear);

    clear = setInterval(() => {
        if(timeCount > 60){
            timeCount = 0;
            game.showScores();
            clearInterval(clear);
            game.started = false;
            return;
        }
        timer.innerText = `0${Math.floor(timeCount/60)}:${isSingleDigit(timeCount%60)}`;
        ++timeCount;
    }, 1000);
}

window.addEventListener('keypress', () => {
    if (game.started) userInput.focus();
})

resetButton.addEventListener('click', _ => {
    game.reset();
    game.started = true;
    timerTick();
    loadWords();
})

const loadWords = _ => {
    generate();
    sentence.replaceChildren(...setOfSpans);
}

const isSingleDigit = (k) =>{
    if(k >= 0 && k <= 9) return '0' + k;
    return k;
}


userInput.addEventListener('input', function(k){
    try{
        if(!game.started){
            if(k.data == ' ') this.value = '';
            return;
        };
        
        ++game.keystrokes;

        if(k.data == ' ' ){

            if(userInput.value === setOfSpans[game.word].innerText + ' '){
                moveUp();
                setOfSpans[game.word].className = 'res-correct';
                game.chars += setOfSpans[game.word].innerText.length;
                ++game.word;
                setOfSpans[game.word].className = 'res-current';
            }else if(userInput.value.length !== 1){
                moveUp();
                setOfSpans[game.word].className = 'res-wrong';
                game.chars += Math.min(setOfSpans[game.word].innerText.length, userInput.value.length-1);
                ++game.word;
            }

            this.value = '';
        }else{
    
            if(setOfSpans[game.word].innerText.substring(0,userInput.value.length) !== userInput.value){
                setOfSpans[game.word].className = 'res-danger';
                //keep track of the wrong keys
                ++game.error;
            }else{
                setOfSpans[game.word].className = 'res-current';
            }
        }
    }catch{

    }
  
})

const moveUp = _ =>{
    game.totalWidth += setOfSpans[game.word].getBoundingClientRect().width + 8;
    if(game.totalWidth + setOfSpans[game.word+1].getBoundingClientRect().width + 8 >= sentence.getBoundingClientRect().width){
        game.top -= 33;
        game.totalWidth = 0;
        sentence.style.top = `${game.top}px`;
    }
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

const generate = () => {    
    if(setOfSpans.length === 0){

        const insertChild = (word) => {
            let span = document.createElement('span');
            span.innerText = word;
            setOfSpans.push(span);
        },
        seperatedWords = words.split(' ');

        let i = 120;

        seperatedWords.forEach((word) => insertChild(word));

        while(i<=200){
            insertChild(seperatedWords[Math.floor(Math.random() * 120)])
            ++i;
        }

        shuffleArray(setOfSpans);
    }else{
        shuffleArray(setOfSpans);
        setOfSpans.map(it => it.className = '');
    }
}