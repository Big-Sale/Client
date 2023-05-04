/**
 * <----------------------------------- Constants ----------------------------------->
 * 
 *                                  All constants here.
 * 
 * <--------------------------------------------------------------------------------->
 */

const form =                    document.querySelector('form');
const usernameField =           form.querySelector('input[name="username"]');
const passwordField =           form.querySelector('input[name="password"]');
const registerButton =          document.getElementById('sign-up');
const container =               document.querySelector(".container");
const loginContainer =          document.getElementById('login-container');
const registerContainer =       document.getElementById('register');
const submitRegisterButton =    document.getElementById('submit-signup');
const loginButton =             document.getElementById('login');
const loginRedirect =           document.getElementById('redirect');

/**
 * <----------------------------------- Event Listeners ----------------------------->
 * 
 *              All event listeners added at page load are added here.
 * 
 * <--------------------------------------------------------------------------------->
 */

loginRedirect.addEventListener('click', () => {
    container.classList.remove("expanded");
    loginContainer.classList.remove("removed");
    registerContainer.classList.remove("visible");
})

/**
 * When the button for registering is clicked, the menu for 
 * submitting user info is shown by adding CSS classes to the 
 * corresponding elements.
 */
registerButton.addEventListener('click', () => {
    container.classList.add("expanded");
    loginContainer.classList.add("removed");
    registerContainer.classList.add("visible");
});

/**
 * When login is pressed, input is validated and the load-icon
 * should be shown while the request is processing. Async, await 
 * something something
 * 
 * **SIDENOTE** Maybe some technical debt here; I did the login-part
 * as a form, that's why theres no actual button corresponding to
 * this function.
*/

form.addEventListener('submit', function(e) {
    
    if(!checkUsername() || !checkPassword()) {
        return;
    }
    e.preventDefault();
    
    showLoading(loginButton);
    setTimeout(() => {
        form.submit();
    }, 3000)
});

/**
 * When the button for submitting user info is clicked, the load
 * icon should be shown while waiting for the response. Async?
 */

submitRegisterButton.addEventListener('click', () => {
    if(validUserDetails()) {
        showLoading(submitRegisterButton);
    }
})

/** 
 * <----------------------------------- Functions ----------------------------------->
 * 
 *          I've put stuff defined with function here. You get the idea.
 * 
 * <--------------------------------------------------------------------------------->
*/

function validUserDetails() {
    // TODO
    return true;
}

/**
 * Checks to see whether username input is valid or not, appends 
 * necessary error messages if not.
 * @returns whether or not the argument is valid
 */

function checkUsername() {
    if (usernameField.value.length < 5) {
        usernameField.insertAdjacentHTML('afterend', '<div class="error">Username must be at least 5 characters long</div>');
        return false;
      }
      return true;
}


/**
 * Checks to see whether password input is valid or not, appends 
 * necessary error messages if not.
 * @returns whether or not the argument is valid
 */

function checkPassword() {
    if (passwordField.value === '') {
        passwordField.insertAdjacentHTML('afterend', '<div class="error">Password cannot be empty</div>');
        return false;
      }
      return true;
}

/**
 * Adds a loading icon to the classlist of the button added. This
 * CSS is wonky as fuck and should be redone as one needs to apply
 * the correct x and y index for the load bar for each individual
 * button (see .btn-submit-signup .lds ripple and below column for
 * example)
 * @param {*} button 
 */

function showLoading(button) {
    button.classList.add('loading');
    setTimeout(() => {
        button.classList.remove('loading');
    }, 3000);
}
