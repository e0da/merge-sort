/*jslint browser:true, indent: 2 */
/*global jQuery, console */

(function ($) {

  'use strict';

  var a = [
    'potato',
    'finger',
    'Swimming',
    'swimming',
    'throw potato',
    '@fingersandwich',
    '5',
    '23'
  ];

  function compStrings(left, right) {

    left = left.toLowerCase();
    right = right.toLowerCase();

    if (left < right) {
      return -1;
    } else if (left === right) {
      return 0;
    } else {
      return 1;
    }
  }

  console.log(a.mergeSort());
  console.log(a.mergeSort(compStrings));

  // This will fail if $ is not defined
  $(function () {

    $.each(a, function () {
      $('body').append('<p>' + this);
    });

    console.log(a.mergeSort());
    console.log($.mergeSort(a));
    console.log($.mergeSort(a, compStrings));
    console.log($('p').mergeSort().css('color', 'red').text());

    $('#demo tbody').html($('#demo tbody tr').mergeSort(function (left, right) {

      left = $(left).find('td:nth-child(2)').text().toLowerCase();
      right = $(right).find('td:nth-child(2)').text().toLowerCase();

      if (left < right) {
        return -1;
      } else if (left === right) {
        return 0;
      } else {
        return 1;
      }
    }));
  });

}(jQuery));

