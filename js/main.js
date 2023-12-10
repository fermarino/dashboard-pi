document.addEventListener('DOMContentLoaded', async function () {
  const searchButton = document.getElementById('searchButton');
  searchButton.addEventListener('click', function () {
    const dependenciaSelect = document.getElementById('dependenciaSelect');
    const estadoSelect = document.getElementById('estadoSelect');

    const dependencia = dependenciaSelect.value;
    const estado = estadoSelect.value;

    updateCharts(dependencia, estado);


    const pieTextTitles = document.querySelectorAll('.pie-text');
    pieTextTitles.forEach(title => {
      title.style.display = 'block';
    });
  });

  const estadoSelect = document.getElementById('estadoSelect');

  // Adiciona dinamicamente as opções de estados nos selects
  await updateEstadoSelectOptions(estadoSelect);

  async function updateEstadoSelectOptions(select) {
    const estados = await fetchData('/estados');
    select.innerHTML = '';
    estados.forEach(estado => {
      const option = document.createElement('option');
      option.value = estado;
      option.textContent = estado;
      select.appendChild(option);
    });
  }

  async function fetchData(url) {
    try {
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar dados:', error);
    }
  }

  async function updateCharts(dependencia, estado) {
    try {
      const bibliotecasData = await fetchData(
        `/dados-bibliotecas?dependencia=${dependencia}&estado=${estado}`
      );

      const bibliotecariosPublicosData = await fetchData(
        `/dados-bibliotecarios-publicos?estado=${estado}`
      );
      const bibliotecariosPrivadosData = await fetchData(
        `/dados-bibliotecarios-privados?estado=${estado}`
      );

      const equipamentosData = await fetchData(
        `/dados-equipamentos?estado=${estado}`
      );

      const equipamentosPublicosData = await fetchData(
        `/dados-equipamentos-publicos?estado=${estado}`
      );
      const equipamentosPrivadosData = await fetchData(
        `/dados-equipamentos-privados?estado=${estado}`
      );

      // Certifique-se de que os dados estão sendo retornados corretamente
      console.log('Bibliotecas Data:', bibliotecasData);
      console.log('Bibliotecários Públicos Data:', bibliotecariosPublicosData);
      console.log('Bibliotecários Privados Data:', bibliotecariosPrivadosData);
      console.log('Equipamentos Data:', equipamentosData);
      console.log('Equipamentos Públicos Data:', equipamentosPublicosData);
      console.log('Equipamentos Privados Data:', equipamentosPrivadosData);

      createPieChart(
        'chartContainer1',
        'Qtd Bibliotecas',
        [bibliotecasData.publicas, bibliotecasData.privadas],
        ['Público', 'Privado']
      );

      createPieChart(
        'chartContainer2',
        'Qtd Bibliotecários',
        [
          bibliotecariosPublicosData ? bibliotecariosPublicosData.total_bibliotecarios_publicos || 0 : 0,
          bibliotecariosPrivadosData ? bibliotecariosPrivadosData.total_bibliotecarios_privados || 0 : 0
        ],
        ['Público', 'Privado']
      );

      createBarChart('chartContainer3', 'Quantidade de Equipamentos', {
        totalDeskPriv: equipamentosPrivadosData,
        totalSomPriv: equipamentosPrivadosData,
        totalMultPriv: equipamentosPrivadosData,
        totalDeskPub: equipamentosPublicosData,
        totalSomPub: equipamentosPublicosData,
        totalMultPub: equipamentosPublicosData,
        totalTvPub: equipamentosPublicosData,
      });

      createBarChart('chartContainer4', 'Quantidade de Bibliotecários', {
        totalBiblioPub: bibliotecariosPublicosData,
        totalBiblioPriv: bibliotecariosPrivadosData,
      });

    } catch (error) {
      console.error('Erro ao atualizar gráficos:', error);
    }
  }

  function createPieChart(containerId, title, values, labels) {
    const container = document.getElementById(containerId);
    if (!container) {
      console.error(`Container element with id '${containerId}' not found.`);
      return;
    }

    const canvas = document.createElement('canvas');
    container.innerHTML = ''; // Limpar o conteúdo anterior
    container.appendChild(canvas);

    const ctx = canvas.getContext('2d');
    new Chart(ctx, {
      type: 'pie',
      data: {
        labels: labels,
        datasets: [
          {
            data: values,
            backgroundColor: ['#36a2eb', '#FFCE56'],
          },
        ],
      },
      options: {
        title: {
          display: true,
          text: title,
        },
        legend: {
          display: true,
          position: 'right',
          labels: {
            boxWidth: 20,
          },
        },
      },
    });
  }

  function createBarChart(containerId, title, data) {
    const container = document.getElementById(containerId);
    if (!container) {
      console.error(`Container element with id '${containerId}' not found.`);
      return;
    }

    const canvas = document.createElement('canvas');
    container.innerHTML = ''; // Limpar o conteúdo anterior
    container.appendChild(canvas);

    const ctx = canvas.getContext('2d');
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: [
          'Desktop Aluno',
          'Equipamento Som',
          'Equipamento Multimídia',
          'Equipamento TV',
        ],
        datasets: [
          {
            label: title,
            data: [
              data.totalDeskPriv ? data.totalDeskPriv.total_qt_desktop_aluno : 0,
              data.totalSomPriv ? data.totalSomPriv.total_qt_equip_som : 0,
              data.totalMultPriv ? data.totalMultPriv.total_qt_equip_multimidia : 0,
              data.totalTvPriv ? data.totalTvPriv.total_qt_equip_tv : 0,
            ],
            backgroundColor: '#36a2eb',
          },
          {
            label: 'Equipamentos Públicos',
            data: [
              data.totalDeskPub ? data.totalDeskPub.totalDesk : 0,
              data.totalSomPub ? data.totalSomPub.totalSom : 0,
              data.totalMultPub ? data.totalMultPub.totalMult : 0,
              data.totalTvPub ? data.totalTvPub.totalTv : 0,
            ],
            backgroundColor: '#FFCE56',
          },
          {
            label: 'Equipamentos Privados',
            data: [
              data.totalDeskPriv ? data.totalDeskPriv.totalDeskPriv : 0,
              data.totalSomPriv ? data.totalSomPriv.totalSomPriv : 0,
              data.totalMultPriv ? data.totalMultPriv.totalMultPriv : 0,
              data.totalTvPriv ? data.totalTvPriv.totalTvPriv : 0,
            ],
            backgroundColor: '#4CAF50',
          },
        ],
      },
      options: {
        legend: {
          display: true,
        },
        title: {
          display: true,
          text: title,
        },
      },
    });
  }
});
