// Funções para gerenciar os modais de cadastro

// Modal de Cliente
function showNovoClienteModal() {
    console.log('Abrindo modal de cliente...'); // Debug
    const modal = document.getElementById('modal-novo-cliente');
    if (modal) {
        modal.classList.add('show');
        // Limpar formulário ao abrir
        const form = document.getElementById('form-novo-cliente');
        if (form) {
            form.reset();
            // Resetar a foto para a imagem padrão
            document.getElementById('foto_preview').src = '../Imagens/default-avatar.png';
            // Gerar e preencher o código do cliente
            const codigoCliente = gerarCodigoSequencial('cliente');
            document.getElementById('codigo_cliente').value = codigoCliente;
        }
    } else {
        console.error('Modal não encontrado!'); // Debug
    }
}

function closeNovoClienteModal() {
    const modal = document.getElementById('modal-novo-cliente');
    if (modal) {
        modal.classList.remove('show');
    }
}

// Modal de Advogado
function showNovoAdvogadoModal() {
    const modal = document.getElementById('modal-novo-advogado');
    if (modal) {
        modal.classList.add('show');
        // Limpar formulário ao abrir
        const form = document.getElementById('form-novo-advogado');
        if (form) {
            form.reset();
            // Resetar a foto para a imagem padrão
            document.getElementById('foto_advogado_preview').src = '../Imagens/default-avatar.png';
            // Gerar e preencher o código do advogado
            const codigoAdvogado = gerarCodigoSequencial('advogado');
            document.getElementById('codigo_advogado').value = codigoAdvogado;
        }
    }
}

function closeNovoAdvogadoModal() {
    const modal = document.getElementById('modal-novo-advogado');
    if (modal) {
        modal.classList.remove('show');
    }
}

// Modal de Tribunal
function showNovoTribunalModal() {
    const modal = document.getElementById('modal-novo-tribunal');
    if (modal) {
        modal.classList.add('show');
        // Limpar formulário ao abrir
        const form = document.getElementById('form-novo-tribunal');
        if (form) {
            form.reset();
            // Gerar e preencher o código do tribunal
            const codigoTribunal = gerarCodigoSequencial('tribunal');
            document.getElementById('codigo_tribunal').value = codigoTribunal;
        }
    }
}

function closeNovoTribunalModal() {
    const modal = document.getElementById('modal-novo-tribunal');
    if (modal) {
        modal.classList.remove('show');
    }
}

// Modal de Vara
function showNovaVaraModal() {
    const modal = document.getElementById('modal-nova-vara');
    if (modal) {
        modal.classList.add('show');
    }
}

function closeNovaVaraModal() {
    const modal = document.getElementById('modal-nova-vara');
    if (modal) {
        modal.classList.remove('show');
    }
}

// Modal de Usuário
function showNovoUsuarioModal() {
    const modal = document.getElementById('modal-novo-usuario');
    if (modal) {
        modal.classList.add('show');
        // Limpar formulário ao abrir
        const form = document.getElementById('form-novo-usuario');
        if (form) {
            form.reset();
            // Resetar a foto para a imagem padrão
            document.getElementById('foto_usuario_preview').src = '../Imagens/default-avatar.png';
            // Gerar e preencher o código do usuário
            const codigoUsuario = gerarCodigoSequencial('usuario');
            document.getElementById('codigo_usuario').value = codigoUsuario;
        }
    }
}

function closeNovoUsuarioModal() {
    const modal = document.getElementById('modal-novo-usuario');
    if (modal) {
        modal.classList.remove('show');
    }
}

// Função genérica para fechar modais ao clicar fora
window.onclick = function(event) {
    if (event.target.classList.contains('modal')) {
        event.target.classList.remove('show');
    }
}

// Função para gerar código sequencial
function gerarCodigoSequencial(tipo) {
    // Recupera o último código usado do localStorage
    const ultimoCodigo = localStorage.getItem(`ultimo_codigo_${tipo}`) || 0;
    const novoCodigo = parseInt(ultimoCodigo) + 1;
    // Salva o novo código no localStorage
    localStorage.setItem(`ultimo_codigo_${tipo}`, novoCodigo);
    // Retorna o código formatado com 5 dígitos
    return novoCodigo.toString().padStart(5, '0');
}

