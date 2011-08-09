// StratMap Main Client JS

// Setup websockets
var socket = new io.connect('http://stratmap.liamanderson.co.uk', {
	port: 8080
});

// Update client UI with new location of piece
socket.on('update piece', function(piece) {
	$('#' + piece.id).css('left', Number(piece.x));
	$('#' + piece.id).css('top', Number(piece.y));
});

// Update client UI with new chat broadcasts
socket.on('chat broadcast', function(chat) {
	
	console.log(chat);
	
	var newEntry = $('<div class="entry"><span class="user"></span><span class="message"></span></div>').hide();
	$('#chat-log').append(newEntry);
	newEntry.children('.user').text(chat.user + ': ');
	newEntry.children('.message').text(chat.msg);
	newEntry.fadeIn(200);
	
	var scrollheight = $('#chat-log').prop('scrollHeight');
	$('#chat-log').scrollTop(scrollheight);
});

// Update client UI with new chat announcements
socket.on('chat announce', function(msg) {
	
	var newEntry = $('<div class="announce"><span class="user">user</span> <span class="message"></span></div>').hide();
	$('#chat-log').append(newEntry);
	newEntry.children('.message').text(msg);
	newEntry.fadeIn(200);
	
	var scrollheight = $('#chat-log').prop('scrollHeight');
	$('#chat-log').scrollTop(scrollheight);
});

// Update client UI with user count
socket.on('stat users online', function(count) {
	$('#stats .count')
	.fadeOut(100, function(){
		$(this).text(count)
	})
	.fadeIn(100);
});

$(document).ready(function(){

	$('#create-username').dialog({
		autoOpen: true,
		modal: true,
		buttons: {
			"Set username": function() {
				socket.emit('set username', $('#username').val());
				$(this).dialog('close');
			}
		}
	});
	
	$(".piece").draggable({
		containment:	"#canvas",
		scroll:			false,
		snap:			'#toolbox',
		snapMode:		'inner',
		snapTolerance:	15,
		distance:		10,
		opacity:		0.70,
		drag:			function(event, ui){

			var piece = {};
			piece.id	= $(this).attr('id');
			piece.x		= ui.position.left;
			piece.y		= ui.position.top;

			// Update server with new piece position
			socket.emit('update piece', piece);
			
		}
	});
	
	$('#message-box').keypress(function(e){
		var msg = $(this).val();
		if(e.keyCode == 13 && msg){
			// Send msg to serv
			socket.emit('chat broadcast', msg);
			$(this).val('');
		}
	});
		
});