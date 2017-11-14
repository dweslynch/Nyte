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
	let datex = /\d\d\/\d\d\/\d\d\d\d\s\d\d:\d\d\s[A:P]M/

	if (!(str.match(datex))) {
		console.log("Date of unknown format.  Assuming it hasn't happened yet");
		var r = new Date();
		r.setSeconds(r.getSeconds() + 60);
		return r;
	} else {
		var sects = str.split(' ');
		var days = sects[0].split('/');
		var times = sects[1].split(':');
		var tt = sects[2];

		var mm = parseInt(days[0]) - 1;
		var dd = parseInt(days[1]);
		var yyyy = parseInt(days[2]);
		var hours = parseInt(times[0]);
		var minutes = parseInt(times[1]);

		if ((((mm + 1 == 1) || (mm + 1 == 3) || (mm + 1 == 5) || (mm + 1 == 7) || (mm + 1 == 8) || (mm + 1 == 10) || (mm + 1 == 12)) && (dd > 31))
			|| (((mm + 1 == 4) || (mm + 1 == 6) || (mm + 1 == 9) || (mm + 1 == 11)) && (dd > 30))
			|| ((mm + 1 == 2) && (yyyy % 4 != 0) && (dd > 28))
			|| ((mm + 1 == 2) && (yyyy % 4 == 0) && (dd > 29))
			|| (hours > 12) || (hours < 1) || (minutes > 60) || (minutes < 0) || (mm + 1 > 12) || (mm + 1 < 1)) {
			console.log("Date Invalid");
			var r = new Date();
			r.setSeconds(r.getSeconds() - 1);
			return r;
		}

		if (tt == "PM") {
			hours += 12;
		}

		var ret = new Date(yyyy, mm, dd, hours, minutes);
		console.log("Date Valid");
		return ret;
	}
}