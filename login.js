// login.js
document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('login-form');

    loginForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Impede o envio do formulário padrão

        // Obter os valores dos campos de entrada
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        // Aqui você deve enviar uma solicitação para o servidor para autenticar o usuário
        // Vamos verificar se o usuário existe no localStorage e se a senha está correta
        const users = JSON.parse(localStorage.getItem('users')) || [];

        const user = users.find(user => user.username === username && user.password === password);

        if (user) {
            // Se as credenciais estiverem corretas, redirecione para a página de administração
            window.location.href = 'adm.html';
        } else {
            // Se as credenciais estiverem incorretas, exiba uma mensagem de erro
            alert('Credenciais inválidas. Tente novamente.');
        }
    });
});
