// Importamos las librerias
let { append, cons, first, isEmpty, isList, length, rest, map, forEach } =
	functionalLight;

// Actualiza los atributos del objeto y retorna una copia profunda
function update(data, attribute) {
	return Object.assign({}, data, attribute);
}

//////////////////////// Mundo inicial
let Mundo = {};
////////////////////////
/**
 * Actualiza la serpiente. Creando una nuevo cabeza y removiendo la cola
 */
function moveSnake(snake, dir) {
	const head = first(snake);
	return cons(
		{ x: head.x + dir.x, y: head.y + dir.y },
		snake.slice(0, length(snake) - 1),
	);
}

const dx = 20;
const dy = 20;

/**
 * Esto se llama antes de iniciar el juego
 */
function setup() {
	frameRate(10);
	createCanvas(400, 400);
	background(15, 200, 50);
	Mundo = {
		snake: [
			{ x: 4, y: 1 },
			{ x: 3, y: 1 },
			{ x: 2, y: 1 },
			{ x: 1, y: 1 },
		],
		snake1: [
			{ x: 4, y: 8 },
			{ x: 3, y: 8 },
			{ x: 2, y: 8 },
			{ x: 1, y: 8 },
		],
		dir: { x: 1, y: 0 },
		dir1: { x: 1, y: 0 },
		food: {
			x: Math.round(Math.random(200) * 10) * 20,
			y: Math.round(Math.random(200) * 10) * 20,
		},
	};

	const lista = Mundo.snake;
	const bezaca = first(Mundo.snake);
}

// Dibuja algo en el canvas. Aqui se pone todo lo que quieras pintar
function drawGame(Mundo) {
	background(10, 200, 50);
	fill(205, 200, 40);
	forEach(Mundo.snake, (s) => {
		rect(s.x * dx, s.y * dy, dx, dy);
	});
	fill(46, 24, 240);
	forEach(Mundo.snake1, (s) => {
		rect(s.x * dx, s.y * dy, dx, dy);
	});

	fill(11, 25, 30);
	rect(Mundo.food.x, Mundo.food.y, dy, dx);

	// Perder para la primera
	const lista = Mundo.snake;
	const bezaca = first(Mundo.snake);

	const lista1 = Mundo.snake1;
	const bezaca1 = first(Mundo.snake1);

	if (chocar(Mundo) || morderse(lista, lista1, bezaca)) {
		textSize(32);
		text("Perdiste", 150, 200);
		fill(0, 102, 153);
		return noLoop();
	}
	// Perder para la segunda

	if (chocar1(Mundo) || morderse(lista1, lista, bezaca1)) {
		textSize(32);
		text("Perdiste", 150, 200);
		fill(0, 102, 153);
		return noLoop();
	}
}

function chocar(Mundo) {
	if (
		(first(Mundo.snake).x == 19 && Mundo.dir.x == 1) ||
		(first(Mundo.snake).x == 0 && Mundo.dir.x == -1)
	) {
		return true;
	}

	if (
		(first(Mundo.snake).y == 19 && Mundo.dir.y == 1) ||
		(first(Mundo.snake).y == 0 && Mundo.dir.y == -1)
	) {
		return true;
	} else return false;
}

function chocar1(Mundo) {
	if (
		(first(Mundo.snake1).x == 19 && Mundo.dir1.x == 1) ||
		(first(Mundo.snake1).x == 0 && Mundo.dir1.x == -1)
	) {
		return true;
	}

	if (
		(first(Mundo.snake1).y == 19 && Mundo.dir1.y == 1) ||
		(first(Mundo.snake1).y == 0 && Mundo.dir1.y == -1)
	) {
		return true;
	} else return false;
}

function comer(Mundo) {
	if (
		first(Mundo.snake).x * 20 == Mundo.food.x &&
		first(Mundo.snake).y * 20 == Mundo.food.y
	) {
		return true;
	} else {
		return false;
	}
}
function comer1(Mundo) {
	if (
		first(Mundo.snake1).x * 20 == Mundo.food.x &&
		first(Mundo.snake1).y * 20 == Mundo.food.y
	) {
		return true;
	} else {
		return false;
	}
}

function morderse(lista, lista1, bezaca) {
	if (
		JSON.stringify(first(rest(lista))) === JSON.stringify(bezaca) ||
		JSON.stringify(first(lista1)) === JSON.stringify(bezaca)
	) {
		return true;
	} else if (isEmpty(lista) && isEmpty(lista1)) {
		return false;
	} else {
		return morderse(rest(lista), rest(lista1), bezaca);
	}
}

