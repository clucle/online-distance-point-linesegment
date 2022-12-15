
/* canvas setting */
const c = document.getElementById("board");
const ctx = c.getContext("2d");
const width = 600;
const height = 600;

/* draw setting */
const blank = 12;
const row = 18;
const col = 18;
const grid_size = 32;

let needToDraw = true;

function init() {

}

function drawBackground() {
	ctx.fillStyle = "#fff";
	ctx.fillRect(0, 0, width, height);
}

function drawGrid() {
	ctx.strokeStyle = "#333300";
	ctx.fillStyle = "#333300";
	for (let c = 0; c <= col; c++) {
		ctx.beginPath();
		ctx.moveTo(blank + c * grid_size, blank);
		ctx.lineTo(blank + c * grid_size, blank + row * grid_size);
		ctx.stroke();
	}
	for (let r = 0; r <= row; r++) {
		ctx.beginPath();
		ctx.moveTo(blank, blank + r * grid_size);
		ctx.lineTo(blank + col * grid_size, blank + r * grid_size);
		ctx.stroke();
	}
}

function updateBoard() {
	if (needToDraw) {
		drawBackground();
		drawGrid();
		needToDraw = false;
	}

	setTimeout(updateBoard, 20);
}

init();
updateBoard();