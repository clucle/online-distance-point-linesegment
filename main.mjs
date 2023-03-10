
import { Point } from './point.mjs';
import { drawRect, drawLine, drawPoint, drawText } from './draw.mjs';
import { getMousePos } from './canvas_utils.mjs';
import * as CONST from './constants.mjs';
import * as COLOR from './colors.mjs';

/* canvas setting */
const c = document.getElementById("board");
const ctx = c.getContext("2d");
const width = 600;
const height = 600;

/* html setting */
const text_distance = document.getElementById("text-description");

const p_a = new Point(160, 160);
const p_b = new Point(440, 440);
const p_c = new Point(300, 160);
const p_closest = new Point(0, 0);
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
	needToDraw = true;
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

function updateClosestPoint(p)
{
	p_closest.Copy(p);
	drawLine(ctx, p_c, p, COLOR.StrongRed);
}

function updateDistance() {
	const v_ab = p_b.Sub(p_a);
	const v_ac = p_c.Sub(p_a);
	const dot_a = v_ab.Dot(v_ac);
	if ( dot_a < 0 )
	{
		updateClosestPoint(p_a);
		return;
	}
	
	const v_ba = p_a.Sub(p_b);
	const v_bc = p_c.Sub(p_b);
	const dot_b = v_ba.Dot(v_bc);
	if ( dot_b < 0 )
	{
		updateClosestPoint(p_b);
		return;
	}

	updateClosestPoint(p_a.Add(v_ab.Normalize().Mul(dot_a).Div(v_ab.Length())));

	text_distance.innerHTML = "Point A : " + p_a.x + ", " + p_a.y + "<br />";
	text_distance.innerHTML += "Point B : " + p_b.x + ", " + p_b.y + "<br />";
	text_distance.innerHTML += "Point C : " + p_c.x + ", " + p_c.y + "<br />";
	text_distance.innerHTML += "Point Closest : " + p_closest.x + ", " + p_closest.y + "<br />";
	text_distance.innerHTML += "Distance : " + p_c.Distance(p_closest);
}

function updatePoint() {
	drawLine(ctx, p_a, p_b, COLOR.Black);
	drawPoint(ctx, p_a, p_a === dragging_point ? COLOR.VeryLightLimeGreen  : COLOR.Black);
	drawPoint(ctx, p_b, p_b === dragging_point ? COLOR.VeryLightLimeGreen : COLOR.Black);
	drawPoint(ctx, p_c, p_c === dragging_point ? COLOR.VeryLightLimeGreen : COLOR.StrongRed);
	drawPoint(ctx, p_closest, COLOR.StrongRed);

	drawText(ctx, p_a, "A", COLOR.Black);
	drawText(ctx, p_b, "B", COLOR.Black);
	drawText(ctx, p_c, "C", COLOR.Black);
	drawText(ctx, p_closest, "Closest", COLOR.Black);
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