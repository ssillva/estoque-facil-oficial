$(document).ready(function() {
    $.ajax({
        url: "http://192.168.12.22:8000/api/produtos"
    }).then(function(data) {
        // $.each(data, function (index, data) {
        //     let 
        //     html = "<div><div>ID: " + data.id + "</div>" + 
        //     "<div>GRUPO: " + data.grupo + "</div></div>";

        //     $('.dados-produtos').append(html);  //Append the HTML
        // });  

        let html = "<select class=\"selectpicker\" data-show-subtext=\"true\" data-live-search=\"true\"'>";
        $.each(data, function (index, data) {
            html += "<option value='"+data.id+"'>"+data.id + ": " +data.grupo+"</option>";
        });  
        html += "</select>";
        $('.dados-produtos').append(html);  //Append the HTML

    });
});