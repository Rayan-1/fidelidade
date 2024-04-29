document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('login-form');

    loginForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Impede o envio do formulário padrão

        // Obter os valores dos campos de entrada
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        // Aqui você deve enviar uma solicitação para o servidor para autenticar o usuário
        // Por simplicidade, vamos apenas verificar se o usuário é "admin" e a senha é "senha123"
        if (username === 'admin' && password === 'senha123') {
            // Se as credenciais estiverem corretas, redirecione para a página de administração
            window.location.href = 'adm.html';

            // Você também pode definir uma entrada no localStorage para indicar que o usuário está autenticado
            // localStorage.setItem('auth', 'true');
        } else {
            // Se as credenciais estiverem incorretas, exiba uma mensagem de erro
            alert('Credenciais inválidas. Tente novamente.');
        }
    });
});
