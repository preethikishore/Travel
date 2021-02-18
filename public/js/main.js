let callmeForm  =  document.querySelector('.call-me-form');
document.addEventListener('DOMContentLoaded', async function(){
    let posts = await getPosts();
    let articles = document.querySelector('.articlesclass');
    articles.innerHTML ='';
    posts.forEach((post)=>
    {
      let posthtml = `<div class="col-4">
      <div class="card">
          <img src="${post.imageUrl}" alt="${post.title}" class="card-img-top">
          <div class="card-body">
              <h4 class="card-title">${post.title}</h4>
              <p class="card-text">${post.description}</p>
              <a href = "/sight?id=${post.id}" class="btn btn-primary">Details</a>
          </div>
      </div>
   </div>`;
 
  articles.insertAdjacentHTML('beforeend',posthtml);
    })
    
})
callmeForm.addEventListener('submit', function(e)
{
  e.preventDefault();
  let phoneInp = document.querySelector('input');
  fetch('/callback-requests',{
     method: 'POST',
     headers:
     {
         'Content-Type' : 'application/json'
     },
     body : JSON.stringify({
         phoneNumber : phoneInp.value
     })
  }).then((resp) => resp.text())
  .then(()=> alert('We will call back as soon as possible!!!!'));
})