$(document).ready(function() {
    $.ajax({
        url: "http://localhost:8000/api/produtos"
    }).then(function(data) {
        // $.each(data, function (index, data) {
        //     let 
        //     html = "<div><div>ID: " + data.id + "</div>" + 
        //     "<div>GRUPO: " + data.grupo + "</div></div>";

        //     $('.dados-produtos').append(html);  //Append the HTML
        // });  

        let html = "<select class=\"selectpicker\" btn-group data-show-subtext=\"true\" data-live-search=\"true\">";
        $.each(data, function (index, data) {
            html += "<option value='"+data.id+"'>"+data.grupo+"</option>";
        });  
        html += "</select>";
        $('.teste').append(html);  //Append the HTML

    });
});