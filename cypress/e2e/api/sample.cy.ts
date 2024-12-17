describe('Sample API Tests', () => {
  it('GET - Sample API Test 1', () => {
    cy.request('GET', 'https://jsonplaceholder.typicode.com/posts/1')
      .its('status')
      .should('equal', 200);
  });

  it('POST - Sample API Test 2', () => {
    const payload = {
      title: 'foo',
      body: 'bar',
      userId: 1,
    };

    cy.request('POST', 'https://jsonplaceholder.typicode.com/posts', payload)
      .its('status')
      .should('equal', 201);
  });
});