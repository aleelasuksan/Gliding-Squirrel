var SPRITE_WIDTH = 42;
var HALF_SPRITE_HEIGHT = 26;
var SCREEN_HEIGHT = 600;

var Player = cc.Sprite.extend({
	ctor: function( x, y ) {
		this._super();
		this.initWithFile( 'res/images/player.png' );
		
		this.x = x;
		this.y = y;
		this.vJump = 24;
		this.g = -1;
		this.cap = -10;
		
		this.vy = 0;
		this.vx = 0;
		
		this.jump = false;
		this.direction = null;
				
		this.ground = null;
		
		this.blocks = [];
		
		this.updateSpritePosition();
	},
	
	update: function( dt ) {
		this.isGameOver();
	
		var oldSpriteRect = this.getPlayerRect();
		
		this.updateMovement();
		
		var newSpriteRect = this.getPlayerRect();
		
		this.handleCollision( oldSpriteRect, newSpriteRect );
		
		this.updateSpritePosition();
	},
	
	checkGround: function( oldRect ) {
		var checkGround = this.findGround( oldRect, oldRect );
		if( !checkGround ) this.ground = null;
	},
	
	getPlayerRect: function() {
        var spriteRect = this.getBoundingBoxToWorld();
        var spritePos = this.getPosition();

        var dX = this.x - spritePos.x;
        var dY = this.y - spritePos.y;
        return cc.rect( spriteRect.x + dX,
                        spriteRect.y + dY,
                        spriteRect.width,
                        spriteRect.height );
    },
	
	handleCollision: function( oldRect, newRect ) {
		if( this.ground == null ) {
			if( this.vy <= 0 ) {
				var groundBlock = this.findGround( oldRect, newRect );
				if( groundBlock ) {
					this.ground = groundBlock;
					this.y = groundBlock.getTopY() + ( oldRect.height / 2 );
					this.vy = 0;
					this.jump = false;
					this.vx = 0;
					this.direction = null;
				}
			}
		}
	},
	
	updateMovement: function() {
		if( this.ground ) {
			this.handleGrounded();
		} else {
			this.handleFalling();
		}
	},
	
	handleGrounded: function() {
		this.handleYAxis();
		this.handleXAxis();
	},
	
	handleYAxis: function() {
		this.vy = 0;
		if( this.jump ) {
			this.vy = this.vJump;
			this.handleXAxis();
			this.vx*=0.5;
			this.y = this.ground.getTopY() + ( HALF_SPRITE_HEIGHT ) + this.vy;
			this.ground = null;
		}
		else if( this.ground ) {
			this.y = this.ground.getTopY() + ( HALF_SPRITE_HEIGHT );
		}
	},
	
	handleXAxis: function() {
		if( this.ground ) {
			this.vx = this.ground.velocity;
			if( this.ground.direction == 'right' ) this.direction = 'right';
			else if( this.ground.direction == 'left' ) this.direction = 'left';
			this.updateXMovement();
		}
	},
	
	updateXMovement: function() {
		if( this.direction == 'right' ) {
			this.x += this.vx;
		}
		else if( this.direction == 'left' ) {
			this.x -= this.vx;
		}
	},
	
	handleFalling: function() {
		this.vy += this.g;
		this.y += this.vy;
		this.updateXMovement();
	},
	
	handleKeyDown: function( e ) {
		if( e == cc.KEY.space || e == cc.KEY.UP ) {
			this.jump = true;
		}
	},
	
	setBlocks: function( blocks ) {
		this.blocks = blocks;
	},
	
	findGround: function( oldRect, newRect ) {
		var ground = null;
		var mostTopY = -1;
		this.blocks.forEach( function( block ) {
			if( block.hitTop( oldRect, newRect) ) {
				if( block.getTopY() > mostTopY ) {
					mostTopY = block.getTopY();
					ground = block;
				}
			}
		}, this);
		
		return ground;
	},
	
	updateSpritePosition: function() {
		this.setPosition( cc.p( this.x, this.y ) );
	},
	
	isGameOver: function() {
		return this.y + HALF_SPRITE_HEIGHT < 0;
	}
});