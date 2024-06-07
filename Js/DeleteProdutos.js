
async function deleteProduto(id) {
    const url = `https://api-storage-tiaw-7tn6ado8j-francisco-leandros-projects.vercel.app/produtos/${id}`;
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