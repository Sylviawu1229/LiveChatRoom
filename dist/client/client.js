var now = new Date();
var datetime = now.getFullYear() + '/' + (now.getMonth() + 1) + '/' + now.getDate();
datetime += ' ' + now.getHours() + ':' + now.getMinutes() + ':' + now.getSeconds();
var url = new URL(location.href);
var userName = url.searchParams.get('username');
class Client {
    constructor() {
        this.scrollChatWindow = () => {
            $('#messages').animate({
                scrollTop: $('#messages li:last-child').position().top
            }, 500);
            setTimeout(() => {
                let messagesLength = $("#messages li");
                if (messagesLength.length > 10) {
                    messagesLength.eq(0).remove();
                }
            }, 500);
        };
        this.socket = io();
        this.socket.on("connect", function () {
            console.log("connect");
        });
        //this.socket.emit("chatMessage", <ChatMessage>{message: userName+" joins the room", from: "SYSTEM", type: "systemMessage" })
        this.socket.on("disconnect", function () {
            console.log("disconnect");
            //location.reload()
        });
        this.socket.on("screenName", function () {
            $(".screenName").text(userName);
        });
        this.socket.on("chatMessage", (chatMessage) => {
            if (chatMessage.type === 'systemMessage') {
                $("#messages").append("<li><div class='float-start text-black-50'>[" + datetime + "] " + chatMessage.message + "</div></li>");
            }
            else {
                $("#messages").append("<li><div class='float-start text-black-50'>[" + datetime + "] </div><br>" + "<span class='otherCircle'>" + chatMessage.from + "</span><div class='otherMessage'> " + chatMessage.message + "</div></li>");
            }
            this.scrollChatWindow();
        });
        $(document).ready(() => {
            $('#messageText').keypress((e) => {
                var key = e.which;
                if (key == 13) // the enter key code
                 {
                    this.sendMessage();
                    return false;
                }
            });
        });
    }
    sendMessage() {
        let messageText = $("#messageText").val();
        if (messageText.toString().length > 0) {
            this.socket.emit("chatMessage", { message: messageText, from: userName });
            $("#messages").append("<li><div class='float-end text-black-50'>[" + datetime + "] </div><br>" + "<span class='myCircle'>" + userName + "</span><div class='myMessage'>" + messageText + "</div></li>");
            this.scrollChatWindow();
            $("#messageText").val("");
        }
    }
    showOption(id) {
        switch (id) {
            case 0:
                $("#Panel0").delay(100).fadeIn(100);
                break;
        }
    }
}
const client = new Client();
