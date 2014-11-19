//
// Support the sorting of tables by clicking on their column headers.
//
// 
// This script began as the work of Stuart Langridge and was stolen from:
//    http://www.kryogenix.org/code/browser/sorttable/
//
add_event(window, "load", sortabletables_init);

var SORT_COLUMN_INDEX;
var ROW_CLASS1 = "sortabledata1";
var ROW_CLASS2 = "sortabledata2";
var UP_ARROW = "<img src='/images/uparrow.png' border='0' />";
var DOWN_ARROW = "<img src='/images/downarrow.png' border='0' />";

//
// Discover all tables of class 'sortable' and make them, uh, sortable.
//
function sortabletables_init() {
    if (! document.getElementsByTagName) return;
    tbls = document.getElementsByTagName("table");
    for (ti=0;ti<tbls.length;ti++) {
        thisTbl = tbls[ti];
        if (((' ' + thisTbl.className + ' ').indexOf("sortable") != -1) && (thisTbl.id)) {
            make_sortabletable(thisTbl);
        }
    }
}

//
// Make sure this table is sortable.  Whoever built the table may have included
// onclick handler to make the entire <th> clickable for each column.  If not,
// we'll go through and turn the text of each header into an anchor so that the
// table is still sortable, although one that looks a bit uglier.
//
function make_sortabletable(table) {
    
    if (table.rows && table.rows.length > 0) {
        var firstRow = table.rows[0];
    }
    if (!firstRow) return;
    
    // We have a first row: assume it's the header, and make its contents clickable links
    // if the header does not already have an onclick handler. 
    for (var i=0;i<firstRow.cells.length;i++) {
	if (! firstRow.cells[i].onclick && (firstRow.cells[i].className != 'notsortable')) {

            var cell = firstRow.cells[i]; 
            var txt = ts_getInnerText(cell);
            cell.innerHTML = '<a href="#" class="sortheader" onclick="do_sort_table(this);return false;">'+txt+'<span class="sortarrow">&nbsp;&nbsp;&nbsp;</span></a>';
	} 
    }
}


function ts_getInnerText(el) {
    if (typeof el == "string") return el;
    if (typeof el == "undefined") { return el };
    if (el.innerText) return el.innerText;	//Not needed but it is faster

    var str = "";    
    var cs = el.childNodes;
    var l = cs.length;
    for (var i = 0; i < l; i++) {
	switch (cs[i].nodeType) {
	    case 1: //ELEMENT_NODE
		str += ts_getInnerText(cs[i]);
		break;
	    case 3:	//TEXT_NODE
		str += cs[i].nodeValue;
		break;
	}
    }
    return str;
}

