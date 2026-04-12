// Generic Storage Helpers
const getStorageItem = (key) => {
  const stored = localStorage.getItem(key);
  return stored ? JSON.parse(stored) : [];
};

const setStorageItem = (key, data) => {
  localStorage.setItem(key, JSON.stringify(data));
};

// Books
export const getStoredBooks = () => getStorageItem('libra_books');
export const addBookToStore = (book) => {
  const books = getStoredBooks();
  const newBook = { ...book, id: Date.now(), availability: 'Available' };
  setStorageItem('libra_books', [newBook, ...books]);
  return newBook;
};
export const deleteBookFromStore = (id) => {
  const books = getStoredBooks();
  setStorageItem('libra_books', books.filter(b => b.id !== id));
};

// Users
export const getStoredUsers = () => getStorageItem('libra_users');
export const addUserToStore = (user) => {
  const users = getStoredUsers();
  const newUser = { ...user, id: Date.now() };
  setStorageItem('libra_users', [newUser, ...users]);
  return newUser;
};
export const deleteUserFromStore = (id) => {
  const users = getStoredUsers();
  setStorageItem('libra_users', users.filter(u => u.id !== id));
};

// Issues
export const getStoredIssues = () => getStorageItem('libra_issues');
export const addIssueToStore = (issue) => {
  const issues = getStoredIssues();
  const books = getStoredBooks();
  const users = getStoredUsers();
  
  const book = books.find(b => b.id.toString() === issue.bookId.toString());
  const user = users.find(u => u.id.toString() === issue.userId.toString());
  
  const newIssue = { 
    ...issue, 
    id: Date.now(), 
    bookTitle: book?.title || 'Unknown Book',
    userName: user?.name || 'Unknown User',
    status: 'Issued'
  };
  
  // Mark book as Issued
  setStorageItem('libra_books', books.map(b => 
    b.id.toString() === issue.bookId.toString() ? { ...b, availability: 'Issued' } : b
  ));
  
  setStorageItem('libra_issues', [newIssue, ...issues]);
  return newIssue;
};

// Returns
export const returnBookInStore = (returnObj) => {
  const issues = getStoredIssues();
  const books = getStoredBooks();
  
  const issue = issues.find(i => i.id.toString() === returnObj.issueId.toString());
  
  // Mark book as Available
  setStorageItem('libra_books', books.map(b => 
    b.id.toString() === issue.bookId.toString() ? { ...b, availability: 'Available' } : b
  ));
  
  // Remove from active issues
  setStorageItem('libra_issues', issues.filter(i => i.id.toString() !== returnObj.issueId.toString()));
};
