
import { Point } from './point.mjs';
import { drawRect, drawLine, drawPoint } from './draw.mjs';
import { getMousePos } from './canvas_utils.mjs';
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
const p_foot_perpendicular = new Point(0, 0);
let p_list;

let dragging_point = null;
let needToDraw = true;

function init() {
	p_list = [p_a, p_b, p_c];

	c.addEventListener("mousedown", mouseDownListener, false);
}

function mouseDownListener(evt) {
	const mouse_pos = getMousePos(c, evt);
	p_list.every(p => {
		if (p.Hover(mouse_pos)) {
			dragging_point = p;
			window.addEventListener("mousemove", mouseMoveListener, false);
			window.addEventListener("mouseup", mouseUpListener, false);
			return false;
		}

		return true;
	});
}

function mouseMoveListener(evt) {
	if (!dragging_point) return;

	const new_pos = getMousePos(c, evt);

	let overlapped = false;
	p_list.every(p => {
		if (p == dragging_point)
			return false;
		
		if (new_pos.Overlapped(p)) {
			overlapped = true;
			return false;
		}

		return true;
	});

	if ( overlapped ) return;

	if (new_pos.x < 0) new_pos.x = 0;
	if (new_pos.y < 0) new_pos.y = 0;
	if (new_pos.x > CONST.col * CONST.grid_size) new_pos.x = CONST.col * CONST.grid_size;
	if (new_pos.y > CONST.row * CONST.grid_size) new_pos.y = CONST.row * CONST.grid_size;
	dragging_point.x = new_pos.x;
	dragging_point.y = new_pos.y;

	needToDraw = true;
}

function mouseUpListener(evt) {
	window.removeEventListener("mousemove", mouseMoveListener, false);
	window.removeEventListener("mouseup", mouseUpListener, false);
	dragging_point = null;
}

function updateBackground() {
	const src = new Point(-10, -10);
	const dst = new Point(width + 10, height + 10);
	drawRect(ctx, src, dst, COLOR.White);

	for (let c = 0; c <= CONST.col; c++) {
		const src = new Point(c * CONST.grid_size, 0);
		const dst = new Point(c * CONST.grid_size, CONST.row * CONST.grid_size);
		drawLine(ctx, src, dst, COLOR.Olive);
	}
	for (let r = 0; r <= CONST.row; r++) {
		const src = new Point(0, r * CONST.grid_size);
		const dst = new Point(CONST.col * CONST.grid_size, r * CONST.grid_size);
		drawLine(ctx, src, dst, COLOR.Olive);
	}
}

function updateDistance() {
	const v_ab = p_b.Sub(p_a);
	const v_ac = p_c.Sub(p_a);
	const dot_a = v_ab.Dot(v_ac);
	if ( dot_a < 0 )
	{
		p_foot_perpendicular.Copy(p_a);
		drawLine(ctx, p_c, p_a, COLOR.StrongRed);
		return;
	}
	
	const v_ba = p_a.Sub(p_b);
	const v_bc = p_c.Sub(p_b);
	const dot_b = v_ba.Dot(v_bc);
	if ( dot_b < 0 )
	{
		p_foot_perpendicular.Copy(p_b);
		drawLine(ctx, p_c, p_b, COLOR.StrongRed);
		return;
	}

	p_foot_perpendicular.Copy(
		p_a.Add(v_ab.Normalize().Mul(dot_a).Div(v_ab.Length())));
	drawLine(ctx, p_c, p_foot_perpendicular, COLOR.StrongRed);
}

function updatePoint() {
	drawLine(ctx, p_a, p_b, COLOR.Black);
	drawPoint(ctx, p_a, COLOR.Black);
	drawPoint(ctx, p_b, COLOR.Black);
	drawPoint(ctx, p_c, COLOR.StrongRed);
	drawPoint(ctx, p_foot_perpendicular, COLOR.StrongRed);
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