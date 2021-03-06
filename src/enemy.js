class Enemy{
  constructor(options){
    this.x = options.x;
    this.y = options.y;
    this.w = options.w;
    this.h = options.h;
    this.color = options.color;
    this.vis = options.vis;
    this.move = options.move;
    this.velx = 2;
    this.vely = 0;
    this.moveTo1 = options.moveTo1;
    this.moveTo2 = options.moveTo2;
    this.name = options.name;
    this.lvl = options.lvl;
    this.frogTimer = 3;
    this.jumpTo = options.jumpTo;
    this.jumpFrom = options.jumpFrom;
    this.bossTimer = 6;
    this.boss = options.boss;
    this.frog = options.frog;
    this.bossDirect = 0;
    this.bossHP = 370;
    this.hitTimer = 1
    
    this.halfWidth = this.w / 2;
    this.halfHeight = this.h / 2 ;
  }

   draw(){
    if (this.lvl == gameState || this.lvl == 0){
      if (this.vis){
        fill(this.color);
        strokeWeight(0);
        rect(this.x, this.y, this.w, this.h);
      }
      if(this.name == Names.Snail){
        if(enemyColliding == "3" && (DAMAGE == "bottom" || DAMAGE == "top" || DAMAGE == "right" || DAMAGE == "left")){
          die();
        }
      }
      
    //SNAIL
      if(this.move && alive){
        this.x = this.x + this.velx;
        if(this.x <= this.moveTo1){
          this.velx = 2;
        }
        if(this.x + this.w >= this.moveTo2){
          this.velx = -2;
        }
        if(this.velx == -2){
          image(snail_right, this.x, this.y, this.w, this.h);
        } else if(this.velx == 2){
          image(snail_left, this.x, this.y, this.w, this.h);
        }
      }

    //FROG
      if(!this.move && alive){
        if(this.frog){
          if (frameCount % 60 == 0 && this.frogTimer > 0) {
            this.frogTimer --;
          }
  
          if(this.frogTimer <= 1){
            image(frog_jump, this.x, this.y, this.w, this.h);
          }else{
            image(frog_stand, this.x, this.y, this.w, this.h);
          }
  
          if (this.jumpFrom <= this.y){
            this.vely = 0;
            this.y = this.jumpFrom;
          } else {
            this.vely += FALLSPEED;
          }
  
          if(this.frogTimer == 0){
            this.vely += JUMPPOWER*1.2;
            this.frogTimer = 2;
          } 
          
          this.y += this.vely;
        }

      if(this.boss && gameState == 6 && this.bossHP > 0){
          if (frameCount % 60 == 0 && this.bossTimer > 0) {
            this.bossTimer --;
          }
  
          if(this.bossTimer <= 2 && this.vely == 0){
            image(boss_pre_jump, this.x, this.y, this.w, this.h);
          }else{
            image(boss_stand, this.x, this.y, this.w, this.h);
          }if(this.y < this.jumpFrom){
            image(boss_jump, this.x, this.y, this.w, this.h);
          }
  
          if (this.jumpFrom <= this.y){
            this.vely = 0;
            this.y = this.jumpFrom;
            if(this.y < 2000 && this.y > 0){
            }
            if(this.y < 2000){
              this.bossDirect = 1;
            }
            if(this.y > 0){
              this.bossDirect = 0;
            }
          } else {
            this.vely += FALLSPEED/2.5;
            if(this.bossDirect  == 1){
              this.x = this.x+4;
            }
            if(this.bossDirect == 0){
              this.x = this.x-4;
            }
          }
  
          if(this.bossTimer == 0){
            this.vely += JUMPPOWER;
            this.bossTimer = 5;
            this.bossDirect = random(0,1);
            if(this.x > player.x){
              this.x = this.x-40;
              this.bossDirect =0;
            }
            if(this.x < player.x){
              this.x = this.x+40;
              this.bossDirect =1;
            }
          }
        if(player.x > this.x -150 && player.x < this.x + this.w + 100){
          if (frameCount % 60 == 0 && this.hitTimer > 0) {
            this.hitTimer --;
          }
          if (keyIsDown(69) && this.hitTimer == 0) {
            this.bossHP -= 8;
            this.hitTimer = 1;
            hit.play();
          }    
        }
        if(this.bossHP <= 0){
          gameState = 7;
          player.x = -200;
        }
          
          this.y += this.vely;
          fill(255,0,0);    
          noStroke();
          rect(camerax - W/2+400,-H+100 + 130, this.bossHP ,25);
          if(this.bossHP > 300){
            image(tip_screen, camerax - W/2+200,-H+100 + 130, 150, 80)
          }
          //image(bossbar, camerax - W/2+300,-H+80 + 130, W-710 ,75);
        }
      }
    }
  }
}