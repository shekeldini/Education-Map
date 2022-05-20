var access_token = null;

async function get_private(){
    if (access_token == null){
        await get_access_token();
    }
    $.ajax({
       url: 'http://localhost:8000/user/get_all?limit=100&skip=0',
       type: 'GET',
       contentType: 'application/json',
       headers: {
          'Authorization': 'Bearer ' + access_token
       },
       success: function (result) {
           console.log(result)
       },
       error: function (error) {

       }
    });
};


function get_access_token(){
    return $.ajax({
       url: 'http://localhost:8000/auth/refresh',
       type: 'POST',
       contentType: 'application/json',
       success: function (result) {
            console.log(result)
            access_token = result.access_token
       },
       error: function (error) {
            window.location.replace("http://localhost:8000/login");
       }
    });
}