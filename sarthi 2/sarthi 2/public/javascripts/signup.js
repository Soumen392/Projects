
function seterror(id, error) {
    //sets  error inside tag of id
    elelment = document.getElementById(id)
    elelment.getElementsByClassName("formerror")[0].innerHTML = error
}

function validateForm() {
    // let returnval = true

    //for name verification
    let correct = /^[A-Za-z]+$/

    let name = document.forms["myForm"]["username"].value
    if (name.length == 0) {
        seterror("name", "  *name must have alphabate")
        return false
    }
    if (name.length < 2) {
        seterror("name", "  *Length of name is too short")
        return false
    }
    if (name.match(correct))
        true
    else {
        seterror("name", "  *name must have alphabate not number")
        return false
    }

    //for email verification
    const emaiPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
    let email = document.forms["myForm"]["femail"].value
    if (!email.match(emaiPattern)) {
        seterror("email", "Length of email is too long")
        console.log(name)
        return false
    }

    // for password varification
    const passPattern =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{4,}$/;
    let password1 = document.forms["myForm"]["fpass"].value
    if (!password1.match(passPattern)) {
        seterror("pass", "*Please enter atleast 5 charatcer with number, symbol, small and capital letter")
        console.log(name)
        return false
    }
    let cpassword = document.forms["myForm"]["password"].value
    if (cpassword != password1) {
        seterror("cpass", "*not matched!")
        console.log(name)
        return false
    }
}

// Hide and show password
const eyeIcons = document.querySelectorAll(".show-hide");

eyeIcons.forEach((eyeIcon) => {
  eyeIcon.addEventListener("click", () => {
    const pInput = eyeIcon.parentElement.querySelector("input"); //getting parent element of eye icon and selecting the password input
    if (pInput.type === "password") {
      eyeIcon.classList.replace("fa-eye-slash", "fa-eye");
      return (pInput.type = "text");
    }
    eyeIcon.classList.replace("fa-eye", "fa-eye-slash");
    pInput.type = "password";
  });
});