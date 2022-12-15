
import { Point } from './point.mjs';
import * as CONST from './constants.mjs';

/* canvas setting */
const c = document.getElementById("board");
const ctx = c.getContext("2d");
const width = 600;
const height = 600;

const p_a = new Point(160, 160);
const p_b = new Point(440, 440);
const p_c = new Point(300, 160);

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
	for (let c = 0; c <= CONST.col; c++) {
		ctx.beginPath();
		ctx.moveTo(CONST.blank + c * CONST.grid_size, CONST.blank);
		ctx.lineTo(CONST.blank + c * CONST.grid_size, CONST.blank + CONST.row * CONST.grid_size);
		ctx.stroke();
	}
	for (let r = 0; r <= CONST.row; r++) {
		ctx.beginPath();
		ctx.moveTo(CONST.blank, CONST.blank + r * CONST.grid_size);
		ctx.lineTo(CONST.blank + CONST.col * CONST.grid_size, CONST.blank + r * CONST.grid_size);
		ctx.stroke();
	}
}

function drawDistance() {
	// 1. scalar product v_ab.v_ac
	const v_ab = p_b.Sub(p_a);
	const v_ac = p_c.Sub(p_a);

	console.log(p_b);
	console.log(v_ab);
}

function drawPoint() {
	ctx.strokeStyle = "#000000";
	ctx.beginPath();
	ctx.moveTo(CONST.blank + p_a.x, CONST.blank + p_a.y);
	ctx.lineTo(CONST.blank + p_b.x, CONST.blank + p_b.y);
	ctx.closePath();
	ctx.stroke();

	ctx.fillStyle = "#000000";
	ctx.beginPath();
	ctx.arc(CONST.blank + p_a.x, CONST.blank + p_a.y, CONST.point_radius , 0, 2 * Math.PI);
	ctx.closePath();
	ctx.fill();

	ctx.beginPath();
	ctx.arc(CONST.blank + p_b.x, CONST.blank + p_b.y, CONST.point_radius , 0, 2 * Math.PI);
	ctx.closePath();
	ctx.fill();

	ctx.fillStyle = "#c82124";
	ctx.beginPath();
	ctx.arc(CONST.blank + p_c.x, CONST.blank + p_c.y, CONST.point_radius , 0, 2 * Math.PI);
	ctx.closePath();
	ctx.fill();
}

function updateBoard() {
	if (needToDraw) {
		drawBackground();
		drawGrid();
		drawDistance();
		drawPoint();
		needToDraw = false;
	}

	setTimeout(updateBoard, 20);
}

init();
updateBoard();