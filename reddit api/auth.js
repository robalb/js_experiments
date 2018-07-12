

(function(){
   
   // Get the `code` querystring param (assuming the user was redirected from reddit)
   var code = new URL(window.location.href).searchParams.get('code');
   var r;
   snoowrap.fromAuthCode({
     code: code,
     userAgent: '',
     clientId: 'WJ25uK_7RfTKCg',
     redirectUri: 'https://robalb.github.io/js_experiments/reddit%20api/auth.html'
   }).then(_r => {
     // Now we have a requester that can access reddit through the user's account
       console.log(r)
       r = _r
   })   

   
})();