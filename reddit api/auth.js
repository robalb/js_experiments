
var r;
(function(){
   
   // Get the `code` querystring param (assuming the user was redirected from reddit)
   var code = new URL(window.location.href).searchParams.get('code');
   
   snoowrap.fromAuthCode({
     code: code,
     userAgent: '',
     clientId: 'WJ25uK_7RfTKCg',
     redirectUri: 'https://robalb.github.io/js_experiments/reddit%20api/auth.html'
   }).then(_r => {
     // Now we have a requester that can access reddit through the user's account
       console.log(_r)
       r = _r
       localStorage.setItem('accessToken',r.accessToken); 
       localStorage.setItem('refreshToken',r.refreshToken); 
       alert("you have been authenticated. that's cool. now go back to the index page")
   })   

   
})();