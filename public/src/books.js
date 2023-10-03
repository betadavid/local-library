function findAuthorById(authors, id) {
  return authors.find(author => author.id === id);
}

function findBookById(books, id) {
  return books.find(book => book.id === id);
}

function partitionBooksByBorrowedStatus(books) {
  const returnedBooks = books.filter(({borrows}) => borrows[0].returned);
  const checkedOutBooks = books.filter(({borrows}) => !borrows[0].returned);
  return [checkedOutBooks,returnedBooks];
}

function getBorrowersForBook(book, accounts) {

  const addNewBorrower = (borrowers, borrowerToAdd, returned) => {
    if (!borrowers.some(borrower => borrower.id === borrowerToAdd.id)) borrowers.push({...borrowerToAdd, returned});
  };

  const {borrows} = book;
  let borrowers = [];
  borrows.forEach(borrow => {
    const account = accounts.find(account => account.id === borrow.id);
    addNewBorrower(borrowers,account,borrow.returned);
  });
  
  return borrowers.length > 10 ? borrowers.slice(0,10) : borrowers;
}

module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};
