/*!
* Merge sort in JavaScript
* http://github.com/sidewaysmilk/merge-sort
*
* Copyright (c) 2011, Justin Force
* Licensed under the BSD 3-Clause License
*/

/*jslint browser: true, indent: 2 */
/*global jQuery */

(function () {

  'use strict';

  // Add stable merge sort method to Array prototype
  if (Array.mergeSort === undefined) {
    Array.prototype.mergeSort = function (compare) {

      var length = this.length,
        middle = Math.floor(length / 2);

      if (!compare) {
        compare = function (left, right) {
          if (left  <  right) {
            return -1;
          } else if (left === right) {
            return 0;
          } else {
            return 1;
          }
        };
      }

      if (length < 2) {
        return this;
      }

      function merge(left, right, compare) {

        var result = [];

        while (left.length > 0 || right.length > 0) {
          if (left.length > 0 && right.length > 0) {
            if (compare(left[0], right[0]) <= 0) {
              result.push(left[0]);
              left = left.slice(1);
            } else {
              result.push(right[0]);
              right = right.slice(1);
            }
          } else if (left.length > 0) {
            result.push(left[0]);
            left = left.slice(1);
          } else if (right.length > 0) {
            result.push(right[0]);
            right = right.slice(1);
          }
        }
        return result;
      }

      return merge(
        this.slice(0, middle).mergeSort(compare),
        this.slice(middle, length).mergeSort(compare),
        compare
      );
    };
  }

  // Add merge sort to jQuery if it's present
  if (window.jQuery !== undefined) {
    jQuery.fn.mergeSort = Array.prototype.mergeSort;
    jQuery.mergeSort = function (array, compare) {
      return Array.prototype.mergeSort.call(array, compare);
    };
  }

}());

