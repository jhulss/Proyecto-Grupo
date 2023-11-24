describe("Creacion Curso", () => {
    it("Se verifica si se puede crear un nuevo curso con nombre con error de logeo", () => {
        cy.visit('/');
        cy.get('#btn_crearcurso').click();
        cy.get('#nombreCurso').type("Curso Ing Software");
        cy.get('#bt_AceptCurso').click();
        cy.on('window:alert', (mensaje) => {
            // Verifica si el mensaje de la alerta es el esperado
            expect(mensaje).to.equal('No hay usuario logeado. Inicia sesión antes de crear un curso.');
        });
    });
    it("Se verifica si se puede crear un nuevo curso con nombre con error de nombre de curso", () => {
        
        cy.visit('/');
        cy.get('#botonRegistro').click();
        cy.get('#nombreReg').type("Walter");
        cy.get('#tipoReg').select('Docente');
        cy.get('#tipoReg').should('have.value', 'Docente');
        cy.get('#contraReg').type("bypass2333");
        cy.get('#confirmarContra').type("bypass2333");
        cy.get('#guardar-Reg').click();
        cy.get('#botonIniciarSesion').click();
        cy.get('#nombreIn').type("Walter");
        cy.get('#contraIn').type("bypass2333");
        cy.get('#Inicio-Sesion').click();
        cy.get('#btn_crearcurso').click();
        cy.get('#bt_AceptCurso').click();
        cy.on('window:alert', (mensaje) => {
            // Verifica si el mensaje de la alerta es el esperado
            expect(mensaje).to.equal('Faltan datos para crear el curso');
        });
    });

    it("Se verifica si se puede crear un nuevo curso con nombre sin error", () => {
        
        cy.visit('/');
        cy.get('#botonRegistro').click();
        cy.get('#nombreReg').type("Walter");
        cy.get('#tipoReg').select('Docente');
        cy.get('#tipoReg').should('have.value', 'Docente');
        cy.get('#contraReg').type("bypass2333");
        cy.get('#confirmarContra').type("bypass2333");
        cy.get('#guardar-Reg').click();
        cy.get('#botonIniciarSesion').click();
        cy.get('#nombreIn').type("Walter");
        cy.get('#contraIn').type("bypass2333");
        cy.get('#Inicio-Sesion').click();
        cy.get('#btn_crearcurso').click();
        cy.get('#nombreCurso').type("Curso de Ing. de Software");
        cy.get('#bt_AceptCurso').click();
        cy.on('window:alert', (mensaje) => {
            // Verifica si el mensaje de la alerta es el esperado
            expect(mensaje).to.equal('El curso se creó con éxito');
        });
    });
});

describe("Inscribirse a Curso", () => {
    it("NO se puede inscribir a un curso siendo DOCENTE", () => {
        cy.visit('/');
        cy.get('#botonRegistro').click();
        cy.get('#nombreReg').type("Jesse");
        cy.get('#tipoReg').select('Docente');
        cy.get('#tipoReg').should('have.value', 'Docente');
        cy.get('#contraReg').type("yoMrWhite");
        cy.get('#confirmarContra').type("yoMrWhite");
        cy.get('#guardar-Reg').click();
        cy.get('#botonIniciarSesion').click();
        cy.get('#nombreIn').type("Jesse");
        cy.get('#contraIn').type("yoMrWhite");
        cy.get('#Inicio-Sesion').click();
        cy.get('#btn_crearcurso').click();
        cy.get('#nombreCurso').type("Curso de Quimica xd");
        cy.get('#bt_AceptCurso').click();
        cy.reload();
        cy.get('#botonIniciarSesion').click();
        cy.get('#nombreIn').type("Jesse");
        cy.get('#contraIn').type("yoMrWhite");
        cy.get('#Inicio-Sesion').click();
        cy.get('#menu-cursos').contains("Curso de Quimica xd").click();
        cy.get('#bt_AceptInscripcion').click();

        // Verificación de fracaso de la inscripción
        cy.on('window:alert', (mensaje) => {
            // Verifica si el mensaje de la alerta es el esperado
            if (mensaje.includes("Debes estar")) {
                // Si es el mensaje esperado, puedes realizar alguna acción o simplemente continuar con la prueba
                expect(mensaje).to.equal("Debes estar logeado como Estudiante para inscribirte a un curso");
            }
        });
    });
    it("Se puede inscribir a un curso siendo ESTUDIANTE", () => {
        cy.visit('/');
        cy.get('#botonRegistro').click();
        cy.get('#nombreReg').type("Jesse");
        cy.get('#tipoReg').select('Docente');
        cy.get('#tipoReg').should('have.value', 'Docente');
        cy.get('#contraReg').type("yoMrWhite");
        cy.get('#confirmarContra').type("yoMrWhite");
        cy.get('#guardar-Reg').click();
        cy.get('#botonIniciarSesion').click();
        cy.get('#nombreIn').type("Jesse");
        cy.get('#contraIn').type("yoMrWhite");
        cy.get('#Inicio-Sesion').click();
        cy.get('#btn_crearcurso').click();
        cy.get('#nombreCurso').type("Curso sus xd");
        cy.get('#bt_AceptCurso').click();
        cy.reload();

        cy.get('#botonRegistro').click();
        cy.get('#nombreReg').type("Gustavo");
        cy.get('#tipoReg').select('Estudiante');
        cy.get('#tipoReg').should('have.value', 'Estudiante');
        cy.get('#contraReg').type("LosPollosH3rmanos");
        cy.get('#confirmarContra').type("LosPollosH3rmanos");
        cy.get('#guardar-Reg').click();
        cy.get('#botonIniciarSesion').click();
        cy.get('#nombreIn').type("Gustavo");
        cy.get('#contraIn').type("LosPollosH3rmanos");
        cy.get('#Inicio-Sesion').click();
        cy.get('#menu-cursos').contains("Curso sus xd").click();
        cy.get('#bt_AceptInscripcion').click();

        // Verificación de éxito de la inscripción
        cy.on('window:alert', (mensaje) => {
         // Verifica si el mensaje de la alerta es el esperado
            if (mensaje.includes("Te inscribiste a")) {
                // Si es el mensaje esperado, puedes realizar alguna acción o simplemente continuar con la prueba
                expect(mensaje).to.equal("Te inscribiste a Curso sus xd");
            }
        });
    });
});