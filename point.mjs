

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
}

export { Point };
