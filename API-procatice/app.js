// fetch('https://api.cryptonator.com/api/ticker/btc-usd').
//     then(res => {
//         console.log(res);
//         return res.json();
//     }).then(data => {
//         console.log(data.ticker.price);
//     }).catch(e => {
//         console.log(e);
//     })

const fetchAsync = async () => {
    try{
        const res = await fetch('https://icanhazdadjoke.com/',{headers:{Accept:'Application/json'}});
        const data = await res.json();
    
        console.log(data);

        document.querySelector('body').innerText = data.joke;

    }catch(e){
        console.log('you have error',e);
    }
}