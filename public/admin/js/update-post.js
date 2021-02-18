
{

    let updateForm = document.querySelector('.update-post-form');
    let articleBlock = document.querySelector('.articlesclass');
    let id;
    let titleInp = document.querySelector('#update-title');
    let textArea  = document.querySelector('#update-text');

    articleBlock.addEventListener('click',async function(e)
    {
         id = e.target.parentNode.parentNode.querySelector('.id').value;
        let postValue = await fetch('/posts/' +id)
        .then((resp)=> resp.json())
        .then((data)=>  data);
        titleInp.value = postValue.title; 
        textArea.value = postValue.text;

        if(e.target.classList.contains('btn-update'))
        {
         let articlesTab = document.getElementById('v-pills-articles');
        articlesTab.classList.remove('show');
        articlesTab.classList.remove('active');
        let updateTab = document.getElementById('v-pills-update-post');
        updateTab.classList.add('show');
        updateTab.classList.add('active');
    
        }
    
    })
    updateForm.addEventListener('submit',function(e)
    {
        e.preventDefault();
        fetch('/posts/' +id,{
            method: 'PUT',
            headers: {
                'Content-Type' :'application/json'
            },
            body: JSON.stringify({
                    title:titleInp.value,
                    text:textArea.value,
                    description:textArea.value.substring(0,textArea.value.indexOf('.') + 1 )

                })
        
    }).then((resp) =>resp.text())
    .then(()=> window.history.go())
    })
}