//
// Sort the table.  Called when a column header is clicked.
//
function do_sort_table(lnk) {
    // get the span
    var span;
    for (var ci=0;ci<lnk.childNodes.length;ci++) {
        if (lnk.childNodes[ci].tagName && lnk.childNodes[ci].tagName.toLowerCase() == 'span') span = lnk.childNodes[ci];
    }
    if (span) {
        var spantext = ts_getInnerText(span);
        var td = lnk.parentNode;
    } else {
	spantext = ts_getInnerText(lnk);
	td = lnk;
    }
    var column = td.cellIndex;
    var table = getParent(td,'TABLE');
    
    if (table.rows.length <= 1) return;  //Nothing to do
    
    // Work out a type for the column and choose the sort function.  If
    // one has been provided as an attribute in the column header, use
    // it.  Otherwise, look at the first data column and guess at the
    // datatype, using that guess to choose an appropriate function.
    
    if (td.getAttribute('jssortfn')) {
	sortfn = eval(td.getAttribute('jssortfn'));
    } else {
	var itm = ts_getInnerText(table.rows[1].cells[column]);
	itm = itm.replace(/\s/g, '');
	sortfn = cmp_str;  // Default sort
	if (itm.match(/^\d\d[\/-]\d\d[\/-]\d\d\d\d$/)) sortfn = cmp_date;
	if (itm.match(/^\d\d[\/-]\d\d[\/-]\d\d$/)) sortfn = cmp_date;
	if (itm.match(/^[£$]/)) sortfn = cmp_currency; 
	if (itm.match(/^[\d\.]+$/)) sortfn = cmp_number;
	if (itm.match(/Au|Sp|Su|Wi \d{2,4}/)) sortfn = cmp_quarters;
    }
    
    
    SORT_COLUMN_INDEX = column;
    var firstRow = new Array();
    var newRows = new Array();
    for (i=0;i<table.rows[0].length;i++) { firstRow[i] = table.rows[0][i]; }
    for (j=1;j<table.rows.length;j++) { newRows[j-1] = table.rows[j]; }

    newRows.sort(sortfn);

    if (span) {
	if (span.getAttribute("sortdir") == 'down') {
	    ARROW = '&nbsp;' + DOWN_ARROW;
	    newRows.reverse();
	    span.setAttribute('sortdir','up');
	} else {
	    ARROW = '&nbsp;' + UP_ARROW;
	    span.setAttribute('sortdir','down');
	}
    } else {
	//alert('Sort is 	' + lnk.getAttribute("sortdir"));
	if (lnk.getAttribute("sortdir") == 'up') {
	    ARROW = '&nbsp;' + DOWN_ARROW;
	    newRows.reverse();
	    lnk.setAttribute('sortdir','down');
	} else {
	    ARROW ='&nbsp;' + UP_ARROW;
	    lnk.setAttribute('sortdir','up');
	}
	
	// Set the cookie to save the current sort state
	var cookie_name = table.id + '_sort';
	var cookie_val = table.rows[0].cells[SORT_COLUMN_INDEX].innerHTML.replace(/&nbsp;<img [^>]*>/ig,'') +  '/' + lnk.getAttribute("sortdir")
	document.cookie = cookie_name + '=' + cookie_val + ';domain=cs.washington.edu;path=/';
	//alert(cookie_name + '=' + cookie_val);
	
    }
    // We appendChild rows that already exist to the tbody, so it moves them rather than creating new ones
    // don't do sortbottom rows
    for (i=0;i<newRows.length;i++) {
	if (! newRows[i].className || (newRows[i].className && (newRows[i].className.indexOf('sortbottom') == -1))) {
	    // Alternate row background colors
	    if ((newRows[i].className == ROW_CLASS1) || (newRows[i].className == ROW_CLASS2)) {
		if ((i % 2) == 0)
		    newRows[i].setAttribute('class',ROW_CLASS1);
		else
		    newRows[i].setAttribute('class',ROW_CLASS2);
	    }
	    
	    table.tBodies[0].appendChild(newRows[i]);
	    
	}
    }

    // do sortbottom rows only
    for (i=0;i<newRows.length;i++) {
	if (newRows[i].className && (newRows[i].className.indexOf('sortbottom') != -1))
	table.tBodies[0].appendChild(newRows[i]);
    }
    
    // Delete any other arrows there may be showing
    if (span) {
	var allspans = document.getElementsByTagName("span");
	for (ci=0; ci<allspans.length; ci++) {
	    if (allspans[ci].className == 'sortarrow') {
		if (getParent(allspans[ci],"table") == getParent(lnk,"table")) { // in the same table as us?
		    allspans[ci].innerHTML = '&nbsp;&nbsp;&nbsp;';
		}
	    }
	}
    } else {
	var allth = document.getElementsByTagName("th");
	for (ci=0; ci < allth.length; ci++) {
	    if (getParent(allth[ci],"table") == getParent(lnk,"table")) { // in the same table as us?
		// This has to be case-insensitive because of effing IE...
		allth[ci].innerHTML = allth[ci].innerHTML.replace(/&nbsp;<img [^>]*>/ig,'');
	    }
	}
    }
    
    if (span) { 
        span.innerHTML = ARROW;
    } else {
	lnk.innerHTML = lnk.innerHTML + ARROW;
    }
}

function getParent(el, pTagName) {
	if (el == null) return null;
	else if (el.nodeType == 1 && (el.tagName.toLowerCase() == pTagName.toLowerCase()))	// Gecko bug, supposed to be uppercase
		return el;
	else
		return getParent(el.parentNode, pTagName);
}

