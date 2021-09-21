//Vamos a usar http://processingjs.org/
// o https://p5js.org/reference/

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
const alto = 400;
const ancho = 800;

/**
 * Esto se llama antes de iniciar el juego
 */
function setup() {
	frameRate(15);
	createCanvas(ancho, alto);
	background(219, 204, 20);
	Mundo = {
		snake: [
			{ x: 4, y: 1 },
			{ x: 3, y: 1 },
			{ x: 2, y: 1 },
			{ x: 1, y: 1 },
		],
		snake1: [
			{ x: 4, y: 18 },
			{ x: 3, y: 18 },
			{ x: 2, y: 18 },
			{ x: 1, y: 18 },
		],
		dir: { x: 1, y: 0 },
		dir1: { x: 1, y: 0 },
		food: { x: 200, y: 180 },
		food1: { x: 600, y: 180 },
		puntaje: 0,
		puntaje1: 0,
	};

	const lista = Mundo.snake;
	const bezaca = first(Mundo.snake);
}

// Dibuja algo en el canvas. Aqui se pone todo lo que quieras pintar
function drawGame(Mundo) {
	background(219, 204, 20);
	fill(75, 20, 219);
	forEach(Mundo.snake, (s) => {
		ellipse(s.x * dx + 10, s.y * dy + 10, dx, dy);
	});
	fill(219, 68, 31);
	forEach(Mundo.snake1, (s) => {
		ellipse(s.x * dx + 10, s.y * dy + 10, dx, dy);
	});

	//está enlazadoaun botón en html
	function restart() {
		loop();
		Mundo = {
			snake: [
				{ x: 4, y: 1 },
				{ x: 3, y: 1 },
				{ x: 2, y: 1 },
				{ x: 1, y: 1 },
			],
			snake1: [
				{ x: 4, y: 18 },
				{ x: 3, y: 18 },
				{ x: 2, y: 18 },
				{ x: 1, y: 18 },
			],
			dir: { x: 1, y: 0 },
			dir1: { x: 1, y: 0 },
			food: { x: 200, y: 180 },
			food1: { x: 600, y: 180 },
			puntaje: 0,
			puntaje1: 0,
		};
	}

	fill(11, 25, 30);
	text("Puntaje1: " + Mundo.puntaje, 0, 20);
	fill(11, 25, 30);
	text("Puntaje2: " + Mundo.puntaje1, 100, 20);

	fill(68, 219, 169);
	ellipse(Mundo.food.x + 10, Mundo.food.y + 10, dy, dx);
	fill(83, 110, 117);
	ellipse(Mundo.food1.x + 10, Mundo.food1.y + 10, dy, dx);

	// Perder para la primera
	const lista = Mundo.snake;
	const bezaca = first(Mundo.snake);

	const lista1 = Mundo.snake1;
	const bezaca1 = first(Mundo.snake1);

	if (morderse(lista, lista1, bezaca) || chocar(Mundo.dir, Mundo.snake)) {
		textSize(32);
		fill(14, 12, 13);
		text("Perdieron", ancho / 2, alto / 2);
		return noLoop();
	}
	// Perder para la segunda

	if (morderse(lista1, lista, bezaca1) || chocar(Mundo.dir1, Mundo.snake1)) {
		textSize(32);
		fill(14, 12, 13);
		text("Perdieron", ancho / 2, alto / 2);
		return noLoop();
	}

	if (Mundo.puntaje == 7) {
		textSize(32);
		fill(14, 12, 13);
		text("Gana jugador1", ancho / 2, alto / 2);
		return noLoop();
	} else if (Mundo.puntaje == -7) {
		textSize(32);
		fill(14, 12, 13);
		text("Pierde jugador1", ancho / 2, alto / 2);
		return noLoop();
	}

	if (Mundo.puntaje1 == 7) {
		textSize(32);
		fill(14, 12, 13);
		text("Gana jugador2", ancho / 2, alto / 2);
		return noLoop();
	} else if (Mundo.puntaje1 == -7) {
		textSize(32);
		fill(14, 12, 13);
		text("Pierde jugador2", ancho / 2, alto / 2);
		return noLoop();
	}
}

function chocar(dirs, snakes) {
	if ((first(snakes).x == 39 && dirs.x == 1) || (first(snakes).x == 0 && dirs.x == -1)) {
		return true;
	}

	if ((first(snakes).y == 19 && dirs.y == 1) || (first(snakes).y == 0 && dirs.y == -1)) {
		return true;
	} else return false;
}

