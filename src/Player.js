var Player = cc.Sprite.extend({
	ctor: function() {
		this._super();
		this.initWithFile( 'res/images/player.png' );
		this.setAnchorPoint( cc.p( 0.5, 0.5 ) );
		console.log('init player');
	}
});