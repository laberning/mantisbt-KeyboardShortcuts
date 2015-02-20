/*
* Copyright (c) 2012 - 2015 Lars Berning <lars.berning@teambits.de> 
* Released under the MIT license
*/

/*
* Map of all keyboard shortcuts that we want to listen to - modify this map to your needs
*/
var SHORTCUTS = {
	// all shortcuts starting with 'g' (goto)
	'g': {
		// this is the key combination g -> m
		'm': function() { location.href="/mantis/my_view_page.php"; },
		'v': function() { location.href="/mantis/view_all_bug_page.php"; },
		'n': function() { location.href="/mantis/bug_report_page.php" },
		'c': function() { location.href="/mantis/changelog_page.php"; },
		'r': function() { location.href="/mantis/roadmap_page.php"; },
		's': function() { location.href="/mantis/summary_page.php"; },
		'p': function() { location.href="/mantis/plugin.php?page=teambitsResourcePlanning/planning" },
		't': function() { location.href="/mantis/plugin.php?page=MantisTimeSheet/week_view_page" },
		'b': function() { document.getElementsByName("bug_id")[0].focus(); },
		'i': function() { document.getElementsByName("bug_id")[0].focus(); }
	},
	// all shortcuts starting with 's' (switch to project)
	's': {
		// enter the id's of your projects here
		// you will find these on the Manage -> Manage Projects page in the URL of your projects
		'b': function() { switchToProject("43") },
		'd': function() { switchToProject("41") },
		'f': function() { switchToProject("44") },
		'i': function() { switchToProject("51") },
		'o': function() { switchToProject("54") },
		'p': function() { switchToProject("50") },
		't': function() { switchToProject("56") },
		'r': function() { switchToProject("48") },
		'm': function() { switchToProject("39") },
		'a': function() { switchToProject("0") }
	},

	// edit a bug
	'e': function() { location.href="/mantis/bug_update_page.php?bug_id=" + getBugId(); },
	// move a bug
	'm': function() { location.href="/mantis/bug_actiongroup_page.php?action=MOVE&bug_arr[]=" + getBugId(); },
	// create new bug
	'c': function() { location.href="/mantis/bug_report_page.php" },
	// set focus to issue id field
	'i': function() { document.getElementsByName("bug_id")[0].focus(); },
	// add bug note
	'n': function() { document.getElementsByName("bugnote_text")[0].focus(); },
	// put cursor into issue field if a number is typed
	'1': function() { searchById("1"); },
	'2': function() { searchById("2"); },
	'3': function() { searchById("3"); },
	'4': function() { searchById("4"); },
	'5': function() { searchById("5"); },
	'6': function() { searchById("6"); },
	'7': function() { searchById("7"); },
	'8': function() { searchById("8"); },
	'9': function() { searchById("9"); },
	'0': function() { searchById("0"); },
	'h': function() { shortcutListener.toggleHints(); },
	// set issue relationships
	'r': {
		'r': function () { addRelationship('1'); }, // related
		'p': function () { addRelationship('2'); }, // parent of
		'c': function () { addRelationship('3'); } // child of
	}
}

var switchToProject = function(projectId) {
	var popup = document.getElementsByName("project_id")[0];
	for( var i=0; i < popup.options.length; i++){
	popup.options[i].selected=(popup.options[i].value==projectId);
	}
	document.forms.form_set_project.submit();
}

var getBugId = function () {
    // the first element with name "bug_id" is the search box that contains the value "Issue #"
    // so we take the second item ... might not be extremely robust to changes in mantis
    return document.getElementsByName("bug_id")[1].value;
}

var searchById = function(firstKey) {
    document.getElementsByName("bug_id")[0].focus();
    document.getElementsByName("bug_id")[0].value = firstKey;
}

var addRelationship = function(relationshipId) {
    var popup = document.getElementsByName("rel_type")[0];
    for( var i=0; i < popup.options.length; i++){
        popup.options[i].selected=(popup.options[i].value==relationshipId);
    }
    document.getElementsByName("dest_bug_id")[0].focus();
}

window.onload=function(){shortcutListener.init();}

