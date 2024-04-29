document.addEventListener('DOMContentLoaded', function() {
    const createUserForm = document.getElementById('create-user-form');

    createUserForm.addEventListener('submit', function(event) {
        event.preventDefault();

        // Obter os dados do formulário
        const username = document.getElementById('username').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        // Aqui você pode enviar os dados do usuário para o servidor para criar a conta
        // Após criar a conta, você pode redirecionar o usuário para a tela de login
        // Neste exemplo, apenas imprimiremos os dados do usuário no console
        console.log('Novo usuário criado:');
        console.log('Nome de Usuário:', username);
        console.log('E-mail:', email);
        console.log('Senha:', password);

        // Redirecionar para a tela de login
        window.location.href = 'login.html';
    });
});
