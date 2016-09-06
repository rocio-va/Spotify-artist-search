$(document).ready(function(){

  $('.my-modal').hide;

var userSearch = $('.js-user-search');
var btnSearch = $('.js-btn-search');
var result = $('.js-result');
var url = "https://api.spotify.com/v1/search?type=artist&query=";

function successArtists(response){
  // console.log(JSON.stringify(response));
  console.log(response);
  result.empty();
  printResult(response);
};

function error(){
  console.log("error");
};

btnSearch.on('click', function(event){
  event.preventDefault();
  var searchParam = userSearch.val();
  //console.log(searchParam);
  //console.log("click");
  $.ajax({
      type: "GET",
      url: "" + url + searchParam,
      success: successArtists,
      error: error
    });
});

function printResult (response) {
  //Array de 20 items
  var artists = response.artists.items;
  $.each(artists, function(i, item){
    result.append(`<p>Artist ${i + 1}</p>`);
    result.append(`<p>Name: <a class="js-name-artist" href="#" data-artist-href=${item.href}>${item.name}</a></p>`);
    $.each(item.images, function(i, img){
      result.append(`<img class="art-img" src="${img.url}">`);
    });
  });
};

$(".js-result").on('click', ".js-name-artist", function(event){
  event.preventDefault();
  //console.log("hola");
  var artistName = $(event.currentTarget);
  var href = artistName.attr("data-artist-href");
  getAlbums(href);
});

function getAlbums (href) {
    //console.log("hola");
  $.ajax({
    type: "GET",
    url: href + "/albums",
    success: successName,
    error: error
  });
};

function successName (response) {
  //console.log("hola");
  console.log(response);
  showAlbums(response);
};

function showAlbums(response){
  var albums = response.items;
  $('.modal-body').empty();
  $.each(albums, function(i, item){
    $('.modal-body').append(`<p><a class="js-name-album" href="#" data-album-href=${item.href}>${item.name}</a></p>`);
  });
  $('.my_modal').modal();
};

$('.modal-body').on('click', ".js-name-album", function(event){
  event.preventDefault();
  //console.log("hola");
  var albumName = $(event.currentTarget);
  var href = albumName.attr("data-album-href");
  getTracks(href);
});

function getTracks (href) {
    //console.log("hola");
  $.ajax({
    type: "GET",
    url: href + "/tracks",
    success: successAlbum,
    error: error
  });
};

function successAlbum (response) {
  //console.log("hola");
  console.log(response);
  showTracks(response);
};

function showTracks(response){
  var tracks = response.items;
  $('.modal-body').empty();
  $.each(tracks, function(i, item){
    $('.modal-body').append(`<p><a class="js-name-track" target="_blank" href=${item.preview_url} data-track-id=${item.id}>${item.name}</a></p>`);
  });
  $('.my_modal').modal();
};

});

