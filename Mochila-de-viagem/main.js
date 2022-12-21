const form = document.querySelector('[data-adicionar]');
const itens = JSON.parse(localStorage.getItem('itens')) || [];
const limpar = document.querySelector('[data-limpar]');

itens.forEach(element => {
    criarElementos(element)
});


function limparConteudo() {
    localStorage.clear()
    location.reload()
    console.log('Dados apagados')
}


form.addEventListener('submit', (evento)=>{
    evento.preventDefault();

    const nome = evento.target.elements['nome'];
    const qtd = evento.target.elements['quantidade'];
    const existe = itens.find(elemento => elemento.nome === nome.value)

    const itemAtual = {
        'nome': nome.value,
        'quantidade': quantidade.value
    };
    
    if (existe) {
        itemAtual.id = existe.id;
        atualizaElemento(itemAtual);
        itens[itens.findIndex(elemento => elemento.id === existe.id)] = itemAtual
    }
    else {
        itemAtual.id = itens[itens.length - 1] ? (itens[itens.length-1]).id + 1 : 0;
        criarElementos(itemAtual)
        itens.push(itemAtual);


    } 
    localStorage.setItem('itens', JSON.stringify(itens));
    nome.value = '';
    qtd.value='';
})

function criarElementos(item){
    const novoItem = document.createElement('li');
    novoItem.classList.add('item');
    
    const numeroItem = document.createElement('strong');
    numeroItem.innerHTML = item.quantidade;
    numeroItem.dataset.id = item.id
    novoItem.appendChild(numeroItem);

    novoItem.innerHTML += item.nome;
    
    const lista = document.querySelector('[data-lista]');

    novoItem.appendChild(botaoDeleta(item.id))

    lista.appendChild(novoItem);


}

function atualizaElemento(item){
    document.querySelector("[data-id='"+item.id+"']").innerHTML = item.quantidade
}

function botaoDeleta(id){
    const elementoBotao = document.createElement("button");
    elementoBotao.innerText = "X";
    elementoBotao.classList.add('apagarElemento')
    elementoBotao.addEventListener('click', function () {
        deletaElemento(this.parentNode), id;
    })
    return elementoBotao

}

function deletaElemento(tag, id){
    tag.remove();
    const index = itens.findIndex(elemento=> elemento.id === id)
    itens.splice(index, 1)

    localStorage.setItem('itens', JSON.stringify(itens))
}