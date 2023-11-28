function carregarItensProdutos() {
    /*        $.ajax({
                url: "http://localhost:8000/api/itens",
                method: "GET",
                success: function(data) {
                    // Limpar tabela antes de adicionar os itens
                    $("#itemTableBody").empty();
*/
            const urlParams = new URLSearchParams(window.location.search);
            const produtoId = urlParams.get('produto');

            // Verifica se há um ID de produto na URL
            if (produtoId) {
                // Realiza uma requisição AJAX para obter os itens do produto específico
                $.ajax({
                    url: `http://localhost:8000/api/produtos/${produtoId}/itens`,
                    method: "GET",
                    success: function(data) {
                        // Limpar tabela antes de adicionar os itens
                        $("#itemTableBody").empty();
                    // Iterar sobre os itens e adicionar à tabela
                    //$.each(data, function(index, item) {
                        // Carregar o nome do produto
                        $.ajax({
                            url: `http://localhost:8000/api/produtos/${produtoId}`,
                            method: "GET",
                            success: function(produto) {
                                $("#nomeDoProduto").text(produto.nome); // Exibe o nome do produto na página
                            },
                            error: function() {
                                alert("Erro ao carregar o nome do produto.");
                            }
                        });
                        data.forEach(function(item) {
                        let row = `<tr>
                            <td>${item.id_patrimonio}</td>
                            <td>${item.mac}</td>
                            <td>${item.fonte}</td>
                            <td>${item.volts}</td>
                            <td>${item.ampere}</td>
                            <td>${item.obs}</td>
                            <td>${item.produto_id}</td>
                            <td>
                            <button type="button" class="btn btn-warning btn-sm" onclick="editarItem(${item.id_patrimonio})">Editar</button>
                            <button type="button" class="btn btn-danger btn-sm" onclick="excluirItem(${item.id_patrimonio})">Excluir</button>
                            </td>
                        </tr>`;

                        $("#itemTableBody").append(row);
                    });
                },
                error: function() {
                    alert("Não há itens para esse produto.");
                }
            });
        } else {
            alert("ID do produto não encontrado na URL.");
        }
    }
    
    function carregarItens() {
            $.ajax({
                url: "http://localhost:8000/api/itens",
                method: "GET",
                success: function(data) {
                    // Limpar tabela antes de adicionar os itens
                    $("#nomeDoProduto").empty();
                    $("#itemTableBody").empty();
                    
            
                    // Iterar sobre os itens e adicionar à tabela
                    $.each(data, function(index, item) {
                        $.ajax({
                        url: `http://localhost:8000/api/produtos/${item.produto_id}`,
                        method: "GET",
                        success: function(produto) {
                            let row = `<tr>
                            <td>${item.id_patrimonio}</td>
                            <td>${item.mac}</td>
                            <td>${item.fonte}</td>
                            <td>${item.volts}</td>
                            <td>${item.ampere}</td>
                            <td>${item.obs}</td>
                            <td>${produto.nome}</td>
                            <td>
                            <button type="button" class="btn btn-warning btn-sm" onclick="editarItem(${item.id_patrimonio})">Editar</button>
                            <button type="button" class="btn btn-danger btn-sm" onclick="excluirItem(${item.id_patrimonio})">Excluir</button>
                            </td>
                        </tr>`;

                        $("#itemTableBody").append(row);
                    
                },
                    error: function() {
                        alert("Erro ao obter o nome do produto.");
                    }
                });
        });
    },
                    error: function() {
                    alert("Não há itens para esse produto.");
                }

            });
        } 

    function editarItem(itemId) {
            $.ajax({
                url: `http://localhost:8000/api/itens/${itemId}`,
                method: "GET",
                success: function(data) {
                    $("#editItemId").val(data.id_patrimonio); // Defina o ID do item no campo oculto do modal

                    // Preenche os campos do modal com os dados do item
                    $("#editMacItem").val(data.mac);
                    $("#editFonteItem").val(data.fonte);
                    $("#editVoltsItem").val(data.volts);
                    $("#editAmpereItem").val(data.ampere);
                    $("#editObsItem").val(data.obs);
                    $("#editProdutoIdItem").val(data.produto_id);
                    
                    // Abre o modal de edição
                    $("#modalEdit").modal("show");
                },
                error: function() {
                    alert("Erro ao carregar dados do item para edição.");
                }
            });
    }


    // Função para excluir um item
    function excluirItem(itemId) {
        if (confirm("Tem certeza que deseja excluir este item?")) {
            
            $.ajax({
                url: `http://localhost:8000/api/itens/${itemId}`,
                method: "DELETE",
                success: function(response) {
                    alert("Item excluído com sucesso!");
                    carregarItens(); // Recarregue a tabela de itens após a exclusão
                },
                error: function() {
                    alert("Erro ao excluir item.");
                }
            });
        }
    }

    // Função para adicionar um novo item
    function adicionarItem() {
        let novoItem = {
            //id_patrimonio: $("#idPatrimonio").val(),
            mac: $("#macItem").val(),
            fonte: $("#fonteItem").val(),
            volts: parseInt($("#voltsItem").val()),
            ampere: parseFloat($("#ampereItem").val()),
            obs: $("#obsItem").val(),
            produto_id: parseInt($("#produtoIdItem").val()) // Este campo mostrará o nome do produto
        };
        $.ajax({
        url: "http://localhost:8000/api/itens",
        method: "POST",
        contentType: "application/json",
        data: JSON.stringify(novoItem),
        success: function(response) {
            alert("Item adicionado com sucesso!");
            carregarItens();
            //$("#idPatrimonio").val("");
            $("#macItem").val("");
            $("#fonteItem").val("");
            $("#voltsItem").val("");
            $("#ampereItem").val("");
            $("#obsItem").val("");
            $("#modalAdd").modal("hide");
        },
        error: function() {
            alert("Erro ao adicionar item.");
        }
    });
       
    }

    // Função para carregar os nomes dos produtos na lista de seleção
    function carregarProdutos() {
        $.ajax({
            url: "http://localhost:8000/api/produtos",
            method: "GET",
            success: function(data) {
                // Limpar a lista de seleção antes de adicionar os produtos
                $("#produtoIdItem").empty();

                // Iterar sobre os produtos e adicionar na lista de seleção
                $.each(data, function(index, product) {
                    // Adicionar cada produto como uma opção na lista de seleção
                    $("#produtoIdItem").append(`<option value="${product.id}">${product.nome}</option>`);
                });
            },
            error: function() {
                alert("Erro ao carregar produtos.");
            }
        });
    }
    
    function editarProdutos() {
        $.ajax({
            url: "http://localhost:8000/api/produtos",
            method: "GET",
            success: function(data) {
                // Limpar a lista de seleção antes de adicionar os produtos
                $("#editProdutoIdItem").empty();

                // Iterar sobre os produtos e adicionar na lista de seleção
                $.each(data, function(index, product) {
                    // Adicionar cada produto como uma opção na lista de seleção
                    $("#editProdutoIdItem").append(`<option value="${product.id}">${product.nome}</option>`);
                });
            },
            error: function() {
                alert("Erro ao carregar produtos.");
            }
        });
    }

    function salvarEdicaoItem() {
        let itemId = $("#editItemId").val();

        let itemEditado = {
            mac: $("#editMacItem").val(),
            fonte: $("#editFonteItem").val(),
            volts: parseInt($("#editVoltsItem").val()),
            ampere: parseFloat($("#editAmpereItem").val()),
            obs: $("#editObsItem").val(),
            produto_id: parseInt($("#editProdutoIdItem").val())
        };

        $.ajax({
            url: `http://localhost:8000/api/itens/${itemId}`,
            method: "PUT",
            contentType: "application/json",
            data: JSON.stringify(itemEditado),
            success: function(response) {
                alert("Item editado com sucesso!");
                $("#modalEdit").modal("hide");
                carregarItens(); // Recarregue a tabela após a edição
            },
            error: function() {
                alert("Erro ao editar o item.");
            }
        });
    }

    /* Chamada para carregar os produtos ao carregar a página
    $(document).ready(function() {
        
        carregarItens();
        carregarItensProdutos();
        
    });*/
    $(document).ready(function() {
        const urlParams = new URLSearchParams(window.location.search);
        const produtoId = urlParams.get('produto');
        carregarProdutos(); // Chama a função para preencher o select de produtos
        editarProdutos();
        if (produtoId) {
            carregarItensProdutos(); // Chama a função para carregar os itens do produto específico
        } else {
            carregarItens(); // Chama a função para carregar todos os itens
        }
});