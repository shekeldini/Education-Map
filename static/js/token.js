var HOST_NAME = document.location.origin
var PATHNAME = document.location.pathname
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
          'Authorization': 'Bearer ' + access_token,
       },
       success: function (result) {
           console.log(result)
       },
       error: function (error) {
            document.location.replace(HOST_NAME + "/login" + "?next=" + PATHNAME);
       }
    });
};


function get_access_token(){
    return $.ajax({
       url: HOST_NAME + '/auth/refresh',
       type: 'POST',
       contentType: 'application/json',
       success: function (result) {
            access_token = result.access_token
       },
       error: function (error) {
            window.location.replace(HOST_NAME + "/login" + "?next=" + PATHNAME);
       }
    });
}

