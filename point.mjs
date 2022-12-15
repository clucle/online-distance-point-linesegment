import * as CONST from './constants.mjs';

class Point {
	constructor(x,y) {
		this.x = x;
		this.y = y;
	}

	Add( other )
	{
		return new Point( this.x + other.x, this.y + other.y );
	}

	Sub( other )
	{
		return new Point( this.x - other.x, this.y - other.y );
	}

	Dot( other )
	{
		return this.x * other.x + this.y * other.y;
	}

	Hover( point )
	{
		return (
			(point.x > this.x - CONST.point_radius) && 
			(point.x < this.x + CONST.point_radius) &&
			(point.y > this.y - CONST.point_radius) &&
			(point.y < this.y + CONST.point_radius));
	}
}

export { Point };
