function getStatus() {
	document.getElementById("showButton").textContent="Loading ...";
	document.getElementById("showButton").disabled=true;
	document.getElementById("pump").innerHTML = "PUMP 3 status: ?";
	document.getElementById("western").innerHTML = "WESTERN 22 status: ?";
	document.getElementById("middle").innerHTML = "MIDDLE 10 status: ?";
        document.getElementById("eastern").innerHTML = "EASTERN 9 status: ?";
        document.getElementById("temp").innerHTML = "CPU temp=? Temp=? Humidity=?";
	document.getElementById("cron").innerHTML = "CRON: ?";
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

function westernCycle() {
        httpGetAsync("/westernCycle", getStatus);
}

function middleCycle() {
        httpGetAsync("/middleCycle", getStatus);
}

function easternCycle() {
        httpGetAsync("/easternCycle", getStatus);
}

function allCycle() {
        httpGetAsync("/allCycle", getStatus);
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
        document.getElementById("temp").innerHTML = "CPU " + sres[0];
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