function comer(snakes, foods, dirs) {
	if (first(snakes).x * 20 == foods.x && first(snakes).y * 20 == foods.y) {
		return true;
	} else {
		return false;
	}
}

function morderse(lista, lista1, bezaca) {
	if (isEmpty(lista) && isEmpty(lista1)) {
		return false;
	} else if (
		JSON.stringify(first(rest(lista))) === JSON.stringify(bezaca) ||
		JSON.stringify(first(lista1)) === JSON.stringify(bezaca)
	) {
		return true;
	} else {
		return morderse(rest(lista), rest(lista1), bezaca);
	}
}

function ubicarComida(Mundo, snakes, snakes1) {
	const ramdomF = {
		x: Math.round(Math.random(200) * 40) * 20,
		y: Math.round(Math.random(1) * 10) * 20,
	};
	console.log(ramdomF);
	if (
		(ramdomF.x == Mundo.food1.x && ramdomF.y == Mundo.food1.y) ||
		(ramdomF.x == Mundo.food.x && ramdomF.y == Mundo.food.y)
	) {
		return ubicarComida(Mundo, snakes, snakes1);
	}
	if (morderse(snakes, snakes1, { x: ramdomF.x / 20, y: ramdomF.y / 20 })) {
		return ubicarComida(Mundo, snakes, snakes1);
	} else {
		return ramdomF;
	}
}

function actualizoP(puntaje, n) {
	return puntaje + n;
}