// Função para salvar cliente
function salvarCliente(formId) {
    const form = document.getElementById(formId);
    if (form) {
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());
        
        // Gera o código do cliente
        const codigoCliente = gerarCodigoSequencial('cliente');
        data.codigo = codigoCliente;
        
        // Validações específicas para cliente
        if (data.tipo_pessoa === 'PF' && data.documento.length !== 14) {
            alert('CPF inválido');
            return;
        }
        if (data.tipo_pessoa === 'PJ' && data.documento.length !== 18) {
            alert('CNPJ inválido');
            return;
        }
        
        // Validação de e-mail
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(data.email)) {
            alert('E-mail inválido');
            return;
        }
        
        // Validação de telefone
        const telefoneRegex = /^\(\d{2}\) \d{4,5}-\d{4}$/;
        if (!telefoneRegex.test(data.telefone)) {
            alert('Telefone inválido');
            return;
        }

        // Obter a foto do cliente
        const fotoInput = document.getElementById('foto_cliente');
        const fotoPreview = document.getElementById('foto_preview');
        const fotoUrl = fotoInput.files.length > 0 ? URL.createObjectURL(fotoInput.files[0]) : '../Imagens/default-avatar.png';
        
        // Criar nova linha na tabela
        const tbody = document.querySelector('.client-table tbody');
        const newRow = document.createElement('tr');
        
        newRow.innerHTML = `
            <td class="client-photo">
                <img src="${fotoUrl}" alt="Foto do Cliente">
            </td>
            <td>${codigoCliente}</td>
            <td>${data.nome}</td>
            <td>${data.tipo_pessoa === 'PF' ? 'Pessoa Física' : 'Pessoa Jurídica'}</td>
            <td>${data.documento}</td>
            <td>${data.email}</td>
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
        document.getElementById('foto_preview').src = '../Imagens/default-avatar.png';
        closeNovoClienteModal();
        
        // Aqui você pode adicionar a lógica para salvar no banco de dados
        console.log('Dados do cliente:', data);
    }
}

// Função para salvar advogado
function salvarAdvogado(formId) {
    const form = document.getElementById(formId);
    if (form) {
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());
        
        // Gera o código do advogado
        const codigoAdvogado = gerarCodigoSequencial('advogado');
        data.codigo = codigoAdvogado;
        
        // Validações básicas
        if (data.cpf_advogado.length !== 14) {
            alert('CPF inválido');
            return;
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(data.email_advogado)) {
            alert('E-mail inválido');
            return;
        }
        const telefoneRegex = /^\(\d{2}\) \d{4,5}-\d{4}$/;
        if (!telefoneRegex.test(data.telefone_advogado)) {
            alert('Telefone inválido');
            return;
        }
        
        // Obter a foto do advogado
        const fotoInput = document.getElementById('foto_advogado');
        const fotoUrl = fotoInput.files.length > 0 ? URL.createObjectURL(fotoInput.files[0]) : '../Imagens/default-avatar.png';
        
        // Criar nova linha na tabela
        const tbody = document.querySelector('.advogado-table tbody');
        const newRow = document.createElement('tr');
        newRow.innerHTML = `
            <td class="advogado-photo">
                <img src="${fotoUrl}" alt="Foto do Advogado">
            </td>
            <td>${codigoAdvogado}</td>
            <td>${data.nome_advogado}</td>
            <td>${data.oab}</td>
            <td>${data.email_advogado}</td>
            <td>
                <button class='action-btn view-btn'>Ver</button>
                <button class='action-btn edit-btn'>Editar</button>
                <button class='action-btn delete-btn'>Excluir</button>
            </td>
        `;
        tbody.insertBefore(newRow, tbody.firstChild);
        
        // Limpar o formulário e fechar o modal
        form.reset();
        document.getElementById('foto_advogado_preview').src = '../Imagens/default-avatar.png';
        closeNovoAdvogadoModal();
    }
}

// Função para salvar tribunal
function salvarTribunal(formId) {
    const form = document.getElementById(formId);
    if (form) {
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());
        
        // Gera o código do tribunal
        const codigoTribunal = gerarCodigoSequencial('tribunal');
        data.codigo = codigoTribunal;
        
        // Validações básicas
        if (!data.nome_tribunal) {
            alert('Nome do tribunal é obrigatório');
            return;
        }
        if (!data.tipo_tribunal) {
            alert('Tipo do tribunal é obrigatório');
            return;
        }
        if (!data.estado_tribunal) {
            alert('Estado é obrigatório');
            return;
        }
        
        // Criar nova linha na tabela
        const tbody = document.querySelector('.tribunal-table tbody');
        const newRow = document.createElement('tr');
        
        newRow.innerHTML = `
            <td>${codigoTribunal}</td>
            <td>${data.nome_tribunal}</td>
            <td>${data.tipo_tribunal}</td>
            <td>${data.estado_tribunal}</td>
            <td>${data.endereco_tribunal}, ${data.numero_tribunal}</td>
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
        closeNovoTribunalModal();
        
        // Aqui você pode adicionar a lógica para salvar no banco de dados
        console.log('Dados do tribunal:', data);
    }
}

