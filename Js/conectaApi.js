async function listaProdutos() {
    const conexao = await fetch("http://localhost:3000/produtos");
    if (!conexao.ok) {
        throw new Error("Não foi possível listar os produtos.");
    }
    const conexaoconvertida = await conexao.json();
    return conexaoconvertida;
}

async function criaProduto(nome, preco, url) {
    const conexao = await fetch("https://api-storage-tiaw-7tn6ado8j-francisco-leandros-projects.vercel.app/produtos", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            nome: nome,
            preco: preco,
            imagem: url
        })
    });
    if (!conexao.ok) {
        throw new Error("Não foi possível enviar o produto.");
    }
    const conexaoconvertida = await conexao.json();
    return conexaoconvertida;
}

async function buscaProduto(termoDeBusca) {
    const conexao = await fetch(`http://localhost:3000/produtos?q=${termoDeBusca}`);
    if (!conexao.ok) {
        throw new Error("Não foi possível buscar o produto.");
    }
    const conexaoconvertida = await conexao.json();
    return conexaoconvertida;
}

export const conectaApi = {
    listaProdutos,
    criaProduto,
    buscaProduto
};
