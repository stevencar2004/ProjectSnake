let {
	append: append,
	cons: cons,
	first: first,
	isEmpty: isEmpty,
	isList: isList,
	length: length,
	rest: rest,
	map: map,
	forEach: forEach,
} = functionalLight;
function update(e, a) {
	return Object.assign({}, e, a);
}
let Mundo = {};
function setup() {
	frameRate(velInicial),
		createCanvas(WIDTH, HEIGHT),
		(Mundo = {
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
			dir: { x: 1, y: 0 },
			food: [{ x: 6, y: 4 }],
			trampas: [
				{ x: 4, y: 11 },
				{ x: 20, y: 10 },
				{ x: 30, y: 20 },
				{ x: 25, y: 17 },
			],
			mostrarDonkey: !1,
			donkey: [{ x: 0, y: 0 }],
			dirDonkey: { x: 5, y: 0 },
			mostrarBarril: !1,
			barril: [{ x: 400, y: 10 }],
			dirBarril: { x: 0, y: 9 },
		});
}
function drawGame(e) {
	isEmpty(e.lifes)
		? (drawLifes(e.lifes), (htmlScore.innerHTML = ""), gameOver(e))
		: (forEach(mapa, (a, r) => {
				forEach(a, (a, n) => {
					1 == a && image(e.margenImagen, n * SIZE, r * SIZE, SIZE, SIZE),
						0 == a &&
							(noStroke(), fill(e.fondoInicial), rect(n * SIZE, r * SIZE, SIZE, SIZE));
				});
		  }),
		  drawScore(e.score),
		  drawLifes(e.lifes),
		  drawComida(e.food),
		  drawTrampas(e),
		  drawSnake(e),
		  1 == e.mostrarDonkey && drawDonkey(e),
		  e.mostrarBarril && drawBarril(e.barril));
}
function onTic(e) {
	if ((frameRate(velInicial + e.score / 3), comerSnake(e.snake, e.food, e.dir))) {
		if (1 == e.dir.x)
			return update(e, {
				food: [{ x: getRandomX(), y: getRandomY() }],
				snake: cons({ x: first(e.snake).x + 1, y: first(e.snake).y }, e.snake),
				score: e.score + 1,
			});
		if (-1 == e.dir.x)
			return update(e, {
				food: [{ x: getRandomX(), y: getRandomY() }],
				snake: cons({ x: first(e.snake).x - 1, y: first(e.snake).y }, e.snake),
				score: e.score + 1,
			});
		if (1 == e.dir.y)
			return update(e, {
				food: [{ x: getRandomX(), y: getRandomY() }],
				snake: cons({ x: first(e.snake).x, y: first(e.snake).y + 1 }, e.snake),
				score: e.score + 1,
			});
		if (-1 == e.dir.y)
			return update(e, {
				food: [{ x: getRandomX(), y: getRandomY() }],
				snake: cons({ x: first(e.snake).x, y: first(e.snake).y - 1 }, e.snake),
				score: e.score + 1,
			});
	}
	return gestorColisiones(e) ||
		gestionarMordidas(e.snake, first(e.snake)) ||
		gestionarTrampas(e.snake, e.trampas) ||
		(e.mostrarBarril && gestorColisionesBarril(e.barril, e.snake))
		? update(e, {
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
				lifes: rest(e.lifes),
		  })
		: 1 == gestorColisionesDonkey(e)
		? update(e, {
				dirDonkey: { x: -5, y: 0 },
				snake: moveSnake(e.snake, e.dir),
				donkey: moveDonkey(e.donkey, e.dirDonkey),
		  })
		: 2 == gestorColisionesDonkey(e)
		? update(e, {
				dirDonkey: { x: 5, y: 0 },
				snake: moveSnake(e.snake, e.dir),
				donkey: moveDonkey(e.donkey, e.dirDonkey),
		  })
		: e.score >= 13 && e.score < 19
		? (world.setAttribute("style", 'background-image: url("img/acuario.jpg");'),
		  update(e, {
				fondoInicial: "blue",
				comidaImagen: pez,
				margenImagen: algas,
				trampaImagen: mina,
				snake: moveSnake(e.snake, e.dir),
		  }))
		: e.score >= 19 && e.score < 26
		? (world.setAttribute("style", 'background-image: url("img/llamarada.jpg");'),
		  frameRate(velInicial + e.score / 2),
		  update(e, {
				fondoInicial: "#e85d04",
				comidaImagen: carne,
				margenImagen: fuego,
				colorSnake: "#3f0c0c",
				trampaImagen: hoguera,
				snake: moveSnake(e.snake, e.dir),
		  }))
		: (first(e.donkey).x >= 401 && first(e.donkey).x <= 679 && 5 == e.dirDonkey.x) ||
		  (first(e.donkey).x <= 400 && first(e.donkey).x >= 20 && -5 == e.dirDonkey.x)
		? update(e, {
				barril: moveBarril(e.barril, e.dirBarril),
				snake: moveSnake(e.snake, e.dir),
				donkey: moveDonkey(e.donkey, e.dirDonkey),
		  })
		: first(e.donkey).x < 20 || first(e.donkey).x > 679
		? update(e, {
				snake: moveSnake(e.snake, e.dir),
				donkey: moveDonkey(e.donkey, e.dirDonkey),
				barril: [{ x: 400, y: 10 }],
				mostrarBarril: !1,
		  })
		: e.score >= 26
		? update(e, {
				mostrarDonkey: !0,
				donkey: moveDonkey(e.donkey, e.dirDonkey),
				snake: moveSnake(e.snake, e.dir),
		  })
		: update(e, { snake: moveSnake(e.snake, e.dir) });
}
function onMouseEvent(e, a) {
	return update(e, {});
}
function onKeyEvent(e, a) {
	return 1 == e.dir.x && a == UP_ARROW
		? update(e, { dir: { y: -1, x: 0 } })
		: 1 == e.dir.x && a == DOWN_ARROW
		? update(e, { dir: { y: 1, x: 0 }, direction: "DOWN" })
		: -1 == e.dir.x && a == UP_ARROW
		? update(e, { dir: { y: -1, x: 0 } })
		: -1 == e.dir.x && a == DOWN_ARROW
		? update(e, { dir: { y: 1, x: 0 }, direction: "DOWN" })
		: 1 == e.dir.y && a == LEFT_ARROW
		? update(e, { dir: { y: 0, x: -1 }, direction: "LEFT" })
		: 1 == e.dir.y && a == RIGHT_ARROW
		? update(e, { dir: { y: 0, x: 1 }, direction: "RIGHT" })
		: -1 == e.dir.y && a == LEFT_ARROW
		? update(e, { dir: { y: 0, x: -1 }, direction: "LEFT" })
		: -1 == e.dir.y && a == RIGHT_ARROW
		? update(e, { dir: { y: 0, x: 1 }, direction: "RIGHT" })
		: update(e, {});
}
