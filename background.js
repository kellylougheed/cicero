chrome.extension.onMessage.addListener(function(request, sender, sendResponse) {
    var word = request.word;
    var url = "https://glosbe.com/gapi/translate?from=ita&dest=eng&format=json&phrase="+word;
    var xhr = new XMLHttpRequest();
	xhr.open("GET", url, true);
	xhr.onreadystatechange = function() {
		if (xhr.readyState == 4) {
			// JSON.parse does not evaluate the attacker's scripts.
			var resp = JSON.parse(xhr.responseText);
			var def = "";
			var etc = "";
			if (resp.tuc.length < 1) {
	    		def = "Sorry, no results were found. Please try searching a different word.";
	    	} else {
	    		if (resp.tuc[0].phrase) {
					def = resp.tuc[0].phrase.text;
				}
				if (resp.tuc[0].meanings[0].text) {
					etc = resp.tuc[0].meanings[0].text;
				}
	    	}
	    	sendResponse({p1: def, p2: etc});
		}
	}
	xhr.send();
	return true;
});
