/*
  SUDOKU
  SOLVER

  dear Barilla, if you are reading this, please support
  my dream of making spaghetti for a living and hire me!

*/

import {GuiDialogText, Sudoku, Sidebar} from './gui.js'

//some test data to avoid filling manually all the values in the gui grid
//this dataset does not require step 2 and is well formed
let testData = 
[
  [0,8,0,7,0,0,0,9,0],
  [5,0,0,6,0,3,0,2,7],
  [7,0,3,2,0,0,8,0,0],
  [0,4,0,9,0,2,0,0,5],
  [6,7,1,0,0,0,0,0,2],
  [0,0,0,0,0,4,6,3,0],
  [0,5,0,0,9,0,7,0,0],
  [0,0,6,0,5,0,0,0,4],
  [4,0,0,0,0,6,5,0,0]
]

//the sudoku gui element that will be generated on page load
let sudoku;
//the dialog gui element that will be generated on page load
let dialog;
//the sidebar gui element
let sidebar

//a bidimensional array containing, for each cell, a list of all the entries that are invalid
//(this list is actually an array of 9 boolean values - since arrays are zero indexed, make sure to decrement/
//increment the actual non zero-indexed values contained in htmlTable or completedNumbers
let excludedNumbers = [];
//a bidimensional array containing the numbers found in the grid, and zeros
//in the places that are yet to discover
//- when start is pressed, this array becomes a copy of the values inserted in the gui and contained in
//htmlTable, but with zeros instead of enpty slots
let completedNumbers = [];
//the amount of numbers that have been found and inserted into completedNumbers
//81 == the sudoku has been completed
let completedNumbersCount = 0;
//wether the given set has only one unique solution (well formed) or more than one
let isWellFormed = false;

document.addEventListener('DOMContentLoaded', main );
function main(){
  //init the dialog gui element used for displaying text in an unnecessarily complicated way
  dialog = new GuiDialogText();
  //init and create the sudoku grid
  sudoku = new Sudoku(testData);
  //init the sidebar that controls the sudoku grid
  sidebar = new Sidebar(sudoku);
  //init the start button listener
  let bt = document.getElementById('js-start');
  bt.addEventListener('click', start);
}

function start(){
  initTables()
  console.log(completedNumbers)
  console.log(excludedNumbers)
  console.log(sidebar.state)
  //step 1 of the sudoku completion:
  //for each enpty cell, annotate all the values that cannot be inserted
  //(that means removing all the numbers found on the same row, column or containing square)
  //if in a certain cell only a possible option remains, that number is added to the
  //completedNumbers list and all the cells in the same row, column or square are updated accordignly
  for(let y=0; y<9; y++){
    for(let x=0; x<9; x++){
      if(completedNumbers[y][x]){
        //the value is decremented because excludedNumbers is based on a zero indexed set of entries
        excludeNumber(x, y, completedNumbers[y][x]-1)
      }
    }
  }
  //TODO: implement step 2
}

function initTables(){
  for(let y=0; y<9; y++){
    excludedNumbers[y] = [];
    completedNumbers[y] = [];
    for(let x=0; x<9; x++){
      //the 9 possible entries in excludedNumbers ARE zero indexed
      excludedNumbers[y][x] = [0,0,0,0,0,0,0,0,0]
      let currentValue = parseInt(sudoku.htmlTable[y][x].value)||0
      //the 9 possible entries in completedNumbers are NOT zero indexed
      completedNumbers[y][x] = currentValue;
      completedNumbersCount += ( currentValue > 0 )
    }
  }
  //variables for counting the amount of distinct symbols contained in the sudoku
  //if the amount is >= 8 the sudoku will have only one solution (well-formed sudoku)
  //[that's because for a Sudoku of rank n, at least n2-1 distinct symbols must be used for the puzzle to have a unique solution]
  /* method 1 (using Set) 
  let flat = completedNumbers.reduce( (acc,n)=> [...acc, ...n], []).filter( n=> n)
  let distinct = new Set(flat).size
  */
  /* method 2 (functional)*/
  let distinct = completedNumbers.reduce( (acc,n)=> [...acc, ...n], [])         /*flatten the array */
                                  .filter( (n,i,a) => n && a.lastIndexOf(n)==i ) /*remove zeros and duplicates */
                                  .length                                        /*get length */
  isWellFormed = distinct >= 8
  if(!isWellFormed){
    dialog.set('more than one solution possible')
  }
}


/* 
 * given a known number n at [xy] coords,
 * for each cell, remove the possible entries that this number makes invalid
 * - if after removing an entry from a cell only one possible option is left (forced entry),
 *   that number is added to the completedNumbers array, and this function is called
 *   again with its coordinates
 * - note: all the exclusion operation are based on an array of 9 boolean values [0 indexed!, unlike the gui, and the htmlTable values]
 *   one for each possible entry in the current cell. 0 = possible entry, 1 = excluded/impossible entry
 */
function excludeNumber(x, y, n){
  excludeRow(y,n)
  excludeColumn(x,n)
  excludeSquare(x,y,n)
}
/**
 * this function is part of excludeNumber
 */
function excludeRow(y, n){
  for(let i=0; i<9; i++){
    excludedNumbers[y][i][n] = 1
    testForcedEntry(i, y)
  }
}
/**
 * this function is part of excludeNumber
 */
function excludeColumn(x, n){
  for(let i=0; i<9; i++){
    excludedNumbers[i][x][n] = 1
    testForcedEntry(x, i)
  }
}
/**
 * this function is part of excludeNumber
 */
function excludeSquare(x, y, n){
  //TODO: too lazy to figure out how to this properly right now
  let vx, vy;
  if(x<3) vx = 0
  else if(x<6) vx = 3
  else vx = 6

  if(y<3) vy = 0
  else if(y<6) vy = 3
  else vy = 6

  for(let i = vy; i< vy+3; i++){
    for(let j = vx; j< vx+3; j++){
      excludedNumbers[i][j][n] = 1
      testForcedEntry(i, j)
    }
  }

}


/**
 * check if the cell at the given coordinates has only one possible entry (forced entry),
 * and eventually add it to the completedNumbers array and call excludeNumber() with its coords
*/
function testForcedEntry(x, y){
  //don't start if the number at these coords has already been found/has always been known
  if(completedNumbers[y][x]) return 0;
  //otherwise, check if there is only a possible number left in the array at these coords
  let numberFound = 0;
  let zerosFound = 0;
  for(let i=0; i<9; i++){
    if(excludedNumbers[y][x][i] == 0){
      zerosFound++;
      numberFound = i;
    }
  }
  //if a new number is found, add it to the completed numbers table
  //and start the exclusion process again
  if(zerosFound == 1){
    //numberFound is incremented because in completedNumbers the values contained in the cells are NOT zero indexed
    completedNumbers[y][x] = numberFound+1;
    completedNumbersCount ++;
    //add the number with an animation, then proceed with the execution
    sudoku.addNumber(x, y, numberFound, true, ()=>{ 
                      excludeNumber(x, y, numberFound)
                    })
  }
}

