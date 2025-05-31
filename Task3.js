const quizzes = {
  ds: [
    { q: "What data structure uses FIFO?", options: ["Stack", "Queue", "Tree", "Graph"], answer: "Queue" },
    { q: "Which uses LIFO?", options: ["Array", "Queue", "Stack", "Linked List"], answer: "Stack" },
    { q: "Max children in binary tree?", options: ["1", "2", "3", "4"], answer: "2" },
    { q: "Which is dynamic in size?", options: ["Array", "Linked List", "Stack", "Queue"], answer: "Linked List" },
    { q: "Best case for binary search?", options: ["O(n)", "O(log n)", "O(n^2)", "O(1)"], answer: "O(1)" }
  ],
  algo: [
    { q: "Binary search complexity?", options: ["O(n)", "O(log n)", "O(n^2)", "O(1)"], answer: "O(log n)" },
    { q: "Which is not a sorting algorithm?", options: ["Merge Sort", "Bubble Sort", "Dijkstra", "Quick Sort"], answer: "Dijkstra" },
    { q: "Dijkstra is used for?", options: ["Shortest Path", "Sorting", "MST", "Graph Coloring"], answer: "Shortest Path" },
    { q: "Which is divide & conquer?", options: ["Merge Sort", "Bubble Sort", "Heap Sort", "Insertion Sort"], answer: "Merge Sort" },
    { q: "DFS uses which data structure?", options: ["Queue", "Stack", "Array", "Tree"], answer: "Stack" }
  ],
  os: [
    { q: "Which uses kernel?", options: ["Windows", "Linux", "Both", "None"], answer: "Both" },
    { q: "What is a deadlock?", options: ["Endless loop", "Race condition", "Blocked state", "Mutual waiting"], answer: "Mutual waiting" },
    { q: "Round Robin is?", options: ["Memory mgmt", "Scheduling", "Paging", "Deadlock"], answer: "Scheduling" },
    { q: "Which is not an OS?", options: ["Linux", "Windows", "Python", "macOS"], answer: "Python" },
    { q: "Virtual memory managed by?", options: ["CPU", "OS", "Cache", "Compiler"], answer: "OS" }
  ],
  cn: [
    { q: "HTTP port?", options: ["21", "22", "80", "443"], answer: "80" },
    { q: "IP address is?", options: ["Hardware ID", "Software ID", "Network ID", "None"], answer: "Network ID" },
    { q: "TCP is?", options: ["Connectionless", "Reliable", "Fast", "Stateless"], answer: "Reliable" },
    { q: "Email protocol?", options: ["SMTP", "HTTP", "FTP", "SNMP"], answer: "SMTP" },
    { q: "DNS translates?", options: ["IP to domain", "MAC to IP", "Domain to IP", "Port to IP"], answer: "Domain to IP" }
  ],
  dbms: [
    { q: "SQL stands for?", options: ["Structured Query Language", "Simple Query Language", "Secure Query Language", "None"], answer: "Structured Query Language" },
    { q: "Which is not a DBMS?", options: ["MySQL", "MongoDB", "Oracle", "Python"], answer: "Python" },
    { q: "Primary key is?", options: ["Unique", "Duplicate", "Nullable", "None"], answer: "Unique" },
    { q: "Normalization is for?", options: ["Data security", "Reducing redundancy", "Backup", "Indexing"], answer: "Reducing redundancy" },
    { q: "Which is a NoSQL DB?", options: ["MongoDB", "MySQL", "Oracle", "SQLite"], answer: "MongoDB" }
  ],
  oop: [
    { q: "OOP stands for?", options: ["Object Oriented Programming", "Only Object Programming", "Object Order Programming", "None"], answer: "Object Oriented Programming" },
    { q: "Which is a feature of OOP?", options: ["Encapsulation", "Normalization", "Querying", "Indexing"], answer: "Encapsulation" },
    { q: "Inheritance is?", options: ["Data hiding", "Code reuse", "Variable", "Method"], answer: "Code reuse" },
    { q: "Polymorphism means?", options: ["Many forms", "One form", "No form", "Single form"], answer: "Many forms" },
    { q: "Class is?", options: ["Blueprint", "Instance", "Variable", "Function"], answer: "Blueprint" }
  ],
  cprog: [
    { q: "C is a?", options: ["High-level", "Low-level", "Mid-level", "None"], answer: "Mid-level" },
    { q: "Which is not a loop?", options: ["for", "while", "loop", "do-while"], answer: "loop" },
    { q: "Function to print?", options: ["printf()", "print()", "cout", "echo"], answer: "printf()" },
    { q: "Pointer stores?", options: ["Value", "Address", "Data type", "None"], answer: "Address" },
    { q: "Array index starts from?", options: ["0", "1", "-1", "Depends"], answer: "0" }
  ],
  python: [
    { q: "Python is?", options: ["Compiled", "Interpreted", "Both", "None"], answer: "Interpreted" },
    { q: "To define a function?", options: ["def", "func", "function", "define"], answer: "def" },
    { q: "Python lists are?", options: ["Immutable", "Mutable", "Static", "None"], answer: "Mutable" },
    { q: "Which keyword for loops?", options: ["for", "loop", "foreach", "while"], answer: "for" },
    { q: "Print statement?", options: ["print()", "echo", "printf()", "cout"], answer: "print()" }
  ]
};

