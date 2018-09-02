   /*var solve = (s, stack = ['+'], lastSign = '+', bracketPosition = -1) => s.split('').reduce((acc,x,i) => {
      if(x=='+'||x=='-'){
         lastSign = (stack[stack.length-1]==x) ? '+' : '-'
         return (bracketPosition+1==i ? acc.slice(0,-1) : acc ) + (acc=='-'?'':lastSign)
      }
      else if(x=='('){
         stack.push(lastSign)
         bracketPosition = i
         return acc
      }
      else if(x==')'){
         stack.pop()
         return acc
      }
      else return acc+x
      
   }, '')
   




resolve("-(1-(2+2-2)+1-1)")
"-1-2-2+2-1+1"
"-1-2-2+2-1+1"
resolve("-(-1+(1))")

*/

var solve=(e,s=['+'],l='+',f=-1)=>e.split('').reduce((a,x,i)=>{
   switch(x){
      case '+': case '-': l=(s[s.length-1]==x)?'+':'-';return(f+1==i?a.slice(0,-1):a)+(a=='-'?'':l)
      case '(': s.push(l);f=i;return a
      case ')': s.pop();return a
      default: return a+x
   }
},'')

   

   
   
   
   
   
   
   
   
   
   
   
   
   
   
   
   
