import React, { Component } from "react";
import Shelf from "./Shelf";
class Shelves extends Component {
  render() {
    const { currentlyReading, wantToRead, read } = this.props;
    return (
      <div>
        <div className='bookshelf'>
          <h2 className='bookshelf-title'>Currently Reading</h2>
          <div className='bookshelf-books'>
            <ol className='books-grid'>
              {currentlyReading.map((book) => (
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
        <div className='bookshelf'>
          <h2 className='bookshelf-title'>Want to Read</h2>
          <div className='bookshelf-books'>
            <ol className='books-grid'>
              {wantToRead.map((book) => (
                <Shelf
                  updateUI={this.props.updateUI}
                  updateShelf={this.props.updateShelf}
                  book={book}
                  key={book.id}
                />
              ))}
            </ol>
          </div>
        </div>
        <div className='bookshelf'>
          <h2 className='bookshelf-title'>Read</h2>
          <div className='bookshelf-books'>
            <ol className='books-grid'>
              {read.map((book) => (
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
      </div>
    );
  }
}
export default Shelves;
