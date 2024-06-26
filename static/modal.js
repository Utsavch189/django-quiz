window.addEventListener("DOMContentLoaded",(e)=>{
    document.getElementById('first_name').innerText='';
    document.getElementById('last_name').innerText='';
    document.getElementById('email').innerText='';
})

window.openModal = function (modalId) {
    document.getElementById(modalId).style.display = 'block'
    document.getElementsByTagName('body')[0].classList.add('overflow-y-hidden')
}

window.closeModal = function (modalId) {
    const error_elm=document.getElementById('error');
    const success_elm=document.getElementById('success');
    error_elm.classList.add('hidden');
    success_elm.classList.add('hidden');
    document.getElementById(modalId).style.display = 'none'
    document.getElementsByTagName('body')[0].classList.remove('overflow-y-hidden')
}

// Close all modals when press ESC
document.onkeydown = function (event) {
    event = event || window.event;
    if (event.keyCode === 27) {
        document.getElementsByTagName('body')[0].classList.remove('overflow-y-hidden')
        let modals = document.getElementsByClassName('modal');
        Array.prototype.slice.call(modals).forEach(i => {
            i.style.display = 'none'
        })
    }
};

function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

const modal_submit=()=>{
    const csrftoken = getCookie('csrftoken');
    const first_name=document.getElementById('first_name').value;
    const last_name=document.getElementById('last_name').value;
    const email=document.getElementById('email').value;
    const error_elm=document.getElementById('error');
    const success_elm=document.getElementById('success');
    const error_msg=document.getElementById('error-message');
    const success_msg=document.getElementById('success-message');

    fetch('/profile',{
        method:"POST",
        headers: {
            "Content-Type": "application/json",
            'X-CSRFToken': csrftoken
        },
        body:JSON.stringify({first_name,last_name,email})
    })
    .then(res=>res.json())
    .then(data=>{
        if (data.status===200){
            error_elm.classList.add('hidden');
            success_elm.classList.remove('hidden');
            success_msg.innerText=data.message;
            document.getElementById('main-name').innerText=data.first_name+' '+data.last_name;
            document.getElementById('email').innerText=data.email;
        }
        else if(data.status===400){
            error_elm.classList.remove('hidden');
            success_elm.classList.add('hidden');
            error_msg.innerText=data.message;
        }

    })
    .catch(err=>{
        console.log(err)
    })
}