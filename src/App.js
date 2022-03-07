import React from "react";
import * as BooksAPI from "./BooksAPI";
import "./App.css";
import Search from "./components/Search";
import Shelves from "./components/Shelves";
class BooksApp extends React.Component {
  constructor() {
    super();
    this.state = {
      showSearchPage: false,
      updateSearchPage: () => this.setState({ showSearchPage: false }),
      books: [],
      currentlyReading: [],
      wantToRead: [],
      read: [],
      //change book shelf on UI
      updateUI: (book) => {
        this.setState((state) => ({
          books: state.books.filter((b) => b.id !== book.id).concat([book]),
        }));
        this.state.filterBooks(this.state.books);
      },
      //filter books to thier shelf on UI function
      filterBooks: (books) => {
        this.setState({ books: books });
        const currentlyReading = this.state.books.filter(
          (book) => book.shelf === "currentlyReading"
        );
        const wantToRead = books.filter((book) => book.shelf === "wantToRead");
        const read = books.filter((book) => book.shelf === "read");
        this.setState({
          currentlyReading: currentlyReading,
          wantToRead: wantToRead,
          read: read,
        });
      },
      //change shelf on the API
      updateShelf: (book, shelf, allShelfs) => {
        this.state.books.map((b) => {
          if (shelf === "none") {
            if (b.id === book.id) {
              b.shelf = shelf;
            }
          } else {
            const getID = allShelfs[shelf].find((bookID) => bookID === b.id);
            if (getID) {
              b.shelf = shelf;
            }
          }
          return b;
        });
      },
    };
  }
  async componentDidMount() {
    try {
      //get books data from API request
      const books = await BooksAPI.getAll();
      //map each book to his shelf
      this.state.filterBooks(books);
    } catch (err) {}
  }
  render() {
    return (
      <div className='app'>
        {this.state.showSearchPage ? (
          <Search
            mainBooks={this.state.books}
            updateShelf={this.state.updateShelf}
            updateSearchPage={this.state.updateSearchPage}
            updateUI={this.state.updateUI}
          />
        ) : (
          <div className='list-books'>
            <div className='list-books-title'>
              <h1>MyReads</h1>
            </div>
            <div className='list-books-content'>
              <Shelves
                updateUI={this.state.updateUI}
                updateShelf={this.state.updateShelf}
                books={this.state.books}
                currentlyReading={this.state.currentlyReading}
                wantToRead={this.state.wantToRead}
                read={this.state.read}
              />
            </div>
            <div className='open-search'>
              <button onClick={() => this.setState({ showSearchPage: true })}>
                Add a book
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default BooksApp;
