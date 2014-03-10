var GameLayer = cc.LayerColor.extend({
    init: function() {
        this._super( new cc.Color4B( 127, 127, 127, 255 ) );
        this.setPosition( new cc.Point( 0, 0 ) );
		this.player = new Player( 400, 100 );
		this.addChild(this.player);
		this.player.scheduleUpdate();
		console.log('finish init gamelayer');
		this.setKeyboardEnabled( true );
		//this.scheduleUpdate();
        return true;
    },
	
	onKeyDown: function( e ) {
		if( ( e == cc.KEY.up || e == cc.KEY.space ) && !this.player.isJump ) {
			this.player.jump();
		}
	}
});

var StartScene = cc.Scene.extend({
    onEnter: function() {
        this._super();
        var layer = new GameLayer();
        layer.init();
        this.addChild( layer );
    }
});

