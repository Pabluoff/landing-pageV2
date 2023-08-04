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
    const comment = replyForm.parentElement;
    const commentDetails = comment.querySelector('.comment-details');
    const replyInput = replyForm.querySelector('.reply-input');
    const reply = replyInput.value.trim();



    if (reply !== '') {
        // Adiciona a classe .sending ao botão
        button.classList.add('sending');

        // Altera o texto do botão para "Enviando..."
        button.textContent = 'Enviando...';

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

// Lista de produtos falsos
const products = [
    "Produto",
    "Produto",

];

// Função para gerar um número aleatório entre min e max (inclusive)
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Função para exibir notificação falsa de venda
function showNotification() {
    const notificationsContainer = document.querySelector(".notifications");
    const randomUser = users[getRandomInt(0, users.length - 1)];
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

    // Adicionar classe para animação de entrada
    setTimeout(() => {
        notification.classList.add("show-notification");
    }, 10); // Adiciona a classe após 10 milissegundos

    // Remover a notificação após alguns segundos
    setTimeout(() => {
        notification.classList.remove("show-notification");
        // Aguardar a animação terminar e, em seguida, remover o elemento
        setTimeout(() => {
            notification.remove();
        }, 300); // Remover a notificação após 0.3 segundos (300 milissegundos)
    }, 5000); // Mostrar a notificação por 5 segundos (5000 milissegundos)
}

// Definir tempo de espera em milissegundos (2 minutos = 120000 milissegundos)
const waitTime = 120000;

// Contador de tempo para mostrar a notificação após 2 minutos
let timer = setTimeout(() => {
    showNotification();
    // Executar a função showNotification a cada 10 segundos
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

// Definir um atraso de 20 minutos (1200000 milissegundos) antes de chamar a função para tornar o botão visível
setTimeout(mostrarBotao, 5000);





// Redirecionar o usuário para a página de destino
function redirectToDestination() {
    window.location.replace("https://www.instagram.com/pabluoff/");
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

function redirectToOtherPage() {
    window.location.replace("");
}

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
