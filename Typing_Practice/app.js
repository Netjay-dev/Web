let game = undefined, textPerDiv = 20;

document.querySelector('#startButton').addEventListener('click',function(){
    this.style.display = 'none';
    game = new Game();
    game.init();
    game.startTimer();
})

window.addEventListener('keypress', function(key){
    if(!game) return;
    game.evaluate(key.key);
})


function Game(){
    this.time = 0;
    this.EndTime = 20;
    this.index = 0;

    let that = this, typedCharCount = 0, typeError = 0, wordCount = 0;

    this.words = `The tool is easy to use. All you need to do is choose the number of words you want to create (the default is five, but you can input any number you'd like) and the type of words you want. You can choose from all words, verbs only, nouns only or adjective only depending on which best meets your needs.`.replaceAll(' ','_');

    function initialize(){
        document.querySelector('#score-timer').innerText =  0;
        document.querySelector('#typedChar').innerText = '';
        document.querySelector('#word-min').innerText = 0;
        document.querySelector('#typed-error').innerText = 0;
        document.querySelector('#last-key').innerText = "";
        document.querySelector('#currentChar').innerText = that.words[0];
        document.querySelector('#incomingChar').innerText = that.words.substr(1,25);
    }

    this.end = function(){
        game = undefined;
        document.querySelector('#startButton').style.display = 'block';
    }

    this.start = function(){
        if(this.time > this.EndTime){
            clearTimeout(that.start);
            that.end();
            return;
        }

        setTimeout(function(){
            that.time++;
            document.querySelector('#score-timer').innerText = that.time;
            that.start();
        },1000);
    }

    this.eval = function(key){
        if(key === ' '){
            key = '_';
            key == that.words[that.index] && wordCount++;
            document.querySelector('#word-min').innerText = wordCount;
        }

        document.querySelector('#last-key').innerText = key;

        if(key === that.words[that.index]){
            that.index++;
            document.querySelector('#currentChar').innerText = that.words[that.index];
            document.querySelector('#incomingChar').innerText = that.words.substr(that.index+1,textPerDiv);
            appendToTypedChar(key,'green');
        }else{
            appendToTypedChar(key,'red');
            typeError++;
            document.querySelector('#typed-error').innerText = typeError;
        }

    }

    function appendToTypedChar(key, color){
        let spn = document.createElement('span');
        spn.style.color = color;
        typedCharCount++;

        if(typedCharCount > textPerDiv){
            document.querySelector('#typedChar').removeChild(document.querySelector('#typedChar').firstChild)
        }
        spn.innerText = key;
        document.querySelector('#typedChar').append(spn);
    }

    return {
        endTime : this.EndTime,
        startTimer : this.start,
        textlen : textPerDiv,
        init : initialize,
        evaluate : this.eval
    }
}

