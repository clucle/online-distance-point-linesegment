
import { Point } from './point.mjs';
import { DrawRect, DrawLine, DrawPoint } from './draw.mjs';
import * as CONST from './constants.mjs';
import * as COLOR from './colors.mjs';

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

function updateBackground() {
	const src = new Point(0, 0);
	const dst = new Point(width, height);
	DrawRect(ctx, src, dst, COLOR.White);

	for (let c = 0; c <= CONST.col; c++) {
		const src = new Point(c * CONST.grid_size, 0);
		const dst = new Point(c * CONST.grid_size, CONST.row * CONST.grid_size);
		DrawLine(ctx, src, dst, COLOR.Olive);
	}
	for (let r = 0; r <= CONST.row; r++) {
		const src = new Point(0, r * CONST.grid_size);
		const dst = new Point(CONST.col * CONST.grid_size, r * CONST.grid_size);
		DrawLine(ctx, src, dst, COLOR.Olive);
	}
}

function updateDistance() {
	const v_ab = p_b.Sub(p_a);
	const v_ac = p_c.Sub(p_a);
	const cos_a = v_ab.Dot(v_ac);
	if ( cos_a < 0 )
	{
		// distance to a
		return;
	}
	
	const v_ba = p_b.Sub(p_b);
	const v_bc = p_c.Sub(p_b);
	const cos_b = v_ba.Dot(v_bc);
	if ( cos_b < 0 )
	{
		// distance to b
		return;
	}

	// distance to line
}

function updatePoint() {
	DrawLine(ctx, p_a, p_b, COLOR.Black);
	DrawPoint(ctx, p_a, COLOR.Black);
	DrawPoint(ctx, p_b, COLOR.Black);
	DrawPoint(ctx, p_c, COLOR.StrongRed);
}

function updateBoard() {
	if (needToDraw) {
		updateBackground();
		updateDistance();
		updatePoint();
		needToDraw = false;
	}

	setTimeout(updateBoard, 20);
}

init();
updateBoard();