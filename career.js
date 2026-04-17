function showCareer() {
    let career = document.getElementById("careerSelect").value;
    let grade = document.getElementById("gradeSelect").value;

    if (career === "" || grade === "") {
        alert("Please select both grade and career");
        return;
    }

    // SAVE DATA
    localStorage.setItem("selectedCareer", career);
    localStorage.setItem("selectedGrade", grade);

    // DEBUG (TEMP)
    alert("Saved:\nCareer: " + career + "\nGrade: " + grade);

    // REDIRECT
    window.location.href = "career-result.html";
}