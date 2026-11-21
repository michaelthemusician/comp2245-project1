const form = document.querySelector("#signup-form");
const nameInput = document.querySelector("#name");
const emailInput = document.querySelector("#email");
const frequencyInput = document.querySelector("#frequency");
const formMessage = document.querySelector("#form-message");

// some characters, an @, more characters, a dot, more characters, no spaces
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function setError(field, text) {
    document.querySelector(`#${field.id}-error`).textContent = text;
    field.setAttribute("aria-invalid", "true");
}

function clearError(field) {
    document.querySelector(`#${field.id}-error`).textContent = "";
    field.removeAttribute("aria-invalid");
}

form.addEventListener("submit", (event) => {
    event.preventDefault();

    formMessage.textContent = "";
    formMessage.classList.remove("success");

    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const frequency = frequencyInput.value;

    let firstInvalid = null;

    //name: must not be empty
    if (name === "") {
        setError(nameInput, "Enter your name.");
        firstInvalid = firstInvalid || nameInput;
    } else {
        clearError(nameInput);
    }

    //email: must not be empty, and must look like an email address
    if (email === "") {
        setError(emailInput, "Enter your email address.");
        firstInvalid = firstInvalid || emailInput;
    } else if (!emailPattern.test(email)) {
        setError(emailInput, "Enter an email address like name@example.com.");
        firstInvalid = firstInvalid || emailInput;
    } else {
        clearError(emailInput);
    }

    //frequency: an option must be chosen (the placeholder has value "")
    if (frequency === "") {
        setError(frequencyInput, "Choose how often we should email you.");
        firstInvalid = firstInvalid || frequencyInput;
    } else {
        clearError(frequencyInput);
    }

    //if there's any problem, put the cursor in the first wrong field and stop
    if (firstInvalid) {
        firstInvalid.focus();
        return;
    }

    //when every field is correct
    formMessage.textContent = `Thank you, ${name}! You're on the mailing list.`;
    formMessage.classList.add("success");
    form.reset();
});
