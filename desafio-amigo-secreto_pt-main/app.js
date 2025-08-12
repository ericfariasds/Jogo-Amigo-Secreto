let listaDeAmigos = [];

function atualizarLista() {
    const lista = document.getElementById("listaAmigos");
    lista.innerHTML = ""; // Limpa a lista antes de atualizar
    listaDeAmigos.forEach(amigo => {
        const li = document.createElement("li");
        li.textContent = amigo;
        lista.appendChild(li);
    });
}

function adicionarAmigo() {
    const amigo = document.getElementById("amigo").value;
    if (amigo) {
        listaDeAmigos.push(amigo);
        document.getElementById("amigo").value = "";
        atualizarLista();
    } else {
        alert("Por favor, insira o nome de amigo.");
    }
}

function sortearAmigo() {
    const resultado = document.getElementById("resultado");
    resultado.innerHTML = ""; // Limpa o resultado anterior

    if (listaDeAmigos.length === 0) {
        resultado.innerHTML = "<li>Adicione pelo menos um amigo para sortear.</li>";
        return;
    }

    const indiceSorteado = Math.floor(Math.random() * listaDeAmigos.length);
    const amigoSorteado = listaDeAmigos[indiceSorteado];

    const li = document.createElement("li");
    li.textContent = `Amigo sorteado: ${amigoSorteado}`;
    resultado.appendChild(li);

    // Limpa a lista de amigos e atualiza a exibição
    listaDeAmigos = [];
    atualizarLista();
}
// Permite adicionar amigo ao pressionar Enter no input
document.getElementById("amigo").addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        adicionarAmigo();
    }
});