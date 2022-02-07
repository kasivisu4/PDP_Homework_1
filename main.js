class Publication {
  title;
  author;
  year_of_publication;
  Error_message = "";

  constructor(title, author, year_of_publication) {
    this.isPublication(title, author, year_of_publication);
    this.title = title;
    this.author = author;
    this.year_of_publication = year_of_publication;
  }
  isPublication(title, author, year_of_publication) {
    if (!title) {
      this.Error_message += " title must be specified;";
    }
    if (!author) {
      this.Error_message += " author must be specified";
    }
    if (!year_of_publication) {
      this.Error_message += " year_of_publication must be specified";
    } else if (
      typeof year_of_publication != "number" ||
      year_of_publication.toString().length != 4
    ) {
      this.Error_message +=
        " year_of_public should be a number and no of digits should be 4";
    }
  }
}

class Book extends Publication {
  publisher;
  location;
  constructor(title, author, publisher, location, year) {
    super(title, author, year);
    this.isBook(publisher, location);
  }
  isBook(publisher, location) {
    if (!publisher) {
      this.Error_message += " publisher must be specified";
    }
    if (!location) {
      this.Error_message += "location must be specified";
    }
    if (this.Error_message != "") {
      throw new Error(this.Error_message);
    }
  }
}

class Article extends Publication {
  journal_name;
  volume;
  issue;
  constructor(title, author, journal_name, volume, issue, year) {
    super(title, author, year);
    this.isArticle(journal_name, volume, issue);
  }

  isArticle(journal_name, volume, issue) {
    if (!journal_name) {
      this.Error_message += "journal name must be specified";
    }
    if (typeof volume != "number") {
      this.Error_message += "volume must be number";
    }
    if (typeof issue != "number") {
      this.Error_message += "issue must be number";
    }
    if (this.Error_message != "") {
      throw new Error(this.Error_message());
    }
  }
}

book = new Book("title", "Kasi", "IEEE", "Bangalore", 2020);
