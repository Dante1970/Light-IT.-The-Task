// Поиск при клике
$('.search').click(function() {
  $('.track-string').remove();

  var input = $('input').val();
  console.log(input);
  var search = input.split(' ').join('+');
  var link = 'https://itunes.apple.com/search?term='+ search +'';

  $.ajax({
    url: link,
    type: 'POST',
    dataType: 'json',
    success: wsSearchCB
  });
});

// Клик по треку
$('body').on('click', '.track-string', function() {
  var trackListSymbol = $('.track-string .glyphicon');
  var symbol = $(this).find('.glyphicon');

  if (symbol.hasClass('glyphicon-plus') == true) {
    trackListSymbol.removeClass('glyphicon-minus');
    trackListSymbol.addClass('glyphicon-plus');
    
    symbol.removeClass('glyphicon-plus');
    symbol.addClass('glyphicon-minus');
  } else {
    symbol.removeClass('glyphicon-minus');
    symbol.addClass('glyphicon-plus');
  }

  $(this).find('.add-info-track').slideToggle(300, function() {
    $('.add-info-track').not(this).slideUp(300);
  });
});

// Создает трек из data
function wsSearchCB(data) {
  var maxResults = 50;

  for (var i = 0; i < maxResults; i++) {
    var track = data.results[i];

    var imgTrack = track.artworkUrl100;
    var artistName = track.artistName;
    var trackName = track.trackName;
    var collectionName = track.collectionName;
    var rimaryGenreName = track.primaryGenreName;
    var duration = track.trackTimeMillis;
    var count = track.trackCount;
    var price = track.trackPrice;
    var collectionPrice = track.collectionPrice;
    var currency = track.currency;

    createTrackList(i,imgTrack,artistName,trackName,collectionName,rimaryGenreName,duration,count,price,collectionPrice,currency);
  }
}

// Создает блок с треком
function createTrackList(i,imgTrack,artistName,trackName,collectionName,rimaryGenreName,duration,count,price,collectionPrice,currency) {
  var trackList = $('.track-list');
  var date = new Date(duration);
  var minute = date.getMinutes();
  var sec = (date.getSeconds() < 10 ? '0' : '') + date.getSeconds();

  var trackString = trackList.append('        <div class="track-string" data-id="' + i +'">\
    <div class="row">\
      <div class="main-info">\
        <div class="col-xs-2 art"><img src="' + imgTrack + '" alt=""></div>\
        <div class="col-xs-2">' + artistName + '</div>\
        <div class="col-xs-2">'+ trackName + '</div>\
        <div class="col-xs-2">' + collectionName + '</div>\
        <div class="col-xs-2">' + rimaryGenreName + '</div>\
        <div class="col-xs-2 symbol"><span class="glyphicon glyphicon-plus"></span></div>\
      </div>\
      <div class="row add-info-track">\
        <div class="col-xs-10 col-xs-offset-2"><big>' + artistName + ' - ' + trackName +' <span class="glyphicon glyphicon-music"></span></big></div>\
        <div class="row">\
          <div class="col-xs-2 col-xs-offset-2">\
            <b>Colection: </b>' + collectionName + '<br>\
            <b>Track count: </b>'+ count +'<br>\
            <b>Price: </b>' + collectionPrice + ' '+ currency +'<br>\
          </div>\
          <div class="col-xs-2 col-xs-offset-2">\
            <b>Track duration: </b>' + minute + ':' + sec + '<br>\
            <b>Track price: </b> ' + price + ' ' + currency + '\
          </div>\
        </div>\
      </div>\
    </div>\
  </div>');

  // Меняем фон четному треку
  if ( i & 1 ) {
    console.log("нечетно");
  } else {
    $('.track-string:last').css('background', '#c0d6f9');
  }
}
