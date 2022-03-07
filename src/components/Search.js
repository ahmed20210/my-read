import React, { Component } from "react";
import { search } from "../BooksAPI";
import Shelf from "./Shelf";
class Search extends Component {
  constructor() {
    super();
    this.state = {
      books: [],
      query: "",
    };
  }
  //Update UI when search
  handleSearch = async (e) => {
    try {
      const query = e.target.value;
      if (query.trim()) {
        this.setState({ query });
        //Update API when search 
        const result = await search(query);

        if (result.error) {
          this.setState({ books: [] });
        } else {
          this.setState({ books: result });
        }
      } else {
        this.setState({ books: [] });
      }
    } catch (e) {
      console.log(e);
    }
  };

  render() {
    //Filter Books when search by entered index
    let verifiedBooks = [];
    const searchBooks = this.state.books;
    if (searchBooks.length > 0) {
      verifiedBooks = searchBooks.map((book) => {
        this.props.mainBooks.forEach((bookOnShelf) => {
          if (book.id === bookOnShelf.id) {
            book.shelf = bookOnShelf.shelf;
          }
        });
        return book;
      });
    }
    return (
      <div className='search-books'>
        <div className='search-books-bar'>
          <button
            className='close-search'
            value={this.state.query}
            onClick={this.props.updateSearchPage}>
            Close
          </button>
          <div className='search-books-input-wrapper'>
            <input
              type='text'
              onChange={this.handleSearch}
              placeholder='Search by title or author'
            />
          </div>
        </div>
        <div className='search-books-results'>
          <ol className='books-grid'>
            {verifiedBooks.map((book) => (
              <Shelf
                updateUI={this.props.updateUI}
                book={book}
                key={book.id}
                updateShelf={this.props.updateShelf}
              />
            ))}
          </ol>
        </div>
      </div>
    );
  }
}
export default Search;
