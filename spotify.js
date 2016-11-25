$(document).on('ready', function (){
	$('.js-player').on('timeupdate', printTime);
	$('.form-artist').on('submit', searchTrack);
});

function searchTrack(event) {
    event.preventDefault();
    var search = $('#search').val()
    $.ajax({
    	type: "GET",
    	url: ("https://api.spotify.com/v1/search?type=track&query=" + search),
    	success: showInfo,
    	error: handleError 
	});	
};

function showInfo(response) {
	console.log(response);

	var title = response.tracks.items[0].name;
	var artist = response.tracks.items[0].artists[0].name;
	var albumImage = response.tracks.items[0].album.images[0].url;

	$('.title').text(title);
	$('.author').text(artist);
	document.getElementById("cover").src = albumImage

	setupAudio(response);
};

function setupAudio(response) {

	var audioPreviewUrl = response.tracks.items[0].preview_url
	document.getElementById("audio").src = audioPreviewUrl
	$(".btn-play").click(function() {
  		$('.btn-play').toggleClass('playing');
		if ($('.btn-play').attr('class') === "btn-play playing") {
			$('.js-player').trigger('play');
  		} else {
  			$('.js-player').trigger('pause');
  		}
	});
}

function printTime () {
  var current = $('.js-player').prop('currentTime');
  console.debug('Current time: ' + current);
  $('progress').attr('value', current)
}


function handleError (error) { 
    console.log('Error!');
    console.log(error.responseText);
};