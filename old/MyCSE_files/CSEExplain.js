//
// Support the CSE standard explain/hide mechanism.
//
// Functions:
//   CSEExplainShow(id)
//   CSEExplainHide(id)
//
// It is assumed that there is a constellation of 5 elements on the page
// that are named using the convention that there is a prefix for each of
// the them and that their names can be calculated by appending the parameter
// id to these prefixes.  The elements are:
//
// pl<id>  An icon of a plus sign.
// ex<id>  A span containing a short hot-word conveying the same meaning as
//         the plus sign. Typically, 'Explain'.
//
// These two elements together constitute a control tIat toggles on the
// visibility of the help text along with the following two controls that
// permit the help text to be re-hidden.
//
// mi<id> An icon of a minus sign
// hi<id> A span containing a short hot-word conveying the same meaning as the
//        minus sign.  Typically, 'Hide'.
// ht<id> A span or div containing the help text that is to be shown or hidden.
//
// Example for an id of 666, where this file is included into the page's javascript:
//
//    <img src='/images/ominus.png' height='11' width='11' title='Hide' id='mi666'
//		  style='display:none'
//	    onClick=\"if (CSEExplainHide) CSEExplainHide(666);\" alt=\"-\" />
//    <img src=\"/images/plus.png\" height=\"11\" width=\"11\" title=\"Show\" id=\"pl666\"
//			style=\"display:inline\"
//			onClick=\"if (CSEExplainShow) CSEExplainShow(666);\" alt=\"+\" />
//	  <span id=\"hi666\" style=\"display:none\"
//          onClick=\"if (CSEExplainHide) CSEExplainHide(666);\">Hide</span>
//	  <span id=\"ex666\" 
//	        onClick=\"if (CSEExplainShow) CSEExplainShow(666);\">Show</span>
//	  <div id=\"ht666\" style=\"display:none\">
//        This is the help text that you want the user to be able to hide
//        or show by clicking.
//		</div>\n";


function CSEExplainShow(id) {
  var tid;

  if (ctl = document.getElementById('pl' + id)) ctl.style.display='none';
  if (ctl = document.getElementById('ex' + id)) ctl.style.display='none';
  if (ctl = document.getElementById('mi' + id)) ctl.style.display='inline';
  if (ctl = document.getElementById('hi' + id)) ctl.style.display= 'inline';
  if (ctl = document.getElementById('ht' + id)) ctl.style.display='block';
}


function CSEExplainHide(id) {
  if (ctl = document.getElementById('pl' + id)) ctl.style.display='inline';
  if (ctl = document.getElementById('ex' + id)) ctl.style.display='inline';
  if (ctl = document.getElementById('mi' + id)) ctl.style.display='none';
  if (ctl = document.getElementById('hi' + id)) ctl.style.display= 'none';
  if (ctl = document.getElementById('ht' + id)) ctl.style.display='none';

}