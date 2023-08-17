function updateLocation(location) {
    const locationElement = document.getElementById('cidade');
    locationElement.textContent = location;
}

function getIPLocation() {
    const request = new XMLHttpRequest();
    request.open('GET', 'https://wtfismyip.com/json', true);

    request.onload = function () {
        if (request.status >= 200 && request.status < 400) {
            const data = JSON.parse(request.responseText);
            const location = data.YourFuckingLocation.replace(/\,.+/g, "$'");
            updateLocation(location);
        } else {
            updateLocation("Cidade Desconhecida");
        }
    };

    request.onerror = function () {
        updateLocation("Erro na requisição");
    };

    request.send();
}

getIPLocation();


    // Função para verificar se um ano é bissexto
    function isLeapYear(year) {
        return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
    }

    // Função para atualizar a data na mensagem
    function updateProgramDate() {
        const programDateElement = document.getElementById('data');

        // Obter a data atual no fuso horário do Brasil
        const brazilTimeZone = 'America/Sao_Paulo';
        const now = luxon.DateTime.local().setZone(brazilTimeZone);

        // Obter o mês e ano atual
        const currentMonth = now.month;
        const currentYear = now.year;

        // Definir o número máximo de dias para o mês atual
        let maxDays = 30; // A maioria dos meses tem 30 dias

        if (currentMonth === 2) { // Fevereiro
            maxDays = isLeapYear(currentYear) ? 29 : 28;
        } else if ([4, 6, 9, 11].includes(currentMonth)) { // Abril, Junho, Setembro, Novembro
            maxDays = 30;
        } else { // Meses com 31 dias
            maxDays = 31;
        }

        // Calcular a data final (maxDays dias a partir de agora)
        const endDate = now.plus({ days: maxDays });

        // Formatar a data no formato desejado
        const formattedEndDate = endDate.toFormat('dd/MM/yyyy');

        programDateElement.textContent = formattedEndDate;
    }

    // Chama a função para atualizar a data assim que a página carregar
    window.addEventListener('load', updateProgramDate);


    
function toggleLike(button) {
    const likeCount = button.nextElementSibling;
    let count = parseInt(likeCount.textContent);

    if (button.classList.contains('liked')) {
        // Se o botão já estiver com a classe 'liked', diminuir a contagem
        button.classList.remove('liked');
        count--;
    } else {
        // Caso contrário, aumentar a contagem e adicionar a classe 'liked' para a animação
        button.classList.add('liked');
        count++;
    }

    likeCount.textContent = count;
}


// Função para gerar um número aleatório entre min e max
function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Função para definir o número de curtidas como 0 para respostas enviadas
function submitReply(event, button) {

    // Definir o número de curtidas como 0 para respostas enviadas
    const likeCount = replyContainer.querySelector('.like-count');
    likeCount.textContent = '0';

}

// Função para atualizar o contador de curtidas aleatoriamente para os comentários
function updateRandomLikes() {
    const likeCountElements = document.querySelectorAll('.like-count');
    likeCountElements.forEach((likeCount) => {
        const randomLikes = getRandomNumber(0, 96);
        likeCount.textContent = randomLikes;
    });
}

// Chamar a função para definir o número inicial de curtidas aleatoriamente
updateRandomLikes();


function toggleReplyForm(button) {
    const comment = button.closest('.comment');
    const replyForm = comment.querySelector('.reply-form');

    if (replyForm.style.display === 'none' || replyForm.style.display === '') {
        replyForm.style.display = 'block';
    } else {
        replyForm.style.display = 'none';
    }
}

function submitReply(event, button) {
    event.preventDefault();

    const replyForm = button.parentElement;
    const comment = replyForm.parentElement.parentElement;
    const replyInput = replyForm.querySelector('.reply-input');
    const reply = replyInput.value.trim();



    if (reply !== '') {
        // Adiciona a classe .sending ao botão
        button.classList.add('sending');

        // Altera o texto do botão para "Enviando..."
        button.textContent = 'Enviou';

        // Simulação de envio (1,5 segundos)
        setTimeout(() => {
            const replyContainer = document.createElement('div');
            replyContainer.classList.add('comment', 'reply',);
            replyContainer.innerHTML = `
        <img src="img/avatar.jpg" alt="User" class="avatar"> <!-- Alteração aqui -->
        <div class="comment-details">
          <span class="user-name">Você Respondeu</span>
          <span class="comment-text">${reply}</span>
          <span class="timestamp">Agora</span>
          <button class="like-btn" onclick="toggleLike(this)">Curtir</button>
          <span class="like-count">0</span>
          <button class="reply-btn" onclick="toggleReplyForm(this)">Responder</button>
          <form class="reply-form">
            <input type="text" placeholder="Digite sua resposta..." class="reply-input">
            <button class="submit-reply-btn" onclick="submitReply(event, this)">Enviar</button>
          </form>
        </div>
      `;

            comment.parentNode.insertBefore(replyContainer, comment.nextElementSibling);

            replyInput.value = '';
            replyForm.style.display = 'none';
            updateCommentCount(); // Atualiza o contador de comentários

            // Remove a classe .sending após o envio ser concluído (1 segundo)
            setTimeout(() => {
                button.classList.remove('sending');
                button.textContent = 'Enviar'; // Retorna o texto do botão para "Enviar"
            }, 1000);
        }, 1500); // Tempo total de animação (envio + atraso de 1 segundo)
    }
}


