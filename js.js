// Aguarda o carregamento completo do DOM antes de executar o script.
document.addEventListener('DOMContentLoaded', function () {
  // Seleciona todos os botões das abas no painel interativo.
  const buttons = document.querySelectorAll('.tab-button');
  // Seleciona todos os painéis de conteúdo correspondente às abas.
  const panels = document.querySelectorAll('.tab-panel');
  // Seleciona o elemento que exibirá o feedback do quiz.
  const feedback = document.getElementById('feedback');
  // Seleciona o botão principal de exploração no cabeçalho.
  const exploreBtn = document.getElementById('exploreBtn');

  // Função que ativa uma aba e desativa as outras.
  function activateTab(targetId) {
    buttons.forEach((button) => {
      // Marca o botão como ativo apenas se o data-target corresponder ao id desejado.
      button.classList.toggle('active', button.dataset.target === targetId);
    });
    panels.forEach((panel) => {
      // Exibe apenas o painel cujo id corresponde à aba ativa.
      panel.classList.toggle('active', panel.id === targetId);
    });
  }

  // Adiciona o evento de clique em cada botão de aba.
  buttons.forEach((button) => {
    button.addEventListener('click', () => {
      // Quando clicado, ativa a aba associada ao botão.
      activateTab(button.dataset.target);
    });
  });

  // Quando o botão "Explorar agora" é clicado...
  exploreBtn.addEventListener('click', () => {
    // Rola a página suavemente até a seção do primeiro painel.
    document.querySelector('#what').scrollIntoView({ behavior: 'smooth', block: 'start' });
    // Ativa a aba "O que são?" automaticamente.
    activateTab('what');
  });

  // Seleciona todas as opções do quiz e adiciona um clique em cada uma.
  document.querySelectorAll('.option').forEach((option) => {
    option.addEventListener('click', () => {
      // Verifica se a opção clicada é a correta comparando o atributo data-correct.
      const isCorrect = option.dataset.correct === 'true';
      // Atualiza o texto de feedback com base no resultado da resposta.
      feedback.textContent = isCorrect
        ? 'Correto! Cookies são arquivos que guardam informações de sites.'
        : 'Quase lá. Essa não é a descrição correta de um cookie.';
      // Altera a cor do texto de feedback para verde ou vermelho.
      feedback.style.color = isCorrect ? '#166534' : '#b91c1c';

      // Remove as classes de estado de todas as opções antes de marcar a atual.
      document.querySelectorAll('.option').forEach((item) => {
        item.classList.remove('correct', 'wrong');
      });
      // Adiciona a classe correta ou errada apenas à opção clicada.
      option.classList.add(isCorrect ? 'correct' : 'wrong');
    });
  });
});
