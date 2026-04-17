// QUESTIONS (You can change anytime)
let questions = [

  { question: "Do you enjoy fixing or troubleshooting technical problems?", mapping: { IT: 2, Engineering: 1 } },

  { question: "Are you curious about how buildings, roads, or structures are made?", mapping: { Engineering: 2 } },

  { question: "Do you feel satisfied when helping someone recover or feel better?", mapping: { Medical: 2, Education: 1 } },

  { question: "Do you like taking initiative and making decisions for a group?", mapping: { Business: 2 } },

  { question: "Do you enjoy expressing ideas through art, design, or visuals?", mapping: { Arts: 2 } },

  { question: "Are you interested in understanding rules, rights, and legal systems?", mapping: { Law: 2 } },

  { question: "Do you like asking 'why' and exploring how things work scientifically?", mapping: { Science: 2 } },

  { question: "Do you enjoy tracking expenses, profits, or financial data?", mapping: { Commerce: 2 } },

  { question: "Do you like interacting with people and sharing ideas publicly?", mapping: { Media: 2 } },

  { question: "Do you enjoy mentoring or guiding others academically?", mapping: { Education: 2 } },

  { question: "Do you like learning new technologies or digital tools?", mapping: { IT: 2 } },

  { question: "Do you enjoy planning strategies or solving business problems?", mapping: { Business: 2 } },

  { question: "Are you interested in human body functions or diseases?", mapping: { Medical: 2 } },

  { question: "Do you enjoy storytelling through videos, blogs, or presentations?", mapping: { Media: 1, Arts: 1 } },

  { question: "Do you prefer working on real-world practical tasks?", mapping: { Engineering: 2 } }

];

// SCORES
let scores = {
  IT: 0,
  Engineering: 0,
  Medical: 0,
  Business: 0,
  Arts: 0,
  Law: 0,
  Science: 0,
  Commerce: 0,
  Media: 0,
  Education: 0
};

let currentQuestion = 0;

// LOAD QUESTION
function loadQuestion() {
  document.getElementById("question").innerText = questions[currentQuestion].question;
  document.getElementById("progress").innerText = (currentQuestion + 1) + " / " + questions.length;
}

// HANDLE ANSWER
function answer(choice) {
  let value = 0;

  if (choice === "yes") value = 2;
  else if (choice === "sometimes") value = 1;
  else value = 0;

  let mapping = questions[currentQuestion].mapping;

  for (let key in mapping) {
    scores[key] += mapping[key] * value;
  }

  currentQuestion++;

  if (currentQuestion < questions.length) {
    loadQuestion();
  } else {
    showResult();
  }
}

// SHOW RESULT
function showResult() {
  let resultArray = Object.entries(scores);

  // Sort highest to lowest
  resultArray.sort((a, b) => b[1] - a[1]);

  let topScore = resultArray[0][1];

  // Get all with same top score
  let topClusters = resultArray.filter(item => item[1] === topScore);

  let finalCluster;

  if (topClusters.length === 1) {
    finalCluster = topClusters[0][0];
  } else {
    // Tie-break → choose randomly
    finalCluster = topClusters[Math.floor(Math.random() * topClusters.length)][0];
  }

  localStorage.setItem("topCluster", finalCluster);

  window.location.href = "result.html";
}

 

// START
loadQuestion();