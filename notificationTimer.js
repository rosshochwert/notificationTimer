function checkNotifications(){
	console.log(Notification);
	console.log(Notification.permission);
	if (!("Notification" in window)) {
	    alert("This browser does not support system notifications");
	  } else if (Notification.permission === "granted") {
	  	console.log("already given permission");
	  } else if (Notification.permission === "default") {
		Notification.requestPermission().then(function(result) {
			console.log(result);
		});
	}
}


document.addEventListener("DOMContentLoaded", function(event) {
	checkNotifications();
});

function notifyMe(input) {
  if (Notification.permission === "granted") {
    // If it's okay let's create a notification

    if (input=="example"){
    	var options = {
    		body: "See you soon!",
    		icon: ""
    	}
    	var notification = new Notification("This is what your notification will look like!", options);

  	} else if (input=="timesUp") {
    	var options2 = {
    		body: "Thanks for playing!",
    		icon: ""
    	}
    	var notification2 = new Notification("Times up! Come back and reset your timer if you want more reminders", options2);



  	} else {
  		var options1 = {
    		body: "See you soon!",
    		icon: ""
    	}
    	var notification1 = new Notification("Friendly timer reminder! You have " + input + " recurrences left", options1);
  	}
  }

  // Finally, if the user has denied notifications and you 
  // want to be respectful there is no need to bother them any more.
}

var timerInterval;

function setTimer(){
	notifyMe("example");
	duration1 = moment.duration({
		'seconds': 0,
		'hour': 0,
		'minutes': 0,
		'days':0
	});

	duration2 = moment.duration({
	    'seconds': document.getElementById("inputSeconds").value,
	    'hour': document.getElementById("inputHours").value,
	    'minutes': document.getElementById("inputMinutes").value,
	    'days':0
	});

	diff=duration2-duration1;
	duration=moment.duration(diff, 'milliseconds');

	timesLeft = document.getElementById("inputRepeat").value;

	document.getElementById("timesLeft").innerHTML = "# of recurrences left: " + timesLeft;

	interval = 1000;
	timerInterval = setInterval(function(){
		duration = moment.duration(duration.asMilliseconds() - interval, 'milliseconds');
		if (duration < 0){
			timesLeft = timesLeft - 1;
			if (timesLeft <= 0){
				document.getElementById("seconds").innerHTML = "0s";
				document.getElementById("minutes").innerHTML = "0m";
				document.getElementById("hours").innerHTML = "0h";
				document.getElementById("timesLeft").innerHTML = "# of recurrences left: 0";
				notifyMe("timesUp");
				clearInterval(timerInterval);
				stopTimer();
			} else {
				duration2 = moment.duration({
	    			'seconds': document.getElementById("inputSeconds").value,
	    			'hour': document.getElementById("inputHours").value,
	    			'minutes': document.getElementById("inputMinutes").value,
	    			'days':0
				});
					diff=duration2-duration1;
					duration=moment.duration(diff, 'milliseconds');
					document.getElementById("timesLeft").innerHTML = "# of recurrences left: " + timesLeft;
					notifyMe(timesLeft);
			}
		} else {
			document.getElementById("seconds").innerHTML = duration.seconds() + "s";
			document.getElementById("minutes").innerHTML = duration.minutes() + "m";
			document.getElementById("hours").innerHTML = duration.hours() + "h";
		}
	}, interval);

	document.getElementById("timer").style.display = 'block';
	document.getElementById("setTimerButton").style.display = 'none';
}

function stopTimer(){
	clearInterval(timerInterval);
	document.getElementById("setTimerButton").style.display = 'block';
	document.getElementById("timer").style.display = 'none';
	document.getElementById("seconds").innerHTML = "s";
	document.getElementById("minutes").innerHTML = "m";
	document.getElementById("hours").innerHTML = "h";
	document.getElementById("timesLeft").innerHTML = "";
}