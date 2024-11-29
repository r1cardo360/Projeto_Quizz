const question = document.querySelector('#question');
const answersBox = document.querySelector('#answers-box');
const quizzContainer = document.querySelector('#quizz-container');
const scoreContainer = document.querySelector('#score-container');
const letters = ['a', 'b', 'c', 'd'];
let points = 0;
let actualQuestion = 0;

//Perguntas

const questions = [
    {
        "question": "Qual é o Animal de Invocação do Naruto ?",
        "answers": [
            {
                "answer":"Pássaro",
                "correct": false
            },
            {
                "answer":"Raposa",
                "correct": false
            },
            {
                "answer":"Sapo",
                "correct": true
            },
            {
                "answer":"Cobra",
                "correct": false
            },

        ]
    },
    {
        "question": "Qual é o nume do Time de Naruto ?",
        "answers": [
            {
                "answer":"Time 10",
                "correct": false
            },
            {
                "answer":"Time 7",
                "correct": true
            },
            {
                "answer":"Time 5",
                "correct": false
            },
            {
                "answer":"Time 1",
                "correct": false
            },

        ]
    },
    {
        "question": "Qual o Jutso que o Naruto mais usa durante sua Jornada ?",
        "answers": [
            {
                "answer":"Chidori",
                "correct": false
            },
            {
                "answer":"Amaterasu",
                "correct": false
            },
            {
                "answer":"Rasengan",
                "correct": true
            },
            {
                "answer":"Charingan",
                "correct": false
            },

        ]
    },
    {
        "question": "Qual o nome da besta de caldas Selada dentro do naruto ?",
        "answers": [
            {
                "answer":"Shukaku",
                "correct": false
            },
            {
                "answer":"Isobu",
                "correct": false
            },
            {
                "answer":"Deidara",
                "correct": false
            },
            {
                "answer":"Kurama",
                "correct": true
            },

        ]
    },
    {
        "question": "Quem foi o Primeiro Hokage de Konoha",
        "answers": [
            {
                "answer":"Minato Namikaze",
                "correct": false
            },
            {
                "answer":"Hiruzen Sarutobi",
                "correct": false
            },
            {
                "answer":"Hashirama Senju",
                "correct": true
            },
            {
                "answer":"Tobirama Senju",
                "correct": false
            },

        ]
    },
    {
        "question": "Quem foi o mestre de Orochimaru antes dele se rebelar contra Konoha",
        "answers": [
            {
                "answer":"Jiraya",
                "correct": false
            },
            {
                "answer":"Hiruzen Sarutobi",
                "correct": true
            },
            {
                "answer":"Minato Namikaze",
                "correct": false
            },
            {
                "answer":"Tsunade",
                "correct": false
            },

        ]
    },
    {
        "question": "Qual o nome do Clan do qual Hinata e Neji Pertencem",
        "answers": [
            {
                "answer":"Uchiha",
                "correct": false
            },
            {
                "answer":"Namikaze",
                "correct": false
            },
            {
                "answer":"Naara",
                "correct": false
            },
            {
                "answer":"Hyuga",
                "correct": true
            },

        ]
    },

]

// Substituição do Quizz para a primeira pergunta
function init(){
    // Cria uma pergunta
    createQuestion(0);
}

function createQuestion(i){

    //limpar questão anterior
    const oldButtons = answersBox.querySelectorAll('button');

    oldButtons.forEach(function(btn){
        btn.remove();
    });

    //alterar o texto da pergunta
    const questionText = question.querySelector('#question-text');
    const questionNumber = question.querySelector('#question-number');

    questionText.textContent = questions[i].question;
    questionNumber.textContent = i + 1;

    //Insere as alternativas
    questions[i].answers.forEach(function(answer, i){

        //Cria o template do botão do Quizz
        const answerTemplate = document.querySelector('.answer-template').cloneNode(true);

        const letterBtn = answerTemplate.querySelector('.btn-letter');
        const answerText = answerTemplate.querySelector('.question-answer');

        letterBtn.textContent = letters[i];
        answerText.textContent = answer['answer']

        answerTemplate.setAttribute('correct-answer', answer['correct']);

        //Remove Hide e template class
        answerTemplate.classList.remove('hide');
        answerTemplate.classList.remove('answer-template');

        //inserir alternativa na tela
        answersBox.appendChild(answerTemplate);

        // Inserir evento de click no botão
        answerTemplate.addEventListener('click', function(){
            checkAnswer(this);
        });

    });

    // Incrementar o numero da questão 
    actualQuestion++;

}

// Verificando resposta do Usuário
function checkAnswer(btn){

    //seleciona todos os botões
    const buttons = answersBox.querySelectorAll('button');

    //verifica se a resposta está correta e adiciona classes aos botões
    buttons.forEach(function(button){

        if(button.getAttribute('correct-answer') === 'true'){

            button.classList.add('correct-answer');
            
            //checa se o usuário acertou a pergunta
            if(btn === button){
                // incremento dos pontos
                points++;
            }

        }else{
            
            button.classList.add('wrong-answer');
        
        }

    });

    //Exibir próxima pergunta
    nextQuestion()

}

// Exibe a próxima pergunta do quizz

function nextQuestion(){

    // timer para o Usuário ver as respostas 
    setTimeout(function(){

        // Verifica se ainda há perguntas
        if(actualQuestion >= questions.length){
            // menssagem de sucesso
            showSucessMessage();
            return;
        }

        createQuestion(actualQuestion);

    }, 2000);

}

// exibe a tela final
function showSucessMessage(){

    hideOrShowQuizz();

    //trocar dados da tela de sucesso

    //calcular o score
    const score = ((points / questions.length) * 100).toFixed(2);

    const displayScore = document.querySelector('#display-score span');

    displayScore.textContent = score.toString();

    // alterar o número de perguntas corretas

    const correctAnswers = document.querySelector('#correct-answers');
    correctAnswers.textContent = points;

    // alterar o total de perguntas
    
    const totalQuestions = document.querySelector('#question-qty');
    totalQuestions.textContent = questions.length;

}

//mostra ou esconde o scrore
function hideOrShowQuizz(){
    quizzContainer.classList.toggle('hide');
    scoreContainer.classList.toggle('hide');
}

//Reiniciar Quizz
const restartBtn = document.querySelector('#restart');

restartBtn.addEventListener('click', function(){
    
    //zerar jogo
    actualQuestion = 0;
    points = 0
    hideOrShowQuizz();
    init();

});

// inicialização do Quizz
init();

