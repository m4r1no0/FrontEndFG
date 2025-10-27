const mainContent = document.getElementById('main-content');
const navLinks = document.querySelector('.sidebar-nav');

console.log("main.js cargado. El script principal está listo.");

const loadContent = async (page) => {
  console.log(`Paso 2: Se llamó a loadContent con el parámetro: '${page}'`);
  try {
    const response = await fetch(`pages/${page}.html`);
    console.log("Paso 3: Se intentó hacer fetch. Respuesta recibida:", response);

    if (!response.ok) {
      // Si la respuesta no es OK, lanzamos un error para que lo capture el catch.
      throw new Error(`Error de red: ${response.status} - ${response.statusText}`);
    }
    const html = await response.text();
    mainContent.innerHTML = html;
    console.log("Paso 4: El contenido HTML se ha inyectado en #main-content.");
    
    // cuando se carga la página users
    if (page === 'users') {
      import('./pages/users.js')
        .then(usersModule => usersModule.init());  // llama la función modulo en user.js
    }
    else if (page === 'produccion_huevos') {
      import('./pages/produccionHuevos.js')
        .then(module => module.init());
  }

    // Aquí puedes agregar más condiciones para otras páginas si es necesario.

  } catch (error) {
    console.error("¡ERROR! Algo falló dentro de loadContent:", error);
    mainContent.innerHTML = `<h3 class="text-center text-danger p-5">No se pudo cargar el contenido. Revisa la consola (F12).</h3>`;
  }
};

navLinks.addEventListener('click', (event) => {
  console.log(event);
  const link = event.target.closest('a[data-page]');
  
  if (link) {
    event.preventDefault();
    const pageToLoad = link.dataset.page;
    console.log(`Paso 1: Clic detectado. Se va a cargar la página: '${pageToLoad}'`);
    loadContent(pageToLoad);
  }
});

document.addEventListener('DOMContentLoaded', () => {
    // Carga inicial
    loadContent('panel');
});
