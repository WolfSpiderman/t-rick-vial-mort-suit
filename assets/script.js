var requestCharAll = "https://rickandmortyapi.com/api/character/[703,388,321,7,26,47,81,162,192,279,282,306,196,726,562,543,507,717,244,696]";
var insultURL = "https://insult.mattbas.org/api/insult.json";
var insult = "";
//start button
var startBtn = document.querySelector("#startBtn");
var startTime;
var endTime;
var currentPoints;
//hidden game card 
var gameCard = document.querySelector("#question-card");
//hidden score card
var scoreCard = document.querySelector("#score-card");
var highscoreCard = document.querySelector("#highscore-card");
var startCard = document.querySelector("#home-page");
var nameCard = document.querySelector("#name-card");
//display image cards here
var charCards = document.querySelector(".charCard");
//display answer options/button
var answerBtn1 = document.querySelector("#btn1");
var answerBtn2 = document.querySelector("#btn2");
var answerBtn3 = document.querySelector("#btn3");
var answerBtn4 = document.querySelector("#btn4");

var nextBtn = document.querySelector("#nextBtn");
var scoreBtn = document.querySelector("#scoreBtn");
var charInfo = [];

var nameInput = document.querySelector("#name-input");
var userName;

var cardImg = document.querySelector("#cardImg");
var cardName = document.querySelector("#cardName");
var cardStatus = document.querySelector("#cardStatus");
var cardType = document.querySelector("#cardType");
var cardSpecies = document.querySelector("#cardSpecies");
var cardOrigin = document.querySelector("#cardOrigin");
var cardLast = document.querySelector("#cardLast");

// var results = document.querySelector("#results");
var resultText = document.querySelector("#result-text");

var endMsg = document.querySelector("#endMsg");

if (JSON.parse(localStorage.getItem("highscores")) == null) {
    var savedScores = [];
} else {
    var savedScores = JSON.parse(localStorage.getItem("highscores"));
}
var scores = savedScores;
var hsName = document.querySelector("#hsName");
var hsScore = document.querySelector("#hsScore");

var preInsult = fetch(insultURL)
.then(function (response) {
    return response.json();
})
.then(function (data) {
    resultText.textContent = "Incorrect! " + data.insult;
});

