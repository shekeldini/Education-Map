var HOST_NAME = document.location.origin
var URL_STRING = document.location.href
var url = new URL(URL_STRING);
var next = url.searchParams.get("next");

function submit_form(){
    var formData = $("#login_form").serializeArray();
    var send_data = {}
    for (element of formData) {
        send_data[element.name] = element.value
    };
    $.ajax({
        type: "POST",
        url: "/auth/",
        data: JSON.stringify(send_data),
        dataType: "json",
        contentType : "application/json",
        statusCode: {
            200: function(){
                if (next){
                    document.location.replace(HOST_NAME + next);
                }
                else {
                    document.location.replace(HOST_NAME);
                }
            },
            401: function(){
                console.log("401 Unauthorized")
            }
        }

    });
};
