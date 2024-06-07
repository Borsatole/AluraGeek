
var btn_guardar = document.querySelectorAll("button")[0]

btn_guardar.addEventListener("click",capturaFormulario)

function capturaFormulario(){
    var nome_input = document.querySelectorAll("input")[0].value
    var preco_input = Number(document.querySelectorAll("input")[1].value)
    var imagem_input = document.querySelectorAll("input")[2].value

    if (nome_input == "" || preco_input == "" ||imagem_input == "") {
        alert("Preencha os dados")
        return
    }

    const novoProduto = {
    'nome': nome_input,
    'preco': preco_input,
    'imagem': imagem_input
}

AddProduto(novoProduto)

}




async function AddProduto(produto) {
    const url = 'https://api-storage-tiaw-7tn6ado8j-francisco-leandros-projects.vercel.app/produtos';
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(produto)
    };

    try {
        const response = await fetch(url, options);
        if (response.ok) {
            console.log("Produto criado com sucesso");
            const jsonResponse = await response.json();
            console.log(jsonResponse);
        } else {
            console.log("Erro ao criar produto");
        }
    } catch (error) {
        console.log("Erro:", error);
    }
}

