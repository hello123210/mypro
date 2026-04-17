// LOAD RESULT
window.onload = function () {
    let result = localStorage.getItem("topCluster");

    if (!result) {
        window.location.href = "dashboard.html";
        return;
    }

    document.getElementById("result-text").innerText = result;
};

// BUTTON
function goDashboard() {
    window.location.href = "dashboard.html";
}