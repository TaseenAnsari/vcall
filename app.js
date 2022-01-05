var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var indexRouter = require('./routes/index');
const {Server} = require('socket.io')

var app = express();
const http = require('http')
const server  = http.createServer(app)
const io = require('socket.io')(server, {
    cors: {
         origin: '*'
    }
})


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public/vcall')));

app.use('/', indexRouter);


io.on('connection',(socket)=>{
    console.log("One User Connected")
})

server.listen(process.env.PORT||3000,()=>console.log("serve at localhost"))