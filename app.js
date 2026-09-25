/* Cafetería universitaria: interacciones de la página.
   El script se carga con defer, así que el HTML ya está listo. */

/* 1. Año actual en el pie de página */
const anio = document.getElementById("anio");
if (anio) {
  anio.textContent = new Date().getFullYear();
}

/* 2. Estado de atención según el día y la hora */
const estado = document.querySelector("[data-estado]");
const estadoTexto = document.getElementById("estado-texto");
if (estado && estadoTexto) {
  const ahora = new Date();
  const dia = ahora.getDay();
  const minutos = ahora.getHours() * 60 + ahora.getMinutes();
  const horario = dia === 0 ? null : dia === 6 ? [420, 840] : [390, 1200];
  const abierto = horario !== null && minutos >= horario[0] && minutos < horario[1];
  if (abierto) {
    estadoTexto.textContent = dia === 6 ? "Abierto ahora, hasta las 2:00 p. m." : "Abierto ahora, hasta las 8:00 p. m.";
  } else {
    estadoTexto.textContent = "Cerrado en este momento. Abrimos a las " + (dia === 6 || dia === 5 && minutos >= 1200 ? "7:00 a. m." : "6:30 a. m.");
  }
  estado.classList.toggle("cerrado", !abierto);
}

/* 3. Filtros del menú por categoría */
const filtros = document.querySelectorAll(".filtro");
const productos = document.querySelectorAll(".producto");
filtros.forEach((boton) => {
  boton.addEventListener("click", () => {
    const categoria = boton.dataset.filtro;
    filtros.forEach((b) => {
      b.classList.toggle("activo", b === boton);
      b.setAttribute("aria-pressed", b === boton ? "true" : "false");
    });
    productos.forEach((p) => {
      p.hidden = categoria !== "todo" && p.dataset.categoria !== categoria;
    });
  });
});

/* 4. Botón Agregar: pasa el producto al formulario y muestra un aviso */
const campoProducto = document.getElementById("preferencia");
const aviso = document.getElementById("aviso");
let temporizador;
document.querySelectorAll(".agregar").forEach((boton) => {
  boton.addEventListener("click", () => {
    const nombre = boton.dataset.producto;
    if (campoProducto) {
      campoProducto.value = nombre;
    }
    if (aviso) {
      aviso.textContent = nombre + " se agregó a tu pedido";
      aviso.classList.add("visible");
      clearTimeout(temporizador);
      temporizador = setTimeout(() => aviso.classList.remove("visible"), 2600);
    }
  });
});

/* 5. Valor del control de azúcar */
const azucar = document.getElementById("azucar");
const valorAzucar = document.getElementById("valor-azucar");
if (azucar && valorAzucar) {
  azucar.addEventListener("input", () => {
    valorAzucar.textContent = azucar.value;
  });
}

/* 6. Contador de caracteres de las indicaciones */
const mensaje = document.getElementById("mensaje");
const contador = document.getElementById("contador");
if (mensaje && contador) {
  mensaje.addEventListener("input", () => {
    contador.textContent = mensaje.value.length;
  });
}

/* 7. Resalta en el menú la sección que se está viendo */
const enlaces = document.querySelectorAll(".menu a");
if ("IntersectionObserver" in window) {
  const observador = new IntersectionObserver((entradas) => {
    entradas.forEach((entrada) => {
      if (entrada.isIntersecting) {
        enlaces.forEach((enlace) => {
          enlace.classList.toggle("activo", enlace.getAttribute("href") === "#" + entrada.target.id);
        });
      }
    });
  }, { rootMargin: "-45% 0px -50% 0px" });
  document.querySelectorAll("main section[id]").forEach((s) => observador.observe(s));
}
