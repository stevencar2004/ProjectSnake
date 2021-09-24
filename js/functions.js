// Devuelve un numero aleatorio para la posicion en -- X --
function getRandomX() {
	return Math.floor(Math.random() * (19 - 3 + 1) + 3);
}
// Devuelve un numero aleatorio para la posicion en -- Y --
function getRandomY() {
	return Math.floor(Math.random() * (14 - 3 + 1) + 3);
}

//Se ejecuta en el momento que nos quedamos sin vidas
function gameOver(Mundo) {
	maxScore.innerHTML = Mundo.score;
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
function gestionarMordidas(tail, head) {
	if (isEmpty(tail)) {
		return false;
	} else if (JSON.stringify(first(rest(tail))) === JSON.stringify(head)) {
		return true;
	} else {
		return gestionarMordidas(rest(tail), head);
	}
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

// Cada vez que la serpiente choque con una trampa retornara TRUE
// Cada vez que la serpiente choque con una trampa retornara TRUE
function gestionarTrampas(snake, trampas) {
	const head = first(snake);
	const firstTrampa = first(trampas);
	if (isEmpty(trampas)) {
		return false;
	}
	if (head.x == firstTrampa.x && head.y == firstTrampa.y) {
		return true;
	} else {
		return gestionarTrampas(snake, rest(trampas));
	}
}

//Se precarga las imagenes del juego
let marioBrick;
let arbolJungla;
let manzana;
let tronco;
let pez;
let algas;
let fuego;
let carne;
let bomba;
let hoguera;
let mina;

function preload() {
	marioBrick = loadImage("img/bricksMario.png");
	manzana = loadImage("img/manzana.png");
	tronco = loadImage("img/tronco.jpg");
	pez = loadImage("img/pez.png");
	algas = loadImage("img/algas.png");
	fuego = loadImage("img/fuego.webp");
	carne = loadImage("img/carne.png");
	bomba = loadImage("img/bombs.svg");
	hoguera = loadImage("img/hoguera2.png");
	mina = loadImage("img/mina.png");
}
