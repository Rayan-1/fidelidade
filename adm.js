// adm.js (JavaScript do administrador)
document.addEventListener('DOMContentLoaded', function() {
    const listaCartoes = document.getElementById('lista-cartoes');

    // Função para exibir os cartões na lista do administrador
    function exibirCartoes() {
        // Limpar a lista de cartões antes de exibir os cartões atualizados
        listaCartoes.innerHTML = '';

        // Obter os cartões de fidelidade do localStorage ou inicializar uma lista vazia
        const cartoesFidelidade = JSON.parse(localStorage.getItem('cartoesFidelidade')) || [];

        // Iterar sobre cada cartão de fidelidade para criar elementos HTML correspondentes
        cartoesFidelidade.forEach((cartao, index) => {
            // Criar um elemento de lista para cada cartão de fidelidade
            const itemLista = document.createElement('li');

            // Criar um elemento de imagem para exibir a foto do cliente
            const fotoCliente = document.createElement('img');
            fotoCliente.src = cartao.foto; // Definir a origem da imagem como a URL da foto
            fotoCliente.alt = 'Foto do cliente'; // Definir um texto alternativo para acessibilidade
            fotoCliente.style.width = '100px'; // Definir a largura da foto para 150px (tamanho de uma foto de perfil)
            fotoCliente.style.height = 'auto'; // Definir a altura da foto para 112px (aspect ratio de 4x3)
            itemLista.appendChild(fotoCliente); // Adicionar a imagem ao item da lista

            // Adicionar texto com os detalhes do cartão de fidelidade (nome e número de carimbos)
            const textoDetalhes = document.createElement('span');
            textoDetalhes.textContent = `Nome: ${cartao.nome} - Carimbos: ${cartao.carimbos}`;
            itemLista.appendChild(textoDetalhes); // Adicionar o texto ao item da lista

            // Verificar se o cartão de fidelidade possui 5 ou mais carimbos
            if (cartao.carimbos >= 5) {
                // Se o cartão tiver 5 ou mais carimbos, exibir "Gratuito" em verde
                const textoGratuito = document.createElement('span');
                textoGratuito.textContent = ' - Gratuito';
                textoGratuito.style.color = 'green';
                itemLista.appendChild(textoGratuito); // Adicionar o texto ao item da lista

                // Adicionar botão para zerar os carimbos
                const btnZerarCarimbos = document.createElement('button');
                btnZerarCarimbos.textContent = 'Zerar Carimbos';
                btnZerarCarimbos.addEventListener('click', function() {
                    // Zerar os carimbos do cartão de fidelidade
                    cartao.carimbos = 0;

                    // Atualizar a lista de cartões de fidelidade
                    exibirCartoes();

                    // Atualizar os dados salvos no localStorage
                    localStorage.setItem('cartoesFidelidade', JSON.stringify(cartoesFidelidade));
                });
                itemLista.appendChild(btnZerarCarimbos); // Adicionar o botão ao item da lista
            } else {
                // Se o cartão de fidelidade tiver menos de 5 carimbos, adicionar botão para marcar carimbo
                const btnMarcarCarimbo = document.createElement('button');
                btnMarcarCarimbo.textContent = 'Marcar Carimbo';
                btnMarcarCarimbo.addEventListener('click', function() {
                    // Incrementar o número de carimbos do cartão de fidelidade
                    cartao.carimbos++;

                    // Atualizar a lista de cartões de fidelidade
                    exibirCartoes();

                    // Atualizar os dados salvos no localStorage
                    localStorage.setItem('cartoesFidelidade', JSON.stringify(cartoesFidelidade));
                });
                itemLista.appendChild(btnMarcarCarimbo); // Adicionar o botão ao item da lista
            }

            // Adicionar botão para excluir o cartão
            const btnExcluirCartao = document.createElement('button');
            btnExcluirCartao.textContent = 'Excluir';
            btnExcluirCartao.addEventListener('click', function() {
                // Remover o cartão da lista de cartões de fidelidade
                cartoesFidelidade.splice(index, 1);

                // Atualizar a lista de cartões de fidelidade
                exibirCartoes();

                // Atualizar os dados salvos no localStorage
                localStorage.setItem('cartoesFidelidade', JSON.stringify(cartoesFidelidade));
            });
            itemLista.appendChild(btnExcluirCartao); // Adicionar o botão ao item da lista

            // Adicionar o elemento de lista à lista de cartões
            listaCartoes.appendChild(itemLista);
        });
    }

    // Chamada inicial para exibir os cartões na lista do administrador
    exibirCartoes();
});
