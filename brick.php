<!DOCTYPE html>
<html>
	<head>
		<meta charset="UTF-8" />
		<title>Mahjong brick</title>

		<link rel="stylesheet" href="css/mahjong.css" />
		
		<style>
			img {
				display: block;
				position: absolute;
				mrgin: 0 0 -10px 0;
			}
		</style>
		
		<script type="text/javascript">
			var arr = ['a', 'b', 'c', 'd', 'e', 'f'];
			
			for (var i = arr.length - 1; i >= 0; i--)
			{
				console.log(arr[i]);
			}
		</script>
	</head>
	<body>
		<div id="game">
			<img src="img/icons64/1.png" style="top: 0;		z-index: 3;" />
			<img src="img/icons64/1.png" style="top: 56px;	z-index: 2;" />
			<img src="img/icons64/1.png" style="top: 112px;	z-index: 1;" />
		</div>
	</body>
</html>