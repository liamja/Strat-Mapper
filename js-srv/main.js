// StratMap Server Side JS

var
io		= require('socket.io').listen(8080),
mongo	= require('mongodb'),
db		= new mongo.Db('stratmap', new mongo.Server('localhost', 27017, {})),
usersonline = 0;



io.sockets.on('connection', function (socket) {
	
	// Update a few things on connection
	
	usersonline++;
	
	db.open(function(err, db) {
		db.collection('chat', function(err, collection) {  
			collection.find({}, {
				'sort':[['_id', 1]]
			}, function(err, cursor) {
				cursor.each(function(err, chatlog) {
					if(chatlog != null) {
						socket.emit('chat broadcast', chatlog.msg);
						db.close();
					}
				});
			});
		});
	});
	
	socket.emit('stat users online', usersonline);
	socket.broadcast.emit('stat users online', usersonline);
	
	// Register handlers for socket events
	
	socket.on('update piece', function (data) {
		socket.broadcast.emit('update piece', data);
	});
	
	socket.on('set username', function (username) {
		socket.set('username', username, function () {
			socket.emit('ready');
		});

		socket.emit('chat announce', username + ' joined chat');
		socket.broadcast.emit('chat announce', username + ' joined chat');
	});
	
	socket.on('chat broadcast', function (data) {

		var chatlog	= {};
		chatlog.msg	= data;
		socket.get('username', function (username) {
			console.log(username);
			chatlog.user= username;
		});
		
		console.log(chatlog);
		
		socket.broadcast.emit('chat broadcast', chatlog);
		socket.emit('chat broadcast', chatlog);

		db.open(function (err, db) {
			db.collection('chat', function(err, collection) {  
				collection.insert(chatlog);
				db.close();
			});
		});
	});
	
	socket.on('disconnect', function (data) {
		usersonline--;
		socket.get('username', function (username) {
			socket.broadcast.emit('chat announce', username + ' left chat');
		});
		socket.broadcast.emit('stat users online', usersonline);
	});
	
});