import { Point } from "./point.mjs";
import * as CONST from './constants.mjs';

export function getMousePos(canvas, evt) {
	var rect = canvas.getBoundingClientRect();

    return new Point(
        (evt.clientX - rect.left) * (canvas.width / rect.width) - CONST.blank,
        (evt.clientY - rect.top) * (canvas.height / rect.height) - CONST.blank);
}