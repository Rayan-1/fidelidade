document.addEventListener('DOMContentLoaded', function() {
    const formCriarCartao = document.getElementById('form-criar-cartao');
    const inputFoto = document.getElementById('input-foto');
    const previewFoto = document.getElementById('preview-foto');

    formCriarCartao.addEventListener('submit', function(event) {
        event.preventDefault();

        // Obtém os dados do formulário
        const nome = document.getElementById('nome').value;

        // Lógica para obter a foto do cliente
        const file = inputFoto.files[0]; // Obter o arquivo de imagem selecionado pelo usuário

        // Verificar se o usuário selecionou uma foto
        if (file && file.type.startsWith('image/')) {
            const reader = new FileReader();

            // Definir uma função para ser executada quando a leitura do arquivo estiver concluída
            reader.onload = function(event) {
                // Criar um elemento de imagem para exibir a foto
                const img = document.createElement('img');
                img.src = event.target.result; // Definir a URL da foto como a URL do arquivo lido
                img.alt = 'Foto do cliente';

                // Limpar qualquer conteúdo anterior do div de pré-visualização e adicionar a nova imagem
                previewFoto.innerHTML = '';
                previewFoto.appendChild(img);

                // Cria um novo cartão de fidelidade com a foto
                const novoCartao = {
                    nome: nome,
                    foto: event.target.result, // URL da foto do cliente
                    carimbos: 0 // Novo cliente começa com 0 carimbos
                };

                // Recupera os cartões de fidelidade existentes ou inicializa um array vazio
                const cartoesFidelidade = JSON.parse(localStorage.getItem('cartoesFidelidade')) || [];

                // Adiciona o novo cartão à lista de cartões de fidelidade
                cartoesFidelidade.push(novoCartao);

                // Salva a lista atualizada de cartões de fidelidade no armazenamento local
                localStorage.setItem('cartoesFidelidade', JSON.stringify(cartoesFidelidade));

                // Redireciona para a página do administrador (adm.html) após criar o cartão
                //window.location.href = 'adm.html';
                console.log = 'Cartão Criado com sucesso!';
            };

            // Ler o arquivo como uma URL de dados
            reader.readAsDataURL(file);
        } else {
            // Se nenhum arquivo de imagem foi selecionado, criar um cartão de fidelidade sem foto
            const novoCartao = {
                nome: nome,
                foto: '', // URL vazia, já que não há foto selecionada
                carimbos: 0 // Novo cliente começa com 0 carimbos
            };

            // Recupera os cartões de fidelidade existentes ou inicializa um array vazio
            const cartoesFidelidade = JSON.parse(localStorage.getItem('cartoesFidelidade')) || [];

            // Adiciona o novo cartão à lista de cartões de fidelidade
            cartoesFidelidade.push(novoCartao);

            // Salva a lista atualizada de cartões de fidelidade no armazenamento local
            localStorage.setItem('cartoesFidelidade', JSON.stringify(cartoesFidelidade));

            // Redireciona para a página do administrador (adm.html) após criar o cartão
            window.location.href = 'adm.html';
        }
    });
});
