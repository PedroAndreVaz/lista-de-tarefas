(() => {
  const form = document.getElementById('form-tarefa');
  const input = document.getElementById('input-tarefa');
  const lista = document.getElementById('lista-tarefas');

  
  let tarefas = JSON.parse(localStorage.getItem('tarefas')) || [];


  function renderizar() {
    lista.innerHTML = ''; 

    tarefas.forEach((tarefa, indice) => {
      const li = document.createElement('li');
      li.className = tarefa.completa ? 'completed' : '';
      li.setAttribute('tabindex', '0');
      li.textContent = tarefa.texto;

      
      li.addEventListener('click', () => {
        tarefas[indice].completa = !tarefas[indice].completa;
        salvarERenderizar();
      });
     
      li.addEventListener('keydown', e => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          tarefas[indice].completa = !tarefas[indice].completa;
          salvarERenderizar();
        }
      });

      
      const botaoExcluir = document.createElement('button');
      botaoExcluir.className = 'delete-btn';
      botaoExcluir.setAttribute('aria-label', `Excluir tarefa: ${tarefa.texto}`);
      botaoExcluir.innerHTML = '&times;';
      // Evita alternar completo ao clicar no excluir
      botaoExcluir.addEventListener('click', (e) => {
        e.stopPropagation();
        tarefas.splice(indice, 1);
        salvarERenderizar();
      });

      li.appendChild(botaoExcluir);
      lista.appendChild(li);
    });
  }

 
  function salvarERenderizar() {
    localStorage.setItem('tarefas', JSON.stringify(tarefas));
    renderizar();
  }


  form.addEventListener('submit', e => {
    e.preventDefault();
    const texto = input.value.trim();
    if (texto) {
      tarefas.push({ texto, completa: false });
      salvarERenderizar();
      input.value = '';
      input.focus();
    }
  });

  
  renderizar();
})();
