{
    // method to submit the form data for new comment using AJAX
    let createComment = function () {
        let newpostComment = $('#new-comment-form');

        newpostComment.submit(function (e) {
            e.preventDefault();

            $.ajax({
                type: 'post',
                url: '/comments/create',
                data: newpostComment.serialize(),
                success: function (data) {
                    let newComment = newCommentDom(data.data.comment);
                    $('#post-comments-list > ul').prepend(newComment);
                    console.log(data);
                }, error: function (error) {
                    console.log(error.responseText);
                }
            });
        });
    }

    // method to create comment in DOM


    let newCommentDom = function (comment) {
        return $(`li id="comment-${comment._id}">
        <p>

         <small>
           <a class="delete-comment-button" href="/comments/destroy/${comment.id}">X</a>
         </small>

           ${comment.content}
               <br>
           <small>
         ${comment.user.name}
          </small>
     </p>    

     </li>`)
    }



    createComment();
}