//list of questions to use in questionH2
var questionList = [
    {
        question: "Abradolf Lincler sacrificed himself getting what for Rick?",
        choices: ["a. The Emancipation Proclamation", "b. The Ark of The Covenant", "c. Kalaxian Crystals", "d. Portal Tree Seeds"],
        answer: "c. Kalaxian Crystals" 
    },
    {
        question: "What annual event was going on when Rick and Morty met Arthricia?",
        choices: ["a. Cat Nip Fever", "b. The Purge", "c. Catnap Savings", "d. The Witch Hunt"],
        answer: "b. The Purge"
    },
    {
        question: "Where did Rick and Birdperson meet?",
        choices: ["a. Bird World", "b. Birding Man", "c. The Battle of Blood Ridge", "d. The NX-5, brought to you by Wrangler"],
        answer: "b. Birding Man"
    },
    {
        question: "Who does Rick describe as 'half cold, unfeeling reptile, half also cold, equally unfeeling machine'?",
        choices: ["a. Gatorbot", "b. Robosnake", "c. Crocubot", "d. Mechamamba"],
        answer: "c. Crocubot" // hide name and image
    },
    {
        question: "Where do we last see Ice-T?",
        choices: ["a. The Grammy's", "b. Snacking on Fig Newtons", "c. In the studio with Rick", "d. Alphabetrium"],
        answer: "d. Alphabetrium"
    },
    {
        question: "King Flippy Nips is the king of which planet?",
        choices: ["a. Pluto", "b. Forbodulon Prime", "c. Venzenulon-7", "d. Saturn"],
        answer: "a. Pluto" //hide both locations
    },
    {
        question: "What alien race is Krombopulos Micheal?",
        choices: ["a. Gazorpazorpian", "b. Gromflomite", "c. Traflorkian", "d. Krootabulan"],
        answer: "b. Gromflomite" //hide type 
    },
    {
        question: "Why did beth shoot Mr. Poopybutthole?",
        choices: ["a. He shot first", "b. She didn't have any bad memories of him", "c. She missed her intended target", "d. She was brainwashed"],
        answer: "b. She didn't have any bad memories of him"
    },
    {
        question: "What is Regular Legs superpower?",
        choices: ["a. Being able to jump almost high enough to dunk", "b. Being tall enough to reach things at the store", "c. The speed of a person with normal sized legs", "d. all of the above"],
        answer: "d. all of the above"
    },
    {
        question: "What is Gear-Head's real name?",
        choices: ["a. Zinc Zuckbot", "b. Bill Williamson", "c. Locomotive 'Loki' Jenkins", "d. Revolio Clockberg Jr"],
        answer: "d. Revolio Clockberg Jr" //hide name
    },
    {
        question: "What turned out to be Scary Terry's weakness?",
        choices: ["a. Laughing", "b. Running", "c. Crying", "d. Hiding"],
        answer: "d. Hiding"
    },
    {
        question: "What is in the atmosphere on Shrimply Pibbles' home planet?",
        choices: ["a. Heroin", "b. Methane-phetamines", "c. Neon", "d. Chlorine"],
        answer: "a. Heroin"
    },
    {
        question: "Which layer sub-dimension was Zeep Xanflorp from?",
        choices: ["a. Microverse", "b. Miniverse", "c. Tinyverse", "d. Teenyverse"],
        answer: "a. Microverse" // hide type and both locations
    },
    {
        question: "What type of Rick is this?",
        choices: ["a. Clone", "b. Alternate Dimension Version", "c. Decoy", "d. Robot"],
        answer: "b. Alternate Dimension Version" // hide type, species, and both locations
    },
    {
        question: "How many kids does Vermigurber claim to have?",
        choices: ["a. 200,000", "b. 400,000", "c. 800,000", "d. 1,000,000"],
        answer: "c. 800,000"
    },
    {
        question: "Who has Balthromaw soul-bonded with in his home realm?",
        choices: ["a. Rick", "b. Morty", "c. Summer", "d. All of the above, plus 6 other dragons all at once"],
        answer: "d. All of the above, plus 6 other dragons all at once"
    },
    {
        question: "What type of Morty is this?",
        choices: ["a. Clone", "b. Alternate Dimension version", "c. Decoy", "d. Robot"],
        answer: "c. Decoy" // hide type, species, and locations
    },
    {
        question: "Why does Mr. Always-Wants-To-Be-Hunted want to be hunted?",
        choices: ["a. He requires adrenaline to survive", "b. To achieve an orgasmic afterlife", "c. To eventually acquire bullet immunity", "d. Nobody knows."],
        answer: "d. Nobody knows."
    },
    {
        question: "Who was the villain Planetina showed up to fight when she met Morty?",
        choices: ["a. Methape", "b. Pollutatron", "c. Oil Boil", "d. Diesel Weasel"],
        answer: "d. Diesel Weasel"
    },
    {
        question: "Where did sticky come from?",
        choices: ["a. Morty's testicles", "b. Space dicks", "c. A de-shrinking incident gone wrong", "d. Zues"],
        answer: "a. Morty's testicles" // hide type and origin
    },

];

//game functionality


//to hide all cards
function hideCards() {
    startCard.setAttribute("hidden", true);
    gameCard.setAttribute("hidden", true);
    scoreCard.setAttribute("hidden", true);
    highscoreCard.setAttribute("hidden", true);
    nameCard.setAttribute("hidden", true);
}

function hideResultText() {
    resultText.textContent = " ";
    results.style.display = "none";
    nextBtn.setAttribute("class", "hidden");
}

  
var currentQuestion = 0;
var score = document.querySelector("#score");
var points;
document.querySelector("#startBtn").addEventListener("click", startQuiz);

function init(){
    hideCards();
  startCard.removeAttribute("hidden");
}

function startQuiz(){
    hideCards();
    gameCard.removeAttribute("hidden");
    gameCard.setAttribute("display", "flex");

    currentQuestion = 0;
    points = 0;
    displayQuestion();
    
}

  
  //display the question and answer options for the current question
