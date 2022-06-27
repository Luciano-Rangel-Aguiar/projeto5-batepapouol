let from = ""
let to = ''
let type
let time
setInterval(inportMessages, 3000)
setInterval(active, 100000)

function userName() {
  from = prompt('Qual o seu nome de usuário?')
  let test = {
    name: from
  }

  let promise = axios.post(
    'https://mock-api.driven.com.br/api/v6/uol/participants',
    test
  )

  promise.then(success)

  promise.catch(error)

  inportMessages()
}

function success() {
  console.log('ok')
}

function error() {
  alert('Nome de usuário já existe, tente outro.')
  userName()
}

userName()

function inportMessages() {
  let teste = axios.get('https://mock-api.driven.com.br/api/v6/uol/messages')
  teste.then(getChat)

  scrollToBottom()
}

function scrollToBottom() {
}

function getChat(message) {
  let messageLine = document.querySelector('.message')
  messageLine.innerHTML = ''

  for (let i = 0; i < message.data.length; i++) {
    if (
      message.data[i].text === 'sai da sala...' ||
      message.data[i].text === 'entra na sala...' ||
      message.data[i].text === 'entrou na sala...'
    ) {
      messageLine.innerHTML += `
              <li class="message ${message.data[i].type}">
          
              <time> (${message.data[i].time})</time>
              <user>${message.data[i].from}</user>
              <message>${message.data[i].text}</message>
          
              </li>`
    } else if (
      message.data[i].type === 'private_message' &&
      message.data[i].to === from
    ) {
      messageLine.innerHTML += `
              <li class="message ${message.data[i].type} ${from}">
          
              <time> (${message.data[i].time})</time>
              <user>${message.data[i].from}</user>
              <span> reservadamente para </span>
              <user>${message.data[i].to}:</user>
              <message>${message.data[i].text}</message>
          
              </li>`
    } else {
      messageLine.innerHTML += `
              <li class="message ${message.data[i].type}">
          
              <time> (${message.data[i].time})</time>
              <user>${message.data[i].from}</user>
              <span> para </span>
              <user>${message.data[i].to}:</user>
              <message>${message.data[i].text}</message>
          
              </li>`
    }
  }
}

function sendText() {
  if (document.querySelector('input').value !== '') {
    let textoTotal = {
      from: from,
      to: 'Todos',
      text: document.querySelector('input').value,
      type: 'message'
    }

    let promise = axios.post(
      'https://mock-api.driven.com.br/api/v6/uol/messages',
      textoTotal
    )

    promise.then(success)
    promise.catch(error)

    text: document.querySelector('input').value = ''
  }
}

function active() {
  let test = {
    name: from
  }
  let promise = axios.post(
    'https://mock-api.driven.com.br/api/v6/uol/status',
    test
  )

  promise.catch(error)
}
