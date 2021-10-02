function getRandomX() {
	return Math.floor(17 * Math.random() + 3);
}
function getRandomY() {
	return Math.floor(12 * Math.random() + 3);
}

/**
 * funcion que me dibuja el juego terminado en el mapa
 * @param {Array } gameover
 * @returns {Void}
 */
function gameOver(Mundo) {
	(maxScore.innerHTML = Mundo.score),
		modalGameOver.setAttribute("style", "top:0;"),
		noLoop();
}

/**
 * Funcion que se ejecuta para parar el juego o colocarlo en pausa
 * @param {}
 * @returns {Void}
 */
function stopGame() {
	frameRate(0);
}

/**
 * Funcion que se ejecuta para parar renaudar el juego
 * @param {}
 * @returns {Void}
 */
function playGame() {
	frameRate(velInicial);
}

/**
 * funcion que me ejecuta el movimiento de la serpiente
 * @param {Array<object>} snake
 * @param {Array<object>} dir
 * @returns {Array}
 */
function moveSnake(snake, dir) {
	const head = first(snake);
	return cons(
		{ x: head.x + dir.x, y: head.y + dir.y },
		snake.slice(0, length(snake) - 1),
	);
}

/**
 * Funcion que me ejecuta la colisión de la serpiente .
 * @param {Array<object>} Mundo
 * @returns {Namber}
 */
function gestorColisiones(Mundo) {
	const head = first(Mundo.snake);
	if (
		head.x < 1.6 ||
		head.x * dx >= WIDTH - 1.6 * SIZE ||
		head.y < 1.6 ||
		head.y * dy >= HEIGHT - 1.6 * SIZE
	)
		return !0;
}

/**
 * Funcion que me indica si serpiente se mordio
 * @param {Array} tail
 * @param {Array} head
 * @returns {Boolean} True | False
 */
function gestionarMordidas(tail, head) {
	if (isEmpty(tail)) {
		return false;
	} else if (JSON.stringify(first(rest(tail))) === JSON.stringify(head)) {
		return true;
	} else {
		return gestionarMordidas(rest(tail), head);
	}
}

/**
 * Funcion que indica si la serpiente comio
 * @param {Array} snake
 * @param {Array} food
 * @param {Array} dir
 * @returns {Boolean} true | false
 */
function comerSnake(snake, food, dir) {
	const head = first(snake);
	const firstFood = first(food);
	if (head.x == firstFood.x && head.y == firstFood.y) {
		return true;
	} else {
		return false;
	}
}

/**
 * funcion de gestionar las trampas en el mapa
 * @param {Array<object>} snake
 * @param {Array<object>} trampas
 * @returns {Boolean} True | False
 */
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

/**
 * Funcion que le da movimiento al simio
 * @param {Array} donkey
 * @param {Array} dir
 * @returns {Array}
 */
function moveDonkey(donkey, dir) {
	const head = first(donkey);
	return cons(
		{ x: head.x + dir.x, y: head.y + dir.y },
		donkey.slice(0, length(donkey) - 1),
	);
}

/**
 * Funcion que le da movimiento a los barriles en el mapa
 * @param {Array} barril
 * @param {Array} dir
 * @returns {Array}
 */
function moveBarril(barril, dir) {
	const head = first(barril);
	return cons(
		{ x: head.x + dir.x, y: head.y + dir.y },
		barril.slice(0, length(barril) - 1),
	);
}

/**
 * su función es gestionar las colisiones del simio en el mapa
 * @param {Array<object>} Mundo
 * @returns {Number} 1 | 2
 */
function gestorColisionesDonkey(Mundo) {
	const head = first(Mundo.donkey);
	if (head.x + SIZE >= WIDTH - SIZE) {
		return 1;
	}
	if (head.x < 1.6) {
		return 2;
	}
}

/**
 * su función es gestionar las colisiones de los barriles en el mapa
 * @param {Array<object>} barril
 * @param {Array<object>} snake
 * @returns {Boolean} True | False
 */
function gestorColisionesBarril(barril, snake) {
	const head = first(barril);
	const headSnake = first(snake);
	console.log(headSnake);
	if (isEmpty(snake)) {
		return false;
	}
	if (headSnake == null) {
		return gestorColisionesBarril(barril, rest(snake));
	}
	if (
		head.y <= headSnake.y * 20 &&
		head.y + 80 >= headSnake.y * 20 &&
		head.x <= headSnake.x * 20 &&
		head.x + 80 >= headSnake.x * 20
	) {
		return true;
	}
	return gestorColisionesBarril(barril, rest(snake));
}

//Se definen las variables de las imagenes del juego
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
let donkeyNormal;
let donkeyBarril;
let imgBarril;

/**
 * su función es precargar las imagenes que se van a usar en el juego
 * @param {}
 * @returns {Void}
 */
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
	donkeyNormal = loadImage("img/DonKeyKong.png");
	donkeyBarril = loadImage("img/DonKeyTarro.jpg");
	imgBarril = loadImage("img/barrilDonKey.png");
}
