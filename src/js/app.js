document.addEventListener('DOMContentLoaded', function() {
  iniciarApp();
});

function iniciarApp() {
  // console.log('Iniciando App...');
  crearGaleria();
}

function crearGaleria() {
  const galeria = document.querySelector('.galeria-imagenes');

  galeria.textContent = 'Crear la Galeria de imagenes';
}