// Função para contar o número de comentários
function updateCommentCount() {
    const commentCountElement = document.getElementById('commentCount');
    const comments = document.querySelectorAll('.comment, .reply');
    const commentCount = comments.length;
    commentCountElement.textContent = commentCount + (commentCount === 1 ? ' Comentário' : ' Comentários');
}

// Adicionar o ouvinte de evento para o envio do formulário
const replyForms = document.querySelectorAll('.reply-form');
replyForms.forEach(form => {
    form.addEventListener('submit', submitReply);
});

// Chamar a função para atualizar o contador inicialmente
updateCommentCount();




function toggleFollow(button) {
    const userName = button.parentElement.querySelector('.user-name').textContent;
    const followButtons = document.querySelectorAll('.follow-btn');

    followButtons.forEach((btn) => {
        const user = btn.parentElement.querySelector('.user-name').textContent;
        if (user === userName) {
            if (btn.getAttribute('data-following') === 'true') {
                btn.textContent = 'Seguir';
                btn.setAttribute('data-following', 'false');
                btn.classList.remove('following-btn'); // Remover a classe "following-btn"
                showUnfollowMessage(userName);
            } else {
                btn.textContent = 'Seguindo';
                btn.setAttribute('data-following', 'true');
                btn.classList.add('following-btn'); // Adicionar a classe "following-btn"
                showFollowMessage(userName);
            }
        }
    });
}

function showFollowMessage(userName) {
    const followMessage = document.querySelector('.follow-message');
    const followedUser = followMessage.querySelector('.followed-user');
    followedUser.textContent = userName;
    followMessage.style.display = 'block';
    setTimeout(() => {
        followMessage.style.display = 'none';
    }, 3000);
}

function showUnfollowMessage(userName) {
    const unfollowMessage = document.querySelector('.unfollow-message');
    const unfollowedUser = unfollowMessage.querySelector('.unfollowed-user');
    unfollowedUser.textContent = userName;
    unfollowMessage.style.display = 'block';
    setTimeout(() => {
        unfollowMessage.style.display = 'none';
    }, 3000);
}




function submitMainComment() {
    const mainCommentInput = document.getElementById('mainCommentInput');
    const commentText = mainCommentInput.value.trim();

    if (commentText !== '') {
        // Adiciona a classe .sending ao botão
        const button = mainCommentInput.nextElementSibling;
        button.classList.add('sending');

        // Altera o texto do botão para "Enviando..."
        button.textContent = 'Enviando...';

        // Simulação de envio (1,5 segundos)
        setTimeout(() => {
            const newComment = createComment('Você', commentText, 'Agora', 0);
            const commentsContainer = document.querySelector('.comments');
            const firstComment = commentsContainer.querySelector('.comment');

            commentsContainer.insertBefore(newComment, firstComment);

            mainCommentInput.value = '';
            updateCommentCount(); // Atualiza o contador de comentários


            button.classList.remove('sending');
            button.textContent = 'Publicar'; // Retorna o texto do botão para "Enviar"
        }, 1500); // Tempo total de animação (envio + atraso de 1 segundo)
    }
}

function createComment(userName, commentText, timestamp, likeCount) {
    const comment = document.createElement('div');
    comment.classList.add('comment');

    const commentContent = `
        <img src="img/avatar.jpg" alt="User" class="avatar">
        <div class="comment-details">
            <span class="user-name">${userName}</span>
            <span class="comment-text">${commentText}</span>
            <span class="timestamp">${timestamp}</span>
            <button class="like-btn" onclick="toggleLike(this)">Curtir</button>
            <span class="like-count">${likeCount}</span>
            <button class="reply-btn" onclick="toggleReplyForm(this)">Responder</button>
            <button class="delete-btn" onclick="deleteComment(this)">Excluir</button>
            <form class="reply-form">
                <input type="text" placeholder="Digite sua resposta..." class="reply-input">
                <button class="submit-reply-btn" onclick="submitReply(event, this)">Enviar</button>
            </form>
        </div>
    `;

    comment.innerHTML = commentContent;

    return comment;
}

