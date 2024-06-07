import { conectaApi } from "./conectaApi.js";
const lista = document.querySelector("#local_insere_cards");

export default function constroiCard(nome, preco, imagem, id) {
    const card = document.createElement("div");
    card.className = "card_produto"
    card.dataset.id = id;

    card.innerHTML = `
        <section class="bgimg"></section>
        <h3 class="nome_produto">${nome}</h3>
        <section class="precoELixeira">
        <h4 class="preco">$ ${preco}</h4>
        <img src="images/lixeira.png" class="img_lixeira" id="delete">
        </section>
    `;

    // Após inserir o HTML, altere a imagem de fundo da seção bgimg
    const bgimgSection = card.querySelector('.bgimg');
    const validImageExtensions = ['.jpg', '.jpeg', '.png', '.gif'];

    function isValidImageURL(url) {
        return validImageExtensions.some(extension => url.toLowerCase().endsWith(extension));
    }

    if (imagem == null || imagem == "" || !isValidImageURL(imagem)) {
        bgimgSection.style.backgroundImage = `url('images/sem-foto.gif')`;
    } else {
        bgimgSection.style.backgroundImage = `url('${imagem}')`;
    }
    

    // Adicionar evento de clique na lixeira
    const lixeira = card.querySelector("#delete");
    lixeira.addEventListener("click", () => deleteProduto(id));

    return card;
}

async function listaProdutos() {
    try {
        const listaApi = await conectaApi.listaProdutos();
        listaApi.forEach(elemento => lista.appendChild(
            constroiCard(elemento.nome, elemento.preco, elemento.imagem, elemento.id)
        ));
    } catch (error) {
        lista.innerHTML = `<h2 class="mensagem__titulo">Não foi possível carregar a lista de produtos</h2>`;
    }
}

listaProdutos();

async function deleteProduto(id) {
    const url = `https://api-storage-tiaw-mu.vercel.app/produtos/${id}`;
    const options = {
        method: 'DELETE'
    };

    try {
        const response = await fetch(url, options);
        if (response.ok) {
            console.log("Produto deletado com sucesso");
            // Remover o card do DOM
            cardElement.remove();
        } else {
            console.error("Erro ao deletar o produto");
        }
    } catch (error) {
        console.error("Erro:", error);
    }
}