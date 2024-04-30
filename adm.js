document.addEventListener('DOMContentLoaded', function() {
    const listaCartoes = document.getElementById('lista-cartoes');
    let contadorVerdeTotal = 0; // Variável para contar o número total de ícones marcados com verde

    // Função para obter a data e hora atual
    function getDataHoraAtual() {
        const dataHora = new Date();
        return dataHora.toLocaleString(); // Retornar data e hora formatadas
    }

    // Função para atualizar o contador de ícones verdes
    function atualizarContadorVerde() {
        contadorVerdeTotal = document.querySelectorAll('.acerto.preenchido').length;
        console.log(`Número de Cortes Realizados: ${contadorVerdeTotal}`);
    }

    // Função para exibir os cartões na lista do administrador
    function exibirCartoes() {
        // Limpar a lista de cartões antes de exibir os cartões atualizados
        listaCartoes.innerHTML = '';

        // Obter os cartões de fidelidade do localStorage ou inicializar uma lista vazia
        let cartoesFidelidade = JSON.parse(localStorage.getItem('cartoesFidelidade')) || [];

        // Iterar sobre cada cartão de fidelidade para criar elementos HTML correspondentes
        cartoesFidelidade.forEach((cartao, index) => {
            // Criar um elemento de lista para cada cartão de fidelidade
            const itemLista = document.createElement('li');
            itemLista.classList.add('cartao'); // Adicionar classe para estilização CSS
            itemLista.dataset.index = index; // Adicionar dataset com o índice do cartão

            // Criar um elemento de imagem para exibir a foto do cliente
            const fotoCliente = document.createElement('img');
            fotoCliente.src = cartao.foto; // Definir a origem da imagem como a URL da foto
            fotoCliente.alt = 'Foto do cliente'; // Definir um texto alternativo para acessibilidade
            fotoCliente.style.width = '100px'; // Definir a largura da foto
            itemLista.appendChild(fotoCliente); // Adicionar a foto ao item da lista

            // Adicionar o nome do cliente ao cartão
            const nomeCliente = document.createElement('p');
            nomeCliente.textContent = cartao.nome; // Adicionar o nome do cliente
            itemLista.appendChild(nomeCliente); // Adicionar o nome ao item da lista

            // Adicionar div para os acertos
            const divAcertos = document.createElement('div');
            divAcertos.classList.add('acertos'); // Adicionar classe para estilização CSS
            itemLista.appendChild(divAcertos); // Adicionar a div ao item da lista

            // Variável para contar os acertos
            let acertos = 0;

            // Adicionar ícones de acerto para marcar os acertos no cartão de fidelidade
            for (let i = 0; i < 5; i++) {
                const iconeAcerto = document.createElement('span');
                iconeAcerto.classList.add('acerto'); // Adicionar classe para estilização CSS
                if (cartao.registro && cartao.registro[i]) {
                    iconeAcerto.classList.add('preenchido'); // Adicionar classe para indicar que está marcado
                    acertos++;
                }
                iconeAcerto.addEventListener('click', function() {
                    if (!iconeAcerto.classList.contains('preenchido')) {
                        iconeAcerto.classList.add('preenchido'); // Adicionar a classe de preenchido ao clicar
                        acertos++; // Incrementar o número de acertos
                        if (acertos === 5) {
                            const dataHora = getDataHoraAtual(); // Obter a data e hora atuais
                            mensagemCartao.textContent = `Você ganhou um corte grátis! (${dataHora})`;
                        }
                        // Registrar a data e hora em que o ícone foi preenchido
                        if (!cartao.registro) {
                            cartao.registro = [];
                        }
                        cartao.registro[i] = getDataHoraAtual();
                    } else {
                        iconeAcerto.classList.remove('preenchido'); // Remover a classe de preenchido ao desmarcar
                        acertos--; // Decrementar o número de acertos
                        mensagemCartao.textContent = ''; // Limpar a mensagem do cartão
                        // Remover a data e hora do registro quando o ícone é desmarcado
                        cartao.registro[i] = null;
                    }

                    // Atualizar os acertos do cartão de fidelidade
                    cartao.acertos = acertos;

                    // Salvar os dados atualizados no localStorage
                    localStorage.setItem('cartoesFidelidade', JSON.stringify(cartoesFidelidade));

                    atualizarContadorVerde(); // Atualizar o contador de ícones verdes
                });
                divAcertos.appendChild(iconeAcerto); // Adicionar o ícone à div de acertos
            }

            // Adicionar mensagem para exibir corte grátis
            const mensagemCartao = document.createElement('p');
            mensagemCartao.classList.add('mensagem-cartao');
            itemLista.appendChild(mensagemCartao); // Adicionar a mensagem ao item da lista

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

        // Mostrar o número total de ícones marcados com verde
        console.log(`Número de Cortes Realizados: ${contadorVerdeTotal}`);
    }

    // Chamada inicial para exibir os cartões na lista do administrador
    exibirCartoes();
});
