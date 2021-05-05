window.addEventListener("load", function () {
  let nombre = document.getElementById("nombre");
  let apellido = document.getElementById("apellido");
  let pass = document.getElementById("password");
  let error = document.querySelector(".ventana-error");

  function minChar(field, num) {
    if (field.value.length < num) {
      field.style.color = "red";
      field.style.backgroundColor = "orange";
      error.innerHTML = `Debes ingresar mas de ${num} caracteres`;
    } else {
      error.innerHTML = "";
      field.style.color = "black";
      field.style.backgroundColor = "white";
    }
  }
  nombre.addEventListener("input", () => {
    minChar(nombre, 2);
  });
  apellido.addEventListener("keypress", () => {
    minChar(apellido, 2);
  });
  pass.addEventListener("change", () => {
    minChar(pass, 8);
  });
});
