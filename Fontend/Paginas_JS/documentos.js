// Funções para gerenciar a página de documentos

// Função para inicializar a página
function inicializarDocumentos() {
    // Adicionar eventos aos botões de ação
    document.querySelectorAll('.action-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const action = this.classList.contains('view-btn') ? 'view' :
                          this.classList.contains('edit-btn') ? 'edit' : 'delete';
            const row = this.closest('tr');
            const codigo = row.cells[0].textContent;
            const tipo = row.cells[1].textContent;
            
            switch(action) {
                case 'view':
                    visualizarDocumento(codigo, tipo);
                    break;
                case 'edit':
                    editarDocumento(codigo, tipo);
                    break;
                case 'delete':
                    excluirDocumento(codigo, tipo);
                    break;
            }
        });
    });

    // Adicionar eventos para os botões de filtro e novo documento
    const filterBtn = document.querySelector('.document-filter-btn');
    const addBtn = document.querySelector('.add-document-btn');

    if (filterBtn) {
        filterBtn.addEventListener('click', function() {
            alert('Funcionalidade de filtro será implementada em breve.');
        });
    }

    if (addBtn) {
        addBtn.addEventListener('click', function() {
            // Determina qual modal abrir baseado na página atual
            const currentPage = window.location.pathname.split('/').pop();
            switch(currentPage) {
                case 'peticoes.html':
                    showNovaPeticaoModal();
                    break;
                case 'contratos.html':
                    showNovoContratoModal();
                    break;
                case 'modelos.html':
                    showNovoModeloModal();
                    break;
            }
        });
    }
}

// Função para mostrar o modal de nova petição
function showNovaPeticaoModal() {
    const modal = document.getElementById('modal-nova-peticao');
    if (modal) {
        modal.classList.add('show');
        // Limpar formulário ao abrir
        const form = document.getElementById('form-nova-peticao');
        if (form) {
            form.reset();
            // Gerar e preencher o código da petição
            const codigoPeticao = gerarCodigoSequencial('peticao');
            document.getElementById('codigo_peticao').value = codigoPeticao;
            // Definir a data atual
            document.getElementById('data_peticao').valueAsDate = new Date();
        }
    }
}

// Função para fechar o modal de nova petição
function closeNovaPeticaoModal() {
    const modal = document.getElementById('modal-nova-peticao');
    if (modal) {
        modal.classList.remove('show');
    }
}

// Função para mostrar o modal de novo contrato
function showNovoContratoModal() {
    const modal = document.getElementById('modal-novo-contrato');
    if (modal) {
        modal.classList.add('show');
        // Limpar formulário ao abrir
        const form = document.getElementById('form-novo-contrato');
        if (form) {
            form.reset();
            // Gerar e preencher o código do contrato
            const codigoContrato = gerarCodigoSequencial('contrato');
            document.getElementById('codigo_contrato').value = codigoContrato;
            // Definir a data atual
            document.getElementById('data_contrato').valueAsDate = new Date();
        }
    }
}

// Função para fechar o modal de novo contrato
function closeNovoContratoModal() {
    const modal = document.getElementById('modal-novo-contrato');
    if (modal) {
        modal.classList.remove('show');
    }
}

// Função para mostrar o modal de novo modelo
function showNovoModeloModal() {
    const modal = document.getElementById('modal-novo-modelo');
    if (modal) {
        modal.classList.add('show');
        // Limpar formulário ao abrir
        const form = document.getElementById('form-novo-modelo');
        if (form) {
            form.reset();
            // Gerar e preencher o código do modelo
            const codigoModelo = gerarCodigoSequencial('modelo');
            document.getElementById('codigo_modelo').value = codigoModelo;
        }
    }
}

// Função para fechar o modal de novo modelo
function closeNovoModeloModal() {
    const modal = document.getElementById('modal-novo-modelo');
    if (modal) {
        modal.classList.remove('show');
    }
}

// Função para salvar petição
function salvarPeticao(formId) {
    const form = document.getElementById(formId);
    if (form) {
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());
        
        // Gera o código da petição
        const codigoPeticao = gerarCodigoSequencial('peticao');
        data.codigo = codigoPeticao;
        
        // Validações básicas
        if (!data.tipo_peticao) {
            alert('Tipo de petição é obrigatório');
            return;
        }
        if (!data.processo_peticao) {
            alert('Processo é obrigatório');
            return;
        }
        if (!data.titulo_peticao) {
            alert('Título é obrigatório');
            return;
        }
        if (!data.conteudo_peticao) {
            alert('Conteúdo é obrigatório');
            return;
        }
        
        // Criar nova linha na tabela
        const tbody = document.querySelector('.document-table tbody');
        const newRow = document.createElement('tr');
        
        newRow.innerHTML = `
            <td>${codigoPeticao}</td>
            <td>${data.tipo_peticao}</td>
            <td>${data.titulo_peticao}</td>
            <td>${data.processo_peticao}</td>
            <td>${data.data_peticao}</td>
            <td><span class="status-badge active">Ativo</span></td>
            <td>
                <button class="action-btn view-btn">Ver</button>
                <button class="action-btn edit-btn">Editar</button>
                <button class="action-btn delete-btn">Excluir</button>
            </td>
        `;
        
        // Adicionar a nova linha no início da tabela
        tbody.insertBefore(newRow, tbody.firstChild);
        
        // Limpar o formulário e fechar o modal
        form.reset();
        closeNovaPeticaoModal();
        
        // Aqui você pode adicionar a lógica para salvar no banco de dados
        console.log('Dados da petição:', data);
    }
}

