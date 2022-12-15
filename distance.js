
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
const point_radius = 6;

function Point(x, y) {
	this.x = x;
	this.y = y;
}

const src_line = new Point(160, 160);
const dst_line = new Point(440, 440);
const point = new Point(300, 160);

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


function drawPoint() {
	ctx.strokeStyle = "#000000";
	ctx.beginPath();
	ctx.moveTo(blank + src_line.x, blank + src_line.y);
	ctx.lineTo(blank + dst_line.x, blank + dst_line.y);
	ctx.closePath();
	ctx.stroke();

	ctx.fillStyle = "#000000";
	ctx.beginPath();
	ctx.arc(blank + src_line.x, blank + src_line.y, point_radius, 0, 2 * Math.PI);
	ctx.closePath();
	ctx.fill();

	ctx.beginPath();
	ctx.arc(blank + dst_line.x, blank + dst_line.y, point_radius, 0, 2 * Math.PI);
	ctx.closePath();
	ctx.fill();

	ctx.fillStyle = "#c82124";
	ctx.beginPath();
	ctx.arc(blank + point.x, blank + point.y, point_radius, 0, 2 * Math.PI);
	ctx.closePath();
	ctx.fill();
}

function updateBoard() {
	if (needToDraw) {
		drawBackground();
		drawGrid();
		drawPoint();
		needToDraw = false;
	}

	setTimeout(updateBoard, 20);
}

init();
updateBoard();