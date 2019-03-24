
/**
 * the sudoku gui handler
 */
export class Sudoku{
  /**
   * generates the html sudoku grid and injects it in the dom.
   * it also stores a copy of the grid in a bidimensional array
   * @param {int[]} [testData] - optional data that will be inserted into the grid
   *                             after its generation
   */
  constructor(testData){
    // generate the html sudoku table and inject it in the dom.
    // each square is stored in the array htmlTable
    this.htmlTable = []
    this.tableContainer = document.getElementById('js-main-grid')
    for(let y=0; y<9; y++){
      //init the array to make it bidimensional
      this.htmlTable[y] = [];
      for(let x=0; x<9; x++){
        let currentEl = document.createElement('input')
        currentEl.setAttribute('maxlength', 1)
        currentEl.type = 'text'
        //insert test data if provided
        if(testData && testData[y][x]) currentEl.value = testData[y][x];

        this.htmlTable[y][x] = currentEl;
        this.tableContainer.appendChild(currentEl)
      }
    }
  }
  /**
   * allow to add a number to the grid at the given {xy} coords
   * @param {int} x - the x coords in the grid
   * @param {int} y - the y coords in the grid
   * @param {int} n - the number that will be added to the grid
   * @param {bool} [animate] - wether to add the number with an animation or not
   * @param {function} [callback] - the optional callbach that will be called when the animation is completed
   */
  addNumber(x, y, n, animate=false, callback){
    //TODO: don't accett numbers that break the rules of the sudoku

    //n is incremented because in htmlTable the values contained in the cells are NOT zero indexed
    this.htmlTable[y][x].value = n+1

    if(animate){
      this.htmlTable[y][x].classList.add("add")
      setTimeout(()=>{
          this.htmlTable[y][x].classList.remove("add")
          if(callback) callback()
      },200)
    }
  }
  /**
   * clear the sudoku grid, removing all its numbers
   */
  clearGrid(){
    for(let y=0; y<9; y++){
      for(let x=0; x<9; x++){
        this.htmlTable[y][x].value = "";
      }
    }
  }

}

/**
 * this class allows to display messages in an unnecessarily complicated way
 * @example
 * <code>
 * let dialog = new guiDialogText()
 * dialog.set("your message")
 * </code>
 */
export class GuiDialogText{
  /**
   * init the html element, and display the optional text
   * @param {string} [initialText] - The initial, optional text
   */
  constructor(initialText){
    this.element = document.getElementById('js-info')
    if(initialText) this.set(initialText, false)
  }
  /**
   * display the given text with an optional animation
   * @param {string} text - The text to display
   * @param {bool} [animation] - Wether to show the text with an animation or not
   */
  set(text, animation=true){
    this.element.classList.add("flip")
    setTimeout(this._updateText(text).bind(this), 150)
  }

  _updateText(text){
    return function(){
      this.element.innerText = text
      setTimeout(this._removeClass.bind(this), 400)
    }
  }

  _removeClass(){
    this.element.classList.remove("flip")
  }
}


export class Sidebar{
  constructor(sudoku){
    this.sudokuRef = sudoku

    //possible states:
    //0 - nothing
    //1-9 - insertion
    //10 - deletion
    this.state = 0;
    this.sidebar = document.getElementById('js-sidebar') .querySelectorAll('a')

    this.sudokuRef.tableContainer.addEventListener('mousedown', this.fillCell.bind(this))

    this.sidebar.forEach(
      (e, i) => e.addEventListener('mousedown', this.setState(i).bind(this))
    ) 
    
  }
  
  setState(i){
    return function(){
      if(i == 0){
        this.sudokuRef.clearGrid()
        return 0
      }
      this.sidebar[this.state].classList.remove('selected')
      if(this.state == i){
        this.state = 0;
      }else{
        this.state = i
        this.sidebar[i].classList.add('selected')
      }
    }
  }

  fillCell(e){
    let t = e.target
    if(this.state == 10) t.value = ""
    else if (this.state) t.value = this.state
  }
  
}
