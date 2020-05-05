$(document).ready(function () {
    console.log("ready!!!");
    var name = getUser();
    //var socket = io();
    //The query member of the options object is passed to the server on connection and parsed as a CGI style Querystring.
    var socket = io("http://127.0.0.1:1551/", { query: "user="+name });
    console.log(socket);


    //send btn pressed
    $("#btn_send").click(function (e) {
        e.preventDefault();
        let msg = $("#msg").val();
        $("#msg").val('');


        //checking empty msg
        if (msg == '') {
            return;
        }

        //emitting msg to server
        socket.emit('send_msg', { text: msg, user: name });
    });

    //listening for msgs
    socket.on('send_msg', function (data) {
        if (data.user != name) {
            $("#msg_area").append("<div style='text-align:left'><p class='p-1 m-1'>" + data.user + ": <span class='jumbotron pl-2 pr-2 pt-1 pb-1 m-0 bg-white'>" + data.text + "</span></p></div>");
        }
        else {
            $("#msg_area").append("<div style='text-align:right'><p class='p-1 m-1'><span class='jumbotron pl-2 pr-2 pt-1 pb-1 m-0 bg-white'>" + data.text + "</span></p></div>");
        }
        updateScroll();
    });

    socket.on("user_joined",function(data){
        console.log(data);
    });
});


function getUser() {
    var data = prompt("Enter your name:");
    if (data != "" && data != null) {
        return data;
    }
    return getUser();
}


function updateScroll() {
    var element = document.getElementById("msg_area");
    element.scrollTop = element.scrollHeight;
}