function deleteComment(button) {
    const comment = button.closest('.comment');
    const commentsContainer = document.querySelector('.comments');
    commentsContainer.removeChild(comment);

    updateCommentCount(); 
}

// Lista de nomes de usuários falsos para as notificações
const users = [
    "João Silva",
    "Maria Oliveira",
    "Pedro Santos",
    "Ana Souza",
    "Lucas Almeida",
    "Carla Rodrigues",
    "Paulo Gomes",
    "Mariana Lima",
    "Fernando Costa",
    "Amanda Castro",
    "Rafael Pereira",
    "Juliana Ferreira",
    "Gustavo Cardoso",
    "Larissa Martins",
    "Marcos Oliveira",
    "Camila Dias",
    "Diego Silva",
    "Patrícia Rodrigues",
    "Marcelo Santos",
    "Luana Xavier",
    "Kayk Batista",
    "Yuri Marcos",
    "Hugo Costa",

];

const usedUsers = [];


const products = [
    "Produto",
    "Produto",

];

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function showNotification() {
    if (usedUsers.length === users.length) {
        console.log("Todos os nomes foram utilizados. Parando de enviar notificações.");
        return;
    }

    const notificationsContainer = document.querySelector(".notifications");
    const availableUsers = users.filter(user => !usedUsers.includes(user));
    const randomUser = availableUsers[getRandomInt(0, availableUsers.length - 1)];
    const randomProduct = products[getRandomInt(0, products.length - 1)];

    const notification = document.createElement("div");
    notification.classList.add("notification");
    notification.innerHTML = `
        <img src="img/avatar.jpg" alt="User">
        <div class="notification-content">
            <p><strong>${randomUser}</strong> comprou o <strong>${randomProduct}</strong>!</p>
            <p>Há alguns segundos atrás</p>
        </div>
    `;

    notificationsContainer.appendChild(notification);

    setTimeout(() => {
        notification.classList.add("show-notification");
    }, 10);

    setTimeout(() => {
        notification.classList.remove("show-notification");
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 5000);

    usedUsers.push(randomUser);
}

const waitTime = 360000;
let timer = setTimeout(() => {
    showNotification();
    setInterval(showNotification, 10000);
}, waitTime);


// Obter o elemento do botão
const meuBotao = document.getElementById("meuBotao");

// Tornar o botão invisível inicialmente
meuBotao.style.display = "none";

// Função para tornar o botão visível após 5 segundos
function mostrarBotao() {
    meuBotao.style.display = "inline-block";
}

// Definir um atraso de milissegundos antes de chamar a função para tornar o botão visível
setTimeout(mostrarBotao, 360000);





// Redirecionar o usuário para a página de destino
function redirectToDestination() {
    window.location.replace("/");
}

// Exibir mensagem informativa
function showInfoMessage() {
    const message = "SKIN IN THE GAME";

    // Criar a caixa de mensagem e o conteúdo
    const messageBox = document.createElement("div");
    messageBox.classList.add("message-box");

    const messageContent = document.createElement("div");
    messageContent.classList.add("message-content");
    messageContent.textContent = message;

    // Adicionar conteúdo à caixa de mensagem
    messageBox.appendChild(messageContent);

    // Adicionar a caixa de mensagem ao body
    document.body.appendChild(messageBox);

    // Redirecionar após 2 segundos
    setTimeout(() => {
        redirectToDestination();
    }, 2000);
}

// Tentar bloquear a inspeção da página
// Desabilitar o atalho Ctrl+Shift+I
document.addEventListener("keydown", function (event) {
    if (event.ctrlKey && event.shiftKey && event.keyCode === 73) {
        event.preventDefault();
    }
});

// Bloquear o menu de contexto
document.addEventListener("contextmenu", function (event) {
    event.preventDefault();
});

// Bloquear acesso ao código-fonte
document.onkeydown = function (event) {
    if (event.ctrlKey && (event.keyCode === 85 || event.keyCode === 83)) {
        showInfoMessage();
        return false; // Retorne false para evitar que a ação padrão ocorra
    }
};

// Bloquear atalho para inspecionar elemento
document.addEventListener("keydown", function (event) {
    if (event.ctrlKey && event.altKey && event.keyCode === 67) {
        event.preventDefault();
    }
});


window.addEventListener("contextmenu", function (event) {
    event.preventDefault();
    redirectToOtherPage();
});

window.addEventListener("keydown", function (event) {
    if (event.ctrlKey && event.shiftKey && event.keyCode == 73) {
        event.preventDefault();
        redirectToOtherPage();
    }
});



