var Platform = cc.Sprite.extend({
    ctor: function() {
		this._super();
		this.initWithFile( 'res/images/platform.png' );
		//this.setPosition( cc.p( 400, 300 ) );
    }
});