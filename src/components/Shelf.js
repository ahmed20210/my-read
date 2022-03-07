import React, { Component } from "react";
import { update } from "../BooksAPI";
class Shelf extends Component {
  //Change book shelf in UI and API when change shelf
  moveBook = async (e) => {
    try {
      const book = this.props.book;
      const shelf = e.target.value;
      //Change API shelf 
      const result = await update(book, shelf);
      this.props.updateShelf(book, shelf, result);
      this.props.updateUI(book);
    } catch (e) {}
  };
  render() {
    const { book } = this.props;
    return (
      <li>
        <div className='book'>
          <div className='book-top'>
            <div
              className='book-cover'
              style={{
                width: 128,
                height: 188,
                backgroundImage: `url(${
                  book.hasOwnProperty("imageLinks")
                    ? book.imageLinks.thumbnail
                    : ""
                })`,
              }}></div>
            <div className='book-shelf-changer'>
              <select
                value={book.shelf == null ? "none" : book.shelf}
                onChange={this.moveBook}>
                <option value='move' disabled>
                  Move to...
                </option>
                <option value='currentlyReading'>Currently Reading</option>
                <option value='wantToRead'>Want to Read</option>
                <option value='read'>Read</option>
                <option value='none'>None</option>
              </select>
            </div>
          </div>
          <div className='book-title'>
            {book.hasOwnProperty("title") ? book.title : ""}
          </div>
          <div className='book-authors'>
            {book.hasOwnProperty("author") ? book.author : ""}
          </div>
        </div>
      </li>
    );
  }
}
export default Shelf;
