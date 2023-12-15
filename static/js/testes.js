const API_URL = "http://localhost:8000/api";
let todosItens = []; // Variável global para armazenar todos os itens
let produtos = {}; // Variável global para armazenar os produtos

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


// Função para carregar os itens na tabela
function carregarItens(macFilter = '') {
    const url = macFilter ? `${API_URL}/itens?mac=${macFilter}` : `${API_URL}/itens`;

    $.ajax({
        url: url,
        method: "GET",
        success: function(data) {
            // Ordena os itens por id_patrimonio
            data.sort((a, b) => a.id_patrimonio - b.id_patrimonio);

            // Limpa a tabela antes de adicionar os itens
            $("#itemTableBody").empty();

            if (data.length > 0) {
                data.forEach(function(item) {
                    // Lógica para carregar os produtos correspondentes, se necessário
                    carregarProdutoItem(item);
                });
            } else {
                $("#itemTableBody").text("Nenhum item encontrado.");
            }
        },
        error: function(xhr, status, error) {
            const errorMessage = xhr.responseJSON ? xhr.responseJSON.message : "Erro ao carregar itens.";
            alert(errorMessage);
        }
    });
}

function carregarNomesProdutos() {
    $.ajax({
        url: `${API_URL}/produtos`,
        method: "GET",
        success: function(data) {
            data.forEach(function(product) {
                produtos[product.id] = product.nome;
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
        error: function(xhr, status, error) {
            let errorMessage = "Erro ao carregar dados do produto.";

            if (xhr.responseJSON && xhr.responseJSON.detail) {
                errorMessage = xhr.responseJSON.detail;
            }

            alert(errorMessage); // Exibe a mensagem de erro vinda do servidor
        }
    });
}


// Evento de entrada no campo de busca por MAC
$("#campoBuscaMAC").on("input", function() {
    let valorBuscaMAC = $(this).val().toUpperCase();

    if (valorBuscaMAC.length >= 3) {
        carregarItens(valorBuscaMAC);
    } else if (valorBuscaMAC.length === 0) {
        carregarItens();
    } else {
        $("#itemTableBody").empty();
    }
});

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
        error: function(xhr, status, error) {
            let errorMessage = "Erro ao carregar dados do item para edição.";
    
            if (xhr.responseJSON && xhr.responseJSON.detail) {
                errorMessage = xhr.responseJSON.detail;
            }
    
            alert(errorMessage); // Exibe a mensagem de erro vinda do servidor
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
                error: function(xhr, status, error) {
                    let errorMessage = "Não foi possível excluir o item, erro não definido.";
            
                    if (xhr.responseJSON && xhr.responseJSON.detail) {
                        errorMessage = xhr.responseJSON.detail;
                    }
            
                    alert(errorMessage); // Exibe a mensagem de erro vinda do servidor
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
        let errorMessage = "Erro ao carregar dados do item para edição.";

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
    function carregarItensProdutos(produtoId) {
        const url = `${API_URL}/itens?produto_id=${produtoId}`;
    
        $.ajax({
            url: url,
            method: "GET",
            success: function(data) {
                // Ordena os itens por id_patrimonio
                data.sort((a, b) => a.id_patrimonio - b.id_patrimonio);
    
                // Limpa a tabela antes de adicionar os itens
                $("#itemTableBody").empty();
    
                if (data.length > 0) {
                    data.forEach(function(item) {
                        // Lógica para carregar os produtos correspondentes, se necessário
                        carregarProdutoItem(item);
                    });
                } else {
                    $("#itemTableBody").text("Nenhum item encontrado para este produto.");
                }
            },
            error: function(xhr, status, error) {
                const errorMessage = xhr.responseJSON ? xhr.responseJSON.message : "Erro ao carregar itens para este produto.";
                alert(errorMessage);
            }
        });
    }
        
function editarProdutos() {
    $.ajax({
        url: `${API_URL}/produtos`,
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
        error: function(xhr, status, error) {
            const errorMessage = xhr.responseJSON ? xhr.responseJSON.message : "Erro ao carregar produtos.";
            alert(errorMessage);
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
        url: `${API_URL}/itens/${itemId}`,
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

    
$(document).ready(function() {
    carregarProdutos(); // Chama a função para preencher o select de produtos
    editarProdutos();
    carregarNomesProdutos(); // Chama a função para preencher os nomes dos produtos
    const urlParams = new URLSearchParams(window.location.search);
    const produtoId = urlParams.get('produto');
    if (produtoId) {
        carregarItensProdutos(produtoId); // Chama a função para carregar os itens do produto específico
    } else {
        carregarItens(); // Chama a função para carregar todos os itens
    }
});
