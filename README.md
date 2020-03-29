# Hackerrank SQL Solutions

1 [Revising the Select Query](https://www.hackerrank.com/challenges/revising-the-select-query/problem)
```
SELECT *
FROM CITY
WHERE COUNTRYCODE = 'USA' AND POPULATION > 100000
```

# Hackerrank Databases Solutions

1 [Basics of Sets and Relations #1](https://www.hackerrank.com/challenges/basics-of-sets-and-relational-algebra-1/problem)
```
8
```

# Hackerrank Java Solutions

1 [Welcome to Java!](https://www.hackerrank.com/challenges/welcome-to-java/problem)
```
public class Solution {

    public static void main(String[] args) {
        /* Enter your code here. Print output to STDOUT. Your class should be named Solution. */
        System.out.println("Hello, World.");
        System.out.println("Hello, Java.");
    }
}
```
# FCC Solutions

1 [Basic JavaScript: Record Collection](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/basic-javascript/record-collection)
```
function updateRecords(id, prop, value) {
  if(prop != 'tracks' && value != '') {
    collection[id][prop] = value;
  }

  if(prop == 'tracks' && !collection[id].hasOwnProperty(prop)) {
    collection[id][prop] = [value]
  }

  if(prop == 'tracks' && value != '') {
    collection[id][prop].push(value);
  }

  if(value == '') {
    delete collection[id][prop]
  }

  return collection;
}
```