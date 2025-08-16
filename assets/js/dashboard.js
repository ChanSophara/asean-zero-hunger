document.addEventListener('DOMContentLoaded', function() {
    // Initialize all charts
    initCharts();


    // Auto-select Indonesia, Vietnam, and Thailand for comparison
    setTimeout(() => {
        document.getElementById('compare-country1').value = 'Indonesia';
        document.getElementById('compare-country2').value = 'Vietnam';
        document.getElementById('compare-country3').value = 'Thailand';
        updateComparison();
    }, 500);
    
    // Chart type toggle functionality
    document.querySelectorAll('.chart-btn').forEach(button => {
        button.addEventListener('click', function() {
            const chartId = this.getAttribute('data-chart');
            const chartType = this.getAttribute('data-type');
            
            // Remove active class from all buttons in this group
            this.parentElement.querySelectorAll('.chart-btn').forEach(btn => {
                btn.classList.remove('active');
            });
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Change chart type
            changeChartType(chartId, chartType);
        });
    });
    
    function changeChartType(chartId, type) {
        const chart = Chart.getChart(chartId + 'Chart');
        if (chart) {
            // Destroy the current chart
            chart.destroy();
            
            // Create new chart of the selected type
            switch(chartId) {
                case 'production':
                    if (type === 'radar') {
                        createProductionRadarChart();
                    } else {
                        createProductionChart();
                    }
                    break;
                case 'insecurity':
                    if (type === 'pie') {
                        createInsecurityPieChart();
                    } else {
                        createInsecurityChart();
                    }
                    break;
                default:
                    // Default behavior for other charts
                    chart.config.type = type;
                    chart.update();
            }
        }
    }
    
    // Tab functionality
    document.querySelectorAll('.tab-btn').forEach(button => {
        button.addEventListener('click', function() {
            const tabId = this.getAttribute('data-tab');
            
            // Remove active class from all buttons and content
            this.parentElement.querySelectorAll('.tab-btn').forEach(btn => {
                btn.classList.remove('active');
            });
            
            document.querySelectorAll('.tab-content').forEach(content => {
                content.classList.remove('active');
            });
            
            // Add active class to clicked button and corresponding content
            this.classList.add('active');
            document.getElementById(`${tabId}-tab`).classList.add('active');
        });
    });
    
    // Country comparison functionality
    document.querySelectorAll('.comparison-selector select').forEach(select => {
        select.addEventListener('change', updateComparison);
    });
    
    // Country data for comparison
    const countryData = {
        'Indonesia': {
            production: 163,
            imports: 1.93,
            exports: 0.027,
            undernourishment: 7.2,
            gdp: 11000,
            insecurity: 19.9
        },
        'Vietnam': {
            production: 130,
            imports: 2.773,
            exports: 26.684,
            undernourishment: 5.2,
            gdp: 10000,
            insecurity: 5.1
        },
        'Thailand': {
            production: 99,
            imports: 0.267,
            exports: 27.779,
            undernourishment: 5.6,
            gdp: 20000,
            insecurity: 4.0
        },
        'Philippines': {
            production: 59,
            imports: 12.584,
            exports: 0.002,
            undernourishment: 5.9,
            gdp: 8000,
            insecurity: 6.9
        },
        'Myanmar': {
            production: 81,
            imports: 0.044,
            exports: 8.426,
            undernourishment: 5.3,
            gdp: 5000,
            insecurity: 2.9
        },
        'Cambodia': {
            production: 36,
            imports: 0.055,
            exports: 3.213,
            undernourishment: 4.6,
            gdp: 4000,
            insecurity: 0.8
        },
        'Laos': {
            production: 10,
            imports: 0.448,
            exports: 0.391,
            undernourishment: 5.4,
            gdp: 3000,
            insecurity: 0.4
        },
        'Malaysia': {
            production: 6.8,
            imports: 5.803,
            exports: 0.543,
            undernourishment: 2.5,
            gdp: 25000,
            insecurity: 0.1
        },
        'Timor-Leste': {
            production: 0.213,
            imports: 0.912,
            exports: 0,
            undernourishment: 15.9,
            gdp: 2000,
            insecurity: 0.2
        },
        'Brunei': {
            production: 0.011,
            imports: 0.1,
            exports: 0,
            undernourishment: 3.0,
            gdp: 30000,
            insecurity: 0.01
        }
    };
    
    function updateComparison() {
        const country1 = document.getElementById('compare-country1').value;
        const country2 = document.getElementById('compare-country2').value;
        const country3 = document.getElementById('compare-country3').value;
        
        const selectedCountries = [];
        if (country1) selectedCountries.push(country1);
        if (country2) selectedCountries.push(country2);
        if (country3) selectedCountries.push(country3);
        
        // Update all comparison charts
        updateComparisonChart('comparisonProductionChart', selectedCountries, 'production', 'Production');
        updateComparisonChart('comparisonImportChart', selectedCountries, 'imports', 'Imports');
        updateComparisonChart('comparisonExportChart', selectedCountries, 'exports', 'Exports');
        updateComparisonChart('comparisonUndernourishmentChart', selectedCountries, 'undernourishment', 'Undernourishment');
        updateComparisonChart('comparisonPopulationChart', selectedCountries, 'insecurity', 'Undernourished Population');
        updateComparisonChart('comparisonGDPChart', selectedCountries, 'gdp', 'GDP per Capita');
    }
    
    function updateComparisonChart(chartId, countries, dataKey, label) {
        const ctx = document.getElementById(chartId).getContext('2d');
        const existingChart = Chart.getChart(chartId);
        
        // Prepare datasets
        const datasets = countries.map(country => {
            const color = getCountryColor(country);
            return {
                label: country,
                data: [countryData[country][dataKey]],
                backgroundColor: `rgba(${color.r}, ${color.g}, ${color.b}, 0.7)`,
                borderColor: `rgba(${color.r}, ${color.g}, ${color.b}, 1)`,
                borderWidth: 1,
                borderRadius: 5
            };
        });
        
        // If no countries selected, show empty state
        if (countries.length === 0) {
            if (existingChart) {
                existingChart.data.labels = ['Select countries to compare'];
                existingChart.data.datasets = [];
                existingChart.options.plugins.legend.display = false;
                existingChart.options.plugins.tooltip.enabled = false;
                existingChart.update();
            }
            return;
        }
        
        // If chart already exists, update it
        if (existingChart) {
            existingChart.data.labels = [label];
            existingChart.data.datasets = datasets;
            existingChart.options.plugins.legend.display = true;
            existingChart.options.plugins.tooltip.enabled = true;
            existingChart.update();
            return;
        }
        
        // Create new chart if it doesn't exist
        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: [label],
                datasets: datasets
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'top',
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                let suffix = '';
                                if (dataKey === 'undernourishment') {
                                    suffix = '%';
                                } else if (dataKey === 'gdp') {
                                    return `${context.dataset.label}: $${context.raw.toLocaleString()}`;
                                } else if (dataKey === 'insecurity') {
                                    suffix = ' million';
                                } else {
                                    suffix = ' million tons';
                                }
                                return `${context.dataset.label}: ${context.raw}${suffix}`;
                            }
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    }
    
    function getCountryColor(country) {
        // Assign consistent colors to countries
        const colors = {
            'Indonesia': { r: 0, g: 102, b: 204 },
            'Vietnam': { r: 220, g: 53, b: 69 },
            'Thailand': { r: 0, g: 168, b: 107 },
            'Philippines': { r: 255, g: 193, b: 7 },
            'Myanmar': { r: 108, g: 117, b: 125 },
            'Cambodia': { r: 111, g: 66, b: 193 },
            'Laos': { r: 253, g: 126, b: 20 },
            'Malaysia': { r: 32, g: 201, b: 151 },
            'Timor-Leste': { r: 214, g: 51, b: 132 },
            'Brunei': { r: 13, g: 110, b: 253 }
        };
        return colors[country] || { r: 100, g: 100, b: 100 };
    }
    
    // Trend selector functionality
    document.getElementById('trend-selector').addEventListener('change', function() {
        const selectedTrend = this.value;
        updateTrendChart(selectedTrend);
    });
    
    function updateTrendChart(trend) {
        const trendChart = Chart.getChart('trendChart');
        if (!trendChart) return;
        
        // Update chart based on selected trend
        switch(trend) {
            case 'production':
                trendChart.data.datasets = [
                    {
                        label: 'Indonesia',
                        data: [140, 145, 150, 155, 158, 160, 162, 163, 165],
                        borderColor: 'rgba(0, 102, 204, 1)',
                        backgroundColor: 'rgba(0, 102, 204, 0.1)',
                        borderWidth: 2,
                        tension: 0.3,
                        fill: true
                    },
                    {
                        label: 'Vietnam',
                        data: [115, 120, 123, 125, 127, 129, 130, 131, 132],
                        borderColor: 'rgba(220, 53, 69, 1)',
                        backgroundColor: 'rgba(220, 53, 69, 0.1)',
                        borderWidth: 2,
                        tension: 0.3,
                        fill: true
                    },
                    {
                        label: 'Thailand',
                        data: [90, 92, 94, 96, 97, 98, 99, 100, 101],
                        borderColor: 'rgba(0, 168, 107, 1)',
                        backgroundColor: 'rgba(0, 168, 107, 0.1)',
                        borderWidth: 2,
                        tension: 0.3,
                        fill: true
                    }
                ];
                trendChart.options.scales.y.title.text = 'Million Tons';
                break;
                
            case 'undernourishment':
                trendChart.data.datasets = [
                    {
                        label: 'Indonesia',
                        data: [9.5, 9.2, 8.8, 8.5, 8.0, 7.8, 7.5, 7.3, 7.2],
                        borderColor: 'rgba(0, 102, 204, 1)',
                        backgroundColor: 'rgba(0, 102, 204, 0.1)',
                        borderWidth: 2,
                        tension: 0.3,
                        fill: true
                    },
                    {
                        label: 'Vietnam',
                        data: [6.5, 6.2, 6.0, 5.8, 5.6, 5.4, 5.3, 5.2, 5.1],
                        borderColor: 'rgba(220, 53, 69, 1)',
                        backgroundColor: 'rgba(220, 53, 69, 0.1)',
                        borderWidth: 2,
                        tension: 0.3,
                        fill: true
                    },
                    {
                        label: 'Philippines',
                        data: [7.5, 7.2, 7.0, 6.8, 6.5, 6.2, 6.0, 5.9, 5.8],
                        borderColor: 'rgba(255, 193, 7, 1)',
                        backgroundColor: 'rgba(255, 193, 7, 0.1)',
                        borderWidth: 2,
                        tension: 0.3,
                        fill: true
                    }
                ];
                trendChart.options.scales.y.title.text = 'Percentage';
                break;
                
            case 'exports':
                trendChart.data.datasets = [
                    {
                        label: 'Thailand',
                        data: [22, 23, 24, 25, 26, 26.5, 27, 27.5, 27.8],
                        borderColor: 'rgba(0, 168, 107, 1)',
                        backgroundColor: 'rgba(0, 168, 107, 0.1)',
                        borderWidth: 2,
                        tension: 0.3,
                        fill: true
                    },
                    {
                        label: 'Vietnam',
                        data: [20, 21, 22, 23, 24, 25, 26, 26.5, 26.7],
                        borderColor: 'rgba(220, 53, 69, 1)',
                        backgroundColor: 'rgba(220, 53, 69, 0.1)',
                        borderWidth: 2,
                        tension: 0.3,
                        fill: true
                    },
                    {
                        label: 'Cambodia',
                        data: [1.5, 1.8, 2.0, 2.3, 2.5, 2.8, 3.0, 3.1, 3.2],
                        borderColor: 'rgba(111, 66, 193, 1)',
                        backgroundColor: 'rgba(111, 66, 193, 0.1)',
                        borderWidth: 2,
                        tension: 0.3,
                        fill: true
                    }
                ];
                trendChart.options.scales.y.title.text = 'Million Tons';
                break;
                
            case 'imports':
                trendChart.data.datasets = [
                    {
                        label: 'Philippines',
                        data: [10, 10.5, 11, 11.5, 12, 12.3, 12.5, 12.6, 12.6],
                        borderColor: 'rgba(255, 193, 7, 1)',
                        backgroundColor: 'rgba(255, 193, 7, 0.1)',
                        borderWidth: 2,
                        tension: 0.3,
                        fill: true
                    },
                    {
                        label: 'Malaysia',
                        data: [4.5, 5.0, 5.2, 5.5, 5.7, 5.8, 5.8, 5.8, 5.8],
                        borderColor: 'rgba(32, 201, 151, 1)',
                        backgroundColor: 'rgba(32, 201, 151, 0.1)',
                        borderWidth: 2,
                        tension: 0.3,
                        fill: true
                    },
                    {
                        label: 'Indonesia',
                        data: [1.5, 1.6, 1.7, 1.8, 1.9, 1.92, 1.93, 1.93, 1.94],
                        borderColor: 'rgba(0, 102, 204, 1)',
                        backgroundColor: 'rgba(0, 102, 204, 0.1)',
                        borderWidth: 2,
                        tension: 0.3,
                        fill: true
                    }
                ];
                trendChart.options.scales.y.title.text = 'Million Tons';
                break;
        }
        
        trendChart.update();
    }
    
    // Initialize all charts
    function initCharts() {
        // Production Chart
        createProductionChart();
        
        // Import Chart
        createImportChart();
        
        // Export Chart
        createExportChart();
        
        // Insecurity Chart
        createInsecurityChart();
        
        // Gender Chart
        createGenderChart();
        
        // Population Chart
        createPopulationChart();
        
        // Trend Chart
        createTrendChart();
        
        // Initialize empty comparison charts
        const comparisonChartIds = [
            'comparisonProductionChart',
            'comparisonImportChart',
            'comparisonExportChart',
            'comparisonUndernourishmentChart',
            'comparisonPopulationChart',
            'comparisonGDPChart'
        ];
        
        comparisonChartIds.forEach(id => {
            const ctx = document.getElementById(id).getContext('2d');
            new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: ['Select countries to compare'],
                    datasets: []
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            display: false
                        },
                        tooltip: {
                            enabled: false
                        }
                    },
                    scales: {
                        y: {
                            beginAtZero: true
                        }
                    }
                }
            });
        });
    }
    
    function createProductionChart() {
        const ctx = document.getElementById('productionChart').getContext('2d');
        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['Indonesia', 'Vietnam', 'Thailand', 'Myanmar', 'Philippines', 'Cambodia', 'Laos', 'Malaysia', 'Timor-Leste', 'Brunei'],
                datasets: [{
                    label: 'Rice Production (million tons) 2021-2023',
                    data: [163, 130, 99, 81, 59, 36, 10, 6.8, 0.213, 0.011],
                    backgroundColor: 'rgba(0, 102, 204, 0.7)',
                    borderColor: 'rgba(0, 102, 204, 1)',
                    borderWidth: 1,
                    borderRadius: 5
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'top',
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                return `${context.dataset.label}: ${context.raw.toLocaleString()} million tons`;
                            }
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: 'Million Tons'
                        }
                    }
                }
            }
        });
    }
    
    function createProductionRadarChart() {
        const ctx = document.getElementById('productionChart').getContext('2d');
        new Chart(ctx, {
            type: 'radar',
            data: {
                labels: ['Indonesia', 'Vietnam', 'Thailand', 'Myanmar', 'Philippines', 'Cambodia', 'Laos', 'Malaysia', 'Timor-Leste', 'Brunei'],
                datasets: [{
                    label: 'Rice Production (million tons)',
                    data: [163, 130, 99, 81, 59, 36, 10, 6.8, 0.213, 0.011],
                    backgroundColor: 'rgba(0, 102, 204, 0.2)',
                    borderColor: 'rgba(0, 102, 204, 1)',
                    borderWidth: 2,
                    pointBackgroundColor: 'rgba(0, 102, 204, 1)'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'top',
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                return `${context.dataset.label}: ${context.raw.toLocaleString()} million tons`;
                            }
                        }
                    }
                },
                scales: {
                    r: {
                        angleLines: {
                            display: true
                        },
                        suggestedMin: 0,
                        suggestedMax: 180
                    }
                }
            }
        });
    }
    
    function createImportChart() {
        const ctx = document.getElementById('importChart').getContext('2d');
        new Chart(ctx, {
            type: 'pie',
            data: {
                labels: ['Philippines', 'Malaysia', 'Vietnam', 'Indonesia', 'Timor-Leste', 'Laos', 'Thailand', 'Cambodia', 'Myanmar'],
                datasets: [{
                    label: 'Rice Imports (thousand tons) 2020-2022',
                    data: [12584, 5803, 2773, 1930, 912, 448, 267, 55, 44],
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.7)',
                        'rgba(54, 162, 235, 0.7)',
                        'rgba(255, 206, 86, 0.7)',
                        'rgba(75, 192, 192, 0.7)',
                        'rgba(153, 102, 255, 0.7)',
                        'rgba(255, 159, 64, 0.7)',
                        'rgba(199, 199, 199, 0.7)',
                        'rgba(83, 102, 255, 0.7)',
                        'rgba(40, 159, 64, 0.7)'
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
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                return `${context.label}: ${context.raw.toLocaleString()} thousand tons`;
                            }
                        }
                    }
                }
            }
        });
    }
    
    function createExportChart() {
        const ctx = document.getElementById('exportChart').getContext('2d');
        new Chart(ctx, {
            type: 'pie',
            data: {
                labels: ['Thailand', 'Vietnam', 'Myanmar', 'Cambodia', 'Malaysia', 'Laos', 'Indonesia', 'Philippines'],
                datasets: [{
                    label: 'Rice Exports (thousand tons) 2020-2022',
                    data: [27779, 26684, 8426, 3213, 543, 391, 27, 2],
                    backgroundColor: [
                        'rgba(0, 168, 107, 0.7)',
                        'rgba(220, 53, 69, 0.7)',
                        'rgba(108, 117, 125, 0.7)',
                        'rgba(111, 66, 193, 0.7)',
                        'rgba(32, 201, 151, 0.7)',
                        'rgba(253, 126, 20, 0.7)',
                        'rgba(0, 102, 204, 0.7)',
                        'rgba(255, 193, 7, 0.7)'
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
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                return `${context.label}: ${context.raw.toLocaleString()} thousand tons`;
                            }
                        }
                    }
                }
            }
        });
    }
    
    function createInsecurityChart() {
        const ctx = document.getElementById('insecurityChart').getContext('2d');
        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['Malaysia', 'Cambodia', 'Vietnam', 'Myanmar', 'Laos', 'Thailand', 'Philippines', 'Indonesia', 'Timor-Leste'],
                datasets: [{
                    label: 'Prevalence of Undernourishment (%) 2023',
                    data: [2.5, 4.6, 5.2, 5.3, 5.4, 5.6, 5.9, 7.2, 15.9],
                    backgroundColor: 'rgba(220, 53, 69, 0.7)',
                    borderColor: 'rgba(220, 53, 69, 1)',
                    borderWidth: 1,
                    borderRadius: 5
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'top',
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                return `${context.dataset.label}: ${context.raw}%`;
                            }
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: 'Percentage'
                        }
                    }
                }
            }
        });
    }
    
    function createInsecurityPieChart() {
        const ctx = document.getElementById('insecurityChart').getContext('2d');
        new Chart(ctx, {
            type: 'pie',
            data: {
                labels: ['Malaysia', 'Cambodia', 'Vietnam', 'Myanmar', 'Laos', 'Thailand', 'Philippines', 'Indonesia', 'Timor-Leste'],
                datasets: [{
                    label: 'Prevalence of Undernourishment (%) 2023',
                    data: [2.5, 4.6, 5.2, 5.3, 5.4, 5.6, 5.9, 7.2, 15.9],
                    backgroundColor: [
                        'rgba(32, 201, 151, 0.7)',
                        'rgba(111, 66, 193, 0.7)',
                        'rgba(220, 53, 69, 0.7)',
                        'rgba(108, 117, 125, 0.7)',
                        'rgba(253, 126, 20, 0.7)',
                        'rgba(0, 168, 107, 0.7)',
                        'rgba(255, 193, 7, 0.7)',
                        'rgba(0, 102, 204, 0.7)',
                        'rgba(214, 51, 132, 0.7)'
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
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                return `${context.label}: ${context.raw}%`;
                            }
                        }
                    }
                }
            }
        });
    }
    
    function createGenderChart() {
        const ctx = document.getElementById('genderChart').getContext('2d');
        new Chart(ctx, {
            type: 'radar',
            data: {
                labels: ['Cambodia', 'Timor-Leste', 'Philippines', 'Laos', 'Myanmar', 'Vietnam', 'Malaysia', 'Singapore', 'Thailand', 'Indonesia'],
                datasets: [
                    {
                        label: 'Female Food Insecurity (%)',
                        data: [54.0, 53.7, 43.8, 36.8, 32.9, 12.5, 14.3, 7.4, 7.6, 5.0],
                        backgroundColor: 'rgba(255, 99, 132, 0.2)',
                        borderColor: 'rgba(255, 99, 132, 1)',
                        borderWidth: 2,
                        pointBackgroundColor: 'rgba(255, 99, 132, 1)'
                    },
                    {
                        label: 'Male Food Insecurity (%)',
                        data: [48.5, 50.2, 40.1, 34.2, 30.5, 11.8, 13.5, 6.9, 7.0, 4.5],
                        backgroundColor: 'rgba(54, 162, 235, 0.2)',
                        borderColor: 'rgba(54, 162, 235, 1)',
                        borderWidth: 2,
                        pointBackgroundColor: 'rgba(54, 162, 235, 1)'
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'top',
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                return `${context.dataset.label}: ${context.raw}%`;
                            }
                        }
                    }
                },
                scales: {
                    r: {
                        angleLines: {
                            display: true
                        },
                        suggestedMin: 0,
                        suggestedMax: 60
                    }
                }
            }
        });
    }
    
    function createPopulationChart() {
        const ctx = document.getElementById('populationChart').getContext('2d');
        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['Indonesia', 'Philippines', 'Vietnam', 'Thailand', 'Myanmar', 'Cambodia', 'Laos', 'Timor-Leste'],
                datasets: [{
                    label: 'Number of Undernourished People (million) 2021-2023',
                    data: [19.9, 6.9, 5.1, 4.0, 2.9, 0.8, 0.4, 0.2],
                    backgroundColor: 'rgba(220, 53, 69, 0.7)',
                    borderColor: 'rgba(220, 53, 69, 1)',
                    borderWidth: 1,
                    borderRadius: 5
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'top',
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                return `${context.dataset.label}: ${context.raw.toLocaleString()} million`;
                            }
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: 'Millions'
                        }
                    }
                }
            }
        });
    }
    
    function createTrendChart() {
        const ctx = document.getElementById('trendChart').getContext('2d');
        new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['2015', '2016', '2017', '2018', '2019', '2020', '2021', '2022', '2023'],
                datasets: [
                    {
                        label: 'Indonesia',
                        data: [140, 145, 150, 155, 158, 160, 162, 163, 165],
                        borderColor: 'rgba(0, 102, 204, 1)',
                        backgroundColor: 'rgba(0, 102, 204, 0.1)',
                        borderWidth: 2,
                        tension: 0.3,
                        fill: true
                    },
                    {
                        label: 'Vietnam',
                        data: [115, 120, 123, 125, 127, 129, 130, 131, 132],
                        borderColor: 'rgba(220, 53, 69, 1)',
                        backgroundColor: 'rgba(220, 53, 69, 0.1)',
                        borderWidth: 2,
                        tension: 0.3,
                        fill: true
                    },
                    {
                        label: 'Thailand',
                        data: [90, 92, 94, 96, 97, 98, 99, 100, 101],
                        borderColor: 'rgba(0, 168, 107, 1)',
                        backgroundColor: 'rgba(0, 168, 107, 0.1)',
                        borderWidth: 2,
                        tension: 0.3,
                        fill: true
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'top',
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                return `${context.dataset.label}: ${context.raw} million tons`;
                            }
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: false,
                        title: {
                            display: true,
                            text: 'Million Tons'
                        }
                    }
                }
            }
        });
    }
});