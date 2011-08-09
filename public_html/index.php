<!DOCTYPE html>
<html>
	<head>

		<title>StratMap</title>

		<!-- Load CSS -->
		<link rel="stylesheet" href="//ajax.googleapis.com/ajax/libs/jqueryui/1.8.14/themes/dark-hive/jquery-ui.css" type="text/css">
		<link rel="stylesheet" href="/assets/css/main.css" type="text/css">

	</head>
	<body>
		<div id="canvas">

			<div id="map"></div>

			<div id="toolbox">
				<div id="pin-1" class="piece pin blue"></div>
				<div id="pin-2" class="piece pin blue"></div>
				<div id="pin-3" class="piece pin blue"></div>
				<div id="pin-4" class="piece pin red"></div>
				<div id="pin-5" class="piece pin red"></div>
				<div id="pin-6" class="piece pin red"></div>
			</div>

			<div id="chat">
				<div id="chat-log"></div>
				<input id="message-box" type="text" tabindex="1" autofocus>
				<div id="stats">
					<span class="stat">Users Connected: <span class="count"></span></span>
				</div>
			</div>
		</div>

		<div id="create-username" title="Pick a username">
			<form>
				<label for="username">Username</label>
				<input type="text" name="username" id="username" class="text ui-widget-content ui-corner-all" />
			</form>
		</div>

		<!-- Load JS -->
		<script type="text/javascript" src="//ajax.googleapis.com/ajax/libs/jquery/1.6.2/jquery.min.js"></script>
		<script type="text/javascript" src="//ajax.googleapis.com/ajax/libs/jqueryui/1.8.14/jquery-ui.min.js"></script>
		<script type="text/javascript" src="//stratmap.liamanderson.co.uk:8080/socket.io/socket.io.js"></script>
		<script type="text/javascript" src="/assets/js/main.js"></script>

	</body>
</html>