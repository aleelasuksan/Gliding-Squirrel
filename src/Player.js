var Player = cc.Sprite.extend({
	ctor: function( x, y ) {
		this._super();
		this.initWithFile( 'res/images/player.png' );
		this.setAnchorPoint( cc.p( 0.5, 0.5 ) );
		this.x = x;
		this.y = y;
		this.vJump = 30;
		this.g = -1;
		
		this.vy = 0;
		
		this.jump = false;
		
		this.platform = null;
		
		this.updatePosition();
		console.log('init player');
	},
	
	update: function( dt ) {
		var oldRect = this.getBoundingBoxToWorld();
		
		this.updateMovement();
		
		var dY = this.y - oldRect.y;
		
		var newRect = cc.rect( oldRect.x,
								oldRect.y + dY - 1,
								oldRect.width,
								oldRect.height + 1 );
		
		this.handleCollision( oldRect, newRect );
		
		this.updatePosition();
	},
	
	handleCollision: function( oldRect, newRect ) {
		if( this.ground == null ) {
			if( this.vy <= 0 ) {
				
			}
		}
	},
	
	updateMovement: function() {
		if( this.ground ) {
			this.vy = 0;
			if( this.jump ) {
				console.log('jump');
				this.vy = this.vJump;
				this.y += this.vy;
				this.ground = null;
			}
		} else {
			this.vy += this.g;
			this.y += this.vy;
		}
	},
	
	handleKeyDown: function( e ) {
		if( e == cc.KEY.space || e == cc.KEY.UP ) {
			jump = true;
		}
	},
	
	handleKeyUp: function( e ) {
	
	},
	
	updatePosition: function() {
		this.setPosition( cc.p( this.x, this.y ) );
	}
	
});