function cmp_date(a,b) {
    // y2k notes: two digit years less than 50 are treated as 20XX, greater than 50 are treated as 19XX
    aa = ts_getInnerText(a.cells[SORT_COLUMN_INDEX]);
    bb = ts_getInnerText(b.cells[SORT_COLUMN_INDEX]);
    if (aa.length == 10) {
        dt1 = aa.substr(6,4)+aa.substr(3,2)+aa.substr(0,2);
    } else {
        yr = aa.substr(6,2);
        if (parseInt(yr) < 50) { yr = '20'+yr; } else { yr = '19'+yr; }
        dt1 = yr+aa.substr(3,2)+aa.substr(0,2);
    }
    if (bb.length == 10) {
        dt2 = bb.substr(6,4)+bb.substr(3,2)+bb.substr(0,2);
    } else {
        yr = bb.substr(6,2);
        if (parseInt(yr) < 50) { yr = '20'+yr; } else { yr = '19'+yr; }
        dt2 = yr+bb.substr(3,2)+bb.substr(0,2);
    }
    if (dt1 == dt2) return 0;
    if (dt1 < dt2) return -1;
    return 1;
}

function cmp_currency(a,b) { 
    aa = ts_getInnerText(a.cells[SORT_COLUMN_INDEX]).replace(/[^0-9.]/g,'');
    bb = ts_getInnerText(b.cells[SORT_COLUMN_INDEX]).replace(/[^0-9.]/g,'');
    if (aa == '') aa = 0;
    if (bb == '') bb = 0;
    //alert(aa + " comp to " + bb);
    return parseFloat(bb) - parseFloat(aa);
}

function cmp_number(a,b) {
    aa = parseFloat(ts_getInnerText(a.cells[SORT_COLUMN_INDEX]));
    if (isNaN(aa)) aa = 0;
    bb = parseFloat(ts_getInnerText(b.cells[SORT_COLUMN_INDEX])); 
    if (isNaN(bb)) bb = 0;
    return aa-bb;
}

function cmp_stri(a,b) {
    aa = ts_getInnerText(a.cells[SORT_COLUMN_INDEX]).toLowerCase();
    bb = ts_getInnerText(b.cells[SORT_COLUMN_INDEX]).toLowerCase();
    if (aa==bb) return 0;
    if (aa<bb) return -1;
    return 1;
}

function cmp_str(a,b) {
    aa = ts_getInnerText(a.cells[SORT_COLUMN_INDEX]);
    bb = ts_getInnerText(b.cells[SORT_COLUMN_INDEX]);
    if (aa==bb) return 0;
    if (aa<bb) return -1;
    return 1;
}

function cmp_quarters(a,b) {
    // Define the order of academic quarters
    
    // Handles the case where we have rows that extend across
    // the table, i.e. a or b.cells[SORT_COLUMN_INDEX] does not
    // exist.
     if ((a.className == 'sortbottom') || (b.className == 'sortbottom')) return 0;
     
    var quarters = new Object;
    quarters["Wi"] = 1;
    quarters["Sp"] = 2;
    quarters["Su"] = 3;
    quarters["Au"] = 4;
    
    aa = ts_getInnerText(a.cells[SORT_COLUMN_INDEX]);
    bb = ts_getInnerText(b.cells[SORT_COLUMN_INDEX]);
    
   
    // Extract the quarter and years.  
    var result = aa.match(/(Au|Sp|Su|Wi) (\d{2,4})/);
    var a_qtr = quarters[result[1]];
    var a_yr = parseInt(result[2]);
    // Fix 2 digit years.  I'll be dead by the time this becomes a problem.
    if ((a_yr >= 0) && (a_yr <= 60)) a_yr += 2000;
    if ((a_yr >  60) && (a_yr <= 99)) a_yr += 1900;
    
    result = bb.match(/(Au|Sp|Su|Wi) (\d{2,4})/);
    var b_qtr = quarters[result[1]];
    var b_yr = parseInt(result[2]);
    if ((b_yr >= 0) && (b_yr <= 60)) b_yr += 2000;
    if ((b_yr >  60) && (b_yr <= 99)) b_yr += 1900;
 
    // This is easy if the years are not equal   
    if (a_yr < b_yr) return -1;
    if (a_yr > b_yr) return 1;
    
    // We have to look at the quarters
    if (a_qtr < b_qtr)
      return -1;
    else if (a_qtr > b_qtr)
      return 1;
    else
      return 0;
    
}

function add_event(elm, evType, fn, useCapture)
// addEvent and removeEvent
// cross-browser event handling for IE5+,  NS6 and Mozilla
// By Scott Andrew
{
  if (elm.addEventListener){
    elm.addEventListener(evType, fn, useCapture);
    return true;
  } else if (elm.attachEvent){
    var r = elm.attachEvent("on"+evType, fn);
    return r;
  } else {
    alert("Handler could not be added for " + evType);
  }
} 
