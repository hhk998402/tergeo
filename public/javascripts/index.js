CKEDITOR.replace( 'editor1' );
$(document).ready(function(){
    $(document).on('mousemove',function(e){
        $("#cords").html("Cords: Y: "+e.clientY);
    })
});

function addData(user){
    alert("JERE");
    $.ajax({
        url: "/submit",
        data: user,
        success: function(result){
        alert('success');
    }});
}