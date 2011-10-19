merge-sort.js
=============

Add a stable merge sort method to the JavaScript Array prototype (and jQuery's
`$` and `$.fn`, if available). This is useful because (at the time of this
writing) some popular browsers do not implement a [stable sort][] algorithm in
their JavaScript implementations. A popular application for stable sorting is
sorting tables by multiple columns.

As with JavaScript's own [Array.sort][], you can specify your own comparison
function.




API
---------------------

    [].mergeSort([compareFunction])
    $.mergeSort(list [, compareFunction])
    $(selection).mergeSort([compareFunction])

### compareFunction

`compareFunction` _(optional)_ is a function that accepts two arguments and returns

 * **-1** if the first argument is **less than** the second
 * **0** if the two arguments are **equal**
 * **1** if the first argument is **greater than** the second

### list

`list` _(required for $.mergeSort() syntax only)_ is a list-like
object which has all of the following properties (like an [Array][]):

1. Has a `length` attribute which contains the number of elements in the list
   (e.g. a list of 5 things has `things.length === 5`)
2. Allows access to its members via zero-indexed bracket notation (e.g.
   `things[3]` refers to the 4th thing in the list)
3. Has a `.slice()` method which behaves identically to [Array.slice][],
   specifically, calling `[a, b, c, d].slice(1)` returns `[b, c, d]`.



Installation
---------------------

Just include this script before any scripts which would rely on it. If you're
using jQuery, include this script after jQuery and before your application
script.

    <script type="text/javascript" src="jquery.min.js"></script>
    <script type="text/javascript" src="merge-sort.js"></script>
    <script type="text/javascript" src="my-application.js"></script>



Examples
---------------------

### Arrays

I have some arrays of numbers, strings, and miscellany that need sorting.

    var numbers = [4, 2, 2, 43, 98, 29, 0, 4.3, 9.23],
      strings = ['Porcupine', 'dolphin', 'Squirrel', 'penguin', 'Lion'],
      miscellany = ['23', 89, 'stapler', 4];

To sort my numbers, I would just

    numbers.mergeSort();
    // [0, 2, 2, 4, 4.3, 9.23, 29, 43, 98]

To sort my strings, I can also just

    strings.mergeSort();
    // ["Lion", "Porcupine", "Squirrel", "dolphin", "penguin"]

But with the default comparison, they don't come out alphabetical. The
capitalized words come first. For a case insensitive sort, I need to define a
compare function.

    strings.mergeSort(function (left, right) {
      left = left.toLowerCase();
      right = right.toLowerCase();

      if (left < right) {
        return -1;
      } else if (left === right) {
        return 0;
      } else {
        return 1;
      }
    });
    // ["dolphin", "Lion", "penguin", "Porcupine", "Squirrel"]

That's more like it. How about that last list of miscellany? I want my numbers
first, then my words, but I want strings containing numbers treated as numbers.
Pretty specific, but I can describe it with a function.

    miscellany.mergeSort(function (left, right) {

      if (isNaN(left) === false) {
        left = parseFloat(left);
      }

      if (isNaN(right) === false) {
        right = parseFloat(right);
      }

      if (typeof left !== typeof right) {
        if (typeof left === 'number') {
          return -1;
        } else {
          return 1;
        }
      } else {
        if (left < right) {
          return -1;
        } else if (left === right) {
          return 0;
        } else {
          return 1;
        }
      }
    });
    // [4, "23", 89, "stapler"]

Because it is implemented as an Array method, you can also apply mergeSort
to any object that can be iterated as an array. For instance, to call mergeSort
on a set of jQuery nodes, you could

    Array.prototype.mergeSort.call($('.things'));

(Of course, you don't want to do it this way. You should just use the
`$(selection).mergeSort()` syntax).



### jQuery

Used with jQuery, you'll probably always want to supply a compare function, so
I'll only discuss those cases. Here's a non trivial example. I have a table:

    <table id=demo>
      <thead>
        <tr>
          <th>First Name
          <th>Last Name
          <th>Occupation
      <tbody>
        <tr>
          <td>Bob
          <td>Smith
          <td>Programmer
        <tr>
          <td>Alice
          <td>Jones
          <td>Programmer
        <tr>
          <td>Luis
          <td>Smith
          <td>Analyst
    </table>

I can sort by any column
'
    
    $('#demo tbody').html($('#demo tbody tr').mergeSort(function() {
      // sort rows by specified column
    }).html());
          
The `$.mergeSort(list, compareFunction)` syntax is just [sugar][] for `Array.prototype.mergeSort.call(list, compareFunction)`. 


### Other



Copyright and License
---------------------

Copyright © 2011, Justin Force

Licensed under the [BSD 3-Clause License](http://www.opensource.org/licenses/BSD-3-Clause)



[stable sort]:http://en.wikipedia.org/wiki/Sorting_algorithm#Stability "Sorting algorithm stability on Wikipedia"
[Array.sort]:https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Array/sort "Array.sort on Mozilla Developer Network"
[Array]:https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Array "Array on Mozilla Developer Network"
[Array.slice]:https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Array/slice "Array.slice on Mozilla Developer Network"
[sugar]:http://en.wikipedia.org/wiki/Syntactic_sugar "Syntactic sugar on Wikipedia"
