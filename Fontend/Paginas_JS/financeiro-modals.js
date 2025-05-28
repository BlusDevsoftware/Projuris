// Funções para gerenciar os modais do módulo financeiro

// Função para gerar número do título
function gerarNumeroTitulo(tipo) {
    // Prefixo baseado no tipo (2 caracteres)
    let prefixo;
    switch(tipo) {
        case 'lancamento':
            prefixo = 'LA';
            break;
        case 'recebimento':
            prefixo = 'RE';
            break;
        case 'pagamento':
            prefixo = 'PA';
            break;
        default:
            prefixo = 'DO';
    }
    
    // Gera um número sequencial de 3 dígitos
    const numero = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
    
    return `${prefixo}${numero}`;
}

// Modal de Novo Lançamento
function showNovoLancamentoModal() {
    const modal = document.getElementById('novo-lancamento-modal');
    // Gera o número do título ao abrir o modal
    document.getElementById('numero-titulo-lancamento').value = gerarNumeroTitulo('lancamento');
    modal.classList.add('show');
}

function closeNovoLancamentoModal() {
    const modal = document.getElementById('novo-lancamento-modal');
    modal.classList.remove('show');
}

// Modal de Novo Recebimento
function showNovoRecebimentoModal() {
    const modal = document.getElementById('novo-recebimento-modal');
    // Gera o número do título ao abrir o modal
    document.getElementById('numero-titulo-recebimento').value = gerarNumeroTitulo('recebimento');
    modal.classList.add('show');
}

function closeNovoRecebimentoModal() {
    const modal = document.getElementById('novo-recebimento-modal');
    modal.classList.remove('show');
}

// Modal de Novo Pagamento
function showNovoPagamentoModal() {
    const modal = document.getElementById('novo-pagamento-modal');
    // Gera o número do título ao abrir o modal
    document.getElementById('numero-titulo-pagamento').value = gerarNumeroTitulo('pagamento');
    modal.classList.add('show');
}

function closeNovoPagamentoModal() {
    const modal = document.getElementById('novo-pagamento-modal');
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

// Função para salvar os dados do formulário
function salvarFormulario(formId) {
    const form = document.getElementById(formId);
    const formData = new FormData(form);
    
    // Aqui você pode adicionar a lógica para enviar os dados para o backend
    console.log('Dados do formulário:', Object.fromEntries(formData));
    
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
}

// Inicializa os formulários quando o documento estiver pronto
document.addEventListener('DOMContentLoaded', inicializarFormularios); 