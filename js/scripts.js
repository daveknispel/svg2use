function resetResults() {
  $('#convertedSVGcode textarea, #convertedCSScode textarea, #convertedHTMLcode textarea').val('');
  $('#hidden, #iconHolder').html('');
}

function resetAll() {
  $('textarea').val('');
  $('#hidden, #iconHolder').html('');
  //activate buttons
  $('#submitSVG').prop('disabled' , true);
  $('#convertedSVGcode button, #convertedCSScode button, #convertedHTMLcode button').prop('disabled' , true);
}

$(document).ready(function(){
resetAll();

});

//ACTIVATE BUTTON LOOP
$('#rawSVG').keyup(function() {
      if ( $(this).val().indexOf("svg") > -1 ) {
          $('#submitSVG').prop('disabled' , false);
     } else {
         $('#submitSVG').prop('disabled' , true);
  }
});

$('#submitSVG').click(function(e) {  

  resetResults();

  //PLACE SVG INTO HIDDEN DIV
  var SVGinitial = $('#initialSVGcode textarea').val();
  $('#hidden').html(SVGinitial);  
  
  //GET CSS CODE & ADD TO TEXTAREA
  if ($('#hidden [type="text/css"]').length) {
    var CSS = $('#hidden [type="text/css"]')[0].innerHTML;
    //replace fill with color
    CSS = CSS.replace(/fill/g, 'color').replace(/\t/g, '');
    CSS = '/* SVG ICON STYLING */\nsymbol *, .icon, .icon use{fill: currentColor;}\n\n/* delete class styling below you want to be effcted by hover effects*/' + CSS + '\n/* HOVER EFFECTS */\n.icon{color:#666;} \n.iconWrap:hover .icon{color:#111;}\n\n/* ICON SIZING */\n.iconWrap{\nfont-size:2em;/* control icon size */\nverticle-align: -0.15em;\noverflow: hidden;\n}\n\n.iconWrap .icon{\nheight: 1em;\nwidth: 1em;\n}\n\n/* ACCESSABILITY TAG */\n.iconWrap .access-label{\nposition: absolute;\nwidth: 1px;\nheight: 1px;\noverflow: hidden;\nwhite-space: nowrap;\n}';
    //build standard svg css color styling & current class color styling
    $('#convertedCSScode textarea').val(CSS);
  } else {
    var CSS = '/* SVG ICON STYLING */\nsymbol *, .icon, .icon use{fill: currentColor;} \n\n/* HOVER EFFECTS */ .icon{color:#666;} \n.iconWrap:hover .icon{color:#111;}\n\n/* ICON SIZING */\n.iconWrap{\nfont-size:2em;/* control icon size */\nverticle-align: -0.15em;\noverflow: hidden;\n}\n\n.iconWrap .icon{\nheight: 1em;\nwidth: 1em;\n}\n\n/* ACCESSABILITY TAG */\n.iconWrap .access-label{\nposition: absolute;\nwidth: 1px;\nheight: 1px;\noverflow: hidden;\nwhite-space: nowrap;\n}';
    $('#convertedCSScode textarea').val(CSS);
  }
  
  //GENERATE NEW SVG CODE & ADD TO TEXTAREA
  var viewBox = $('#hidden svg').attr('viewBox');
  var SVG = '<svg xmlns="http://www.w3.org/2000/svg" style="display: none;">';
  //symbol loop generater
  $("#hidden svg > g").each(function(){
  var id = $(this).attr('id');
  var innerSVG = $(this).html();
  var symbol = '\n<symbol id="' + id + '" viewBox="' + viewBox + '">' + innerSVG + '</symbol>'; 
  SVG = SVG + symbol;
  });
  var SVG = SVG + '\n</svg>';
  $('#convertedSVGcode textarea').val(SVG);

  //GENERATE HTML ELEMENTS
  var HTMLlist = '';
  $("#hidden svg > g").each(function(){
  var id = $(this).attr('id');
  var HTML = '<span class="iconWrap">\n<svg class="icon" aria-hidden="true" focusable="false" viewBox="' + viewBox + '" role="img">\n<use xlink:href="#' + id + '"></use>\n</svg>\n<span class="access-label">' + id + '</span>\n</span>\n\n'; 
  HTMLlist = HTMLlist + HTML;
  });
  //var HTMLlist = HTMLlist + '\n</body>';
  $('#convertedHTMLcode textarea').val(HTMLlist);  

  $('#iconHolder').html(SVG + HTMLlist + '<style>' + CSS + '</style>');

  $('#hidden').empty();

  //activate buttons
  $('#convertedSVGcode button, #convertedCSScode button, #convertedHTMLcode button').prop('disabled' , false);

  $('html, body').animate({
        scrollTop: $("#convertedSVGcode").offset().top - 70
    }, 1000);
  
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

var testing;
$.ajax('samplecode.xml', {
    dataType: 'text',
    success: function (data) {
        testing = data;
        $('#initialSVGcode textarea').val(testing);
    }
});

$('#submitSVG').prop('disabled' , false);

}








