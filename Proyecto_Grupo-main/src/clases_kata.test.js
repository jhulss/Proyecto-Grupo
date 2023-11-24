import ListaDeKatas from "./Lista_Katas.js";

describe("Katas", () => {
  it("Se permite meter un nombre de kata al proyecto", () => {
    const listaPr = new ListaDeKatas();
    expect(listaPr.añadirkata("Kata - Calculadora String").getNombre()).toEqual("Kata - Calculadora String");
  });

  it("Se permite añadir varios nombres de kata al proyecto", () => {
    const lista = new ListaDeKatas();
    // Se añaden varios katas a la lista nueva
    lista.añadirkata("Kata - Calculadora String");
    lista.añadirkata("Kata - Punto de venta kata");
    lista.añadirkata("Kata - Kata bancario");
  
    // llenamos y verificamos que la todos los katas esten en la lista
    const listaPr = lista.devolver_ListaKatas();
    expect(listaPr[0].getNombre()).toContain("Kata - Calculadora String");
    expect(listaPr[1].getNombre()).toContain("Kata - Punto de venta kata");
    expect(listaPr[2].getNombre()).toContain("Kata - Kata bancario");
  });

  it("Se permite añadir varios katas con la clase lista_katas", () => {
    const listaPr = new ListaDeKatas();
    listaPr.añadirkata("Kata - Calculadora String");
    listaPr.añadirkata("Kata - Punto de venta kata");
    listaPr.añadirkata("Kata - Kata bancario");

    //verificamos que la todos los katas esten en la lista
    expect(listaPr.devolver_ListaKatas()[0].getNombre()).toContain("Kata - Calculadora String");
    expect(listaPr.devolver_ListaKatas()[1].getNombre()).toContain("Kata - Punto de venta kata");
    expect(listaPr.devolver_ListaKatas()[2].getNombre()).toContain("Kata - Kata bancario");
  });
});

describe("Detalles de Katas", () => {
  it("Se permite meter el nombre y detalle de un kata", () => {
    const lista = new ListaDeKatas();
    lista.añadirkata("Kata - Calculadora String","Cree una calculadora simple que tome una cadena con hasta dos números, separados por comas, y devuelve un número entero de la operacion especifica");

    //verificamos que la descripcion del kata este en la lista
    const listaPr = lista.devolver_ListaKatas();
    expect(listaPr[0].getDescripcion()).toContain("Cree una calculadora simple que tome una cadena con hasta dos números, separados por comas, y devuelve un número entero de la operacion especifica");
  });

  it("Se permite meter el nombre, detalle de un kata y su dificultad", () => {
    const lista = new ListaDeKatas();
    lista.añadirkata("Kata - Calculadora String","Cree una calculadora simple que tome una cadena con hasta dos números, separados por comas, y devuelve un número entero de la operacion especifica","Media");

    //verificamos que la descripcion del kata este en la lista
    const listaPr = lista.devolver_ListaKatas();
    expect(listaPr[0].getDificultad()).toContain("Media");
  });

});

describe("Busqueda de Katas", () => {
  it("Permite buscar Katas por el nombre", () => {
    const lista = new ListaDeKatas();
    lista.añadirkata("Kata - Calculadora String","Cree una calculadora simple que tome una cadena con hasta dos números, separados por comas, y devuelve un número entero de la operacion especifica");
    lista.añadirkata("Kata - Kata bancario","Cree una aplicación bancaria sencilla con funciones de depósito, retiro e impresión de estados de cuenta, usando una clase pública, y utilizando cadenas y enteros para fechas y cantidades respectivamente.","Difícil");
    let busqueda = "Calculadora";
    let katas = lista.buscar_Titulo(busqueda);
    expect(katas[0].getNombre()).toContain("Kata - Calculadora String");
  });

  it("Permite buscar Katas por su descripción", () => {
    const lista = new ListaDeKatas();
    lista.añadirkata("Kata - Calculadora String","Cree una calculadora simple que tome una cadena con hasta dos números, separados por comas, y devuelve un número entero de la operacion especifica");
    lista.añadirkata("Kata - Kata bancario","Cree una aplicación bancaria sencilla con funciones de depósito, retiro e impresión de estados de cuenta, usando una clase pública, y utilizando cadenas y enteros para fechas y cantidades respectivamente.","Difícil");
    let busqueda = "Calculadora";
    let katas = lista.buscar_Descripcion(busqueda);
    expect(katas[0].getNombre()).toContain("Kata - Calculadora String");
  });

 
 it("Permite buscar Katas por su dificultad", () => {
    const lista = new ListaDeKatas();
    lista.añadirkata("Kata - Calculadora String","Cree una calculadora simple que tome una cadena con hasta dos números, separados por comas, y devuelve un número entero de la operacion especifica");
    lista.añadirkata("Kata - Kata bancario","Cree una aplicación bancaria sencilla con funciones de depósito, retiro e impresión de estados de cuenta, usando una clase pública, y utilizando cadenas y enteros para fechas y cantidades respectivamente.","Difícil");
    let busqueda = "Difícil";
    let katas = lista.buscar_Dificultad(busqueda);
    expect(katas[0].getDificultad()).toContain("Difícil");
  });
  
  it("Permite buscar Katas por su dificultad: Media", () => {
    const lista = new ListaDeKatas();
    lista.añadirkata("Kata - Calculadora String","Cree una calculadora simple que tome una cadena con hasta dos números, separados por comas, y devuelve un número entero de la operacion especifica");
    lista.añadirkata("Kata - Kata bancario","Cree una aplicación bancaria sencilla con funciones de depósito, retiro e impresión de estados de cuenta, usando una clase pública, y utilizando cadenas y enteros para fechas y cantidades respectivamente.","Media");
    let busqueda = "Media";
    let katas = lista.buscar_Dificultad(busqueda);
    expect(katas[0].getDificultad()).toContain("Media");
  });

  it("Permite buscar Katas por su dificultad: Facil", () => {
    const lista = new ListaDeKatas();
    lista.añadirkata("Kata - Calculadora String","Cree una calculadora simple que tome una cadena con hasta dos números, separados por comas, y devuelve un número entero de la operacion especifica");
    lista.añadirkata("Kata - Kata bancario","Cree una aplicación bancaria sencilla con funciones de depósito, retiro e impresión de estados de cuenta, usando una clase pública, y utilizando cadenas y enteros para fechas y cantidades respectivamente.","Fácil");
    let busqueda = "Fácil";
    let katas = lista.buscar_Dificultad(busqueda);
    expect(katas[0].getDificultad()).toContain("Fácil");
  });
});