function displayQuestion() {
    nextBtn.removeEventListener("click", nextQ);
    hideResultText();
    answerBtn1.disabled = false;
    answerBtn2.disabled = false;
    answerBtn3.disabled = false;
    answerBtn4.disabled = false;
    let question = questionList[currentQuestion];
    let options = question.choices;
  
   //display questions here
    let questionH2 = document.querySelector(".question");
    questionH2.textContent = question.question;
  
    startTime = Date.now();
    fetch(requestCharAll)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        charInfo = [data[currentQuestion].image, data[currentQuestion].name, data[currentQuestion].status, data[currentQuestion].type, data[currentQuestion].species, data[currentQuestion].origin.name, data[currentQuestion].location.name];
        cardImg.setAttribute("src", charInfo[0]);
        if (currentQuestion === 3) {cardImg.setAttribute("class", "hidden")};
        cardName.textContent = charInfo[1];
        if (currentQuestion === 3 || currentQuestion === 9) {cardName.setAttribute("class", "hidden")};
        cardStatus.textContent = charInfo[2];
        cardType.textContent = charInfo[3];
        if (currentQuestion === 3 || currentQuestion === 5 || currentQuestion === 6 || currentQuestion === 12 || currentQuestion === 13|| currentQuestion === 16 || currentQuestion === 19) {cardType.setAttribute("class", "hidden")};
        cardSpecies.textContent = charInfo[4];
        if (currentQuestion === 6 || currentQuestion === 13 || currentQuestion === 16) {cardSpecies.setAttribute("class", "hidden")};
        cardOrigin.textContent = charInfo[5];
        if (currentQuestion === 2 || currentQuestion === 5 || currentQuestion === 12 || currentQuestion === 13 || currentQuestion === 16 || currentQuestion === 19) {cardOrigin.setAttribute("class", "hidden")};
        cardLast.textContent = charInfo[6];
        if (currentQuestion === 2 || currentQuestion === 4 || currentQuestion === 5 || currentQuestion === 12 || currentQuestion === 13 || currentQuestion === 16) {cardLast.setAttribute("class", "hidden")};
});

    for (let i = 1; i <= options.length; i++) {
      let option = options[(i-1)];
      let optionButton = document.querySelector("#btn" + i);
      optionButton.textContent = option;
    }
}
  
  
document.addEventListener("click", checkAnswer);
  
function checkAnswer(eventObject) {
    let optionButton = eventObject.target;
    if (!optionButton.matches(".answerBtn")) return; 
    results.style.display = "block";

    endTime = Date.now();
    timeTaken = Math.floor((endTime - startTime) / 10);
    if (timeTaken > 2000) {
        timeTaken = 2000;
    }
    currentPoints = ((2000 - timeTaken) + 1000);

    if (questionList[currentQuestion].answer == optionButton.textContent) {
      resultText.textContent = "Correct!";
      [].forEach.call(charCards.querySelectorAll(".hidden"),function(e){
        e.removeAttribute("class", "hidden");
      });
      points += currentPoints;
    } else if (window.matchMedia("(max-width: 768px)").matches) {
        resultText.textContent = "Incorrect! Correct answer is " + questionList[currentQuestion].answer + ".";
        [].forEach.call(charCards.querySelectorAll(".hidden"),function(e){
            e.removeAttribute("class", "hidden");
          });
    } else {
        fetch(insultURL)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        resultText.textContent = "Incorrect! " + data.insult + "! The correct answer is " + questionList[currentQuestion].answer + ".";
    });
      [].forEach.call(charCards.querySelectorAll(".hidden"),function(e){
        e.removeAttribute("class", "hidden");
      });
    }
    answerBtn1.disabled = true;
    answerBtn2.disabled = true;
    answerBtn3.disabled = true;
    answerBtn4.disabled = true;

    nextBtn.removeAttribute("class", "hidden");
    
    nextBtn.addEventListener("click", nextQ);
}

function nextQ() {
    currentQuestion++;
    if (currentQuestion < questionList.length) {
      displayQuestion();
    } else {
      endQuiz();
    }};

function renderHighScores() {
    for (i = 0; i < scores.length; i++) {
        var newHSname = document.createElement("li");
        var newHSscore = document.createElement("li");
        newHSname.textContent = scores[i].name;
        newHSscore.textContent = scores[i].score;
        hsName.appendChild(newHSname);
        hsScore.appendChild(newHSscore);
    }
}    

function highscore() {
    hideCards();
    userName = nameInput.value;
    var user = {
        name: userName,
        score: points
    };
    scores.push(user);
    if (scores[1]) {
        scores.sort((a, b) => b.score - a.score);
    }
    localStorage.setItem("highscores", JSON.stringify(scores));
    highscoreCard.removeAttribute("hidden");
    renderHighScores();
}

function getName() {
    hideCards();
    nameCard.removeAttribute("hidden");
    nameBtn.addEventListener("click", highscore);
}

function endQuiz() {
    hideCards();
    scoreCard.removeAttribute("hidden");
    if (points > 23000) {
        endMsg.textContent = "Wow. I'd be lying if I said I was impressed, but you still did way better than I would've predicted. Nice job, I guess!";
    } else if (points > 7000) {
        endMsg.textContent = "Could've been worse, I guess. About the same level of competency I expect from Morty.";
    } else {
        endMsg.textContent = "Man, you're dumb. You might even be dumber than JERRY! What are you even doing here? Go learn some shit!"
    }
    score.textContent = points + "!";
    scoreBtn.addEventListener("click", getName);
}

init();
