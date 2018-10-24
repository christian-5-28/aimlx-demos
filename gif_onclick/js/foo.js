$(function() {
  $('#gif-hover').hide();
  $('#hover').on("mouseover", function() {
    $('#hover').hide();
    $('#gif-hover').show();
    $('#pic-hover').hide();
  });

  $('#gif-hover').on("mouseout", function() {
    $('#hover').show();
    $('#gif-hover').hide();
    $('#pic-hover').show();
  });

  $('#gif-click').hide();
  $('#click').click(function() {
    $('#click').hide();
    $('#gif-click').show();
    $('#pic-click').hide();
  });

  if ($('#click').data("clicked", true)) {
    $('#gif-click').click(function() {
      $('#click').show();
      $('#gif-click').hide();
      $('#pic-click').show();
    });
  }

});