import Bus from './bus';
import Socket from './socket';
import StreamWorker from './stream.worker'
import { debounce, interval } from './helpers'

class StreamService {

  constructor() {
    this.init()
  }

  init() {
    this.tags = []
    this.worker = new StreamWorker()
    this.forceUpdate = this.forceUpdate.bind(this)
    this.onMessage = this.onMessage.bind(this)
    this.onUpdate = this.onUpdate.bind(this)
    this.onTweet = this.onTweet.bind(this)
    this.updateInterval = interval(this.forceUpdate, 9500)
    this.worker.addEventListener('message', this.onMessage, false)
    this.onUpdate = debounce(this.onUpdate, 1000)
  }

  start(tags) {
    this.tags = tags

    Socket.on('tweet', this.onTweet)

    this.worker.postMessage({
      cmd: 'init',
      tags: tags
    })

    this.worker.postMessage({
      cmd: 'start'
    })

    Socket.emit('filter', {
      track: tags.map((value) => {
        return `#${value}`
      })
    })

    this.updateInterval.start()

    Bus.$emit('start', tags);
  }

  restart() {
    Bus.$emit('restart');
  }

  reset() {
    this.worker.postMessage({cmd: 'reset'})
    this.worker.postMessage({cmd: 'broadcast'})
    Bus.$emit('reset')
  }

  end() {
    this.updateInterval.stop()
    Socket.off('tweet', this.onTweet)
    this.worker.postMessage({
      cmd: 'stop'
    })
    Socket.disconnect()
    Socket.connect()
    Bus.$emit('end')
  }

  onTweet(tweet) {
    this.worker.postMessage({
      cmd: 'tweet',
      tweet
    })

    this.onUpdate()
  }

  onUpdate(data) {
    this.worker.postMessage({'cmd': 'broadcast'})
  }

  onMessage(e) {
    Bus.$emit('update', e.data)
  }

  forceUpdate() {
    this.onUpdate(true)
  }

  destroy() {
    this.worker.removeEventListener('message', this.onMessage, false)
  }

}

export default (new StreamService())
