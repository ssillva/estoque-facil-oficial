const API_URL = "http://localhost:8000/api";
//Função para padronizar a tabela
function adicionarLinhaTabela(item, produto) {
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
}

function carregarItensProdutos() {
    const urlParams = new URLSearchParams(window.location.search);
    const produtoId = urlParams.get('produto');

    if (produtoId) {
        $.ajax({
            url: `${API_URL}/produtos/${produtoId}/itens`,
            method: "GET",
            success: function(data) {
                $("#itemTableBody").empty();
                data.sort((a, b) => a.id_patrimonio - b.id_patrimonio);
                $.ajax({
                    url: `${API_URL}/produtos/${produtoId}`,
                    method: "GET",
                    success: function(produto) {
                        $("#nomeDoProduto").text(produto.nome);
                    },
                    error: function(xhr, status, error) {
                        let errorMessage = "Erro ao carregar o nome do produto.";
            
                        if (xhr.responseJSON && xhr.responseJSON.detail) {
                            errorMessage = xhr.responseJSON.detail;
                        }
            
                        alert(errorMessage); // Exibe a mensagem de erro vinda do servidor
                    }
                });

                data.forEach(function(item) {
                    $.ajax({
                        url: `${API_URL}/produtos/${item.produto_id}`,
                        method: "GET",
                        success: function(produto) {
                            adicionarLinhaTabela(item, produto);
                        },
                        error: function(xhr, status, error) {
                            let errorMessage = "Erro ao carregar o nome do produto.";
                
                            if (xhr.responseJSON && xhr.responseJSON.detail) {
                                errorMessage = xhr.responseJSON.detail;
                            }
                
                            alert(errorMessage); // Exibe a mensagem de erro vinda do servidor
                        }
                    });
                });
            },
            error: function(xhr, status, error) {
                let errorMessage = "Não há itens para esse produto.";
    
                if (xhr.responseJSON && xhr.responseJSON.detail) {
                    errorMessage = xhr.responseJSON.detail;
                }
    
                alert(errorMessage); // Exibe a mensagem de erro vinda do servidor
            }
        });
    } else {
        alert("ID do produto não encontrado na URL.");
    }
}

function carregarItens() {
    $.ajax({
        url: `${API_URL}/itens`,
        method: "GET",
        success: function(data) {
            $("#nomeDoProduto").empty();
            $("#itemTableBody").empty();

            data.forEach(function(item) {
                carregarProdutoItem(item);
            });
        },
        error: function(xhr, status, error) {
            let errorMessage = "Não há itens para esse produto.";

            if (xhr.responseJSON && xhr.responseJSON.detail) {
                errorMessage = xhr.responseJSON.detail;
            }

            alert(errorMessage); // Exibe a mensagem de erro vinda do servidor
        }
    });
}

let todosItens = []; // Para armazenar todos os itens no carregamento da página

function carregarTodosItens() {
    $.ajax({
        url: `${API_URL}/itens`,
        method: "GET",
        success: function(data) {
            todosItens = data;
        },
        error: function(error) {
            console.error("Erro ao carregar itens:", error);
        }
    });
}
// Função para exibir os itens correspondentes ao MAC digitado
function exibirItensPorMAC(mac) {
    $("#itemTableBody").empty();
    const itensFiltrados = todosItens.filter(item => item.mac.toUpperCase().includes(mac.toUpperCase()));

    if (itensFiltrados.length > 0) {
        itensFiltrados.forEach(function(item) {
            $.ajax({
                url: `${API_URL}/produtos/${item.produto_id}`,
                method: "GET",
                success: function(produto) {
                    adicionarLinhaTabela(item, produto);
                },
                error: function() {
                    console.error("Erro ao obter o nome do produto.");
                }
            });
        });
    } else {
        $("#itemTableBody").text("Nenhum item encontrado para o MAC digitado.");
    }
}

// Evento de entrada no campo de busca por MAC
$("#campoBuscaMAC").on("input", function() {
    let valorBuscaMAC = $(this).val().toUpperCase();

    if (valorBuscaMAC.length >= 3) {
        exibirItensPorMAC(valorBuscaMAC);
    } else if (valorBuscaMAC.length === 0) {
        carregarItens();
    } else {
        $("#itemTableBody").empty();
    }
});

// Carregar todos os itens ao carregar a página
carregarTodosItens();


    function editarItem(itemId) {
            $.ajax({
                url: `${API_URL}/itens/${itemId}`,
                method: "GET",
                success: function(data) {
                    $("#editItemId").val(data.id_patrimonio); // Defina o ID do item no campo oculto do modal

                    // Preenche os campos do modal com os dados do item
                    $("#editMacItem").val(data.mac.toUpperCase());
                    $("#editFonteItem").val(data.fonte.toUpperCase());
                    $("#editVoltsItem").val(data.volts);
                    $("#editAmpereItem").val(data.ampere);
                    $("#editObsItem").val(data.obs.toUpperCase());
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
                url: `${API_URL}/itens/${itemId}`,
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
            mac: $("#macItem").val().toUpperCase(),
            fonte: $("#fonteItem").val().toUpperCase(),
            volts: parseInt($("#voltsItem").val()),
            ampere: parseFloat($("#ampereItem").val()),
            obs: $("#obsItem").val().toUpperCase(),
            produto_id: parseInt($("#produtoIdItem").val()) // Este campo mostrará o nome do produto
        };
        $.ajax({
        url: `${API_URL}/itens`,
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
        error: function(xhr, status, error) {
            let errorMessage = "Erro ao adicionar esse produto.";

            if (xhr.responseJSON && xhr.responseJSON.detail) {
                errorMessage = xhr.responseJSON.detail;
            }

            alert(errorMessage); // Exibe a mensagem de erro vinda do servidor
        }
    });
       
    }

    // Função para carregar os nomes dos produtos na lista de seleção
    function carregarProdutos() {
        $.ajax({
            url: `${API_URL}/produtos`,
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
// Função para carregar produto de um item
function carregarProdutoItem(item) {
    $.ajax({
        url: `${API_URL}/produtos/${item.produto_id}`,
        method: "GET",
        success: function(produto) {
            adicionarLinhaTabela(item, produto);
        },
        error: function() {
            console.error("Erro ao obter o nome do produto.");
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
        carregarProdutos(); // Chama a função para preencher o select de produtos
        editarProdutos();
        const urlParams = new URLSearchParams(window.location.search);
        const produtoId = urlParams.get('produto');
        
        if (produtoId) {
            carregarItensProdutos();
        } else {
            carregarItens();
        }
    });