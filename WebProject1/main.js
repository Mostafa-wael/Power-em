
var elementcount = 0;
var OutFile = "";
var n1 = -1;
var n2 = -1;
var gnd = 0;
var l = OutFile.length;
var elementid = '';
var IsItTime = false;
var click1 = 0;
var click2 = 0;


var tabOutFile = OutFile;




function DrawVertical(el) {
    document.getElementById((n1 < 10) ? "n0" + n1 : "n" + n1).innerHTML += "<img id='" + el + elementcount + "'" + "src='elements/" + el + "VF.png'>";
    document.getElementById((n2 < 10) ? "n0" + n2 : "n" + n2).innerHTML += "<img id='" + el + elementcount + "'" + "src='elements/" + el + "VE.png'>";
    for (var i = parseInt(n1) + 16; i < parseInt(n2); i += 16)
        document.getElementById((i < 10) ? "n0" + i : "n" + i).innerHTML += "<img id='" + el + elementcount + "'" + "src='elements/" + el + "VM.png'>";

};
function DrawMDiagonal(el) {
    document.getElementById((n1 < 10) ? "n0" + n1 : "n" + n1).innerHTML += "<img class='MD' id='" + el + elementcount + "'" + "src='elements/" + el + "HF.png'>";
    document.getElementById((n2 < 10) ? "n0" + n2 : "n" + n2).innerHTML += "<img class='MD' id='" + el + elementcount + "'" + "src='elements/" + el + "HE.png'>";
    for (var i = parseInt(n1) + 17; i < parseInt(n2); i += 17)
        document.getElementById((i < 10) ? "n0" + i : "n" + i).innerHTML += "<img class='MD' id='" + el + elementcount + "'" + "src='elements/" + el + "HM.png'>";

};
function DrawODiagonal(el) {
    document.getElementById((n1 < 10) ? "n0" + n1 : "n" + n1).innerHTML += "<img class='OD' id='" + el + elementcount + "'" + "src='elements/" + el + "HF.png'>";
    document.getElementById((n2 < 10) ? "n0" + n2 : "n" + n2).innerHTML += "<img class='OD' id='" + el + elementcount + "'" + "src='elements/" + el + "HE.png'>";
    for (var i = parseInt(n1) + 15; i < parseInt(n2); i += 15)
        document.getElementById((i < 10) ? "n0" + i : "n" + i).innerHTML += "<img class='OD' id='" + el + elementcount + "'" + "src='elements/" + el + "HM.png'>";

};
function DrawHorizontal(el) {

    document.getElementById((n1 < 10) ? "n0" + n1 : "n" + n1).innerHTML += "<img id='" + el + elementcount + "'" + "src='elements/" + el + "HF.png'>";
    document.getElementById((n2 < 10) ? "n0" + n2 : "n" + n2).innerHTML += "<img id='" + el + elementcount + "'" + "src='elements/" + el + "HE.png'>";
    for (var i = parseInt(n1) + 1; i < parseInt(n2); i++)
        document.getElementById((i < 10) ? "n0" + i : "n" + i).innerHTML += "<img id='" + el + elementcount + "'" + "src='elements/" + el + "HM.png'>";


};



