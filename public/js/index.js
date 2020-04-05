var socket = io();

socket.on('setRangking' , function(data){
    setRankingView(data);
});

socket.on('resetRanking' , function(data){
    var orderNumb = document.getElementById('orderNumb');
    orderNumb.innerHTML = 0;
});

function pushButton() {
    var groupIdTxt = document.getElementById('groupIdTxt').value;
    
    if (groupIdTxt == '') {
        showNotification();
    } else {
        socket.emit('getRanking', groupIdTxt);
    }
}

function setRankingView(idx) {
    var groupIdTxt = document.getElementById('groupIdTxt').value;
    var groupId = document.getElementById('groupId');
    var orderNumb = document.getElementById('orderNumb');

    groupId.innerHTML = groupIdTxt;
    orderNumb.innerHTML = idx;
}

function showNotification() {
    alert("Isi nama kelompok");
}

