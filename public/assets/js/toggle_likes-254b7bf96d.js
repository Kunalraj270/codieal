// CHANGE :: create a class to toggle likes when a link is clicked, using AJAX
class ToggleLike{
    constructor(toggleElement){
        this.toggler = toggleElement;
        this.toggleLike();
    }


    toggleLike(){
        $(this.toggler).click(function(e){
            e.preventDefault();
            let self = this;

            // this is a new way of writing ajax which you might've studied, it looks like the same as promises
            $.ajax({
                type: 'POST',
                url: $(self).attr('href'),
            })
            .done(function(data) {
                let likesCount = parseInt($(self).attr('data-likes'));
                console.log(likesCount);
                if (data.data.deleted == true){
                    likesCount -= 1;
                    $(self).html(`${likesCount}   <i class="bi bi-heart text-xl">Like</i>`);
                }else{
                    likesCount += 1;
                    $(self).html(`${likesCount}   <i class="bi bi-heart-fill text-red-600 text-xl ">Like</i>`);
                }


                $(self).attr('data-likes', likesCount);
                // $(self).html(`${likesCount} <i class="bi bi-heart-fill text-red-600 ">Like</i>`);

            })
            .fail(function(errData) {
                console.log('error in completing the request');
            });
            

        });
    }
}
