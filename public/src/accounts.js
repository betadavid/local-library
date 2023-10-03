function findAccountById(accounts, id) {
  return accounts.find(account => account.id === id);
}

function sortAccountsByLastName(accounts) {
  return accounts.sort((accountA, accountB) => accountA.name.last.toLowerCase() > accountB.name.last.toLowerCase() ? 1 : -1);
}

function getTotalNumberOfBorrows(account, books) {

  const getNumberOfBorrowsPerBook = (id, {borrows}) => {
    const matches = borrows.filter(borrow => borrow.id===id);
    return matches.length;
  };

  return books.reduce((total, book) => total + getNumberOfBorrowsPerBook(account.id, book),0);
}

function getBooksPossessedByAccount(account, books, authors) {

  function isBookInPossessionByAccount ({borrows}, accountId) {
    return borrows.some(borrow => borrow.id === accountId && !borrow.returned);
  };

  function getAuthor (authors, authorId) {
    return authors.find(author => author.id === authorId);
  }

  const {id} = account;
  const filteredBooks = books.filter(book => isBookInPossessionByAccount(book, id));

  filteredBooks.forEach((book, index, originalCollection) => {
    book = {...book, author: getAuthor(authors, book.authorId)};
    originalCollection[index] = book;
  });
  
  return filteredBooks;
}

module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};
