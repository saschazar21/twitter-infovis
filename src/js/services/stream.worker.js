var data = {}

function init(tags) {
  data = {
    count: 0,
    tags: {},
    countries: {}
  }

  tags.forEach(function(tag) {
    data.tags[tag.toLowerCase()] = {
      count: 0
    }
  })
}

function reset() {
  data.count = 0
  data.countries = {}

  for (tag in data.tags) {
    if (data.tags.hasOwnProperty(tag)) {
      data.tags[tag] = {
        count: 0
      }
    }
  }
}

function processTweet(tweet) {
  data.count++

  if (tweet.place && tweet.place.country_code) {
    let code = tweet.place.country_code
    if (!data.countries[code]) {
      data.countries[code] = {
        count: 0
      }
    }

    data.countries[code].count++
  }

  let tags = tweet.entities.hashtags.map(function(obj) {
    return obj.text.toLowerCase()
  })

  tags.forEach(function(tag) {
    if (!!tag && data.tags.hasOwnProperty(tag)) {
      data.tags[tag].count++
    }
  })
}

self.addEventListener('message', function(e) {
  var d = e.data

  switch (d.cmd) {
    case 'start':
      break
    case 'init':
      init(d.tags)
      break
    case 'stop':
      reset()
      // self.close()
      break
    case 'reset':
      reset()
      break
    case 'tweet':
      processTweet(d.tweet)
      break
    case 'broadcast':
      self.postMessage(data)
      break
  };
}, false)