3333;
// Esto se ejecuta en cada tic del reloj. Con esto se pueden hacer animaciones
function onTic(Mundo) {
	if (comer(Mundo.snake, Mundo.food, Mundo.dir)) {
		if (Mundo.dir.x == 1) {
			return update(Mundo, {
				food: ubicarComida(Mundo, Mundo.snake, Mundo.snake1),
				snake: cons(
					{ x: first(Mundo.snake).x + 1, y: first(Mundo.snake).y },
					Mundo.snake,
				),
				puntaje: actualizoP(Mundo.puntaje, 1),
			});
		} else if (Mundo.dir.x == -1) {
			return update(Mundo, {
				food: ubicarComida(Mundo, Mundo.snake, Mundo.snake1),
				snake: cons(
					{ x: first(Mundo.snake).x - 1, y: first(Mundo.snake).y },
					Mundo.snake,
				),
				puntaje: actualizoP(Mundo.puntaje, 1),
			});
		} else if (Mundo.dir.y == 1) {
			return update(Mundo, {
				food: ubicarComida(Mundo, Mundo.snake, Mundo.snake1),
				snake: cons(
					{ x: first(Mundo.snake).x, y: first(Mundo.snake).y + 1 },
					Mundo.snake,
				),
				puntaje: actualizoP(Mundo.puntaje, 1),
			});
		} else if (Mundo.dir.y == -1) {
			return update(Mundo, {
				food: ubicarComida(Mundo, Mundo.snake, Mundo.snake1),
				snake: cons(
					{ x: first(Mundo.snake).x, y: first(Mundo.snake).y - 1 },
					Mundo.snake,
				),
				puntaje: actualizoP(Mundo.puntaje, 1),
			});
		}
	}

	//para la segunda serpiente

	if (comer(Mundo.snake1, Mundo.food, Mundo.dir)) {
		if (Mundo.dir1.x == 1) {
			return update(Mundo, {
				food: ubicarComida(Mundo, Mundo.snake, Mundo.snake1),
				snake1: cons(
					{ x: first(Mundo.snake1).x + 1, y: first(Mundo.snake1).y },
					Mundo.snake1,
				),
				puntaje1: actualizoP(Mundo.puntaje1, +1),
			});
		} else if (Mundo.dir1.x == -1) {
			return update(Mundo, {
				food: ubicarComida(Mundo, Mundo.snake, Mundo.snake1),
				snake1: cons(
					{ x: first(Mundo.snake1).x - 1, y: first(Mundo.snake1).y },
					Mundo.snake1,
				),
				puntaje1: actualizoP(Mundo.puntaje1, +1),
			});
		} else if (Mundo.dir1.y == 1) {
			return update(Mundo, {
				food: ubicarComida(Mundo, Mundo.snake, Mundo.snake1),
				snake1: cons(
					{ x: first(Mundo.snake1).x, y: first(Mundo.snake1).y + 1 },
					Mundo.snake1,
				),
				puntaje1: actualizoP(Mundo.puntaje1, +1),
			});
		} else if (Mundo.dir1.y == -1) {
			return update(Mundo, {
				food: ubicarComida(Mundo, Mundo.snake, Mundo.snake1),
				snake1: cons(
					{ x: first(Mundo.snake1).x, y: first(Mundo.snake1).y - 1 },
					Mundo.snake1,
				),
				puntaje1: actualizoP(Mundo.puntaje1, +1),
			});
		}
	}

	//para la otra comida
	if (comer(Mundo.snake, Mundo.food1, Mundo.dir1)) {
		if (Mundo.dir.x == 1) {
			return update(Mundo, {
				food1: ubicarComida(Mundo, Mundo.snake, Mundo.snake1),
				snake: cons(
					{ x: first(Mundo.snake).x + 2, y: first(Mundo.snake).y },
					cons({ x: first(Mundo.snake).x + 1, y: first(Mundo.snake).y }, Mundo.snake),
				),
				puntaje: actualizoP(Mundo.puntaje, -1),
			});
		} else if (Mundo.dir.x == -1) {
			return update(Mundo, {
				food1: ubicarComida(Mundo, Mundo.snake, Mundo.snake1),
				snake: cons(
					{ x: first(Mundo.snake).x - 2, y: first(Mundo.snake).y },
					cons({ x: first(Mundo.snake).x - 1, y: first(Mundo.snake).y }, Mundo.snake),
				),
				puntaje: actualizoP(Mundo.puntaje, -1),
			});
		} else if (Mundo.dir.y == 1) {
			return update(Mundo, {
				food1: ubicarComida(Mundo, Mundo.snake, Mundo.snake1),
				snake: cons(
					{ x: first(Mundo.snake).x, y: first(Mundo.snake).y + 2 },
					cons({ x: first(Mundo.snake).x, y: first(Mundo.snake).y + 1 }, Mundo.snake),
				),
				puntaje: actualizoP(Mundo.puntaje, -1),
			});
		} else if (Mundo.dir.y == -1) {
			return update(Mundo, {
				food1: ubicarComida(Mundo, Mundo.snake, Mundo.snake1),
				snake: cons(
					{ x: first(Mundo.snake).x, y: first(Mundo.snake).y - 2 },
					cons({ x: first(Mundo.snake).x, y: first(Mundo.snake).y - 1 }, Mundo.snake),
				),
				puntaje: actualizoP(Mundo.puntaje, -1),
			});
		}
	}

	//para la segunda serpiente

	if (comer(Mundo.snake1, Mundo.food1, Mundo.dir1)) {
		if (Mundo.dir1.x == 1) {
			return update(Mundo, {
				food1: ubicarComida(Mundo, Mundo.snake, Mundo.snake1),
				snake1: cons(
					{ x: first(Mundo.snake1).x + 2, y: first(Mundo.snake1).y },
					cons({ x: first(Mundo.snake1).x + 1, y: first(Mundo.snake1).y }, Mundo.snake1),
				),
				puntaje1: actualizoP(Mundo.puntaje1, -1),
			});
		} else if (Mundo.dir1.x == -1) {
			return update(Mundo, {
				food1: ubicarComida(Mundo, Mundo.snake, Mundo.snake1),
				snake1: cons(
					{ x: first(Mundo.snake1).x - 2, y: first(Mundo.snake1).y },
					cons({ x: first(Mundo.snake1).x - 1, y: first(Mundo.snake1).y }, Mundo.snake1),
				),
				puntaje1: actualizoP(Mundo.puntaje1, -1),
			});
		} else if (Mundo.dir1.y == 1) {
			return update(Mundo, {
				food1: ubicarComida(Mundo, Mundo.snake, Mundo.snake1),
				snake1: cons(
					{ x: first(Mundo.snake1).x, y: first(Mundo.snake1).y + 2 },
					cons({ x: first(Mundo.snake1).x, y: first(Mundo.snake1).y + 1 }, Mundo.snake1),
				),
				puntaje1: actualizoP(Mundo.puntaje1, -1),
			});
		} else if (Mundo.dir1.y == -1) {
			return update(Mundo, {
				food1: ubicarComida(Mundo, Mundo.snake, Mundo.snake1),
				snake1: cons(
					{ x: first(Mundo.snake1).x, y: first(Mundo.snake1).y - 2 },
					cons({ x: first(Mundo.snake1).x, y: first(Mundo.snake1).y - 1 }, Mundo.snake1),
				),
				puntaje1: actualizoP(Mundo.puntaje1, -1),
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
