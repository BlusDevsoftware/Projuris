// Máscara para telefone
function aplicarMascaraTelefone(input) {
    input.addEventListener('input', function(e) {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length <= 11) {
            value = value.replace(/^(\d{2})(\d)/g, '($1) $2');
            value = value.replace(/(\d)(\d{4})$/, '$1-$2');
            e.target.value = value;
        }
    });
}

// Máscara para CPF
function aplicarMascaraCPF(input) {
    input.addEventListener('input', function(e) {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length <= 11) {
            value = value.replace(/^(\d{3})(\d)/g, '$1.$2');
            value = value.replace(/^(\d{3})\.(\d{3})(\d)/g, '$1.$2.$3');
            value = value.replace(/\.(\d{3})(\d)/g, '.$1-$2');
        }
        e.target.value = value;
    });
}

// Máscara para CEP
function aplicarMascaraCEP(input) {
    input.addEventListener('input', function(e) {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length <= 8) {
            value = value.replace(/^(\d{5})(\d)/g, '$1-$2');
            e.target.value = value;
        }
    });
    input.addEventListener('blur', function() {
        const cep = this.value.replace(/\D/g, '');
        if (cep.length === 8) buscarCepAdvogado(cep);
    });
}

// Busca de CEP
async function buscarCepAdvogado(cep) {
    try {
        const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        const data = await response.json();
        if (!data.erro) {
            document.getElementById('endereco_advogado').value = data.logradouro;
            document.getElementById('bairro_advogado').value = data.bairro;
            document.getElementById('cidade_advogado').value = data.localidade;
            document.getElementById('estado_advogado').value = data.uf;
        }
    } catch (error) {
        console.error('Erro ao buscar CEP:', error);
    }
}

// Preview da foto
function handlePhotoUploadAdvogado() {
    const preview = document.getElementById('foto_advogado_preview');
    const input = document.getElementById('foto_advogado');
    const overlay = preview.parentElement.querySelector('.photo-overlay');
    preview.parentElement.addEventListener('click', () => input.click());
    overlay.addEventListener('click', () => input.click());
    input.addEventListener('change', function() {
        if (this.files && this.files[0]) {
            const file = this.files[0];
            if (!file.type.startsWith('image/')) {
                alert('Selecione uma imagem válida.');
                input.value = '';
                return;
            }
            if (file.size > 5 * 1024 * 1024) {
                alert('A imagem deve ter no máximo 5MB.');
                input.value = '';
                return;
            }
            const reader = new FileReader();
            reader.onload = function(e) {
                preview.src = e.target.result;
            };
            reader.readAsDataURL(file);
        }
    });
}

// Inicializar máscaras e preview ao abrir modal
function inicializarModalAdvogado() {
    aplicarMascaraTelefone(document.getElementById('telefone_advogado'));
    aplicarMascaraTelefone(document.getElementById('celular_advogado'));
    aplicarMascaraCPF(document.getElementById('cpf_advogado'));
    aplicarMascaraCEP(document.getElementById('cep_advogado'));
    handlePhotoUploadAdvogado();
}

document.addEventListener('DOMContentLoaded', function() {
    // Inicializar ao abrir modal
    document.querySelector('.add-advogado-btn').addEventListener('click', function() {
        inicializarModalAdvogado();
    });
});

// Função para salvar advogado (exemplo, pode ser expandida)
function salvarAdvogado(formId) {
    const form = document.getElementById(formId);
    if (form) {
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());
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