let express = require('express'), path = require('path'), dependencies = require(__dirname + '/scripts/dependencies.js'), ss = require('socket.io-stream'), mp3_duration = require('mp3-duration'), fs = require('fs')


let app = express()
let server = require('http').Server(app)
let io = require('socket.io')(server)

class Q {
    constructor () { this.lst = [] }
    enqueue (elem) { this.lst.push(elem) }
    enqueue_head (elem) { this.lst.unshift(elem) }
    dequeue () { return this.lst.shift() }
    dequeue_tail() {
      this.lst.reverse()
      let tail = this.lst.shift()
      this.lst.reverse()
      return tail
    }
    peek () { return this.lst[0] }
    load (lst) { lst.filter((elem) => this.enqueue(elem)) }
    isempty () {
      if (this.lst.length == 0) {
        return true
      } else {  return false }
    }
}

// array of path's to mp3 files
let music_lst = [
  'lofi/idwdta.mp3',
  'lofi/sprng.mp3'
]

// define a queue to store our music
let music_queue = new Q()
// load the list into the queue
music_queue.load(music_lst)


let music_struct_lst = []

// define a function/constructor
let make_song_obj = function(song, artist, path, duration) {
  return {
    song : song,
    artist : artist,
    path : path,
    duration : duration
  }
}


// set the original length of the queue list and don't resolve the promise until the list that we're beuilding has reached that size
let og_length = music_queue.lst.length

// issue a promiuse to make a list of objects that contain the song data that's associated with the duration of the music
new Promise(function(resolve, reject) {
  // loop through the song queue, dequeueing songs as we loop
  while (!music_queue.isempty()) {
    // dequeue from the queue to derive the song tile (& sub-directory path)
    let song = music_queue.dequeue()
    // define a full path the the song data w __dirname
    let path_to_song = __dirname + '/' + 'music/' + song

    // call the mp3_dur function from the external library
    // this function takes in a path to an mp3 song and asynchronously determines the duration of the song based on the path paramater
    mp3_duration(path_to_song, function(err, duration) {
      // push a new song object to the list of song objects, we'll end up sending this to the client
      music_struct_lst.push(make_song_obj(song, 'artist', path_to_song, duration))
      // if the queue is empty and the lenght of our list-builder has reached the original size of the queue, then we know we've dequeued the final song, so resolve the promise
      if (music_queue.isempty() && music_struct_lst.length == og_length) {
        resolve()
      }
    })
  }
}).then(function(resolve, reject) {
  // since we're inside of this code block, that means we've already generated all of our song durations asynchronously, now we have the data available inside of the music_struct_lst array of objects
  console.log(music_struct_lst);

  // on connection with the client, first send them the data that represents all of the songs -> music_struct_lst
  io.on('connection', function(socket) {
    // socket.emit('music_lst', music_lst)
    socket.emit('music_lst', music_struct_lst)


    socket.on('start_stream', function(data) {

      let stream = ss.createStream()

      ss(socket).emit('audio-stream', stream, {song : 'song name'})

      let filename = __dirname + '/music/lofi/idwdta.mp3'

      fs.createReadStream(filename).pipe(stream)

      stream.on('finish', function(){
        console.log('stream finished');
      })

    })


    // ss(socket).on('stream-file', function(stream, data){
    //   // stream.pipe(fs.createWriteStream(filename))
    //   fs.createReadStream(filename).pipe(stream)
    // })


  })
})


server.listen(8080, function(){
  console.log('listening on port 8080')
})

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/public/' + 'index.html')
})

dependencies.requests(app, path)
