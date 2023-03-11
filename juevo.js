class Boss{
    constructor() {
        this.speed = 10 //for testing
        this.position = {
            x: 300,
            y: 500
        }
        this.velocity = {
            x:0,
            y:0
        }
        this.scale = 0.3
        this.width = 398 * this.scale
        this.height = 353 * this.scale

        this.image = createImage(spriteMarioStandRight)
        this.frames = 0

        this.sprites = {
            stand: {
                right: createImage(spriteMarioStandRight),
                left: createImage(spriteMarioStandLeft),
                //cropWidth: 398,
                //width: 398 * this.scale
                fireFlower: {
                    right: createImage(spriteFireFlowerStandRight),
                    left: createImage(spriteFireFlowerStandLeft)
                }
            },
            run: {
                right: createImage(spriteMarioRunRight),
                left: createImage(spriteMarioRunLeft),
                //cropWidth: 398,
                //width: 398 * this.scale,
                fireFlower: {
                    right: createImage(spriteFireFlowerRunRight),
                    left: createImage(spriteFireFlowerRunLeft)
                }
            },
            jump: {
                right: createImage(spriteMarioJumpRight),
                left: createImage(spriteMarioJumpLeft),
                //cropWidth: 398,
                //width: 398 * this.scale
                fireFlower: {
                    right: createImage(spriteFireFlowerJumpRight),
                    left: createImage(spriteFireFlowerJumpLeft)
                }
            }

        }

        this.currentSprite = this.sprites.stand.left
        this.currentCropWidth = 398
        //this.powerups = {fireFlower: false, policies: false, tech: false, people: false}
        this.invincible = false
        this.opacity = 1
        this.health = 10000
        //this.attack = "jump"
        //this.attackMap = ["jump", "lunge", "techAttack", "policyAttack", "peopleAttack", "none"]

        


    }

    draw() {
        c.save()
        c.globalAlpha = this.opacity
        c.fillStyle = 'rgba(255,0,0, .2)'
        c.fillRect(this.position.x, this.position.y, this.width, this.height)
        c.drawImage(
            this.currentSprite,
            this.currentCropWidth * this.frames,
            0,
            this.currentCropWidth,
            353, 
            this.position.x, 
            this.position.y, 
            this.width, 
            this.height
            )
        c.restore()        


    }

    update() {
        this.frames++

        const {currentSprite, sprites} = this

        if (this.frames > 58 && ((currentSprite === sprites.stand.right) || (currentSprite === sprites.stand.left) || (currentSprite === sprites.stand.fireFlower.left) || (currentSprite === sprites.stand.fireFlower.right))){
            this.frames = 0
        }
        else if (this.frames > 28 && ((currentSprite === sprites.run.right) || (currentSprite === sprites.run.left) || (currentSprite === sprites.run.fireFlower.left) || (currentSprite === sprites.run.fireFlower.right))){
            this.frames = 0
        }
        else if (currentSprite === sprites.jump.right || currentSprite === sprites.jump.left || currentSprite === sprites.jump.fireFlower.right || currentSprite === sprites.jump.fireFlower.left){
            this.frames = 0
        }

        this.draw()        
        this.position.y += this.velocity.y
        this.position.x += this.velocity.x

        if ((this.position.y + this.height + this.velocity.y) <= canvas.height){
            this.velocity.y += gravity
            //console.log(this.position.y)
        }

        if (this.invincible) {
            if (this.opacity === 1) {
                this.opacity = 0
            }
            else{
                this.opacity = 1
            }


        } else this.opacity = 1


    }

}

let boss = new Boss()
if(boss) {
    boss.update()
    boss.velocity.x = 0 }

    while boss.health != 0 {
        if(player.health == 0) {
             loseCondition()
        }
        else {
            action = bossAttackMap[getRandomInteger(0, bossAttackMap.length-1)]//getRandomInteger is a function I made to return a random result from two integers
            switch (action) {
                case "jump":{
                    boss.velocity.y -= 10
                    boss.position.x = getRandomInteger(boss.position.x, lastPlatform.width)
                    break
                }
                case "technologyAttack" :{
                    flood = getRandomInteger(25, 75)
                    while (flood >= 0){
                        goombas.push(new Goomba{//goomba constructor})
                        flood -= 1
                    }
                    //goombas just push themselves offscreen and roll over into garbage collection
                    break
                }

                case "policyAttack":{
                    boss.speed = getRandomInteger(10,30)
                    boss.velocity.x += boss.speed
                    boss.position.x += boss.velocity.x
                    //simulated charging
                    break
                }
                case "peopleAttack" :{
                    let bosses = []
                    flood = getRandomInteger(10, 30)
                    while (flood >= 0){
                        bosses.push(new Boss())
                        clone = bosses[bosses.length-1]
                        clone.position.y = getRandomInteger(lastPlatform.height, canvas.height)
                        clone.position.x = getRandomInteger(lastPlatform.position.x, lastPlatform.width)
                        flood -= 1
                    }
                    //boss clones fall towards the ground and roll over into garbage collection
                }
                case "none" :{
                    let taunts = ["pre canned taunt 1", "pre canned taunt 2",..."pre canned taunt n"]
                    let randomTaunt = getRandomInteger(0, taunts.length - 1)
                    console.log(taunts[randomTaunt])
                }
            }

        }
    }