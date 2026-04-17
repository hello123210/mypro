let users = JSON.parse(localStorage.getItem("users")) || [];

let generatedOTP = "";
let resetUser = null;
window.onload = function () {
    let user = localStorage.getItem("currentUser");
    let remember = localStorage.getItem("rememberMe");

    if (user && remember === "true") {
        window.location.href = "dashboard.html";
    }
};

// SWITCH
function showSignup() {
    document.getElementById("login-box").style.display = "none";
    document.getElementById("signup-box").style.display = "block";
}

function showLogin() {
    document.getElementById("signup-box").style.display = "none";
    document.getElementById("forgot-box").style.display = "none";
    document.getElementById("otp-box").style.display = "none";
    document.getElementById("reset-box").style.display = "none";
    document.getElementById("login-box").style.display = "block";

    document.getElementById("login-error").innerText = "";
    document.getElementById("signup-error").innerText = "";
    document.getElementById("username-error").innerText = "";
}

// USERNAME CHECK
function checkUsername() {
    let username = document.getElementById("signup-username").value.trim();
    let error = document.getElementById("username-error");

    if (!username) {
        error.innerText = "";
        return;
    }

    let exists = users.some(u => 
        u.username.toLowerCase() === username.toLowerCase()
    );

    if (exists) {
        error.style.color = "red";
        error.innerText = "Username already taken!";
    } else {
        error.style.color = "green";
        error.innerText = "Username available ✓";
    }
}

// SIGNUP
function signup() {
    let username = document.getElementById("signup-username").value.trim();
    let email = document.getElementById("signup-email").value.trim();
    let phone = document.getElementById("signup-phone").value.trim();
    let pass = document.getElementById("signup-pass").value;
    let confirm = document.getElementById("signup-confirm").value;

    let usernameError = document.getElementById("username-error").innerText;
    if (usernameError.includes("taken")) {
        document.getElementById("signup-error").innerText = "Fix username first!";
        return;
    }

    if (!username || !email || !pass || !confirm) {
        document.getElementById("signup-error").innerText = "Fill required fields!";
        return;
    }

    if (pass !== confirm) {
        document.getElementById("signup-error").innerText = "Passwords do not match!";
        return;
    }

    let emailExists = users.some(u => u.email === email);
    let phoneExists = phone && users.some(u => u.phone === phone);

    if (emailExists) {
        document.getElementById("signup-error").innerText = "Email already registered!";
        return;
    }

    if (phoneExists) {
        document.getElementById("signup-error").innerText = "Phone already used!";
        return;
    }

    users.push({ username, email, phone, pass });
    localStorage.setItem("currentUser", username);
    localStorage.setItem("rememberMe", "false");
    window.location.href = "dashboard.html";
    // CLEAR FIELDS
    document.getElementById("signup-username").value = "";
    document.getElementById("signup-email").value = "";
    document.getElementById("signup-phone").value = "";
    document.getElementById("signup-pass").value = "";
    document.getElementById("signup-confirm").value = "";

    
}

// LOGIN
function login() {
    let input = document.getElementById("login-user").value;
    let pass = document.getElementById("login-pass").value;
    let remember = document.getElementById("rememberMe").checked;

    let found = users.find(u =>
        (u.username === input || u.email === input || u.phone === input)
        && u.pass === pass
    );

    if (found) {
        // ✅ ALWAYS store user
        localStorage.setItem("currentUser", found.username);

        // ✅ store remember choice
        if (remember) {
            localStorage.setItem("rememberMe", "true");
        } else {
            localStorage.setItem("rememberMe", "false");
        }

        window.location.href = "dashboard.html";
    } else {
        document.getElementById("login-error").innerText = "Invalid credentials!";
    }
}
// FORGOT PASSWORD
function forgotPassword() {
    document.getElementById("login-box").style.display = "none";
    document.getElementById("forgot-box").style.display = "block";
}

// SEND OTP
function sendOTP() {
    let input = document.getElementById("forgot-input").value;

    let found = users.find(u => u.email === input || u.phone === input);

    if (found) {
        resetUser = found;
        generatedOTP = Math.floor(1000 + Math.random() * 9000).toString();

        alert("OTP sent successfully!");
        console.log("OTP:", generatedOTP);

        document.getElementById("forgot-box").style.display = "none";
        document.getElementById("otp-box").style.display = "block";
    } else {
        document.getElementById("forgot-error").innerText = "User not found!";
    }
}

// VERIFY OTP
function verifyOTP() {
    let entered = document.getElementById("otp-input").value;

    if (entered === generatedOTP) {
        document.getElementById("otp-box").style.display = "none";
        document.getElementById("reset-box").style.display = "block";
    } else {
        document.getElementById("otp-error").innerText = "Invalid OTP!";
    }
}

// UPDATE PASSWORD
function updatePassword() {
    let newPass = document.getElementById("new-pass").value;
    let confirm = document.getElementById("confirm-new-pass").value;

    if (!newPass || !confirm) {
        document.getElementById("reset-error").innerText = "Fill all fields!";
        return;
    }

    if (newPass !== confirm) {
        document.getElementById("reset-error").innerText = "Passwords do not match!";
        return;
    }

    resetUser.pass = newPass;
    localStorage.setItem("users", JSON.stringify(users));

    alert("Password updated!");
    showLogin();
}