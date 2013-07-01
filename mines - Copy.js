var grid;
var end;

function genGrid(x,y){
	grid = [];
	end = 0;
	for(i=0;i<y;i++){		
		temp = [];
		grid.push(temp)
		for(j=0;j<x;j++){
			temp.push({mine:0,dug:false,sm:0,flag:false})
		}	
	}
}
function fillGrid(m,cx,cy){
	//fill mines
	for(i=0;i<m;i++){
		xcord = Math.floor(Math.random()*size_x);
		ycord = Math.floor(Math.random()*size_y);
		if(xcord==cx){
			if(ycord==cy){
				i--
				continue
			}
		}
		if(grid[ycord][xcord].mine==1){
			i--
			continue
		}	
		grid[ycord][xcord].mine = 1;
	}
	//count mines
	for(x=0;x<size_x;x++){
		for(y=0;y<size_y;y++){
			tm = 0;
			tm += getCellMine(x-1,y-1);
			tm += getCellMine(x,y-1);
			tm += getCellMine(x+1,y-1);
			tm += getCellMine(x+1,y);
			tm += getCellMine(x+1,y+1);
			tm += getCellMine(x,y+1);
			tm += getCellMine(x-1,y+1);
			tm += getCellMine(x-1,y);
			grid[y][x].sm = tm;
		}
	}	
}
// hints
// bucket fill
// click point

function getCellMine(x,y){
	if(x<0)
		return 0
	if(x>=grid[0].length)
		return 0
	if(y<0)
		return 0
	if(y>=grid.length)
		return 0
	return grid[y][x].mine
}	
function reveal(x,y){
	if(x>=0&&x<size_x&&y>=0&&y<size_y&&grid[y][x].dug==false&&grid[y][x].flag==false){
		if(grid[y][x].mine==1){
			alert("booom")
			finish()
			return
		}
		grid[y][x].dug = true;
		end = end + 1;
		if(grid[y][x].sm==0){
			reveal(x-1,y-1)
			reveal(x,y-1)
			reveal(x+1,y-1)
			reveal(x+1,y)
			reveal(x+1,y+1)
			reveal(x,y+1)
			reveal(x-1,y+1)
			reveal(x-1,y)	
		}
		if(end>=((size_x*size_y)-mines)){
			alert("You Won");
			finish();
			end = 0;
		}
	}
}
function finish(){
	for(x=0;x<size_x;x++){
		for(y=0;y<size_y;y++){
			grid[y][x].dug = true;
		}
	}
}
function midClick(x,y){
	m=0
	m+= getCellFlag(x-1,y-1)
	m+= getCellFlag(x,y-1)
	m+= getCellFlag(x+1,y-1)
	m+= getCellFlag(x+1,y)
	m+= getCellFlag(x+1,y+1)
	m+= getCellFlag(x,y+1)
	m+= getCellFlag(x-1,y+1)
	m+= getCellFlag(x-1,y)	
	if(m==grid[y][x].sm){
		reveal(x-1,y-1)
		reveal(x,y-1)
		reveal(x+1,y-1)
		reveal(x+1,y)
		reveal(x+1,y+1)
		reveal(x,y+1)
		reveal(x-1,y+1)
		reveal(x-1,y)	
	}
}
function getCellFlag(x,y){
	if(x<0)
		return 0
	if(x>=grid[0].length)
		return 0
	if(y<0)
		return 0
	if(y>=grid.length)
		return 0
	return (grid[y][x].flag)?1:0
}	