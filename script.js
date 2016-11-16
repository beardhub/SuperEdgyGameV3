document.createElement("body");
function addScripts(path, srcs){
	for (var p in srcs){
		var script = document.createElement("script");
		script.setAttribute("src",path+srcs[p]);
		document.head.appendChild(script);
	}
	/*if (srcs.length == 0) return;
	console.log(srcs);
	var script = document.createElement("script");
	script.setAttribute("src",path+srcs[0]);
	document.head.appendChild(script);
	srcs.splice(0,1);
	addScripts(path,srcs);*/
}
addScripts("",["Main.js","Keys.js","UI.js","Assets.js","Drawing.js","Mouse.js"]);
/*
var style = document.createElement('style'),
css = "body {user-select: none;draggable : false;-ms-user-select: none;-webkit-user-select: none;-khtml-user-select: none;-moz-user-select: none;-webkit-touch-callout: none;-webkit-user-drag: none;}";
style.type = 'text/css';
if (style.styleSheet){
  style.styleSheet.cssText = css;
} else {
  style.appendChild(document.createTextNode(css));
}
document.head.appendChild(style);
*/
window.onload = init;
/*
var meta = document.createElement('meta');
meta.name = "viewport";
meta.content = "width=device-width, initial-scale=0.1, user-scalable=0";
document.head.appendChild(meta);*/
//document.body.position = "fixed";
//document.body.style.overflow = "hidden";
function init(){
document.body["overflow-y"] = "scroll";document.body.style.overflow = "hidden";
	//body { position: fixed; overflow-y:scroll }
	//meta.httpEquiv = "X-UA-Compatible";
	//meta.content = "IE=edge";
	//document.getElementsByTagName('head')[0].appendChild(meta);
	registerFramework(MainFramework,"M");
	registerFramework(KeysFramework,"K");
	registerFramework(UIFramework,"UI");
	registerFramework(AssetsFramework,"A");
	registerFramework(DrawingFramework,"D");
	registerFramework(MouseFramework,"Ms");
	//makeShortcut(new AFr.Manager(),"A");
	M.createCanvas(window.innerWidth-10,window.innerHeight-10);//document.body.clientWidth-50,document.body.clientHeight);
	var smaller = M.canvas.width, larger = M.canvas.height;
	if (smaller > M.canvas.height){
		smaller = M.canvas.height;
		larger = M.canvas.width;
	}
	smaller-=15;
	var size = 800;
	makeShortcut(new UI.DBox(smaller/2-size/2,smaller/2-size/2,size,size),"U");
	U.cropped = false;
//	makeShortcut(new UI.DBox(0,0,U.w,U.h/10),"Hud");
	//makeShortcut(new UI.DBox(0,U.h/10,U.w,U.h*9/10),"Game");
	makeShortcut(new UI.DBox(U.x,U.y,U.w,U.h),"GO");
	
	GO.add(new gameOver());
	GO.rl = 1;
	GO.cropped = false;
	
	function gameOver(){
		this.keydown = function(k){
			if (k.name !== "enter") return;
			this.container.hidden = true;
			U.frozen = false;
			start();
		}
		this.mousedown = function(){
			this.container.hidden = true;
			U.frozen = false;
			start();
		}
		this.render = function(g){
			g.fillStyle = "grey";
			g.globalAlpha = .7;
			g.fillRect(0,0,this.container.w,this.container.h);
			g.globalAlpha = 1;
			g.fillStyle = "white";
			g.font = "bold 50px Arial";
			g.fillText("GAME OVER",this.container.w/2-155,this.container.h/4);
			g.font = "bold 30px Arial";
			g.fillText("Press enter or click",this.container.w/2-140,this.container.h/16*5);
			g.fillText("anywhere to start over.",this.container.w/2-160,this.container.h/16*6);
		}
	//	this.start = start;
	}
	
	GO.hidden = true;
	//Hud.color = "grey";
	//Game.color = "black";
	//U.add(Hud);
	//U.add(Game);
	makeShortcut(new UI.DBox((M.canvas.width-smaller)/2,(M.canvas.height-smaller)/2,smaller,smaller), "UU");
	U.camera.zoomto(smaller/size);
	GO.camera.zoomto(smaller/size);
	UU.add(GO);
	UU.add(U);
	UU.color = "black";
	U.color = "black";
	//A.setPath("..\\assets\\spaceshooter\\")
	A.loadImage("shipbase","ShipBase.png");
	A.loadImage("turret","Turret.png");
	A.load();
	/*
	
	
	<meta name="viewport" content="width=device-width; 
 initial-scale=0.1; user-scalable=0;"/>
	
	
	*/
	//makeShortcut(A.i,"img");
	//makeShortcut(A.a,"aud");
	//makeShortcut(K.Keys,"Keys");
	//console.log(K.Keys);
	//for (var p in window) console.log(p);
	//M.makeShortcut(M.canvas.getContext("2d"),"G");
	//makeShortcut(M.canvas,"C");
	
	//var loop = function(){
		//U.update();
		//U.render(C.getContext("2d"));
		//var g = ccontext;//M.canvas.getContext("2d");
		//var g = C.getContext("2d");
		//g.clearRect(0,0,C.width,C.height);//50,50,100,100);
		//if (w) y-=speed;
		//if (a) x-=speed;
		//if (s) y+=speed;
		//if (d) x+=speed;
		//g.fillStyle = "black";
		//g.fillRect(x,y,10,10);
		//if (Keys.W.down) y-=5;
		//if (Keys.S.down) y+=5;
		//if (Keys.A.down) x-=5;
		//if (Keys.D.down) x+=5;
	//}
	makeShortcut(Date.now()/1000,"lasttime");
	M.setLoop(function(){
		var before = Date.now()/1000;
		var dt = before - lasttime;
		lasttime = before;
		UU.update(dt);
		UU.render(M.canvas.getContext("2d"));
		//deltatime = Date.now()/1000-before;
	});
    //var now = Date.now();
    ///var dt = now - lastUpdate;
    //lastUpdate = now;

    //update(dt);
   // render(dt);
	Ms.setcanvas(M.canvas);
	Ms.setupListeners({
		down:UU.mousedown.bind(UU),//function(){	U.mousedown();console.log("dddown");},
		up:function(){		UU.mouseup();},
		moved:function(){	},
		//click:function(){	U.mouseclick();},
		rclick:function(){	UU.mouserclick();}
	});
	var hub = new K.KeyHub();
	/*hub.down = function(key){
		if (key === K.Keys.W) w = true;
		if (key === K.Keys.A) a = true;
		if (key === K.Keys.S) s = true;
		if (key === K.Keys.D) d = true;
		//console.log(key);
	}
	hub.up = function(key){
		if (key === K.Keys.W) w = false;
		if (key === K.Keys.A) a = false;
		if (key === K.Keys.S) s = false;
		if (key === K.Keys.D) d = false;
	}*/
	hub = new K.KeyHub();
	hub.down = UU.keydown.bind(UU);
	hub.up = UU.keyup.bind(UU);
	//for (var i = 0; i < hub.length; i++)
	//	console.log(hub[i]);
	//for (var p in hub)
	//	console.log(p);
	//console.log(hub[0]);
	//hub.up = function(key){
	//	console.log(key);}
	//hub.pressed = function(key){
	//	console.log(key);}//*/
		//hub.refresh();
	K.setupListeners(hub);
	M.startLoop();
}
function Vec(x,y){
	this.x = x;
	this.y = y;
	this.copy = function(){
		return new Vec(this.x,this.y);
	}
	this.add = function(vec){
		this.x+=vec.x;
		this.y+=vec.y;
		return this;
	}
	this.sub = function(vec){
		this.x-=vec.x;
		this.y-=vec.y;
		return this;
	}
	this.mult = function(scal){
		this.x*=scal;
		this.y*=scal;
		return this;
	}
	this.ang = function(){
		return Math.atan2(this.y,this.x);
	}
	this.rotate = function(a){
		a+=this.ang();
		this.rotateto(a);
		return this;
	}
	this.rotateto = function(a){
		var l = this.len();
		this.x = l*Math.cos(a);
		this.y = l*Math.sin(a);
		return this;
	}
	this.i = function(){
		this.y = 0;
		return this;
	}
	this.j = function(){
		this.x = 0;
		return this;
	}
	this.unit = function(){
		if (this.len() == 0){
			this.x = 0;
			this.y = 0;
			return;
		}
		var l = this.len();
		this.x/=l;
		this.y/=l;
		return this;
	}
	this.len = function(){
		return Math.sqrt(this.x*this.x+this.y*this.y);
	}
	this.setLen = function(len){
		this.unit();
		this.mult(len);
		return this;
	}
}
function WhiteBlot(){
	var speed = .5;
	var pos;
	var vel = new Vec(0,0);
	this.evalue = 1;
	this.mvalue = 5;
	this.points = 1;
	this.healthloss = -15;
	this.score = 10;
	this.xp = 25;
	this.init = function(){
		do {
		pos = new Vec(Math.random()/2+1/4,Math.random()/2+1/4);
		pos.x*=this.container.w;
		pos.y*=this.container.h;
		} while (new Vec(Game.get("p").x,Game.get("p").y).sub(pos).len()<100);
		vel = new Vec(pos.x-this.container.w/2,pos.y-this.container.h/2);
		vel.setLen(speed);
		this.container.add(new UI.Follow(this,pos));
	}
	this.eat = function(){
		Game.get("p").eat(this);
		this.container.add(new WhiteBlot());
		Sb.addxp(this.xp*Sb.multiplier);
		Sb.adjscore(this.score*Sb.multiplier);
		Sb.adjpoints(this.points*Sb.multiplier);
		var dx,dy;
		dx = (Math.random()-.5)*60;
		dy = (Math.random()-.5)*60;
		//this.container.add(new Textdrop("+"+Math.floor(this.xp*Sb.multiplier), 1, pos.x+dx, pos.y+dy, "cyan"));
		//dx = (Math.random()-.5)*60;
		//dy = (Math.random()-.5)*60;
		//this.container.add(new Textdrop("+"+Math.floor(this.score*Sb.multiplier), 1, pos.x+dx, pos.y+dy, "white"));
		//dx = (Math.random()-.5)*60;
		//dy = (Math.random()-.5)*60;
		this.container.add(new Textdrop("+"+Math.floor(this.points*Sb.multiplier), 1, pos.x+dx, pos.y+dy, "yellow"));
		this.container.remove(this);
	}
	this.miss = function(){
		Game.get("p").miss(this);
		Sb.adjhp(this.healthloss);
		Sb.streak = 0;
		this.container.add(new Textdrop(""+this.healthloss, 1, pos.x, pos.y, "red"));
		this.container.remove(this);
	}
	this.update = function(){
		pos.add(vel);
		if (pos.x<0||pos.y<0||pos.x>this.container.w||pos.y>this.container.h)
			this.miss();
		if (new Vec(Game.get("p").x,Game.get("p").y).sub(pos).len() < 40)
			this.eat();
	}
	this.render = function(g){
		g.fillStyle = "white";
		g.fillRect(this.x-5,this.y-5,10,10);
	}
}
function RedBlot(){
	var speed = 1;
	var pos;
	var vel = new Vec(0,0);
	this.evalue = 10;
	this.mvalue = 35;
	this.points = 5;
	this.healthgain = 10;
	this.healthloss = -45;
	this.score = 30;
	this.xp = 50;
	this.init = function(){
		do {
		pos = new Vec(Math.random()/2+1/4,Math.random()/2+1/4);
		pos.x*=this.container.w;
		pos.y*=this.container.h;
		} while (new Vec(Game.get("p").x,Game.get("p").y).sub(pos).len()<100);
		vel = new Vec(pos.x-this.container.w/2,pos.y-this.container.h/2);
		vel.setLen(speed);
		this.container.add(new UI.Follow(this,pos));
	}
	this.eat = function(){
		Game.get("p").eat(this);
		Sb.addxp(this.xp*Sb.multiplier);
		Sb.adjscore(this.score*Sb.multiplier);
		Sb.adjpoints(this.points*Sb.multiplier);
		Sb.adjhp(this.healthgain*Sb.multiplier);
		var dx,dy;
		dx = (Math.random()-.5)*60;
		dy = (Math.random()-.5)*60;
		this.container.add(new Textdrop("+"+Math.floor(this.points*Sb.multiplier), 1, pos.x+dx, pos.y+dy, "yellow"));
		dx = (Math.random()-.5)*60;
		dy = (Math.random()-.5)*60;
		this.container.add(new Textdrop("+"+Math.floor(this.healthgain*Sb.multiplier), 1, pos.x+dx, pos.y+dy, "green"));
		this.container.remove(this);
	}
	this.miss = function(){
		Game.get("p").miss(this);
		Sb.adjhp(this.healthloss);
		Sb.streak = 0;
		this.container.add(new Textdrop(""+this.healthloss, 1, pos.x, pos.y, "red"));
		this.container.remove(this);
	}
	this.update = function(){
		pos.add(vel);
		if (pos.x<0||pos.y<0||pos.x>this.container.w||pos.y>this.container.h)
			this.miss();
		if (new Vec(Game.get("p").x,Game.get("p").y).sub(pos).len() < 40)
			this.eat();
	}
	this.render = function(g){
		g.fillStyle = "red";
		g.fillRect(this.x-5,this.y-5,10,10);
	}
}
function GoldenBlot(){
	var speed = 13;
	var pos;
	var vel = new Vec(0,0);
	var bounces = 0;
	var maxbounces = 2;
	this.evalue = 100;
	this.mvalue = 0;
	this.points = 50;
	this.healthloss = 0;
	this.score = 50;
	this.xp = 150;
	this.init = function(){
		do {
		pos = new Vec(Math.random()/2+1/4,Math.random()/2+1/4);
		pos.x*=this.container.w;
		pos.y*=this.container.h;
		} while (new Vec(Game.get("p").x,Game.get("p").y).sub(pos).len()<100);
		vel = new Vec(speed, 0).rotateto(Math.random()*Math.PI*2);
		//console.log(vel.len());
		//vel = new Vec(pos.x-this.container.w/2,pos.y-this.container.h/2);
		//vel.setLen(speed);
		this.container.add(new UI.Follow(this,pos));
	}
	this.eat = function(){
		Game.get("p").eat(this);
		Sb.addxp(this.xp*Sb.multiplier);
		Sb.adjscore(this.score*Sb.multiplier);
		Sb.adjpoints(this.points*Sb.multiplier);
		var dx,dy;
		dx = (Math.random()-.5)*60;
		dy = (Math.random()-.5)*60;
		this.container.add(new Textdrop("+"+Math.floor(this.points*Sb.multiplier), 1, pos.x+dx, pos.y+dy, "yellow"));
		this.container.remove(this);
	}
	this.miss = function(){
		Game.get("p").miss(this);
		this.container.add(new Textdrop("-"+this.healthloss, 1, pos.x, pos.y, "grey"));
		this.container.remove(this);
	}
	this.bounce = function(horiz){
		bounces++;
		if (bounces > maxbounces)
			this.miss();
		if (horiz)	vel.x*=-1;
		if (!horiz)	vel.y*=-1;
		//vel.rotate((Math.random()-.5)*Math.PI/2);
		//pos.add(vel);
	}
	this.update = function(){
		pos.add(vel);
		if (pos.x<0||pos.x>this.container.w)
			this.bounce(true);
		if (pos.y<0||pos.y>this.container.h)
			this.bounce(false);
//		if (pos.x<0||pos.y<0||pos.x>this.container.w||pos.y>this.container.h)
	//		this.miss();
		if (new Vec(Game.get("p").x,Game.get("p").y).sub(pos).len() < 40)
			this.eat();
	}
	this.render = function(g){
		g.fillStyle = "yellow";
		//console.log(this.x+" "+this.y);
		g.fillRect(this.x-5,this.y-5,10,10);
	}
}
//function Hud
function Scoreboard(){
	this.score = 0;
	this.highscore = 0;
	this.points = 0;
	this.level = 1;
	this.xp = 0;
	this.health = 250;
	this.maxhealth = 250;
	this.streak = 0;
	this.multiplier = 1;
	this.addxp = function(amount){
		this.xp += amount;
		if (this.xp > neededxp(this.level)){
			this.xp-=neededxp(this.level);
			this.level++;
			Game.add(new Textdrop("LEVEL UP!", 1.5, Game.get("p").x, Game.get("p").y, "cyan").setsize(40));
		}
	}
	function neededxp(lvl){
		var base = 833;
		return Math.floor(base * Math.pow(2,(lvl-1)/6));
	}
	this.adjpoints = function(amount){
		this.points+=amount;
	}
	this.adjscore = function(amount){
		this.score+=amount;
		if (this.score > this.highscore)
			this.highscore = this.score;
		if (this.score < 0) this.score = 0;
	}
	this.adjhp = function(amount){
		this.health+=amount;
		if (this.health <= 0){
			this.health = 0;
			gameOver();
		}
		if (this.health > this.maxhealth)
			this.health = this.maxhealth;
	}
	function gameOver(){
		GO.hidden = false;
		U.frozen = true;
	}
	this.render = function(g){
		g.font = "25px Arial";
		g.fillStyle = "black";
		g.fillRect(260,12,(this.container.w-270-this.container.h+6),20);
		g.fillRect(260,46,(this.container.w-270-this.container.h+6),20);
		g.fillStyle = "cyan";
		g.fillText("LVL "+this.level, 170, 30);
		g.fillRect(263,15,this.xp/neededxp(this.level)*(this.container.w-266-this.container.h),14);
		g.fillStyle = "red";
		g.fillText("HP ", 190, 65);
		g.fillRect(263,49,this.health/this.maxhealth*(this.container.w-266-this.container.h-3),14);
		g.fillStyle = "white";
		//g.fillText("Hiscore: "+this.highscore, 10, 20);
		//g.fillText("Score: "+this.score, 10, 30);
		g.fillStyle = "yellow";
		g.fillText("Points: "+this.points, 10, 47);//65);
		
		//g.fillText(text, this.x, this.y-30*(1-Math.pow(count/duration-.2,2
	}
}

