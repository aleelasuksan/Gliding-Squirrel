var SPRITE_WIDTH = 42;
var SPRITE_HEIGHT = 52;

var Player = cc.Sprite.extend({
	ctor: function( x, y ) {
		this._super();
		this.initWithFile( 'res/images/player.png', cc.rect( 0, 0, SPRITE_WIDTH, SPRITE_HEIGHT ) );
		
		this.x = x;
		this.y = y;
		this.vJump = 30;
		this.g = -1;
		this.cap = -10;
		
		this.vy = 0;
		
		this.jump = false;
		
		this.ground = null;
		
		this.blocks = [];
		
		this.updatePosition();
	},
	
	update: function( dt ) {
		var oldSpriteRect = this.getPlayerRect();
		
		this.updateMovement();
		
		var newSpriteRect = this.getPlayerRect();
		
		this.handleCollision( oldSpriteRect, newSpriteRect );
		
		this.updateSpritePosition();
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
					this.ground = topBlock;
					this.y = groundBlock.getTopY() + ( oldRect.height / 2 );
					this.vy = 0;
					this.jump = false;
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
		this.vy = 0;
		if( this.jump ) {
			this.vy = this.vJump;
			this.y = this.ground.getTopY() + 20 + this.vy;
			this.ground = null;
		}
	},
	
	handleFalling: function() {
		this.vy += this.g;
		//if(this.vy < this.cap ) this.vy = this.cap;
		this.y += this.vy;
	},
	
	handleKeyDown: function( e ) {
		if( e == cc.KEY.space || e == cc.KEY.UP ) {
			this.jump = true;
		}
	},
	
	handleKeyUp: function( e ) {
	
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
	}
	
});