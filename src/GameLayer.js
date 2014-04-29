var GameLayer = cc.LayerColor.extend({
    init: function() {
        this._super( new cc.Color4B( 127, 127, 127, 255 ) );
        this.setPosition( new cc.Point( 0, 0 ) );
		
		
		this.player = new Player( 400, 100 );
		this.addChild(this.player);
		this.player.scheduleUpdate();
		this.start = false;
		
		this.blocks = [];
		this.platform1 = new Platform( 400, 300 );
		this.blocks.push( this.platform1 );
		this.addChild( this.platform1 );
		
		this.platform2 = new Platform( 400, 50 );
		this.blocks.push( this.platform2 );
		this.addChild( this.platform2 );
		
		this.platform4 = new Platform( 400, 550 );
		this.blocks.push( this.platform4 );
		this.addChild( this.platform4 );
		
		this.platform1.setVelocity( 5 );
		this.platform1.setRight();
		
		this.platform4.setVelocity( 8 );
		this.platform4.setRight();
		
		this.player.setBlocks( this.blocks );
		
		this.setKeyboardEnabled( true );
		this.scheduleUpdate();
        return true;
    },
	
	onKeyDown: function( e ) {
		this.player.handleKeyDown( e );
		this.start = true;
	},
	
	update: function() {
		if( this.start ) {
			this.platform1.moveDown();
			this.platform2.moveDown();
			this.platform4.moveDown();
		}
		if( this.player.isGameOver() ) {
			this.cleanup();
			var con = confirm(' END\nRetry?');
			if( con ) location.reload();
		}
	},
	
	isOver: function() {
		return this.player.isGameOver();
	}
});

var StartScene = cc.Scene.extend({
	onEnter: function() {
		this._super();
		this.layer = new GameLayer();
		this.layer.init();
		this.addChild( this.layer );
	},
});

