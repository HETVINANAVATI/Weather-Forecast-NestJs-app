const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const location = search.value;
    messageOne.textContent = 'Loading...';
    messageTwo.textContent = '';
    fetch('/weather?address=' + location).then(async(response) => {
        const result=await response.json();
         console.log(result);
        if (result.error) { 
            messageOne.textContent = result.error;
        } else {
            messageOne.textContent = result.location;
            messageTwo.textContent = result.forecast;
        }  
        
        
    })
})