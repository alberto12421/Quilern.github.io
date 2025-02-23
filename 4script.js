// ======================
// Page Elements
const pages = {
    cover: document.getElementById('cover-page'),
    menu: document.getElementById('menu-page'),
    grammar: document.getElementById('grammar-page'),
    storytelling: document.getElementById('storytelling-page'),
    hardWords: document.getElementById('hard-words-page')
  };
  
  // Buttons
  const startButton = document.getElementById('start-btn');
  const grammarButton = document.getElementById('grammar-btn');
  const storytellingButton = document.getElementById('storytelling-btn');
  const hardWordsButton = document.getElementById('hard-words-btn');
  const backButtons = {
    grammar: document.getElementById('back-to-menu-grammar'),
    storytelling: document.getElementById('back-to-menu-story'),
    hardWords: document.getElementById('back-to-menu-hard-words')
  };
  
  // ======================
  // Navigation Logic
  // ======================
  function showPage(page) {
    Object.values(pages).forEach(p => p.classList.remove('active'));
    page.classList.add('active');
  }
  
  startButton.addEventListener('click', () => showPage(pages.menu));
  grammarButton.addEventListener('click', () => showPage(pages.grammar));
  storytellingButton.addEventListener('click', () => {
    showPage(pages.storytelling);
    startQuiz();
  });
  hardWordsButton.addEventListener('click', () => {
    showPage(pages.hardWords);
    displayHardWords();
  });
  
  Object.values(backButtons).forEach(button => {
    button.addEventListener('click', () => showPage(pages.menu));
  });
  
  // ======================
  // Grammar Exercise Logic
  // ======================
  const grammarFeedback = document.getElementById('grammar-feedback');
  const userAnswerInput = document.getElementById('user-answer');
  const correctAnswer = 'tombé';
  
  document.getElementById('submit-grammar-btn').addEventListener('click', () => {
    const userAnswer = userAnswerInput.value.trim().toLowerCase();
    if (userAnswer === correctAnswer) {
      grammarFeedback.textContent = 'Correct! Bien joué.';
      grammarFeedback.style.color = 'green';
    } else if (userAnswer === 'tombe') {
      grammarFeedback.textContent = 'Vous avez oublié l\'accent. Essayez encore avec l\'accent sur le "e".';
      grammarFeedback.style.color = 'orange';
    } else {
      grammarFeedback.textContent = 'Incorrect. Essayez encore.';
      grammarFeedback.style.color = 'red';
    }
  });
  
  // ======================
  // Storytelling Quiz Logic
  // ======================
  const questionElement = document.getElementById('question-text');
  const answerButtonsElement = document.getElementById('answer-buttons');
  const nextButton = document.getElementById('next-question-btn');
  const timerElement = document.getElementById('time-left');
  const scoreTracker = document.getElementById('score-value');
  const hintTextElement = document.getElementById('hint-text');
  
  const storyQuestions = [
    {
      question: "Que tombe sur la tête de Petit Poulet ?",
      answers: [
        { text: "Une feuille", correct: false },
        { text: "Une noisette", correct: false },
        { text: "Une pomme", correct: true },
        { text: "Une pierre", correct: false }
      ],
      hint: "C'est un fruit rouge."
    },
    {
      question: "Pourquoi Petit Poulet est-il effrayé ?",
      answers: [
        { text: "Il a perdu son chemin", correct: false },
        { text: "Il pense que le ciel tombe", correct: false },
        { text: "Il entend un bruit étrange", correct: false },
        { text: "Il voit un renard", correct: true }
      ],
      hint: "C'est un animal rusé."
    }
  ];
  
  let currentQuestionIndex = 0;
  let score = 0;
  let timer;
  
  function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    scoreTracker.textContent = score;
    showQuestion();
  }
  
  function showQuestion() {
    resetQuizState();
    const question = storyQuestions[currentQuestionIndex];
    questionElement.textContent = question.question;
    question.answers.forEach(answer => {
      const button = document.createElement('button');
      button.textContent = answer.text;
      button.classList.add('btn');
      if (answer.correct) button.dataset.correct = true;
      button.addEventListener('click', selectAnswer);
      answerButtonsElement.appendChild(button);
    });
    startTimer();
  }
  
  function resetQuizState() {
    clearInterval(timer);
    timerElement.textContent = 15;
    nextButton.classList.add('hide');
    hintTextElement.textContent = '';
    answerButtonsElement.innerHTML = '';
  }
  
  function selectAnswer(e) {
    const selectedButton = e.target;
    const correct = selectedButton.dataset.correct === 'true';
    if (correct) {
      score++;
      scoreTracker.textContent = score;
      selectedButton.style.backgroundColor = 'green';
    } else {
      selectedButton.style.backgroundColor = 'red';
      hintTextElement.textContent = storyQuestions[currentQuestionIndex].hint;
    }
    nextButton.classList.remove('hide');
  }
  
  nextButton.addEventListener('click', () => {
    currentQuestionIndex++;
    if (currentQuestionIndex < storyQuestions.length) {
      showQuestion();
    } else {
      questionElement.textContent = `Quiz terminé ! Score final : ${score}`;
      nextButton.classList.add('hide');
    }
  });
  
  function startTimer() {
    let timeLeft = 15;
    timer = setInterval(() => {
      timeLeft--;
      timerElement.textContent = timeLeft;
      if (timeLeft <= 0) {
        clearInterval(timer);
        nextButton.classList.remove('hide');
      }
    }, 1000);
  }
  
  // ======================
  // Hard Words Logic
  // ======================
  const hardWordsList = document.getElementById('hard-words-list');
  const hardWords = [
    {
      word: "noisette",
      meaning: "Petit fruit sec produit par le noisetier.",
      translation: "hazelnut",
      usage: "Une noisette tombe sur la tête de Petit Poulet."
    },
    {
      word: "effrayé",
      meaning: "Qui a peur, qui est rempli de crainte.",
      translation: "scared",
      usage: "Effrayé, il pense que le ciel est en train de tomber."
    }
  ];
  
  function displayHardWords() {
    hardWordsList.innerHTML = hardWords.map(word => `
      <li>
        <strong>${word.word}</strong><br>
        Signification : ${word.meaning}<br>
        Traduction : ${word.translation}<br>
        Utilisation : "${word.usage}"
      </li>
    `).join('');
  }