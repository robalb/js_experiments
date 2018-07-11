(function(){
   
   function auth(){
      var authenticationUrl = snoowrap.getAuthUrl({
         clientId: 'WJ25uK_7RfTKCg',
         scope: ['identity', 'read', 'privatemessages'],
         redirectUri: 'https://robalb.github.io/js_experiments/reddit%20api/auth.html',
         permanent: false,
         state: 'yolo_swag' // a random string, this could be validated when the user is redirected back
      });
      // --> 'https://www.reddit.com/api/v1/authorize?client_id=foobarbaz&response_type=code&state= ...'

      window.location = authenticationUrl; // send the user to the authentication url      
   }
   
   document.addEventListener('DOMContentLoaded', function(){
      document.getElementById('auth-button').addEventListener('click',e=>{
         auth();
      });
   });
})();