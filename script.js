	var state = [];
	var iteration = 0; //iteration counter
	var timerId = undefined; 
	var size = 50; //defines size of matrix
	var speed = 50; //delay between next() method calls
	init(); //init interface

//------------------------Logic part

function lifeStep(initialState){
	var neighbour = [];
	var finalState = [];
	arrayInit(neighbour, state.length);
	arrayInit(finalState, state.length);

	fillNeighbour(initialState,neighbour);

	//run through 2dim array to die/alive the cells
	for (var i = 0; i < initialState.length; i++) {
		for (var j = 0; j < initialState[i].length; j++) {
			if (neighbour[i][j] <= 1) finalState[i][j] = 0; //соседей меньше 1
			else if ( (neighbour[i][j]==2 || neighbour[i][j]==3) && initialState[i][j]==1) finalState[i][j] = 1; //соседей 2 или 3 и был жив
			else if (neighbour[i][j]==3 && initialState[i][j]==0) finalState[i][j] = 1; //соседей = 3 и был мертв
			else if (neighbour[i][j]>=4 && initialState[i][j]==1) finalState[i][j] = 0; //соседей > 4 
			}
		}
	return finalState;
}

function fillRandomly(array){
	for (var i = 0; i < array.length; i++) {
		for (var j = 0; j < array[i].length; j++) {
			array[i][j] = Math.round(Math.random());
			}	
		}	
}

function fillNeighbour(state,neighbour) {
	for (var i = 0; i < state.length; i++) {
		for (var j = 0; j < state[i].length; j++) {
			neighbour[i][j] = aliveNeighbour(i,j,state);
			}	
		}
}

function aliveNeighbour(x, y, array) {
	var aliveNeighbour = 0;
	
	if ( isExist(x-1,y-1,array) ) {
		if (array[x-1][y-1] === 1) aliveNeighbour++
	};
	if ( isExist(x-1,y,array) ) {
		if (array[x-1][y] === 1) aliveNeighbour++
	};
	if ( isExist(x-1,y+1,array) ) {
		if (array[x-1][y+1] === 1) aliveNeighbour++
	};
	if ( isExist(x,y-1,array) ) {
		if (array[x][y-1] === 1) aliveNeighbour++
	};
	if ( isExist(x,y+1,array) ) {
		if (array[x][y+1] === 1) aliveNeighbour++
	};
	if ( isExist(x+1,y-1,array) ) {
		if (array[x+1][y-1] === 1) aliveNeighbour++
	};
	if ( isExist(x+1,y,array) ) {
		if (array[x+1][y] === 1) aliveNeighbour++
	};
	if ( isExist(x+1,y+1,array) ) {
		if (array[x+1][y+1] === 1) aliveNeighbour++
	};
	 return aliveNeighbour;
};

function isExist(x, y, array) {
	if (typeof array[x] !== 'undefined') {
		if (typeof array[x][y] !== undefined) return true;
	} else {return false}
}

function arrayInit(array, size){
	for (var i = 0; i < size; i++) {
		var temp = new Array(size);
		array.push(temp);
	};

	for (var i = 0; i < size; i++) {
		for (var j = 0; j < array[i].length; j++) {
			array[i][j] = 0;
			}	
		}	
}

//---------------------

function renderMatrix(array, printname) {
	console.log(printname + ': ');
	for (var i = 0; i < array.length; i++) {
		var str = ''
		for (var j = 0; j < array[i].length; j++) {
			str += array[i][j] + ' ';
			}	
			console.log(str);
		}	
}

function start(event){
	if (timerId) {
		clearInterval(timerId);
		timerId = undefined;
		event.target.innerText = 'Start';
	}
	else {
		timerId = setInterval(function(){ next() }, speed);
		event.target.innerText = 'Stop';
	}

}

function reset(){
	fillRandomly(state);
	iteration = 0;
	renderMatrixWeb(state, iteration, 'table1');
	if (timerId) {
		clearInterval(timerId);
		timerId = undefined;
	};
	document.getElementById('start').innerText = 'Start';	
}

function next(){
	var finalState = lifeStep(state);
	iteration++;
	state = finalState.slice();
	// renderMatrix(state, 'updated State'); 
 	renderMatrixWeb(state, iteration, 'table1');
}

function toggle(event) {
	var i = event.target.getAttribute("data-x");
	var j = event.target.getAttribute("data-y");
	if (event.target.classList[1] === 'white') {
		event.target.className = 'cell black';
		state[i][j] = 1;
	}
	else if (event.target.classList[1] === 'black') {
		event.target.className = 'cell white';
		state[i][j] = 0;
	}
}

function setSpeed(event){
	speed = +event.target.value;
	if (timerId) {
		document.getElementById('start').click();
		document.getElementById('start').click();
	}
}

//------------------Interface part
function init(){
	arrayInit(state, size);
	fillRandomly(state);
	renderMatrixWeb(state, iteration, 'table1');

	var startElement = document.getElementById('start'); 
	if (startElement) startElement.addEventListener('click', start);

	var resetElement = document.getElementById('reset'); 
	if (resetElement) resetElement.addEventListener('click', reset);

	var nextElement = document.getElementById('next'); 
	if (nextElement) nextElement.addEventListener('click', next);

	var speedElement = document.getElementById('speed'); 
	if (speedElement) speedElement.addEventListener('change', setSpeed);

}

function renderMatrixWeb(array, iteration, htmlElementId){
	var table = document.getElementById(htmlElementId);
	
	var iterElement = document.getElementById('iteration');
	if (iterElement) iterElement.innerText = iteration; 
	
	var str = '';
	var color = '';
	for (var i = 0; i < array.length; i++) {
		str += '<div class="row">';
		for (var j = 0; j < array[i].length; j++) {
			if (array[i][j] === 0) {color = 'white'}
				else if (array[i][j] === 1) {color = 'black'};
			str += '<div class="cell ' + color + '" data-x="' + i + '" data-y="' + j + '"></div>';
			}	
			str += '</div>';
		};
	var element = document.createElement('div');
	element.className = "box";
	element.innerHTML = str;

	if (table.childElementCount===0) table.appendChild(element)
		else if (table.childElementCount===1) 
			table.replaceChild(element, table.lastElementChild);

	var cells = document.querySelectorAll('.cell');
	for (var i = 0; i < cells.length; i++) 
		cells[i].addEventListener('click', toggle);

}