let currentQuiz = [];
let currentIndex = 0;
let score = 0;
let buttonsDisabled = false;

const subjectCards = document.querySelectorAll('.card');
const quizBox = document.getElementById('quizBox');
const questionText = document.getElementById('questionText');
const optionsList = document.getElementById('optionsList');
const resultText = document.getElementById('result');
const backBtn = document.getElementById('back-btn');
const subjectsDiv = document.querySelector('.subjects');

subjectCards.forEach(card => {
  card.addEventListener('click', () => {
    const subject = card.getAttribute('data-subject');
    startQuiz(subject);
  });
});

backBtn.addEventListener('click', () => {
  goBack();
});

function startQuiz(subject) {
  currentQuiz = quizzes[subject];
  currentIndex = 0;
  score = 0;
  buttonsDisabled = false;

  subjectsDiv.style.display = 'none';
  quizBox.style.display = 'block';
  resultText.innerText = '';
  backBtn.style.display = 'none';

  showQuestion();
}

function showQuestion() {
  buttonsDisabled = false;
  const current = currentQuiz[currentIndex];
  questionText.innerText = `Q${currentIndex + 1}. ${current.q}`;
  optionsList.innerHTML = current.options
    .map(opt => `<button onclick="checkAnswer(this, '${opt}')">${opt}</button>`)
    .join('');
  resultText.innerText = '';
}

function checkAnswer(button, selected) {
  if (buttonsDisabled) return;
  buttonsDisabled = true;

  const correctAnswer = currentQuiz[currentIndex].answer;
  const buttons = optionsList.querySelectorAll('button');

  buttons.forEach(btn => {
    btn.disabled = true;
    if (btn.innerText === correctAnswer) {
      btn.style.backgroundColor = '#4caf50';
      btn.style.color = 'white';
      btn.style.boxShadow = '0 0 8px #4caf50';
    }
  });

  if (selected === correctAnswer) {
    button.style.backgroundColor = '#4caf50';
    button.style.color = 'white';
    button.style.boxShadow = '0 0 10px #4caf50';
    resultText.style.color = '#76ff03';
    resultText.style.textShadow = '0 0 8px #76ff03';
    resultText.innerText = '✅ Correct!';
    score++;
  } else {
    button.style.backgroundColor = '#e57373';
    button.style.color = 'white';
    button.style.boxShadow = '0 0 10px #e57373';
    resultText.style.color = '#ff5252';
    resultText.style.textShadow = '0 0 8px #ff5252';
    resultText.innerText = `❌ Wrong! Correct: ${correctAnswer}`;
  }

  setTimeout(() => {
    currentIndex++;
    if (currentIndex < currentQuiz.length) {
      showQuestion();
    } else {
      questionText.innerText = '';
      optionsList.innerHTML = '';
      resultText.style.color = '#81d4fa';
      resultText.style.textShadow = '0 0 6px #81d4fa';
      resultText.innerText = `🎉 Quiz Completed! Your Score: ${score}/${currentQuiz.length}`;
      backBtn.style.display = 'inline-block';
    }
  }, 1800);
}

function goBack() {
  subjectsDiv.style.display = 'flex';
  quizBox.style.display = 'none';
}