function Draw(el) {
    var max = (parseInt(n1) > parseInt(n2)) ? n1 : n2;
    var min = (parseInt(n1) > parseInt(n2)) ? n2 : n1;
    n2 = max;
    n1 = min;

    if (n1 == n2 || n1 > 96 || n1 > 96) {
        for (var i = 1; i < 97; i++) {
            document.getElementById((i < 10) ? "n0" + i : "n" + i).style.background = 'rgba(0,0,0,0)';
            document.getElementById((i < 10) ? "n0" + i : "n" + i).style.borderWidth = '0.1vw';
            document.getElementById((i < 10) ? "n0" + i : "n" + i).style.borderColor = 'rgb(220, 220, 220)';
        }
        n1 = -1;
        n2 = -1;
        click1 = 0;
        click2 = 0;
        return;
    }
    else if (n1 % 16 == n2 % 16) {
        elementcount++;
        DrawVertical(el);
        document.getElementById(el + elementcount).style.zIndex = elementcount + 5;
    }
    else if (parseInt((n1 - 1) / 16) == parseInt((n2 - 1) / 16)) {
        elementcount++;
        DrawHorizontal(el);
        document.getElementById(el + elementcount).style.zIndex = elementcount + 5;
    }
    else if (n1 % 17 == n2 % 17 && n2 % 16 > n1 % 16) {
        elementcount++;
        DrawMDiagonal(el);
        document.getElementById(el + elementcount).style.zIndex = elementcount + 5;
    }
    else if (n1 % 15 == n2 % 15 && n1 % 16 > n2 % 16) {
        elementcount++;
        DrawODiagonal(el);
        document.getElementById(el + elementcount).style.zIndex = elementcount + 5;
    }
    else {
        alert("Not in the same row/column");
        for (var i = 1; i < 97; i++) {
            document.getElementById((i < 10) ? "n0" + i : "n" + i).style.background = 'rgba(0,0,0,0)';
            document.getElementById((i < 10) ? "n0" + i : "n" + i).style.borderWidth = '0.1vw';
            document.getElementById((i < 10) ? "n0" + i : "n" + i).style.borderColor = 'rgb(220, 220, 220)';
        }
        n1 = -1;
        n2 = -1;
        click1 = 0;
        click2 = 0;
        return;

    }
    if (elementcount == 1) {
        var freq = prompt("Please enter Circuit.Frequency");
        OutFile += freq + "\n\n";
        gnd = n2;
    }
    var value = prompt(el + " Value =") + "\n\n";
    if (value == null || value == '' || value == ' ')
        value = 1;
    var newel = 'M'

    if (value[0] == 'V' && el[0] == 'V')
        newel = 'H';
    else if (value[0] == 'V' && el[0] == 'I')
        newel = 'F';
    else if (value[0] == '(' && el[0] == 'V')
        newel = 'E';
    else if (value[0] == '(' && el[0] == 'I')
        newel = 'G';
    else
        newel = el[0];
    if (newel[0] != el[0]) {
        for (var i = 1; i < 97; i++) {
            if (document.getElementById((i < 10) ? "n0" + i : "n" + i)) {
                document.getElementById((i < 10) ? "n0" + i : "n" + i).innerHTML = document.getElementById((i < 10) ? "n0" + i : "n" + i).innerHTML.replace((el + elementcount + "\" " + "src=\"elements/" + el),
                    (newel + elementcount + "\" " + "src=\"elements/" + el + 'c'));
            }
        }
    }

    if (n1 == gnd)
        OutFile += newel + elementcount + ' ' + '0' + ' ' + n2 + ' ';
    else if (n2 == gnd)
        OutFile += newel + elementcount + ' ' + n1 + ' ' + '0' + ' ';
    else
        OutFile += newel + elementcount + ' ' + n1 + ' ' + n2 + ' ';

    OutFile += value;
    for (var i = 1; i < 97; i++) {
        document.getElementById((i < 10) ? "n0" + i : "n" + i).style.background = 'rgba(0,0,0,0)';
        document.getElementById((i < 10) ? "n0" + i : "n" + i).style.borderWidth = '0.1vw';
        document.getElementById((i < 10) ? "n0" + i : "n" + i).style.borderColor = 'rgb(220, 220, 220)';
    }
    n1 = -1;
    n2 = -1;
    IsItTime = false;
    click1 = 0;
    click2 = 0;
};

function GetNode(id) {
    click1 = click2;
    click2 = parseInt(id[1]) * 10 + parseInt(id[2]);
    if (!click1)
        hold(click2);
    else
        for (var i = 1; i < 97; i++) {
            document.getElementById((i < 10) ? "n0" + i : "n" + i).style.background = 'rgba(0,0,0,0)';
            document.getElementById((i < 10) ? "n0" + i : "n" + i).style.borderWidth = '0.1vw';
            document.getElementById((i < 10) ? "n0" + i : "n" + i).style.borderColor = 'rgb(220, 220, 220)';
        }
};

function myFunction(id) {

    n1 = click1;
    n2 = click2;
    elementid = id[0];
    click = 0;
    if ((n2 > 0 && n1 > 0 && n2 < 97 && n1 < 97)) {
        alert(n1);
        alert(n2);
        Draw(elementid);
    }
    for (var i = 1; i < 97; i++) {
        document.getElementById((i < 10) ? "n0" + i : "n" + i).style.background = 'rgba(0,0,0,0)';
        document.getElementById((i < 10) ? "n0" + i : "n" + i).style.borderWidth = '0.1vw';
        document.getElementById((i < 10) ? "n0" + i : "n" + i).style.borderColor = 'rgb(220, 220, 220)';
    }
    tabOutFile = OutFile;
    for (var i = 0; i <= elementcount; i++)
        tabOutFile = tabOutFile.replace("\n\n", "<br/>");
    document.getElementById("tab").innerHTML = "<p class = 'Fixsize'>Fix the size of the grid<p/>" + "Netlist: <br/>" + tabOutFile;
};

