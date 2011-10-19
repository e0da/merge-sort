/*jslint browser:true, indent: 2 */
/*global jQuery, console */

(function () {

  'use strict';

  var a = [
    'potato',
    'finger',
    'Swimming',
    'swimming',
    'throw potato',
    '@fingersandwich',
    5,
    '23'
    ],
    complex = ['23', 89, 'stapler', $('p#intro'), window, 4];

  function compStrings(left, right) {

    try {
      left = jQuery(left).text();
      right = jQuery(right).text();
    } catch (jqException) {}

    try {
      left = left.toLowerCase();
      right = right.toLowerCase();
    } catch (strException) {}

    if (left < right) {
      return -1;
    } else if (left === right) {
      return 0;
    } else {
      return -1;
    }
  }


  function complexCompare(left, right) {

    if (isNaN(left) === false) {
      left = parseInt(left);
    }

    if (isNaN(right) === false) {
      right = parseInt(right);
    }

    if (typeof left !== typeof right) {

      if (typeof left === 'number') {
        return -1;
      } else if (typeof left === 'string') {
        if (typeof right === 'object') {
          return -1;
        } else {
          return 1;
        }
      } else if (typeof left === 'object') {
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
  }

  console.log(a.mergeSort());
  console.log(a.mergeSort(compStrings));
  console.log(complex.mergeSort(complexCompare));

  // This will fail if jQuery is not defined
  jQuery(function () {

    jQuery.each(a, function () {
      jQuery('body').append('<p>' + this);
    });

    console.log(a.mergeSort());
    console.log(jQuery.mergeSort(a));
    console.log(jQuery.mergeSort(a, compStrings));
    console.log(jQuery('p').mergeSort());
    console.log(jQuery('p').mergeSort(compStrings));
  });

}());

