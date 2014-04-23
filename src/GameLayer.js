var GameLayer = cc.LayerColor.extend({
    init: function() {
        this._super( new cc.Color4B( 127, 127, 127, 255 ) );
        this.setPosition( new cc.Point( 0, 0 ) );
		
		
		this.player = new Player( 400, 200 );
		this.addChild(this.player);
		this.player.scheduleUpdate();
		
		this.blocks = [];
		this.platform1 = new Platform( 400, 300 );
		//this.platform1.setPosition( cc.p( 400, 300 ) );
		this.blocks.push( this.platform1 );
		this.addChild( this.platform1 );
		
		this.platform2 = new Platform( 400, 50 );
		//this.platform2.setPosition( cc.p( 400, 50 ) );
		this.blocks.push( this.platform2 );
		this.addChild( this.platform2 );
		
		this.platform3 = new Platform( 400, 450 );
		this.blocks.push( this.platform3 );
		this.addChild( this.platform3 );
		
		this.platform1.setVelocity(5);
		this.platform1.setRight();
		
		this.platform3.setVelocity(3);
		this.platform3.setLeft();
		
		this.player.setBlocks( this.blocks );
		
		this.setKeyboardEnabled( true );
		this.scheduleUpdate();
        return true;
    },
	
	onKeyDown: function( e ) {
		this.player.handleKeyDown( e );
	},
	
	update: function() {
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
	
	onKeyDown: function( event ) {
		this.restartLayer();
	},
	
	onMouseDown: function( event ) {
		this.restartLayer();
	},
	
	restartLayer: function() {
		if( this.layer.isOver() ) {
			this.layer = new GameLayer();
			this.layer.init();
		}
	}
});

