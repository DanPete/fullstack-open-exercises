describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    const user = {
      name: 'Dan Sack',
      username: 'danpete',
      password: 'secret',
    }
    const otherUser = {
      name: 'Pete',
      username: 'pete',
      password: 'tester',
    }
    cy.request('POST', 'http://localhost:3001/api/users/', user)
    cy.request('POST', 'http://localhost:3001/api/users/', otherUser)
    cy.visit('http://localhost:3000')
  })

  it('front page can be opened', function(){
    cy.contains('blogs')
    cy.contains('login')
  })

  it('login form can be opened', function() {
    cy.contains('login').click()
  })

  it('login form is shown', function() {
    cy.contains('login').click()

    cy.contains('username')
    cy.contains('password')
  })
  describe('Login', function() {
    it('succeeds with correct password', function() {
      cy.contains('login').click()
      cy.get('input[name="username"]').type('danpete')
      cy.get('input[name="password"]').type('secret')
      cy.get('button[type="submit"]').click()

      cy.contains('Hi Dan Sack')
    })

    it('fails with wrong password', function() {
      cy.contains('login').click()
      cy.get('input[name="username"]').type('danpete')
      cy.get('input[name="password"]').type('wrong')
      cy.get('button[type="submit"]').click()

      cy.get('.error')
        .should('contain', 'invalid username or password')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
        .and('have.css', 'border-style', 'solid')
    })
  })

  describe('when logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'danpete', password: 'secret' })
    })

    it('a new blog can be create', function() {
      cy.contains('new blog').click()
      cy.get('input[name="title"]').type('Testing with Cypress')
      cy.get('input[name="author"]').type('Cypress')
      cy.get('input[name="url"]').type('www.cypress.io')
      cy.get('button[type="submit"]').click()
      cy.contains('Testing with Cypress')
    })

    describe('and a blog exists', function() {
      beforeEach(function () {
        cy.createBlog({
          title: 'Existing Note',
          author: 'Cypress',
          url: 'Cyrpress.io'
        })
      })

      it('can be removed by creator', function() {
        cy.contains('view').click()
        cy.contains('remove').click()

        cy.get('.success')
          .should('contain', 'Deleted Blog')
          .and('have.css', 'color', 'rgb(0, 128, 0)')
          .and('have.css', 'border-style', 'solid')
      })

      it('can only be remove by creator', function() {
        cy.contains('Logout').click()
        cy.login({ username: 'pete', password: 'tester' })
        cy.contains('view').click()
        cy.get('remove')
          .should('not.exist')

      })
    })

    describe('and several blogs exist', function() {
      beforeEach(function () {
        cy.createBlog({
          title: 'First Blog',
          author: 'Cypress',
          url: 'Cypress.io',
          likes: 1
        })
        cy.createBlog({
          title: 'Second Blog',
          author: 'Cypress',
          url: 'Cypress.io',
          likes: 3
        })
        cy.createBlog({
          title: 'Third Blog',
          author: 'Cypress',
          url: 'Cypress.io',
          likes: 2
        })
      })

      it('blogs are ordered by likes', function(){
        cy.get('.blog').then(blogs => {
          console.log(blogs[0])
          cy.wrap(blogs[0]).contains('Second Blog')
          cy.wrap(blogs[1]).contains('Third Blog')
          cy.wrap(blogs[2]).contains('First Blog')
        })
      })

      it('blogs change order by likes', function(){
        cy.get('.blog').then(blogs => {
          cy.wrap(blogs[1]).contains('Third Blog')
            .contains('view')
            .click()
            .parent()
            .contains('like')
            .click()
            .click()
        })
        cy.wait(500)
        cy.get('.blog').first().contains('Third Blog')
      })
    })
  })

  describe('Users', function() {
    beforeEach(function () {
      cy.login({ username: 'danpete', password: 'secret' })
      cy.createBlog({
        title: 'Existing Note',
        author: 'Cypress',
        url: 'Cypress.io'
      })
    })

    it('can like a blog', function() {
      cy.contains('view').click()
      cy.contains('like').click()

      cy.contains('likes 1')
    })

    it(' and guests can like a blog', function() {
      cy.contains('Logout').click()
      cy.contains('view').click()
      cy.contains('like').click()

      cy.contains('likes 1')
    })
  })
})