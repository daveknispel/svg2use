function resetResults() {
  $('#convertedSVGcode textarea, #convertedCSScode textarea, #convertedHTMLcode textarea').val('');
  $('#hidden, #iconHolder').html('');
}

function resetAll() {
  $('textarea').val('');
  $('#hidden, #iconHolder').html('');
  $('#iconHolderSize').css('opacity' , '0');
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

//CONVERT SVG
function covertCode() {  

  resetResults();


  //PLACE SVG INTO HIDDEN DIV
  var SVGinitial = $('#initialSVGcode textarea').val();
  $('#hidden').html(SVGinitial);  
  
  //GET CSS CODE & ADD TO TEXTAREA


  //check for inline style
  if ($('#hidden [type="text/css"]').length) {
    var inlineCSS = $('#hidden [type="text/css"]')[0].innerHTML;
    //replace fill with color
    inlineCSS = inlineCSS.replace(/fill/g, 'color').replace(/\t/g, '');
    inlineCSS = '\n/* delete class styling below you want to be affected by hover effects*/' + inlineCSS
  } else {
    var inlineCSS = '\n';
  }

  //check for aria label
  if($('input[name="a_accessibility"]:checked').val() === "aria label") {
   var arialabel = '\n\n/* ACCESSABILITY TAG */\n.iconWrap .access-label{\nposition: absolute;\nwidth: 1px;\nheight: 1px;\noverflow: hidden;\nwhite-space: nowrap;\n}\n'; 
  } else {
     var arialabel = '\n'; 
  }

  //build css
  var CSS = '/* SVG ICON STYLING */\nsymbol *, .icon, .icon use{fill: currentColor;}\n' + inlineCSS + '\n/* SIZE & HOVER */\n.icon{\nfont-size:1em;/* control icon size */\nheight: 1em;\nwidth: 1em;\noverflow: hidden;\ncolor:#666;\n}\n\n.icon:hover{color:#111;} ' + arialabel;
    //build standard svg css color styling & current class color styling
    $('#convertedCSScode textarea').val(CSS);


  //GENERATE NEW SVG CODE & ADD TO TEXTAREA
  var viewBox = $('#hidden svg').attr('viewBox');
  var SVG = '<svg xmlns="http://www.w3.org/2000/svg" style="display: none;">';
  //symbol loop generater
  $("#hidden svg > g").each(function(){
  var id = $(this).attr('id');
  var innerSVG = $(this).html();
  //check for accessibility type
  if($('input[name="a_accessibility"]:checked').val() === "title") {
     var symbol = '\n<symbol id="' + id + '" viewBox="' + viewBox + '">\n<title>'+ id +'</title>' + innerSVG + '</symbol>'; 
  } else {
     var symbol = '\n<symbol id="' + id + '" viewBox="' + viewBox + '">' + innerSVG + '</symbol>'; 
  }
  SVG = SVG + symbol;
  });
  var SVG = SVG + '\n</svg>';
  $('#convertedSVGcode textarea').val(SVG);


  //GENERATE HTML ELEMENTS
  var HTMLlist = '';
  $("#hidden svg > g").each(function(){
  var id = $(this).attr('id');
  //check for accessibility type
  if($('input[name="a_accessibility"]:checked').val() === "Off") {
       var HTML = '<svg class="icon" aria-hidden="true" focusable="false" viewBox="' + viewBox + '" role="presentation">\n<use xlink:href="#' + id + '"></use>\n</svg>\n\n'
  } else if($('input[name="a_accessibility"]:checked').val() === "title") {
       var HTML = '<svg class="icon" title="' + id + '" viewBox="' + viewBox + '" role="img">\n<use xlink:href="#' + id + '"></use>\n</svg>\n\n'
  } else if($('input[name="a_accessibility"]:checked').val() === "aria label") {
       var HTML = '<span class="iconWrap" title="' + id + '">\n<svg class="icon" aria-hidden="true" focusable="false" viewBox="' + viewBox + '" role="img">\n<use xlink:href="#' + id + '"></use>\n</svg>\n<span class="access-label">' + id + '</span>\n</span>\n\n'; 
  }
  HTMLlist = HTMLlist + HTML;
  });


  $('#convertedHTMLcode textarea').val(HTMLlist);  

  $('#iconHolder').html(SVG + HTMLlist + '<style>' + CSS + '</style>');

  $('#iconHolderSize').css('opacity' , '1');

  $('#hidden').empty();


  //activate buttons
  $('#convertedSVGcode button, #convertedCSScode button, #convertedHTMLcode button').prop('disabled' , false);

  $('html, body').animate({
        scrollTop: $("#convertedSVGcode").offset().top - 70
    }, 1000);
  
}

//CONVERT SVG CODE BUTTON
$('#submitSVG').click(function(e) {
covertCode();
});

//SETTINGS RADIO CHANGE
$('.settings input[type=radio]').change(function(){
if ($.trim($("#SVGcontent").val())) {  
covertCode();  
}   
})

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

//SCALE CHANGE
$('#iconHolderSize select').on('change', function() {
  var scale = this.value + 'em';
  $('#iconHolder').css('font-size' , scale);
})








