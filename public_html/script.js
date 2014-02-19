$(document).ready(function() {
    $("#content div").hide(); //chowa wszystkie content
    $("#tabs li:first").attr("id","current"); // aktywuje pierwszy tab
    $("#content div:first").fadeIn(); // pokazuje pierwszy content taba
    
    $('#tabs a').click(function(e) {
        e.preventDefault();// nie przenosi na nową stronę 
        if ($(this).closest("li").attr("id") == "current"){ //odkrycie bieżącego taba
         return       
        }
        else{             
        $("#content div").hide(); //chowaj wszystkie content
        $("#tabs li").attr("id",""); //reset id
        $(this).parent().attr("id","current"); //aktywuj kliknięty
        $('#' + $(this).attr('name')).fadeIn(); //pokaż content klikniętego
        }
    });
});
