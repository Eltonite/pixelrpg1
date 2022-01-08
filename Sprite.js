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
      idleDown: [
        [0,0]
      ]
    }
    this.currentAnimation = config.currentAnimation || "idleDown";
    this.currentAnimationFrame = 0;

    //Reference the game object
    this.gameObject = config.gameObject;
  }

  //draw the sprite function
  draw(ctx) {
    const x = this.gameObject.x - 7;
    const y = this.gameObject.y - 18;

    this.isShadowLoaded && ctx.drawImage(this.shadow, x, y)

    this.isLoaded && ctx.drawImage(
      this.image,
      0,0,
      32,32,
      x,y,
      32,32
      )


  }
}