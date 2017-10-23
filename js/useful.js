function titleCase(str) {
    str = str.toLowerCase().split(' ');
    for (var i = 0; i < str.length; i++) {
        str[i] = str[i].charAt(0).toUpperCase() + str[i].slice(1); 
    }
    return str.join(' ');
}

function getClubs() {
    var username = sessionStorage.getItem('user');
    var _clubs = [];

    database.ref('users/' + username + '/clubs').once('value', function(snap) {
        snap.forEach(function(item) {
            console.log(item.key);
            _clubs.push(item.key);
        });
    });

    return _clubs;
}