/*
score - getting higscore
level - unlock stuff
xp - level up
points - buy stuff
health - stay alive
multiplier - multiplies gains
streak - to get multiplier

colors
green - health gain
red - health loss
cyan - xp gain
white - score gain
gold - points gain


w
5 score
25 xp
5 point


r


g


/*
function Foodses(){
	var a = 0;
	var speed = .5;
	this.init = function(){
		this.x = (Math.random()/2+1/4)*this.container.w;
		this.y = (Math.random()/2+1/4)*this.container.h;
		a = Math.atan2(this.y-this.container.h/2,this.x-this.container.w/2);//+Math.PI;
	}
	this.update = function(){
		if (this.x < 0 || this.x > this.container.w || this.y < 0 || this.y > this.container.h){
			this.container.remove(this);
			U.get("p").lose();
		}
		if (Math.abs(U.get("p").x - this.x)<40&Math.abs(U.get("p").y - this.y)<40){
			U.get("p").eat();
			this.container.add(new Foodses());
			this.container.remove(this);
		}
		this.x+=Math.cos(a)*speed*(this.dir);
		this.y+=Math.sin(a)*speed*(this.dir);
		this.move(a,speed);
	}
	this.render = function(g){
		g.fillStyle = "white";
		g.fillRect(this.x-5,this.y-5,10,10);
	}
}
Foodses.prototype.dir = 1;
Foodses.prototype.move = function(a, speed){
}
function Foodses2(){
	var a = 0;
	var speed = .5;
	this.init = function(){
		this.x = (Math.random()/2+1/4)*this.container.w;
		this.y = (Math.random()/2+1/4)*this.container.h;
		a = Math.atan2(this.y-this.container.h/2,this.x-this.container.w/2)+Math.PI;
	}
	
}
*/
function Spawner(blottemplate){
	this.template = blottemplate;
	this.delay = 10;
	this.count = 0;
	this.spawn = function(){
		this.count = 0;
		Game.add(new this.template());
	}
	this.shouldspawn = function(){
		return this.count > this.delay;
	}
	this.setdelay = function(d){
		this.delay = d;
		return this;
	}
	this.setcond = function(f){
		this.shouldspawn = f;
		return this;
	}
	this.setspawn = function(f){
		this.spawn = f;
		return this;
	}
	this.update = function(delta){
		this.count+=delta;
		if (this.shouldspawn())
			this.spawn();
	}
}
function Textdrop(txt, dur, x, y, col){
	var text = txt,
	duration = dur,
	color = col,
	count = 0;
	this.x = x;
	this.y = y;
	this.size = 20;
	this.setsize = function(s){
		this.size = s;
		return this;
	}
	this.init = function(){
		if (this.y < 60)
			this.y+=60;
		if (this.x > this.container.w-50)
			this.x-=50;
		if (this.x < 10)
			this.x+=10;
	}
	this.update = function(delta){
		count+=delta
		if (count > duration)
			this.container.remove(this);
	}
	this.render = function(g){
		g.fillStyle = col;
		g.font = "bold "+this.size+"px Arial";
		g.fillText(text, this.x-text.length*this.size/4, this.y+this.size*2/3-(this.size/2*3)*(1-Math.pow(count/duration-.2,2)));
	//	-5*Math.sin(count/duration*3/2*Math.PI));
	}
}
function Player(){
	
}
function WittleBittySquare(){
	//this.x = M.canvas.width/2;
	//this.y = M.canvas.height/2;
	var bas = new D.Sprite(A.i("shipbase"));
	//var tur = new D.Sprite(A.i("turret"));
	var aim = {x:Ms.x(),y:Ms.y()};
	var dist = {x:0,y:0}
	var a = 0;
	var len = 0;
	var dblspwn;
	//console.log(img("shipbase").width);
	//spr.scalex = .2;
	//spr.scaley = .2;
	bas.setOriginCenter();
	//tur.setOriginCenter();
	//spr.originx = 25;
	var speed = 8;
	var score = 0;
	var high = 0;
	var hack = "";
	//this.init = function(){
	//	console.log("Efeffee"+this.container.w);
	//}
	this.eat = function(blot){
		score+=blot.evalue;
		if (score > high)
			high = score;
		//console.log(score);
		//if (score > 250)
		//	clearInterval (eating);
	}
	this.miss = function(blot){
		score-=blot.mvalue;
		if (score < 0)
			score = 0;
		//score = Math.round(score*.85);
		//console.log(score);
	}
	this.init = function(){
		this.x = this.container.w/2;
		this.y = this.container.h/2;
		this.container.add(new UI.Follow(bas,this));
		//this.container.add(new UI.Follow(tur,this));
		//this.container.add(new UI.Follow(aim,Ms));
	}
	this.mousedown = function(){
		//this.x = Ms.x();
		//this.y = Ms.y();
		//dist.x = aim.x;
		//dist.y = aim.y;
			//len = Math.sqrt((this.x-aim.x)*(this.x-aim.x)+(this.y-aim.y)*(this.y-aim.y));
			//a = Math.atan2(-this.y+aim.y,-this.x+aim.x);
//this.x=0; 
		aim.x=Ms.x();
		aim.y=Ms.y();
	}
	this.keydown = function(k){
		//this.x-=20;
		if (k.name=="space"){
			//Sb.adjhp(-50);
			//this.container.empty();
			//this.container.add(new WittleBittySquare(),"p");
		}
			//Sb.addxp(25);
			//for (var i = 0; i < 150; i++)				Game.add(new WhiteBlot());
			//Game.add(new GoldenBlot());
	}
	/*
	this.keydown = function(k){
		if (k.name == "L" && (hack==""||hack=="LO"))
			hack+=k.name;
		else if (k.name == "O" && hack=="L")
			hack+=k.name;
		if ("LO".indexOf(k.name)==-1)hack = "";
		if (hack=="LOL"&&Foodses.prototype.dir==1){
			Foodses.prototype.dir = -15;
			dblspwn = setInterval(function(){U.add(new Foodses());},100);
		}
	}
	this.keyup = function(k){
		if (k.name == "L" && hack=="LOL"){
			Foodses.prototype.dir = 1;
			hack = "";
			clearInterval(dblspwn);
		}
	}*/
	this.update = function(){
		
		
		if (Ms.isdown() && Ms.reld(aim)>10){
			//console.log(Ms.rely(this));
			//this.x+=Ms.relx(this);///speed;
			//this.y+=Ms.rely(this);///speed;
			var ddx = speed*Math.cos(Math.atan2(Ms.rely(aim),Ms.relx(aim))),
				ddy = speed*Math.sin(Math.atan2(Ms.rely(aim),Ms.relx(aim)));
			if (this.x+ddx > 0 && this.x+ddx < this.container.w)
				this.x+=ddx;
			if (this.y+ddy > 0 && this.y+ddy < this.container.h)
				this.y+=ddy;
			
			//this.x+=speed*Math.cos(Math.atan2(Ms.rely(this.container)-this.y,Ms.relx(this.container)-this.x));
			//this.y+=speed*Math.sin(Math.atan2(Ms.rely(this.container)-this.y,Ms.relx(this.container)-this.x));
		}
		else {
			var dx = 0, dy = 0;
			if (K.Keys.W.down || K.Keys.up.down) 	dy--;	//this.y-=speed;
			if (K.Keys.A.down || K.Keys.left.down) 	dx--;	//this.x-=speed;
			if (K.Keys.S.down || K.Keys.down.down) 	dy++;	//this.y+=speed;
			if (K.Keys.D.down || K.Keys.right.down) dx++;	//this.x+=speed;
			if (dx!==0||dy!==0){
				var ddx = speed*Math.cos(Math.atan2(dy,dx)),
					ddy = speed*Math.sin(Math.atan2(dy,dx));
				if (this.x+ddx > 0 && this.x+ddx < this.container.w)
					this.x+=ddx;
				if (this.y+ddy > 0 && this.y+ddy < this.container.h)
					this.y+=ddy;
			}
		}
		//console.log(this.x+" "+this.y);
		
		//if (Foodses.prototype.dir < -30) Foodses.prototype.dir = 1;
		//if (Foodses.prototype.dir < 1) Foodses.prototype.dir--;
		//console.log(hack);
			/*if (len > 0){
				this.x+=speed*Math.cos(a);
				this.y+=speed*Math.sin(a);
				len-=speed;
			}*/
		//tur.rotateto(Math.atan2(aim.y-tur.y,aim.x-tur.x));
		//if (K.Keys.W.down) this.y-=speed;
		//if (K.Keys.S.down) this.y+=speed;
		//if (K.Keys.A.down) this.x-=speed;
		//if (K.Keys.D.down) this.x+=speed;
		
	}
	this.render = function(g){
		//g.fillStyle = "white";
		bas.render(g);
		//tur.render(g);
		//g.font = "20px Arial";
		//g.fillText("score   "+score, 10,20);//this.x-30, this.y);
		//g.fillText("hiscore "+high, 10,40);//this.x-30, this.y+15);
		
		//g.fillStyle="red";
		//g.fillRect(aim.x-10-this.container.x,aim.y-10-this.container.y,20,20);//+Ms.rely(this.container),20,20);
	}
}
function PauseButton(){
	this.init = function(){
		this.y = this.container.h/2;
		this.x = this.container.w-this.y;
	}
	this.mousedown = function(){
		if (Ms.reld(this)<this.container.h/2){
			Game.frozen = !Game.frozen;
		}
	}
	this.keydown = function(k){
		if (k.name=="P")
			Game.frozen = !Game.frozen;
	}
	this.render = function(g){
		g.fillStyle = "black";
		g.fillRect(this.x-this.y+3,3,this.y*2-6,this.y*2-6);
		g.fillStyle = "grey";
		g.fillRect(this.x-this.y/2-5,15,20,this.y*2-30);
		g.fillRect(this.x+this.y/2-15,15,20,this.y*2-30);
		//g.font ="20px Arial";
		//g.fillText("(P)ause",this.x-this.y+3,this.y+3);//,this.y*2-6,this.y*2-6);
	}
}

