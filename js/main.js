import '/js/components.js';

window.onload = () => {
  const counter = document.querySelector('my-counter');
  counter.count = 5;
  setTimeout(() => {
    counter.count = 20
  }, 2000)
  
  const lastDiv = document.querySelector('#last-div');
  lastDiv.title = 'goodbye';
}