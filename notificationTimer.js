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

function notifyMe() {
  // Let's check if the browser supports notifications
  console.log(Notification.permission);
  
  if (!("Notification" in window)) {
    alert("This browser does not support system notifications");
  }

  // Let's check whether notification permissions have already been granted
  else if (Notification.permission === "granted") {
    // If it's okay let's create a notification
    var notification = new Notification("Hi there!");
    console.log("notification");
  }

  // Otherwise, we need to ask the user for permission
  else if (Notification.permission !== 'denied') {
    Notification.requestPermission(function (permission) {
      // If the user accepts, let's create a notification
      if (permission === "granted") {
        var notification = new Notification("Hi there!");
      }
    });
  }

  // Finally, if the user has denied notifications and you 
  // want to be respectful there is no need to bother them any more.
}

