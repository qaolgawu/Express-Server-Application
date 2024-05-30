const form = document.querySelector('.form');
const submit = document.querySelector('.form .form__submit')
const inputs = document.querySelectorAll('.form__inp')
const error = document.querySelector('.error')
const serverMessage = document.querySelector('.serverMessage')
const fixedBtn = document.querySelector('.fixedBtn')
const users = document.querySelector('.users')
const usersContainer = document.querySelector('.container')
const url = 'http://localhost:3000';

function postOrder(client) {
    return fetch(url + '/user', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer RLPUUOQAMIKSAB2PSGUECA'
        },
        body: JSON.stringify(client)
    }).then(response => response.json())
}

function validation(inp){
    const errMsg = inp.nextElementSibling
    if(inp.validity.patternMismatch){
        errMsg.textContent = inp.getAttribute('data-error-pattern')
    } else if (inp.validity.valueMissing){
        errMsg.textContent = 'The field must not be empty'
    } else if(inp.validity.tooLong || inp.validity.tooShort){
        errMsg.textContent = inp.getAttribute('data-error-length')
    }
    else {
        errMsg.textContent = ''
    }
    submit.disabled = !Array.from(inputs).every((inp)=> inp.validity.valid)
}

async function formSubmit(e) {
    try{
        e.preventDefault();
        const { login, password, name } = e.target.elements;
        const obj = {
            name: name.value,
            email: login.value,
            password: password.value
        };
        const data = await postOrder(obj);
        serverMessage.textContent = 'Registration completed successfully'
        if(data.keyValue){
            serverMessage.textContent = 'A user with this data already exists: ' + (Object.entries(data.keyValue).map(item => item.join(': ')))
        }
       
    } catch (err) {
        console.log(err);
        if(err){
            serverMessage.textContent = `Registration error`
        }
    }

}


fixedBtn.addEventListener('click', async () => {
    try{
        const response = await fetch(url + '/user', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        })
        const data = await response.json()
        users.classList.remove('hidden')
        usersContainer.innerHTML = ''
        data.forEach(item => {
            const div = document.createElement('div')
            div.classList.add('user')
            div.innerHTML = `
                <p>Name: ${item.name}</p>
                <p>Login: ${item.email}</p>
                <p>Id: ${item._id}</p>
            `
            usersContainer.append(div)
        })
    } catch (err) {
        console.log(err);
    }
})

form.addEventListener('submit', formSubmit);
users.addEventListener('click', (e) => {
    if(e.target.classList.contains('users')){
        users.classList.add('hidden')
    }
})
inputs.forEach(inp => inp.addEventListener('input', () => validation(inp)))