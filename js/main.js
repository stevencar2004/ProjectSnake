// Importamos la libreria Functional Light
let { append, cons, first, isEmpty, isList, length, rest, map, forEach } =
	functionalLight;

// Actualiza los atributos del objeto y retorna una copia profunda
function update(data, attribute) {
	return Object.assign({}, data, attribute);
}

// ///////// Propiedades del Mundo inicial
let Mundo = {};

// ///////// Funcion inicial del juego
function setup() {
	frameRate(velInicial);
	createCanvas(WIDTH, HEIGHT);

	Mundo = {
		fondoInicial: "#006400",
		comidaImagen: manzana,
		trampaImagen: bomba,
		margenImagen: tronco,
		score: 0,
		lifes: ["❤", "❤", "❤"],
		colorSnake: "",
		snake: [
			{ x: 7, y: 5 },
			{ x: 6, y: 5 },
		],
		//Con esta opcion la serpiente inicia en un movimiento constante
		dir: { x: 1, y: 0 },
		// Indica la posicion de la comida
		food: [{ x: 6, y: 4 }],
		// Indica la posicion de las trampas
		trampas: [
			{ x: 4, y: 11 },
			{ x: 20, y: 10 },
			{ x: 30, y: 20 },
			{ x: 25, y: 17 },
		],
		// Propeidades del donkey, solo se ejecutan en el ultimo mapa
		mostrarDonkey: false,
		donkey: [{ x: 0, y: 0 }],
		dirDonkey: { x: 5, y: 0 },
		// Propiedades del barril
		mostrarBarril: false,
		barril: [{ x: 400, y: 10 }],
		dirBarril: { x: 0, y: 9 },
	};
}
function drawGame(Mundo) {
	if (isEmpty(Mundo.lifes)) {
		drawLifes(Mundo.lifes);
		htmlScore.innerHTML = "";
		gameOver(Mundo);
	} else {
		//Dibujamos el mapa
		forEach(mapa, (row, i) => {
			forEach(row, (cell, j) => {
				if (cell == 1) {
					image(Mundo.margenImagen, j * SIZE, i * SIZE, SIZE, SIZE);
				}
				if (cell == 0) {
					noStroke();
					fill(Mundo.fondoInicial);
					rect(j * SIZE, i * SIZE, SIZE, SIZE);
				}
			});
		});
		drawScore(Mundo.score);
		drawLifes(Mundo.lifes);
		drawComida(Mundo.food);
		drawTrampas(Mundo);
		drawSnake(Mundo);
		if (Mundo.mostrarDonkey) {
			drawDonkey(Mundo);
		}
		if (Mundo.mostrarBarril) {
			drawBarril(Mundo.barril);
		}
	}
}

// ///////// Manejadores de Eventos

