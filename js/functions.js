// Devuelve un numero aleatorio para la posicion en -- X --
function getRandomX() {
	return Math.floor(Math.random() * (19 - 3 + 1) + 3);
}
// Devuelve un numero aleatorio para la posicion en -- Y --
function getRandomY() {
	return Math.floor(Math.random() * (14 - 3 + 1) + 3);
}

//Se ejecuta en el momento que nos quedamos sin vidas
function gameOver() {
	modalGameOver.setAttribute("style", "top:0;");
	noLoop();
}

//Cambiamos la direccion de la serpiente - INMODIFICABLE
function moveSnake(snake, dir) {
	const head = first(snake);
	return cons(
		{ x: head.x + dir.x, y: head.y + dir.y },
		snake.slice(0, length(snake) - 1),
	);
}

//Cada vez que snake coche contra una pared retorna TRUE
function gestorColisiones(mundo) {
	const head = first(mundo.snake);
	if (
		head.x < 1.6 ||
		head.x * dx >= WIDTH - SIZE * 1.6 ||
		head.y < 1.6 ||
		head.y * dy >= HEIGHT - SIZE * 1.6
	) {
		return true;
	}
}

//Cada vez que snake muerda su cola retornara TRUE
function gestionarMordidas(snakeHead, snakeTail) {
	const head = first(snakeHead);
}

// Cada vez que la serpiente coma retorna TRUE de lo contrario FALSE
function comerSnake(snake, food, dir) {
	const head = first(snake);
	const firstFood = first(food);
	if (head.x == firstFood.x && head.y == firstFood.y) {
		return true;
	} else {
		return false;
	}
}

//Se precarga la imagen del bloqueMario
let marioBrick;
function preload() {
	marioBrick = loadImage("img/bricksMario.png");
}
