$(document).ready(function(){
	var loop;
	var options = {
		url: 'https://project-8145367811882739054.firebaseio.com/.json',
		type: 'GET',
		dataType:'jsonp'
	}
	var articles = [];
	$.ajax(options)
			
    	.then(function(res){
    		//success response
    		//console.log(res);
    		addArticle(res.articles);
    	},function(err){
    		//error response
    		console.log(err);
    	})
        .then(function() {
            $(window).unload(saveSettings);
            loadSettings();
        });
});
var htmlTexts = [];
var articleAmount = 0;
var article_index = -1;
function addArticle(data) {
	for (var i = 0; i < data.length; i++) {
		articleAmount = data.length;
		htmlTexts.push('<div class="col-xs-12" id="newsArticle-'+i+'"><h3 id="newsHead-'+i+'">'+data[i].text.title+'</h3><p id="newsTime-'+i+'">'+data[i].text.date+'</p><p id="newsText-'+i+'">'+data[i].text.article+'</p><h3 id="newsAuthor-'+i+'">Author: '+data[i].text.author+'</h3></div>');
	}
	$('#newsArticle').append(htmlTexts);
	for (var i = 0; i < data.length; i++) {
		$('#newsArticle-' + i).hide()
	}
	loopArticles(htmlTexts);
}
function showArticle(index) {
	$('#newsArticle-'+index).fadeIn(2000);
}
function loopArticles() {
	loop = setInterval(function(){
		$('#newsArticle-' + (article_index)).hide();
		if(article_index == articleAmount - 1) {
		 	article_index = 0;
		}
		else {
			article_index ++;
		}
		$('#newsArticle-'+article_index).fadeIn(2000);
	},3000);
};
$('#start_stop').click('click', function(e) {
    var $this = $(this);
    $this.toggleClass('Play');
    if($this.hasClass('Play')){
        clearInterval(loop);
        $this.text("Start");
    }
    else {
        loopArticles();
        $this.text("Stop");
    }
});
$('#next').click('click',function(e) {
    var $this = $(this);
    clearInterval(loop);
    $('#start_stop').addClass('Play');
    $('#start_stop').text("Start");
    $('#newsArticle-' + (article_index)).hide();
    if(article_index == articleAmount - 1) {
            article_index = 0;
     }
    else {
        article_index ++;
    }
    $('#newsArticle-'+article_index).fadeIn(2000);
})
$('#previous').click('click',function(e) {
    var $this = $(this);
    clearInterval(loop);
    $('#start_stop').addClass('Play');
    $('#start_stop').text("Start");
    $('#newsArticle-' + (article_index)).hide();
    if(article_index == 0) {
            article_index = articleAmount - 1;
     }
    else {
        article_index --;
    }
    $('#newsArticle-'+article_index).fadeIn(2000);
});
function loadSettings () {
     console.log(localStorage.articleNumber);
    if(localStorage.articleNumber === NaN) {
        article_index = -1;
    }
    else {
        article_index = localStorage.articleNumber;
    }
}
function saveSettings() {
    console.log(article_index)
    if(localStorage.articleNumber !== NaN) {
        localStorage.articleNumber = article_index - 1;
    }
}
