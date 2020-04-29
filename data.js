let state = {
	cron: false,
	western: false,
	middle: false,
	eastern: false,
	pump: false
}

function setBtnsDisabled(disabled) {
        document.getElementById("showButton").disabled = disabled;
        document.getElementById("pumpBtn").disabled = disabled;
        document.getElementById("westernBtn").disabled = disabled;
        document.getElementById("middleBtn").disabled = disabled;
        document.getElementById("easternBtn").disabled = disabled;
        document.getElementById("cronBtn").disabled = disabled;
        document.getElementById("allCycle").disabled = disabled;
        document.getElementById("westernCycle").disabled = disabled;
        document.getElementById("middleCycle").disabled = disabled;
        document.getElementById("easternCycle").disabled = disabled;
        document.getElementById("getLog").disabled = disabled;

}

function getStatus() {
	document.getElementById("showButton").textContent = "Loading ...";
        document.getElementById("pump").innerHTML = "PUMP 3: ?";
	document.getElementById("western").innerHTML = "WESTERN 22: ?"; 
	document.getElementById("middle").innerHTML = "MIDDLE 10: ?";
        document.getElementById("eastern").innerHTML = "EASTERN 9: ?";
        document.getElementById("cputemp").innerHTML = "CPU temp=?";
        document.getElementById("temp").innerHTML = "Temp=? Humidity=?";
	document.getElementById("cron").innerHTML = "CRON: ?";
	setBtnsDisabled(true);
	httpGetAsync("/getStatus", show);
}

function getLog() {
        document.getElementById("log").innerHTML = "";
        httpGetAsync("/getLog", showLog);
}

function pumpBtnClicked() {
        if (state.pump === true) {
                pumpOFF();
        }
        else {
                pumpON();
        }
}

function pumpON() {
        httpGetAsync("/pumpON", getStatus);
}

function pumpOFF() {
        httpGetAsync("/pumpOFF", getStatus);
}

function westernBtnClicked() {
        if (state.western === true) {
                westernOFF();
        }
        else {
                westernON();
        }
}

function westernON() {
        httpGetAsync("/westernON", getStatus);
}

function westernOFF() {
	httpGetAsync("/westernOFF", getStatus);
}

function middleBtnClicked() {
        if (state.middle === true) {
                middleOFF();
        }
        else {
                middleON();
        }
}

function middleON() {
        httpGetAsync("/middleON", getStatus);
}

function middleOFF() {
        httpGetAsync("/middleOFF", getStatus);
}

function easternBtnClicked() {
        if (state.eastern === true) {
                easternOFF();
        }
        else {
                easternON();
        }
}

function easternON() {
        httpGetAsync("/easternON", getStatus);
}

function easternOFF() {
        httpGetAsync("/easternOFF", getStatus);
}

function cronBtnClicked() {
	if (state.cron === true) {
		pause();
	}
	else {
		UNpause();
	}
}

function pause() {
        httpGetAsync("/pause", getStatus);
}

function UNpause() {
        httpGetAsync("/UNpause", getStatus);
}

function westernCycle() {
        let res = confirm("Start western cycle?");
        if (res === true) {
	        httpGetAsync("/westernCycle", getStatus);
	}
}

function middleCycle() {
        let res = confirm("Start middle cycle?");
        if (res === true) {
	        httpGetAsync("/middleCycle", getStatus);
	}
}

function easternCycle() {
        let res = confirm("Start esstern cycle?");
        if (res === true) {
	        httpGetAsync("/easternCycle", getStatus);
	}
}

function allCycle() {
	let res = confirm("Start all cycle?");
	if (res === true) {
                httpGetAsync("/allCycle", getStatus);
        }
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
        const lines = sres.split("\n");
	const status = lines[3].split(":");
	const onoff = status[1].trim();
        if (lines[0].startsWith(prefix)) {
                document.getElementById(tag).innerHTML = lines[0] + ": " + onoff;
		if (onoff === "OFF") {
			state[tag] = false;
			document.getElementById(tag).style.color = "red";
			document.getElementById(tag + "Btn").innerHTML = "ON";
		}
		else {
			state[tag] = true;
			document.getElementById(tag).style.color = "green";
                        document.getElementById(tag + "Btn").innerHTML = "OFF";
		}
        }
	console.log(document.getElementById(tag).innerHTML);
}

function show(res) {
	const sres = res.split("\n\n");
        const temp = sres[0].split("\n");
//	console.log(temp);
	document.getElementById("cputemp").innerHTML = "CPU " + temp[0];
        document.getElementById("temp").innerHTML = temp[1] + " " + temp[2];
	show_status(sres[1], "PUMP", "pump");
        show_status(sres[2], "WESTERN", "western");
        show_status(sres[3], "MIDDLE", "middle");
        show_status(sres[4], "EASTERN", "eastern");
 	document.getElementById("cron").innerHTML=sres[5];
	if (sres[5].trim().endsWith("scheduled")) {
		state.cron = true;
		document.getElementById("cron").style.color = "green";
		document.getElementById("cronBtn").innerHTML = "Pause";
	}
	else {
		state.cron = false;
		document.getElementById("cron").style.color = "red";
                document.getElementById("cronBtn").innerHTML = "UNpause";
	}
        document.getElementById("showButton").textContent="Status";
	setBtnsDisabled(false);
	console.log(state);
}

function showLog(res) {
        document.getElementById("log").innerHTML = res;
}

