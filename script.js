function error(err){
    if(err === 'noHTTPS'){
        $(".quote").html("Forismatic API does not support HTTPS calls. Please view over HTTP!");
    }else{
        $(".quote").html("Whoops! Something went wrong! Please try again later.");
    }
}

function getQuote(){

    if(window.location.protocol !== 'http:'){
        error('noHTTPS');
        return;
    }

    $.getJSON("http://api.forismatic.com/api/1.0/?method=getQuote&format=jsonp&lang=en&jsonp=?", function(data){
        $(".quote").html('"'+data.quoteText+'"').fail(error);
        if(data.quoteAuthor === ''){
            $(".author").html('&#8212;'+"Anonymous");
        }else{
            $(".author").html('&#8212;'+data.quoteAuthor);
        }
    });
}

$(document).ready(function(){

    $.post("https://api.twitter.com/oauth/authorize");

    getQuote();
    $('.getter').on('click',function(){
        getQuote();
    });
});
