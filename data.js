function getStatus() {
	document.getElementById("showButton").textContent="Loading ...";
	document.getElementById("showButton").disabled=true;
	document.getElementById("pump").innerHTML = "";
	document.getElementById("western").innerHTML = "";
	document.getElementById("middle").innerHTML = "";
        document.getElementById("eastern").innerHTML = "";
        document.getElementById("temp").innerHTML = "";
	document.getElementById("cron").innerHTML = "";
	httpGetAsync("/getStatus", show);
}

function getLog() {
        document.getElementById("log").innerHTML = "";
        httpGetAsync("/getLog", showLog);
}

function pumpON() {
        httpGetAsync("/pumpON", getStatus);
}

function pumpOFF() {
        httpGetAsync("/pumpOFF", getStatus);
}

function westernON() {
        httpGetAsync("/westernON", getStatus);
}

function westernOFF() {
	httpGetAsync("/westernOFF", getStatus);
}

function middleON() {
        httpGetAsync("/middleON", getStatus);
}

function middleOFF() {
        httpGetAsync("/middleOFF", getStatus);
}

function easternON() {
        httpGetAsync("/easternON", getStatus);
}

function easternOFF() {
        httpGetAsync("/easternOFF", getStatus);
}

function pause() {
        httpGetAsync("/pause", getStatus);
}

function UNpause() {
        httpGetAsync("/UNpause", getStatus);
}

function httpGetAsync(theUrl, callback)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() { 
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
            callback(xmlHttp.responseText);
    }
    xmlHttp.open("GET", theUrl, true); // true for asynchronous 
    xmlHttp.send(null);
}

function show_status(sres, prefix, tag) {
        var lines = sres.split("\n");
        if (lines[0].startsWith(prefix)) {
                document.getElementById(tag).innerHTML = lines[0] + " " + lines[3];
		if (lines[3].trim().endsWith("OFF")) {
			document.getElementById(tag).style.color = "green";
		}
		else {
			document.getElementById(tag).style.color = "blue";
		}
        }
}

function show(res) {
	var sres = res.split("\n\n");
        document.getElementById("temp").innerHTML = "CPU " + res.match(/temp=.*C/);
	show_status(sres[1], "PUMP", "pump");
        show_status(sres[2], "WESTERN", "western");
        show_status(sres[3], "MIDDLE", "middle");
        show_status(sres[4], "EASTERN", "eastern");
 	document.getElementById("cron").innerHTML=sres[5];
	if (sres[5].trim().endsWith("scheduled")) {
		document.getElementById("cron").style.color = "green";
	}
	else {
		document.getElementById("cron").style.color = "red";
	}
        document.getElementById("showButton").textContent="Status";
        document.getElementById("showButton").disabled=false;
}

function showLog(res) {
        document.getElementById("log").innerHTML = res;
}

