var request = require('request')
  , User = module.parent.require('./user')
  , Posts = module.parent.require('./posts')
  , meta = module.parent.require('./meta')
  , winston = module.parent.require('winston')
  , Upvote = {}

module.exports = Upvote

Upvote.init = function(app, mw, controllers, cb) {
  require('./lib/routes')(app, mw, controllers)
  cb()
}

Upvote.upvote = function(data) {
  var url = meta.config['upvote:apiUrl']
  var headerField = meta.config['upvote:headerField']
  var token = meta.config['upvote:apiToken']

  if (!url) {
    winston.error('Missing upvote api url')
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
        , uid: uid
        , email: email
        }
        opts.qs = d
        request.post(opts, function(err, res, body) {
          if (err) {
            winston.error('error sending post request', err)
          } else if (res.statusCode >= 400) {
            winston.error('received status code >= 400'
                        , body
                        , data.pid
                        , uid
                        , res.statusCode)
          }
        })
      }
    })
  })
}

Upvote.addNavigation = function(header, cb) {
  header.plugins.push({
    route: '/admin/upvote'
  , class: 'fa-chevron-up'
  , name: 'Upvotes'
  })
  cb(null, header)
}
