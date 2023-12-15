const API_URL = "http://172.31.255.2:8000/api";
// Função para preencher os campos do modal de edição com os dados do produto
function preencherCamposEdicao(id, nome, descricao, grupo) {
    $("#editProductId").val(id);
    $("#nomeEditProduto").val(nome);
    $("#descricaoEditProduto").val(descricao);
    $("#grupoEditProduto").val(grupo);
}

function createActionButton(itemId, nome, descricao, grupo) {
return `<div class="btn-group" role="group">
            <button type="button" class="btn btn-warning btn-sm"  data-toggle="modal" data-target="#modalEdit" onclick="preencherCamposEdicao(${itemId}, '${nome}', '${descricao}', '${grupo}')">Editar</button>
            <button type="button" class="btn btn-danger btn-sm" onclick="excluirProduto(${itemId})">Excluir</button>
            <button type="button" class="btn btn-info btn-sm" onclick="exibirDetalhes(${itemId})">Detalhes</button>
        </div>`;
}

// Função para carregar os produtos da API
function carregarProdutos() {
    $.ajax({
        url: `${API_URL}/produtos`,
        method: "GET",
        success: function(data) {
            // Limpar tabela antes de adicionar os produtos
            $("#productTableBody").empty();

            // Iterar sobre os produtos e adicionar à tabela
            $.each(data, function(index, product) {
                let row = `<tr>
                    <td>${product.id}</td>
                    <td>${product.nome}</td>
                    <td>${product.descricao}</td>
                    <td>${product.grupo}</td>
                    <td>
                        ${createActionButton(product.id, product.nome, product.descricao, product.grupo)}
                    </td>
                </tr>`;

                $("#productTableBody").append(row);
            });
        },
        error: function() {
            alert("Erro ao carregar produtos.");
        }
    });
}
function adicionarProduto() {
    let novoProduto = {
        nome: $("#nomeNovoProduto").val(),
        descricao: $("#descricaoNovoProduto").val(),
        grupo: $("#grupoNovoProduto").val()
    };

    $.ajax({
        url: `${API_URL}/produtos`,
        method: "POST",
        contentType: "application/json",
        data: JSON.stringify(novoProduto),
        success: function(response) {
            alert("Produto adicionado com sucesso!");
            carregarProdutos();
            $("#nomeNovoProduto").val("");
            $("#descricaoNovoProduto").val("");
            $("#grupoNovoProduto").val("");
            $("#modalAdd").modal("hide");
        },
        error: function() {
            alert("Erro ao adicionar produto.");
        }
    });
}



// Função para editar um produto
function editarProduto() {
    let id = $("#editProductId").val();
    let produtoAtualizado = {
        nome: $("#nomeEditProduto").val(),
        descricao: $("#descricaoEditProduto").val(),
        grupo: $("#grupoEditProduto").val()
    };

    $.ajax({
        url: `${API_URL}/produtos/${id}`,
        method: "PUT",
        contentType: "application/json",
        data: JSON.stringify(produtoAtualizado),
        success: function(response) {
            alert("Produto atualizado com sucesso!");
            carregarProdutos();
            $("#modalEdit").modal("hide");
        },
        error: function() {
            alert("Erro ao atualizar produto.");
        }
    });
}

// Função para excluir um produto
function excluirProduto(id) {
    if (confirm("Tem certeza que deseja excluir este produto?")) {
        $.ajax({
            url: `${API_URL}/produtos/${id}`,
            method: "DELETE",
            success: function(response) {
                alert("Produto excluído com sucesso!");
                carregarProdutos();
            },
            error: function() {
                alert("Erro ao excluir produto.");
            }
        });
    }
}
// Função para exibir detalhes dos itens de um produto específico
/*function exibirDetalhes(produtoId) {
    // Realizar requisição para buscar os itens do produto específico
    $.ajax({
        url: `http://localhost:8000/api/produtos/${produtoId}/itens`, // Endpoint para buscar os itens do produto
        method: "GET",
        success: function(data) {
            // Limpar a área de detalhes antes de preenchê-la
            $("#detalhesItensProduto").empty();

            data.forEach(function(item) {
                var detalhe = `<p>Patrimônio: ${item.id_patrimonio}, MAC: ${item.mac}, Obs: ${item.obs}</p>`;
                $("#detalhesItensProduto").append(detalhe);
            });

            $('#modalDetalhesItens').modal('show');
        },
        error: function() {
            alert("Não há itens para esse produto.");
        }
    });
}*/
function exibirDetalhes(produtoId) {
    // Redirecionamento para a página de itens com o ID do produto
    window.location.href = `/itens?produto=${produtoId}`;
    
}


$(document).ready(function() {
    carregarProdutos();
});
