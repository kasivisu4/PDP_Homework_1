# PDP Home Work : Creating the Reference Manger to manage Books,Articles and WebPages

Project Description:

In this project, there were totally 5 classes:

1. Publication (Parent)
2. Book (Child of 1)
3. Article (Child of 1)
4. WebPages (Child of 1)
5. Reference Manager - It has the following methods:
   (i). addWebPage - Create the Publication for the Webpage and pushes to publications array. It requires title, author, year, url parameters
   (ii).addBook - Create the Publication for the Book and pushes to publications array. It requires title, author, publisher, location, year parameters
   (iii).addArticle - Create the Publication for the Article and pushes to publications array. It requires title, author, journal_name, volume, issue, year parameters
   (iv).printCitations - Based on citation type input it will print all the objects in the publications array in the citation provided format.
   (v). removeReference - Based on the title, author, year, type parameters it will remove the object and prints the removed object and calls the get_stats_year_wise to re-calculate the stats
   (vi). get_stats_year_wise - It calculate the stats of the publications based on the year and type of publication and stores in the stats_year_wise object.
   (vii). stats_year_wise - Based on the stats_year_wise object it prints the Bar chart

creative feature :
Calculating the stats for the publications in year & type level and printing the bar chart in the console.

Run the Code: node main.js

MIT License

Copyright (c) 2022 kasiviswanath

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
