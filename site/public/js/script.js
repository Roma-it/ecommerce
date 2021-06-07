window.addEventListener("load", async function () {
    let nombre = document.getElementById("nombre");
    let emailField = document.getElementById("email");
    let apellido = document.getElementById("apellido");
    let pass = document.getElementById("password");
    let confPass = document.getElementById("confPass");
    let calle = document.getElementById("calle");
    let telefono = document.getElementById("telefono");
    let cp = document.getElementById("cp");
    let localidad = document.getElementById("localidad");
    let pais = document.getElementById("pais");
    let provincias = document.getElementById("provincia");
    let error = document.querySelector(".ventana-error");
    let highlighted = document.querySelectorAll(".highlighted");
    let highlightedForm = document.querySelectorAll(".highlightedForm");

    let deleteSubmitList = document.querySelectorAll(".deleteProductList");
    deleteSubmitList.forEach((delSub) => {
        delSub.addEventListener("submit", function (evt) {
            evt.preventDefault();
            const sureDelete = confirm("Seguro desea eliminar el producto ??");
            if (sureDelete) {
                delSub.submit();
            }
        });
    });
    let deleteSubmit = document.querySelector(".deleteProduct");
    if (deleteSubmit) {
        deleteSubmit.addEventListener("submit", function (evt) {
            evt.preventDefault();
            const sureDelete = confirm("Seguro desea eliminar el producto ??");
            if (sureDelete) {
                deleteSubmit.submit();
            }
        });
    }

    if (highlighted) {
        for (let i = 0; i < highlighted.length; i++) {
            highlighted[i].addEventListener("click", function () {
                highlightedForm[i].submit();
            });
        }
    }
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
        return;
    }
    function minNumber(field) {
        if (field.value >= 0) {
            field.style.color = "red";
            field.style.backgroundColor = "orange";
            error.innerHTML = `El valor mínimo de ${field} es 0`;
        } else {
            error.innerHTML = "";
            field.style.color = "black";
            field.style.backgroundColor = "white";
        }
        return;
    }
    if (nombre) {
        nombre.addEventListener("input", () => {
            minChar(nombre, 3);
        });
    }
    if (telefono) {
        telefono.addEventListener("input", () => {
            minChar(telefono, 3);
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
    if (confPass) {
        console.log(confPass);
        confPass.addEventListener("input", () => {
            if (confPass.value !== pass.value) {
                confPass.style.color = "red";
                confPass.style.backgroundColor = "orange";
                error.innerHTML = `Las contraseñas no coinciden`;
            } else {
                error.innerHTML = "";
                confPass.style.color = "black";
                confPass.style.backgroundColor = "white";
            }
            return;
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
    if (pais) {
        console.log(pais);
        pais.addEventListener("input", async () => {
            provincias.innerHTML = "";
            const res = await this.fetch(
                `http://www.pccomponents.com.ar/domicilios/provincias/${pais.value}`
            );
            const provinciasList = await res.json();
            //console.log(provinciasList);
            provinciasList.forEach((prov) => {
                provincias.innerHTML += `<option value=${prov.id}>${prov.nombre}</option>`;
            });
        });
    }
    const res = await fetch("http://www.pccomponents.com.ar/api/users");
    const data = await res.json();
    const users = data.users;
    if (emailField) {
        emailField.addEventListener("input" || "change", () => {
            const found = users.find((user) => user.email == emailField.value);
            if (found) {
                emailField.style.color = "red";
                emailField.style.backgroundColor = "orange";
                error.innerHTML = `El email ya existe`;
            } else {
                error.innerHTML = "";
                emailField.style.color = "black";
                emailField.style.backgroundColor = "white";
            }
        });
    }

    //VALIDACIONES DE PRODUCTO
    let productName = document.getElementById("productName");
    let productTopSpec1 = document.getElementById("productTopSpec1");
    let productTopSpec2 = document.getElementById("productTopSpec2");
    let productCode = document.getElementById("productCode");
    let productDescription = document.getElementById("productDescription");
    let productPrice = document.getElementById("");
    let cantidadInicial = document.getElementById("cantidadInicial");

    if (productName) {
        //console.log(productName);
        productName.addEventListener("input", () => {
            minChar(productName, 3);
        });
    }
    if (productTopSpec1) {
        productTopSpec1.addEventListener("input", () => {
            minChar(productTopSpec1, 3);
        });
    }
    if (productCode) {
        productCode.addEventListener("input", () => {
            minChar(productCode, 3);
        });
    }
    if (productDescription) {
        productDescription.addEventListener("input", () => {
            minChar(productDescription, 10);
        });
    }
    if (productTopSpec2) {
        productTopSpec2.addEventListener("input", () => {
            minChar(productTopSpec2, 3);
        });
    }
    if (productPrice) {
        productPrice.addEventListener("input", () => {
            minNumber(productPrice);
        });
    }
    if (cantidadInicial) {
        cantidadInicial.addEventListener("input", () => {
            minNumber(cantidadInicial);
        });
    }
});
