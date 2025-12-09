alert("Bienvenido a tu mercado online");

let usuarios = [];
let contraseñas = [];
let saldo = 0;

function menuDeInicio() {
    let opcion = prompt(
        "Inicio de secion:\n1- Crear Usuario\n2- Iniciar sesión\nPresiona x para salir"
    );

    while (opcion !== "x") {

        if (opcion === "1") {
            crearUsuario();

        } else if (opcion === "2") {
            let ingresoValido = validarUsuario();
            if (ingresoValido) {
                entrarAlMercado();
            }
        }

        opcion = prompt(
            "Inicio de secion:\n1- Crear Usuario\n2- Iniciar sesión\nPresiona x para salir"
        );
    }

    alert("Gracias por confiar en nosotros");
}

function crearUsuario() {
    let nuevoUsuario = prompt("Ingrese nombre del usuario");
    let nuevaContraseña = prompt("Ingrese nueva contraseña");

    if (nuevoUsuario && nuevaContraseña) {
        usuarios.push(nuevoUsuario);
        contraseñas.push(nuevaContraseña);
        alert("Usuario creado con éxito");
    } else {
        alert("Debe completar todos los campos");
    }
}

function validarUsuario() {
    for (let i = 2; i >= 0; i--) {

        let user = prompt("Ingrese usuario");
        let pass = prompt("Ingrese contraseña");

        let index = usuarios.indexOf(user);

        if (index !== -1 && contraseñas[index] === pass) {
            alert("Bienvenido!");
            return true;
        } else {
            alert("Usuario o contraseña incorrectos. Te quedan " + i + " intentos");
        }
    }

    return false;
}

function verSaldo(){
    alert("tu saldo actual es: $" + saldo)
}

function agregarSaldo(){
    let monto = Number(prompt("¿cuanto deseas abonar?"))
    if(monto && monto > 0){
        saldo += monto;
        alert("saldo agregado exitosamente. ahora tienes: $" + saldo)
    }else {
        alert("disculpa no pudimos prosesar tu pedido")
    }

}

function comprarArros(){
    const precioArros = 1500
    if (saldo >= precioArros){
        saldo -= precioArros;
        alert("compraste un paquete de arros. te queda de saldo: $" + saldo)
    }else {
        alert("Disculpa no te alcansa para un paquete de arros")
    }
}

function entrarAlMercado() {
//    alert("Entraste al mercado. ¡Buena compra!");
    let opcion = prompt(
        "Inicio de secion:\n1- consultar saldo\n2- agregar saldo\n3-comprar arros\nPresiona x para salir"
    );

    while (opcion !== "x") {

        if (opcion === "1") {
            verSaldo();

        } else if (opcion === "2") {
            agregarSaldo();

        } else if (opcion === "3") {
            comprarArros();
        }
        opcion = prompt(
            "Inicio de secion:\n1- consultar saldo\n2- agregar saldo\n3-comprar arros\nPresiona x para salir"
        );
    }

    alert("Gracias por confiar en nosotros");
}

menuDeInicio();