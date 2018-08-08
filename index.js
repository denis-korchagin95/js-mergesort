'use strict';

/*
    Iterative Merge Sort Algorithm
    ================================

    mergeSort(arr[], l, r): // Recursive base
      If r > l
        1. Find the middle point to divide the array into two halves:  
               middle m = (l+r)/2
        2. Call mergeSort for first half:   
               Call mergeSort(arr, l, m)
        3. Call mergeSort for second half:
               Call mergeSort(arr, m+1, r)
        4. Merge the two halves sorted in step 2 and 3:
               Call merge(arr, l, m, r)
    */
var mergeSort = function ( src, comparator ) {
  var SPLIT;
  var MERGE;
  var length;
  var stack;
  var result;
  var state;
  var stateId;
  var middleIndex;
  var startIndex;
  var endIndex;
  var count;
  var cmpResult;
  var nextState;
  var i;
  var j;
  var leftPart;
  var rightPart;
  var resultState;


  if ( !Array.isArray(src))
    return src;
  if ( (length = src.length) <= 1 )
    return src.slice(0);
  if ( typeof comparator !== 'function' )
    throw new TypeError('comparator must be a function!');


  // algorithm execution states
  SPLIT = 0;
  MERGE = 1;

  /* Stack format:
   *    SPLIT state: [ nState, nStart, nEnd ]
   *    MERGE state: [ nState, nIndex, nIndex?, ...? ]
   *
   *    nState  - id of state
   *    nStart  - index of start range in src
   *    nEnd    - index of end range in src
   *    nIndex  - index of element in src
   */

  // init the stack
  stack = [ [SPLIT, 0, length - 1] ];

  while ( stack.length )
  {
    state = stack.pop();

    // SPLIT state
    if ( state[0] === SPLIT ) 
    {
      startIndex = state[1];
      endIndex = state[2];
      count = endIndex - startIndex + 1;
      
      if ( count > 2 ) // do split
      {
        middleIndex = startIndex + Math.floor( count / 2 );
        stack.push( [SPLIT, middleIndex + 1, endIndex], [SPLIT, startIndex, middleIndex] );
      }
      else
      {
        if ( count === 1 ) // send to merge
          stack.push( [MERGE, startIndex] );
        else // sort and send to merge
        {
          // comparing
          cmpResult = +comparator(src[ startIndex ], src[ endIndex ]);
          cmpResult = isNaN(cmpResult) ? 1 : (cmpResult < 0 ? -1 : 1);

          if ( cmpResult === -1 )
            stack.push( [MERGE, endIndex, startIndex] );
          else
            stack.push( [MERGE, startIndex, endIndex] );

        }
      }

    }
    // MERGE state
    else 
    {
      if ( !stack.length )
      {
        i = 1;
        leftPart = state.length;
        result = [];

        while ( i < leftPart )
          result.push( src[ state[i++] ] );

        break;
      }
      // merge do now?
      nextState = stack.pop();
      if ( nextState[0] !== MERGE )
      {
        stack.push( state, nextState );
        continue;
      }

      do
      {
        resultState = [MERGE];
        i = 1;
        j = 1;
        leftPart = nextState.length;
        rightPart = state.length;

        while ( i < leftPart && j < rightPart )
        {
          // comparing
          cmpResult = +comparator(src[ nextState[i] ], src[ state[j] ]);
          cmpResult = isNaN(cmpResult) ? 1 : (cmpResult < 0 ? -1 : 1);

          if ( cmpResult === -1 )
          {
            resultState.push( state[j] );
            j++;
          }
          else
          {
            resultState.push( nextState[i] );
            i++;
          }
        }

        while ( i < leftPart )
          resultState.push( nextState[i++] );
        while ( j < rightPart )
          resultState.push( state[j++] );

        nextState = stack.pop();

        if ( nextState == null )
        {
          stack.push( resultState );
          break;
        }

        if ( nextState[0] !== MERGE )
        {
          stack.push( resultState, nextState );
          break;
        }

        state = resultState;

      }
      while(true);
    }
    
  }

  return result;
};


module.exports = mergeSort;
