describe("Mostrar Katas", () => {
    it("Se verifica si el contenido de los 3 katas iniciales es correcto", () => {
        cy.visit("/");
        const titulosKatas = ['Kata - Calculadora String', 'Kata - Punto de venta kata', 'Kata - Kata bancario'];
        const descripKatas = ['Cree una calculadora simple que tome una cadena con hasta dos números, separados por comas, y devuelve un número entero de la operacion especifica', 'Cree una aplicación sencilla para escanear códigos de barras para vender productos.', 'Cree una aplicación bancaria sencilla con funciones de depósito, retiro e impresión de estados de cuenta, usando una clase pública, y utilizando cadenas y enteros para fechas y cantidades respectivamente.'];
        const difKatas = ['Media', 'Fácil', 'Difícil'];
        cy.get('.contenedor-kata').each((contenedor, index) => {
            // Dentro de cada contenedor, verificar que el título sea el esperado
            cy.wrap(contenedor).find('h4').should('have.text', titulosKatas[index]);
            cy.wrap(contenedor).find('p').should('have.text', descripKatas[index]);
            cy.wrap(contenedor).find('span').should('have.text', "Dificultad: " + difKatas[index]);
        });
    });
});

describe("Buscar Katas", () => {
    it("Se filtran resultados segun los criterios de búsqueda", () => {
        cy.visit("/");
        cy.get('#tipo_busqueda').select("nombre");
        cy.get('#busqueda').type("Calculadora");
        cy.get('#btn_busqueda').click();
        cy.get('.contenedor-kata').find('h4').should('have.text', 'Kata - Calculadora String');
    });

    it("Se filtran resultados segun los criterios de búsqueda (descripción)", () => {
        cy.visit("/");
        cy.get('#tipo_busqueda').select("descripcion");
        cy.get('#busqueda').type("Calculadora");
        cy.get('#btn_busqueda').click();
        cy.get('.contenedor-kata').find('p').should('have.text', 'Cree una calculadora simple que tome una cadena con hasta dos números, separados por comas, y devuelve un número entero de la operacion especifica');
    });

    it("Se filtran resultados segun los criterios de búsqueda (dificultad)", () => {
        cy.visit("/");
        cy.get('#tipo_busqueda').select("dificultad");
        cy.get('#dificultadBusqueda').type("facil");
        cy.get('#btn_busqueda').click();
        cy.get('.contenedor-kata').find('span').should('have.text', 'Dificultad: Fácil');
    });



});


describe('Añadir nueva kata', () => {
    it('Debe mostrar, ocultar el formulario y poder añadir una nueva kata', () => {
      cy.visit("/");
  
      cy.get('#form_añadir').should('not.be.visible');
  
      cy.get('#mostrar-formulario').click();
      cy.get('#form_añadir').should('be.visible');
      cy.get('#nombre-kata').type('Nombre de prueba');
      cy.get('#descripcion-kata').type('Descripción de prueba');
      cy.get('#dificultad').select('Fácil');
      cy.get('#form_añadir').submit();
  
      cy.get('#form_añadir').should('not.be.visible');
    });
  });

  describe('Eliminar kata', () => {
    it('Se verifica que se haya eliminado una kata de las iniciales, deberia mostrar 2 katas', () => {
      cy.visit("/");
      cy.get('.contenedor-kata').its('length').then(initialCount => {
        if (initialCount > 0) {
          cy.get('.contenedor-kata').first().as('kata');
          cy.get('@kata').contains('Eliminar').click();
          cy.on('window:confirm', () => true);
          cy.get('.contenedor-kata').should('have.length', initialCount - 1);
        }
      });
    });
  });

  describe('Editar kata', () => {
    it('Se verifica que se haya editado  un kata correctamente', () => {
      cy.visit("/");
      cy.get('.contenedor-kata').first().as('kata');
      cy.get('@kata').contains('Editar').click();
      cy.get('@kata').find('input[type="text"]').should('have.length', 2);
      const nuevoNombre= 'La Chulo Kata';
      const nuevaDescripcion='pongan bachata en tdd';
      const nuevaDificultad='Media';
      cy.get('@kata').find('input[type="text"]').eq(0).clear().type(nuevoNombre);
      cy.get('@kata').find('input[type="text"]').eq(1).clear().type(nuevaDescripcion);
      cy.get('@kata').find('select').select(nuevaDificultad);
      cy.get('@kata').contains('Confirmar').click();     
    });
  });