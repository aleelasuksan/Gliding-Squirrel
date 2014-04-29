var SPRITE_WIDTH = 60;
var SPRITE_HEIGHT = 20;
var SCREEN_WIDTH = 800;

var Platform = cc.Sprite.extend({
    ctor: function( x, y ) {
		this._super();
		this.initWithFile( 'res/images/platform.png' , cc.rect( x, y, SPRITE_WIDTH, SPRITE_HEIGHT ) );
		this.setAnchorPoint( cc.p( 0.5, 0.5 ) );
		this.setPosition( cc.p( x, y ) );
		
		this.x = x;
		this.y = y;
		
		this.direction = null;
		this.velocity = 0;
		this.scheduleUpdate();
    },
	
	hitTop: function( oldRect, newRect ) {
		var blockRect = this.getBoundingBoxToWorld();
		if( cc.rectGetMinY( oldRect ) >= cc.rectGetMaxY( blockRect ) ) {
			var unionRect = cc.rectUnion( oldRect, newRect );
			return cc.rectIntersectsRect( unionRect, blockRect );
		}
		return false;
	},
	
	update: function( dt ) {
		this.updateMovement();
		this.updateSpritePosition();
	},
	
	getTopY: function() {
		return cc.rectGetMaxY( this.getBoundingBoxToWorld() );
	},
	
	updateSpritePosition: function() {
		this.setPosition( cc.p( this.x, this.y ) );
	},
	
	updateMovement: function() {
		if( this.direction == 'right' ) {
			this.x += this.velocity;
			if( ( this.x / SCREEN_WIDTH ) > 0.95 ) this.direction = 'left';
		}
		else if( this.direction == 'left' ) {
			this.x -= this.velocity;
			if( ( this.x / SCREEN_WIDTH ) < 0.05 ) this.direction = 'right';
		}
	},
	
	setRight: function() {
		this.direction = 'right';
	},
	
	setLeft: function() {
		this.direction = 'left';
	},
	
	setVelocity: function( v ) {
		this.velocity = v;
	},
	
	moveDown: function() {
		this.y-=1;
		this.updateSpritePosition();
	}
});