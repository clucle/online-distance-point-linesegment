import * as CONST from './constants.mjs';

export function drawRect(ctx, p1, p2, color) {
    ctx.fillStyle = color;
    ctx.fillRect(
        CONST.blank + p1.x, CONST.blank + p1.y, CONST.blank + p2.x, CONST.blank + p2.y);
}

export function drawLine(ctx, p1, p2, color) {
    ctx.strokeStyle = color;
	ctx.beginPath();
	ctx.moveTo(CONST.blank + p1.x, CONST.blank + p1.y);
	ctx.lineTo(CONST.blank + p2.x, CONST.blank + p2.y);
	ctx.closePath();
	ctx.stroke();
}

export function drawPoint(ctx, p, color) {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(CONST.blank + p.x, CONST.blank + p.y, CONST.point_radius , 0, 2 * Math.PI);
    ctx.closePath();
    ctx.fill();
}
