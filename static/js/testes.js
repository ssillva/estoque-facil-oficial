$(document).ready(function() {
    $.ajax({
        url: "http://localhost:8000/api/produtos"
    }).then(function(data) {
        let html = "";
        $.each(data, function (index, data) {
            html += "<td>"+data.id+"</td>"+
                    "<td>"+data.nome+"</td>"+
                    "<td>"+data.descricao+"</td>"+
                    "<td>"+data.grupo+"</td>"+
                    "<td> <a href=\"#\" class=\"btn btn-warning btn-xs\" data-bs-toggle=\"modal\"\
                    data-bs-target=\"#modaledit\"><i class=\"bi bi-arrow-clockwise\"> </i>Editar</a> \
                    <a href=\"#\" class=\"btn btn-danger btn-xs\"\
                            onclick=\"return confirm('Tem certeza que deseja deletar esse item')\"><i class=\"bi bi-trash\"> </i>Deletar</a></td>";
                          
        });  
        $('.teste').append(html);  //Append the HTML

    });
});