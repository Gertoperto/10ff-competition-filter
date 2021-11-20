// ==UserScript==
// @name         10FF Competition Filter
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Highlights competitions with a specific language
// @author       Gertoperto
// @match        https://10fastfingers.com/competitions
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        none
// ==/UserScript==


const flags = {ALBANIAN:30,ARABIC:27,ARMENIAN:41,AZERBAJANI:43,BENGALI:56,BULGARIAN:28,CATALAN:23,CHINESE_SIMPLIFIED:16,CHINESE_TRADITIONAL:15,CROATIAN:25,CZECH:33,DANISH:17,DUTCH:18,ENGLISH:1,ESPERANTO:52,ESTONIAN:34,FILIPINO:24,FINNISH:21,FRENCH:3,GALACIAN:38,GEORGIAN:40,GERMAN:2,GREEK:32,HEBREW:36,HINDI:44,HUNGARIAN:14,ICELANDIC:48,INDONESIAN:6,ITALIAN:20,JAPANESE:29,KOREAN:31,KURDISH:42,LATVIAN:35,LITHUANIAN:39,MACEDONIAN:54,MALAGASY:55,MALAYSIAN:11,NORWEGIAN:12,PASHTO:51,PERSIAN:13,POLISH:9,PORTUGESE:4,ROMANIAN:10,RUSSIAN:26,SERBIAN:22,SLOVAK:45,SLOVENIAN:46,SPANISH:5,SWEDISH:19,THAI:50,TURKISH:7,UKRANIAN:53,URDU:37,VIETNAMESE:8}

// modify this array to pick the flags you want to view
const selected_languages = [
//  flags.MYLANGUAGE, (note the commas as separators)
    flags.DUTCH,
//  flags.ENGLISH,
];

const selector_reducer = (str, id2) => str + ",span#flagid" + id2.toString();

const selector_string = selected_languages.reduce(selector_reducer, "").slice(1);

const noComps = "No contests in your selected languages";



(function() {
    'use strict';

    var myRows = [];

    document.querySelectorAll(selector_string).forEach(el => {
        var row = el.closest("tr");
        if(row) {
            myRows.push(row.cloneNode(true));
            row.style.border = "2px ridge aquamarine";
        };
    });

    var comps = document.getElementById("join-competition-table");
    var compsLang = comps.cloneNode(true);
    var langbody = compsLang.getElementsByTagName("tbody")[0];
    langbody.innerHTML = '';

    // insert message that no competitions in current language are live
    if (myRows.length === 0) {
        let tr = document.createElement("tr");
        let td = document.createElement("td");
        td.setAttribute("colspan", "6");
        let tn = document.createTextNode(noComps);
        td.appendChild(tn)
        tr.appendChild(td);
        myRows.push(tr);
    }

    myRows.forEach(row => langbody.appendChild(row));
    comps.closest("div.table-responsive").insertBefore(compsLang, comps);

    function fixTHead(table, namestr) {
        var header = table.getElementsByTagName("thead")[0].getElementsByTagName("tr")[0].getElementsByTagName("th");
        header[0].innerHTML = namestr;
        header[0].setAttribute("colspan", "3");
        header[1].remove();
        header[1].remove();
    }

    fixTHead(compsLang, "Your languages");
    fixTHead(comps, "All languages");
})();
