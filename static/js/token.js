$.ajax({
   url: 'http://localhost:8080/resourceserver/protected-no-scope',
   type: 'GET',
   contentType: 'application/json'
   headers: {
      'Authorization': 'Bearer <token>'
   },
   success: function (result) {
       // CallBack(result);
   },
   error: function (error) {

   }
});