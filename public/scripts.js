document.getElementById('cadastroForm').addEventListener('submit', function (event) {
  event.preventDefault();

  const nome = document.getElementById('nome').value;
  const cpf = document.getElementById('cpf').value;
  const especialidade = document.getElementById('especialidade').value;

  fetch('http://localhost:3000/profissionais', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ nome, cpf, especialidade })
  })
  .then(response => response.text())
  .then(data => {
    alert(data);
    listarProfissionais();
  });
});

function listarProfissionais() {
  fetch('http://localhost:3000/profissionais')
    .then(response => response.json())
    .then(data => {
      const lista = document.getElementById('listaProfissionais');
      lista.innerHTML = '';
      data.forEach(profissional => {
        const li = document.createElement('li');
        li.textContent = `${profissional.nome} - ${profissional.especialidade}`;
        lista.appendChild(li);
      });
    });
}

// Carregar a lista de profissionais ao carregar a página
listarProfissionais();
