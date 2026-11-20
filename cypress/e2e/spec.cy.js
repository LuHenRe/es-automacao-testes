// Estudante(s): Luiz Henrique Garcia Braga dos Reis e Brenda Biode Evangelista

describe('TODOMvc App', () => {
  it('Verifica se app está abrindo', () => {
    cy.visit('')
  })

  it('Insere uma tarefa', () => {
    cy.visit('');

    cy.get('[data-cy=todo-input]')
      .type('Engenharia de Software{enter}');

    cy.get('[data-cy=todos-list]')
      .children()
      .should('have.length', 1)
      .first()
      .should('have.text', 'Engenharia de Software');
  });

  it('Insere e deleta uma tarefa', () => {
    cy.visit('');

    cy.get('[data-cy=todo-input]')
      .type('Engenharia de Software{enter}');

    cy.get('[data-cy=todos-list]')
      .children()
      .should('have.length', 1);

    cy.get('[data-cy=todos-list] > li [data-cy=remove-todo-btn]')
      .invoke('show')
      .click();

    cy.get('[data-cy=todos-list]')
      .children()
      .should('have.length', 0);
  });

  it('Filtra tarefas completas e ativas', () => {
    cy.visit('');

    cy.get('[data-cy=todo-input]')
      .type('Atividade de ES{enter}')
      .type('Artigo de ES{enter}');

    cy.get('[data-cy=todos-list] > li [data-cy=toggle-todo-checkbox]')
      .first()
      .click();

    cy.get('[data-cy=filter-active-link]')
      .click();
    cy.get('[data-cy=todos-list]')
      .children()
      .should('have.length', 1)
      .first()
      .should('have.text', 'Artigo de ES');

    cy.get('[data-cy=filter-completed-link]')
      .click();
    cy.get('[data-cy=todos-list]')
      .children()
      .should('have.length', 1)
      .first()
      .should('have.text', 'Atividade de ES');

    cy.get('[data-cy=filter-all-link]')
      .click();
    cy.get('[data-cy=todos-list]')
      .children()
      .should('have.length', 2);
  });

  // Caso de Teste 5: verificar se o contador de tarefas restantes (.todo-count) atualiza corretamente no plural e singular conforme tarefas são concluídas ou reativadas.
  it('Atualiza contador de tarefas restantes', () => {
    cy.visit('');

    cy.get('[data-cy=todo-input]')
      .type('Tarefa 1{enter}')
      .type('Tarefa 2{enter}');

    cy.get('.todo-count')
      .should('have.text', '2 items left');

    cy.get('[data-cy=todos-list] > li [data-cy=toggle-todo-checkbox]')
      .first()
      .click();

    cy.get('.todo-count')
      .should('have.text', '1 item left');

    cy.get('[data-cy=todos-list] > li [data-cy=toggle-todo-checkbox]')
      .last()
      .click();

    cy.get('.todo-count')
      .should('have.text', '0 items left');

    cy.get('[data-cy=todos-list] > li [data-cy=toggle-todo-checkbox]')
      .first()
      .click();

    cy.get('.todo-count')
      .should('have.text', '1 item left');
  });

  // Caso de Teste 6: verificar se a ação de marcar/desmarcar todas as tarefas conclui todas quando há pendentes e reativa todas quando já estão concluídas.
  it('Marca e desmarca todas as tarefas de uma vez', () => {
    cy.visit('');

    cy.get('[data-cy=todo-input]')
      .type('Tarefa A{enter}')
      .type('Tarefa B{enter}')
      .type('Tarefa C{enter}');

    cy.get('[data-cy=todos-list] > li [data-cy=toggle-todo-checkbox]')
      .first()
      .click();

    cy.get('.toggle-all-label')
      .click();

    cy.get('[data-cy=todos-list] > li')
      .should('have.length', 3)
      .each(($item) => {
        cy.wrap($item).should('have.class', 'completed');
        cy.wrap($item).find('[data-cy=toggle-todo-checkbox]').should('be.checked');
      });

    cy.get('.todo-count')
      .should('have.text', '0 items left');

    cy.get('.toggle-all-label')
      .click();

    cy.get('[data-cy=todos-list] > li')
      .should('have.length', 3)
      .each(($item) => {
        cy.wrap($item).should('not.have.class', 'completed');
        cy.wrap($item).find('[data-cy=toggle-todo-checkbox]').should('not.be.checked');
      });

    cy.get('.todo-count')
      .should('have.text', '3 items left');
  });

  // Caso de Teste 7: verificar a edição de uma tarefa existente com confirmação via Enter e cancelamento via Escape.
  it('Edita uma tarefa existente com confirmação e cancelamento', () => {
    cy.visit('');

    cy.get('[data-cy=todo-input]')
      .type('Tarefa original{enter}');

    cy.get('[data-cy=todos-list] > li label')
      .first()
      .dblclick();

    cy.get('[data-cy=todos-list] > li input.edit')
      .should('be.visible')
      .clear()
      .type('Tarefa editada{enter}');

    cy.get('[data-cy=todos-list] > li')
      .first()
      .should('have.text', 'Tarefa editada')
      .and('not.have.class', 'editing');

    cy.get('[data-cy=todos-list] > li label')
      .first()
      .dblclick();

    cy.get('[data-cy=todos-list] > li input.edit')
      .should('be.visible')
      .clear()
      .type('Alteração cancelada{esc}');

    cy.get('[data-cy=todos-list] > li')
      .first()
      .should('have.text', 'Tarefa editada')
      .and('not.have.class', 'editing');
  });
});