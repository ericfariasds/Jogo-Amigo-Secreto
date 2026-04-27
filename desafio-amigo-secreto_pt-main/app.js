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
 
    // Desabilita o botão durante a animação
    const btnSortear = document.querySelector(".button-draw");
    btnSortear.disabled = true;
 
    // Mensagem de embaralhando com animação de pontos
    const liAnimacao = document.createElement("li");
    liAnimacao.className = "animacao-sorteio";
    liAnimacao.textContent = "Embaralhando";
    resultado.appendChild(liAnimacao);
 
    let pontos = 0;
    const intervalo = setInterval(() => {
        pontos = (pontos + 1) % 4;
        liAnimacao.textContent = "Embaralhando" + ".".repeat(pontos);
    }, 300);
 
    // Após 2 segundos, para a animação e exibe os resultados
    setTimeout(() => {
        clearInterval(intervalo);
        resultado.innerHTML = "";
        btnSortear.disabled = false;
 
        const pares = gerarPares(listaDeAmigos);
 
        pares.forEach(({ amigo, sorteado }, index) => {
            const li = document.createElement("li");
            li.className = "resultado-par";
 
            // Ícone + destaque visual no nome sorteado
            li.innerHTML = `
                <span class="nome-dando">${amigo}</span>
                <span class="seta">→</span>
                <span class="nome-sorteado">${sorteado}</span>
            `;
 
            // Cada par aparece com um pequeno atraso (efeito cascata)
            li.style.animationDelay = `${index * 150}ms`;
            resultado.appendChild(li);
        });
 
        // Botão de reiniciar
        const btnReiniciar = document.createElement("button");
        btnReiniciar.textContent = "Novo sorteio";
        btnReiniciar.className = "button-restart";
        btnReiniciar.onclick = reiniciarJogo;
        resultado.appendChild(btnReiniciar);
 
    }, 2000);
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