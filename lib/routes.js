function renderAdmin(req, res, next) {
  res.render('admin/upvote', {})
}

module.exports = function(app, mw, controllers) {
  app.get('/admin/upvote', mw.admin.buildHeader, renderAdmin)
  app.get('/api/admin/upvote', renderAdmin)
}