// Setup before beginning update loop
function start(){
	//console.log(A.ready);
	console.log("start");
	U.empty();
	makeShortcut(new UI.DBox(0,0,U.w,U.h/10),"Hud",true);
	makeShortcut(new UI.DBox(0,U.h/10,U.w,U.h*9/10),"Game",true);
	Hud.color = "grey";
	Game.color = "black";
	U.add(Hud);
	U.add(Game);
	
	Hud.add(new Scoreboard(), "score");
	makeShortcut(Hud.get("score"),"Sb",true);
	Hud.add(new PauseButton());
	Game.add(new WittleBittySquare(),"p");
	Game.add(new WhiteBlot());
	Game.add(new Spawner(WhiteBlot));
	Game.add(new Spawner(RedBlot).setdelay(20).setcond(function(){return Math.random()<0.005&&this.count>this.delay;}));
	Game.add(new Spawner(GoldenBlot).setdelay(30).setcond(function(){return Math.random()<0.005&&this.count>this.delay;}));
	//setInterval(function(){U.add(new Foodses());},10000);
	//var mini = new UI.DBox(700,0,100,100);
	//U.add(mini);
	//mini.color = "red";
	//mini.add(new WittleBittySquare(),"p2");
	//U.add(new UI.Follow(mini,U.get("p"),140,140));
	//mini.add(new UI.Follow(mini.camera,mini.get("p2"),0,0));
}
