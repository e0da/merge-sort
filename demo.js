/*jslint browser:true, indent: 2 */
/*global $, console */

(function ($) {

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
    complex = ['23', 89, 'stapler', 4];

  function compStrings(left, right) {

    try {
      left = $(left).text();
      right = $(right).text();
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

  }

  console.log(a.mergeSort());
  console.log(a.mergeSort(compStrings));
  console.log(complex.mergeSort(complexCompare));

  // This will fail if $ is not defined
  $(function () {

    $.each(a, function () {
      $('body').append('<p>' + this);
    });

    console.log(a.mergeSort());
    console.log($.mergeSort(a));
    console.log($.mergeSort(a, compStrings));
    console.log($('p').mergeSort().css('color', 'red'));
    console.log($('p').mergeSort(compStrings).text());

    var rows = $('#demo tbody tr').mergeSort(function (left, right) {

      left = $(left).find('td:nth-child(2)').text().toLowerCase();
      right = $(right).find('td:nth-child(2)').text().toLowerCase();

      if (left < right) {
        return -1;
      } else if (left === right) {
        return 0;
      } else {
        return 1;
      }
    });
    $('#demo tbody').html(rows);
  });

}($));

