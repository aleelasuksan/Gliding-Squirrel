var Platform = cc.Sprite.extend({
    ctor: function( x, y ) {
		this._super();
		this.initWithFile( 'res/images/platform.png' , cc.rect( x, y, 60, 20 ) );
		this.setAnchorPoint( cc.p( 0.5, 0.5 ) );
		this.setPosition( cc.p( x, y ) );
    },
	
	hitTop: function( oldRect, newRect ) {
		var blockRect = this.getBoundingBoxToWorld();
		if( cc.rectGetMidY( oldRect ) >= cc.rectGetMidY( blockRect ) ) {
			var uRect = cc.rectUnion( oldRect, newRect );
			return cc.rectIntersectsRect( uRect, blockRect );
		}
		return false;
	},
	
	getTopY: function() {
		return cc.rectGetMaxY( this.getBoundingBoxToWorld() );
	}
});