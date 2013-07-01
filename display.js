
// Initlisation code---------------------------->
var canvas=document.getElementById("myCanvas");
var ctx=canvas.getContext("2d");

var size_x;
var size_y;
var mines;
var s = 0
var q = 2;
var mx = 0;
var my = 0;
var state = "none";
init(35,25,15)
function init(w,h,m){
	ctx.clearRect(0,0,canvas.width,canvas.height);
	size_x = w;
	size_y = h;
	if(m>99){
		alert("mines set to 99%");
		m=99;
	}
	mines = Math.floor(w*h*m/100)
	
	s = Math.floor(Math.min(canvas.width/size_x,canvas.height/size_y))-2;
	genGrid(size_x,size_y);
	state = "none";
	display();
}
// Functions----------------------------------->
function display(){
	var x;
	var y;
	ctx.font = (s-2*q)+"px sans-serif"
	for(x=0;x<size_x;x++){
		for(y=0;y<size_y;y++){
			if(grid[y][x].dug==true){
				ctx.fillStyle = "#BBBBBB";
				ctx.fillRect(tx(x),ty(y),s,s);
				if(grid[y][x].mine==1){
					ctx.fillStyle = "#000000";
					ctx.fillRect(tx(x)+q,ty(y)+q,s-2*q,s-2*q);
				}else if(grid[y][x].sm>0){
					fontColor(grid[y][x].sm);
					ctx.fillText(grid[y][x].sm,tx(x)+s/4,ty(y)+s-2*q);
				}
			}else if(grid[y][x].flag==false){
				if(x==tix(mx) && y==tiy(my)){
					ctx.fillStyle = "grey";
				}else{
					ctx.fillStyle = "lightgrey";
				}
				ctx.fillRect(tx(x)+q,ty(y)+q,s-2*q,s-2*q);
			}else{
				if(x==tix(mx) && y==tiy(my)){
					ctx.fillStyle = "#BA3838";
				}else{
					ctx.fillStyle = "firebrick";
				}
				ctx.fillRect(tx(x)+q,ty(y)+q,s-2*q,s-2*q);
			}
		}
	}
}
canvas.addEventListener("mousemove",function(e){
	mx = e.offsetX;
	my = e.offsetY;
	display()
});
canvas.addEventListener("mouseup",function(e){
	mx = e.offsetX;
	my = e.offsetY;
	var	tmx = tix(mx)
	var	tmy = tiy(my)
	if(tmx<0||tmx>size_x-1||tmy<0||tmy>size_y-1){
		return
	}
	if(e.button==2&&state!="none"&&grid[tmy][tmx].dug==false){
		grid[tmy][tmx].flag = !grid[tmy][tmx].flag;
	}else if(e.button==1&&state!="none"){
		e.preventDefault();
		if(grid[tmy][tmx].dug==true){
			midClick(tmx,tmy);
		}
	}else if(e.button==0){
		e.preventDefault();
		if(state=="none"){
			fillGrid(mines,tmx,tmy);
			state = "start";
		}
		reveal(tmx,tmy)
	}
	display()
});
canvas.addEventListener("contextmenu",function(e){
	e.preventDefault();
});
canvas.addEventListener("mouseselect",function(e){
	e.preventDefault();
});
function tx(x){
	return x*(s+q)+q
}
function tix(mx){
	return Math.floor((mx-q)/(s+q))
}
function ty(y){
	return y*(s+q)+q
}
function tiy(my){
	return Math.floor((my-q)/(s+q))
}
function fontColor(c){
	switch(c){
		case 1:
			ctx.fillStyle = "blue";
			break;
		case 2:
			ctx.fillStyle = "green";
			break;
		case 3:
			ctx.fillStyle = "red";
			break;
		case 4:
			ctx.fillStyle = "purple";
			break;
		case 5:
			ctx.fillStyle = "brown";
			break;
		case 6:
			ctx.fillStyle = "teal";
			break;
		case 7:
			ctx.fillStyle = "darkred";
			break;
		case 8:
			ctx.fillStyle = "black";
			break;
		default:
			//
	}
}