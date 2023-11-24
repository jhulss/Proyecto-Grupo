describe("Creacion Usuario", () => {
  it("Se verifica si se puede registrar un nuevo usuario con nombre y contraseña con error", () => {
      cy.visit('/');
      cy.get('#botonRegistro').click();
      cy.get('#nombreReg').type("Augusto");
      cy.get('#botonRegistro').should('exist');
      cy.get('#contraReg').type("Naospx123");
      cy.get('#confirmarContra').type("oppula862");
      cy.get('#guardar-Reg').click();
      cy.get('#resultadosUs').should('not.have.text', 'El usuario con nombre Augusto se registro');
  });
  it("Se verifica si se puede registrar un nuevo usuario con nombre y contraseña sin error", () => {
    cy.visit('/');
    cy.get('#botonRegistro').click();
    cy.get('#nombreReg').type("Augusto");
    cy.get('#contraReg').type("Parker775");
    cy.get('#confirmarContra').type("Parker775");
    cy.get('#guardar-Reg').click();
    cy.get('#resultadosUs').should('have.text', 'El usuario con nombre Augusto se registro');
  });
});

describe("Iniciar sesion usuario", () => {
  it("Se verifica si el usuario ingresado con nombre puede iniciar sesion", () => {
    cy.visit('/');
    cy.get('#botonRegistro').click();
    cy.get('#nombreReg').type("Daniela");
    cy.get('#contraReg').type("Monps4590");
    cy.get('#confirmarContra').type("Monps4590");
    cy.get('#guardar-Reg').click();
    cy.get('#botonIniciarSesion').click();
    cy.get('#nombreIn').type("Daniela");
    cy.get('#contraIn').type("Monps4590");
    cy.get('#Inicio-Sesion').click();
    cy.get('#resultadosUs').should('have.text', 'El usuario con nombre Daniela se ingresó correctamente');
  });

  it("Se verifica error con el usuario ingresando nombre y contraseña", () => {
    cy.visit('/');
    cy.get('#botonRegistro').click();
    cy.get('#nombreReg').type("Mariano");
    cy.get('#contraReg').type("nyl7634");
    cy.get('#confirmarContra').type("nyl7634");
    cy.get('#guardar-Reg').click();
    cy.get('#botonIniciarSesion').click();
    cy.get('#nombreIn').type("Mariano");
    cy.get('#contraIn').type("nyl7634");
    cy.get('#Inicio-Sesion').click();
    cy.get('#resultadosUs').should('not.have.text', 'El usuario con nombre Mariano se ingresó correctamente');
  });
});

describe("Iniciar sesion usuario", () => {
  it("Se verifica la identificacion del usuario ingresado para estudiante y docente", () => {
    cy.visit('/');
    cy.get('#botonRegistro').click();
    cy.get('#nombreReg').type("Saturnino");
    cy.get('#tipoReg').select('Estudiante');
    cy.get('#tipoReg').should('have.value', 'Estudiante');
    cy.get('#contraReg').type("pads111");
    cy.get('#confirmarContra').type("pads111");
    cy.get('#guardar-Reg').click();
    cy.get('#botonIniciarSesion').click();
    cy.get('#nombreIn').type("Saturnino");
    cy.get('#contraIn').type("pads111");
    cy.get('#Inicio-Sesion').click();
    cy.get('#resultadosUs').should('have.text', 'El usuario con nombre Saturnino se ingresó correctamente');
  });

  it("Se verifica la identificacion del usuario ingresado para docente", () => {
    cy.visit('/');
    cy.get('#botonRegistro').click();
    cy.get('#nombreReg').type("Nemesio");
    cy.get('#tipoReg').select('Docente');
    cy.get('#tipoReg').should('have.value', 'Docente');
    cy.get('#contraReg').type("bypass2333");
    cy.get('#confirmarContra').type("bypass2333");
    cy.get('#guardar-Reg').click();
    cy.get('#botonIniciarSesion').click();
    cy.get('#nombreIn').type("Nemesio");
    cy.get('#contraIn').type("bypass2333");
    cy.get('#Inicio-Sesion').click();
    cy.get('#resultadosUs').should('have.text', 'El usuario con nombre Nemesio se ingresó correctamente');
  });
});