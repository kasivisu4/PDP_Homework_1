var validUrl = require("valid-url");
class Publication {
  title;
  author;
  year;
  Error_message = "";

  constructor(title, author, year) {
    this.isPublication(title, author, year);
    this.title = title;
    this.author = author;
    this.year = year;
  }
  isPublication(title, author, year) {
    if (!title) {
      this.Error_message += " title must be specified; ";
    }
    if (!author) {
      this.Error_message += " author must be specified; ";
    }
    if (!year) {
      this.Error_message += " year must be specified; ";
    } else if (typeof year != "number" || year.toString().length != 4) {
      this.Error_message +=
        " year should be a number and no of digits should be 4; ";
    }
  }
}

class Book extends Publication {
  publisher;
  location;
  constructor(title, author, publisher, location, year) {
    super(title, author, year);
    this.isBook(publisher, location);
    this.publisher = publisher;
    this.location = location;
  }
  isBook(publisher, location) {
    if (!publisher) {
      this.Error_message += " publisher must be specified; ";
    }
    if (!location) {
      this.Error_message += "location must be specified; ";
    }
    if (this.Error_message != "") {
      throw new Error(this.Error_message);
    }
  }
  citeApa() {
    return ` ${this.author} (${this.year}). ${this.title}. ${this.location}: ${this.publisher}.`;
  }
  citeMla() {
    return `${this.author}. ${this.title}. ${this.location}: ${this.publisher}, ${this.year}.`;
  }
}

class Article extends Publication {
  journal_name;
  volume;
  issue;
  constructor(title, author, journal_name, volume, issue, year) {
    super(title, author, year);
    this.isArticle(journal_name, volume, issue);
    this.journal_name = journal_name;
    this.volume = volume;
    this.issue = issue;
  }

  isArticle(journal_name, volume, issue) {
    if (!journal_name) {
      this.Error_message += "journal name must be specified; ";
    }
    if (typeof volume != "number") {
      this.Error_message += "volume must be number; ";
    }
    if (typeof issue != "number") {
      this.Error_message += "issue must be number; ";
    }
    if (this.Error_message != "") {
      throw new Error(this.Error_message);
    }
  }
  citeApa() {
    return `${this.author} (${this.year}). ${this.title}. ${this.journal_name}, ${this.volume}(${this.issue}).`;
  }
  citeMla() {
    return `${this.author}. \"(${this.title})\"  ${this.journal_name}, ${this.volume}.${this.issue} (${this.year}).`;
  }
}

class WebPage extends Publication {
  url;
  constructor(title, author, year, url) {
    super(title, author, year);
    this.isWebPage(url);
    this.url = url;
  }

  isWebPage(url) {
    if (!url) {
      this.Error_message += "url must be specified; ";
    } else if (!validUrl.isUri(url)) {
      this.Error_message += "url specified is wrong, please check!!; ";
    }

    if (this.Error_message != "") {
      throw new Error(this.Error_message);
    }
  }
}

class ReferenceManger {
  publications = [];
  addWebPage(title, author, year, url) {
    this.publications.push(new WebPage(title, author, year, url));
  }

  addBook(title, author, publisher, location, year) {
    this.publications.push(new Book(title, author, publisher, location, year));
  }

  addArticle(title, author, journal_name, volume, issue, year) {
    this.publications.push(
      new Article(title, author, journal_name, volume, issue, year)
    );
  }
}

new WebPage("Title", "author", 2012, "https://google.com");

module.exports = {
  Book,
};

// for (i = 5; i < 20; i++) {
//   console.log(`%c ${Array(Math.round(i * 2)).join("█")}\n`, "color: crimson");
// }