describe("Eliminar Katas", () => {
  it("Se permite eliminar kata seleccionada", () => { 
    const lista = new ListaDeKatas();
    let kata_a_eliminar =lista.añadirkata("Kata - Kata bancario","Cree una aplicación bancaria sencilla con funciones de depósito, retiro e impresión de estados de cuenta, usando una clase pública, y utilizando cadenas y enteros para fechas y cantidades respectivamente.","Fácil");
    lista.eliminarKata(kata_a_eliminar);
    expect(lista.devolver_ListaKatas()).not.toContain(kata_a_eliminar); // Lo que se hace con el .not.toContain es verificar que la lista no contenga la kata_a_eliminar
   });



});

describe("Editar Katas", () => {
  it("Se permite actualizar el nombre de kata seleccionada", () => { 
    const lista = new ListaDeKatas();
    let kata_a_editar =lista.añadirkata("Kata - Kata bancario","Cree una aplicación bancaria sencilla con funciones de depósito, retiro e impresión de estados de cuenta, usando una clase pública, y utilizando cadenas y enteros para fechas y cantidades respectivamente.","Fácil");
    lista.editarKata(kata_a_editar,"COBO")
    expect(kata_a_editar.getNombre()).toContain("COBO"); 
   });

   it("Se permite actualizar la descripción  de kata seleccionada", () => { 
    const lista = new ListaDeKatas();
    let kata_a_editar =lista.añadirkata("Kata - Kata bancario","Cree una aplicación bancaria sencilla con funciones de depósito, retiro e impresión de estados de cuenta, usando una clase pública, y utilizando cadenas y enteros para fechas y cantidades respectivamente.","Fácil");
    lista.editarKata(kata_a_editar,"COBO","nueva descripcion")
    expect(kata_a_editar.getDescripcion()).toContain("nueva descripcion"); 
   });

   it("Se permite actualizar la dificultad de kata seleccionada", () => { 
    const lista = new ListaDeKatas();
    let kata_a_editar =lista.añadirkata("Kata - Kata bancario","Cree una aplicación bancaria sencilla con funciones de depósito, retiro e impresión de estados de cuenta, usando una clase pública, y utilizando cadenas y enteros para fechas y cantidades respectivamente.","Fácil");
    lista.editarKata(kata_a_editar,"COBO","nueva descripcion","Media")
    expect(kata_a_editar.getDificultad()).toContain("Media"); 
   });

   it("Se permite actualizar la inforación completa de un kata seleccionada", () => { 
    const lista = new ListaDeKatas();
    let kata_a_editar =lista.añadirkata("Kata - Kata bancario","Cree una aplicación bancaria sencilla con funciones de depósito, retiro e impresión de estados de cuenta, usando una clase pública, y utilizando cadenas y enteros para fechas y cantidades respectivamente.","Fácil");
    lista.editarKata(kata_a_editar,"COBO","nueva descripcion","Media")
    expect(kata_a_editar.getDescripcion()).toContain("nueva descripcion"); 
    expect(kata_a_editar.getDificultad()).toContain("Media");
    expect(kata_a_editar.getNombre()).toContain("COBO"); 
   });

}); 