// Antes que nada, disculpen el poco nivel de detalle y de CSS.
// Sé que faltan cosas por completar y agregar.
// Creo que me ayudé demasiado con IA. Hay cosas en las que soy muy distraído
// (suelo comerme letras y después no encuentro el error). JavaScript
// es un lenguaje que requiere mucha paciencia y hay que ser muy preciso
// con cada palabra, porque si no, se rompe todo.
// Disculpen por lo simple del trabajo.
// También quería recalcar que en estas fechas estamos en temporada
// y con el tema del trabajo estoy muy complicado con los horarios.
// ¡Estuvo muy bueno el curso!


function Cliente(nombre, telefono, direccion) {
  this.nombre = nombre;
  this.telefono = telefono;
  this.direccion = direccion;
  this.pedidos = [];
}

const comidas = [
    { id: 1, nombre: "Arroz", precio: 1000, img: "arros.jpg" },
    { id: 2, nombre: "Arroz con pollo", precio: 5000, img: "arros_con_pollo.jpg" },
    { id: 3, nombre: "Bife a la criolla", precio: 6000, img: "bife_a_la_criolla.jpg" },
    { id: 4, nombre: "Bondiola", precio: 7000, img: "bondiola.jpg"},
    { id: 5, nombre: "Empanadas de carne", precio: 14000, img: "empanadas_de_carne.jpg" },
    { id: 6, nombre: "Empanadas arabes", precio: 16000, img: "empanadas_arabes.jpg" },
    { id: 7, nombre: "Empanadas de jamon y queso", precio: 15000, img: "empanadas_de_jamon_y_queso.jpg" },
    { id: 8, nombre: "Empanadas de verdura", precio: 9000, img: "empanadas_de_verdura.jpg" },
    { id: 9, nombre: "Empanadas de pollo", precio: 12000, img: "empanadas_de_pollo.jpg" },
    { id: 10, nombre: "Hamburguesa", precio: 9000, img: "hamburguesa.jpg" },
    { id: 11, nombre:"Humita", precio: 7000, img: "humita.jpg" },
    { id: 12, nombre: "Locro", precio: 9000, img: "locro.jpg" },
    { id: 13, nombre: "Lomo completo", precio: 12000, img: "lomo.jpg" },
    { id: 14, nombre: "Sandwich de milanesa",precio: 11000, img: "milanesa.jpg"},
    { id: 15, nombre: "Ñoquis", precio: 7500, img: "ñoquis.jpg" },
    { id: 16, nombre: "Pizza calabesa", precio: 11000, img: "pizza_calabresa.jpg" },
    { id: 17, nombre: "Pizza especial", precio: 13000, img: "pizza_especial.jpg" },
    { id: 18, nombre: "Pizza fugazzeta", precio: 12000, img: "pizza_fugazzeta.jpg" },
    { id: 19, nombre: "Pizza muzza", precio: 9000, img: "pizza_muzza.jpg" },
    { id: 20, nombre: "Pizza napo", precio: 10000, img: "pizza_napo.jpg" },
    { id: 21, nombre: "Pizza lomo", precio: 20000, img: "pizza_lomo.jpg" },
];

const contenedor = document.getElementById("contenedorComidas");

let carrito = [];

function renderizarComidas() {

  if (!contenedor) return;

  let html = "";

  comidas.forEach(el => {
    html += `
      <div class="card">
        <img src="./img/${el.img}" alt="${el.nombre}">
        <h3>${el.nombre}</h3>
        <p>Precio: $${el.precio}</p>
        <button onclick="agregarAlCarrito(${el.id})">
          Comprar
        </button>
      </div>
    `;
  });

  contenedor.innerHTML = html;
}
function agregarAlCarrito(id) {

  const producto = comidas.find(p => p.id === id);
  if (!producto) return;

  carrito.push(producto);

  Toastify({
    text: `${producto.nombre} agregado al carrito 🛒`,
    duration: 2000,
    gravity: "bottom",
    position: "center"
  }).showToast();

  dibujarTabla(); 
}

function dibujarTabla() {

  const contenedorTabla = document.getElementById("tablaCarrito");

  if (!contenedorTabla) return;

  if (carrito.length === 0) {
    contenedorTabla.innerHTML = "<p>El carrito está vacío</p>";
    return;
  }

  let totalGeneral = 0;

  let html = `
    <table border="1" width="100%" style="margin-top:20px;">
      <tr>
        <th>#</th>
        <th>Producto</th>
        <th>Precio</th>
        <th>Acción</th>
      </tr>
  `;

  carrito.forEach((producto, index) => {

    totalGeneral += producto.precio;

    html += `
      <tr>
        <td>${index + 1}</td>
        <td>${producto.nombre}</td>
        <td>$${producto.precio}</td>
        <td>
          <button onclick="eliminarProducto(${index})">
            ❌
          </button>
        </td>
      </tr>
    `;
  });

  html += `
      <tr>
        <td colspan="2"><strong>Total</strong></td>
        <td colspan="2"><strong>$${totalGeneral}</strong></td>
      </tr>
    </table>
  `;

  contenedorTabla.innerHTML = html;
}

function eliminarProducto(index) {
  carrito.splice(index, 1);
  dibujarTabla();
}

renderizarComidas();

function activarHoverCards() {

  const cards = document.querySelectorAll(".card");

  cards.forEach(card => {

    card.addEventListener("mouseenter", () => {
      card.style.transform = "scale(1.08)";
      card.style.zIndex = "10";
    });

    card.addEventListener("mouseleave", () => {
      card.style.transform = "scale(1)";
      card.style.zIndex = "1";
    });

  });
}
renderizarComidas();
activarHoverCards();

const botonFinalizar = document.getElementById("finalizar_compra");

botonFinalizar.addEventListener("click", finalizarCompra);

function finalizarCompra() {

  const nombre = document.getElementById("nombreCliente").value.trim();
  const telefono = document.getElementById("telefonoCliente").value.trim();
  const direccion = document.getElementById("direccionCliente").value.trim();

  if (carrito.length === 0) {
    Toastify({
      text: "El carrito está vacío 🛒",
      duration: 2000,
      gravity: "bottom",
      position: "center",
      style: { background: "red" }
    }).showToast();
    return;
  }

  if (!nombre || !telefono || !direccion) {
    Toastify({
      text: "Debe completar todos los datos ✍️",
      duration: 2000,
      gravity: "bottom",
      position: "center",
      style: { background: "orange" }
    }).showToast();
    return;
  }

  const cliente = new Cliente(nombre, telefono, direccion);

  cliente.pedidos.push([...carrito]);

  console.log("Cliente:", cliente);

  carrito = [];
  dibujarTabla();

  document.getElementById("nombreCliente").value = "";
  document.getElementById("telefonoCliente").value = "";
  document.getElementById("direccionCliente").value = "";

  Toastify({
    text: "Compra realizada con éxito 🎉",
    duration: 3000,
    gravity: "bottom",
    position: "center",
    style: { background: "green" }
  }).showToast();
}