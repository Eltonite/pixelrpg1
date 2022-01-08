class Sprite {
  constructor(config) {

    //setup of images
    this.image = new Image();
    this.image.src = config.src;
    this.image.onload = () => {
      this.isLoaded = true;
    }

    //setup of shadow
    this.shadow = new Image();
    this.useShadow = true; //hardcoded now, will use config.useShadow later
    if (this.useShadow) {
      this.shadow.src = "/images/characters/shadow.png"
    }
    this.shadow.onload = () => {
      this.isShadowLoaded = true;
    }
    

    //Configs of animation and initial states
    this.animations = config.animations || {
      "idle-up": [ [0,2] ],
      "idle-down": [ [0,0] ],
      "idle-left": [ [0,3] ],
      "idle-right": [ [0,1] ],

      "walk-up": [ [1,2],[2,2],[3,2],[0,2] ],
      "walk-down": [ [1,0],[2,0],[3,0],[0,0] ],
      "walk-left": [ [1,3],[2,3],[3,3],[0,3] ],
      "walk-right": [ [1,1],[2,1],[3,1],[0,1] ]

    }
    this.currentAnimation = "idle-left"; //config.currentAnimation || "idle-down";
    this.currentAnimationFrame = 0;

    this.animationFrameLimit = config.animationFrameLimit || 16;
    this.animationFrameProgress = this.animationFrameLimit;

    //Reference the game object
    this.gameObject = config.gameObject;
  }

  get frame() {
    return this.animations[this.currentAnimation][this.currentAnimationFrame];
  }

  setAnimation(key) {
    if (this.currentAnimation !== key) {
      this.currentAnimation = key;
      this.currentAnimationFrame = 0;
      this.animationFrameProgress = this.animationFrameLimit;
    }
  }

  updateAnimationProgress() {
    //Downtick frame progress
    if (this.animationFrameProgress > 0) {
      this.animationFrameProgress -= 1;
      return;
    }

    //Reset counter
    this.animationFrameProgress = this.animationFrameLimit;
    this.currentAnimationFrame += 1;

    if (this.frame == undefined) {
      this.currentAnimationFrame = 0;
    }

  }


  //draw the sprite function
  draw(ctx, cameraPerson) {
    const x = this.gameObject.x - 7 + utils.withGrid(10.5) - cameraPerson.x;
    const y = this.gameObject.y - 18 + utils.withGrid(6) - cameraPerson.y;

    this.isShadowLoaded && ctx.drawImage(this.shadow, x, y);

    const [frameX, frameY] = this.frame;

    this.isLoaded && ctx.drawImage(
      this.image,
      frameX * 32, frameY * 32,
      32,32,
      x,y,
      32,32
      )

    this.updateAnimationProgress();
  }

  
}