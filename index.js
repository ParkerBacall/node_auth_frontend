const signup = document.querySelector(".user-signup")
const signupMessage = document.querySelector('.signup-message')
const login = document.querySelector(".user-login")
const loginMessage = document.querySelector('.login-message')
const isLoggedIn = document.querySelector(".is-logged-in")
const logout = document.querySelector('.logout')
const secretMessage = document.querySelector('.secret-message')
const getSecretMessage = document.querySelector('.get-secret-message')


const token =  localStorage.getItem("token")

isLoggedIn.textContent = token 
    ? token
    : "no" 

signup.addEventListener("submit", event => {
    event.preventDefault()

    const formData = new FormData(event.target)
    const username = formData.get("username")
    const password = formData.get("password")

    fetch('http://localhost:9000/users', {
        method: "POST",
        headers:{
            "content-type": "application/json"
        },
        body: JSON.stringify({ username, password })
    }).then(response => response.json())
    .then(user => {
        signupMessage.innerText = `Successfully created user: ${user.username}`
    })
})

login.addEventListener("submit", event => {
    event.preventDefault()

    const formData = new FormData(event.target)
    const username = formData.get("username")
    const password = formData.get("password")

    fetch('http://localhost:9000/login', {
        method: "POST",
        headers:{
            "content-type": "application/json"
        },
        body: JSON.stringify({ username, password })
    }).then(response => response.json())
    .then(user => {
        localStorage.setItem("token", user.token)
    })
})

logout.addEventListener("submit", event =>{
    event.preventDefault()
    localStorage.removeItem("token")
})

getSecretMessage.addEventListener('click', event =>{
    fetch('http://localhost:9000/', {
        headers: {
            authorization: `Bearer ${token}`
        },
    })
    .then(res => res.json())
    .then(res => {
        secretMessage.textContent = res.message
    })
    .catch(e => {
        secretMessage.textContent = e.message
    })
})