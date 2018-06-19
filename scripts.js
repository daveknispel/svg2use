function resetResults() {
  $('#convertedSVGcode textarea, #convertedCSScode textarea, #convertedHTMLcode textarea').val('');
  $('#hidden, #iconHolder').html('');
}

function resetAll() {
  $('textarea').val('');
  $('#hidden, #iconHolder').html('');
}

$(document).ready(function(){
resetAll();

});

$('#submitSVG').click(function(e) {  

  resetResults();

  //PLACE SVG INTO HIDDEN DIV
  var SVGinitial = $('#initialSVGcode textarea').val();
  $('#hidden').html(SVGinitial);  
  
  //GET CSS CODE & ADD TO TEXTAREA
  var CSS = $('#hidden [type="text/css"]')[0].innerHTML;
  //replace fill with color
  CSS = CSS.replace(/fill/g, 'color').replace(/\t/g, '');
  //build standard svg css color styling & current class color styling
  $('#convertedCSScode textarea').val('symbol *{fill: currentColor;}' + CSS);
  
  //GENERATE NEW SVG CODE & ADD TO TEXTAREA
  var viewBox = $('#hidden svg').attr('viewBox');
  var SVG = '<svg xmlns="http://www.w3.org/2000/svg" style="display: none;">';
  //symbol loop generater
  $("#hidden svg > g").each(function(){
  var id = $(this).attr('id');
  var innerSVG = $(this).html();
  var symbol = '\n<symbol id="' + id + '" viewBox="' + viewBox + '"><title>' + id + '</title>' + innerSVG + '</symbol>'; 
  SVG = SVG + symbol;
  });
  var SVG = SVG + '\n</svg>';
  $('#convertedSVGcode textarea').val(SVG);

  //GENERATE HTML ELEMENTS
  var HTMLlist = '';
  $("#hidden svg > g").each(function(){
  var id = $(this).attr('id');
  var HTML = '<svg title="' + id + '" viewBox="' + viewBox + '" role="img"><use xlink:href="#' + id + '"></use></svg>\n\n'; 
  HTMLlist = HTMLlist + HTML;
  });
  //var HTMLlist = HTMLlist + '\n</body>';
  $('#convertedHTMLcode textarea').val(HTMLlist);  

  $('#iconHolder').html(SVG + HTMLlist + '<style>' + CSS + '</style>');

  $('html, body').animate({
            scrollTop: $("#converted").offset().top
   }, 500);
  
});

//COPY SVG CODE TO CLIPBOARD
function copySVGcodeFunction() {
  /* Get the text field */
  var copyText = document.getElementById("SVGcontent");
  /* Select the text field */
  copyText.select();
  /* Copy the text inside the text field */
  document.execCommand("copy");
  /* Alert the copied text */
  //alert("Copied the text: " + copyText.value);
} 

//COPY HTML CODE TO CLIPBOARD
function copyHTMLcodeFunction() {
  /* Get the text field */
  var htmlText = document.getElementById("HTMLcontent");
  /* Select the text field */
  htmlText.select();
  /* Copy the text inside the text field */
  document.execCommand("copy");
  /* Alert the copied text */
  //alert("Copied the text: " + copyText.value);
} 

//COPY CSS CODE TO CLIPBOARD
function copyCSScodeFunction() {
  /* Get the text field */
  var cssText = document.getElementById("CSScontent");
  /* Select the text field */
  cssText.select();
  /* Copy the text inside the text field */
  document.execCommand("copy");
  /* Alert the copied text */
  //alert("Copied the css: " + cssText.value);
} 

//INSERT SAMPLE CODE BUTTON 
function insertSamplecodeFunction() {
  var sample = $('#sampleCode').html();
  $('#initialSVGcode textarea').val(sample);
}








