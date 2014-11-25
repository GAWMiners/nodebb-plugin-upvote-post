var request = require('request')
  , redis = require('redis')
  , User = module.parent.require('./user')
  , Posts = module.parent.require('./posts')
  , meta = module.parent.require('./meta')
  , winston = module.parent.require('winston')
  , Upvote = {}
  , publishClient;

module.exports = Upvote

Upvote.init = function(params, cb) {
  require('./lib/routes')(params.router, params.middleware, params.controllers)

  setupPublish()

  cb()
}

function setupPublish() {
  var host = meta.config['upvote:redisHost']
  var port = meta.config['upvote:redisPort']
  var pwd = meta.config['upvote:redisPassword']
  if (host && port && pwd) {
    publishClient = redis.createClient(port, host)
    publishClient.auth(pwd)

    publishClient.on('error', function(err) {
      winston.error(err.stack)
    })
  }
}

Upvote.upvote = function(data) {
  makeRequest(meta.config['upvote:apiUrl'], 'upvote_channel', data)
}

Upvote.downvote = function(data) {
  makeRequest(meta.config['downvote:apiUrl'], 'downvote_channel', data)
}

Upvote.unvote = function (data) {
  makeRequest(meta.config['unvote:apiUrl'], 'unvote_channel', data)
}

function makeRequest(url, channel, data) {
  var headerField = meta.config['upvote:headerField']
  var token = meta.config['upvote:apiToken']

  if (!url) {
    winston.error('Missing api url')
    return
  }

  if (!headerField) {
    winston.error('Missing token header field')
    return
  }

  if (!token) {
    winston.error('Missing API token')
    return
  }

  var opts = {
    uri: url
  , json: true
  , headers: {}
  }

  opts.headers[headerField] = token

  if (!data.pid) return
  Posts.getPostField(data.pid, 'uid', function(err, uid) {
    if (err || !uid) return
    User.getUserField(uid, 'email', function(err, email) {
      if (email) {
        var d = {
          pid: data.pid
        , uid: data.uid
        , email: email
        , current: data.current
        }
        opts.qs = d

        request.post(opts, function(err, res, body) {
          if (err) {
            winston.error('error sending post request', err)
          } else if (res.statusCode >= 400) {
            winston.error('received status code >= 400'
                        , body
                        , data.pid
                        , data.uid
                        , res.statusCode)
          }
        })

        if (publishClient) {
          publishClient.publish(channel, JSON.stringify(d))
        }
      }
    })
  })
}

Upvote.addNavigation = function(header, cb) {
  header.plugins.push({
    route: '/upvote'
  , icon: 'fa-chevron-up'
  , name: 'Upvotes'
  })
  cb(null, header)
}
