

describe ("User Onboarding Tests", () =>{
    describe("Input and Submit Tests", () => {
        it("Navigate to the site", ()=>{
            cy.visit('http://localhost:3000');
        })
        it("Check text entry into name input", () => {
            cy.get('#name').type('Conan').should('have.value', 'Conan');
        })
        it("Check text entry into password input", () => {
            cy.get('#password').type('testing').should('have.value', 'testing');
        })
        it("Check text entry into email input", () => {
            cy.get('#email').type('test@testing.com').should('have.value', 'test@testing.com');
        })
        it("Check text entry into username input", () => {
            cy.get('#username').type('testMaster420').should('have.value', 'testMaster420');
        })
        it("Check the dropdown ability for role", () => {
            cy.get('#role').select('Student').should('have.value', 'Student');
            cy.get('#role').select('Team Lead').should('have.value', 'Team Lead');
            cy.get('#role').select('Instructor').should('have.value', 'Instructor');
        })
        it("Check terms of service checkbox for checkability", () => {
            cy.get('#tos').click().should('have.checked', true);
        })
        it("Check to see if submit button works", () => {
            cy.get('.submit-button').click();
            cy.get('.card-name').contains('Name: Conan');
            cy.get('.credentials-username').contains('UserName: testMaster420');
            cy.get('.credentials-password').contains('Password: testing');
            cy.get('.credentials-email').contains('Email: test@testing.com');
            cy.get('.card-credentials p:last-child').contains('Role: Instructor');
        })
    })
    describe("Form Validation Testing", () => {
        it("Check to see if Name field validates", () => {
            cy.get('#name').type('x').clear();
            cy.get('.button-container p').contains('Must include a name');
        })
        it("Check to see if email field validates", () => {
            cy.reload();
            cy.get('#email').type('x').clear();
            cy.get('.button-container p').contains('Must include email address.');
        })
        it("Check to see if password field validates", () => {
            cy.reload();
            cy.get('#password').type('x').clear();
            cy.get('.button-container p').contains('Password is Required');
        })
        it("Check to see if username field validates", () => {
            cy.reload();
            cy.get('#username').type('x').clear();
            cy.get('.button-container p').contains('Must include a username.');
        })
        it("Check to see if role field validates", () => {
            cy.reload();
            cy.get('#role').select('Student').select('--Select A Role--')
            cy.get('.button-container p').contains('Must select a valid role.');
        })

    })
})