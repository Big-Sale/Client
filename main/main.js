
    const store = document.getElementById('store-content')
    const profile = document.getElementById('profile-content')
    const login = document.getElementById('login-content')
    profile.classList.add('hidden')
    store.classList.add("hidden")


    const profileLink = document.getElementById("profile-link");


    profileLink.addEventListener('click', function() {
        profile.classList.remove('hidden')
        store.classList.add('hidden')
        login.classList.add('hidden')
    })
