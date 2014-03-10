var Player = cc.Sprite.extend({
	ctor: function( x, y ) {
		this._super();
		this.initWithFile( 'res/images/player.png' );
		this.setAnchorPoint( cc.p( 0.5, 0.5 ) );
		this.x = x;
		this.y = y;
		this.v = 30;
		this.g = -1;
		this.isJump = false;
		this.updatePosition();
		console.log('init player');
	},
	
	update: function( dt ) {
		if(this.isJump) {
			console.log('jump');
			this.y += this.v;
			this.updatePosition();
			this.v += this.g;
		}
	},
	
	jump: function() {
		this.isJump = true;
	},
	
	updatePosition: function() {
		this.setPosition( cc.p( this.x, this.y ) );
	}
	
});