function salvarVara(formId) {
    const form = document.getElementById(formId);
    if (form) {
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());
        console.log('Dados da vara:', data);
        form.reset();
        closeNovaVaraModal();
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

    // Máscara para campos de telefone
    const camposTelefone = document.querySelectorAll('.phone-input');
    camposTelefone.forEach(input => {
        input.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            if (value.length <= 11) {
                value = value.replace(/^(\d{2})(\d)/g, '($1) $2');
                value = value.replace(/(\d)(\d{4})$/, '$1-$2');
                e.target.value = value;
            }
        });
    });

    // Máscara para campos de CPF/CNPJ
    const camposDocumento = document.querySelectorAll('.document-input');
    camposDocumento.forEach(input => {
        input.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            if (value.length <= 11) {
                value = value.replace(/^(\d{3})(\d)/g, '$1.$2');
                value = value.replace(/^(\d{3})\.(\d{3})(\d)/g, '$1.$2.$3');
                value = value.replace(/\.(\d{3})(\d)/g, '.$1-$2');
            } else {
                value = value.replace(/^(\d{2})(\d)/g, '$1.$2');
                value = value.replace(/^(\d{2})\.(\d{3})(\d)/g, '$1.$2.$3');
                value = value.replace(/\.(\d{3})(\d)/g, '.$1/$2');
                value = value.replace(/(\d{4})(\d)/g, '$1-$2');
            }
            e.target.value = value;
        });
    });

    // Máscara para campo de CEP
    const camposCep = document.querySelectorAll('.cep-input');
    camposCep.forEach(input => {
        input.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            if (value.length <= 8) {
                value = value.replace(/^(\d{5})(\d)/g, '$1-$2');
                e.target.value = value;
            }
        });

        // Busca de CEP
        input.addEventListener('blur', function() {
            const cep = this.value.replace(/\D/g, '');
            if (cep.length === 8) {
                buscarCep(cep);
            }
        });
    });

    // Ajustar máscara de documento baseado no tipo de pessoa
    const tipoPessoaSelect = document.getElementById('tipo_pessoa');
    if (tipoPessoaSelect) {
        tipoPessoaSelect.addEventListener('change', function() {
            const documentoInput = document.getElementById('documento');
            if (documentoInput) {
                documentoInput.value = '';
                if (this.value === 'PF') {
                    documentoInput.placeholder = '000.000.000-00';
                } else if (this.value === 'PJ') {
                    documentoInput.placeholder = '00.000.000/0000-00';
                }
            }
        });
    }
}

// Função para buscar CEP
async function buscarCep(cep) {
    try {
        const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        const data = await response.json();
        
        if (!data.erro) {
            document.getElementById('endereco').value = data.logradouro;
            document.getElementById('bairro').value = data.bairro;
            document.getElementById('cidade').value = data.localidade;
            document.getElementById('estado').value = data.uf;
        }
    } catch (error) {
        console.error('Erro ao buscar CEP:', error);
    }
}

