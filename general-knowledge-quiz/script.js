let currentQuestionIndex = 0;
let score = 0;
let questions = [];
let currentLevel = "";

async function startQuiz(level) {
  currentLevel = level;
  const response = await fetch("questions.json");
  const data = await response.json();
  questions = data.filter(q => q.level === level);
  questions = shuffleArray(questions).slice(0, 5);
  document.getElementById("start-screen").classList.add("hidden");
  document.getElementById("quiz-screen").classList.remove("hidden");
  showQuestion();
}

function showQuestion() {
  const questionObj = questions[currentQuestionIndex];
  document.getElementById("question-box").innerText = `${currentQuestionIndex + 1}. ${questionObj.question}`;
  const choicesBox = document.getElementById("choices-box");
  choicesBox.innerHTML = "";
  questionObj.choices.forEach((choice, idx) => {
    const btn = document.createElement("button");
    btn.className = "btn";
    btn.innerText = choice;
    btn.onclick = () => handleAnswer(idx);
    choicesBox.appendChild(btn);
  });
}

function handleAnswer(selectedIdx) {
  if (selectedIdx === questions[currentQuestionIndex].answer) {
    score++;
  }
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    endQuiz();
  }
}

function endQuiz() {
  document.getElementById("quiz-screen").classList.add("hidden");
  document.getElementById("result-screen").classList.remove("hidden");
  const message = score === 5 ? "🎉 모든 문제를 맞췄어요! 클리어!" : `총 ${score}문제 맞췄어요! 다시 도전해보세요!`;
  document.getElementById("result-text").innerText = message;
  setTimeout(restartQuiz, 10000); // 10초 뒤 자동 재시작
}

function restartQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  document.getElementById("result-screen").classList.add("hidden");
  document.getElementById("start-screen").classList.remove("hidden");
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}
