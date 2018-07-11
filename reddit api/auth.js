

(function(){

   // Get the `code` querystring param (assuming the user was redirected from reddit)
   var code = new URL(window.location.href).searchParams.get('code');
   snoowrap.fromAuthCode({
     code: code,
     userAgent: '',
     clientId: 'WJ25uK_7RfTKCg',
     redirectUri: 'https://robalb.github.io',
     grant_type: 'authorization_code'
   }).then(r => {
     // Now we have a requester that can access reddit through the user's account
       console.log(r)

   })     


})();