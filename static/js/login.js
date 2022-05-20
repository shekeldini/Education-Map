function submitform(){
    var formData = $("#login_form").serializeArray();
    var send_data = {}
    for (element of formData) {
        send_data[element.name] = element.value
    };
    console.log(send_data);
    $.ajax({
      type: "POST",
      url: "/auth/",
      data: JSON.stringify(send_data),
      dataType: "json",
      contentType : "application/json",
      success: function(data){
        console.log(data)
      }
    });
};
