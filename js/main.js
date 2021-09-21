// Importamos la libreria Functional Light
let { append, cons, first, isEmpty, isList, length, rest, map, forEach } =
	functionalLight;

// Actualiza los atributos del objeto y retorna una copia profunda
function update(data, attribute) {
	return Object.assign({}, data, attribute);
}

// ///////// Propiedades del Mundo inicial
let Mundo = {};

// ///////// Dibujar Los Elementos del Juego En La Pantalla

//Dibujamos nuestra Snake
function drawSnake(snake) {
	fill("#166397");
	forEach(snake, (pos) => {
		rect(pos.x * dx + dx / 2, pos.y * dy + dy / 2, dx, dy, 8);
	});
}

// Funcion que me dibuja la comida en el mapa
function drawComida(food) {
	fill("#0a8652");
	forEach(food, (pos) => {
		rect(pos.x * dx + dx / 2, pos.y * dy + dy / 2, dx, dy, 10);
	});
}

//Dibujamos el numero de vidas que contenga la lista
function drawLifes(lifes) {
	htmlLifes.innerHTML = lifes;
}

//Dibujamos el marcador del juego
function drawScore(score) {
	htmlScore.innerHTML = "Score: " + score;
}
//

// ///////// Funcion inicial del juego
function setup() {
	frameRate(10);
	createCanvas(WIDTH, HEIGHT);
	Mundo = {
		score: 0,
		lifes: ["❤", "❤", "❤"],
		snake: [
			{ x: 7, y: 5 },
			{ x: 6, y: 5 },
		],
		//Con esta opcion la serpiente inicia en un movimiento constante
		dir: { x: 1, y: 0 },
		food: [{ x: 6, y: 4 }],
		// Indica hacia que direccion va
		direction: "RIGHT",
	};
}
function drawGame(Mundo) {
	// background("#1e272e");
	if (isEmpty(Mundo.lifes)) {
		drawLifes(Mundo.lifes);
		htmlScore.innerHTML = "";
		gameOver();
	} else {
		//Dibujamos el mapa
		// stroke(40, 42, 45);
		// strokeWeight(1);
		forEach(mapa, (row, i) => {
			forEach(row, (cell, j) => {
				if (cell == 1) {
					// fill(200, 0, 0);
					image(marioBrick, j * SIZE, i * SIZE, SIZE, SIZE);
				}
				if (cell == 0) {
					noStroke();
					fill(100, 0, 0);
					rect(j * SIZE, i * SIZE, SIZE, SIZE);
				}
			});
		});
		drawScore(Mundo.score);
		drawLifes(Mundo.lifes);
		drawComida(Mundo.food);
		drawSnake(Mundo.snake);
		// gestorColisiones(Mundo);
	}
}

// ///////// Manejadores de Eventos

// Esto se ejecuta en cada tic del reloj. Con esto se pueden hacer animaciones
function onTic(Mundo) {
	if (comerSnake(Mundo.snake, Mundo.food, Mundo.dir)) {
		if (Mundo.dir.x == 1) {
			return update(Mundo, {
				food: [{ x: getRandomX(), y: getRandomY() }],
				snake: cons(
					{ x: first(Mundo.snake).x + 1, y: first(Mundo.snake).y },
					Mundo.snake,
				),
				score: Mundo.score + 1,
			});
		} else if (Mundo.dir.x == -1) {
			return update(Mundo, {
				food: [{ x: getRandomX(), y: getRandomY() }],
				snake: cons(
					{ x: first(Mundo.snake).x - 1, y: first(Mundo.snake).y },
					Mundo.snake,
				),
				score: Mundo.score + 1,
			});
		} else if (Mundo.dir.y == 1) {
			return update(Mundo, {
				food: [{ x: getRandomX(), y: getRandomY() }],
				snake: cons(
					{ x: first(Mundo.snake).x, y: first(Mundo.snake).y + 1 },
					Mundo.snake,
				),
				score: Mundo.score + 1,
			});
		} else if (Mundo.dir.y == -1) {
			return update(Mundo, {
				food: [{ x: getRandomX(), y: getRandomY() }],
				snake: cons(
					{ x: first(Mundo.snake).x, y: first(Mundo.snake).y - 1 },
					Mundo.snake,
				),
				score: Mundo.score + 1,
			});
		}
	}
	if (gestorColisiones(Mundo)) {
		return update(Mundo, {
			snake: [
				{ x: 7, y: 5 },
				{ x: 6, y: 5 },
			],
			// score: 0,
			dir: { x: 1, y: 0 },
			lifes: rest(Mundo.lifes),
		});
	}
	if (gestionarMordidas(Mundo.snake, Mundo.snake)) {
		alert("Se mordio");
	}
	return update(Mundo, { snake: moveSnake(Mundo.snake, Mundo.dir) });
}

//Implemente esta función si quiere que su programa reaccione a eventos del mouse
function onMouseEvent(Mundo, event) {
	return update(Mundo, {});
}

// Cambiamos solo la dirección de la serpiente De acuerdo a la tecla presionada
// la serpiente se movera en la direccion que le digamos hasta volver a cambiarle la direccion
function onKeyEvent(Mundo, keyCode) {
	if ((Mundo.direction == "LEFT" || Mundo.direction == "RIGHT") && keyCode == UP_ARROW) {
		return update(Mundo, { dir: { y: -1, x: 0 }, direction: "UP" });
	}
	if (
		(Mundo.direction == "LEFT" || Mundo.direction == "RIGHT") &&
		keyCode == DOWN_ARROW
	) {
		return update(Mundo, { dir: { y: 1, x: 0 }, direction: "DOWN" });
	}
	if ((Mundo.direction == "UP" || Mundo.direction == "DOWN") && keyCode == LEFT_ARROW) {
		return update(Mundo, { dir: { y: 0, x: -1 }, direction: "LEFT" });
	}
	if ((Mundo.direction == "UP" || Mundo.direction == "DOWN") && keyCode == RIGHT_ARROW) {
		return update(Mundo, { dir: { y: 0, x: 1 }, direction: "RIGHT" });
	}
	return update(Mundo, {});
}
