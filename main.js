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
    super.type = "Book";
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
    return `${this.author} (${this.year}). ${this.title}. ${this.location}: ${this.publisher}.`;
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
    super.type = "Article";
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
    super.type = "Webpage";
  }

  isWebPage(url) {
    if (!url) {
      this.Error_message += "url must be specified; ";
    }
    if (this.Error_message != "") {
      throw new Error(this.Error_message);
    }
  }

  citeApa() {
    return `${this.author} (${this.year}). ${this.title}. ${this.url}.`;
  }
  citeMla() {
    return `${this.author}. \"(${this.title})\"  ${this.url}, (${this.year}).`;
  }
}

class ReferenceManger {
  publications = [];
  stats_year_wise = {};
  stats_type = ["Book", "Article", "Webpage"];

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

  printCitations(type) {
    for (let pub of this.publications) {
      if (type === "APA") console.log(pub.citeApa());
      else console.log(pub.citeMla());
    }
  }

  //This will remove the reference based on title, author, year, type; the type can be either Book or Article or WebPage
  removeReference(title, author, year, type) {
    for (var i = 0; i < this.publications.length; i++) {
      if (
        this.publications[i].title === title &&
        this.publications[i].author === author &&
        this.publications[i].year === year &&
        this.publications[i].type === type
      ) {
        console.log("removed: " + this.publications[i].citeApa() + "\n");
        this.publications.splice(i, 1);
      }
    }
    this.stats_year_wise = {};
    this.get_stats_year_wise();
  }

  //This function will calculate the stats of all the publications and store it in the stats_year_wise
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

  //This function will get the stats from the stats_year_wise and print in the console year wise
  print_in_console_stats() {
    let type;
    console.log("---------Printing stats---------");
    for (let year in ref.stats_year_wise) {
      console.log(year);
      for (let j of ref.stats_type) {
        if (j == "Book") {
          type = `${j}         |`;
        } else {
          type = `${j}      |`;
        }
        console.log(
          `${type}${Array(
            Math.round(ref.stats_year_wise[year][j] * 2 || 0)
          ).join("█")} ${ref.stats_year_wise[year][j] || 0}`
        );
      }
      console.log(
        "-----------------------------------------------------------------------------------------------------"
      );
    }
  }
}

ref = new ReferenceManger();
ref.addWebPage(
  "The Modern JavaScript Tutorial",
  "Ilya Kantor",
  2007,
  "https://javascript.info/"
);
ref.addWebPage(
  "React Tutorial",
  "W3Schools ",
  2013,
  "https://www.w3schools.com/REACT/DEFAULT.ASP"
);
ref.addBook(
  "Eloquent JavaScript: A Modern Introduction to Programming",
  "Marjin Haverbeke",
  "No Starch Press",
  "Berlin",
  2018
);
ref.addBook(
  "JavaScript & JQuery: Interactive Front-End Web Development",
  "Jon Duckett",
  "Wiley",
  "South Carolina",
  2013
);
ref.addBook(
  "JavaScript: The Good Parts",
  "Douglas Crockford",
  "O Reilly",
  "South Carolina",
  2018
);
ref.addArticle("Navio", "John Guerra", "TVCG", 12, 5, 2018);

ref.addArticle(
  "Design patterns in modern JavaScript development",
  "Kristian Poslek",
  "TVCG",
  1,
  2,
  2018
);

ref.addArticle("Design patterns 2", "Kristia", "TVCG", 1, 2, 2019);

console.log("\nciteApa --------------------");
ref.printCitations("APA");
console.log("\nciteMla --------------------");
ref.printCitations("MLA");

ref.get_stats_year_wise();
ref.print_in_console_stats();

ref.removeReference(
  "JavaScript: The Good Parts",
  "Douglas Crockford",
  2018,
  "Book"
);

ref.print_in_console_stats();