// Função para manipular o upload de foto
function handlePhotoUpload() {
    const photoInput = document.getElementById('foto_cliente');
    const photoPreview = document.getElementById('foto_preview');
    const photoContainer = document.querySelector('.photo-preview');

    // Adiciona evento de clique na área da foto
    photoContainer.addEventListener('click', () => {
        photoInput.click();
    });

    // Adiciona evento de mudança no input de arquivo
    photoInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
            // Verifica se o arquivo é uma imagem
            if (!file.type.startsWith('image/')) {
                alert('Por favor, selecione apenas arquivos de imagem.');
                return;
            }

            // Verifica o tamanho do arquivo (máximo 5MB)
            if (file.size > 5 * 1024 * 1024) {
                alert('A imagem deve ter no máximo 5MB.');
                return;
            }

            // Cria um objeto URL para a imagem
            const reader = new FileReader();
            reader.onload = (e) => {
                photoPreview.src = e.target.result;
            };
            reader.readAsDataURL(file);
        }
    });
}

// Função para salvar usuário
function salvarUsuario(formId) {
    const form = document.getElementById(formId);
    if (form) {
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());
        
        // Gera o código do usuário
        const codigoUsuario = gerarCodigoSequencial('usuario');
        data.codigo = codigoUsuario;
        
        // Validações básicas
        if (!data.nome_usuario) {
            alert('Nome do usuário é obrigatório');
            return;
        }
        if (!data.email_usuario) {
            alert('E-mail é obrigatório');
            return;
        }
        if (!data.login_usuario) {
            alert('Login é obrigatório');
            return;
        }
        if (!data.senha_usuario) {
            alert('Senha é obrigatória');
            return;
        }
        if (data.senha_usuario !== data.confirmar_senha) {
            alert('As senhas não coincidem');
            return;
        }
        
        // Validação de e-mail
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(data.email_usuario)) {
            alert('E-mail inválido');
            return;
        }
        
        // Obter a foto do usuário
        const fotoInput = document.getElementById('foto_usuario');
        const fotoUrl = fotoInput.files.length > 0 ? URL.createObjectURL(fotoInput.files[0]) : '../Imagens/default-avatar.png';
        
        // Criar nova linha na tabela
        const tbody = document.querySelector('.user-table tbody');
        const newRow = document.createElement('tr');
        
        newRow.innerHTML = `
            <td class="user-photo">
                <img src="${fotoUrl}" alt="Foto do Usuário">
            </td>
            <td>${codigoUsuario}</td>
            <td>${data.nome_usuario}</td>
            <td>${data.email_usuario}</td>
            <td>${data.perfil_usuario}</td>
            <td><span class="status-badge ${data.status_usuario.toLowerCase()}">${data.status_usuario}</span></td>
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
        document.getElementById('foto_usuario_preview').src = '../Imagens/default-avatar.png';
        closeNovoUsuarioModal();
        
        // Aqui você pode adicionar a lógica para salvar no banco de dados
        console.log('Dados do usuário:', data);
    }
}

// Modal de Petição
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

function closeNovaPeticaoModal() {
    const modal = document.getElementById('modal-nova-peticao');
    if (modal) {
        modal.classList.remove('show');
    }
}

// Modal de Contrato
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

function closeNovoContratoModal() {
    const modal = document.getElementById('modal-novo-contrato');
    if (modal) {
        modal.classList.remove('show');
    }
}

// Modal de Modelo
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
            <td>Petição</td>
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
            <td>Contrato</td>
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
            <td>Modelo</td>
            <td>${data.titulo_modelo}</td>
            <td>-</td>
            <td>-</td>
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
        const texto = conteudoModelo.value;
        const novoTexto = texto.substring(0, start) + variavel + texto.substring(end);
        conteudoModelo.value = novoTexto;
        conteudoModelo.focus();
        conteudoModelo.setSelectionRange(start + variavel.length, start + variavel.length);
    }
}

// Inicializa as funções quando o documento estiver pronto
document.addEventListener('DOMContentLoaded', function() {
    inicializarFormularios();
    handlePhotoUpload();
    // Adicionar eventos de clique para as variáveis do modelo
    document.querySelectorAll('.variable-tag').forEach(tag => {
        tag.addEventListener('click', function() {
            inserirVariavelModelo(this.textContent);
        });
    });
}); 