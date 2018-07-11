https://www.codewars.com/kata/multi-line-task-hello-world-without-letters/train/javascript
You are provided with:



let $ = 'CSg';

You need to change $ into a function that returns the string 'Hello, world!'.

Requirements:

    Every line must have at most 1 ASCII character
    You are only allowed to use numbers (0-9) and special characters (!+<[, etc.)
    NO LETTERS ALLOWED (a-z)! Mwhahaha
    NO UNICODE CHARACTERS
    700 lines or less


/*basics*/

f=[]["sort"]["bind"]("hello")

f=("")["trim"]["bind"]("Hello, world!")

/* kata helloworld infinity++ */
[,H,,,,,,,,e,,l,,o,,w,,r,,d,,t,,i,,m,,b,C,X,S,N]={*H(){e;l;o;w;r;d;t;i;m;b,! n}}.H+[] 
f=([]+[])[t+r+i+m][b+i+n+d](H+e+l+l+o+C+S+w+o+r+l+d+X)

https://github.com/aemkei/jsfuck/blob/master/jsfuck.js

//NOTE the letters 'CSg' are initially given as the $ value


//trim and bind can be created from these jsfuck strings
$=("")["trim"]["bind"]("Hello, world!")

'Number':   (+[])
'String': ([]+[])
'undefined': [][[]] +[]









function solve(s) {
  let doInversion = false
  let lastOperator = '+'
  //brackets stack
  let brackets = []
  let newString = ''
  //used to memorize if the last letter was an opening bracket
  let flag = false;
  
  for(let letter of s){
    if(letter.match(/\+|\-/)){
		if(flag){
			flag = false
			newString = newString.slice(0, -1)
		}
		lastOperator = letter
		//operator inversion
		if(doInversion) newString += letter=='+'?'-':'+';
		else newString += letter;	
    }
	else if(letter == '('){
		if(!flag){
			flag = true;
			let lastOp = lastOperator == '-';
			brackets.push(lastOp)
			//xor operation for ++=>+ +-=>- --=>+
			doInversion = doInversion? !lastOp : lastOp;		
		}
	}
	else if(letter == ')'){
		flag = false;
		let clOperator = brackets.pop()
		doInversion = doInversion? !clOperator : clOperator;
	}else{
		flag = false;
		newString += letter
	}

  }
  //remove first plus operator from string
  if(!newString.indexOf('+'))newString = newString.substr(1)
  return newString;
}
solve("-(-(x-y))")




solve=(s,d=!1,e='+',t=[],n='',f=!1)=>{
  for(let l of s){
    if(l.match(/\+|\-/)){
		if(f){f=!1;n=n.slice(0, -1)}
		e=l;if(d)n+=l=='+'?'-':'+';
		else n+=l;	
    }
	else if(l=='('){
		if(!f){
			f=!0;let o=e=='-';
			t.push(o);d=d?!o:o;		
		}
	}
	else if(l==')'){
		f=!1;let k=t.pop()
		d=d?!k:k;
	}else{
		f=!1;n+=l
	}
  }
  if(!n.indexOf('+'))n=n.substr(1)
  return n;
}



solve=(s,d=!1,e='+',t=[],n='',f=!1)=>{
for(let l of s){if(l.match(/\+|\-/)){
if(f){f=!1;n=n.slice(0, -1)}e=l;if(d)n+=l=='+'?'-':'+';
else n+=l}else if(l=='('){if(!f){
f=!0;let o=e=='-';t.push(o);d=d?!o:o;}}else if(l==')'){
f=!1;let k=t.pop();d=d?!k:k}else{f=!1;n+=l}}
if(!n.indexOf('+'))n=n.substr(1);return n;}