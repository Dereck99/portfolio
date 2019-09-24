var messageContainer = $('#message');
var websiteStart = true;

$(document).ready(function(){
  getQuote();
  console.log("document ready");
  $("#new-quote").on("click", function(){
    console.log("clicked");
    document.getElementById("quote-box").classList.add("transformedOut");
    setTimeout(getQuote(), 3000);
  document.getElementById("quote-box").classList.remove("transformedOut");
    document.getElementById("quote-box").classList.add("transformedIn");  
    //getQuote();
  });
});

function getQuote(){
  $.ajax({
      url: "https://api.forismatic.com/api/1.0/",
      jsonp: "jsonp",
      dataType: "jsonp",
      data: {
        method: "getQuote",
        lang: "en",
        format: "jsonp"
      },
      success: function(data){
        console.log("success");
        console.log(data.quoteText);
            //$('#quote-box').animate({'opacity': 0}, 1000, function () {
              $('#text').html("&#10077"  + data.quoteText + "&#10078");
        if(data.quoteAuthor == ""){
          $('#author').html(" By Anonymous");
        } else {
          $('#author').html(" By " + data.quoteAuthor);
        } 
      }
  });
}