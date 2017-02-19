function getQuote(){
    $.getJSON("http://api.forismatic.com/api/1.0/?method=getQuote&format=jsonp&lang=en&jsonp=?", function(data){
        $(".quote").html('"'+data.quoteText+'"');
        if(data.quoteAuthor === ''){
            $(".author").html('&#8212;'+"Anonymous");
        }else{
            $(".author").html('&#8212;'+data.quoteAuthor);
        }
    });
}

$(document).ready(function(){
    getQuote();
    $('.getter').on('click',function(){
        getQuote();
    });
});
