async function getEmails()
{
    return await fetch('/emails')
                    .then((response) => response.json())
                    .then((data) => data);
}

let emailBlock = document.querySelector('#v-pills-mails');
emailBlock.addEventListener('click',function(e)
{
    if(e.target.classList.contains('btn-remove'))
    {
        let id = e.target.parentNode.parentNode.querySelector('.id').value;
        fetch('/emails/' +id,{
            method:'DELETE'
        }).then((resp)=> resp.text())
        .then(()=> window.history.go());

    }

})

