exports.requests = function(app, path) {

  app.get('/style.css', function(req, res) {
    res.sendFile(path.join(__dirname + '/../public/css/style.css'))
  })

  app.get('/materialize.min.css', function(req, res) {
    res.sendFile(path.join(__dirname + '/../node_modules/materialize-css/dist/css/materialize.min.css'))
  })

  app.get('/materialize.min.js', function(req, res) {
    res.sendFile(path.join(__dirname + '/../node_modules/materialize-css/dist/js/materialize.min.js'))
  })

  app.get('/jquery.min.js', function(req, res) {
    res.sendFile(path.join(__dirname + '/../node_modules/jquery/dist/jquery.min.js'))
  })

  app.get('/fonts/roboto/Roboto-Regular.woff2', function(req, res) {
    res.sendFile(path.join(__dirname + '/../node_modules/materialize-css/dist/fonts/roboto/Roboto-Regular.woff2'))
  })

  app.get('/fonts/roboto/Roboto-Regular.woff', function(req, res) {
    res.sendFile(path.join(__dirname + '/../node_modules/materialize-css/dist/fonts/roboto/Roboto-Regular.woff'))
  })

  app.get('/socket.io-stream.js', function(req, res) {
    res.sendFile(path.join(__dirname + '/../node_modules/socket.io-stream/socket.io-stream.js'))
  })

  app.get('/favicon.ico', function(req, res) {
    res.sendFile(path.join(__dirname + '/../public/favicon.ico'))
  })

  app.get('/serialexperiments.gif', function(req, res) {
    res.sendFile(path.join(__dirname + '/../public/images/serialexperiments.gif'))
  })

  app.get('/maze.js', function(req, res) {
    res.sendFile(path.join(__dirname + '/../public/js/maze.js'))
  })

  app.get('/two.min.js', function(req, res) {
    res.sendFile(path.join(__dirname + '/../public/js/two.min.js'))
  })

  app.get('/pathFinder.js', function(req, res) {
    res.sendFile(path.join(__dirname + '/../public/js/pathFinder.js'))
  })

  app.get('/pathForger.js', function(req, res) {
    res.sendFile(path.join(__dirname + '/../public/js/pathForger.js'))
  })

  app.get('/position.js', function(req, res) {
    res.sendFile(path.join(__dirname + '/../public/js/position.js'))
  })


  //
  // app.get('/socket.io.js', function(req, res) {
  //   res.sendFile(path.join(__dirname + '/../node_modules/socket.io/lib/socket.js'))
  // })
}
