import io from 'socket.io-client'

const socket = io({
  'reconnection': true,
  'reconnectionDelay': 1000,
  'reconnectionDelayMax': 5000,
  'reconnectionAttempts': 10
})

let interval = null

function ping () {
  if (socket.connected) {
    socket.emit('ping')
  }
}

socket.on('connect', () => {
  interval = setInterval(ping, 10000)
})

socket.on('disconnect', () => {
  if (interval) {
    clearInterval(interval)
  }
})

export default socket