var shortcutListener = {

    listen: true,

    shortcut: null,
    combination: '',
    lastKeypress: 0,
    clearTimeout: 3000,

    // Keys we don't listen to 
    keys: {
        KEY_BACKSPACE: 8,
        KEY_TAB:       9,
        KEY_ENTER:    13,
        KEY_SHIFT:    16,
        KEY_CTRL:     17,
        KEY_ALT:      18,
        KEY_ESC:      27,
        KEY_SPACE:    32,
        KEY_LEFT:     37,
        KEY_UP:       38,
        KEY_RIGHT:    39,
        KEY_DOWN:     40,
        KEY_DELETE:   46,
        KEY_HOME:     36,
        KEY_END:      35,
        KEY_PAGEUP:   33,
        KEY_PAGEDOWN: 34
    },

    init: function() {
        if (!window.SHORTCUTS) return false;
        this.createStatusArea();
		this.initHints();
        this.setObserver();
    },

    isInputTarget: function(e) {
        var target = e.target || e.srcElement;
        if (target && target.nodeName) {
            var targetNodeName = target.nodeName.toLowerCase();
            if (targetNodeName == "textarea" || targetNodeName == "select" ||
                (targetNodeName == "input" && target.type &&
                    (target.type.toLowerCase() == "text" ||
                         target.type.toLowerCase() == "password"))
                             )  {
                return true;
            }
        }
        return false;
    },

    stopEvent: function(event) {
        if (event.preventDefault) {
            event.preventDefault();
            event.stopPropagation();
        } else {
            event.returnValue = false;
            event.cancelBubble = true;
        }
    },

	toggleHints: function() {
		if (document.getElementById('hint_area').style.display == ''){
			this.hideHints();
		}
		else {
			this.showHints();
		}
	},

	showHints: function() {
		document.getElementById('hint_area').style.display = '';
	},

	hideHints: function() {
		document.getElementById('hint_area').style.display = 'none';
	},

	// modify this hint message to your needs...
	initHints: function() {
		var hintArea = document.createElement('div');
	    hintArea.setAttribute('id', 'hint_area');
	    hintArea.style.display = 'none';
		hintArea.innerHTML = "<table><tr><td><b>Shortcut</b><td><td><b>Function</b></td></tr>\
		<tr><td>g + m<td><td>Go to My View</td></tr>\
		<tr><td>g + v<td><td>Go to View Issues</td></tr>\
		<tr><td>g + c<td><td>Go to Change Log</td></tr>\
		<tr><td>g + r<td><td>Go to Roadmap</td></tr>\
		<tr><td>g + s<td><td>Go to Summary</td></tr>\
		<tr><td>g + p<td><td>Go to Planning</td></tr>\
		<tr><td>g + t<td><td>Go to Time Sheet</td></tr>\
		<tr><td>s + b<td><td>Switch to Projekt 'Backlog'</td></tr>\
		<tr><td>s + d<td><td>Switch to Projekt 'Dev'</td></tr>\
		<tr><td>r + r<td><td>Add relationship 'related to'</td></tr>\
		<tr><td>r + p<td><td>Add relationship 'parent of'</td></tr>\
		<tr><td>r + c<td><td>Add relationship 'child of'</td></tr>\
		<tr><td>...<td><td></td></tr>\
		<tr><td>c<td><td>Create new Bug</td></tr>\
		<tr><td>e<td><td>Edit Bug</td></tr>\
		<tr><td>m<td><td>Move Bug</td></tr>\
		<tr><td>Any Number<td><td>Go To Bug with Number</td></tr>\
		<tr><td>n<td><td>Jump to Note-Field</td></tr>\
		<tr><td>h<td><td>Show Help</td></tr>\
		<tr><td>Esc<td><td>Return Focus from Textfields</td></tr>\
		</table>";
	    document.body.appendChild(hintArea);
	},

    // shortcut notification/status area
    createStatusArea: function() {
        var area = document.createElement('div');
        area.setAttribute('id', 'shortcut_status');
        area.style.display = 'none';
        document.body.appendChild(area);
    },

    showStatus: function() {
        document.getElementById('shortcut_status').style.display = '';
    },

    hideStatus: function() {
        document.getElementById('shortcut_status').style.display = 'none';
    },

    showCombination: function() {
        var bar = document.getElementById('shortcut_status');
        bar.innerHTML = this.combination;
        this.showStatus();
    },

    // This method creates event observer for the whole document
    // This is the common way of setting event observer that works 
    // in all modern brwosers with "keypress" fix for
    // Konqueror/Safari/KHTML borrowed from Prototype.js
    setObserver: function() {
        var name = 'keypress';
        if (navigator.appVersion.match(/Konqueror|Safari|KHTML/) || document.detachEvent) {
          name = 'keydown';
        }
        if (document.addEventListener) {
            document.addEventListener(name, function(e) {shortcutListener.keyCollector(e)}, false);
        } else if (document.attachEvent) {
            document.attachEvent('on'+name, function(e) {shortcutListener.keyCollector(e)});
        }
    },

    // Key press collector. Collects all keypresses into combination 
    // and checks it we have action for it
    keyCollector: function(e) {
        // do not listen if no shortcuts defined
        if (!window.SHORTCUTS) return false;
        // do not listen if listener was explicitly turned off
        if (!shortcutListener.listen) return false;
        // leave modifiers for browser
        if (e.altKey || e.ctrlKey || e.metaKey) return false;
        var keyCode = e.keyCode;
        // do not listen for Ctrl, Alt, Tab, Space, Esc and others
        for (var key in this.keys) {
			//LAB: Fix to allow escaping focus with ESC-Key
			if(27 == e.keyCode){
				document.getElementsByName("bug_id")[0].focus();
				document.getElementsByName("bug_id")[0].blur();
				shortcutListener.clearCombination();
				shortcutListener.hideHints();
			}
            if (e.keyCode == this.keys[key]) return false;
        }
        // do not listen for functional keys
        if (navigator.userAgent.match(/Gecko/)) {
            if (e.keyCode >= 112 && e.keyCode <=123) return false;
        }
        // do not listen in input/select/textarea fields
        if (this.isInputTarget(e)) return false;
        // get letter pressed for different browsers
        var code = e.which ? e.which : e.keyCode;
		//LAB: Fix to make numeric keypad work as expected on modern browsers
		if (navigator.appVersion.match(/Konqueror|Safari|KHTML/) || document.detachEvent) {
			if (code >= 96 && code <= 105) {code = code - 48};
		}
        var letter = String.fromCharCode(code).toLowerCase();
        if (e.shiftKey) letter = letter.toUpperCase();
        if (shortcutListener.process(letter)) shortcutListener.stopEvent(e);
    },

    // process keys
    process: function(letter) {
        if (!window.SHORTCUTS) return false;
        if (!shortcutListener.listen) return false;
        // if no combination then start from the begining
        if (!shortcutListener.shortcut) { shortcutListener.shortcut = SHORTCUTS; }
        // if unknown letter then say goodbye
        if (!shortcutListener.shortcut[letter]) return false
        if (typeof(shortcutListener.shortcut[letter]) == "function") {
            shortcutListener.shortcut[letter]();
            shortcutListener.clearCombination();
        } else {
            shortcutListener.shortcut = shortcutListener.shortcut[letter];
            // append combination
            shortcutListener.combination = shortcutListener.combination + letter;
            if (shortcutListener.combination.length > 0) {
                shortcutListener.showCombination();
                // save last keypress timestamp (for autoclear)
                var d = new Date;
                shortcutListener.lastKeypress = d.getTime();
                // autoclear combination in X seconds
                setTimeout("shortcutListener.clearCombinationOnTimeout()", shortcutListener.clearTimeout);
            };
        }
        return true;
    },

    // clear combination
    clearCombination: function() {
        shortcutListener.shortcut = null;
        shortcutListener.combination = '';
        this.hideStatus();
    },

    clearCombinationOnTimeout: function() {
        var d = new Date;
        // check if last keypress was earlier than (now - clearTimeout)
        // 100ms here is used just to be sure that this will work in superfast browsers :)
        if ((d.getTime() - shortcutListener.lastKeypress) >= (shortcutListener.clearTimeout - 100)) {
            shortcutListener.clearCombination();
        }
    }
}
