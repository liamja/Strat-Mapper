var socket = io.connect('http://liamanderson.co.uk');
socket.on('news', function (data) {
	console.log(data);
	socket.emit('my other event', {
		my: 'data'
	});
});