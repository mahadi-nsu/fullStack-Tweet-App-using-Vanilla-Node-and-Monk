const form = document.querySelector('form');
const loadingElement = document.querySelector('.loading');
const mewsElement = document.querySelector('.mews');

//post request URL
const API_URL = "http://localhost:8000/mews";

//hide the loading symbol
loadingElement.style.display = '';

listAllMews();

form.addEventListener('submit',(event)=>{
   event.preventDefault();

   const formData = new FormData(form);
//    console.log(formData);

   const name = formData.get('name');
   const content = formData.get('content');

   const mew ={
       name,
       content
   }

   form.style.display = 'none';
   loadingElement.style.display = '';
   //console.log(mew);

   //sending the mew object to the server
   fetch(API_URL,{
       method :'POST',
       body:JSON.stringify(mew),
       headers:{
           'content-type' : 'application/json'
       }
   }).then(response => response.json())
   .then(createdMew=>{
       console.log(createdMew);
       form.reset();   
       form.style.display = '';
       listAllMews();
    //loadingElement.style.display = 'none';
   })
});

function listAllMews()
{
    fetch(API_URL)
          .then(response=>response.json())
          .then(mews=>{
            mewsElement.innerHTML = '';
              console.log(mews);
              mews.reverse();
              mews.forEach(mew=>{
                  const div = document.createElement('div');
                  
                  const header = document.createElement('h3');
                  header.textContent = mew.name;
                  const contents = document.createElement('p');
                  contents.textContent = mew.content;

                  div.appendChild(header);
                  div.appendChild(contents);

                  const date = document.createElement('small');
                  date.textContent = new Date(mew.created);
                  div.appendChild(date);
                  mewsElement.appendChild(div);

              });
              loadingElement.style.display = 'none';
          });
}