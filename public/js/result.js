var socket = io();
var idx = 1;

socket.emit('setMaster');

socket.on('setRankingView', function(groupId) {
    createList(groupId);
});

function resetRanking() {
    var elements = document.getElementsByClassName('placeHolder');

    for (i = elements.length; i--;) {         
        elements[i].parentNode.removeChild(elements[i]);             
    }
    
    socket.emit('resetRanking');
    idx = 1;
}

function createList(groupId) {
    var rankList = document.getElementById('rankList');
    var placeHolder = document.createElement('div');
    var tileDiv = document.createElement('div');
    var notifDiv = document.createElement('div');

    placeHolder.setAttribute('class', 'placeHolder');
    tileDiv.setAttribute('class', 'tile has-padding-top-7 is-block');
    tileDiv.setAttribute('id', 'tileList');
    notifDiv.setAttribute('class', 'notification is-info');
    notifDiv.innerHTML = idx + '. Kelompok ' + groupId;
    idx ++;

    rankList.appendChild(placeHolder);
    placeHolder.appendChild(tileDiv);
    tileDiv.appendChild(notifDiv);
}