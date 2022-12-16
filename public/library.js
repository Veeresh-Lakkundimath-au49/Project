//   // The search function
//   function search() {
//     // Get the search term from the input field
//     var term = document.getElementById('search').value;
//     // Split the search term into individual words
//     var words = term.split(' ');

//     // Filter the books based on the search term
//     var books = document.getElementsByClassName('book-name');
//     for (var i = 0; i < books.length; i++) {
//       var match = true;
//       for (var j = 0; j < words.length; j++) {
//         // Check if the book name contains all of the search words
//         if (!books[i].innerHTML.includes(words[j])) {
//           match = false;
//           break;
//         }
//       }
//       if (match) {
//         // Show the book if it matches the search term
//         books[i].style.display = 'block';
//       } else {
//         // Hide the book if it doesn't match the search term
//         books[i].style.display = 'none';
//       }
//     }
//   }

// function myFunction() {
//     var input, filter, ul, li, a, i, txtValue;
//     input = document.getElementById("myInput");
//     filter = input.value.toUpperCase();
//     ul = document.getElementById("myUL");
//     li = ul.getElementsByTagName("li");
//     for (i = 0; i < li.length; i++) {
//         a = li[i].getElementsByTagName("a")[0];
//         txtValue = a.textContent || a.innerText;
//         if (txtValue.toUpperCase().indexOf(filter) > -1) {
//             li[i].style.display = "";
//         } else {
//             li[i].style.display = "none";
//         }
//     }
// }