['Tokyo', 'London', 'Rome', 'Donlon', 'Kyoto', 'Paris']

// YOUR ALGORITHM

[
    [ 'Tokyo', 'Kyoto' ],
    [ 'London', 'Donlon' ],
    [ 'Rome' ],
    [ 'Paris' ]
]


/*00:20
pseudocode

pop first city

foreach rotation: 

compare to each city of same length

if match{
   put popped city in new array
   - remove other city and add it to new array
}
else {
  - do nothing. 
}

rotation 

  split in chars
  unshift first letter
  push it 
  
*/
let list = ['Tokyo', 'London', 'Rome', 'Donlon', 'Kyoto', 'Paris'];
let newList = []
//foreach city, starting from top
for(let i=list.length-1; i>1; i--){
   //get the city
   let city = list[i];
   let rotated = city;
   let matching = [city];
   console.log("%cnew city: "+city,"color: orange")
   //foreach possible rotation of this city
   for(let j= 0,cityLength = city.length; j<cityLength-1; j++){
      rotated = rotate(rotated)
      console.log("%crotation: "+rotated,"color: orange")
      //compare it with all the other cities
      for(let k=0; k< i; k++){
         console.log(list[k])
         //check if length is the same to avoid useless calcculations
         if(list[k].length === cityLength){
               console.log(list[k].length,cityLength)
            if(list[k].toLowerCase() === rotated.toLowerCase()){
               //itsa match
               console.log(1)
               matching.push(list[k])
            }
         }
      }
   }
   newList.push(matching)
}

function rotate(word){
   word = word.split("")
   let letter = word.shift();
   word.push(letter)
   return word.join("")
}



let list = ['Tokyo', 'London', 'Rome', 'Donlon', 'Kyoto', 'Paris'];

function groupCitiesByRotatedNames(list){
   let newList = []
   //foreach city, starting from top
   for(let i=list.length-1; i>1; i--){
      //get the city
      let rotated = list[i];
      let matching = [rotated];
      //foreach possible rotation of this city
      for(let j= 0,cityLength = rotated.length; j<cityLength-1; j++){
         rotated = rotate(rotated)
         //compare it with all the other cities
         for(let k=0; k< i; k++){
            if(list[k].length === cityLength){
               if(list[k].toLowerCase() === rotated.toLowerCase()){
                  //itsa match
                  matching.push(list[k])
               }
            }
         }
      }
      newList.push(matching)
   }
   return newList;
}


function rotate(word){
   word = word.split("")
   let letter = word.shift();
   word.push(letter)
   return word.join("")
}





