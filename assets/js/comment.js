$('.nav-toggle').click(function() {
  $('.comment').show(500);
  $('.nav-toggle').hide(0);
  $('.nav-toggles').show(0);
});
$('.nav-toggles').click(function() {
  $('.comment').hide(500);
  $('.nav-toggle').show(0);
  $('.nav-toggles').hide(0);
});
// $('.toggle').click(function() {
//   $('#target').toggle('slow');
// });