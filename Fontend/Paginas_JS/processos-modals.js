// Funções para gerenciar os modais do módulo de processos

// Modal de Novo Processo
function showNovoProcessoModal() {
    const modal = document.getElementById('novo-processo-modal');
    modal.classList.add('show');
}

function closeNovoProcessoModal() {
    const modal = document.getElementById('novo-processo-modal');
    modal.classList.remove('show');
}

// Modal de Audiência
function showAudienciaModal() {
    const modal = document.getElementById('audiencia-modal');
    modal.classList.add('show');
}

function closeAudienciaModal() {
    const modal = document.getElementById('audiencia-modal');
    modal.classList.remove('show');
}

// Modal de Prazo
function showPrazoModal() {
    const modal = document.getElementById('prazo-modal');
    modal.classList.add('show');
}

function closePrazoModal() {
    const modal = document.getElementById('prazo-modal');
    modal.classList.remove('show');
}

// Função genérica para fechar modais ao clicar fora
window.onclick = function(event) {
    const modals = document.getElementsByClassName('modal');
    for (let modal of modals) {
        if (event.target == modal) {
            modal.classList.remove('show');
        }
    }
}

// Função para salvar os dados do formulário de processo
function salvarProcesso(formId) {
    const form = document.getElementById(formId);
    const formData = new FormData(form);
    
    // Aqui você pode adicionar a lógica para enviar os dados para o backend
    console.log('Dados do processo:', Object.fromEntries(formData));
    
    // Fecha o modal após salvar
    const modal = form.closest('.modal');
    modal.classList.remove('show');
    
    // Limpa o formulário
    form.reset();
}

// Função para salvar os dados do formulário de audiência
function salvarAudiencia(formId) {
    const form = document.getElementById(formId);
    const formData = new FormData(form);
    
    // Aqui você pode adicionar a lógica para enviar os dados para o backend
    console.log('Dados da audiência:', Object.fromEntries(formData));
    
    // Fecha o modal após salvar
    const modal = form.closest('.modal');
    modal.classList.remove('show');
    
    // Limpa o formulário
    form.reset();
}

// Função para salvar os dados do formulário de prazo
function salvarPrazo(formId) {
    const form = document.getElementById(formId);
    const formData = new FormData(form);
    
    // Aqui você pode adicionar a lógica para enviar os dados para o backend
    console.log('Dados do prazo:', Object.fromEntries(formData));
    
    // Fecha o modal após salvar
    const modal = form.closest('.modal');
    modal.classList.remove('show');
    
    // Limpa o formulário
    form.reset();
}

// Função para formatar valores monetários
function formatarValorMonetario(input) {
    let value = input.value.replace(/\D/g, '');
    value = (parseInt(value) / 100).toFixed(2);
    input.value = value.replace('.', ',');
}

// Função para inicializar máscaras e validações
function inicializarFormularios() {
    // Máscara para campos monetários
    document.querySelectorAll('.valor-monetario').forEach(input => {
        input.addEventListener('input', function() {
            formatarValorMonetario(this);
        });
    });
    
    // Validação de datas
    document.querySelectorAll('input[type="date"]').forEach(input => {
        input.addEventListener('change', function() {
            const data = new Date(this.value);
            if (isNaN(data.getTime())) {
                this.setCustomValidity('Data inválida');
            } else {
                this.setCustomValidity('');
            }
        });
    });

    // Validação de hora
    document.querySelectorAll('input[type="time"]').forEach(input => {
        input.addEventListener('change', function() {
            const hora = this.value;
            if (!hora) {
                this.setCustomValidity('Hora inválida');
            } else {
                this.setCustomValidity('');
            }
        });
    });
}

// Inicializa os formulários quando o documento estiver pronto
document.addEventListener('DOMContentLoaded', inicializarFormularios); 