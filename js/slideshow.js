$(document).ready(function(){
    $.getJSON('https://project-8145367811882739054.firebaseio.com/.json',function(res){
        loadSettings();
        $(window).unload(saveSettings);
        addArticle(res.articles);
    });
});
//variable for loop
var loop;
//array for the articles
var htmlTexts = [];
//number of articles that come back
var articleAmount = 0;
//Id for the article
var article_index = -1;
// Function that adds the article to the correct div and starts the loop
// with the returned articles
function addArticle(data) {
	for (var i = 0; i < data.length; i++) {
		articleAmount = data.length;
		htmlTexts.push('<div class="col-xs-12" id="newsArticle-'+i+'"><h3 id="newsHead-'+i+'">'+data[i].text.title+'</h3><p id="newsTime-'+i+'">'+data[i].text.date+'</p><p id="newsText-'+i+'">'+data[i].text.article+'</p><h3 id="newsAuthor-'+i+'">Author: '+data[i].text.author+'</h3></div>');
	}
	$('#newsArticle').append(htmlTexts);
	for (i = 0; i < data.length; i++) {
		$('#newsArticle-' + i).hide();
	}
	loopArticles();
}
//function that fades in a article with a specific index
function showArticle(index) {
	$('#newsArticle-'+index).fadeIn(2000);
}
// function that loops the articles. Starts witb hiding the 
// last seen article, then defines what the next index should be
// and then fades in the next article

//count 
var count = 0;

function loopArticles() {
    if(count === 0) {
        article_index ++;
        $('#newsArticle-'+article_index).fadeIn(2000);
        count ++;
    }
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
}
//
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
});

$('#previous').click('click',function(e) {
    var $this = $(this);
    clearInterval(loop);
    $('#start_stop').addClass('Play');
    $('#start_stop').text("Start");
    $('#newsArticle-' + (article_index)).hide();
    if(article_index === 0) {
            article_index = articleAmount - 1;
     }
    else {
        article_index --;
    }
    $('#newsArticle-'+article_index).fadeIn(2000);
});
//function that loads the last viewed article from local storage
function loadSettings () {
    if(localStorage.articleNumber === "NaN") {
        article_index = -2;
    }
    else {
        article_index = localStorage.articleNumber;
    }
}
//function that saves the last seen article to local storage
function saveSettings() {
    if(localStorage.articleNumber.isNaN()) {
        localStorage.articleNumber = article_index - 1;
    }
}
