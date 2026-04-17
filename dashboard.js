window.onload = function () {
    let user = localStorage.getItem("currentUser");

    if (!user) {
        window.location.href = "index.html";
    }
};

function logout() {
    localStorage.removeItem("currentUser");
    localStorage.removeItem("rememberMe");
    window.location.href = "index.html";
}

function goToQuiz() {
    window.location.href = "quiz-intro.html";
}

function knownCareer() {
    window.location.href = "career.html";
}

function confusedCareer() {
    alert("Comparison feature coming 🔥");
}
