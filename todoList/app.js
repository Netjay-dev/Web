const content = document.querySelector('.content');

const obj = document.createElement('div');
obj.style.background = 'white';
obj.style.color = 'black';
obj.style.width = '100px';
obj.style.height = '20px';
obj.innerText = "Hello world";
content.append(obj);