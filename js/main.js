google.charts.load('current', { packages: ['corechart'] });
google.charts.setOnLoadCallback(drawCharts);

function drawCharts() {
  var dataBibliotecas = google.visualization.arrayToDataTable([
    ['Estado', 'Quantidade'],
    ['Pernambuco', 50],
    ['Bahoa', 40]
  ]);

  var dataBibliotecarios = google.visualization.arrayToDataTable([
    ['Estado', 'Quantidade'],
    ['Pernambuco', 30],
    ['Bahia', 35]
  ]);
  var commonOptions = {
    is3D: true,
    chartArea: { width: '80%', height: '70%' },
    titleTextStyle: { fontSize: 16, bold: true }
  };

  var optionsBibliotecas = Object.assign({}, commonOptions, {
    title: 'Quantidade de Bibliotecas',
    colors: ['#3366cc', '#FABD10']
  });

  var optionsBibliotecarios = Object.assign({}, commonOptions, {
    title: 'Quantidade de Bibliotecários',
    colors: ['#3366cc', '#FABD10']
  });

  var chartBibliotecas = new google.visualization.PieChart(
    document.getElementById('chartContainer1')
  );
  chartBibliotecas.draw(dataBibliotecas, optionsBibliotecas);

  var chartBibliotecarios = new google.visualization.PieChart(
    document.getElementById('chartContainer2')
  );
  chartBibliotecarios.draw(dataBibliotecarios, optionsBibliotecarios);

  var dataBar = google.visualization.arrayToDataTable([
    ['Equipamento', 'Estado A', 'Estado B'],
    ['Computadores', 150, 120],
    ['Tablets', 50, 60],
    ['Projetores', 30, 40],
    ['Televisões', 20, 15],
    ['Outros equipamentos', 20, 15]
  ]);

  var optionsBar = {
    title: 'Equipamentos Eletrônicos',
    chartArea: { width: '80%', height: '70%' },
    legend: { position: 'top', maxLines: 3 },
    isStacked: true,
    vAxis: { title: 'Quantidade' },
    hAxis: { title: 'Equipamento' },
    series: {
      0: { color: '#3366cc' },
      1: { color: '#FABD10' }
    },
    titleTextStyle: { fontSize: 16, bold: true }
  };

  var chartBar = new google.visualization.ColumnChart(
    document.getElementById('chartContainer3')
  );
  chartBar.draw(dataBar, optionsBar);
}

function toggleMenu() {
  var dropdownWrapper = document.querySelector('.dropdown-wrapper');
  dropdownWrapper.style.display =
    dropdownWrapper.style.display === 'none' ? 'flex' : 'none';
}

