document.addEventListener('DOMContentLoaded', function() {
    // Configuração do gráfico de processos por status
    const ctx = document.getElementById('processosChart').getContext('2d');
    const processosChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Em Andamento', 'Aguardando Audiência', 'Arquivado', 'Concluído'],
            datasets: [{
                data: [45, 25, 15, 15],
                backgroundColor: [
                    '#4CAF50',  // Verde para Em Andamento
                    '#2196F3',  // Azul para Aguardando Audiência
                    '#FFC107',  // Amarelo para Arquivado
                    '#9C27B0'   // Roxo para Concluído
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'right',
                    labels: {
                        font: {
                            size: 14
                        }
                    }
                },
                title: {
                    display: true,
                    text: 'Distribuição de Processos',
                    font: {
                        size: 16
                    }
                }
            }
        }
    });

    // Inicializa os menus
    initializeMenus();
});

// Função para inicializar o estado dos menus
function initializeMenus() {
    // Encontra o item de menu ativo atual
    const currentPath = window.location.pathname;
    // Remove a barra inicial e divide o caminho, pegando a última parte
    const pathSegments = currentPath.replace(/^\/|\/$/g, '').split('/');
    let currentPage = pathSegments.pop() || 'index.html'; // Define index.html como default

    // Se a página for a raiz do site ou o diretório, defina como index.html
    if (currentPage === 'Fontend' || currentPage === 'Paginas_HTML' || currentPage === '') {
        currentPage = 'index.html';
    }

    // Procura o link correspondente à página atual
    document.querySelectorAll('.nav-menu a').forEach(link => {
        // Compara o href do link com a currentPage
        const linkHref = link.getAttribute('href');
        if (linkHref === currentPage) {
            // Marca o link como ativo
            link.classList.add('active');
            // Abre o submenu pai, se existir
            const parentMenu = link.closest('.has-submenu');
            if (parentMenu) {
                parentMenu.classList.add('active');
            }
        }
    });
}

// Toggle submenu
document.querySelectorAll('.submenu-trigger').forEach(trigger => {
    trigger.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        
        // Toggle apenas o menu clicado
        const parentMenu = this.closest('.has-submenu');
        parentMenu.classList.toggle('active');
    });
});

// Previne que cliques nos itens do submenu fechem o menu
document.querySelectorAll('.submenu a').forEach(link => {
    link.addEventListener('click', function(e) {
        e.stopPropagation();
        
        // Remove active de todos os outros links
        document.querySelectorAll('.submenu a').forEach(otherLink => {
            otherLink.classList.remove('active');
        });
        
        // Adiciona active ao link clicado
        this.classList.add('active');
        
        // Mantém o submenu pai aberto
        const parentMenu = this.closest('.has-submenu');
        if (parentMenu) {
            parentMenu.classList.add('active');
        }
    });
}); 