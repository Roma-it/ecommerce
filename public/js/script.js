window.addEventListener("load", function () {
  let nombre = document.getElementById("nombre");
  let apellido = document.getElementById("apellido");
  let pass = document.getElementById("password");
  let calle = document.getElementById("calle");
  let cp = document.getElementById("cp");
  let localidad = document.getElementById("localidad");
  let error = document.querySelector(".ventana-error");

  console.log(calle);
  function minChar(field, num) {
    if (field.value.length > 0 && field.value.length < num) {
      field.style.color = "red";
      field.style.backgroundColor = "orange";
      error.innerHTML = `Debes ingresar mas de ${num - 1} caracteres`;
    } else {
      error.innerHTML = "";
      field.style.color = "black";
      field.style.backgroundColor = "white";
    }
  }
  if (nombre) {
    nombre.addEventListener("input", () => {
      minChar(nombre, 3);
    });
  }
  if (apellido) {
    apellido.addEventListener("input", () => {
      minChar(apellido, 3);
    });
  }
  if (pass) {
    pass.addEventListener("input", () => {
      minChar(pass, 8);
    });
  }
  if (calle) {
    calle.addEventListener("input", () => {
      minChar(calle, 3);
    });
  }
  if (cp) {
    cp.addEventListener("input", () => {
      minChar(cp, 4);
    });
  }
  if (localidad) {
    localidad.addEventListener("input", () => {
      minChar(localidad, 4);
    });
  }
});
