function titleCase(str) {
    str = str.toLowerCase().split(' ');
    for (var i = 0; i < str.length; i++) {
        str[i] = str[i].charAt(0).toUpperCase() + str[i].slice(1); 
    }
    return str.join(' ');
}

function getLocale(usr) {
	database.ref('users/' + usr).once('value', function(snap) {
		var _locale = snap.val().state + '/' + snap.val().city + '/' + snap.val().school;
		return _locale;
	});
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

function getSchoolClubs() {
	var state = sessionStorage.getItem('state');
	var city = sessionStorage.getItem('city');
	var school = sessionStorage.getItem('school');
	var locale = state + '/' + city + '/' + school;

	var _clubs = [];

	database.ref('schools/' + locale).once('value', function(snap) {
        snap.forEach(function(item) {
            console.log(item.key);
            _clubs.push(item.key);
        });
    });
}

function getDate(str) {
	// Looks like MM/DD/YYYY hh:mm TT
	try {
		var sects = str.split(' ');
		var days = sects[0].split('/');
		var times = sects[1].split(':');
		var tt = sects[2];

		var mm = parseInt(days[0]) - 1;
		var dd = parseInt(days[1]);
		var yyyy = parseInt(days[2]);
		var hours = parseInt(times[0]);
		var minutes = parseInt(times[1]);

		if (tt == "PM") {
			hours += 12;
		}

		return new Date(yyyy, mm, dd, hours, minutes);
	}
	catch (e) {
		console.log(e);
		var r = new Date();
		r.setSeconds(r.getSeconds() + 60);
		return r;
	}
}