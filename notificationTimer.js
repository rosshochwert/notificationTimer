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
  if (Notification.permission === "granted") {
    // If it's okay let's create a notification
    setTimeout(function(){ 
    	var notification = new Notification("Hi there!");
    }, 3000);
  }

  // Finally, if the user has denied notifications and you 
  // want to be respectful there is no need to bother them any more.
}

