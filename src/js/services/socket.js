import io from 'socket.io-client'

const socket = io({
  'reconnection': true,
  'reconnectionDelay': 1000,
  'reconnectionDelayMax': 5000,
  'reconnectionAttempts': 10
})

export default socket
