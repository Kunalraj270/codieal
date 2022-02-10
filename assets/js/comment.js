$(".but").click (function(){
    // Close all open windows
    $(".post-comments").stop().slideUp(300); 
    // Toggle this window open/close
    $(this).next(".post-comments").stop().slideToggle(300);
    //hitter test// 
    $(".fa-comment").show();
  });
  
  $(".but").click (function(){
    // Close all open windows
    $(".post-comments").stop().slideUp(300); 
});
