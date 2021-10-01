// ///////// Dibujar Los Elementos del Juego En La Pantalla

/**
 * Agrega el elemento value al comienzo de la lista.
 * @param {Array <Object>} Mundo
 * @returns {void}
 */
function drawSnake(Mundo) {
	fill(Mundo.colorSnake);
	forEach(Mundo.snake, (pos) => {
		rect(pos.x * dx + dx / 2, pos.y * dy + dy / 2, dx, dy, 8);
	});
}

/**
 * Funcion que me dibuja la comida en el mapa
 * @param {Array} food
 * @returns {void}
 */
function drawComida(food) {
	forEach(food, (pos) => {
		image(Mundo.comidaImagen, pos.x * dx + dx / 2, pos.y * dy + dy / 2, dx, dy);
	});
}

/**
 * Función que me dibuja las trampas en el mapa
 * @param {array <object>} mundo
 * @returns {Void}
 */
function drawTrampas(Mundo) {
	forEach(Mundo.trampas, (pos) => {
		image(Mundo.trampaImagen, pos.x * dx + dx / 2, pos.y * dy + dy / 2, dx, dy);
	});
}

/**
 *funcion que me dibuja el número de vidas en el mapa
 * @param {array } lifes
 * @returns {Void}
 */
function drawLifes(lifes) {
	htmlLifes.innerHTML = lifes;
}

/**
 * Funcion que me dibuja el marcador en el mapa
 * @param {array} score
 * @returns {Void}
 */
function drawScore(score) {
	htmlScore.innerHTML = "Puntaje: " + score;
}

/**
 * Funcion que me dibuja los barriles en el mapa
 * @param {array } barril
 * @returns {void}
 */
function drawBarril(barril) {
	forEach(barril, (pos) => {
		image(imgBarril, pos.x, pos.y, SIZE * 2, SIZE * 2);
	});
}

/**
 * Funcion que me dibuja el simio en el mapa
 * @param {array <object>} mundo
 * @returns {Void}
 */
function drawDonkey(Mundo) {
	const head = first(Mundo.donkey);
	if (head.x >= 400 && head.x <= 440) {
		forEach(Mundo.donkey, (pos) => {
			image(donkeyBarril, pos.x, pos.y, SIZE * 2, SIZE * 2);
		});
		Mundo.mostrarBarril = true;
	} else {
		forEach(Mundo.donkey, (pos) => {
			image(donkeyNormal, pos.x, pos.y, SIZE * 2, SIZE * 2);
		});
	}
}
