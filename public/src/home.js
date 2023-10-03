function getTotalBooksCount(books) {
  return books.length;
}

function getTotalAccountsCount(accounts) {
  return accounts.length;
}

function getBooksBorrowedCount(books) {
  const borrowedBooks = books.filter(book => !book.borrows[0].returned);
  return borrowedBooks.length;
}

function getMostCommonGenres(books) {

  const getAllGenres = (books) => {
    let genres = [];
    books.forEach(({genre}) => {
      if (!genres.includes(genre)) genres.push(genre);
    });
    return genres;
  };

  const getTotalGenreCount = (books, genre) => books.filter(book => book.genre === genre).length;

  let commonGenres = getAllGenres(books).map(name => ({name, count: getTotalGenreCount(books,name)}));
  
  //commonGenres.sort((genreA,genreB)=>genreB.count-genreA.count);
  sortArray(commonGenres);

  commonGenres = top(commonGenres,5);

  return commonGenres;
}

function getMostPopularBooks(books) {
  let popularBooks = [];
  books.forEach(book => {
    const name = book.title;
    const count = book.borrows.length;
    popularBooks.push({name,count});
  });
  sortArray(popularBooks);
  popularBooks = top(popularBooks,5);
  return popularBooks;
}

function getMostPopularAuthors(books, authors) {
  let popularAuthors = [];
  authors.forEach(author => {
    const booksByCurrentAuthor = books.filter(book => book.authorId === author.id);
    const count = booksByCurrentAuthor.reduce((total, {borrows}) => total + borrows.length, 0);
    const name = `${author.name.first} ${author.name.last}`;
    popularAuthors.push({name,count});
  });
  sortArray(popularAuthors);
  popularAuthors = top(popularAuthors,5);
  return popularAuthors;
}

//some helper functions------
function sortArray (array){
  array.sort((itemA,itemB)=>itemB.count-itemA.count);
}

function top(array, max) {
  if(array.length > max) array = array.slice(0,max);
  return array;
}
//---------------------------

module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
