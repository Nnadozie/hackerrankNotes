# Leetcode solutions
1[Sort an array](https://leetcode.com/problems/sort-an-array/submissions/)
```
/**
 * @param {number[]} nums
 * @return {number[]}
 */
var sortArray = function(nums) {
    
    if(nums.length <= 1){ return nums}
    //splitarray
    let a = sortArray(nums.slice(0, nums.length/2))
    let b = sortArray(nums.slice(nums.length/2))
    
    
    //merge a and b
    let i = 0
    let j = 0
    
    for(let k = 0; k < nums.length; k++) {
        if (a[i] < b[j]){
            nums[k] = a[i]
            if(i === a.length-1){
                return nums.slice(0, k+1).concat(b.slice(j))
            }
            i++
        }
        else if(b[j] <= a[i]) {
            nums[k] = b[j]
            if(j === b.length-1) {
                return nums.slice(0, k+1).concat(a.slice(i))
            }
            j++
        }
    }  
};
```

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

2 [Java Stdin and Stdout I](https://www.hackerrank.com/challenges/java-stdin-and-stdout-1/problem)
```
import java.util.*;

public class Solution {

    public static void main(String[] args) {
        Scanner scan = new Scanner(System.in);
        int a = scan.nextInt();
        
        System.out.println(a);

        a = scan.nextInt();
        System.out.println(a);

        a = scan.nextInt();
        System.out.println(a);

        scan.close();
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