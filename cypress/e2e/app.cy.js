describe("Product listing page", () => {
    beforeEach(() => {
      cy.intercept(
        "GET",
        "https://equalexperts.github.io/frontend-take-home-test-data/products.json",
        { fixture: "products.json" }
      ).as("getProducts")
  
      cy.visit("http://localhost:5173/")
  
      cy.wait("@getProducts")
    });

    it("renders the product list from API", () => {
      cy.get('[data-testid="product-card"]').should("have.length.greaterThan", 0)
    });
  
    it("loads products", () => {
      cy.get('[data-testid="product-card"]').should("have.length.greaterThan", 0)
      cy.get('[data-testid="add-to-cart"]').first().should("be.visible")
    });
  
    it('displays product details correctly', () => {
      cy.get('[data-testid="product-card"]').first().within(() => {
        cy.get('[data-testid="product-title"]').should("contain", "Mock Product 1")
        cy.get('[data-testid="product-price"]').should("contain", "29.99")
        cy.get('[data-testid="product-description"]').should("contain", "A great product")
      })
    });
  
    it("add product to cart and update badge", () => {
      cy.get('[data-testid="cart-badge"]').should("not.exist")
  
      cy.get('[data-testid="product-card"]')
        .first()
        .within(() => {
          cy.get("button")
            .contains(/add to cart/i)
            .click()
        });
      cy.get('[data-testid="cart-badge"]').should("contain", 1)
    });
  
    it("increaments cart count when adding product multiple times", () => {
      cy.get('[data-testid="product-card"]')
        .first()
        .within(() => {
          cy.get("button")
            .contains(/add to cart/i)
            .click()
            .click()
        });
      cy.get("[data-testid=cart-badge]").should("contain", 2);
    });
  
    it("shows correct quantity in cart", () => {
      cy.get('[data-testid="product-card"]')
        .first()
        .within(() => {
          cy.get("button")
            .contains(/add to cart/i)
            .click()
            .click()
        });
      cy.get('[data-testid="cart-button"]').click()
      cy.get('[data-testid="cart-item"]')
        .first()
        .within(() => {
          cy.get('[data-testid="product-quantity"]').should("contain", 2)
        })
    });

    it("updating quantity when decrease or increase button clicked in cart",()=>{
      cy.get('[data-testid="product-card"]')
        .first()
        .within(() => {
          cy.get("button")
            .contains(/add to cart/i)
            .click()
        })
      cy.get('[data-testid="cart-button"]').click()
      cy.get('[data-testid="cart-item"]')
        .first()
        .within(() => {
          cy.get('[data-testid="quantity-increase"]').click()
          cy.get('[data-testid="product-quantity"]').should("contain", 2)

          cy.get('[data-testid="quantity-decrease"]').click()
          cy.get('[data-testid="product-quantity"]').should("contain", 1)
        });
    });

    it("product removed when decrease button clicked with 1 quantity in cart",()=>{
      cy.get('[data-testid="product-card"]')
        .first()
        .within(() => {
          cy.get("button")
            .contains(/add to cart/i)
            .click()
        })
      cy.get('[data-testid="cart-button"]').click()
      cy.get('[data-testid="cart-item"]')
        .first()
        .within(() => {
          cy.get('[data-testid="quantity-decrease"]').click()
        })
        cy.get('[data-testid="cart-product-list"]').should("contain", "Your cart is empty")
    });

    it("product removed when delete item button clicked in cart",()=>{
      cy.get('[data-testid="product-card"]')
        .first()
        .within(() => {
          cy.get("button")
            .contains(/add to cart/i)
            .click()
        })
      cy.get('[data-testid="cart-button"]').click()
      cy.get('[data-testid="cart-item"]')
        .first()
        .within(() => {
          cy.get('[data-testid="delete-item"]').click()
        })
        cy.get('[data-testid="cart-product-list"]').should("contain", "Your cart is empty")
    });

    it("calculates item price correctly in cart",()=>{
      cy.get('[data-testid="product-card"]')
        .first()
        .within(() => {
          cy.get("button")
            .contains(/add to cart/i)
            .click()
            .click()
            .click()
        });
        cy.get('[data-testid="cart-button"]').click()
        cy.get('[data-testid="cart-item"]')
        .first()
        .within(()=>{
          cy.get('[data-testid="item-price"]').should("contain" ,"$89.97")
        })
      });

    it("displays subtotal correctly in cart",()=>{
      cy.get('[data-testid="product-card"]')
        .first()
        .within(() => {
          cy.get("button")
            .contains(/add to cart/i)
            .click()
            .click()
        });
        cy.get('[data-testid="cart-button"]').click()
        cy.get('[data-testid="product-subtotal"]').should("contain" ,"$59.98")
      });

      it("display product list and it can scroll on mobile", () => {
        cy.viewport("iphone-6")
        cy.get('[data-testid="product-list"]').scrollTo('bottom')
        cy.get('[data-testid="product-list"]').then($el => {
          const el = $el[0]
          expect(el.scrollTop).to.be.greaterThan(0)
          expect(el.scrollTop).to.equal(el.scrollHeight - el.clientHeight)
        })
      });

      it("opens the mobile cart and removes item", () => {
        cy.viewport("iphone-6")
        cy.get('[data-testid="product-card"]')
        .first()
        .within(() => {
          cy.get("button")
            .contains(/add to cart/i)
            .click()
            .click()
        });
        cy.get('[data-testid="cart-button"]').click()
    
        cy.get('[data-testid="cart-item"]')
        .first()
        .within(() => {
          cy.get('[data-testid="delete-item"]').click()
        })
        cy.get('[data-testid="cart-product-list"]').should("contain", "Your cart is empty")
      });

  });
