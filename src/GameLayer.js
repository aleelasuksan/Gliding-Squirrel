var GameLayer = cc.LayerColor.extend({
    init: function() {
        this._super( new cc.Color4B( 127, 127, 127, 255 ) );
        this.setPosition( new cc.Point( 0, 0 ) );
		
		this.background = cc.Sprite.create( 'res/images/bg.png' );
        this.background.setAnchorPoint( new cc.Point( 0, 0 ) );
        this.addChild( this.background );
		
		this.score = 0;
		this.scoreLabel = cc.LabelTTF.create( '0', 'Arial', 30);
		this.scoreLabel.setPosition( cc.p( 700, 500 ) );
		this.addChild( this.scoreLabel );
		
		this.player = new Player( 400, 100 );
		this.addChild( this.player );
		this.player.scheduleUpdate();
		this.start = false;
		
		this.blocks = [];
		this.createBlocks();
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
			this.platform3.moveDown();
			this.score+=1;
			this.scoreLabel.setString( this.score );
		}
		if( this.player.isGameOver() ) {
			this.cleanup();
			var con = confirm('Score : '+this.score+'\nRetry?');
			if( con ) location.reload();
		}
	},
	
	isOver: function() {
		return this.player.isGameOver();
	},
	
	createBlocks: function() {
		this.platform1 = new Platform( 400, 300 );
		this.blocks.push( this.platform1 );
		this.addChild( this.platform1 );
		
		this.platform2 = new Platform( 400, 50 );
		this.blocks.push( this.platform2 );
		this.addChild( this.platform2 );
		
		this.platform3 = new Platform( 400, 550 );
		this.blocks.push( this.platform3 );
		this.addChild( this.platform3 );
		
		//this.platform1.setVelocity( 5 );
		this.platform1.randVelocity();
		this.platform1.startLeft();
		
		//this.platform4.setVelocity( 8 );
		this.platform3.randVelocity();
		this.platform3.startRight();
	},
});

var StartScene = cc.Scene.extend({
	onEnter: function() {
		this._super();
		this.layer = new GameLayer();
		this.layer.init();
		this.addChild( this.layer );
	},
});