3333;
// Esto se ejecuta en cada tic del reloj. Con esto se pueden hacer animaciones
function onTic(Mundo) {
	// se ejecuta la funcionalidad que esté aquí

	if (comer(Mundo)) {
		if (Mundo.dir.x == 1) {
			return update(Mundo, {
				food: {
					x: Math.round(Math.random(200) * 10) * 20,
					y: Math.round(Math.random(200) * 10) * 20,
				},
				snake: cons(
					{ x: first(Mundo.snake).x + 1, y: first(Mundo.snake).y },
					Mundo.snake,
				),
			});
		} else if (Mundo.dir.x == -1) {
			return update(Mundo, {
				food: {
					x: Math.round(Math.random(200) * 10) * 20,
					y: Math.round(Math.random(200) * 10) * 20,
				},
				snake: cons(
					{ x: first(Mundo.snake).x - 1, y: first(Mundo.snake).y },
					Mundo.snake,
				),
			});
		} else if (Mundo.dir.y == 1) {
			return update(Mundo, {
				food: {
					x: Math.round(Math.random(200) * 10) * 20,
					y: Math.round(Math.random(200) * 10) * 20,
				},
				snake: cons(
					{ x: first(Mundo.snake).x, y: first(Mundo.snake).y + 1 },
					Mundo.snake,
				),
			});
		} else if (Mundo.dir.y == -1) {
			return update(Mundo, {
				food: {
					x: Math.round(Math.random(200) * 10) * 20,
					y: Math.round(Math.random(200) * 10) * 20,
				},
				snake: cons(
					{ x: first(Mundo.snake).x, y: first(Mundo.snake).y - 1 },
					Mundo.snake,
				),
			});
		}
	}

	//para la segunda serpiente

	if (comer1(Mundo)) {
		if (Mundo.dir1.x == 1) {
			return update(Mundo, {
				food: {
					x: Math.round(Math.random(200) * 10) * 20,
					y: Math.round(Math.random(200) * 10) * 20,
				},
				snake1: cons(
					{ x: first(Mundo.snake1).x + 1, y: first(Mundo.snake1).y },
					Mundo.snake1,
				),
			});
		} else if (Mundo.dir1.x == -1) {
			return update(Mundo, {
				food: {
					x: Math.round(Math.random(200) * 10) * 20,
					y: Math.round(Math.random(200) * 10) * 20,
				},
				snake1: cons(
					{ x: first(Mundo.snake1).x - 1, y: first(Mundo.snake1).y },
					Mundo.snake1,
				),
			});
		} else if (Mundo.dir1.y == 1) {
			return update(Mundo, {
				food: {
					x: Math.round(Math.random(200) * 10) * 20,
					y: Math.round(Math.random(200) * 10) * 20,
				},
				snake1: cons(
					{ x: first(Mundo.snake1).x, y: first(Mundo.snake1).y + 1 },
					Mundo.snake1,
				),
			});
		} else if (Mundo.dir1.y == -1) {
			return update(Mundo, {
				food: {
					x: Math.round(Math.random(200) * 10) * 20,
					y: Math.round(Math.random(200) * 10) * 20,
				},
				snake1: cons(
					{ x: first(Mundo.snake1).x, y: first(Mundo.snake1).y - 1 },
					Mundo.snake1,
				),
			});
		}
	} else {
		return update(Mundo, {
			snake1: moveSnake(Mundo.snake1, Mundo.dir1),
			snake: moveSnake(Mundo.snake, Mundo.dir),
		});
	}
}

//Implemente esta función si quiere que su programa reaccione a eventos del mouse
function onMouseEvent(Mundo, event) {
	return update(Mundo, {});
}

/**
 * Actualiza el mundo cada vez que se oprime una tecla. Retorna el nuevo stado del mundo
 */
function onKeyEvent(Mundo, keyCode) {
	// Cambiamos la dirección de la serpiente. Noten que no movemos la serpiente. Solo la dirección

	//PARA LA PRIMERA SERPIENTE
	if (keyCode == UP_ARROW && Mundo.dir.y != 1) {
		return update(Mundo, { dir: { y: -1, x: 0 } });
	} else if (keyCode == DOWN_ARROW && Mundo.dir.y != -1) {
		return update(Mundo, { dir: { y: 1, x: 0 } });
	} else if (keyCode == LEFT_ARROW && Mundo.dir.x != 1) {
		return update(Mundo, { dir: { y: 0, x: -1 } });
	} else if (keyCode == RIGHT_ARROW && Mundo.dir.x != -1) {
		return update(Mundo, { dir: { y: 0, x: 1 } });
	}
	//PARA LA SEGUNDA SERPIENTE
	if (keyCode == 87 && Mundo.dir1.y != 1) {
		return update(Mundo, { dir1: { y: -1, x: 0 } });
	} else if (keyCode == 83 && Mundo.dir1.y != -1) {
		return update(Mundo, { dir1: { y: 1, x: 0 } });
	} else if (keyCode == 65 && Mundo.dir1.x != 1) {
		return update(Mundo, { dir1: { y: 0, x: -1 } });
	} else if (keyCode == 68 && Mundo.dir1.x != -1) {
		return update(Mundo, { dir1: { y: 0, x: 1 } });
	} else {
		return update(Mundo, {});
	}
}
