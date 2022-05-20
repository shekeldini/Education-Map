var HOST_NAME = document.location.origin
var access_token = null;

async function get_private(URL){
    if (access_token == null){
        await get_access_token();
    }
    $.ajax({
       url: HOST_NAME + '/' + URL,
       type: 'GET',
       contentType: 'application/json',
       headers: {
          'Authorization': 'Bearer ' + access_token
       },
       success: function (result) {
           console.log(result)
       },
       error: function (error) {
            window.location.replace(HOST_NAME + "/login");
       }
    });
};


function get_access_token(){
    return $.ajax({
       url: HOST_NAME + '/auth/refresh',
       type: 'POST',
       contentType: 'application/json',
       success: function (result) {
            console.log(result)
            access_token = result.access_token
       },
       error: function (error) {
            window.location.replace(HOST_NAME + "/login");
       }
    });
}

function parseJwt (token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
};