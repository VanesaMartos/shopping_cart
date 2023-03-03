// NOTA: querySelector() y querySelectorAll() devuelve elementos de la web especificando selectores CSS.
// NOTA: # selector de id
// NOTA: selector de etiqueta sin ningún elemento identificador(ni clase ni id), como en tbody.


// VARIABLES:
const carrito = document.querySelector('#carrito');
const contenedorCarrito = document.querySelector('#lista-carrito tbody'); //es donde se van a colocar los elementos
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito');
const listaCursos = document.querySelector('#lista-cursos');
let articulosCarrito = []; // array vacío para que se vaya 'llenando'.


// Función para cargar todos los eventListeners:
cargarEventListeners();
function cargarEventListeners(){
  // Cuando agregas un curso clicando sobre la opción "Agregar al carrito"
  listaCursos.addEventListener('click', agregarCurso);
}

// FUNCIONES:

function agregarCurso(e) {
  e.preventDefault(); // Prevenir que busque la id, porque en este caso no está definida y se desplaza al principio de la página.

  if(e.target.classList.contains('agregar-carrito')) {
  const cursoSeleccionado = e.target.parentElement.parentElement;
  //console.log(e.target.parentElement.parentElement) // / e.target (event.target) devuelve el elemento donde ocurrió el evento.

  leerDatosCurso(cursoSeleccionado);
  }
}

// Leer el contenido del HTML para extraer la información del curso añadido:
function leerDatosCurso(curso) {
  //console.log(curso);
  // Crear un objeto con el contenido del curso seleccionado:
  const infoCurso = {
    imagen: curso.querySelector('img').src,
    titulo: curso.querySelector('h4').textContent,
    precio: curso.querySelector('.precio span').textContent,
    id: curso.querySelector('a').getAttribute('data-id'),
    cantidad: 1
  }
  // Agregar los elementos en el carrito:
  articulosCarrito = [...articulosCarrito, infoCurso];
  console.log(articulosCarrito);

  carritoHTML();
}

// Mostrar el carrito, iterando cada elemento para que se inserte en el tbody:
function carritoHTML() {

  // Limpiar el HTML:
  limpiarHTML();

  // Recorre el carrito y crea el HTML:
  articulosCarrito.forEach(curso => {
    const row = document.createElement('tr');
    row.innerHTML = `
    <td>
      ${curso.titulo}
    </td>
    `;
    // Agrega el HTML del carrito en el table boby:
    contenedorCarrito.appendChild(row); // para agregar cada fila (row) en cada iteración
  })
}

// Eliminar los cursos del tbody:
function limpiarHTML(){
  // Forma lenta:
  // contenedorCarrito.innerHTML = '';
  // Forma más eficiente y rápida:
  while(contenedorCarrito.firstChild){ // el código se ejecuta mientras haya un elemento en el carrito
    contenedorCarrito.removeChild(contenedorCarrito.firstChild)
  }
}


// RECAPITULACIÓN:
// Cuando agregamos un curso, se ejecuta la función agregarCurso, nos aseguramos de que el usuario haya clicado sobre 'Agregar al carrito' y recuperamos la info del curso seleccionado con leerDatos.
// Se crea un objeto con la info que necesitamos, lo agregamos al carrito e imprimimos el HTML.
// Para evitar duplicados, hay que limpiar el HTML previo y generar el nuevo HTML.
// articulosCarrito mantiene la referencia con el spread operator.