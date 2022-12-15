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

	Distance( point )
	{
		let x = this.x - point.x;
		let y = this.y - point.y;
		return Math.sqrt(x * x + y * y);
	}

	Overlapped( point )
	{
		if (this.Distance( point ) < 2 * CONST.point_radius)
			return true;

		return false;
	}

	Length()
	{
		return Math.sqrt(this.x * this.x + this.y * this.y);
	}

	Normalize()
	{
		return this.Div(this.Length());
	}

	Div( n )
	{
		return new Point(this.x / n, this.y / n);
	}

	Mul( n )
	{
		return new Point(this.x * n, this.y * n);
	}

	Copy( other )
	{
		this.x = other.x;
		this.y = other.y;
	}
}

export { Point };
