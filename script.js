const modal = document.querySelector('.modal-container')
const tbody = document.querySelector('tbody')
const sProduto = document.querySelector('#m-produto')
const sPreco = document.querySelector('#m-preco')
const sLink = document.querySelector('#m-link')
const sLucro = document.querySelector('#m-lucro')
const btnSalvar = document.querySelector('#btnSalvar')

let itens
let id

function openModal(edit = false, index = 0) {
  modal.classList.add('active')

  modal.onclick = e => {
    if (e.target.className.indexOf('modal-container') !== -1) {
      modal.classList.remove('active')
    }
  }

  if (edit) {
    sProduto.value = itens[index].produto
    sPreco.value = itens[index].preco
    sLink.value = itens[index].link
    sLucro.value = itens[index].lucro
    id = index
  } else {
    sProduto.value = ''
    sPreco.value = ''
    sLink.value = ''
    sLucro.value = ''
  }
  
}

function editItem(index) {

  openModal(true, index)
}

function deleteItem(index) {
  itens.splice(index, 1)
  setItensBD()
  loadItens()
}

function insertItem(item, index) {
  let tr = document.createElement('tr')

  tr.innerHTML = `
    <td>${item.produto}</td>
    <td>${item.link}</td> 
    <td>${item.preco}</td>
    <td>R$ ${item.lucro}</td>
    <td class="acao">
      <button onclick="editItem(${index})"><i class='bx bx-edit' ></i></button>
    </td>
    <td class="acao">
      <button onclick="deleteItem(${index})"><i class='bx bx-trash'></i></button>
    </td>
  `
  tbody.appendChild(tr)
}

btnSalvar.onclick = e => {
  
  if (sProduto.value == '' || sLink.value == '' || sPreco.value == ' '|| sLucro.value == '') {
    return
  }

  e.preventDefault();

  if (id !== undefined) {
    itens[id].produto = sProduto.value
    itens[id].link = sLink.value
    itens[id].preco = sPreco.value
    itens[id].lucro = sLucro.value
  } else {
    itens.push({'produto': sProduto.value, 'preco': sPreco.value,'link': sLink.value, 'lucro': sLucro.value})
  }

  setItensBD()

  modal.classList.remove('active')
  loadItens()
  id = undefined
}

function loadItens() {
  itens = getItensBD()
  tbody.innerHTML = ''
  itens.forEach((item, index) => {
    insertItem(item, index)
  })

}

const getItensBD = () => JSON.parse(localStorage.getItem('dbfunc')) ?? []
const setItensBD = () => localStorage.setItem('dbfunc', JSON.stringify(itens))

loadItens()