// Esto se ejecuta en cada tic del reloj. Con esto se pueden hacer animaciones
function onTic(Mundo) {
	frameRate(velInicial + Mundo.score / 3);
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
	if (
		gestorColisiones(Mundo) ||
		gestionarMordidas(Mundo.snake, first(Mundo.snake)) ||
		gestionarTrampas(Mundo.snake, Mundo.trampas)
	) {
		return update(Mundo, {
			snake: [
				{ x: 7, y: 5 },
				{ x: 6, y: 5 },
			],
			trampas: [
				{ x: getRandomX(), y: getRandomY() },
				{ x: getRandomX(), y: getRandomY() },
				{ x: getRandomX(), y: getRandomY() },
				{ x: getRandomX(), y: getRandomY() },
			],

			dir: { x: 1, y: 0 },
			lifes: rest(Mundo.lifes),
		});
	}
	if (Mundo.mostrarBarril && gestorColisionesBarril(Mundo.barril, Mundo.snake)) {
		return update(Mundo, {
			snake: [
				{ x: 7, y: 5 },
				{ x: 6, y: 5 },
			],
			trampas: [
				{ x: getRandomX(), y: getRandomY() },
				{ x: getRandomX(), y: getRandomY() },
				{ x: getRandomX(), y: getRandomY() },
				{ x: getRandomX(), y: getRandomY() },
			],

			dir: { x: 1, y: 0 },
			lifes: rest(Mundo.lifes),
		});
	}
	if (gestorColisionesDonkey(Mundo) == 1) {
		return update(Mundo, {
			dirDonkey: { x: -5, y: 0 },
			snake: moveSnake(Mundo.snake, Mundo.dir),
			donkey: moveDonkey(Mundo.donkey, Mundo.dirDonkey),
		});
	}
	if (gestorColisionesDonkey(Mundo) == 2) {
		return update(Mundo, {
			dirDonkey: { x: 5, y: 0 },
			snake: moveSnake(Mundo.snake, Mundo.dir),
			donkey: moveDonkey(Mundo.donkey, Mundo.dirDonkey),
		});
	}
	// Gestor de Dificultad y Cambio de Mundos
	if (Mundo.score >= 2 && Mundo.score < 8) {
		// world.setAttribute("style", 'background-image: url("img/acuario.jpg");');
		return update(Mundo, {
			fondoInicial: "blue",
			comidaImagen: pez,
			margenImagen: algas,
			trampaImagen: mina,
			snake: moveSnake(Mundo.snake, Mundo.dir),
		});
	}
	if (Mundo.score >= 8 && Mundo.score < 12) {
		// world.setAttribute("style", 'background-image: url("img/llamarada.jpg");');
		frameRate(velInicial + Mundo.score / 2);
		return update(Mundo, {
			fondoInicial: "#e85d04",
			comidaImagen: carne,
			margenImagen: fuego,
			colorSnake: "#3f0c0c",
			trampaImagen: hoguera,
			snake: moveSnake(Mundo.snake, Mundo.dir),
		});
	}
	if (
		(first(Mundo.donkey).x >= 401 &&
			first(Mundo.donkey).x <= 679 &&
			Mundo.dirDonkey.x == 5) ||
		(first(Mundo.donkey).x <= 400 &&
			first(Mundo.donkey).x >= 20 &&
			Mundo.dirDonkey.x == -5)
	) {
		return update(Mundo, {
			barril: moveBarril(Mundo.barril, Mundo.dirBarril),
			snake: moveSnake(Mundo.snake, Mundo.dir),
			donkey: moveDonkey(Mundo.donkey, Mundo.dirDonkey),
		});
	}
	if (first(Mundo.donkey).x < 20 || first(Mundo.donkey).x > 679) {
		return update(Mundo, {
			snake: moveSnake(Mundo.snake, Mundo.dir),
			donkey: moveDonkey(Mundo.donkey, Mundo.dirDonkey),
			barril: [{ x: 400, y: 10 }],
			mostrarBarril: false,
		});
	}
	if (Mundo.score >= 12) {
		// Aparece el simio
		return update(Mundo, {
			mostrarDonkey: true,
			donkey: moveDonkey(Mundo.donkey, Mundo.dirDonkey),
			snake: moveSnake(Mundo.snake, Mundo.dir),
		});
	}
	return update(Mundo, {
		snake: moveSnake(Mundo.snake, Mundo.dir),
	});
}

//Implemente esta función si quiere que su programa reaccione a eventos del mouse
function onMouseEvent(Mundo, event) {
	return update(Mundo, {});
}

// Cambiamos solo la dirección de la serpiente De acuerdo a la tecla presionada
// la serpiente se movera en la direccion que le digamos hasta volver a cambiarle la direccion
function onKeyEvent(Mundo, keyCode) {
	if (Mundo.dir.x == 1 && keyCode == UP_ARROW) {
		return update(Mundo, { dir: { y: -1, x: 0 } });
	}
	if (Mundo.dir.x == 1 && keyCode == DOWN_ARROW) {
		return update(Mundo, { dir: { y: 1, x: 0 }, direction: "DOWN" });
	}
	if (Mundo.dir.x == -1 && keyCode == UP_ARROW) {
		return update(Mundo, { dir: { y: -1, x: 0 } });
	}
	if (Mundo.dir.x == -1 && keyCode == DOWN_ARROW) {
		return update(Mundo, { dir: { y: 1, x: 0 }, direction: "DOWN" });
	}

	if (Mundo.dir.y == 1 && keyCode == LEFT_ARROW) {
		return update(Mundo, { dir: { y: 0, x: -1 }, direction: "LEFT" });
	}
	if (Mundo.dir.y == 1 && keyCode == RIGHT_ARROW) {
		return update(Mundo, { dir: { y: 0, x: 1 }, direction: "RIGHT" });
	}
	if (Mundo.dir.y == -1 && keyCode == LEFT_ARROW) {
		return update(Mundo, { dir: { y: 0, x: -1 }, direction: "LEFT" });
	}
	if (Mundo.dir.y == -1 && keyCode == RIGHT_ARROW) {
		return update(Mundo, { dir: { y: 0, x: 1 }, direction: "RIGHT" });
	}
	return update(Mundo, {});
}
