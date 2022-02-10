class Publication {
  title;
  author;
  year;
  Error_message = "";
  type;

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
    super.type = "book";
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
    super.type = "article";
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
    super.type = "webpage";
  }

  isWebPage(url) {
    if (!url) {
      this.Error_message += "url must be specified; ";
    }
    if (this.Error_message != "") {
      throw new Error(this.Error_message);
    }
  }
}

class ReferenceManger {
  publications = [];
  stats_year_wise = {};

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

  get_stats_year_wise() {
    for (var i = 0; i < this.publications.length; i++) {
      if (
        this.publications[i].year in this.stats_year_wise &&
        this.publications[i].type in
          this.stats_year_wise[this.publications[i].year]
      ) {
        this.stats_year_wise[this.publications[i].year][
          this.publications[i].type
        ] += 1;
      } else if (this.publications[i].year in this.stats_year_wise) {
        this.stats_year_wise[this.publications[i].year][
          this.publications[i].type
        ] = 1;
      } else {
        this.stats_year_wise[this.publications[i].year] = {};
        this.stats_year_wise[this.publications[i].year][
          this.publications[i].type
        ] = 1;
      }
    }
  }
}

ref = new ReferenceManger();
ref.addWebPage("Title", "author", 2012, "https://google.com");
ref.addWebPage("Title", "author", 2012, "https://google.com");
ref.addBook("Title", "author", "publisher", "Location", 2012);
ref.addBook("Title", "author", "publisher", "Location", 2012);
ref.addBook("Title", "author", "publisher", "Location", 2010);
ref.addBook("Title", "author", "publisher", "Location", 2011);
ref.addBook("Title", "author", "publisher", "Location", 2013);
ref.addArticle("title", "author", "journal_name", 1, 2, 2019);
ref.get_stats_year_wise();
console.log(ref.stats_year_wise);
for (let i in ref.stats_year_wise) {
  console.log(i);
  console.log(
    `Book    | %c ${Array(
      Math.round(ref.stats_year_wise[i].book * 2 || 0)
    ).join("█")} ${ref.stats_year_wise[i].book || 0}`,
    "color: red"
  );
  console.log(
    `Article | %c ${Array(
      Math.round(ref.stats_year_wise[i].article * 2 || 0)
    ).join("█")} ${ref.stats_year_wise[i].article || 0}`,
    "color: green"
  );
  console.log(
    `Webpage | %c ${Array(
      Math.round(ref.stats_year_wise[i].webpage * 2 || 0)
    ).join("█")} ${ref.stats_year_wise[i].webpage || 0}`,
    "color: blue"
  );
  console.log(
    "-----------------------------------------------------------------------------------------------------"
  );
}
