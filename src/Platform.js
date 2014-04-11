var SPRITE_WIDTH = 60;
var SPRITE_HEIGHT = 20;

var Platform = cc.Sprite.extend({
    ctor: function( x, y ) {
		this._super();
		this.initWithFile( 'res/images/platform.png' , cc.rect( x, y, SPRITE_WIDTH, SPRITE_HEIGHT ) );
		this.setAnchorPoint( cc.p( 0.5, 0.5 ) );
		this.setPosition( cc.p( x, y ) );
		
		this.x = x;
		this.y = y;
		
		this.vx = 0;
		this.velocity = 10;
    },
	
	hitTop: function( oldRect, newRect ) {
		var blockRect = this.getBoundingBoxToWorld();
		if( cc.rectGetMidY( oldRect ) >= cc.rectGetMaxY( blockRect ) ) {
			var unionRect = cc.rectUnion( oldRect, newRect );
			return cc.rectIntersectsRect( unionRect, blockRect );
		}
		return false;
	},
	
	update: function( dt ) {
		
	},
	
	getTopY: function() {
		return cc.rectGetMaxY( this.getBoundingBoxToWorld() );
	}
});