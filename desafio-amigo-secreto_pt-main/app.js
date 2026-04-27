// Carrega a lista do localStorage ao iniciar a página
let listaDeAmigos = JSON.parse(localStorage.getItem("listaAmigos")) || [];

atualizarLista();

// Salvar no localStorage
function salvarLista() {
    localStorage.setItem("listaAmigos", JSON.stringify(listaDeAmigos));
}

// Atualiza a lista de amigos na interface
function atualizarLista() {
    const lista = document.getElementById("listaAmigos");
    lista.innerHTML = "";
 
    listaDeAmigos.forEach(amigo => {
        const li = document.createElement("li");
        li.textContent = amigo;
        lista.appendChild(li);
    });
}

// Adicionar amigo (Validar duplicados)
function adicionarAmigo() {
    const input = document.getElementById("amigo");
    const nome = input.value.trim();
 
    if (!nome) {
        alert("Por favor, insira o nome de um amigo.");
        return;
    }
 
    const nomeLower = nome.toLowerCase();
    const jaExiste = listaDeAmigos.some(a => a.toLowerCase() === nomeLower);
 
    if (jaExiste) {
        alert(`"${nome}" já foi adicionado à lista.`);
        input.value = "";
        return;
    }
 
    listaDeAmigos.push(nome);
    input.value = "";
    salvarLista();
    atualizarLista();
}

// Sortear todos os pares (sorteio completo)
function sortearAmigo() {
    const resultado = document.getElementById("resultado");
    resultado.innerHTML = "";
 
    if (listaDeAmigos.length < 2) {
        resultado.innerHTML = "<li>Adicione pelo menos 2 amigos para realizar o sorteio.</li>";
        return;
    }
 
    const pares = gerarPares(listaDeAmigos);
 
    pares.forEach(({ amigo, sorteado }) => {
        const li = document.createElement("li");
        li.textContent = `${amigo} → ${sorteado}`;
        resultado.appendChild(li);
    });
 
    // Adiciona o botão de reiniciar após o sorteio
    const btnReiniciar = document.createElement("button");
    btnReiniciar.textContent = "Novo sorteio";
    btnReiniciar.className = "button-restart";
    btnReiniciar.onclick = reiniciarJogo;
    resultado.appendChild(btnReiniciar);
}


// Gerar pares sem repetição
function gerarPares(lista) {

    const embaralhada = [...lista].sort(() => Math.random() - 0.5);

    return lista.map((amigo, i) => ({
        amigo,
        sorteado: embaralhada[(embaralhada.indexOf(amigo) + 1) % embaralhada.length]
    }));
}

// Reiniciar o jogo
function reiniciarJogo() {
    listaDeAmigos = [];
    salvarLista();
    atualizarLista();
    document.getElementById("resultado").innerHTML = "";
}

// Adicionar amigo ao pressionar Enter
document.getElementById("amigo").addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        adicionarAmigo();
    }
});