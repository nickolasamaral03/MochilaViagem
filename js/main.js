const form = document.getElementById('novoItem')
const lista = document.getElementById('Lista')

const itens = JSON.parse(localStorage.getItem('itens')) || []

itens.forEach((elemento) => {
    criaElemento(elemento)
})

form.addEventListener('submit', (evento) => {
    evento.preventDefault()

    const quantidade = evento.target.elements['quantidade']
    const nome = evento.target.elements['nome']

    const itemAtual = {
        'nome': nome.value,
        'quantidade' : quantidade.value
    }

    const existe = itens.find(elemento => elemento.nome === nome.value)

    if(existe){
        itemAtual.id = existe.id //Se o item add é igual ao atual
        
        atualizaElemento(itemAtual) //Vai atualizar no browser 

        itens[itens.findIndex(elemento => elemento.id === existe.id)] = itemAtual  //Vai atualizar no local storage

    }else{
        itemAtual.id = itens[itens.length -1] ? (itens[itens.length-1]).id + 1 : 0;

        criaElemento(itemAtual) //Pegando 'objetos'
        
        itens.push(itemAtual) //Inserindo em nosso array
    }

    localStorage.setItem('itens', JSON.stringify(itens)) //Adicionando no LocalStorage

    nome.value = ""
    quantidade.value = ""
}) 

function criaElemento(item){
const novoItem = document.createElement('li')
novoItem.classList.add('item')

const numeroItem = document.createElement('strong')
numeroItem.innerHTML = item.quantidade
numeroItem.dataset.id = item.id

novoItem.appendChild(numeroItem)
novoItem.innerHTML += item.nome

novoItem.appendChild(botaoDeleta(item.id))

lista.appendChild(novoItem)
}

function atualizaElemento(item){
    document.querySelector("[data-id= '"+item.id+"']").innerHTML = item.quantidade
}

function botaoDeleta(id){
    const elementoBotao = document.createElement('button')
    elementoBotao.innerText = "X"

    elementoBotao.addEventListener('click', function() {
        deleteElemento(this.parentNode, id)
    })

    return elementoBotao
}

function deleteElemento(tag, id){
    tag.remove()

    itens.splice(itens.findIndex(elemento => elemento.id === id))
    
    localStorage.setItem('itens', JSON.stringify(itens))

   
}


    


