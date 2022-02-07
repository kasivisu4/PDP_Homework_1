main = require("./main.js");
console.log(main);
let assert = require("assert");
describe("Publication Testing", function () {
  let book = new main.Book(
    "Eloquent JavaScript 3rd edition",
    "Marijn Haverbeke",
    "Creative Commons",
    "CA",
    2018
  );
  it("Book details Test", () => {
    assert.equal(
      book.get_book_details(),
      "Book Title: Eloquent JavaScript 3rd edition, Author: Marijn Haverbeke, Publisher: Creative Commons, Location: CA, Year : 2018"
    );
  });
});
