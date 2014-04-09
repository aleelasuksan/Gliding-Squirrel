var Player = cc.Sprite.extend({
	ctor: function( x, y ) {
		this._super();
		this.initWithFile( 'res/images/player.png', cc.rect( 0, 0, 42, 52) );
		this.setAnchorPoint( cc.p( 0.5, 0.5 ) );
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
		var oldRect = this.getBoundingBoxToWorld();
		//console.log(oldRect.y);
		this.updateMovement();
		
		var dY = this.y - oldRect.y;
		
		var newRect = cc.rect( oldRect.x,
								oldRect.y + dY,
								oldRect.width,
								oldRect.height );
		this.handleCollision( oldRect, newRect );
		
		this.updatePosition();
	},
	
	handleCollision: function( oldRect, newRect ) {
		if( this.ground == null ) {
			if( this.vy <= 0 ) {
				var topBlock = this.findGround( this.blocks, oldRect, newRect );
				if( topBlock ) {
					this.ground = topBlock;
					this.y = topBlock.getTopY() + ( oldRect.height / 2 );
					this.vy = 0;
					this.jump = false;
				}
			}
		}
	},
	
	updateMovement: function() {
		if( this.ground ) {
			this.vy = 0;
			if( this.jump ) {
				this.vy = this.vJump;
				this.y = this.ground.getTopY() + 20 + this.vy;
				this.ground = null;
			}
		} else {
			this.vy += this.g;
			//if(this.vy < this.cap ) this.vy = this.cap;
			this.y += this.vy;
		}
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
	
	findGround: function( blocks, oldRect, newRect ) {
		var g = null;
		var mostTopY = -1;
		blocks.forEach( function( block ) {
			if( block.hitTop( oldRect, newRect) ) {
				if( block.getTopY() > mostTopY ) {
					mostTopY = block.getTopY();
					g = block;
				}
			}
		}, this);
		
		return g;
	},
	
	updatePosition: function() {
		this.setPosition( cc.p( this.x, this.y ) );
	}
	
});