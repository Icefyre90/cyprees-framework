/// <reference types="cypress"/>
Cypress.on('uncaught:exception', (err, runnable) => {
  // returning false here prevents Cypress from
  // failing the test
  return false
})
describe('Product test', () =>
 {
  let data;
  before(() => {
    cy.fixture('siteinfo').then((fData) => {
        data = fData;
    });
  });
  
        
    //  it('login-logout user', () =>                   // login, loguot
    //  {
    //     cy.login(data.email,data.password)  // login proces
    //     cy.logout()                         // logout proces
    // })



    it('Verify cost of 2 item!', () =>     // verify catalog product price to cart price 
    {   
        let price;
        let multiply= 2;
        let finalprice;

        cy.visit(data.siteUrl)                                    // Opens the URL
        cy.get('#search').type(data.search_word)                  // input search product
        cy.get('.button[type=submit][title=Pretraga]').click()    // click on search
        cy.get(".products-grid li:nth-child(10) [data-tipped-selector='#web-price-tooltip'] .price").invoke('attr','content').then(content => {
           
           console.log(content);
           price = content;
           console.log(price);
           finalprice= price * 2;
           finalprice= parseFloat(finalprice).toFixed(2)
           finalprice=finalprice.toString();
        });
       
        cy.get('.products-grid li:nth-child(10)').click()         // click on item
        cy.get('#qty').clear().type(multiply)                     // add 1 more item
        cy.get('#product-addtocart-button').click()               // add in cart 
        cy.get(".product-cart-total .price").invoke('attr','content').then(str => {

          expect(str).to.equal(finalprice)                        // validation point 
        } )
    })
  })