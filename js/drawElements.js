// ///////// Dibujar Los Elementos del Juego En La Pantalla

//Dibujamos nuestra Snake
function drawSnake(Mundo) {
	fill(Mundo.colorSnake);
	forEach(Mundo.snake, (pos) => {
		rect(pos.x * dx + dx / 2, pos.y * dy + dy / 2, dx, dy, 8);
	});
}

// Funcion que me dibuja la comida en el mapa
function drawComida(food) {
	fill("#0a8652");
	forEach(food, (pos) => {
		// rect(pos.x * dx + dx / 2, pos.y * dy + dy / 2, dx, dy, 10);
		image(Mundo.comidaImagen, pos.x * dx + dx / 2, pos.y * dy + dy / 2, dx, dy);
	});
}

// Funcion que me dibuja las trampas
function drawTrampas(Mundo) {
	forEach(Mundo.trampas, (pos) => {
		image(Mundo.trampaImagen, pos.x * dx + dx / 2, pos.y * dy + dy / 2, dx, dy);
	});
}

//Dibujamos el numero de vidas que contenga la lista
function drawLifes(lifes) {
	htmlLifes.innerHTML = lifes;
}

//Dibujamos el marcador del juego
function drawScore(score) {
	htmlScore.innerHTML = "Puntaje: " + score;
}

//
function drawBarril(barril) {
	forEach(barril, (pos) => {
		image(imgBarril, pos.x, pos.y, SIZE * 2, SIZE * 2);
	});
}

//
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
