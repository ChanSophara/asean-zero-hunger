document.addEventListener('DOMContentLoaded', function() {
    // Hide loader when page is loaded
    setTimeout(function() {
        document.querySelector('.loader').style.opacity = '0';
        setTimeout(function() {
            document.querySelector('.loader').style.display = 'none';
        }, 500);
    }, 1000);

    // Mobile navigation toggle
    const navToggle = document.getElementById('navbar-toggler');
    const navMenu = document.getElementById('navbar-menu');
    
    navToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        this.classList.toggle('active');
    });
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                if (navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                    navToggle.classList.remove('active');
                }
            }
        });
    });
    
    // Country filter functionality
    const countryFilter = document.getElementById('country-filter');
    countryFilter.addEventListener('change', function() {
        const selectedCountry = this.value;
        filterChartsByCountry(selectedCountry);
    });
    
    function filterChartsByCountry(country) {
        // This would be implemented to filter all charts based on selected country
        console.log(`Filtering by country: ${country}`);
        // In a real implementation, you would update all chart datasets here
    }
    
    // Chart type toggles
    document.querySelectorAll('.chart-toggle-btn').forEach(button => {
        button.addEventListener('click', function() {
            const chartId = this.getAttribute('data-chart');
            const chartType = this.getAttribute('data-type');
            
            // Remove active class from all buttons in this group
            this.parentElement.querySelectorAll('.chart-toggle-btn').forEach(btn => {
                btn.classList.remove('active');
            });
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Change chart type
            changeChartType(chartId, chartType);
        });
    });
    
    function changeChartType(chartId, type) {
        const chart = Chart.getChart(chartId);
        if (chart) {
            chart.config.type = type;
            chart.update();
        }
    }
    
    // Tab functionality
    const tabButtons = document.querySelectorAll('.tab-btn');
    tabButtons.forEach(button => {
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
    
    // Initialize all charts
    initializeCharts();
    
    function initializeCharts() {
        // Production Chart
        createProductionChart();
        
        // Import Chart
        createImportChart();
        
        // Export Chart
        createExportChart();
        
        // Nutrition Chart
        createNutritionChart();
        
        // Dietary Charts
        createAvgDietChart();
        createMinDietChart();
        
        // Insecurity Charts
        createInsecurityChart();
        createUndernourishmentChart();
        createFemaleInsecurityChart();
        
        // Gender Comparison Chart
        createGenderComparisonChart();
        
        // Affected Population Chart
        createAffectedPopulationChart();
        
        // Comparison Chart
        createComparisonChart();
        
        // Trend Chart
        createTrendChart();
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
                    },
                    x: {
                        grid: {
                            display: false
                        }
                    }
                },
                animation: {
                    duration: 1000
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
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)',
                        'rgba(199, 199, 199, 1)',
                        'rgba(83, 102, 255, 1)',
                        'rgba(40, 159, 64, 1)'
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
                },
                animation: {
                    duration: 1000
                }
            }
        });
    }
    
    function createExportChart() {
        const ctx = document.getElementById('exportChart').getContext('2d');
        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['Thailand', 'Vietnam', 'Myanmar', 'Cambodia', 'Malaysia', 'Laos', 'Indonesia', 'Philippines'],
                datasets: [{
                    label: 'Rice Exports (thousand tons) 2020-2022',
                    data: [27779, 26684, 8426, 3213, 543, 391, 27, 2],
                    backgroundColor: 'rgba(0, 168, 107, 0.7)',
                    borderColor: 'rgba(0, 168, 107, 1)',
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
                                return `${context.dataset.label}: ${context.raw.toLocaleString()} thousand tons`;
                            }
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: 'Thousand Tons'
                        }
                    },
                    x: {
                        grid: {
                            display: false
                        }
                    }
                },
                animation: {
                    duration: 1000
                }
            }
        });
    }
    
    function createNutritionChart() {
        const ctx = document.getElementById('nutritionChart').getContext('2d');
        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['Singapore', 'Brunei', 'Malaysia', 'Thailand', 'Indonesia', 'Vietnam', 'Philippines', 'Laos', 'Myanmar', 'Timor-Leste', 'Cambodia'],
                datasets: [{
                    label: 'GDP per capita, PPP (constant 2017 international $)',
                    data: [113000, 79000, 29000, 20000, 11000, 10000, 8600, 7400, 5800, 4300, 4200],
                    backgroundColor: 'rgba(255, 107, 53, 0.7)',
                    borderColor: 'rgba(255, 107, 53, 1)',
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
                                return `${context.dataset.label}: $${context.raw.toLocaleString()}`;
                            }
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: 'International $'
                        }
                    },
                    x: {
                        grid: {
                            display: false
                        }
                    }
                },
                animation: {
                    duration: 1000
                }
            }
        });
    }
    
    function createAvgDietChart() {
        const ctx = document.getElementById('avgDietChart').getContext('2d');
        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['Singapore', 'Brunei', 'Thailand', 'Malaysia', 'Laos', 'Indonesia', 'Myanmar', 'Vietnam', 'Cambodia', 'Philippines', 'Timor-Leste'],
                datasets: [{
                    label: 'Average Dietary Energy Requirement (kcal/cap/day) 2022',
                    data: [2482, 2423, 2447, 2397, 2361, 2316, 2329, 2305, 2302, 2259, 2235],
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
                                return `${context.dataset.label}: ${context.raw} kcal`;
                            }
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: false,
                        min: 2200,
                        title: {
                            display: true,
                            text: 'kcal/cap/day'
                        }
                    },
                    x: {
                        grid: {
                            display: false
                        }
                    }
                },
                animation: {
                    duration: 1000
                }
            }
        });
    }
    
    function createMinDietChart() {
        const ctx = document.getElementById('minDietChart').getContext('2d');
        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['Singapore', 'Brunei', 'Thailand', 'Malaysia', 'Laos', 'Indonesia', 'Myanmar', 'Vietnam', 'Cambodia', 'Philippines', 'Timor-Leste'],
                datasets: [{
                    label: 'Minimum Dietary Energy Requirement (kcal/cap/day) 2022',
                    data: [1912, 1872, 1889, 1850, 1825, 1794, 1802, 1788, 1784, 1750, 1729],
                    backgroundColor: 'rgba(0, 168, 107, 0.7)',
                    borderColor: 'rgba(0, 168, 107, 1)',
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
                                return `${context.dataset.label}: ${context.raw} kcal`;
                            }
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: false,
                        min: 1700,
                        title: {
                            display: true,
                            text: 'kcal/cap/day'
                        }
                    },
                    x: {
                        grid: {
                            display: false
                        }
                    }
                },
                animation: {
                    duration: 1000
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
                    },
                    x: {
                        grid: {
                            display: false
                        }
                    }
                },
                animation: {
                    duration: 1000
                }
            }
        });
    }
    
    function createUndernourishmentChart() {
        const ctx = document.getElementById('undernourishmentChart').getContext('2d');
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
                    },
                    x: {
                        grid: {
                            display: false
                        }
                    }
                },
                animation: {
                    duration: 1000
                }
            }
        });
    }
    
    function createFemaleInsecurityChart() {
        const ctx = document.getElementById('femaleInsecurityChart').getContext('2d');
        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['Cambodia', 'Timor-Leste', 'Philippines', 'Laos', 'Myanmar', 'Vietnam', 'Malaysia', 'Singapore', 'Thailand', 'Indonesia'],
                datasets: [
                    {
                        label: 'Moderate/Severe Food Insecurity - Female Adults (%)',
                        data: [54.0, 53.7, 43.8, 36.8, 32.9, 12.5, 14.3, 7.4, 7.6, 5.0],
                        backgroundColor: 'rgba(153, 102, 255, 0.7)',
                        borderColor: 'rgba(153, 102, 255, 1)',
                        borderWidth: 1,
                        borderRadius: 5
                    },
                    {
                        label: 'Severe Food Insecurity - Female Adults (%)',
                        data: [16.1, 8.9, 5.7, 6.3, 7.3, 2.4, 4.7, 2.0, 1.5, 0.5],
                        backgroundColor: 'rgba(255, 107, 53, 0.7)',
                        borderColor: 'rgba(255, 107, 53, 1)',
                        borderWidth: 1,
                        borderRadius: 5
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
                    y: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: 'Percentage'
                        }
                    },
                    x: {
                        grid: {
                            display: false
                        }
                    }
                },
                animation: {
                    duration: 1000
                }
            }
        });
    }
    
    function createGenderComparisonChart() {
        const ctx = document.getElementById('genderComparisonChart').getContext('2d');
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
                },
                animation: {
                    duration: 1000
                }
            }
        });
    }
    
    function createAffectedPopulationChart() {
        const ctx = document.getElementById('affectedPopulationChart').getContext('2d');
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
                    },
                    x: {
                        grid: {
                            display: false
                        }
                    }
                },
                animation: {
                    duration: 1000
                }
            }
        });
    }
    
    function createComparisonChart() {
        const ctx = document.getElementById('comparisonChart').getContext('2d');
        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['Production', 'Imports', 'Exports', 'Undernourishment', 'GDP per capita'],
                datasets: [
                    {
                        label: 'Indonesia',
                        data: [163, 1.93, 0.027, 7.2, 11000],
                        backgroundColor: 'rgba(0, 102, 204, 0.7)'
                    },
                    {
                        label: 'Vietnam',
                        data: [130, 2.773, 26.684, 5.2, 10000],
                        backgroundColor: 'rgba(220, 53, 69, 0.7)'
                    },
                    {
                        label: 'Thailand',
                        data: [99, 0.267, 27.779, 5.6, 20000],
                        backgroundColor: 'rgba(0, 168, 107, 0.7)'
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
                                let suffix = '';
                                let value = context.raw;
                                
                                if (context.datasetIndex === 3) { // Undernourishment
                                    suffix = '%';
                                } else if (context.datasetIndex === 4) { // GDP
                                    value = `$${value.toLocaleString()}`;
                                } else if (context.datasetIndex === 0 || context.datasetIndex === 1) { // Production/Imports/Exports
                                    suffix = context.raw < 1 ? ' thousand tons' : ' million tons';
                                    if (context.datasetIndex === 0) { // Production
                                        suffix = ' million tons';
                                    } else { // Imports/Exports
                                        suffix = ' thousand tons';
                                    }
                                }
                                
                                return `${context.dataset.label}: ${value}${suffix}`;
                            }
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true
                    },
                    x: {
                        grid: {
                            display: false
                        }
                    }
                },
                animation: {
                    duration: 1000
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
                        data: [65, 68, 70, 72, 75, 78, 80, 82, 85],
                        borderColor: 'rgba(0, 102, 204, 1)',
                        backgroundColor: 'rgba(0, 102, 204, 0.1)',
                        borderWidth: 2,
                        tension: 0.3,
                        fill: true
                    },
                    {
                        label: 'Vietnam',
                        data: [45, 50, 55, 60, 65, 70, 75, 80, 85],
                        borderColor: 'rgba(220, 53, 69, 1)',
                        backgroundColor: 'rgba(220, 53, 69, 0.1)',
                        borderWidth: 2,
                        tension: 0.3,
                        fill: true
                    },
                    {
                        label: 'Philippines',
                        data: [30, 35, 40, 45, 50, 55, 60, 65, 70],
                        borderColor: 'rgba(255, 193, 7, 1)',
                        backgroundColor: 'rgba(255, 193, 7, 0.1)',
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
                                return `${context.dataset.label}: ${context.raw} index`;
                            }
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: false
                    }
                },
                animation: {
                    duration: 1000
                }
            }
        });
    }
    
    // Populate country selectors for comparison
    const countries = [
        'Indonesia', 'Vietnam', 'Thailand', 'Myanmar', 
        'Philippines', 'Cambodia', 'Laos', 'Malaysia', 
        'Singapore', 'Brunei', 'Timor-Leste'
    ];
    
    const countrySelects = document.querySelectorAll('.comparison-select');
    countrySelects.forEach(select => {
        countries.forEach(country => {
            const option = document.createElement('option');
            option.value = country;
            option.textContent = country;
            select.appendChild(option);
        });
        
        select.addEventListener('change', updateComparison);
    });
    
    function updateComparison() {
        const selectedCountries = [];
        countrySelects.forEach(select => {
            if (select.value) {
                selectedCountries.push(select.value);
            }
        });
        
        if (selectedCountries.length > 0) {
            // Update comparison chart and table
            console.log('Comparing countries:', selectedCountries);
            // In a real implementation, you would update the chart and table here
        }
    }
    
    // Initialize comparison with default countries
    document.getElementById('country1').value = 'Indonesia';
    document.getElementById('country2').value = 'Vietnam';
    document.getElementById('country3').value = 'Philippines';
    updateComparison();
});