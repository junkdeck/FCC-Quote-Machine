function error(err){
    if(err === 'noHTTPS'){
        $(".quote").html("Forismatic API does not support HTTPS calls. Please view over HTTP!");
    }else{
        $(".quote").html("Whoops! Something went wrong! Please try again later.");
    }
}

function quoteHandler(data){
    var authorOfQuote = '';
    if(data.quoteAuthor === ''){
        authorOfQuote = "Anonymous";
    }else{
        authorOfQuote = data.quoteAuthor;
    }

    var tweetText = '"'+data.quoteText+'" -'+authorOfQuote;
    if(tweetText.length > 140){
        console.log(tweetText.length);
        getQuote();
        return;
    }

    $(".author").html('&#8212;'+authorOfQuote)
    $(".quote").html('"'+data.quoteText+'"');

    $('.tweetQuote').attr('href','https://twitter.com/intent/tweet?text='+encodeURIComponent(tweetText));
}

function getQuote(){
    if(window.location.protocol === 'https:'){
        error('noHTTPS');
        return;
    }
    $.getJSON("http://api.forismatic.com/api/1.0/?method=getQuote&format=jsonp&lang=en&jsonp=?").done(quoteHandler).fail(error);
}

$(document).ready(function(){
    getQuote();

    $('.getter').on('click',function(){
        getQuote();
    });
});