function Delete() {
    var x1 = prompt("write the id of the element you want delete");
    if (document.getElementById(x1) && (x1[1] == '1' || x1[1] == '2' || x1[1] == '3'
        || x1[1] == '4' || x1[1] == '5' || x1[1] == '6' || x1[1] == '7' || x1[1] == '8' || x1[1] == '9')) {
        // break the textblock into an array of lines
        var lines = OutFile.split('\n\n');
        // remove one line, starting at the first position
        for (var i = 0; i <= 100 + 1; i++) {
            if (lines[i])
                if (lines[i].indexOf(x1) != -1)
                    lines.splice(i, 1);
        }
        if (elementcount == 0)
            lines.splice(0, 1);
        // join the array back into a single string
        OutFile = lines.join('\n\n');

        tabOutFile = OutFile;
        for (var i = 0; i <= elementcount; i++)
            tabOutFile = tabOutFile.replace("\n\n", "<br/>");
        document.getElementById("tab").innerHTML = "<p class = 'Fixsize'>Fix the size of the grid<p/>" + "Netlist: <br/>" + tabOutFile;
        for (var i = 1; i < 97; i++) {
            if (document.getElementById(x1))
                document.getElementById(x1).remove();
        }
    }

};

function Txt() {
    /*OutFile[OutFile.indexOf(gnd)] = '0';
    OutFile[OutFile.indexOf(gnd) + 1] = ' ';*/
    var textFile = null,
        makeTextFile = function (text) {
            var data = new Blob([text], { type: 'text/plain' });

            // If we are replacing a previously generated file we need to
            // manually revoke the object URL to avoid memory leaks.
            if (textFile !== null) {
                window.URL.revokeObjectURL(textFile);
            }

            textFile = window.URL.createObjectURL(data);

            // returns a URL you can use as a href
            return textFile;
        };
    var link = document.createElement('a');
    link.setAttribute('download', 'info.txt');
    var Out = OutFile.slice(0, OutFile.length - 2);
    link.href = makeTextFile(Out);
    document.body.appendChild(link);

    // wait for the link to be added to the document
    window.requestAnimationFrame(function () {
        var event = new MouseEvent('click');
        link.dispatchEvent(event);
        document.body.removeChild(link);
    });

};
function hold(n) {
    n = parseInt(n);
    var start = (n % 17 < n % 16) ? n % 17 : n - 17 * (n % 16) + 17;
    if (n < 17) { start = n; }
    else if (!(n % 17)) { start = 17; }
    if (!(n % 16)) { start = n % 17 }
    var end = (((n % 17 > 0 && n % 17 < 12) || (n % 17 > n % 16) || !(n % 17)) && n % 16) ? 97 : n % 17 + (17 - n % 17) * 17 - 17;
    var i = start;
    console.log(start);
    console.log(end);
    for (i; i <= end; i += 17) {
        //if (document.getElementById((i < 10) ? "n0" + i : "n" + i).innerHTML[32] != 'M')
        document.getElementById((i < 10) ? "n0" + i : "n" + i).style.background = 'radial-gradient(rgba(160, 240, 160,' + 0.8 / Math.sqrt(Math.abs(n / 17 - i / 17) + 1) + ') 40%,  rgba(120, 200, 120,' + 0.6 / Math.sqrt(Math.abs(n / 17 - i / 17) + 1) + ') 100%)';
    }

    for (var i = (n % 15) ? n % 15 : 15; i < 97; i += 15) {
        if (parseInt((i + 15) / 16) == parseInt((i) / 16)) {
            if (i > n)
                break;
            else if (n > i)
                for (var j = n % 15; j < i; j += 15)
                    document.getElementById((j < 10) ? "n0" + j : "n" + j).style.background = 'rgba(0,0,0,0)';
        }
        if (!(i % 16))
            for (var j = n % 15; j < i; j += 15)
                document.getElementById((j < 10) ? "n0" + j : "n" + j).style.background = 'rgba(0,0,0,0)';
        //if (document.getElementById((i < 10) ? "n0" + i : "n" + i).innerHTML[32] != 'M')
        document.getElementById((i < 10) ? "n0" + i : "n" + i).style.background = 'radial-gradient(rgba(160, 240, 160,' + 0.8 / Math.sqrt(Math.abs(n / 15 - i / 15) + 1) + ') 40%,  rgba(120, 200, 120,' + 0.6 / Math.sqrt(Math.abs(n / 15 - i / 15) + 1) + ') 100%)';
    }
    for (var i = 1 + parseInt((n - 1) / 16) * 16; i < 17 + parseInt((n - 1) / 16) * 16; i++) {

        //if (document.getElementById((i < 10) ? "n0" + i : "n" + i).innerHTML[32] != 'M')
        document.getElementById((i < 10) ? "n0" + i : "n" + i).style.background = 'radial-gradient(rgba(160, 240, 160,' + 0.8 / Math.sqrt(Math.abs((n - 1) % 16 - (i - 1) % 16) + 1) + ') 40%,  rgba(120, 200, 120,' + 0.6 / Math.sqrt(Math.abs((n - 1) % 16 - (i - 1) % 16) + 1) + ') 100%)';
        /*if (document.getElementById((i < 10) ? "n0" + i : "n" + i).innerHTML[31] == 'H') {
            if (i > n)
                break;
            else if (n > i)
                for (var j = 1 + parseInt((n - 1) / 16) * 16; j < i; j++)
                    document.getElementById((j < 10) ? "n0" + j : "n" + j).style.background = 'rgba(0,0,0,0)';
        }*/
    }
    for (var i = (n % 16) ? n % 16 : 16; i < 97; i += 16) {
        //if (document.getElementById((i < 10) ? "n0" + i : "n" + i).innerHTML[32] != 'M')
        document.getElementById((i < 10) ? "n0" + i : "n" + i).style.background = 'radial-gradient(rgba(160, 240, 160,' + 0.8 / Math.sqrt(Math.abs(n / 16 - i / 16) + 1) + ') 40%,  rgba(120, 200, 120,' + 0.6 / Math.sqrt(Math.abs(n / 16 - i / 16) + 1) + ') 100%)';
        /*if (document.getElementById((i < 10) ? "n0" + i : "n" + i).innerHTML[31] == 'V') {
            if (i > n)
                break;
            else if (n > i)
                for (var j = n % 16; j < i; j += 16)
                    document.getElementById((j < 10) ? "n0" + j : "n" + j).style.background = 'rgba(0,0,0,0)';
        }*/
    }


    //for (var i = parseInt(n1) + 15; i < parseInt(n2); i += 15)


    document.getElementById((n < 10) ? "n0" + n : "n" + n).style.borderWidth = '0.3vw';
    if (elementid[0] == "R") {
        document.getElementById((n < 10) ? "n0" + n : "n" + n).style.background = 'radial-gradient(rgba(240, 200, 160, 0.8) 40%,  rgba(200, 140, 60, 0.6) 100%)';
        document.getElementById((n < 10) ? "n0" + n : "n" + n).style.borderColor = 'rgb(150,70,10)';
    }
    else if (elementid[0] == "C") {
        document.getElementById((n < 10) ? "n0" + n : "n" + n).style.background = 'radial-gradient(rgba(160, 200, 240, 0.8) 40%,  rgba(60, 140, 200, 0.6) 100%)';
        document.getElementById((n < 10) ? "n0" + n : "n" + n).style.borderColor = 'rgb(10,40,150)';
    } else if (elementid[0] == "L") {
        document.getElementById((n < 10) ? "n0" + n : "n" + n).style.background = 'radial-gradient(rgba(240, 150, 190, 0.8) 40%,  rgba(200, 60, 140, 0.6) 100%)';
        document.getElementById((n < 10) ? "n0" + n : "n" + n).style.borderColor = 'rgb(150,10,40)';
    } else if (elementid[0] == "I") {
        document.getElementById((n < 10) ? "n0" + n : "n" + n).style.background = 'radial-gradient(rgba(150, 150, 150, 0.8) 40%,  rgba(80, 80, 80, 0.6) 100%)';
        document.getElementById((n < 10) ? "n0" + n : "n" + n).style.borderColor = 'rgb(20,20,20)';
    } else if (elementid[0] == "V") {
        document.getElementById((n < 10) ? "n0" + n : "n" + n).style.background = 'linear-gradient(rgba(220, 50, 50, 0.6) 40%,  rgba(50, 50, 220, 0.6) 60%)';
        document.getElementById((n < 10) ? "n0" + n : "n" + n).style.borderColor = 'rgb(100,10,100)';
    }
};


/*
function Txt() {
    var found = false;
    gnd = "EM";
    l = OutFile.length;
    for (var i = 0; i < l; i++) {
        if (OutFile[i] == '\n' && OutFile[i + 3] == ' ' && !found) {
            gnd[0] = OutFile[i + 4];
            gnd[1] = OutFile[i + 5];
            found = true;
            alert("found" + gnd + OutFile[i + 4] + OutFile[i + 5]);
        }
        if (OutFile[i] == '\n' && OutFile[i + 4] == ' ' && !found) {
            gnd[0] = OutFile[i + 5];
            gnd[1] = OutFile[i + 6];
            found = true;
            alert("found" + gnd);
        }
        if (found && OutFile[i] == gnd[0] && OutFile[i + 1] == gnd[1])
        {
            OutFile[i] = '0';
            OutFile[i + 1] = ' ';
            alert("edited");
        }

    }
    alert(OutFile);
};*/

/*if (x < 10) {
    selectnodes("n" + x, id);
}
else if (x <= 96) {
    selectnodes("n" + x, id);
}
function selectnodes(id,elid)
{
    document.getElementById(id).innerHTML +=  document.getElementById(elid).innerHTML;
}*/



