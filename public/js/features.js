function enableUpdate () {
    const content = document.querySelector('.content p');
    const title = document.querySelector('.content h1');
    const updateBtn = document.querySelector('.update-btn');

    const data = {
        title: title.innerHTML,
        content: content.innerHTML
    }

    if(updateBtn.innerHTML === 'Update') {
        updateBtn.innerHTML = 'Save';
        content.setAttribute('contenteditable', true);
    } else {
        updateBtn.innerHTML = 'Update';
        content.setAttribute('contenteditable', false);
        fetchData('/Update', data)
    }
}

function deleteBlog () {
    const title = document.querySelector('.content h1').innerHTML;
    fetchData('/Delete', title)
}

function fetchData (url, data) {
    fetch(url, {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({data: data})
    })
    .then(response => response.json())
    .then(data => {
        console.log(data)
    })
    .catch(err => {
        console.log(err);
    })
}