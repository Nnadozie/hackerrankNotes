# Leetcode solutions

1 [Sort an array](https://leetcode.com/problems/sort-an-array/submissions/)

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

2 [multiply two stings](https://leetcode.com/problems/multiply-strings/submissions/)

Karatsuba multiplication

```
import java.math.*;

class Solution {

    public String multiply(String num1, String num2) {

        int numl1 = num1.length();
            int numl2 = num2.length();

            if(numl1 == 0 || numl2 == 0) {
                return "0";
            }

            if(numl1 == 1 && numl2 == 1) {
                try {
                    int x = Integer.parseInt(num1);
                    int y = Integer.parseInt(num2);
                    return ""+x*y;

                } catch(NumberFormatException e) {
                    System.out.println(e);
                }
            }
            if(numl1 < numl2) {
                String f = String.format("0%d", numl2);
                f = "%" + f + "d";
                num1 = String.format(f, new BigInteger(num1));
                numl1 = numl2;
            }
            if(numl1 > numl2) {
                String f = String.format("0%d", numl1);
                f = "%" + f + "d";
                num2 = String.format(f, new BigInteger(num2));
                numl2 = numl1;
            }


            String a = num1.substring(0, numl1/2);
            String b = num1.substring(numl1/2);
            String c = num2.substring(0, numl2/2);
            String d = num2.substring(numl2/2);


            String O = multiply(a, c);
            String G = multiply(b, d);
            String C = multiply(""+(new BigInteger(a)).add(new BigInteger(b)),""+(new BigInteger(c)).add(new BigInteger(d)));

             BigInteger Oi, Gi, Ci;
             BigInteger ten = new BigInteger("10");
            Oi = Gi = Ci = new BigInteger("0");
            int lhalf = Math.max(numl1, numl2);
            int nhalf = lhalf - lhalf/2;

            try {
                    Oi = new BigInteger(O);
                    Gi = new BigInteger(G);
                    Ci = new BigInteger(C);

            } catch(NumberFormatException e) {
                    System.out.println(e);
            }

            BigInteger sum = ten.pow(nhalf*2).multiply(Oi).add( ten.pow(nhalf).multiply(Ci.subtract(Oi).subtract(Gi))).add(Gi);

            return "" + sum;

    }
}
```

Relying on Java BigInteger

```
import java.math.*;

class Solution {

    public String multiply(String num1, String num2) {

            return "" + new BigInteger(num1).multiply(new BigInteger(num2));

    }
}
```

3 [global-and-local-inversions](https://leetcode.com/problems/global-and-local-inversions/submissions/)

Piggyback on merge sort

```
//A version of this solution that assumes even numbered arrays, which is sufficient to pass the
//quiz given in week 2 of Stanford's Coursera algorithms course: https://www.coursera.org/learn/algorithms-divide-conquer/home/welcome
//is located in /count-inversions


var fs = require("fs");
fs.readFile("array.txt", function (err, data) {
  //console.log(data.toString());
  let numa = data.toString().split("\n");
  numa.pop();
  numa = numa.map((val) => {
    return parseInt(val);
  });

  let localInvs = 0;
  let globalInvs = 0;

  const main = () => {
    let sorted = sortt(numa);
    //console.log(localInvs);
    console.log(`Global Inversions: ${globalInvs}`);
    //console.log(sorted);
  };

  var sortt = function (nums) {
    if (nums.length <= 1) {
      return nums;
    }
    //splitarray
    let a = sortt(nums.slice(0, nums.length / 2));
    let b = sortt(nums.slice(nums.length / 2));

    //count side by side inversion
    if (a[a.length - 1] > b[0]) {
      ++localInvs;
    }

    //merge a and b
    let i = 0;
    let j = 0;

    for (let k = 0; k < nums.length; k++) {
      if (a[i] < b[j]) {
        nums[k] = a[i];
        if (i === a.length - 1) {
          return nums.slice(0, k + 1).concat(b.slice(j));
        }
        i++;
      } else if (b[j] <= a[i]) {
        globalInvs += a.length - i;
        nums[k] = b[j];
        if (j === b.length - 1) {
          return nums.slice(0, k + 1).concat(a.slice(i));
        }
        j++;
      }
    }
  };

  main();
});

```

4 [Island perimeter](https://leetcode.com/explore/challenge/card/july-leetcoding-challenge/544/week-1-july-1st-july-7th/3383/)

- The brute force approach runs in O(n^2) and thetha actually time.
- can be optimized by first finding a starting node, then using a path finding algo to build up
  the island. Each edge incurring a deduction of 2.

```
class Solution {
    public int islandPerimeter(int[][] grid) {

        // for each piece of land increment by 4
        //     check if it has any neighbor on all sides
        //         subtract one for that side

        int perimeter = 0;

        for(int row = 0; row < grid.length; ++row) {
            for(int col = 0; col < grid[0].length; ++col) {
                if(grid[row][col] == 1){
                    perimeter += 4;

                    if(row-1 >= 0 && grid[row-1][col] == 1) {
                        perimeter -= 1;
                    }
                    if(row+1 < grid.length && grid[row+1][col] == 1) {
                        perimeter -= 1;
                    }
                    if(col-1 >= 0 && grid[row][col-1] == 1) {
                        perimeter -= 1;
                    }
                    if(col+1 < grid[0].length && grid[row][col+1] == 1) {
                        perimeter -= 1;
                    }
                }
            }
        }

        return perimeter;

    }
}
```

- in attempting to optimize you forget, it's the edges you're looking for, not the nodes
- therefore your solution fails for this: [[1,1],[1,1]], you get 10 instead of 8, because the edge between the last two nodes is unaccounted for.

```
class Solution {
    public int islandPerimeter(int[][] grid) {

        // for every array
        //     if find 1
        //     choose as starting node for path finding algo
        //         for every edge deduct two

        return dfs(getStartNode(grid), grid);

    }

    public int dfs(int[] s, int[][] grid) {

        grid[s[0]][s[1]] = 0;
        int perimeter = 0;

        if(s[0]-1 >= 0 && grid[s[0]-1][s[1]] == 1) {
            perimeter  += dfs(new int[]{s[0]-1,s[1]}, grid) - 2;
        }
        if(s[0]+1 < grid.length && grid[s[0]+1][s[1]] == 1) {
            perimeter += dfs(new int[]{s[0]+1,s[1]}, grid) -2;
        }
        if(s[1]-1 >= 0 && grid[s[0]][s[1]-1] == 1) {
            perimeter += dfs(new int[]{s[0],s[1]-1}, grid) -2;
        }
        if(s[1]+1 < grid[0].length && grid[s[0]][s[1]+1] == 1) {
            perimeter += dfs(new int[]{s[0],s[1]+1}, grid) -2;
        }

        return perimeter + 4;

    }

    public int[] getStartNode(int[][] grid) {

        int[] startNode = new int[2];

        for(int row = 0; row < grid.length; ++row) {
            for(int col = 0; col < grid[0].length; ++col) {
                if(grid[row][col] == 1){
                    startNode[0] = row; startNode[1] = col;
                    return startNode;
                }
            }
        }
        return startNode;
    }
}
```

- looking at the discussions and running the solutions provided, it turns out dfs performs worse than the brute force approach. Why?

5 [3Sum](https://leetcode.com/explore/challenge/card/july-leetcoding-challenge/545/week-2-july-8th-july-14th/3384/)

- a quick approach using three for loops should easily produce an O(n^3) solution. I highly doubt that's optimal, and remember something in the Algorithms specialization about solving an n choose 2 problem.

```
class Solution {
    public List<List<Integer>> threeSum(int[] nums) {

        //nchoose3
        //brute force
        //for every one, iterate through every other one
            //for every other one iterate through every other one

            i.e

        //for i to n
            for i+1 to n
                for 1+2 to n
                    check if [i] + [i+1] + [i+2] == 0
        //add to some hashet or list

    }
}
```

6 [2sum](https://leetcode.com/problems/two-sum/submissions/)

Given an array of integers, return indices of the two numbers such that they add up to a specific target.

You may assume that each input would have exactly one solution, and you may not use the same element twice.

Example:

Given nums = [2, 7, 11, 15], target = 9,

Because nums[0] + nums[1] = 2 + 7 = 9,
return [0, 1].

Final solution O(n^2).
I initially sorted the array, aiming for a O(nlogn) solution, but forgot that sorting the array mixes up the indices.

I suppose it's possible to create a hashtable of values and their indices in O(n) then use the hashtable for the rest of the algorithm.

```
class Solution {
    public int[] twoSum(int[] nums, int target) {
        // sort nums
        // for each int in nums
        // find diff from target
        // find target in nums
        int diff = 0;
        int index = -1;
        int in = 9;
        for(int i =0; i < nums.length; ++i) {
            diff = target - nums[i];
            for(int k = i+1; k < nums.length; ++k) {
                if(nums[k] == diff){
                    index = k;
                    in = i;
                    break;
                }
             }
            if(index != -1) {
                break;
            }
        }
        return new int[]{in, index};

    }
}
```

7 [reverse integer](https://leetcode.com/problems/reverse-integer/)

Given a 32-bit signed integer, reverse digits of an integer.

Example 1:

Input: 123
Output: 321
Example 2:

Input: -123
Output: -321
Example 3:

Input: 120
Output: 21

sol:
if neg, make pos, convert to string, reverse, convert to int, make neg

this didn't work because you were trying to catch an error that wouldn't have been thrown. (values are limited to btwn integer.max_value and interger.min_value)

Luckily java provides a Math.multiplyExact and Math.addExact which throws an ArithmeticException when an overflow occurs.

```
public int reverse(int x) {
        try{
            int reversed = 0; boolean neg = false;
            if(x < 0){neg = true; x *= -1;}
            while(x >= 1){
                reversed = reversed * 10 + x%10;
                x /= 10;
            }

            return neg? reversed * -1 : reversed;
        }catch(Error e){
            return 0;
        }

    }
```

Final Solution, optimizing for time and space

```
public int reverse(int x) {
        try{
            int reversed = 0; //boolean neg = false;
            //if(x < 0){neg = true; x *= -1;}
            while(Math.abs(x) >= 1){
                reversed = Math.addExact(Math.multiplyExact(reversed, 10), x%10);
                x /= 10;
            }
            //return neg? reversed * -1 : reversed;
            return reversed;
        }catch(ArithmeticException e){
            return 0;
        }
```

8 [Palindrome number](https://leetcode.com/problems/palindrome-number/)

Determine whether an integer is a palindrome. An integer is a palindrome when it reads the same backward as forward.

Example 1:

Input: 121
Output: true
Example 2:

Input: -121
Output: false
Explanation: From left to right, it reads -121. From right to left, it becomes 121-. Therefore it is not a palindrome.
Example 3:

Input: 10
Output: false
Explanation: Reads 01 from right to left. Therefore it is not a palindrome.
Follow up:

Coud you solve it without converting the integer to a string?

sol:
if <= 10, not palindrome,
else, convert to string
check mirror indices, 0 and n-1, 1 and n-2, e.t.c until (n/2 - 1)-1 if odd, or (n/2)-1 if even length

Implementation

```
if(x <0){return false;}
        String num = Integer.toString(x);
        for(int i = 0; i < num.length()/2; ++i) {
            if(num.charAt(i) != num.charAt(num.length()-1 -i)) {return false;}

        }
        return true;
```

9 [Best Time to Buy and Sell Stock](https://leetcode.com/problems/best-time-to-buy-and-sell-stock/)

Say you have an array for which the ith element is the price of a given stock on day i.

If you were only permitted to complete at most one transaction (i.e., buy one and sell one share of the stock), design an algorithm to find the maximum profit.

Note that you cannot sell a stock before you buy one.

Example 1:

Input: [7,1,5,3,6,4]
Output: 5
Explanation: Buy on day 2 (price = 1) and sell on day 5 (price = 6), profit = 6-1 = 5.
Not 7-1 = 6, as selling price needs to be larger than buying price.
Example 2:

Input: [7,6,4,3,1]
Output: 0
Explanation: In this case, no transaction is done, i.e. max profit = 0.

sol: (fails test cases)

```
bn = last val
bi = last index,
sn = first val
si = first index,

from right to left
if val > biggest val found (bn)
if index > index of smallest val found (si)
update bi = index, bn = val

if val < smallest val found (sn)
if index < index of biggest val found (bi)
update si = index, sn = val

if bn > sn (return bn - sn) else return 0
```

fell back to an absymal o(n^2) solution

```
class Solution {
    public int maxProfit(int[] prices) {
        int max = 0;
        for(int i = 0; i < prices.length; ++i){
            for(int j = i; j< prices.length; ++j){
                if(prices[j] > prices[i] && prices[j] - prices[i] > max){
                    max = prices[j] - prices[i];
                }
            }
        }
        return max;
    }
}
```

coming back to this, the O(n) solution is quite beautiful

```
public class Solution {
    public int maxProfit(int prices[]) {
        int minprice = Integer.MAX_VALUE;
        int maxprofit = 0;
        for (int i = 0; i < prices.length; i++) {
            if (prices[i] < minprice)
                minprice = prices[i];
            else if (prices[i] - minprice > maxprofit)
                maxprofit = prices[i] - minprice;
        }
        return maxprofit;
    }
}
```

My first instinct of smallest after biggest was the wrong way around

looking from the right left, if the current price minus the minimum price seen is greater than maxprice,

then obviously you have your new max price

if it's a price < min price then you should update min price before moving ahead.

10 [Missing Number](https://leetcode.com/problems/missing-number/)

Given an array containing n distinct numbers taken from 0, 1, 2, ..., n, find the one that is missing from the array.

Example 1:

Input: [3,0,1]
Output: 2
Example 2:

Input: [9,6,4,2,3,5,7,0,1]
Output: 8
Note:
Your algorithm should run in linear runtime complexity. Could you implement it using only constant extra space complexity?

solution:

```
create data structure containing 0 - n

loop through array, for each element remove from previous data strcture,

return sole element in data structure

or

get sum of 0 - n

get sum of numbers in array

return sum of 0-n minus numbers in array
```

Java Impl

```
class Solution {
    public int missingNumber(int[] nums) {
        int expected = 0;
        int found = 0;

        for(int i = 0; i <= nums.length; ++i) {
            expected += i;
        }

        for (int val : nums) {
            found += val;
        }

        return expected - found;

    }
}
```

11 [Valid parenthesis](https://leetcode.com/problems/valid-parentheses/)

Given a string containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.

An input string is valid if:

Open brackets must be closed by the same type of brackets.
Open brackets must be closed in the correct order.
Note that an empty string is also considered valid.

Example 1:

Input: "()"
Output: true
Example 2:

Input: "()[]{}"
Output: true
Example 3:

Input: "(]"
Output: false
Example 4:

Input: "([)]"
Output: false
Example 5:

Input: "{[]}"
Output: true

sol:
mistakes:

- storing strings "[" instead of chars '[' in my hashmap, then trying to compare chars to strings later on
- using a for( char val: s) foreach construct on a string, which was invalid
- attempting to peek() at an empty stack, which threw an error
- forgetting that the stack could be empty even when an input was given, e.g "]"

```
class Solution {
    public boolean isValid(String s) {
        HashMap brackets = new HashMap();
        brackets.put(']', '[');
        brackets.put(')', '(');
        brackets.put('}', '{');

        Stack counter = new Stack();
        for(int i = 0; i < s.length(); ++i) {
            char brak = s.charAt(i);
            if(brak == '[' || brak =='(' || brak == '{'){
                counter.push(brak);
            }
            else if(counter.size() > 0 && counter.peek() == brackets.get(brak)) {
                counter.pop();
            }else{
                return false;
            }
        }
        return counter.size() == 0? true : false;
    }
}
```

12 [Maximum subarray](https://leetcode.com/problems/maximum-subarray/)

Given an integer array nums, find the contiguous subarray (containing at least one number) which has the largest sum and return its sum.

Example:

Input: [-2,1,-3,4,-1,2,1,-5,4],
Output: 6
Explanation: [4,-1,2,1] has the largest sum = 6.
Follow up:

If you have figured out the O(n) solution, try coding another solution using the divide and conquer approach, which is more subtle.

13 [Intersection of two arrays](https://leetcode.com/problems/intersection-of-two-arrays/)

Given two arrays, write a function to compute their intersection.

Example 1:

Input: nums1 = [1,2,2,1], nums2 = [2,2]
Output: [2]
Example 2:

Input: nums1 = [4,9,5], nums2 = [9,4,9,8,4]
Output: [9,4]
Note:

Each element in the result must be unique.
The result can be in any order.

pseudo:

sort longer array
for(el: shorter array)
if el not in unique set
binarysearch in longer array
if found add to unique set
return unique set

My sol:

is O(mlogm) vs the O(n+m) that's provided.

- I loved that O(n+m) solution. They simply convert both to sets

```
public int[] intersection(int[] nums1, int[] nums2) {
        if(nums1.length > nums2.length){
            Arrays.sort(nums1);
        } else {
            Arrays.sort(nums2);
        }

        HashSet<Integer> s = new HashSet<Integer>();

        for(int el : (nums1.length < nums2.length ? nums1 : nums2 ) ) {

            if(!s.contains(el)){
                if(Arrays.binarySearch((nums1.length > nums2.length ? nums1 : nums2 ), el) >= 0){
                    s.add(el);
                }
            }

        }

        int ret[] = new int[s.size()];
        Integer ent[] = s.toArray(new Integer[0]);
        for(int i = 0; i < ret.length; ++i){
            ret[i] = ent[i].intValue();
        }

        return ret;
    }
```

O(n) solution:

```
The idea is to convert both arrays into sets, and then iterate over the smallest set checking the presence of each element in the larger set. Time complexity of this approach is \mathcal{O}(n + m)O(n+m) in the average case.
```

14 [First unique xter in string](https://leetcode.com/problems/first-unique-character-in-a-string/)

Given a string, find the first non-repeating character in it and return its index. If it doesn't exist, return -1.

Examples:

s = "leetcode"
return 0.

s = "loveleetcode"
return 2.

Note: You may assume the string contains only lowercase English letters.

sol:

loop through on char at time
Push into hash map, char and index no. of occurrences
loop through hash map picking out single occurring letter with lowest index

Optimize using a min-heap

final sol: I noticed dealing with the edge case early on improved mem perfomance.

```
class Solution {
    public int firstUniqChar(String s) {
        //if(s.equals("")) return -1;
        int[] letters = new int[26];

        for(int i = 0; i < s.length(); ++i) {
            if (letters[s.charAt(i) - 97] == 0) {
                letters[s.charAt(i) - 97] = i + 1;
            } else {
                letters[s.charAt(i) - 97] = Integer.MAX_VALUE;
            }
        }

        int min = Integer.MAX_VALUE - 1; //it was either this or a check for empty string at the beginning
        for(int c : letters){
            if( c - 1 >= 0 && c - 1 < min ) min = c - 1;
        }

        if(min + 1 >= Integer.MAX_VALUE) return -1;
        return min;
    }
}
```

15 [Roman to Integer](https://leetcode.com/problems/roman-to-integer/)

Roman numerals are represented by seven different symbols: I, V, X, L, C, D and M.

Symbol Value
I 1
V 5
X 10
L 50
C 100
D 500
M 1000
For example, two is written as II in Roman numeral, just two one's added together. Twelve is written as, XII, which is simply X + II. The number twenty seven is written as XXVII, which is XX + V + II.

Roman numerals are usually written largest to smallest from left to right. However, the numeral for four is not IIII. Instead, the number four is written as IV. Because the one is before the five we subtract it making four. The same principle applies to the number nine, which is written as IX. There are six instances where subtraction is used:

I can be placed before V (5) and X (10) to make 4 and 9.
X can be placed before L (50) and C (100) to make 40 and 90.
C can be placed before D (500) and M (1000) to make 400 and 900.
Given a roman numeral, convert it to an integer. Input is guaranteed to be within the range from 1 to 3999.

Example 1:

Input: "III"
Output: 3
Example 2:

Input: "IV"
Output: 4
Example 3:

Input: "IX"
Output: 9
Example 4:

Input: "LVIII"
Output: 58
Explanation: L = 50, V= 5, III = 3.
Example 5:

Input: "MCMXCIV"
Output: 1994
Explanation: M = 1000, CM = 900, XC = 90 and IV = 4.

```
sol:

create enum of all possible values starting with pairs

for each possible value find all occurences in string and remove from string

add up sum

- first implementation arguable O(n^2), faster than only 5% of other solutions, mem better than about 40%.

class Solution {
    public int romanToInt(String s) {

        String keys[] = new String[] {"IV", "IX", "XL", "XC", "CD", "CM", "I", "V", "X", "L", "C", "D", "M"};
        int values[] = new int[] {4, 9, 40, 90, 400, 900, 1, 5, 10, 50, 100, 500, 1000};
        int sum = 0;

        int ind = 0;
        for(String c: keys) {
            if(s.equals("")) break;
            int index = 0;
            int count = 0;
            while(index != -1 && index < s.length()) {
                index = s.indexOf(c, index);
                if(index != -1) {
                    count++;
                    index += c.length();
                }
            }
            s = s.replaceAll(c, "");
            sum += values[ind] * count;
            ind++;
        }

        return sum;
    }
}
```

attempted to optimize

- same, but with worse mem, now only better than 5%

errors made,

- using stream instead of Stream,
- incrementing i by 2 in the body and forgetting the extra incr by 1 in the for loop
- check if there's a collectors.toHashMap method.

```
class Solution {
    public int romanToInt(String s) {

        if(s.equals("")) return -1;
        Map<String, Integer> map = Stream.of(new Object[][] {
            {"IV", 4},
            {"IX",9},
            {"XL", 40},
            {"XC", 90},
            {"CD", 400},
            {"CM", 900},
            {"I", 1},
            {"V",5},
            {"X", 10},
            {"L", 50},
            {"C", 100},
            {"D", 500},
            {"M", 1000}
        }).collect(Collectors.toMap(data -> (String) data[0], data -> (Integer) data[1]));

        HashMap<String, Integer> hmap = new HashMap<String, Integer>(map);

        Integer sum = 0;

        for(int i = 0; i < s.length(); i++) {
            if(i != s.length()-1 && hmap.containsKey(s.substring(i, i+2))) {
                sum+= hmap.get(s.substring(i,i+2));
                System.out.println(sum);
                i+=1;
            }else{
                sum+=hmap.get(Character.toString(s.charAt(i)));
                //System.out.println(sum);
            }
        }

        return sum.intValue();
    }
}
```

So now I'm using their solution

- It turns out the way you initialize your map, using put rather than streaming and collecting is much faster
- also, it betrays your misunderstanding of an interface as a type specifier. Notice how in your impl you created both a map and a hashmap,
  while here you only need one Hashmap.

This is faster than 20% and better than 80% in space

```
class Solution {

    static Map<String, Integer> values = new HashMap<>();

    static {
        values.put("I", 1);
        values.put("V", 5);
        values.put("X", 10);
        values.put("L", 50);
        values.put("C", 100);
        values.put("D", 500);
        values.put("M", 1000);
        values.put("IV", 4);
        values.put("IX", 9);
        values.put("XL", 40);
        values.put("XC", 90);
        values.put("CD", 400);
        values.put("CM", 900);
    }

    public int romanToInt(String s) {

        Integer sum = 0;

        for(int i = 0; i < s.length(); i++) {
            if(i != s.length()-1 && values.containsKey(s.substring(i, i+2))) {
                sum+= values.get(s.substring(i,i+2));
                System.out.println(sum);
                i+=1;
            }else{
                sum+=values.get(Character.toString(s.charAt(i)));
                //System.out.println(sum);
            }
        }

        return sum.intValue();
    }
}
```

16 [Longest common prefix](https://leetcode.com/problems/longest-common-prefix/)

Write a function to find the longest common prefix string amongst an array of strings.

If there is no common prefix, return an empty string "".

Example 1:

Input: ["flower","flow","flight"]
Output: "fl"
Example 2:

Input: ["dog","racecar","car"]
Output: ""
Explanation: There is no common prefix among the input strings.
Note:

All given inputs are in lowercase letters a-z.

pseudo solution:

initially thought,

for each index in strings, loop through every string to confirm it's the same, stop when a char differs. This seems to be an O(n^2) solution.

So I moved on to an OR logical operator idea. Create an operator that returns the parts of two strings that are the same.

But quite complex, so simplified that to this:

for the first two strings in O(n) time, find the common substring:

for the next n-2 strings, for each one, compare common substring with each and remove whenever a char differs

return common substring. I estimate this is O(n) in total because the common substring comparison is constant time in the length or < of the substring.

```
impl:

class Solution {
    public String longestCommonPrefix(String[] strs) {
        if(strs.length == 0) return "";
        if(strs.length == 1) return strs[0];

        StringBuilder sb = new StringBuilder(0);

        for(int i=0; i < strs[0].length() && i < strs[1].length(); ++i) {
            if(strs[0].charAt(i) != strs[1].charAt(i)) break;
            sb.append(strs[0].charAt(i));
        }

        for(String s : strs) {
            if(s.length() < sb.length()) sb.delete(s.length(), sb.length());
            for(int i = 0; i < sb.length() && i < s.length(); ++i) {
                if(sb.charAt(i) != s.charAt(i)) {
                    sb.delete(i, sb.length());
                    break;
                }
            }
        }

        return sb.toString();
    }
}
```

errors:

- used .length instead of .length() forgetting that strs is an array of strings not an array
- used the || condition to get the lesser of two lengths instead of the && condition
- forgot the use the lesser of two lengths in the second linear loop
- forgot the case where the remaining strings are less than the initial substring
- forgot that the first element in a single length array is at arr[0]

the working solution: Runtime: 3 ms, faster than 31.40% of Java online submissions for Longest Common Prefix.
Memory Usage: 39.8 MB, less than 10.61% of Java online submissions for Longest Common Prefix.

Not what I expected.

Adding this edge case in the second loop take mem performance to 94%

```
for(String s : strs) {
            if(s.length() == 0) return "";
```

reading the first solution shows that the first loop is not actually needed

```
StringBuilder sb = new StringBuilder(strs[0]);

        // for(int i=0; i < strs[0].length() && i < strs[1].length(); ++i) {
        //     if(strs[0].charAt(i) != strs[1].charAt(i)) break;
        //     sb.append(strs[0].charAt(i));
        // }
```

This is a really juicy problem. I recommend revisiting each approach and tyring to implement them.

17 [Merge two sorted lists](https://leetcode.com/problems/merge-two-sorted-lists/)

Merge two sorted linked lists and return it as a new sorted list. The new list should be made by splicing together the nodes of the first two lists.

Example:

Input: 1->2->4, 1->3->4
Output: 1->1->2->3->4->4

pseudo sol:

handle 00, 01, 1 11 edge cases

l3 head = smaller of first nodes
lcurr = larger of first nodes

while l1 and l2 have next values
lcurr.next = smaller (l1.next, l2.next)
lcurr = lcurr.next

return l3 head

Implementing this has been harder than expected. After a lot of consternation, it appears there is an object assignment by reference happening, rather than the expected assignment by value.

```
class Solution {
    public ListNode mergeTwoLists(ListNode l1, ListNode l2) {

        System.out.println(l1.next.val);
        System.out.println(l2.next.val);



        ListNode head = new ListNode();

        if(l1.val < l2.val) {
            head = l1;
            head.next = l2;
        } else if(l1.val >= l2.val) {
            // head = l2;
            // head.next = l1;
        }

        l1 = l1.next;
        l2 = l2.next;

        System.out.println(l1.next.val);
        System.out.println(l2.next.val);
```

Notice the commented out lines. head becomes l2, and l2.next becomes l1, such that when I then print out l2.next.value, I get l1.next.value.

Truly unexpected but definitely a gem of insight to Java assigment that needs clarification.

Right. So a refresher on Java types shows that class types are reference types, and objects are instances of classes.

'There may be many references to the same object. Most objects have state, stored in the fields of objects that are instances of classes or in the variables that are the components of an array object. If two variables contain references to the same object, the state of the object can be modified using one variable's reference to the object, and then the altered state can be observed through the reference in the other variable.' [more here](https://docs.oracle.com/javase/specs/jls/se7/html/jls-4.html#jls-4.3.1)

My submission ended up being heavily dependent on insight gleaned from the test cases, and highly impractical in a competitive setting

```
class Solution {

    public ListNode mergeTwoLists(ListNode l1, ListNode l2) {

        ListNode head;


        if(l1 == null && l2 != null) {
            return l2;
        } else if(l2 == null && l1 != null) {
            return l1;
        }else if(l1 == null && l2 == null) {
            return null;
        }

        if(l1.val <= l2.val) {
            head = l1;
            linkTails(l1, l2);
        }else{
            head = l2;
            linkTails(l2, l1);
        }

        return head;

    }

    public void linkTails(ListNode sm, ListNode bg) {

        if(sm.next == bg) {
            return;
        }

        ListNode nSm = sm.next;

        if(sm.next != null && bg.val <= sm.next.val ){
            sm.next = bg;
            linkTails(bg, nSm);
        }else if(sm.next == null && bg != null) {
            sm.next = bg;
            linkTails(sm, bg);
        }else{
            linkTails(nSm, bg);
        }
    }
}
```

compare it to this:

```
https://leetcode.com/problems/merge-two-sorted-lists/discuss/9715/Java-1-ms-4-lines-codes-using-recursion

public ListNode mergeTwoLists(ListNode l1, ListNode l2){
		if(l1 == null) return l2;
		if(l2 == null) return l1;
		if(l1.val < l2.val){
			l1.next = mergeTwoLists(l1.next, l2);
			return l1;
		} else{
			l2.next = mergeTwoLists(l1, l2.next);
			return l2;
		}
}
```

Recursive, short, elegant. Unfortunately, I don't have access to the runtime analysis.

18 [Remove duplicates from sorted array](https://leetcode.com/problems/remove-duplicates-from-sorted-array/)

well done. I believe your first sol was optimal in o(n). And you followed the Amazon coding interview style. Plust you solved this quite quickly, although you had to look up arrays documentation before realizing you didn't need anything extra.

The reason you were able to solve this so quickly is because you remembered a similar technique from a ctci question. (You should read more ctci questions)

```
class Solution {
    public int removeDuplicates(int[] nums) {

        //input: sorted int array with duplicate elements
        //output: length on array with duplicates removed
        //side-effect: array should have duplicates removed

        //note: in place duplicate removal using at most constant extra space

        //going from left to right
        //keep track of index to copy into
        //whenever you see a different int, copy into index, incr index

        if(nums.length == 0 || nums.length == 1) return nums.length;

        int copyInto = 1;

        for(int i = 1; i < nums.length; ++i){
            if(nums[i] != nums[i-1]){
                nums[copyInto] = nums[i];
                copyInto++;
            }
        }

        return copyInto++;

    }
}
```

19 [Implemet strStr()](https://leetcode.com/problems/implement-strstr/)

```
class Solution {
    public int strStr(String haystack, String needle) {
        //string haystack that can be empty, and may or may not contain a needle
        //string needle that can be empty, and may or may not be in haystack

        //output: first index of needle in haystack if it is contained in haystack
        //-1 if it is not
        //0 if needle is empty

        if(needle.length() == 0) return 0;

        //loop through from left to right
        //find first matching char
        //check if region matches
        //if not continue
        for(int i = 0; i < haystack.length(); ++i) {
            if(haystack.charAt(i) == needle.charAt(0)
                && haystack.regionMatches(true, i, needle, 0, needle.length())
            ) {
                return i;
            }
        }
        return -1;
    }
}
```

regionMatches is a good string method to remember

this performs 45% time, 98% space. Why is it so slow? I think this is because for each common start char, it goes through the full length of needle. I think this is an O(n x m) solution

20 [Count and say](https://leetcode.com/problems/count-and-say/)

```

```

how do you string to interger
how do you add to stringbuilder
how to convert char to string

interim solution. Will need to continue tomorrow

```
class Solution {
    public String countAndSay(int n) {

        //input, n, the number of times to run the count and say sequence

        //output, the nth term of the count and say sequence

        //the 5th term is the 4th term interpreted
        if(n == 1) return "1";
        return interpret(countAndSay(n-1));

    }

    public String interpret(String s) {

        if(s.equals("1")) return "11";

        //if(s.equals("11")) return "21";


        StringBuilder sb = new StringBuilder();

        int[] counter = new int[30];


        for(int i = 0; i < s.length(); ++i) {

            counter[s.charAt(i) - 1]++;
        }

        int dex = 0;
        for(int v: counter) {
            if(v > 0){
                sb.append(String.valueOf(v));
                sb.append(String.valueOf(dex));
            }
        }

        return sb.toString();
    }
}
```

```
class Solution {
    public String countAndSay(int n) {

        //input, n, the number of times to run the count and say sequence

        //output, the nth term of the count and say sequence

        //the 5th term is the 4th term interpreted
        if(n == 1) return "1";
        return interpret(countAndSay(n-1));

    }

    public String interpret(String s) {
        //System.out.println(s.length());

        //failed:
        /*
            loop through string counting chars
            loop through again buillding output string
            failed because the count were absolute values
        */

        //passed:
        /*
            loop through string buillding output string as you go
            key techniques: how to register a value change without hitting index out of bounds exception
            how to count values and build a stinrg making use of these value changes in one pass
        */

        if(s.equals("1")) return "11";


        StringBuilder sb = new StringBuilder();

        char curr = s.charAt(0);
        int currCounter = 1;

        int dex = 1;
        while(dex < s.length()) {
            if(s.charAt(dex) == curr) {
                currCounter++;
            }else {
                sb.append(currCounter);
                sb.append(curr - 48);
                curr = s.charAt(dex);
                currCounter = 1;
            }

            if(dex == s.length() - 1) {
                sb.append(currCounter);
                sb.append(curr - 48);
            }

            dex++;
        }

        System.out.print("end");
        return sb.toString();
    }
}
```

The idea behind interim solution failed. and this only performed 64% time, 99% memory

Seems regex is generally a good technique for questions like this. Have a look at [javascript recursive regex sol](https://leetcode.com/problems/count-and-say/discuss/642001/Javascript100-runtime-Super-easy-recursive)

21 [Plus One](https://leetcode.com/problems/plus-one/)

```
class Solution {
    public int[] plusOne(int[] digits) {
        //input non-empty array of positive integers
        //msd in head
        //no trailing zeros except 0 itsef i.e [0]

        //output array
        //to consider: can be 100 length of 9s. Don't know any data structure to contain this

        //sol: from right to left, sum and carry over,
        //if there's an extra create new array and concat

        //edge cases: head is 9, and +1
        //extend to: element is 9 and +1
        //if el is 9, co = 1, el = 0;
        //else el++, co = 0

        //or: if el+co == 10, el = 0, co = 1
        //if done and co = 1, create new array and concat
        int co = 1;
        for(int i = digits.length-1; i >= 0; i--) {
            digits[i] += co;
            if(digits[i] == 10) {
                co = 1;
                digits[i] = 0;
            }else{
                co = 0;
                break; //this was good
            }
        }
        if(co == 1) { //always be sure you're doing boolean operator ==, not assignment =
            int[] res = new int[digits.length+1];
            res[0] = 1;
            //si.concat(digits); // does not exist
            //I looked up concat
            System.arraycopy(digits, 0, res, 1, digits.length); //this is from one source to one destination: source, start source, dest, start dest, length to copy.
            return res;

        }

        return digits;
    }
}
```

100% better runtime, but ony 75% better memory

I believe it's an o(n) solution, and varaibly, O(n) space, o(1) space.

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

3 [Java if-else](https://www.hackerrank.com/challenges/java-if-else/problem)

```
public class Solution {

    private static void print(String var) {
            System.out.println(var);
        };

    private static final Scanner scanner = new Scanner(System.in);

    public static void main(String[] args) {
        int N = scanner.nextInt();
        scanner.skip("(\r\n|[\n\r\u2028\u2029\u0085])?");

        if(N%2 != 0) {
            print("Weird");
        } else if (N%2 == 0 && 2 <= N && 5 >= N) {
            print("Not Weird");
        } else if (N%2 == 0 && 6 <= N && 20 >= N) {
            print("Weird");
        } else if(N%2 == 0 && N > 20) {
            print("Not Weird");
        };

        scanner.close();
    }
}
```

4 [Java Stdin and Stdout II](https://www.hackerrank.com/challenges/java-stdin-stdout/problem?h_r=next-challenge&h_v=zen)

```
public class Solution {

    public static void main(String[] args) {
        Scanner scan = new Scanner(System.in);

        int i = scan.nextInt();
        double d = scan.nextDouble();
        scan.nextLine();
        String s = scan.nextLine();

        System.out.println("String: " + s);
        System.out.println("Double: " + d);
        System.out.println("Int: " + i);
    }
}
```

5 [Java Output Formatting](https://www.hackerrank.com/challenges/java-output-formatting/problem)

```
public class Solution {

    public static void main(String[] args) {
            Scanner sc=new Scanner(System.in);
            System.out.println("================================");
            for(int i=0;i<3;i++)
            {
                String s1=sc.next();
                int x=sc.nextInt();
                //Complete this line
                System.out.printf("%-15s%03d%n", s1, x);
            }
            System.out.println("================================");

    }
}
```

6 [Java Loops I](https://www.hackerrank.com/challenges/java-loops-i/problem)

```
public class Solution {

    private static final Scanner scanner = new Scanner(System.in);

    public static void main(String[] args) {
        int N = scanner.nextInt();
        scanner.skip("(\r\n|[\n\r\u2028\u2029\u0085])?");

        for(int i = 1; i <= 10; i++){
            System.out.printf("%d x %d = %d%n", N, i, (N*i));
        }

        scanner.close();
    }
}
```

7 [Java Loops II](https://www.hackerrank.com/challenges/java-loops/problem)

```
class Solution{
    public static void main(String []argh){
        Scanner in = new Scanner(System.in);
        int t=in.nextInt();
        for(int i=0;i<t;i++){
            int a = in.nextInt();
            int b = in.nextInt();
            int n = in.nextInt();

            int base = a + b;
            String s = "" + base;
            for(int j = 1; j < n; j++){
                base += Math.pow(2,j)*b;
                s += " " + base;
            }

            System.out.printf("%s%n", s);
        }
        in.close();
    }
}
```

8 [Java Datatypes](https://www.hackerrank.com/challenges/java-datatypes/problem)

```
class Solution{
    public static void main(String []argh)
    {



        Scanner sc = new Scanner(System.in);
        int t=sc.nextInt();

        for(int i=0;i<t;i++)
        {

            try
            {
                long x=sc.nextLong();
                System.out.println(x+" can be fitted in:");
                if(x>=-128 && x<=127)System.out.println("* byte");
                if(x>=(-(Math.pow(2,15))) && x<=(Math.pow(2,15)-1))System.out.println("* short");
                if(x>=(-(Math.pow(2,31))) && x<=(Math.pow(2,31)-1))System.out.println("* int");
                if(x>=(-(Math.pow(2,63))) && x<=(Math.pow(2,63)-1))System.out.println("* long");

                //Complete the code
            }
            catch(Exception e)
            {
                System.out.println(sc.next()+" can't be fitted anywhere.");
            }

        }
    }
}
```

9 [Java End-Of-file](https://www.hackerrank.com/challenges/java-end-of-file/problem)

```
public class Solution {

    public static void main(String[] args) {
        /* Enter your code here. Read input from STDIN. Print output to STDOUT. Your class should be named Solution. */
        Scanner sc = new Scanner(System.in);

        int i = 1;
        while(sc.hasNext()){
           System.out.printf("%d %s%n", i, sc.nextLine());
           i++;
        }

        sc.close();
    }
}
```

10 [Java Static Initialization Block](https://www.hackerrank.com/challenges/java-static-initializer-block/problem?h_r=next-challenge&h_v=zen)

```
public class Solution {
    static int B, H = 0;
    static boolean flag = false;
    static {
        Scanner sc = new Scanner(System.in);
        B = sc.nextInt();
        H = sc.nextInt();
        if(B > 0 && H > 0) {
            flag = true;
        } else {
            System.out.println("java.lang.Exception: Breadth and height must be positive");
        }
        sc.close();
    }
public static void main(String[] args){
		if(flag){
			int area=B*H;
			System.out.print(area);
		}

	}//end of main

}//end of class
```

11 [Java Int to String](https://www.hackerrank.com/challenges/java-int-to-string/problem)

```
String s = String.valueOf(n);
```

12 [Java Date and Time](https://www.hackerrank.com/challenges/java-date-and-time/problem)

```
public static String findDay(int month, int day, int year) {
        Calendar cal = Calendar.getInstance();
        Date date = null;
        try {
         date = new SimpleDateFormat("yyyy-MM-dd").parse(year+"-"+month+"-"+day);
        } catch(Exception e) {
            System.out.println(e);
        }
        cal.setTime(date);
        int dayOfWeek = cal.get(Calendar.DAY_OF_WEEK);

        switch(dayOfWeek) {
            case 1:
                return "SUNDAY";
            case 2:
                return "MONDAY";
            case 3:
                return "TUESDAY";
            case 4:
                return "WEDNESDAY";
            case 5:
                return "THURSDAY";
            case 6:
                return "FRIDAY";
            case 7:
                return "SATURDAY";
            default:
                return "NOT A DAY";
        }

    }
```

13 [Java Currency Formatter](https://www.hackerrank.com/challenges/java-currency-formatter/problem?h_r=next-challenge&h_v=zen)

```
public class Solution {

    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        double payment = scanner.nextDouble();
        scanner.close();

        // Write your code here.
        String us = NumberFormat.getCurrencyInstance(Locale.US).format(payment);
        String china = NumberFormat.getCurrencyInstance(Locale.CHINA).format(payment);
        String france = NumberFormat.getCurrencyInstance(Locale.FRANCE).format(payment);
        String india = NumberFormat.getCurrencyInstance(new Locale("en","IN")).format(payment);

        System.out.println("US: " + us);
        System.out.println("India: " + india);
        System.out.println("China: " + china);
        System.out.println("France: " + france);
    }
}
```

14 [Java Strings Introduction](https://www.hackerrank.com/challenges/java-strings-introduction/problem)

```
public class Solution {

    public static void main(String[] args) {

        Scanner sc=new Scanner(System.in);
        String A=sc.next();
        String B=sc.next();
        /* Enter your code here. Print output to STDOUT. */
        System.out.println(A.length() + B.length());
        if(A.compareTo(B) > 0) {
            System.out.println("Yes");
        } else {
            System.out.println("No");
        }
        System.out.printf("%s %s%n", A.toUpperCase().charAt(0)+ A.substring(1), B.toUpperCase().charAt(0)+ B.substring(1));

    }
}
```

15 [Java Substring](https://www.hackerrank.com/challenges/java-substring/problem?h_r=next-challenge&h_v=zen)

```
public class Solution {

    public static void main(String[] args) {
        Scanner in = new Scanner(System.in);
        String S = in.next();
        int start = in.nextInt();
        int end = in.nextInt();
        System.out.println(S.substring(start,end));
    }
}
```

16 [Java Substring Comparison](https://www.hackerrank.com/challenges/java-string-compare/problem)

```
public static String getSmallestAndLargest(String s, int k) {
        String smallest = "";
        String largest = "";

        // Complete the function
        // 'smallest' must be the lexicographically smallest substring of length 'k'
        // 'largest' must be the lexicographically largest substring of length 'k'
        int l = (s.length()-k)+1;
        String[] substrings = new String[l];
        for(int i = 0; i < l; ++i) {
            substrings[i] = (s.substring(i, k+i));
        }
        java.util.Arrays.sort(substrings);
        // for(int i = 0; i < l; ++i) {
        //     System.out.println(substrings[i]);
        // }

        smallest = substrings[0];
        largest = substrings[l-1];

        return smallest + "\n" + largest;
    }
```

17 [Java String Reverse](https://www.hackerrank.com/challenges/java-string-reverse/problem?h_r=next-challenge&h_v=zen)

```
public class Solution {

    public static void main(String[] args) {

        Scanner sc=new Scanner(System.in);
        String A=sc.next();
        /* Enter your code here. Print output to STDOUT. */
        String R = new StringBuilder(A).reverse().toString();
        if(A.equals(R)) {
            System.out.println("Yes");
        } else {
            System.out.println("No");
        }

    }
}
```

18 [Java Anagrams](https://www.hackerrank.com/challenges/java-anagrams/problem?h_r=next-challenge&h_v=zen&h_r=next-challenge&h_v=zen)

There's something about converting a char arrays to strings then comparing the resulting strings
with Objects.equals or String.equals that kept giving false even though the two strings were equal. On the other hand, doing a comparison at the Array level using Arrays.equals worked.
Arrays

```
static boolean isAnagram(String a, String b) {
        // Complete the function
        char[] as = a.toLowerCase().toCharArray();
        char[] bs = b.toLowerCase().toCharArray();

        // java.util.Arrays.sort(as);
        // a = java.util.Arrays.toString(as);
        // java.util.Arrays.sort(bs);
        // b = java.util.Arrays.toString(bs);


        // if(java.util.Objects.equals(as, bs)) {
        //     //System.out.println("Anagrams");
        //     return true;
        // } else {
        //     //System.out.println("Not Anagrams");
        //     return false;
        // }

        java.util.Arrays.sort(as);
        java.util.Arrays.sort(bs);


        if(java.util.Arrays.equals(as, bs)) {
            //System.out.println("Anagrams");
            return true;
        } else {
            //System.out.println("Not Anagrams");
            return false;
        }
    }
```

19 [Java String Tokens](https://www.hackerrank.com/challenges/java-string-tokens/problem?h_r=next-challenge&h_v=zen&h_r=next-challenge&h_v=zen&h_r=next-challenge&h_v=zen)
Solving this challenge I needed help in the form of the following pointers:

1. trim the string

2. handle string.length() > 400000 => don't print anything

3. handle string.length() == 0 => print "0"

```
public class Solution {

    public static void main(String[] args) {
        Scanner scan = new Scanner(System.in);
        String s = scan.nextLine();
        s = s.trim();
        // Write your code here.
        String[] sp = s.split("[ !,?._'@]+");
        if(s.length() < 1) {
            System.out.println("0");
        }else{
        System.out.println(sp.length);
        for(int i = 0; i < sp.length; ++i) {
            System.out.println(sp[i]);
        }}
        scan.close();
    }
}
```

20 [Pattern Syntax Checker](https://www.hackerrank.com/challenges/pattern-syntax-checker/problem?h_r=next-challenge&h_v=zen)

```
public class Solution
{
	public static void main(String[] args){
		Scanner in = new Scanner(System.in);
		int testCases = Integer.parseInt(in.nextLine());
		while(testCases>0){
			String pattern = in.nextLine();
          	//Write your code
            try{
                Pattern p = Pattern.compile(pattern);
                System.out.println("Valid");
            } catch(PatternSyntaxException e) {
                System.out.println("Invalid");
            }
            --testCases;
		}
	}
}
```

21 [Java Regex](https://www.hackerrank.com/challenges/java-regex/problem)

Used this resource for the regex: https://www.regular-expressions.info/ip.html

```
class MyRegex {
    String pattern = "\\b(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\b";
}
```

22 [Java Regex 2- Duplicate Words](https://www.hackerrank.com/challenges/duplicate-word/problem)

Relied on help in the discussion forum to get this one after a few attempts.
Found this recommended resource very helpful for getting an idea of how groups work: http://tutorials.jenkov.com/java-regex/matcher.html

I do wish there were an easier way than regex of telling a machine what it is you want to match.

```
public class DuplicateWords {

    public static void main(String[] args) {

        String regex = "\\b(\\w+)( \\1)+\\b";
        Pattern p = Pattern.compile(regex, Pattern.CASE_INSENSITIVE);

        Scanner in = new Scanner(System.in);
        int numSentences = Integer.parseInt(in.nextLine());

        while (numSentences-- > 0) {
            String input = in.nextLine();

            Matcher m = p.matcher(input);

            // Check for subsequences of input that match the compiled pattern
            while (m.find()) {
                input = input.replaceAll(m.group(0), m.group(1));
            }

            // Prints the modified sentence.
            System.out.println(input);
        }

        in.close();
    }
}
```

Using regex, my runtime got worse but my code got easier to maintain

```
import java.util.regex.*;


class Solution {
    public int myAtoi(String s) {
        //use regex to find the sequence of integers
        //attempt a conversion to int using standard libraries

        Pattern p = Pattern.compile("^(-|\\+)?(\\d+)|^( +)(-|\\+)?(\\d+)");
        Matcher m = p.matcher(s);

        if(m.find()) {
            try{
                if(m.group(2) != null) return Integer.parseInt(m.group());
                if(m.group(5) != null && m.group(4) != null) return Integer.parseInt(m.group(4) + m.group(5));
                if(m.group(5) != null) return Integer.parseInt(m.group(5));

            }catch(NumberFormatException e) {
                if(m.group(1) != null && m.group(1).equals("-")) return Integer.MIN_VALUE;
                if(m.group(4) != null && m.group(4).equals("-")) return Integer.MIN_VALUE;
                return Integer.MAX_VALUE;
            }
        }

        return 0;
    }
}
```

23 [Username validator](https://www.hackerrank.com/challenges/valid-username-checker/problem)

```
class UsernameValidator {
    /*
     * Write regular expression here.
     */
    public static final String regularExpression = "[a-zA-Z]{1}[a-zA-Z0-9_]{7,29}";
}
```

24 [Tag Content Extractor](https://www.hackerrank.com/challenges/tag-content-extractor/problem)
My best regex solution: <(.+)>(.+)<\/\1> didn't quite cut it

So with help from the discussions I used this: <(.+)>([^<]+)</\\1>
And it makes sense. A child of tags cannot contain a < character.

```
public class Solution{

	public static void main(String[] args){

		Scanner in = new Scanner(System.in);
		int testCases = Integer.parseInt(in.nextLine());
		while(testCases>0){
			String line = in.nextLine();

          	//Write your code here
            Pattern p = Pattern.compile("<(.+)>([^<]+)</\\1>");
            Matcher m = p.matcher(line);

            while(m.find()) {
                System.out.println(m.group(2));
            }
            m.reset();
            if(!m.find()) {
                System.out.println("None");
            }

			testCases--;
		}
	}
}
```

25 [Java BigInteger](https://www.hackerrank.com/challenges/java-biginteger/problem)

```
public class Solution {

    public static void main(String[] args) {
        /* Enter your code here. Read input from STDIN. Print output to STDOUT. Your class should be named Solution. */
        Scanner sc = new Scanner(System.in);
        String a = sc.next();
        String b = sc.next();
        sc.close();

        BigInteger A = new BigInteger(a);
        BigInteger B = new BigInteger(b);

        System.out.printf("%d%n%d%n", A.add(B), A.multiply(B));

    }
}
```

26 [Java Primality Test](https://www.hackerrank.com/challenges/java-primality-test/problem)

```
public class Solution {
    private static final Scanner scanner = new Scanner(System.in);

    public static void main(String[] args) {
        String n = scanner.nextLine();

        scanner.close();

        BigInteger bn = new BigInteger(n);
        if(bn.isProbablePrime(1))
        System.out.println("prime");
        else
        System.out.println("not prime");
    }
}
```

27 [Java BigDecimal](https://www.hackerrank.com/challenges/java-bigdecimal/problem)

```
ArrayList<String> ls = new ArrayList<String>(Arrays.asList(s));
ls.remove(n+1);
ls.remove(n);

BigDecimal[] ds = new BigDecimal[ls.size()];

for(int i = 0; i < ls.size(); ++i) {
    ds[i] = new BigDecimal(ls.get(i));
}

Arrays.sort(ds, Collections.reverseOrder());

for(int i = 0; i < ds.length; ++i) {
    for(int j = 0; j < ls.size(); ++j) {
        if(new BigDecimal(ls.get(j)).equals(ds[i])){
            s[i] = ls.get(j);
            ls.remove(j);
        }
    }
}
```

28 [Java 1D Array](https://www.hackerrank.com/challenges/java-1d-array-introduction/problem)

```
import java.util.*;

public class Solution {

    public static void main(String[] args) {

        Scanner scan = new Scanner(System.in);
        int n = scan.nextInt();
        int[]a = new int[n];
        for (int i = 0; i < n; i++) {
            a[i] = scan.nextInt();
        }
        scan.close();

        // Prints each sequential element in array a
        for (int i = 0; i < a.length; i++) {
            System.out.println(a[i]);
        }
    }
}
```

28 [Java 2D Array](https://www.hackerrank.com/challenges/java-2d-array/problem)

```
public class Solution {



    private static final Scanner scanner = new Scanner(System.in);

    public static void main(String[] args) {
        int[][] arr = new int[6][6];

        for (int i = 0; i < 6; i++) {
            String[] arrRowItems = scanner.nextLine().split(" ");
            scanner.skip("(\r\n|[\n\r\u2028\u2029\u0085])?");

            for (int j = 0; j < 6; j++) {
                int arrItem = Integer.parseInt(arrRowItems[j]);
                arr[i][j] = arrItem;
            }
        }

        int max = 0; int sum = 0;

        for(int i =0; i <= 3; ++i){
            for(int j = 0; j<=3; ++j){
                sum =
                 arr[i][j] + arr[i][j+1] + arr[i][j+2]
                 + arr[i+1][j+1]
                 +arr[i+2][j]+arr[i+2][j+1]+arr[i+2][j+2];

                if(i == 0 && j == 0) {
                max = sum;
                }

                if(sum > max){
                     max = sum;
                }
            }
        }

        System.out.println(max);

        scanner.close();
    }
}
```

29 [Java Subarray](https://www.hackerrank.com/challenges/java-negative-subarray/problem)

```
public class Solution {

    public static void main(String[] args) {
        /* Enter your code here. Read input from STDIN. Print output to STDOUT. Your class should be named Solution. */
        Scanner sc = new Scanner(System.in);
        int l = sc.nextInt();
        int[] arr = new int[l];
        for(int i = 0; i < l; i++){
            arr[i] = sc.nextInt();
        }

        int counter = 0;
        int sum = 0;
        //int stop = 0;
        for(int i = 0; i < l; i++) {
            if(arr[i] < 0) {
                ++counter;
            }
            sum = arr[i];

            // if(i == 0) {
            //     stop = l-1;
            // }else {
            //     stop = l;
            // }
            for(int j = i+1; j < l; j++) {
                sum += arr[j];
                //System.out.println(sum);
                if(sum < 0){
                    ++counter;
                }
            }
        }
        System.out.println(counter);
    }
}
```

30 [Java ArrayList](https://www.hackerrank.com/challenges/java-arraylist/problem)
What's the issue with ArrayList in ArrayList, why did I have to use an array of ArrayLists here?

```
public class Solution {

    public static void main(String[] args) {
        /* Enter your code here. Read input from STDIN. Print output to STDOUT. Your class should be named Solution. */
        Scanner sc = new Scanner(System.in);
        int listLen = sc.nextInt();
        ArrayList[] arr = new ArrayList[listLen];
        for(int i =0; i < listLen; ++i) {
            ArrayList child = new ArrayList();
            int childLen = sc.nextInt();
            for(int j = 0; j < childLen; j++){
                child.add(sc.nextInt());
            }
            arr[i] = child;
            //System.out.println(arr.get(i));
        }
        int q = sc.nextInt();
        int row, col =0;
        row = col;
        for(int i =0; i < q; ++i){
            row = sc.nextInt();
            col = sc.nextInt();
            try {
            System.out.println(arr[row-1].get(col-1));
            }catch(Exception e){
                System.out.println("ERROR!");
            }
        }
    }
}
```

31 [Java 1D Array Part II](https://www.hackerrank.com/challenges/java-1d-array/problem)

```
import java.util.*;

public class Solution {

    public static boolean canWin(int leap, int[] game) {
        // Return true if you can win the game; otherwise, return false.
        int i = 0;
        int n = game.length;
        while( i < n-1) {
            if((i + leap) >= (n-1)) {
                return true;
            }
            if(i == (n-1)) {
                return true;
            }
            if(game[i+leap] == 0){
                i = i+leap;
                continue;
            }
            if(game[i+1] == 0) {
                i = i+1;
                continue;
            }
            break;
        }
        return false;
    }

    public static void main(String[] args) {
        Scanner scan = new Scanner(System.in);
        int q = scan.nextInt();
        while (q-- > 0) {
            int n = scan.nextInt();
            int leap = scan.nextInt();

            int[] game = new int[n];
            for (int i = 0; i < n; i++) {
                game[i] = scan.nextInt();
            }

            System.out.println( (canWin(leap, game)) ? "YES" : "NO" );
        }
        scan.close();
    }
}
```

First thing to realize is that the array is a graph, with edges between nodes where one can traverse.

Take the first sample for instance

```
5 3
0 0 0 0 0
```

This gives the following graph
![image](https://user-images.githubusercontent.com/15310842/82845435-7e77de00-9edc-11ea-90ba-0ff87ff90a29.png)

That hurdle out of the way, a dfs run (which finds every path findable from a startign node s, in this case index 0) is all that's needed.

A quick overview of the algorithm

```
dfs(s, graph) {

mark s as explored

for every edge s,v of s
	dfs(v, graph)

}
```

A roughly 1:1 implementation

```
    public static boolean dfs(int index, int leap, int[] game) {
        game[index] = 1;

        if(index == game.length-1){
            return true;
        }
        if(index + leap >= game.length){
            return true;
        }

        ArrayList<Integer> edges = new ArrayList<Integer>();

        if(index-1 >= 0 && game[index-1] == 0){
            edges.add(index-1);
        }
        if(game[index + leap] == 0) {
            edges.add(index+leap);
        }
        if(game[index + 1] == 0) {
            edges.add(index+1);
        }

        boolean canTraverse = false;
        for(int i = 0; i < edges.size(); i++) {
            canTraverse = canTraverse || dfs(edges.get(i), leap, game);
        }
        return canTraverse;
    }

    public static boolean canWin(int leap, int[] game) {
        return dfs(0, leap, game);
    }
```

33 [Java List](https://www.hackerrank.com/challenges/java-list/problem)

Errors made:

- new Scanner without System.in
- Deducting 1 from the indices specified
- Using == instead of .equals to compare strings
- Using ArrayList instead of LinkedList, which is faster for insertions and deletions (https://www.hackerrank.com/challenges/java-list/forum, https://beginnersbook.com/2013/12/difference-between-arraylist-and-linkedlist-in-java/)

```
import java.io.*;
import java.util.*;

public class Solution {

    public static void main(String[] args) {
        /* Enter your code here. Read input from STDIN. Print output to STDOUT. Your class should be named Solution. */
        Scanner sc = new Scanner(System.in);
        int len = sc.nextInt();
        List list = new ArrayList(len);
        for(int i = 0; i < len; i++) {
            list.add(sc.nextInt());
        }
        int qLen = sc.nextInt();
        for(int i = 0; i < qLen; ++i) {
            if(sc.next().equals("Insert")){
                list.add(sc.nextInt(),sc.nextInt());
            }else{
                list.remove(sc.nextInt());
            }
        }
        sc.close();
        for(int i = 0; i < list.size(); ++i) {
            System.out.printf("%d ", list.get(i));
        }

    }
}
```

34 [Java Map](https://www.hackerrank.com/challenges/phone-book/problem)

```
//Complete this code or write your own from scratch
import java.util.*;
import java.io.*;

class Solution{
	public static void main(String []argh)
	{
		Scanner in = new Scanner(System.in);
		int n=in.nextInt();
		in.nextLine();
        Map<String, Integer> phoneBook = new HashMap<String, Integer>();
		for(int i=0;i<n;i++)
		{
			String name=in.nextLine();
			int phone=in.nextInt();
			in.nextLine();
            phoneBook.put(name, phone);
		}
		while(in.hasNext())
		{
			String s=in.nextLine();
            if(phoneBook.get(s) != null){
                System.out.printf("%s=%d\n",s,phoneBook.get(s));
            }else{
                System.out.println("Not found");
            }
		}
        in.close();
	}
}

```

35 [Java Hashset](https://www.hackerrank.com/challenges/java-hashset/)

```
import java.io.*;
import java.util.*;
import java.text.*;
import java.math.*;
import java.util.regex.*;

public class Solution {

 public static void main(String[] args) {
        Scanner s = new Scanner(System.in);
        int t = s.nextInt();
        String [] pair_left = new String[t];
        String [] pair_right = new String[t];

        for (int i = 0; i < t; i++) {
            pair_left[i] = s.next();
            pair_right[i] = s.next();
        }
        HashSet<String> set = new HashSet();
        for(int i = 0; i < t; ++i){
            set.add(pair_left[i]+","+pair_right[i]);
            System.out.println(set.size());
        }
//Write your code here

    }
}
```

36 [Java Generics]()

Error: forgetting to include <T> in the generic method signature (is it called a signature? No it's not. The signature is just the method name and parameter list https://docs.oracle.com/javase/tutorial/java/javaOO/methods.html). ...<T> in the generic method definition.

```

import java.io.IOException;
import java.lang.reflect.Method;

class Printer
{
   <T> void printArray(T[] a){
       for(T o : a) {
           System.out.println(o);
       }
   }

}

public class Solution {


    public static void main( String args[] ) {
        Printer myPrinter = new Printer();
        Integer[] intArray = { 1, 2, 3 };
        String[] stringArray = {"Hello", "World"};
        myPrinter.printArray(intArray);
        myPrinter.printArray(stringArray);
        int count = 0;

        for (Method method : Printer.class.getDeclaredMethods()) {
            String name = method.getName();

            if(name.equals("printArray"))
                count++;
        }

        if(count > 1)System.out.println("Method overloading is not allowed!");

    }
}
```

37 [Java Sort](https://www.hackerrank.com/challenges/java-sort/problem)

implements comparable to sort a user defined class.

- Do not understand why fname is the only one reveresed.

There are better approahces in the discussions worth reading through that use more advanced syntax https://www.hackerrank.com/challenges/java-sort/forum

```
import java.util.*;

class Student implements Comparable<Student>{
	private int id;
	private String fname;
	private double cgpa;
	public Student(int id, String fname, double cgpa) {
		super();
		this.id = id;
		this.fname = fname;
		this.cgpa = cgpa;
	}
	public int getId() {
		return id;
	}
	public String getFname() {
		return fname;
	}
	public double getCgpa() {
		return cgpa;
	}

    public int compareTo(Student s) {
        int lastCmp = Double.valueOf(cgpa).compareTo(Double.valueOf(s.cgpa));
        if(lastCmp == 0) {
            lastCmp = s.fname.compareTo(fname);
        }
        if(lastCmp == 0) {
            lastCmp = Integer.valueOf(id).compareTo(Integer.valueOf(s.id));
        }
        return lastCmp;
    }

}

//Complete the code
public class Solution
{
	public static void main(String[] args){
		Scanner in = new Scanner(System.in);
		int testCases = Integer.parseInt(in.nextLine());

		List<Student> studentList = new ArrayList<Student>();
		while(testCases>0){
			int id = in.nextInt();
			String fname = in.next();
			double cgpa = in.nextDouble();

			Student st = new Student(id, fname, cgpa);
			studentList.add(st);

			testCases--;
		}

        Collections.sort(studentList, Collections.reverseOrder());
      	for(Student st: studentList){
			System.out.println(st.getFname());
		}
	}
}
```

38 [Java BitSet](https://www.hackerrank.com/challenges/java-bitset/problem)

Practising writing from std with your ctci questions helped with this

- as with the previous one, very nice advanced syntax here: https://www.hackerrank.com/challenges/java-bitset/forum

```
import java.io.*;
import java.util.*;

public class Solution {

    public static void main(String[] args) {
        /* Enter your code here. Read input from STDIN. Print output to STDOUT. Your class should be named Solution. */
        Scanner sc = new Scanner(System.in);
        int size = sc.nextInt();
        BitSet[] set = new BitSet[2];
        set[0] = new BitSet(size);
        set[1] = new BitSet(size);

        int ops = sc.nextInt();
        sc.nextLine();
        for(int i = 0; i < ops; ++i ) {
            String[] op = sc.nextLine().split(" ");
            int a = Integer.valueOf(op[1]);
            int b = Integer.valueOf(op[2]);

            //System.out.printf("%d%d", a, b);

            switch(op[0]) {
                case "AND":
                    set[--a].and(set[--b]);
                    break;
                case "OR":
                    set[--a].or(set[--b]);
                    break;
                case "XOR":
                    set[--a].xor(set[--b]);
                    break;
                case "FLIP":
                    set[--a].flip(b);
                    break;
                case "SET":
                    set[--a].set(b);
                    break;
                default:
                    // code block
                }

            System.out.printf("%d %d\n", set[0].cardinality(), set[1].cardinality());
        }

        sc.close();
    }
}
```

39 [Java Sort](https://www.hackerrank.com/challenges/java-sort/problem)

```
import java.util.*;

class Student implements Comparable<Student>{
	private int id;
	private String fname;
	private double cgpa;
	public Student(int id, String fname, double cgpa) {
		super();
		this.id = id;
		this.fname = fname;
		this.cgpa = cgpa;
	}
	public int getId() {
		return id;
	}
	public String getFname() {
		return fname;
	}
	public double getCgpa() {
		return cgpa;
	}

    public int compareTo(Student s) {
        int lastCmp = Double.valueOf(cgpa).compareTo(Double.valueOf(s.cgpa));
        if(lastCmp == 0) {
            lastCmp = s.fname.compareTo(fname);
        }
        if(lastCmp == 0) {
            lastCmp = Integer.valueOf(id).compareTo(Integer.valueOf(s.id));
        }
        return lastCmp;
    }

}

//Complete the code
public class Solution
{
	public static void main(String[] args){
		Scanner in = new Scanner(System.in);
		int testCases = Integer.parseInt(in.nextLine());

		List<Student> studentList = new ArrayList<Student>();
		while(testCases>0){
			int id = in.nextInt();
			String fname = in.next();
			double cgpa = in.nextDouble();

			Student st = new Student(id, fname, cgpa);
			studentList.add(st);

			testCases--;
		}

        Collections.sort(studentList, Collections.reverseOrder());
      	for(Student st: studentList){
			System.out.println(st.getFname());
		}
	}
}

```

40 [Java Comparator](https://www.hackerrank.com/challenges/java-comparator/problem)

```
import java.util.*;

// Write your Checker class here
class Checker implements Comparator<Player> {

    @Override
    public int compare(Player a, Player b) {
        int temp = b.score - a.score;
        if(temp == 0) {
            temp = a.name.compareTo(b.name);
        }
        return temp;
    }
}

class Player{
    String name;
    int score;

    Player(String name, int score){
        this.name = name;
        this.score = score;
    }
}

class Solution {

    public static void main(String[] args) {
        Scanner scan = new Scanner(System.in);
        int n = scan.nextInt();

        Player[] player = new Player[n];
        Checker checker = new Checker();

        for(int i = 0; i < n; i++){
            player[i] = new Player(scan.next(), scan.nextInt());
        }
        scan.close();

        Arrays.sort(player, checker);
        for(int i = 0; i < player.length; i++){
            System.out.printf("%s %s\n", player[i].name, player[i].score);
        }
    }
}
```

41 [Java Priority Queue](https://www.hackerrank.com/challenges/java-priority-queue/problem)

```
 //public class Student => this threw an error, public class student should be declared in file named Student.java
 class Student {
     private int id;
     private String name;
     private double cgpa;

     public Student(int id, String name, double cgpa) {
         this.id = id;
         this.name = name;
         this.cgpa = cgpa;
     }

     public int getID() {
         return id;
     }

     public String getName() {
         return name;
     }

     public double getCGPA() {
         return cgpa;
     }
 }

//public class Priorities => same error as above
class Priorities {

    List<Student> getStudents(List<String> events) {
        //return new List<Student>; this threw an error
        return new ArrayList<Student>();
    }
}

public class Solution {
    private final static Scanner scan = new Scanner(System.in);
    private final static Priorities priorities = new Priorities();

    public static void main(String[] args) {
        int totalEvents = Integer.parseInt(scan.nextLine());
        List<String> events = new ArrayList<>();

        while (totalEvents-- != 0) {
            String event = scan.nextLine();
            events.add(event);
        }

        List<Student> students = priorities.getStudents(events);

        if (students.isEmpty()) {
            System.out.println("EMPTY");
        } else {
            for (Student st: students) {
                System.out.println(st.getName());
            }
        }
    }
}

```

Final. Special attention should be given to implementing Comparable or overiding comparator. The order that results is not entirely clear.

```
import java.util.ArrayList;
import java.util.List;
import java.util.Scanner;
/*
 * Create the Student and Priorities classes here.
 */
import java.util.*;

 class Student implements Comparable<Student> {
     private int id;
     private String name;
     private double cgpa;

     public Student(int id, String name, double cgpa) {
         this.id = id;
         this.name = name;
         this.cgpa = cgpa;
     }

     public int getID() {
         return id;
     }

     public String getName() {
         return name;
     }

     public double getCGPA() {
         return cgpa;
     }

     public int compareTo(Student s) {
        int lastCmp = Double.valueOf(s.cgpa).compareTo(Double.valueOf(cgpa));
        if(lastCmp == 0) {
            lastCmp = name.compareTo(s.name);
        }
        if(lastCmp == 0) {
            lastCmp = Integer.valueOf(s.id).compareTo(Integer.valueOf(id));
        }
        return lastCmp;
     }
 }

class Priorities {

    List<Student> getStudents(List<String> events) {
        PriorityQueue<Student> pq = new PriorityQueue<Student>();
        for(String s : events) {
            String [] sa = s.split(" ");
            if(sa[0].equals("ENTER")){
                pq.add(new Student(Integer.valueOf(sa[3]), sa[1], Double.valueOf(sa[2])));
            }
            if(sa[0].equals("SERVED")) {
                pq.poll();
            }
        }
        List ss = new ArrayList<Student>();
        while(!pq.isEmpty()){
            ss.add(pq.poll());
        }
        return ss;
    }
}



public class Solution {
    private final static Scanner scan = new Scanner(System.in);
    private final static Priorities priorities = new Priorities();

    public static void main(String[] args) {
        int totalEvents = Integer.parseInt(scan.nextLine());
        List<String> events = new ArrayList<>();

        while (totalEvents-- != 0) {
            String event = scan.nextLine();
            events.add(event);
        }

        List<Student> students = priorities.getStudents(events);

        if (students.isEmpty()) {
            System.out.println("EMPTY");
        } else {
            for (Student st: students) {
                System.out.println(st.getName());
            }
        }
    }
}
```

42 [Java Stack](https://www.hackerrank.com/challenges/java-stack/problem)

- for string, use .length(), not length to check the length.

- I know it's not an algorithm question, but this uses O(n) space, for the stack. n/2 best case, so n/2. Whereas a recursive solution can solve it in place, in, I think, O(nlogn) but definitely not worese than the present O(n) time.

```
import java.util.*;
class Solution{

    static boolean isBalanced(String b) {
        if(b.equals("")){return true;}
        int len = b.length();
        if(len % 2 != 0) {
            return false;
        }

        Stack<Character> stack = new Stack<Character>();

        for(int i = 0; i < len; ++i){
            char k = b.charAt(i);
            if(k == '{' || k == '[' || k == '(') {
                stack.push(k);
            }
            if(stack.empty()){return false;} ///////////////////<<<<==== this case was not obvious at first, but since you're only pushing if open bracket, then it's still possible to get an empty stack when the fist few are closed brackets, but the rest are balanced brackets.
            if(k == '}' && stack.peek() == '{'){stack.pop();}
            if(k == ']' && stack.peek() == '['){stack.pop();}
            if(k == ')' && stack.peek() == '('){stack.pop();}
        }

        return stack.empty();
    }

	public static void main(String []argh)
	{
		Scanner sc = new Scanner(System.in);

		while (sc.hasNext()) {
			String input=sc.next();
            System.out.println(isBalanced(input));
		}

	}
}
```

43 [Java Deque](https://www.hackerrank.com/challenges/java-dequeue/problem)

- to be fair, I still don't see why a normal que won't have sufficed.
- also, for future reference deque.stream().distint().count() seems to run in O(n) time.
- hence the need for a hashset. Making this, I think, O(n) time in total.

```
    import java.util.*;
    public class test {
        public static void main(String[] args) {
            Scanner in = new Scanner(System.in);
            Deque<Integer> deque = new ArrayDeque<Integer>();
            HashSet<Integer> set = new HashSet<Integer>();
            int n = in.nextInt();
            int m = in.nextInt();

            long res = 0;
            for (int i = 0; i < n; i++) {
                int num = in.nextInt();
                deque.addFirst(num);
                set.add(num);
                if(deque.size() == m) {
                    res = Math.max(set.size(), res);
                    int r = deque.removeLast();
                    if(!deque.contains(r)) set.remove(r);
                }
            }
            System.out.println(res);
        }
    }

```

44 [Java Inheritance I](https://www.hackerrank.com/challenges/java-inheritance-1/problem)

Inheritance: One class inherits the properties of another.

```
import java.io.*;
import java.util.*;
import java.text.*;
import java.math.*;
import java.util.regex.*;

class Animal{
	void walk()
	{
		System.out.println("I am walking");
	}
}
class Bird extends Animal
{
	void fly()
	{
		System.out.println("I am flying");
	}

    void sing()
    {
        System.out.println("I am singing");
    }
}

public class Solution{

   public static void main(String args[]){

	  Bird bird = new Bird();
	  bird.walk();
	  bird.fly();
      bird.sing();

   }
}
```

45 [Inheritance II](https://www.hackerrank.com/challenges/java-inheritance-2/problem)

Superclass: The class you inherit from is called the superclass.

```
//Write your code here
class Arithmetic {
    int add(int a, int b) {
        return a + b;
    }
}

class Adder extends Arithmetic {

}
```

46 [Java Abstract Class](https://www.hackerrank.com/challenges/java-abstract-class/problem)

- An abstract class is a class that cannot be instantiated.
- It can contain abstract methods (lacking any implementation) which will have to be implemented in classes which inherit from it.
- Trying to inherit an abstract method while retaining the abstract keyword throws an error.
- abstract classes exist to work as a base for subclasses.

```
import java.util.*;
abstract class Book{
	String title;
	abstract void setTitle(String s);
	String getTitle(){
		return title;
	}

}

//Write MyBook class here
class MyBook extends Book {
    void setTitle(String s) {
        this.title = s;
    }

}
```

47 [Java Interface](https://www.hackerrank.com/challenges/java-interface/problem)

- A java interface contains only method signatures and fields.
- It can be used for polymorphism. How?
- Classes can implement multiple interfaces, although they can only ever extend one class.

```
import java.util.*;
interface AdvancedArithmetic{
  int divisor_sum(int n);
}

//Write your code here
class MyCalculator implements AdvancedArithmetic{
    public int divisor_sum(int n) {
        int sum = 0;
        for(int i = 1; i <= n; ++i){
            if(n%i == 0) {
                sum += i;
            }
        }
        return sum;
    }
}
```

48 [Java Method Overiding](https://www.hackerrank.com/challenges/java-method-overriding/problem)

- Method overiding is done using the @override annnotation: more on that [here](https://www.baeldung.com/java-custom-annotation) and [here](https://www.baeldung.com/java-default-annotations)

```
import java.util.*;
class Sports{

    String getName(){
        return "Generic Sports";
    }

    void getNumberOfTeamMembers(){
        System.out.println( "Each team has n players in " + getName() );
    }
}

class Soccer extends Sports{
    @Override
    String getName(){
        return "Soccer Class";
    }

    // Write your overridden getNumberOfTeamMembers method here
    @Override
    void getNumberOfTeamMembers() {
        System.out.println("Each team has 11 players in " + getName());
    }

}
...
```

49 [Java Method Overriding, Super Keyword](https://www.hackerrank.com/challenges/java-method-overriding-2-super-keyword/problem)

- Notice here that it is still possible to override a method without applying the @override annotation.
- Using the super keyword, as in super.func(), it is possible to access the function (method) in the super class. i.e the original implementation of the overriden method.

```
import java.util.*;
import java.io.*;


class BiCycle{
	String define_me(){
		return "a vehicle with pedals.";
	}
}

class MotorCycle extends BiCycle{
	String define_me(){
		return "a cycle with an engine.";
	}

	MotorCycle(){
		System.out.println("Hello I am a motorcycle, I am "+ define_me());

		String temp=super.define_me(); //Fix this line

		System.out.println("My ancestor is a cycle who is "+ temp );
	}

}
class Solution{
	public static void main(String []args){
		MotorCycle M=new MotorCycle();
	}
}

```

50 [Java instanceof](https://www.hackerrank.com/challenges/java-instanceof-keyword/problem)

- the Java instaceof is an operator, such that a instanceof b;
- it returns true is a is an instance of the type b. For conditions of when this is the case see [here](https://www.baeldung.com/java-instanceof).

```
class Student{}
class Rockstar{   }
class Hacker{}


public class InstanceOFTutorial{

   static String count(ArrayList mylist){
      int a = 0,b = 0,c = 0;
      for(int i = 0; i < mylist.size(); i++){
         Object element=mylist.get(i);
         if(element instanceof Student)
            a++;
         if(element instanceof Rockstar)
            b++;
         if(element instanceof Hacker)
            c++;
      }
      String ret = Integer.toString(a)+" "+ Integer.toString(b)+" "+ Integer.toString(c);
      return ret;
   }

   public static void main(String []args){
      ArrayList mylist = new ArrayList();
      Scanner sc = new Scanner(System.in);
      int t = sc.nextInt();
      for(int i=0; i<t; i++){
         String s=sc.next();
         if(s.equals("Student"))mylist.add(new Student());
         if(s.equals("Rockstar"))mylist.add(new Rockstar());
         if(s.equals("Hacker"))mylist.add(new Hacker());
      }
      System.out.println(count(mylist));
   }
}
```

51 [Java Iterator]()

- The hint here was very useful. Do rememeber.
- Also not how Object is used for elements of unknown types.

```
mport java.util.*;
public class Main{

   static Iterator func(ArrayList mylist){
      Iterator it=mylist.iterator();
      while(it.hasNext()){
         Object element = it.next();
         if(element instanceof String) //Hints: use instanceof operator

			break;
		}
      return it;

   }
...
```

52 [Java Exception Handling (try-catch)](https://www.hackerrank.com/challenges/java-exception-handling-try-catch/problem)

- when using try catch remember that scoping applies. You cannot access variables declared inside the try block, outside the try catch block.
- also, note how in this solution you've hard coded "java.util.InputMismatchException." This is bad practise. Imagine if there were 1000 such places where you hard coded this and for some reason the exception message changes. You'd have to replace all those hard coded instances.
- use getClass(), e.g e.getClass().toString() returns "class <class type>" Yes you have to remove the "class " depending on what you need.

```
import java.io.*;
import java.util.*;

public class Solution {

    public static void main(String[] args) {
        /* Enter your code here. Read input from STDIN. Print output to STDOUT. Your class should be named Solution. */
        Scanner sc = new Scanner(System.in);

        try{
            int x = sc.nextInt();
            int y = sc.nextInt();
            int ans = x/y;
            System.out.println(ans);
        }catch(InputMismatchException e) {
            System.out.println("java.util.InputMismatchException");
        } catch(ArithmeticException e) {
            System.out.println(e);
        }

        sc.close();

    }
}

```

- it also seems to be the case that resources such as a scanner should be closed in a finally block. As in

```
import java.io.File;
import java.io.FileReader;
import java.io.IOException;

public class ReadData_Demo {

   public static void main(String args[]) {
      FileReader fr = null;
      try {
         File file = new File("file.txt");
         fr = new FileReader(file); char [] a = new char[50];
         fr.read(a);   // reads the content to the array
         for(char c : a)
         System.out.print(c);   // prints the characters one by one
      } catch (IOException e) {
         e.printStackTrace();
      }finally {
         try {
            fr.close();
         } catch (IOException ex) {
            ex.printStackTrace();
         }
      }
   }
}
```

- or even better, use a try-with-resources block

```
try(FileReader fr = new FileReader("file path")) {
   // use the resource
   } catch () {
      // body of catch
   }
}
```

source: https://www.tutorialspoint.com/java/java_exceptions.htm

53 [Java Exception Handling](https://www.hackerrank.com/challenges/java-exception-handling/problem)

- reference this for user-defined exceptions ( https://www.tutorialspoint.com/java/java_exceptions.htm)

```
class MyCalculator {
    /*
    * Create the method long power(int, int) here.
    */
    long power(int n, int p) throws Exception {
        if(n < 0 || p < 0) {
            throw new Exception("n or p should not be negative.");
        }
        if(n == 0 && p == 0) {
            throw new Exception("n and p should not be zero.");
        }
        return (long)Math.pow(n, p);
    }

}
```

52 [Java varargs](https://www.hackerrank.com/challenges/simple-addition-varargs/problem)

```
class Add {
    int add(int... nums) {
        int sum = 0;
        StringBuilder s = new StringBuilder();
        s.append(""+ nums[0]);
        sum = nums[0];
        for(int i = 1; i < nums.length; ++i) {
            s.append("+"+nums[i]);
            sum += nums[i];
        }
        System.out.println(s.append("="+sum));
        return sum;
    }
}
```

53 [Java Reflection](https://www.hackerrank.com/challenges/java-reflection-attributes/problem)

- the important thing to understand about reflection is when to use it. See here for guidance: https://www.baeldung.com/java-reflection

```
public class Solution {

        public static void main(String[] args){
            Class student = new Student().getClass();
            Method[] methods = student.getDeclaredMethods();

            ArrayList<String> methodList = new ArrayList<>();
            for(Method m : methods){
                methodList.add(m.getName());
            }
            Collections.sort(methodList);
            for(String name: methodList){
                System.out.println(name);
            }
        }

    }
```

54 [Java Factory](https://www.hackerrank.com/challenges/java-factory/problem)

- for reference see: https://www.javatpoint.com/factory-method-design-pattern

```
import java.util.*;
import java.security.*;
interface Food {
	 public String getType();
	}
	class Pizza implements Food {
	 public String getType() {
	 return "Someone ordered a Fast Food!";
	 }
	}

	class Cake implements Food {

	 public String getType() {
	 return "Someone ordered a Dessert!";
	 }
	}
	class FoodFactory {
		public Food getFood(String order) {

        if(order.equalsIgnoreCase("cake")){
            return new Cake();
        }
        if(order.equalsIgnoreCase("pizza")){
            return new Pizza();
        }

        return null;
}//End of getFood method

	}//End of factory class
```

55 [Java Singleton](https://www.hackerrank.com/challenges/java-singleton/problem)

- this video is quite good reference(https://www.youtube.com/watch?v=NZaXM67fxbs)

- The first naive solution which didn't bother about threading issues was accepted, however look at the discussions for a better implementation of the singleton pattern.

```
class Singleton{

    private Singleton() {}
    private static Singleton onlyInstance = null;
    public String str = null;

    static Singleton getSingleInstance() {
        if(onlyInstance == null) {
            onlyInstance = new Singleton();
            return onlyInstance;
        }else {
            return onlyInstance;
        }

    }

}
```

56 [Covariant return types](https://www.hackerrank.com/challenges/java-covariance/forum)

```
/Complete the classes below
class Flower {
    String whatsYourName() {
        return "I have many names and types.";
    }
}

class Jasmine extends Flower {
    @Override
    String whatsYourName() {
        return "Jasmine";
    }
}

class Lily extends Flower {
    @Override
    String whatsYourName() {
        return "Lily";
    }
}

class Region {
    Flower yourNationalFlower() {
        return new Flower();
    }
}

class WestBengal extends Region {
    @Override
    Jasmine yourNationalFlower() {
        return new Jasmine();
    }
}

class AndhraPradesh extends Region {
    @Override
    Lily yourNationalFlower() {
        return new Lily();
    }
}
```

57 [can you access](https://www.hackerrank.com/challenges/can-you-access/problem)

```
import java.io.*;
import java.lang.reflect.*;
import java.util.*;
import java.util.regex.*;
import java.security.*;


public class Solution {

	public static void main(String[] args) throws Exception {
		DoNotTerminate.forbidExit();

		try{
			BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
			int num = Integer.parseInt(br.readLine().trim());
			Object o;// Must be used to hold the reference of the instance of the class Solution.Inner.Private
            // Solution.Inner in = new Solution.Inner();
            // Solution.Inner.Private p = in.new Private();
            // o = p;
            // System.out.printf("%d is %s\n", num, p.powerof2(num));
            //can't go straight to a private nested class. first create  an instance of the most public parent class, then use that to create a new instance of the private nested class.

            // Solution.Inner in = new Solution.Inner();
            // o = in.new Private();
            // //o is a superclass of Solution.Inner.Private, it does not contain the powerof2 method, and so will require casting.
            // Solution.Inner.Private p = (Solution.Inner.Private) o;
            // System.out.printf("%d is %s\n", num, p.powerof2(num));

            // Solution.Inner in = new Solution.Inner();
            // o = in.new Private();
            // System.out.printf("%d is %s\n", num, ((Solution.Inner.Private) o).powerof2(num));

            // Solution.Inner in = new Solution.Inner();
            // System.out.printf("%d is %s\n", num, ((Solution.Inner.Private) (o = in.new Private())).powerof2(num));

            System.out.printf("%d is %s\n", num, ((Solution.Inner.Private) (o = new Solution.Inner().new Private())).powerof2(num));

//https://stackoverflow.com/questions/5306835/casting-objects-in-java
		System.out.println("An instance of class: " + o.getClass().getCanonicalName() + " has been created");

		}//end of try

		catch (DoNotTerminate.ExitTrappedException e) {
			System.out.println("Unsuccessful Termination!!");
		}
	}//end of main
	static class Inner{
		private class Private{
			private String powerof2(int num){
				return ((num&num-1)==0)?"power of 2":"not a power of 2";
			}
		}
	}//end of Inner

}//end of Solution
...
```

58 [Java MD5](https://www.hackerrank.com/challenges/java-md5/forum)

- various things to unpack. DatatypeConverter is deprecated since java9 (see here: https://stackoverflow.com/questions/38563609/datatypeconverter-vs-base64). You need to understand the encoding of bytes in Java and how to decode them.
- don't use md5 to hash passwords, its unsafe. Instead use sha for that. However md5 is still useful for implementing file checksums.

```
import java.io.*;
import java.util.*;
import java.text.*;
import java.math.*;
import java.util.regex.*;
import java.security.*;
import javax.xml.bind.DatatypeConverter;

public class Solution {

    static void encrypt(String s) throws NoSuchAlgorithmException {
        MessageDigest md = MessageDigest.getInstance("MD5");
        //md.update(s.getBytes());
        byte[] digest = md.digest(s.getBytes());
        System.out.println(DatatypeConverter
      .printHexBinary(digest).toLowerCase());

    }

    public static void main(String[] args) {
        /* Enter your code here. Read input from STDIN. Print output to STDOUT. Your class should be named Solution. */
        Scanner sc = new Scanner(System.in);

        String message = sc.nextLine();
        try {
            encrypt(message);
        } catch (Exception e) {

        }
        sc.close();
    }
}
```

59 [Java Annotations](https://www.hackerrank.com/challenges/java-annotations/problem)

- not quite sure what to make of annotations. I can see they're useful for documentation and defining nuanced types. But how the leap from what I see to what the Spring framework is using them for occured is not clear to me.

Then there's the use case provided where the annotation is (as is defined) used to define metadata about the code. The logic of the code doesn't change, but if the metadata changes the output of the code does change.

```
import java.lang.annotation.*;
import java.lang.reflect.*;
import java.util.*;

@Target(ElementType.METHOD)
@Retention(RetentionPolicy.RUNTIME)
@interface FamilyBudget {
	String userRole() default "GUEST";
	int budgetLimit() default 100;
}

class FamilyMember {
	@FamilyBudget(userRole = "SENIOR")
	public void seniorMember(int budget, int moneySpend) {
		System.out.println("Senior Member");
		System.out.println("Spend: " + moneySpend);
		System.out.println("Budget Left: " + (budget - moneySpend));
	}

    @FamilyBudget(userRole = "JUNIOR", budgetLimit = 50)
	public void juniorUser(int budget, int moneySpend) {
		System.out.println("Junior Member");
		System.out.println("Spend: " + moneySpend);
		System.out.println("Budget Left: " + (budget - moneySpend));
	}
}

public class Solution {
	public static void main(String[] args) {
		Scanner in = new Scanner(System.in);
		int testCases = Integer.parseInt(in.nextLine());
		while (testCases > 0) {
			String role = in.next();
			int spend = in.nextInt();
			try {
				Class annotatedClass = FamilyMember.class;
				Method[] methods = annotatedClass.getMethods();
				for (Method method : methods) {
					if (method.isAnnotationPresent(FamilyBudget.class)) {
						FamilyBudget family = method
								.getAnnotation(FamilyBudget.class);
						String userRole = family.userRole();
						int budgetLimit = family.budgetLimit();
						if (userRole.equals(role)) {
							if(spend <= budgetLimit){
								method.invoke(FamilyMember.class.newInstance(),
										budgetLimit, spend);
							}else{
								System.out.println("Budget Limit Over");
							}
						}
					}
				}
			} catch (Exception e) {
				e.printStackTrace();
			}
			testCases--;
		}
	}
}

```

60 [Java SHA-256](https://www.hackerrank.com/challenges/sha-256/problem)

- see [here](https://docs.oracle.com/javase/7/docs/api/java/util/Formatter.html#syntax) for the format string reference. "%02x" is a format string that specifies 0 padding, width of 2, and small xters conversion x.

```
import java.io.*;
import java.util.*;
import java.security.*;

public class Solution {

    public static void main(String[] args) {
        /* Enter your code here. Read input from STDIN. Print output to STDOUT. Your class should be named Solution. */
        Scanner sc = new Scanner(System.in);
        String s = sc.nextLine();
        sc.close();

        try{
            MessageDigest md = MessageDigest.getInstance("SHA-256");
            byte[] hash = md.digest(s.getBytes());
            for(byte b : hash) {
                System.out.print(String.format("%02x", b));
            }

        } catch (NoSuchAlgorithmException e) {
            System.out.println(e);
        }
    }
}
```

61 []()

- this resource, though tedious to go through was very good: https://docs.oracle.com/javase/tutorial/java/javaOO/lambdaexpressions.html#approach3
- note the usefulness of lambda expressions: "you're usually trying to pass functionality as an argument to another method, such as what action should be taken when someone clicks a button. Lambda expressions enable you to do this, to treat functionality as method argument, or code as data."
- that said I started off with a named local class Lambda that implemented PerformOperation. This would have required a distinct class for each method.

```
    class Lambda implements PerformOperation {
        public boolean check(int num) {
            return (num%2 == 0) ? false : true;
        }
    }

    PerformOperation isOdd() {
        return new Lambda();
    }

    PerformOperation isPrime() {
        return new Lambda();
    }

    PerformOperation isPalindrome() {
        return new Lambda();
    }
```

- then I moved on to anonymous classes, as in:
- I think this is better because the implementation I specifiy is right there in the method scope.
- now all that was left was implementing the correct logic

```
    PerformOperation isOdd() {
        return new PerformOperation() {
            public boolean check(int num) {
                return (num%2 == 0) ? false : true;
            }
        };
    }

    PerformOperation isPrime() {
        return new PerformOperation() {
            public boolean check(int num) {
                return (num%2 == 0) ? false : true;
            }
        };
    }

    PerformOperation isPalindrome() {
        return new PerformOperation() {
            public boolean check(int num) {
                return (num%2 == 0) ? false : true;
            }
        };
    }
```

- the passing solution. Not necessarily the most efficient solution. A challenge: work out the running times for each method:

```
    PerformOperation isOdd() {
        return new PerformOperation() {
            public boolean check(int num) {
                return (num%2 == 0) ? false : true;
            }
        };
    }

    PerformOperation isPrime() {
        return new PerformOperation() {
            public boolean check(int num) {
                if(num < 2) {
                    return false;
                }
                int i = 3;
                while(i*i < num){
                    if(num%i == 0) return false;
                    ++i;
                }
                return true;
            }
        };
    }

    PerformOperation isPalindrome() {
        return new PerformOperation() {
            public boolean check(int num) {
                StringBuilder nums = new StringBuilder(String.valueOf(num));
                if(nums.toString().equals(nums.reverse().toString())) {
                    return true;
                }

                return false;
            }
        };
    }

}
```

62 [Java Visitor Pattern](https://www.hackerrank.com/challenges/java-vistor-pattern/problem)

- this was one **\* \*** of a question. Rolls eyes
- where I got to without help: passes the only test case, fails all submission casses

```
import java.util.ArrayList;
import java.io.*;
import java.util.*;
import java.text.*;
import java.math.*;
import java.util.regex.*;

import java.util.ArrayList;
import java.util.Scanner;

enum Color {
    RED, GREEN
}

abstract class Tree {

    private int value;
    private Color color;
    private int depth;

    public Tree(int value, Color color, int depth) {
        this.value = value;
        this.color = color;
        this.depth = depth;
    }

    public int getValue() {
        return value;
    }

    public Color getColor() {
        return color;
    }

    public int getDepth() {
        return depth;
    }

    public abstract void accept(TreeVis visitor);
}

class TreeNode extends Tree {

    private ArrayList<Tree> children = new ArrayList<>();

    public TreeNode(int value, Color color, int depth) {
        super(value, color, depth);
    }

    public void accept(TreeVis visitor) {
        visitor.visitNode(this);

        for (Tree child : children) {
            child.accept(visitor);
        }
    }

    public void addChild(Tree child) {
        children.add(child);
    }
}

class TreeLeaf extends Tree {

    public TreeLeaf(int value, Color color, int depth) {
        super(value, color, depth);
    }

    public void accept(TreeVis visitor) {
        visitor.visitLeaf(this);
    }
}

abstract class TreeVis
{
    public abstract int getResult();
    public abstract void visitNode(TreeNode node);
    public abstract void visitLeaf(TreeLeaf leaf);

}

//TreeLeaf visitLeaf is only called when it's a leaf.
//TreeNode visitNode is only called when it's a node.
class SumInLeavesVisitor extends TreeVis {
    private int sumOfLeaves = 0;

    public int getResult() {
      	//implement this
        return sumOfLeaves;
    }

    public void visitNode(TreeNode node) {
      	//implement this
    }

    public void visitLeaf(TreeLeaf leaf) {
      	sumOfLeaves += leaf.getValue();
    }
}

class ProductOfRedNodesVisitor extends TreeVis {
    private int productOfNodes = 1;

    public int getResult() {
      	//implement this
        return productOfNodes % (int)(Math.pow(10,9) + 7);
    }

    public void visitNode(TreeNode node) {
      	//implement this
        if(node.getColor() == Color.RED) {
            if(node.getValue() == 0 && productOfNodes == 0) {
                productOfNodes = 1;
            }else{
                productOfNodes *= node.getValue();
            }
        }
    }

    public void visitLeaf(TreeLeaf leaf) {
      	//implement this
        if(leaf.getColor() == Color.RED) {
            if(leaf.getValue() == 0 && productOfNodes == 0) {
                productOfNodes = 1;
            }else{
                productOfNodes *= leaf.getValue();
            }
        }
    }
}

class FancyVisitor extends TreeVis {
    private int sumOfEvenDepthNodes = 0;
    private int sumOfGreenLeaves = 0;

    public int getResult() {
      	//implement this
        return Math.abs(sumOfEvenDepthNodes - sumOfGreenLeaves);
    }

    public void visitNode(TreeNode node) {
    	//implement this
        if(node.getDepth()%2 == 0) {
            sumOfEvenDepthNodes += node.getValue();
        }
    }

    public void visitLeaf(TreeLeaf leaf) {
    	//implement this
        if(leaf.getColor() == Color.GREEN) {
            sumOfGreenLeaves += leaf.getValue();
        }
    }
}

public class Solution {

    public void buildTree(Tree root) {

    }

    public static Tree solve() {
        //read the tree from STDIN and return its root as a return value of this function
        Scanner sc = new Scanner(System.in);

        int n = sc.nextInt();
        sc.nextLine();
        String[] values = sc.nextLine().split(" ");
        // for(String s : values) {
        //     System.out.println(s);
        // }
        String[] colors = sc.nextLine().split(" ");
        // for(String s : colors) {
        //     System.out.println(s);
        // }


        int[][] mappings = new int[n-1][2];
        HashSet<Integer> nodes = new HashSet<Integer>();
        HashSet<Integer> leaves = new HashSet<Integer>();

        for(int i = 0; i < n-1; ++i ) {
            int pa = sc.nextInt();
            int child = sc.nextInt();
            sc.nextLine();
            mappings[i][0] = pa;
            nodes.add(pa);
            mappings[i][1] = child;

        }

        for(int i = 0; i < n-1; ++i ) {
            if(!nodes.contains(mappings[i][1])){
                leaves.add(mappings[i][1]);
            }

        }

        //System.out.println(nodes.toString());
        //System.out.println(leaves.toString());

        int[] graph = new int[n];
        Arrays.fill(graph, -1);
        LinkedList<Integer> queue = new LinkedList<Integer>();
        int w = 1;
        graph[w-1] = 0;
        queue.add(w);
        while(queue.size() !=0) {
            int currNode = queue.remove();
            //System.out.printf("current node %d", currNode);
            for( int[] edge : mappings) {
                if(edge[0] == currNode) {
                    w = edge[1];
                    if(graph[w - 1] == -1) {
                        graph[w -1] = graph[edge[0] -1]+1;
                        queue.add(w);
                    }
                }
            }
        }

        Tree[] allNodes = new Tree[n];

        for(int i =0; i < n; ++i) {
            if(nodes.contains(i+1)){
                allNodes[i] = new TreeNode(Integer.parseInt(values[i]), Color.values()[Integer.parseInt(colors[i])], graph[i]);
            }
            if(leaves.contains(i+1)){
                allNodes[i] = new TreeLeaf(Integer.parseInt(values[i]), Color.values()[Integer.parseInt(colors[i])], graph[i]);
            }

        }

        for(int[] edge : mappings) {
            ((TreeNode)allNodes[edge[0]-1]).addChild(allNodes[edge[1]-1]);
        }


        return allNodes[0];
    }


    public static void main(String[] args) {
      	Tree root = solve();
		SumInLeavesVisitor vis1 = new SumInLeavesVisitor();
      	ProductOfRedNodesVisitor vis2 = new ProductOfRedNodesVisitor();
      	FancyVisitor vis3 = new FancyVisitor();

      	root.accept(vis1);
      	root.accept(vis2);
      	root.accept(vis3);

      	int res1 = vis1.getResult();
      	int res2 = vis2.getResult();
      	int res3 = vis3.getResult();

      	System.out.println(res1);
     	System.out.println(res2);
    	System.out.println(res3);
	}
}
```

- Solves only one test case
- times out
- assumes that edges are given as parent -> child relationships
- second attempt below

```
//TreeLeaf visitLeaf is only called when it's a leaf.
//TreeNode visitNode is only called when it's a node.
class SumInLeavesVisitor extends TreeVis {
    private int sumOfLeaves = 0;

    public int getResult() {
          //implement this
        return sumOfLeaves;
    }

    public void visitNode(TreeNode node) {
          //implement this
    }

    public void visitLeaf(TreeLeaf leaf) {
          sumOfLeaves += leaf.getValue();
    }
}

class ProductOfRedNodesVisitor extends TreeVis {
    private long productOfNodes = 1;
    private final int mod = (int)(Math.pow(10,9) + 7);

    public int getResult() {
          //implement this
        return (int)productOfNodes;
    }

    public void visitNode(TreeNode node) {
          //implement this
        if(node.getColor() == Color.RED) {
            if(node.getValue() == 0 && productOfNodes == 0) {
                productOfNodes = 1;
            }else{
                productOfNodes = (productOfNodes * node.getValue()) % mod;
            }
        }
    }

    public void visitLeaf(TreeLeaf leaf) {
          //implement this
        if(leaf.getColor() == Color.RED) {
            if(leaf.getValue() == 0 && productOfNodes == 0) {
                productOfNodes = 1;
            }else{
                productOfNodes = (productOfNodes * leaf.getValue()) % mod;
            }
        }
    }
}

class FancyVisitor extends TreeVis {
    private int sumOfEvenDepthNodes = 0;
    private int sumOfGreenLeaves = 0;

    public int getResult() {
          //implement this
        return Math.abs(sumOfEvenDepthNodes - sumOfGreenLeaves);
    }

    public void visitNode(TreeNode node) {
        //implement this
        if(node.getDepth()%2 == 0) {
            sumOfEvenDepthNodes += node.getValue();
        }
    }

    public void visitLeaf(TreeLeaf leaf) {
        //implement this
        if(leaf.getColor() == Color.GREEN) {
            sumOfGreenLeaves += leaf.getValue();
        }
    }
}

public class Solution {

    public static Tree solve() {
        //read the tree from STDIN and return its root as a return value of this function
        Scanner sc = new Scanner(System.in);

        int n = sc.nextInt();
        sc.nextLine();
        String[] values = sc.nextLine().split(" ");
        // for(String s : values) {
        //     System.out.println(s);
        // }
        String[] colors = sc.nextLine().split(" ");
        // for(String s : colors) {
        //     System.out.println(s);
        // }


        int[][] mappings = new int[n-1][2];
        List<Integer> u = new ArrayList<Integer>();
        List<Integer> v = new ArrayList<Integer>();


        for(int i = 0; i < n-1; ++i ) {
            int pa = sc.nextInt();
            int child = sc.nextInt();
            //System.out.printf("%d %d\n", pa, child);
            mappings[i][0] = pa;
            u.add(pa);
            //nodes.add(pa);
            mappings[i][1] = child;
            v.add(child);
            if(sc.hasNextLine()) sc.nextLine();

        }





        int[] depth = new int[n];
        Arrays.fill(depth, -1);
        LinkedList<Integer> queue = new LinkedList<Integer>();
        int w = 1;
        depth[w-1] = 0;
        queue.add(w);

        Tree[] allNodes = new Tree[n];

        while(queue.size() !=0) {
            int currNode = queue.remove();
            int occurrences = Collections.frequency(u, currNode) + Collections.frequency(v,currNode);
            if(occurrences == 1) {
                Tree[currNode-1] = new TreeLeaf(Integer.parseInt(values[currNode-1]), Color.values()[Integer.parseInt(colors[currNode-1])], depth[currNode-1]);
            }else{
                Tree[currNode-1] = new TreeNode(Integer.parseInt(values[i]), Color.values()[Integer.parseInt(colors[i])], depth[i]);
            }
            //System.out.printf("current node %d", currNode);
            for( int[] edge : mappings) {
                if(edge[0] == currNode) {
                    w = edge[1];
                    if(depth[w - 1] == -1) {
                        depth[w -1] = depth[edge[0] -1]+1;
                        queue.add(w);
                    }

                }
                if(edge[1] == currNode) {
                    w = edge[0];
                    if(depth[w - 1] == -1) {
                        depth[w -1] = depth[edge[1] -1]+1;
                        queue.add(w);
                    }
                }
            }
        }

        // HashSet<Integer> nodes = new HashSet<Integer>();
        // HashSet<Integer> leaves = new HashSet<Integer>();

        // for(int i = 0; i < n-1; ++i ) {
        //     if(!nodes.contains(mappings[i][1])){
        //         leaves.add(mappings[i][1]);
        //     }

        // }

        //System.out.println(nodes.toString());
        //System.out.println(leaves.toString());

        // Tree[] allNodes = new Tree[n];

        // for(int i =0; i < n; ++i) {
        //     if(nodes.contains(i+1)){
        //         allNodes[i] = new Tree(Integer.parseInt(values[i]), Color.values()[Integer.parseInt(colors[i])], depth[i]);
        //     }
        //     if(leaves.contains(i+1)){
        //         allNodes[i] = new Tree(Integer.parseInt(values[i]), Color.values()[Integer.parseInt(colors[i])], depth[i]);
        //     }

        // }

        // for(int[] edge : mappings) {
        //     if(depth[edge[0]-1] < depth[edge[1]-1]){
        //         ((TreeNode)allNodes[edge[0]-1]).addChild(allNodes[edge[1]-1]);}
        //     else{
        //         ((TreeNode)allNodes[edge[1]-1]).addChild(allNodes[edge[0]-1]);

        //     }
        // }


        return new TreeNode(Integer.parseInt(values[0]), Color.values()[Integer.parseInt(colors[0])], depth[0]);
    }

```

- third attempt below:
- same issue, doesn't solve for unspecified parent child relationships
- attempt to solve for this simply creates children in the opposite direction and causes a stackoverlow
- also, it times out

```
 public static Tree solve() {
        //read the tree from STDIN and return its root as a return value of this function
        Scanner sc = new Scanner(System.in);

        int n = sc.nextInt();
        sc.nextLine();
        String[] values = sc.nextLine().split(" ");
        // for(String s : values) {
        //     System.out.println(s);
        // }
        String[] colors = sc.nextLine().split(" ");
        // for(String s : colors) {
        //     System.out.println(s);
        // }


        int[][] mappings = new int[n-1][2];
        List<Integer> u = new ArrayList<Integer>();
        List<Integer> v = new ArrayList<Integer>();


        for(int i = 0; i < n-1; ++i ) {
            int pa = sc.nextInt();
            int child = sc.nextInt();
            //System.out.printf("%d %d\n", pa, child);
            mappings[i][0] = pa;
            u.add(pa);
            //nodes.add(pa);
            mappings[i][1] = child;
            v.add(child);
            if(sc.hasNextLine()) sc.nextLine();

        }


        int[] depth = new int[n];
        Arrays.fill(depth, -1);
        LinkedList<Integer> queue = new LinkedList<Integer>();
        int w = 1;
        depth[w-1] = 0;
        queue.add(w);

        Tree[] allNodes = new Tree[n];

        while(queue.size() !=0) {
            int currNode = queue.remove();
            int occurrences = -1;
            occurrences = Collections.frequency(u, currNode) + Collections.frequency(v,currNode);
            if(allNodes[currNode-1]== null) {
                occurrences = Collections.frequency(u, currNode) + Collections.frequency(v,currNode);
                if(occurrences == 1) {
                    allNodes[currNode-1] = new TreeLeaf(Integer.parseInt(values[currNode-1]), Color.values()[Integer.parseInt(colors[currNode-1])], depth[currNode-1]);
                }else if(occurrences > 1) {
                    allNodes[currNode-1] = new TreeNode(Integer.parseInt(values[currNode-1]), Color.values()[Integer.parseInt(colors[currNode-1])], depth[currNode-1]);
                }
            }
            for( int[] edge : mappings) {
                if(edge[0] == currNode) {
                    w = edge[1];
                    if(depth[w - 1] == -1) {
                        depth[w -1] = depth[edge[0] -1]+1;
                        queue.add(w);
                    }
                    int occur = -1;
                    if(allNodes[w-1]== null) {
                         occur = Collections.frequency(u, w) + Collections.frequency(v,w);
                                            if(occur == 1) {
                                                allNodes[w-1] = new TreeLeaf(Integer.parseInt(values[w-1]), Color.values()[Integer.parseInt(colors[w-1])], depth[w-1]);
                                            }else if(occur > 1 ) {
                                                allNodes[w-1] = new TreeNode(Integer.parseInt(values[w-1]), Color.values()[Integer.parseInt(colors[w-1])], depth[w-1]);
                                            }
                    }
                    if(occurrences > 1)((TreeNode)allNodes[currNode-1]).addChild(allNodes[w-1]);
                    // System.out.print(occurrences + " ");
                    // System.out.print(allNodes[currNode-1].getValue() + " ");
                    // System.out.println(allNodes[w-1].getValue());
                }
                if(edge[1] == currNode) {
                    w = edge[0];
                    if(depth[w - 1] == -1) {
                        depth[w -1] = depth[edge[1] -1]+1;
                        queue.add(w);
                    }
                    int occurs = -1;
                    if(allNodes[w-1]== null) {
                         occurs = Collections.frequency(u, w) + Collections.frequency(v,w);
                                            if(occurs == 1) {
                                                allNodes[w-1] = new TreeLeaf(Integer.parseInt(values[w-1]), Color.values()[Integer.parseInt(colors[w-1])], depth[w-1]);
                                            }else if(occurs > 1 ) {
                                                allNodes[w-1] = new TreeNode(Integer.parseInt(values[w-1]), Color.values()[Integer.parseInt(colors[w-1])], depth[w-1]);
                                            }
                    }
                    //if(occurrences > 1)((TreeNode)allNodes[currNode-1]).addChild(allNodes[w-1]);

                }
            }
        }

        // for(Tree node : allNodes) {
        //     System.out.printf("%d %s %d %s,", node.getValue(), node.getColor(), node.getDepth(), node.getClass());
        // }
        // System.out.println("");

        return allNodes[0];
    }


```

- attempt one million and we have a brute force solution!
- the missing key was deleting edges that have been used as you run BFS
- the problem is that it runs in about O(n^2) time roughly, and times out for many test cases
- I want to try cutting this down using an adjacency list with bfs

```
public class Solution {

    public static Tree solve() {
        //read the tree from STDIN and return its root as a return value of this function
        Scanner sc = new Scanner(System.in);

        int n = sc.nextInt();
        sc.nextLine();
        String[] values = sc.nextLine().split(" ");
        // for(String s : values) {
        //     System.out.println(s);
        // }
        String[] colors = sc.nextLine().split(" ");
        // for(String s : colors) {
        //     System.out.println(s);
        // }


        //int[][] mappings = new int[n-1][2];
        HashMap<Integer, int[]>mappings = new HashMap<Integer, int[]>();
        List<Integer> u = new ArrayList<Integer>();
        List<Integer> v = new ArrayList<Integer>();


        for(int i = 0; i < n-1; ++i ) {
            int pa = sc.nextInt();
            int child = sc.nextInt();
            //System.out.printf("%d %d\n", pa, child);
            //mappings.get(i)[0] = pa;
            u.add(pa);
            //nodes.add(pa);
            //mappings.get(i)[1] = child;
            v.add(child);
            mappings.put(i, new int[]{pa, child});
            if(sc.hasNextLine()) sc.nextLine();

        }


        int[] depth = new int[n];
        Arrays.fill(depth, -1);
        LinkedList<Integer> queue = new LinkedList<Integer>();
        int w = 1;
        depth[w-1] = 0;
        queue.add(w);

        Tree[] allNodes = new Tree[n];

        while(queue.size() !=0) {
            int currNode = queue.remove();
            int occurrences = -1;
            occurrences = Collections.frequency(u, currNode) + Collections.frequency(v,currNode);
            if(allNodes[currNode-1]== null) {
                occurrences = Collections.frequency(u, currNode) + Collections.frequency(v,currNode);
                if(occurrences == 1) {
                    allNodes[currNode-1] = new TreeLeaf(Integer.parseInt(values[currNode-1]), Color.values()[Integer.parseInt(colors[currNode-1])], depth[currNode-1]);
                }else if(occurrences > 1) {
                    allNodes[currNode-1] = new TreeNode(Integer.parseInt(values[currNode-1]), Color.values()[Integer.parseInt(colors[currNode-1])], depth[currNode-1]);
                }
            }

            Iterator<Integer> itr = mappings.keySet().iterator();
            while (itr.hasNext()) {
            //for( ) {
                int key = itr.next();
                int[] edge = mappings.get(key);
                if(edge[0] == currNode) {
                    w = edge[1];
                    if(depth[w - 1] == -1) {
                        depth[w -1] = depth[edge[0] -1]+1;
                        queue.add(w);
                    }
                    int occur = -1;
                    if(allNodes[w-1]== null) {
                         occur = Collections.frequency(u, w) + Collections.frequency(v,w);
                                            if(occur == 1) {
                                                allNodes[w-1] = new TreeLeaf(Integer.parseInt(values[w-1]), Color.values()[Integer.parseInt(colors[w-1])], depth[w-1]);
                                            }else if(occur > 1 ) {
                                                allNodes[w-1] = new TreeNode(Integer.parseInt(values[w-1]), Color.values()[Integer.parseInt(colors[w-1])], depth[w-1]);
                                            }
                    }
                    if(occurrences > 1)((TreeNode)allNodes[currNode-1]).addChild(allNodes[w-1]);
                    itr.remove();
                    //System.out.print(mappings.size()+ " ");
                    // System.out.print(occurrences + " ");
                    // System.out.print(allNodes[currNode-1].getValue() + " ");
                    // System.out.println(allNodes[w-1].getValue());
                }
                else if(edge[1] == currNode) {
                    w = edge[0];
                    if(depth[w - 1] == -1) {
                        depth[w -1] = depth[edge[1] -1]+1;
                        queue.add(w);
                    }
                    int occurs = -1;
                    if(allNodes[w-1]== null) {
                         occurs = Collections.frequency(u, w) + Collections.frequency(v,w);
                                            if(occurs == 1) {
                                                allNodes[w-1] = new TreeLeaf(Integer.parseInt(values[w-1]), Color.values()[Integer.parseInt(colors[w-1])], depth[w-1]);
                                            }else if(occurs > 1 ) {
                                                allNodes[w-1] = new TreeNode(Integer.parseInt(values[w-1]), Color.values()[Integer.parseInt(colors[w-1])], depth[w-1]);
                                            }
                    }

                    if(occurrences > 1)((TreeNode)allNodes[currNode-1]).addChild(allNodes[w-1]);
                itr.remove();
                }
            }
        }

        // for(Tree node : allNodes) {
        //     System.out.printf("%d %s %d %s,", node.getValue(), node.getColor(), node.getDepth(), node.getClass());
        // }
        // System.out.println("");

        return allNodes[0];
    }

```

```
import java.util.ArrayList;
import java.io.*;
import java.util.*;
import java.text.*;
import java.math.*;
import java.util.regex.*;

import java.util.ArrayList;
import java.util.Scanner;

enum Color {
    RED, GREEN
}

abstract class Tree {

    private int value;
    private Color color;
    private int depth;

    public Tree(int value, Color color, int depth) {
        this.value = value;
        this.color = color;
        this.depth = depth;
    }

    public int getValue() {
        return value;
    }

    public Color getColor() {
        return color;
    }

    public int getDepth() {
        return depth;
    }

    public abstract void accept(TreeVis visitor);
}

class TreeNode extends Tree {

    private ArrayList<Tree> children = new ArrayList<>();

    public TreeNode(int value, Color color, int depth) {
        super(value, color, depth);
    }

    public void accept(TreeVis visitor) {
        visitor.visitNode(this);

        for (Tree child : children) {
            child.accept(visitor);
        }
    }

    public void addChild(Tree child) {
        children.add(child);
    }
}

class TreeLeaf extends Tree {

    public TreeLeaf(int value, Color color, int depth) {
        super(value, color, depth);
    }

    public void accept(TreeVis visitor) {
        visitor.visitLeaf(this);
    }
}

abstract class TreeVis
{
    public abstract int getResult();
    public abstract void visitNode(TreeNode node);
    public abstract void visitLeaf(TreeLeaf leaf);

}
//TreeLeaf visitLeaf is only called when it's a leaf.
//TreeNode visitNode is only called when it's a node.
class SumInLeavesVisitor extends TreeVis {
    private int sumOfLeaves = 0;

    public int getResult() {
          //implement this
        return sumOfLeaves;
    }

    public void visitNode(TreeNode node) {
          //implement this
    }

    public void visitLeaf(TreeLeaf leaf) {
          sumOfLeaves += leaf.getValue();
    }
}

class ProductOfRedNodesVisitor extends TreeVis {
    private long productOfNodes = 1;
    private final int mod = (int)(Math.pow(10,9) + 7);

    public int getResult() {
          //implement this
        return (int)productOfNodes;
    }

    public void visitNode(TreeNode node) {
          //implement this
        if(node.getColor() == Color.RED) {
            if(node.getValue() == 0 && productOfNodes == 0) {
                productOfNodes = 1;
            }else{
                productOfNodes = (productOfNodes * node.getValue()) % mod;
            }
        }
    }

    public void visitLeaf(TreeLeaf leaf) {
          //implement this
        if(leaf.getColor() == Color.RED) {
            if(leaf.getValue() == 0 && productOfNodes == 0) {
                productOfNodes = 1;
            }else{
                productOfNodes = (productOfNodes * leaf.getValue()) % mod;
            }
        }
    }
}

class FancyVisitor extends TreeVis {
    private int sumOfEvenDepthNodes = 0;
    private int sumOfGreenLeaves = 0;

    public int getResult() {
          //implement this
        return Math.abs(sumOfEvenDepthNodes - sumOfGreenLeaves);
    }

    public void visitNode(TreeNode node) {
        //implement this
        if(node.getDepth()%2 == 0) {
            sumOfEvenDepthNodes += node.getValue();
        }
    }

    public void visitLeaf(TreeLeaf leaf) {
        //implement this
        if(leaf.getColor() == Color.GREEN) {
            sumOfGreenLeaves += leaf.getValue();
        }
    }
}

public class Solution {

    public static Tree solve() {
        //read the tree from STDIN, construct the tree and return its root as a return value of this function
        Scanner sc = new Scanner(System.in);

        int n = sc.nextInt();
        sc.nextLine();
        String[] values = sc.nextLine().split(" ");

        String[] colors = sc.nextLine().split(" ");



        HashMap<Integer, int[]>mappings = new HashMap<Integer, int[]>();
        List<Integer> u = new ArrayList<Integer>();
        List<Integer> v = new ArrayList<Integer>();


        for(int i = 0; i < n-1; ++i ) {
            int pa = sc.nextInt();
            int child = sc.nextInt();

            u.add(pa);
            v.add(child);
            mappings.put(i, new int[]{pa, child});
            if(sc.hasNextLine()) sc.nextLine();

        }


        int[] depth = new int[n];
        Arrays.fill(depth, -1);
        LinkedList<Integer> queue = new LinkedList<Integer>();
        int w = 1;
        depth[w-1] = 0;
        queue.add(w);

        Tree[] allNodes = new Tree[n];

        while(queue.size() !=0) {
            int currNode = queue.remove();
            int occurrences = -1;
            occurrences = Collections.frequency(u, currNode) + Collections.frequency(v,currNode);
            if(allNodes[currNode-1]== null) {
                occurrences = Collections.frequency(u, currNode) + Collections.frequency(v,currNode);
                if(occurrences == 1) {
                    allNodes[currNode-1] = new TreeLeaf(Integer.parseInt(values[currNode-1]), Color.values()[Integer.parseInt(colors[currNode-1])], depth[currNode-1]);
                }else if(occurrences > 1) {
                    allNodes[currNode-1] = new TreeNode(Integer.parseInt(values[currNode-1]), Color.values()[Integer.parseInt(colors[currNode-1])], depth[currNode-1]);
                }
            }

            Iterator<Integer> itr = mappings.keySet().iterator();
            while (itr.hasNext()) {
            //for( ) {
                int key = itr.next();
                int[] edge = mappings.get(key);
                if(edge[0] == currNode) {
                    w = edge[1];
                    if(depth[w - 1] == -1) {
                        depth[w -1] = depth[edge[0] -1]+1;
                        queue.add(w);
                    }
                    int occur = -1;
                    if(allNodes[w-1]== null) {
                         occur = Collections.frequency(u, w) + Collections.frequency(v,w);
                                            if(occur == 1) {
                                                allNodes[w-1] = new TreeLeaf(Integer.parseInt(values[w-1]), Color.values()[Integer.parseInt(colors[w-1])], depth[w-1]);
                                            }else if(occur > 1 ) {
                                                allNodes[w-1] = new TreeNode(Integer.parseInt(values[w-1]), Color.values()[Integer.parseInt(colors[w-1])], depth[w-1]);
                                            }
                    }
                    if(occurrences > 1)((TreeNode)allNodes[currNode-1]).addChild(allNodes[w-1]);
                    itr.remove();
                }
                else if(edge[1] == currNode) {
                    w = edge[0];
                    if(depth[w - 1] == -1) {
                        depth[w -1] = depth[edge[1] -1]+1;
                        queue.add(w);
                    }
                    int occurs = -1;
                    if(allNodes[w-1]== null) {
                         occurs = Collections.frequency(u, w) + Collections.frequency(v,w);
                                            if(occurs == 1) {
                                                allNodes[w-1] = new TreeLeaf(Integer.parseInt(values[w-1]), Color.values()[Integer.parseInt(colors[w-1])], depth[w-1]);
                                            }else if(occurs > 1 ) {
                                                allNodes[w-1] = new TreeNode(Integer.parseInt(values[w-1]), Color.values()[Integer.parseInt(colors[w-1])], depth[w-1]);
                                            }
                    }

                    if(occurrences > 1)((TreeNode)allNodes[currNode-1]).addChild(allNodes[w-1]);
                itr.remove();
                }
            }
        }

        return allNodes[0];
    }


```

Seems like your time out is caused by the complicated way in which you're reading the input

```
public class Solution {

    public static Tree solve() {
        //read the tree from STDIN, construct the tree and return its root as a return value of this function
        Scanner sc = new Scanner(System.in);

        int n = sc.nextInt();
        sc.nextLine();
        String[] values = sc.nextLine().split(" ");

        String[] colors = sc.nextLine().split(" ");



        HashMap<Integer, ArrayList<Integer>>mappings = new HashMap<Integer, ArrayList<Integer>>();
        List<Integer> u = new ArrayList<Integer>();
        List<Integer> v = new ArrayList<Integer>();


        for(int i = 0; i < n-1; ++i ) {
            int pa = sc.nextInt();
            int child = sc.nextInt();

            u.add(pa);
            v.add(child);
            if(mappings.containsKey(pa)){
                mappings.get(pa).add(child);
            }else{
                mappings.put(pa, new ArrayList<Integer>());
                mappings.get(pa).add(child);
            }

            if(mappings.containsKey(child)){
                mappings.get(child).add(pa);
            }else{
                mappings.put(child, new ArrayList<Integer>());
                mappings.get(child).add(pa);
            }
            if(sc.hasNextLine()) sc.nextLine();

        }


        int[] depth = new int[n];
        Arrays.fill(depth, -1);
        LinkedList<Integer> queue = new LinkedList<Integer>();
        int r = 1;
        depth[r-1] = 0;
        queue.add(r);

        Tree[] allNodes = new Tree[n];

        while(queue.size() !=0) {
            int currNode = queue.remove();
            int occurrences = -1;
            occurrences = Collections.frequency(u, currNode) + Collections.frequency(v,currNode);
            if(allNodes[currNode-1]== null) {
                occurrences = Collections.frequency(u, currNode) + Collections.frequency(v,currNode);
                if(occurrences == 1) {
                    allNodes[currNode-1] = new TreeLeaf(Integer.parseInt(values[currNode-1]), Color.values()[Integer.parseInt(colors[currNode-1])], depth[currNode-1]);
                }else if(occurrences > 1) {
                    allNodes[currNode-1] = new TreeNode(Integer.parseInt(values[currNode-1]), Color.values()[Integer.parseInt(colors[currNode-1])], depth[currNode-1]);
                }
            }

            for(int w : mappings.get(currNode)) {
                    if(depth[w - 1] == -1) {
                        depth[w -1] = depth[currNode -1]+1;
                        queue.add(w);
                    }
                    int occur = -1;
                    if(allNodes[w-1]== null) {
                         occur = Collections.frequency(u, w) + Collections.frequency(v,w);
                                            if(occur == 1) {
                                                allNodes[w-1] = new TreeLeaf(Integer.parseInt(values[w-1]), Color.values()[Integer.parseInt(colors[w-1])], depth[w-1]);
                                            }else if(occur > 1 ) {
                                                allNodes[w-1] = new TreeNode(Integer.parseInt(values[w-1]), Color.values()[Integer.parseInt(colors[w-1])], depth[w-1]);
                                            }
                    }
                    if(occurrences > 1)((TreeNode)allNodes[currNode-1]).addChild(allNodes[w-1]);
                    mappings.get(w).remove(Integer.valueOf(currNode));
            }
        }

        return allNodes[0];
    }
```

- this implementation didn't timeout when I removed the O(n) Collections.frequency approach
- But now I need a new way to determine which is a node and which is a leaf. Ideally, an O(1) way

```
public class Solution {

    public static Tree solve() {
        //read the tree from STDIN, construct the tree and return its root as a return value of this function
        Scanner sc = new Scanner(System.in);

        int n = sc.nextInt();
        sc.nextLine();
        int[] values = new int[n];

        Color[] colors = new Color[n];

        for (int i = 0; i < n; ++i) {
            values[i] = sc.nextInt();
        }
        for (int i = 0; i < n; ++i) {
            colors[i] = sc.nextInt() == 0 ? Color.RED : Color.GREEN;
        }



        HashMap<Integer, HashSet<Integer>>mappings = new HashMap<Integer, HashSet<Integer>>();
        // List<Integer> u = new ArrayList<Integer>();
        // List<Integer> v = new ArrayList<Integer>();


        for(int i = 0; i < n-1; ++i ) {
            int pa = sc.nextInt();
            int child = sc.nextInt();

            //u.add(pa);
            //v.add(child);
            if(mappings.containsKey(pa)){
                mappings.get(pa).add(child);
            }else{
                mappings.put(pa, new HashSet<Integer>());
                mappings.get(pa).add(child);
            }

            if(mappings.containsKey(child)){
                mappings.get(child).add(pa);
            }else{
                mappings.put(child, new HashSet<Integer>());
                mappings.get(child).add(pa);
            }
            if(sc.hasNextLine()) sc.nextLine();

        }


        int[] depth = new int[n];
        Arrays.fill(depth, -1);
        LinkedList<Integer> queue = new LinkedList<Integer>();
        int r = 1;
        depth[r-1] = 0;
        queue.add(r);

        Tree[] allNodes = new Tree[n];

        while(queue.size() !=0) {
            int currNode = queue.remove();
            int occurrences = -1;
            //occurrences = Collections.frequency(u, currNode) + Collections.frequency(v,currNode);
            if(allNodes[currNode-1]== null) {
                //occurrences = Collections.frequency(u, currNode) + Collections.frequency(v,currNode);
                if(occurrences == 1) {
                    allNodes[currNode-1] = new TreeLeaf(values[currNode-1], colors[currNode-1], depth[currNode-1]);
                }else if(occurrences > 1) {
                    allNodes[currNode-1] = new TreeNode(values[currNode-1], colors[currNode-1], depth[currNode-1]);
                }
            }

            for(int w : mappings.get(currNode)) {
                    if(depth[w - 1] == -1) {
                        depth[w -1] = depth[currNode -1]+1;
                        queue.add(w);
                    }
                    int occur = -1;
                    if(allNodes[w-1]== null) {
                         //occur = Collections.frequency(u, w) + Collections.frequency(v,w);
                                            if(occur == 1) {
                                                allNodes[w-1] = new TreeLeaf(values[w-1],colors[w-1], depth[w-1]);
                                            }else if(occur > 1 ) {
                                                allNodes[w-1] = new TreeNode(values[w-1],colors[w-1], depth[w-1]);
                                            }
                    }
                    if(occurrences > 1)((TreeNode)allNodes[currNode-1]).addChild(allNodes[w-1]);
                    mappings.get(w).remove(Integer.valueOf(currNode));
            }
        }

        return allNodes[0];
    }

```

- Feels like I'm almost there, but there's something wrong with my TreeLeaf or TreeNode conditional

```
import java.util.ArrayList;
import java.io.*;
import java.util.*;
import java.text.*;
import java.math.*;
import java.util.regex.*;

import java.util.ArrayList;
import java.util.Scanner;

enum Color {
    RED, GREEN
}

abstract class Tree {

    private int value;
    private Color color;
    private int depth;

    public Tree(int value, Color color, int depth) {
        this.value = value;
        this.color = color;
        this.depth = depth;
    }

    public int getValue() {
        return value;
    }

    public Color getColor() {
        return color;
    }

    public int getDepth() {
        return depth;
    }

    public abstract void accept(TreeVis visitor);
}

class TreeNode extends Tree {

    private ArrayList<Tree> children = new ArrayList<>();

    public TreeNode(int value, Color color, int depth) {
        super(value, color, depth);
    }

    public void accept(TreeVis visitor) {
        visitor.visitNode(this);

        for (Tree child : children) {
            child.accept(visitor);
        }
    }

    public void addChild(Tree child) {
        children.add(child);
    }
}

class TreeLeaf extends Tree {

    public TreeLeaf(int value, Color color, int depth) {
        super(value, color, depth);
    }

    public void accept(TreeVis visitor) {
        visitor.visitLeaf(this);
    }
}

abstract class TreeVis
{
    public abstract int getResult();
    public abstract void visitNode(TreeNode node);
    public abstract void visitLeaf(TreeLeaf leaf);

}
//TreeLeaf visitLeaf is only called when it's a leaf.
//TreeNode visitNode is only called when it's a node.
class SumInLeavesVisitor extends TreeVis {
    private int sumOfLeaves = 0;

    public int getResult() {
          //implement this
        return sumOfLeaves;
    }

    public void visitNode(TreeNode node) {
          //implement this
    }

    public void visitLeaf(TreeLeaf leaf) {
          sumOfLeaves += leaf.getValue();
    }
}

class ProductOfRedNodesVisitor extends TreeVis {
    private long productOfNodes = 1;
    private final int mod = (int)(Math.pow(10,9) + 7);

    public int getResult() {
          //implement this
        return (int)productOfNodes;
    }

    public void visitNode(TreeNode node) {
          //implement this
        if(node.getColor() == Color.RED) {
            if(node.getValue() == 0 && productOfNodes == 0) {
                productOfNodes = 1;
            }else{
                productOfNodes = (productOfNodes * node.getValue()) % mod;
            }
        }
    }

    public void visitLeaf(TreeLeaf leaf) {
          //implement this
        if(leaf.getColor() == Color.RED) {
            if(leaf.getValue() == 0 && productOfNodes == 0) {
                productOfNodes = 1;
            }else{
                productOfNodes = (productOfNodes * leaf.getValue()) % mod;
            }
        }
    }
}

class FancyVisitor extends TreeVis {
    private int sumOfEvenDepthNodes = 0;
    private int sumOfGreenLeaves = 0;

    public int getResult() {
          //implement this
        return Math.abs(sumOfEvenDepthNodes - sumOfGreenLeaves);
    }

    public void visitNode(TreeNode node) {
        //implement this
        if(node.getDepth()%2 == 0) {
            sumOfEvenDepthNodes += node.getValue();
        }
    }

    public void visitLeaf(TreeLeaf leaf) {
        //implement this
        if(leaf.getColor() == Color.GREEN) {
            sumOfGreenLeaves += leaf.getValue();
        }
    }
}

public class Solution {

    public static Tree solve() {
        //read the tree from STDIN, construct the tree and return its root as a return value of this function
        Scanner sc = new Scanner(System.in);

        int n = sc.nextInt();
        sc.nextLine();
        int[] values = new int[n];

        Color[] colors = new Color[n];

        for (int i = 0; i < n; ++i) {
            values[i] = sc.nextInt();
        }
        for (int i = 0; i < n; ++i) {
            colors[i] = sc.nextInt() == 0 ? Color.RED : Color.GREEN;
        }



        HashMap<Integer, HashSet<Integer>>mappings = new HashMap<Integer, HashSet<Integer>>();
        // List<Integer> u = new ArrayList<Integer>();
        // List<Integer> v = new ArrayList<Integer>();


        for(int i = 0; i < n-1; ++i ) {
            int pa = sc.nextInt();
            int child = sc.nextInt();

            //u.add(pa);
            //v.add(child);
            if(mappings.containsKey(pa)){
                mappings.get(pa).add(child);
            }else{
                mappings.put(pa, new HashSet<Integer>());
                mappings.get(pa).add(child);
            }

            if(mappings.containsKey(child)){
                mappings.get(child).add(pa);
            }else{
                mappings.put(child, new HashSet<Integer>());
                mappings.get(child).add(pa);
            }
            if(sc.hasNextLine()) sc.nextLine();

        }

        for(int k : mappings.keySet()) {
            System.out.print(k + ": ");
            System.out.println(mappings.get(k).toString());
        }


        int[] depth = new int[n];
        Arrays.fill(depth, -1);
        LinkedList<Integer> queue = new LinkedList<Integer>();
        int r = 1;
        depth[r-1] = 0;
        queue.add(r);

        Tree[] allNodes = new Tree[n];

        while(queue.size() !=0) {
            int currNode = queue.remove();

            if(allNodes[currNode-1]== null) {

                if(mappings.get(currNode).size() <= 1) {
                    allNodes[currNode-1] = new TreeLeaf(values[currNode-1], colors[currNode-1], depth[currNode-1]);
                }else {
                    allNodes[currNode-1] = new TreeNode(values[currNode-1], colors[currNode-1], depth[currNode-1]);
                }
            }

            for(int w : mappings.get(currNode)) {
                    if(depth[w - 1] == -1) {
                        depth[w -1] = depth[currNode -1]+1;
                        queue.add(w);
                    }
                    if(allNodes[w-1]== null) {

                                            if(mappings.get(w-1).size() <= 1 ) {
                                                allNodes[w-1] = new TreeLeaf(values[w-1],colors[w-1], depth[w-1]);
                                            }else {
                                                allNodes[w-1] = new TreeNode(values[w-1],colors[w-1], depth[w-1]);
                                            }
                    }
                    if(allNodes[currNode-1] instanceof TreeNode) ((TreeNode)allNodes[currNode-1]).addChild(allNodes[w-1]);
                    mappings.get(w).remove(Integer.valueOf(currNode));
            }
        }



        // for(Tree t : allNodes) {
        //     System.out.printf("%d %s %d, ", t.getValue(), t.getColor(), t.getDepth());
        // }
        // System.out.println("");

        return allNodes[0];
    }



```

- You were right! Just a small error with get(w-1).size() instead of get(w).size()
- The key insights of this: when given an undirected graph with edges not necessarily given in parent to child relationships, remember to delete edges once you've used them, and there're two ways to distinguish a leaf from a node:
- 1, count the number of instances. A leaf occurs exactly once.
- 2, Put your data into an adjacency list. A leaf node key will have a list of edges of maximum length 1, and can reduce to 0 if the edge is read off from another list and therefore deleted from the leaf's list.
- Other insights: BFS and DFS are the same runtime but can vary in practice depending on the nature of the data. I.e whether you're looking for something near the root (bfs better) or towards the leafs (dfs better).
- BFS is optimal with an adjacency list.
- Be careful to watch out for int overflows when doing big number multiplications. A long or BigInt will be better in these instances
- Be careful when using primitives like Collections.frequency, and scanner.nextline().split(), that run in O(n) time. They seem free, but are linear time in the number of the input. In this case, eliminating these were the key to solving it within the time constraints.

```
public class Solution {

    public static Tree solve() {
        //read the tree from STDIN, construct the tree and return its root as a return value of this function
        Scanner sc = new Scanner(System.in);

        int n = sc.nextInt();
        sc.nextLine();
        int[] values = new int[n];

        Color[] colors = new Color[n];

        for (int i = 0; i < n; ++i) {
            values[i] = sc.nextInt();
        }
        for (int i = 0; i < n; ++i) {
            colors[i] = sc.nextInt() == 0 ? Color.RED : Color.GREEN;
        }



        HashMap<Integer, HashSet<Integer>>mappings = new HashMap<Integer, HashSet<Integer>>();

        for(int i = 0; i < n-1; ++i ) {
            int pa = sc.nextInt();
            int child = sc.nextInt();


            if(mappings.containsKey(pa)){
                mappings.get(pa).add(child);
            }else{
                mappings.put(pa, new HashSet<Integer>());
                mappings.get(pa).add(child);
            }

            if(mappings.containsKey(child)){
                mappings.get(child).add(pa);
            }else{
                mappings.put(child, new HashSet<Integer>());
                mappings.get(child).add(pa);
            }
            if(sc.hasNextLine()) sc.nextLine();

        }


        int[] depth = new int[n];
        Arrays.fill(depth, -1);
        LinkedList<Integer> queue = new LinkedList<Integer>();
        int r = 1;
        depth[r-1] = 0;
        queue.add(r);

        Tree[] allNodes = new Tree[n];

        while(queue.size() !=0) {
            int currNode = queue.remove();

            if(allNodes[currNode-1]== null) {

                if(mappings.get(currNode).size() <= 1) {
                    allNodes[currNode-1] = new TreeLeaf(values[currNode-1], colors[currNode-1], depth[currNode-1]);
                }else {
                    allNodes[currNode-1] = new TreeNode(values[currNode-1], colors[currNode-1], depth[currNode-1]);
                }
            }

            for(int w : mappings.get(currNode)) {
                    if(depth[w - 1] == -1) {
                        depth[w -1] = depth[currNode -1]+1;
                        queue.add(w);
                    }
                    if(allNodes[w-1]== null) {

                                            if(mappings.get(w).size() <= 1 ) {
                                                allNodes[w-1] = new TreeLeaf(values[w-1],colors[w-1], depth[w-1]);
                                            }else {
                                                allNodes[w-1] = new TreeNode(values[w-1],colors[w-1], depth[w-1]);
                                            }
                    }
                    if(allNodes[currNode-1] instanceof TreeNode) ((TreeNode)allNodes[currNode-1]).addChild(allNodes[w-1]);
                    mappings.get(w).remove(Integer.valueOf(currNode));
            }
        }


        return allNodes[0];
    }

```

[Validade Binary Search Tree](https://leetcode.com/explore/interview/card/microsoft/31/trees-and-graphs/152/)

```
/**
 * Definition for a binary tree node.
 * public class TreeNode {
 *     int val;
 *     TreeNode left;
 *     TreeNode right;
 *     TreeNode() {}
 *     TreeNode(int val) { this.val = val; }
 *     TreeNode(int val, TreeNode left, TreeNode right) {
 *         this.val = val;
 *         this.left = left;
 *         this.right = right;
 *     }
 * }
 */
class Solution {
    public boolean isValidBST(TreeNode root) {
        //problem: check if bst maintains the invariant, left node smaller, right node bigger, than parent node.
        //sub problem: how to access left and right sub-nodes? provided in the class
        //approach: from root, recurse on left and right sub-nodes, checking invariant. Terminate on invariant violation.
        //sub problem: how to check all nodes in tree on right and left hand side against the root node.
        //approach: go from leafs upwards, cascading up and making sure every relationship maintains the invariant

        if(root.left == null && root.right == null) return true;
        if(root.left == null && root.right != null && root.right.val > root.val) return true;
        if(root.right == null && root.left != null && root.left.val < root.val) return true;




        return (true && isValidBST(root.left) && isValidBST(root.right));

    }
}

```

The fails to check the invariant: all nodes on right greater than root, all nodes on left less than root.

[Letter Combinations of a phone number](https://leetcode.com/explore/interview/card/microsoft/46/backtracking/165/)

This was a tough one, and I'm not sure I can correctly analyse the run or space time usage

but I think it's better than O(n^2) in the size of the letters that make up the digits

as for space, because it makes 2 recursive calls for every node, maybe log... I can't say.

```
class Solution {
    public List<String> letterCombinations(String digits) {
        //given a length of numbers 2-9 inclusive, return all possible 'words' the numbers could represent
        //initially I saw this as a combination problem, e.g, if 29, abcdef combination 2. (well, that's correct no?)
        //how many ways can you combine the letters represented by the numbers 2...<9>, to give a numbers.length word
        //okay, this looks like a brute force approach should be obvious
        //example, given 23 : abc def
        //_ _
        //for each in a, combine with each in b --> 9 total
        //example, given 234 abc def ghi
        //for each of 23 combine with each of 4 --> 27 total
        //use a recurrence: the letter combination of string digits is the letter combination of
        //the digits minus the last, each combined with the digits of the last
        //you'll need to store this somehow

        //approach: create hashap of digits and combinations
        //when it already exists, do the combination, else, generate it and store to hashmap

        HashMap<String, List<String>> combos = new HashMap<String, List<String>>();
        combos.put("2", Arrays.asList("a","b","c"));
        combos.put("3", Arrays.asList("d","e","f"));
        combos.put("4", Arrays.asList("g","h","i"));
        combos.put("5", Arrays.asList("j","k","l"));
        combos.put("6", Arrays.asList("m","n","o"));
        combos.put("7", Arrays.asList("p","q","r", "s"));
        combos.put("8", Arrays.asList("t","u","v"));
        combos.put("9", Arrays.asList("w","x","y","z"));
        return letterCombinations(digits, combos);
    }

    public List<String> letterCombinations(String digits, HashMap combos) {
        if(digits.equals("")) return new ArrayList<String>();
        if(combos.containsKey(digits)) return (List<String>) combos.get(digits); //System.out.println(combos.get(digits).getClass());

        List<String> prefixes = letterCombinations(digits.substring(0, digits.length()-1), combos);
        List<String> postfixes = letterCombinations(digits.substring(digits.length()-1), combos);
        List<String> builder = new ArrayList<String>();

        for(String prefix: prefixes) {
            for(String postfix: postfixes) {
                builder.add(prefix+postfix);
            }
        }

        combos.put(digits, builder);

        return (List<String>) combos.get(digits);
    }
}
```

[Two Sum](https://leetcode.com/explore/interview/card/microsoft/30/array-and-strings/173/)

As stated in the solution I believe this is O(n) time and, O(n) space

```
class Solution {
    public int[] twoSum(int[] nums, int target) {
        //brute force would be O(n^2)
        //use a hashtable to make it O(n)
        //for every num, store integer - num in hastable with index found at
        //for every following num, if in hashtable, stop, return that index and val of num in hashtable

        HashMap<Integer, Integer> toFind = new HashMap<Integer, Integer>();

        for(int i = 0; i < nums.length; ++i) {
            Integer val = Integer.valueOf(nums[i]);
            Integer index = Integer.valueOf(i);

            if(toFind.containsKey(val)){
                return new int[]{toFind.get(val).intValue(), i};
            }
            toFind.put(Integer.valueOf(target - nums[i]), index);
        }

        return new int[2];
    }
}
```

[Reverse linked list](https://leetcode.com/explore/interview/card/microsoft/32/linked-list/169/)

This should be O(n) as well. And it was done in place, so constant space.

```
/**
 * Definition for singly-linked list.
 * public class ListNode {
 *     int val;
 *     ListNode next;
 *     ListNode() {}
 *     ListNode(int val) { this.val = val; }
 *     ListNode(int val, ListNode next) { this.val = val; this.next = next; }
 * }
 */
class Solution {
    public ListNode reverseList(ListNode head) {

        //objects are pass by reference. When reversing a linkedlist keep this in mind.
        //while curr is not null, curr should point to the prev, when there is no prev, it should point to null
        //to point to prev:
        //store the next
        //point to prev
        //update curr to next

        ListNode next = null;
        ListNode prev = null;

        while(head != null) {
            next = head.next;
            head.next = prev;


            prev = head;
            head = next;
        }

        return prev;

    }
}
```

[Validate Binary Search Tree](https://leetcode.com/explore/interview/card/microsoft/31/trees-and-graphs/152/)

This was basically me implementing ctci's O(n) approach to this problem.

```
import java.util.*;
/**
 * Definition for a binary tree node.
 * public class TreeNode {
 *     int val;
 *     TreeNode left;
 *     TreeNode right;
 *     TreeNode() {}
 *     TreeNode(int val) { this.val = val; }
 *     TreeNode(int val, TreeNode left, TreeNode right) {
 *         this.val = val;
 *         this.left = left;
 *         this.right = right;
 *     }
 * }
 */
class Solution {

    public boolean isValidBST(TreeNode root) {

        //this problem shows up in cracking the coding interview, and
        //of the two ways to solve it, I choose the O(N) approach,
        //that progressively checks each subtree to see that all the nodes there fall within a range

        return isValidBST(root, null, null);

    }

    public boolean isValidBST(TreeNode root, Integer min, Integer max) {

        //this problem shows up in cracking the coding interview, and
        //of the two ways to solve it, I choose the O(N) approach,
        //that progressively checks each subtree to see that all the nodes there fall within a range

        //null is a subtree of a bst
        if(root == null) return true;

        //check for exceeds boundary
        if((min != null && root.val <= min.intValue()) || (max != null && root.val >= max.intValue())) return false;

        if(!isValidBST(root.left, min, Integer.valueOf(root.val)) || !isValidBST(root.right, Integer.valueOf(root.val), max)) return false;

        return true;
    }
}
```

[Sort Colors](https://leetcode.com/explore/interview/card/microsoft/47/sorting-and-searching/193/)

So uhmn, the library sort does this.

they wanted in place and O(1) space so quicksort implemtation was needed for this.

I already know the quicksort pseudo code, so a quick look for a reference impl was all I needed.

```
class Solution {
    public void sortColors(int[] nums) {
        //at first glance this looks like a standard sorting problem with duplicates
        //the in place constraint means quicksort over merge sort.
        //Arrays.sort(nums);

        //Without the library's sort function, I need to implement quick sort.

        quickSort(nums, 0, nums.length-1);

    }

    public void quickSort(int arr[], int begin, int end) {
    if (begin < end) {
        int partitionIndex = partition(arr, begin, end);

        quickSort(arr, begin, partitionIndex-1);
        quickSort(arr, partitionIndex+1, end);
    }
    }

    private int partition(int arr[], int begin, int end) {
    int pivot = arr[end];
    int i = (begin-1);

    for (int j = begin; j < end; j++) {
        if (arr[j] <= pivot) {
            i++;

            int swapTemp = arr[i];
            arr[i] = arr[j];
            arr[j] = swapTemp;
        }
    }

    int swapTemp = arr[i+1];
    arr[i+1] = arr[end];
    arr[end] = swapTemp;

    return i+1;
}
}
```

[Implement Trie Node](https://leetcode.com/explore/interview/card/microsoft/51/design/892/)

```
class TrieNode {
    private HashMap<Character, TrieNode> children;
    private String content;
    private boolean isWord;

   // ...
    public TrieNode() {
        children = new HashMap<Character, TrieNode>();
        content = "";
        isWord = false;

    }

    public HashMap getChildren() {
        return this.children;
    }

    public void setContent(String val) {
        this.content = val;
    }

    public String getContent() {
        return this.content;
    }

    public void setIsWord(boolean val) {
        this.isWord = val;
    }

    public boolean getIsWord() {
        return this.isWord;
    }
}

class Trie {

    private TrieNode root;

    /** Initialize your data structure here. */
    public Trie() {
        this.root = new TrieNode();
    }

    /** Inserts a word into the trie. */
    public void insert(String word) {
        TrieNode curr = root;
        for(char l : word.toCharArray()) {
            if(curr.getChildren().containsKey(l)) {
                curr = (TrieNode) curr.getChildren().get(l);
            }else{
                TrieNode child = new TrieNode();
                child.setContent(Character.toString(l));
                curr.getChildren().put(l, child);
                curr = (TrieNode) curr.getChildren().get(l);
            }
        }

        curr.setIsWord(true);

    }

    /** Returns if the word is in the trie. */
    public boolean search(String word) {
        TrieNode curr = root;
        for(char l: word.toCharArray()) {
            curr = (TrieNode) curr.getChildren().get(l);
            if(curr == null) return false;
        }

        if(curr.getIsWord() == false) return false;
        return true;
    }

    /** Returns if there is any word in the trie that starts with the given prefix. */
    public boolean startsWith(String prefix) {
        TrieNode curr = root;
        for(char l: prefix.toCharArray()) {
            curr = (TrieNode) curr.getChildren().get(l);
            if(curr == null) return false;
        }

        return true;
    }
}

/**
 * Your Trie object will be instantiated and called as such:
 * Trie obj = new Trie();
 * obj.insert(word);
 * boolean param_2 = obj.search(word);
 * boolean param_3 = obj.startsWith(prefix);
 */
```

[String to integer atoi](https://leetcode.com/explore/interview/card/microsoft/30/array-and-strings/171/)

This is the most hacky solution ever, highlighting a severe need for regex proficiency

```
import java.util.regex.*;


class Solution {
    public int myAtoi(String s) {
        //use regex to find the sequence of integers
        //attempt a conversion to int using standard libraries

        //regex takes too much time to figure out. Implement it imperatively.
        //convert string to char
        //scan for first non space char
        //check it's +- or a sequence of integers
        //use string builer, pushing in chars as you go
        //stop at first non int char

        int start = Integer.MAX_VALUE;

        StringBuilder b = new StringBuilder();
        char sign = ' ';

        for(int i = 0; i < s.length(); ++i) {
            char t = s.charAt(i);
            if(t != '-' && t != '+' && t != ' ' && t < '0' || t > '9' ) return 0;
            else if (t >= '0' && t <= '9' || t == '-' || t == '+') {
                start = i+1;
                b.append(t);
                if(t == '-' || t == '+') {
                    sign = t;
                }
                break;
            }
        }


        while(start < s.length()){
            char t = s.charAt(start);
            if(t >= '0' && t <= '9') {
                b.append(t);
            }else{ break;}
            start++;
        }


        try {
            if(b.toString().equals("-") || b.toString().equals("+") || b.toString().equals("")) return 0;
            return Integer.parseInt(b.toString());
        } catch(NumberFormatException e) {
            if(sign == '-') return Integer.MIN_VALUE;
            return Integer.MAX_VALUE;
        }

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
