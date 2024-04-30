document.addEventListener('DOMContentLoaded', function() {
    const cartaoInfo = document.getElementById('cartao-info');
    const inputNome = document.getElementById('input-nome');
    const btnPesquisar = document.getElementById('btn-pesquisar');

    btnPesquisar.addEventListener('click', function() {
        // Limpar o conteúdo anterior das informações do cartão
        cartaoInfo.innerHTML = '';

        // Obter o nome pesquisado em minúsculas
        const nomePesquisado = inputNome.value.trim().toLowerCase();

        // Obter os dados dos cartões de fidelidade do localStorage
        const cartoesFidelidade = JSON.parse(localStorage.getItem('cartoesFidelidade')) || [];

        // Procurar os cartões que correspondem ao nome pesquisado
        const cartoesEncontrados = cartoesFidelidade.filter(cartao => {
            // Obter o primeiro nome do cartão em minúsculas
            const primeiroNomeCartao = cartao.nome.split(' ')[0].toLowerCase();
            // Verificar se o primeiro nome do cartão começa com a letra pesquisada
            return primeiroNomeCartao.startsWith(nomePesquisado) || cartao.nome.toLowerCase().startsWith(nomePesquisado);
        });

        // Verificar se algum cartão foi encontrado
        if (cartoesEncontrados.length > 0) {
            // Iterar sobre os cartões encontrados e exibir suas informações
            cartoesEncontrados.forEach(cartao => {
                // Criar um elemento de cartão para exibir as informações do cartão
                const cartaoItem = document.createElement('div');
                // Adicionar classe para estilização
                cartaoItem.classList.add('cartao-item');
                
                // Criar uma imagem para exibir a foto do cliente
                const fotoCliente = document.createElement('img');
                fotoCliente.src = cartao.foto; // Definir a origem da imagem como a URL da foto
                fotoCliente.alt = 'Foto do cliente'; // Definir um texto alternativo para acessibilidade
                fotoCliente.style.width = '100px'; // Definir a largura da foto para 150px (tamanho de uma foto de perfil)
                fotoCliente.style.height = '75px'; // Definir a altura da foto para 112px (aspect ratio de 4x3)
                // Adicionar a imagem ao cartão
                cartaoItem.appendChild(fotoCliente);
                
                // Criar parágrafo para exibir o nome do cliente
                const nomeParagrafo = document.createElement('p');
                nomeParagrafo.textContent = `Nome: ${cartao.nome}`;
                // Adicionar o parágrafo ao cartão
                cartaoItem.appendChild(nomeParagrafo);
                
                // Adicionar div para os acertos
                const divAcertos = document.createElement('div');
                divAcertos.classList.add('acertos'); // Adicionar classe para estilização CSS
                // Adicionar a div ao item do cartão
                cartaoItem.appendChild(divAcertos);

                // Contar o número de acertos (ícones preenchidos)
                let acertos = cartao.acertos || 0;

                // Adicionar ícones de acerto para marcar os acertos no cartão de fidelidade
                for (let i = 0; i < 5; i++) {
                    const iconeAcerto = document.createElement('span');
                    iconeAcerto.classList.add('acerto'); // Adicionar classe para estilização CSS
                    if (i < acertos) {
                        iconeAcerto.classList.add('preenchido'); // Adicionar classe para indicar que está marcado
                    }
                    // Adicionar o ícone à div de acertos
                    divAcertos.appendChild(iconeAcerto);
                }

                // Adicionar o cartão à lista de informações de cartões
                cartaoInfo.appendChild(cartaoItem);
            });
        } else {
            // Se nenhum cartão foi encontrado, exibir uma mensagem indicando que nenhum cartão corresponde à pesquisa
            cartaoInfo.innerHTML = '<p>Nenhum cartão encontrado. Verifique o nome digitado.</p>';
        }
    });
});