// Função para salvar contrato
function salvarContrato(formId) {
    const form = document.getElementById(formId);
    if (form) {
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());
        
        // Gera o código do contrato
        const codigoContrato = gerarCodigoSequencial('contrato');
        data.codigo = codigoContrato;
        
        // Validações básicas
        if (!data.tipo_contrato) {
            alert('Tipo de contrato é obrigatório');
            return;
        }
        if (!data.cliente_contrato) {
            alert('Cliente é obrigatório');
            return;
        }
        if (!data.titulo_contrato) {
            alert('Título é obrigatório');
            return;
        }
        if (!data.conteudo_contrato) {
            alert('Conteúdo é obrigatório');
            return;
        }
        if (!data.valor_contrato) {
            alert('Valor é obrigatório');
            return;
        }
        
        // Criar nova linha na tabela
        const tbody = document.querySelector('.document-table tbody');
        const newRow = document.createElement('tr');
        
        newRow.innerHTML = `
            <td>${codigoContrato}</td>
            <td>${data.tipo_contrato}</td>
            <td>${data.titulo_contrato}</td>
            <td>${data.cliente_contrato}</td>
            <td>${data.data_contrato}</td>
            <td><span class="status-badge active">Ativo</span></td>
            <td>
                <button class="action-btn view-btn">Ver</button>
                <button class="action-btn edit-btn">Editar</button>
                <button class="action-btn delete-btn">Excluir</button>
            </td>
        `;
        
        // Adicionar a nova linha no início da tabela
        tbody.insertBefore(newRow, tbody.firstChild);
        
        // Limpar o formulário e fechar o modal
        form.reset();
        closeNovoContratoModal();
        
        // Aqui você pode adicionar a lógica para salvar no banco de dados
        console.log('Dados do contrato:', data);
    }
}

// Função para salvar modelo
function salvarModelo(formId) {
    const form = document.getElementById(formId);
    if (form) {
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());
        
        // Gera o código do modelo
        const codigoModelo = gerarCodigoSequencial('modelo');
        data.codigo = codigoModelo;
        
        // Validações básicas
        if (!data.tipo_modelo) {
            alert('Tipo de modelo é obrigatório');
            return;
        }
        if (!data.titulo_modelo) {
            alert('Título é obrigatório');
            return;
        }
        if (!data.conteudo_modelo) {
            alert('Conteúdo é obrigatório');
            return;
        }
        
        // Criar nova linha na tabela
        const tbody = document.querySelector('.document-table tbody');
        const newRow = document.createElement('tr');
        
        newRow.innerHTML = `
            <td>${codigoModelo}</td>
            <td>${data.tipo_modelo}</td>
            <td>${data.titulo_modelo}</td>
            <td>${new Date().toLocaleDateString()}</td>
            <td><span class="status-badge active">Ativo</span></td>
            <td>
                <button class="action-btn view-btn">Ver</button>
                <button class="action-btn edit-btn">Editar</button>
                <button class="action-btn delete-btn">Excluir</button>
            </td>
        `;
        
        // Adicionar a nova linha no início da tabela
        tbody.insertBefore(newRow, tbody.firstChild);
        
        // Limpar o formulário e fechar o modal
        form.reset();
        closeNovoModeloModal();
        
        // Aqui você pode adicionar a lógica para salvar no banco de dados
        console.log('Dados do modelo:', data);
    }
}

// Função para inserir variável no modelo
function inserirVariavelModelo(variavel) {
    const conteudoModelo = document.getElementById('conteudo_modelo');
    if (conteudoModelo) {
        const start = conteudoModelo.selectionStart;
        const end = conteudoModelo.selectionEnd;
        const text = conteudoModelo.value;
        const newText = text.substring(0, start) + variavel + text.substring(end);
        conteudoModelo.value = newText;
        conteudoModelo.focus();
        conteudoModelo.setSelectionRange(start + variavel.length, start + variavel.length);
    }
}

// Função para visualizar documento
function visualizarDocumento(codigo, tipo) {
    alert(`Visualizando ${tipo} ${codigo}`);
    // Implementar visualização do documento
}

// Função para editar documento
function editarDocumento(codigo, tipo) {
    alert(`Editando ${tipo} ${codigo}`);
    // Implementar edição do documento
}

// Função para excluir documento
function excluirDocumento(codigo, tipo) {
    if (confirm(`Tem certeza que deseja excluir o ${tipo} ${codigo}?`)) {
        // Implementar exclusão do documento
        alert(`${tipo} ${codigo} excluído com sucesso!`);
    }
}

// Função para formatar valores monetários
function formatarValorMonetario(input) {
    let value = input.value.replace(/\D/g, '');
    value = (parseInt(value) / 100).toFixed(2);
    input.value = value;
}

// Função para inicializar máscaras e validações
function inicializarFormularios() {
    // Máscara para campos monetários
    const camposMonetarios = document.querySelectorAll('.monetary-input');
    camposMonetarios.forEach(input => {
        input.addEventListener('input', function() {
            formatarValorMonetario(this);
        });
    });
}

// Inicializa as funções quando o documento estiver pronto
document.addEventListener('DOMContentLoaded', function() {
    inicializarDocumentos();
    inicializarFormularios();
}); 