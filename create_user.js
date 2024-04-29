// create_user.js
document.addEventListener('DOMContentLoaded', function() {
    const createUserForm = document.getElementById('create-user-form');

    createUserForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Evita o comportamento padrão de submissão do formulário

        // Captura os dados inseridos pelo usuário
        const username = document.getElementById('username').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        // Valida os dados do formulário (opcional)

        // Cria um objeto com os dados do usuário
        const newUser = {
            username: username,
            email: email,
            password: password
        };

        // Salva os dados do novo usuário em algum lugar (ex: localStorage)
        saveUser(newUser);

        // Redireciona para a tela de login ou exibe uma mensagem de confirmação
        window.location.href = 'login.html'; // Redireciona para a página de login
    });

    // Função para salvar os dados do usuário (exemplo usando localStorage)
    function saveUser(user) {
        // Obtém os usuários existentes do localStorage ou inicializa uma lista vazia
        const users = JSON.parse(localStorage.getItem('users')) || [];

        // Adiciona o novo usuário à lista de usuários
        users.push(user);

        // Salva a lista atualizada de usuários de volta no localStorage
        localStorage.setItem('users', JSON.stringify(users));
    }
});
