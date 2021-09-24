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
