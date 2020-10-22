# Cracking the coding interview solutions

1 [isUnique] Implement an algorithm to determine if a string has all unique characters. What if you cannot use additional data structures?

common errors:

- trying to run a non-static method from the main static context;
- using str.length instead of str.length(); former is JS, later is Java.
- not returning true after the for loop; i.e not thinking about the end case;
- not including a base case -- checking the length of the string.

```
O(n) time, O(n) space complexity

import java.util.HashMap;

...

public boolean isUnique(String str) {
    HashMap<Character, Boolean> charSet = new HashMap<Character, Boolean>();

    for(int i = 0; i < str.length(); i++) {
        char val = str.charAt(i);
        if(charSet.get(val) != null) {
            return false;
        }else{
            charSet.put(val, true);
        }
    }
    return true;
}
```

```
O(1) time and O(1) space. Also arguably O(n) time, or O(min(charset, input)) time.

charMax could be 128 (normal Ascii), 256 (ascii extended), ()

public boolean isUnique(String str) {
    if(str.length() > charMax) {
        return false;
    }

    boolean[] charSet = new boolean[charMax];

    for(int i = 0; i < str.length(); i++) {
        char val = str.charAt(i);
        if(charSet[val]){
            return false;
        }else{
            charSet[val] = true;
        }
    }

    return true;
}

```

O(1) time and O(1) space for unicode characters. Just increased the size of the array as she said in the book.

References:

- http://wiki.juneday.se/mediawiki/images/b/b4/Java_and_Unicode.pdf
- http://www.unicode.org/faq/utf_bom.html

```
import java.lang.Math;


public class HelloWorld{


    public boolean isUnique(String str) {

    int charMax = (int)Math.pow(2,21);

    if(str.length() > charMax) {
        return false;
    }

    boolean[] charSet = new boolean[charMax];

    for(int i = 0; i < str.length(); i++) {
        char val = str.charAt(i);
        if(charSet[val]){
            return false;
        }else{
            charSet[val] = true;
        }
    }

    return true;
    }

     public static void main(String []args){
        HelloWorld H = new HelloWorld();
        String bomb = new StringBuilder().appendCodePoint(0x10FFFF).toString();
        System.out.println(bomb);
        System.out.println(H.isUnique("helo" + bomb));
     }
}
```

Using int as an approximation of a bit vector.

Common error: checker & (1 << val) > 0 gives bad operand error;
wrap like so: (checker & (1 << val)) > 0

```
public class HelloWorld{


    public boolean isUnique(String str) {
        int checker = 0;
        if(str.length() > 26) {
            return false;
        };

        for(int i = 0; i < str.length(); i++) {
            int val = str.charAt(i) - 'a';
            if((checker & (1 << val)) > 0) {
                return false;
            }else{
                checker |= (1 << val);
            }
        }

        return true;

    }

     public static void main(String []args){
        HelloWorld H = new HelloWorld();
        System.out.println(H.isUnique("hello"));
     }
}
```

```
//StringBuilder. should have been StringBuilder()
//appendCodePointAt('10xffff') should have been codePointAt(10xFFFF)
//Math.pow(2,21) needed to be cast to an int as in (int)Math.pow(2,21)
//notice how helo?💣  doesnt  have  duplicate  characters because it's unicode. but this counts the high surrogate 0xD83D as a character then when it sees it again in the unicode character for bomb it thows a false. How can you handle this?

import java.lang.Math;
import java.util.BitSet;

public class HelloWorld{

    public boolean isUnique (String str) {
        int charMax = (int)Math.pow(2,21);

        if(str.length() > charMax){
            return false;
        }

        BitSet charSet = new BitSet(charMax);

        for(int i =0; i < str.length(); i++){
            //System.out.println(str.charAt(i));
            char val = str.charAt(i);

            if(charSet.get(val)) {
                return false;
            }else{
                charSet.set(val);
            }
        }

        return true;
    }

     public static void main(String []args){
        HelloWorld T = new HelloWorld();
        String end = new StringBuilder().appendCodePoint(0xD83D).toString();
        String bomb = new StringBuilder().appendCodePoint(0x1F4A3).toString();
        System.out.println("helo"+end+bomb);
        System.out.println(T.isUnique("helo"+end+bomb));
     }
}
```

2 [Check Permutation] Given two strings, write a method to decide if one is a permutation of the other.

O(1) space and O(n) or O(max(n1, n2)) , not sure
The idea is the same as that given in ctci, however, the implementation is different. Why?

```
isPermutation(String str1, String str2) {
    int[] char_set = new int[128];

    for(int i =0; i < str1.length; i++) {
        char val = str1.charAt(i);
        char_set[val] += 1;
    }

    for(int i = 0; i < str2.length(); i++) {
        char val = str2.charAt(i);
        if(char_set[val] == null) {
            return false;
        }
        char_set[val] -= 1;
        if(char_set[val] < 0) {
            return false;
        }
    }
    return true;
}
```

Mistakes:

- trying to access an array like a method. char_set() instead of char_set[]
- expecting a null initialization of an integer array. Int arrays are initialized to 0 in Java.
- forgetting a return statement.

running time: O(n) + O(n) = 2O(n) = O(n)
space: O(1), the int array

```
public class HelloWorld{

    public static boolean isPermutation(String str1, String str2) {
        int [] char_set = new int[128];

        for(int i = 0; i < str1.length(); i++){
            char_set[str1.charAt(i)]++;
        }

        for(int i = 0; i < str2.length(); i++) {
            char val = str2.charAt(i);
            // if(char_set[val] == null) {
            //     return false;
            // }
            char_set[val]--;
            if(char_set[val] < 0) {return false;}
        }

        return true;
    }

     public static void main(String []args){
        System.out.println("Hello World");
        System.out.println(isPermutation("dog", "god"));
     }
}
```

Mistakes:

- using reference equality check instead of logical equality check. i.e != instead of .equals() to compare strings
- not importing java.util.Arrays;
- expecting Arrays.sort not to run in a static method

Runtime: O(nlogn) (depending on how sort is implemented in Java), space O(n)

```
import java.util.Arrays;

public class HelloWorld{

    public static String sort(String str) {
        char[] chars = str.toCharArray();
        Arrays.sort(chars);
        return new String(chars);
    }

    public static boolean isPermutation(String str1, String str2) {
        str1 = sort(str1);
        str2 = sort(str2);
        System.out.println(str1);
        System.out.println(str2);

        //if(str1 != str2) {return false;}
        if(!str1.equals(str2)) {return false;}

        return true;
    }

     public static void main(String []args){
        System.out.println("Hello World");
        System.out.println(isPermutation("dog", "god"));
     }
}
```

3 [URLify] Write a method to replace all spaces in a string with '%20': You may assume that the string has sufficient space at the end to hold the additional characters, and that you are given the "true" length of the string. (Note: if implementing in Java, please use a character array so that you can perform this operation in place.)

This first solution aimed for O(logn) using binary search. Perfect if the string characters were sorted. However that's not specified, so the sorting will take O(nlogn), making it worse than O(n), the runtime of the solution she provided in the book. Pseudocode:

```
URLify(String str) {
    char[] chars = str.toCharArray();
    int index = binarySearch(" ");
    while(index != -1){ //-1 just to indicate not found
        chars[index] = '%20';
        index = binarySearch(" ");
    }
    return chars.toString();
}

binarySearch(char[] chars){
    ...
    return index || -1
}
```

Even assuming the array was sorted, this solution disappoints. It forgets that a char array index can hold only 1 char and attempts to insert 3 chars at once. Perhaps a plausible alternative:

```
String [] chars = str.split("");
...
return String.join(",", chars);
```

See [here](https://stackoverflow.com/questions/5283444/convert-array-of-strings-into-a-string-in-java)

That said, your alternative solution did not account for cases the book's solution did. Psuedocode:

```
for(int i = 0; i < str.length(); ++i){
    if(chars[i] == ' '){
        chars[i] = '%20';
    }
    return chars.toString();
}
```

It makes the same mistake as the false logn solution (assuming a sorted string array), among other failures, doing no justice to the problem.

But frankly what if we don't assume a sorted array and instead settle for O(n), finding spaces and replacing in one scan? Psuedocode:

```
String [] chars = str.split("");

for(int i = 0; i < str.length; ++i) {
    if(chars[i].equals(" ")){
        chars[i] = "%20";
    }
}

return String.join(",", chars);
```

A quick implementation shows that, excluding the trailing spaces, this should work in O(n) time

Mistake: not including return type

```
public class HelloWorld{

    static String urlify(String str) {
        String [] chars = str.split("");

        for(int i = 0; i < chars.length; ++i) {
            if(chars[i].equals(" ")){
                chars[i] = "%20";
            }
        }

        return String.join("", chars);
    }

     public static void main(String []args){
        System.out.println("Hello World");
        System.out.println(urlify("Mr John Smith      "));
     }
}
```

She does account for this: "If we used strings directly, the function would have to return a new copy of the string, but it would allow us to implement this in just one pass.
(Page 207). "

Final, as in the book. Assuming use of char array.

Mistakes:

- attemting chartype.equals(' ') instead of chartype == ' '. I got a cannot dereference error.
- forgetting return statement.

```
public class HelloWorld{

    static String urlify(char[] str, int tl) {
        int spaces = 0;
        for(int i = 0; i < tl; i++){
            if(str[i] == (' ')){
                spaces++;
            }
        }

        int index = tl + spaces * 2;

        for(int i = tl -1; i>=0; --i) {
            if(str[i] == (' ')){
                str[index-1] = '0';
                str[index-2] = '2';
                str[index-3] = '%';
                index -= 3;
            }else{
                str[index-1] = str[i];
                index--;
            }
        }

        return new String(str);
    }

     public static void main(String []args){
        System.out.println("Hello World");
        String test = "Mr John Smith          0";
        char [] ta = test.toCharArray();
        System.out.println(urlify(ta, 13));
     }
}
```

Perhaps the main thing to note is that the question implied a mutable string. In Java, there is no such thing, so she went for the next best, a char array. This allows the method to work on the char array replaing in place without needing to return anything. as such:

```
public class HelloWorld{

    static void urlify(char[] str, int tl) {
        int spaces = 0;
        for(int i = 0; i < tl; i++){
            if(str[i] == (' ')){
                spaces++;
            }
        }

        int index = tl + spaces * 2;

        for(int i = tl -1; i>=0; --i) {
            if(str[i] == (' ')){
                str[index-1] = '0';
                str[index-2] = '2';
                str[index-3] = '%';
                index -= 3;
            }else{
                str[index-1] = str[i];
                index--;
            }
        }

        //return new String(str);
    }

     public static void main(String []args){
        System.out.println("Hello World");
        String test = "Mr John Smith          0";
        char [] ta = test.toCharArray();
        for(char o : ta) {
            System.out.print(o);
        }
        //=> Mr John Smith          0
        urlify(ta, 13);
        for(char o : ta) {
            System.out.print(o);
        }
        //=>Mr%20John%20Smith      0
     }
}
```

4 [Permutation Palindrome]()

- Thinking through this, brute force search was out of the question with O(n!)
- Solving it as a graph problem would have been better at O(m+n), but deciding how to construct the nodes et al was not straight forward.
- That left analysing what it meant to be a palindrome. You got the key idea, not more than one odd character, but my implementation (first below) forgot that these characters must belong to the set of a-z, and A-Z and cannot include spaces, so this is not a correct implementation .

```
 public static boolean permutationPalindrome(String str) {
        char[] letters = new char[256];
        for(int i = 0; i < str.length(); ++i) {
            letters[str.charAt(i)]++;
        }
        int isOdd = 0;
        for(int n : letters){
            if(n%2 > 0){isOdd++;}
            if(isOdd > 1){return false;}
        }
        return true;
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String a = sc.nextLine();

        System.out.println(permutationPalindrome("taco cat"));
    }
```

The correction

```
for(int i = 0; i < str.length(); ++i) {
    char val = str.charAt(i);
    if('a' <= val && 'z' >= val){
        letters[val]++
    }
}
```

5 [One Away]()

There are three types of edits that can be performed on strings: insert a character, remove a character, or replace a character. Given two strings, write a function to check if they are one edit (or zero edits) away.

(Page 103).

I decided to start scanning in my input from this problem, having noticed that many times I have a solution to a problem but can't implement it in time simply becasue I was too slow and/or inaccurate at scanning the input in.

This is one of those problems that can be solved as a graph, with nodes representing all possible difference between the two strings, and a shortest path one hop away as true. But like the previous problem, the ambiguity in how to represent this graph incentivices looking for a simpler solution in the structure of the data itself.

Noticing that there are three cases:

- different by more than 2 xters in length (definitely two edits)
- different by just one xter (expect one char difference so check for more than one char diff to retrun false )
- different by 0 xter in length (expect one char difference so check for more than one char diff to return false)

mistakes

- forgot to close scanner;
- initially tried to use a delimiter ", " expecting sc.next() and sc.nextLine() to give you strings excluding the delimiter. This turned out to return ", "+"string" when using nextLine(), because nextLine scans from the last position to the next line char.
- better to adopt a scan in full line then split approach.
- you initially returned false by default in the oneCharDiff method, not paying full attention to what the method was supposed to be doing.

Optimization:

- she solved this without using any arrays, so basically constant space.
- You've used O(n) space.

input:

```
pale, ple
pales, pale
pale, bale
pale, bake
```

```
import java.util.*;

public class Solution {

    static boolean isOneOrZeroEditsAway(String str1, String str2) {
        //System.out.printf("%s%s\n", str1, str2);
        int lengthDiff = str1.length() - str2.length();
        //System.out.println(lengthDiff);
        if(lengthDiff >= 2 || lengthDiff <= -2){
            return false;
        }
        if(lengthDiff == 1 || lengthDiff == -1) {
            //System.out.println("got here");
            return oneCharDiff(str1, str2);
        }
        if(lengthDiff == 0) {
            //System.out.println("got here");
            return oneCharDiff(str1, str2);
        }
        return true;
    }

    static boolean oneCharDiff(String str1, String str2){
        int[] letters = new int[256];
        for(int i = 0; i < str1.length(); ++i){
            letters[str1.charAt(i)]++;
        }
        for(int i = 0; i < str2.length(); ++i){
            if(letters[str2.charAt(i)] > 0) {
                letters[str2.charAt(i)]--;
            }
        }
        boolean count = false;
        for(int c : letters) {
            if(c == 1) {
                if(count == true) {
                    return false;
                }
                count = true;
            }
        }
        return count;
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        //int n = sc.nextInt();
        Boolean res = false;
        while(sc.hasNextLine()){
            String[] line = sc.nextLine().split(", ");
            String str1 = line[0];
            String str2 = line[1];
            // System.out.printf("%s %s", str1, str2);
            res = isOneOrZeroEditsAway(str1, str2);
            System.out.println(res);
        }
        sc.close();
    }
}
```

6 [String Compression]

Implement a method to perform basic string compression using the counts of repeated characters. For example, the string aabcccccaaa would become a2b1c5a3. If the "compressed" string would not become smaller than the original string, your method should return the original string. You can assume the string has only uppercase and lowercase letters (a - z).

(Page 103).

```
import java.util.*;

public class Solution{

    static String compressString(String str){
        String finalStr = str.charAt(0);
        int count = 1;
        for(int i = 1; i < str.length(); ++i){
            if(str.charAt(i) == str.charAt(i-1))
                count++;
            }else{
                finalStr += count.toString() + str.charAt(i);
                count = 1;
            }
        }
        finalStr += count.toString();

        if(finalStr.length() < str.length()){return finalStr;}else{return str;}
    }

    public static void main(String[] args){
        Scanner sc = new Scanner(System.in);
        while(sc.hasNextLine()){
            String str = sc.nextLine();
            str = compressString(str);
            System.out.println(str);
        }
    }
}
```

Full of bugs

```
Solution.java:11: error: 'else' without 'if'
            }else{
             ^
Solution.java:16: error: <identifier> expected
        finalStr += count.toString();
                                    ^
Solution.java:18: error: illegal start of type
        if(finalStr.length() < str.length()){return finalStr;}else{return str;}
        ^
Solution.java:18: error: <identifier> expected
        if(finalStr.length() < str.length()){return finalStr;}else{return str;}
                          ^
Solution.java:18: error: ';' expected
        if(finalStr.length() < str.length()){return finalStr;}else{return str;}
                           ^
Solution.java:18: error: > expected
        if(finalStr.length() < str.length()){return finalStr;}else{return str;}
                                  ^
Solution.java:18: error: ';' expected
        if(finalStr.length() < str.length()){return finalStr;}else{return str;}
                                           ^
Solution.java:18: error: illegal start of type
        if(finalStr.length() < str.length()){return finalStr;}else{return str;}
                                                              ^
Solution.java:18: error: ';' expected
        if(finalStr.length() < str.length()){return finalStr;}else{return str;}
                                                                  ^
Solution.java:18: error: illegal start of type
        if(finalStr.length() < str.length()){return finalStr;}else{return str;}
                                                                   ^
Solution.java:19: error: class, interface, or enum expected
    }
    ^
Solution.java:21: error: class, interface, or enum expected
    public static void main(String[] args){
                  ^
Solution.java:23: error: class, interface, or enum expected
        while(sc.hasNextLine()){
        ^
Solution.java:25: error: class, interface, or enum expected
            str = compressString(str);
            ^
Solution.java:26: error: class, interface, or enum expected
            System.out.println(str);
            ^
Solution.java:27: error: class, interface, or enum expected
        }
        ^
16 errors
```

Fist: forgot { after if. This reduced errors drastically

```
Solution.java:6: error: incompatible types: char cannot be converted to String
        String finalStr = str.charAt(0);
                                    ^
Solution.java:12: error: int cannot be dereferenced
                finalStr += count.toString() + str.charAt(i);
                                 ^
Solution.java:16: error: int cannot be dereferenced
        finalStr += count.toString();
                         ^
3 errors
```

- Assumed char is natively converted to string
- Used wrong syntax to convet int to string

Char and Int to String conversions:

- Character.toString(char c)
- Integer.toString(int c)

Final code

```
import java.util.*;

public class Solution{

    static String compressString(String str){
        String finalStr = Character.toString(str.charAt(0));
        int count = 1;
        for(int i = 1; i < str.length(); ++i){
            if(str.charAt(i) == str.charAt(i-1)){
                count++;
            }else{
                finalStr += Integer.toString(count) + str.charAt(i);
                count = 1;
            }
        }
        finalStr += Integer.toString(count);

        if(finalStr.length() < str.length()){return finalStr;}else{return str;}
    }

    public static void main(String[] args){
        Scanner sc = new Scanner(System.in);
        while(sc.hasNextLine()){
            String str = sc.nextLine();
            str = compressString(str);
            System.out.println(str);
        }
    }
}
```

Input

```
aabcccccaaa
paleple
palespale
palebale
palebake
```

Output

```
a2b1c5a3
paleple
palespale
palebale
palebake
```

Turns out this naive implementation has O(n + k^2) runtime, where n is the size of original string and K is the number of character sequences. I'm yet to fully understand why except that string concatenation uses O(n2) time.

Also, I love how she does this to convert both char and int to string

```
compressedString += " " + str.charAt(i) + countConsecutivej

(Page 213).
```

Her final optimal solution is quite beautiful, optimizing mostly for space in a way that is convinces that such an optimization makes sense.

7 [Rotate Matrix]

Given an image represented by an NxN matrix, where each pixel in the image is 4 bytes, write a method to rotate the image by 90 degrees. (an you do this in place?

(Page 103).

You initially correctly reasoned or guessed that you would require O(n^2) to solve this problem.

- however thinking about an in place solution led to considering swapping the way rows and cols are represented. in a rotation, rows become cols and cols become rows, possibly needed a reversal on some level.
- a clock wise rotation would have been nlogn you resoned(but this is the runtime of sorting instead of reversing), so you reasoned wrongly. Also, an anticlockwise rotation would have been (n^2logn) you also reasoned wrongly
- by far your best solution would have been the one where using just one int as a temporary store, you rotate each layer, char by char, one char moving to the right until all have moved right one time, and you continued concentrically inwards.
- this last solution was somewhat similar to her solution, which she argued cannot be done faster than O(n^2) time since all elements in the matrix have to be touched. That said, she focused on optimizing the space usage.
- an entirely naive space usage could go up to O(n^2) where someone just create a new matrix and copies in the values (this I now understand is a not in place solution). A better space usage is O(n) where rows and columns are switched one at a time (her first solution). The optimal solution here is something that uses O(1) space. A single int.

- implementing the code that loops through concentric layers of a matrix is more difficult than anticipated

wip

```
import java.util.*;

public class Solution {

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int len = sc.nextInt();
        sc.next();
        String[][] matrix = new String[len][len];
        for(int i = 0; i < len; ++i){
            matrix[i] = sc.nextLine().split("");
        }
        sc.close();
        for(int i = 0; i < len; ++i){
            for(int j = 0; j < matrix[i].length; ++j){
                System.out.print(matrix[i][j]);
            }
            System.out.print("\n");
        }
    }
}

```

wip 2

```
import java.util.*;

public class Solution {

    public static void main(String[] args) {
       Scanner sc = new Scanner(System.in);
       String[] fline = sc.nextLine().split(" ");
       for(String s : fline) System.out.print(s+ " "); System.out.println("");

       int len = fline.length;
       String[][] mat = new String[len][len];
       mat[0] = fline;
       for(int i = 1; i < len; ++i) {
           mat[i] = sc.nextLine().split(" ");
           for(String s : mat[i]) System.out.print(s + " "); System.out.println("");
       }
       sc.close();



       for(int i = 0; i < len/2; ++i) {
           for(int j = 0; j < len; ++j) {
               String temp = mat[0][0];
               mat[0][0] = mat[len-1][0];
               mat[len-1][0] = mat[len-1][len-1];
               mat[len-1][len-1] = mat[0][len-1];
               mat[0][len-1] = temp;

               for( String s : mat[0]) System.out.print(s + " "); System.out.println("");
               for( String s : mat[len-1]) System.out.print(s + " "); System.out.println("");

           }

       }
    }
}
```

8 [Zero Matrix] (https://leetcode.com/problems/set-matrix-zeroes/)

Write an algorithm such that if an element in an MxN matrix is 0, its entire row and column are set to O.

(Page 103).

- It seemed so easy that you completely failed to spot the error in that straight forward attempt. She expalains in the book. Naively replace as you go will lead to an entire matrix of zeros when there's even one 0.
- Anyway, that runtime would have been O(MN) and given a wrong solution. So?
- Her solution is also O(MN) time as well becasue she has to scan the entire matrix.
- Her space usage however comes down from O(MN) space (using a duplicate matrix to store positions of 0), to O(M+N) (using two, arrays, on to store rows with 0, the other cols with 0), to O(1), using the first row and the fist col.
- at first I didn't understand why the first row and col would work, given that we'd be modifying them by placing 0s in them, but when thinking about it to the end, at the end we'll be modifying them anyway by placing those 0s to align with rows and cols with 0s, so it works.

```
//wip: merely scanning the input took too long

import java.util.Scanner;

public class HelloWorld{

     public static void main(String []args){
        Scanner sc = new Scanner(System.in);
        int m = sc.nextInt();
        int n = sc.nextInt();
        System.out.printf("%d %d", m, n );
        int[][] matrix = new int[m][n];

        for(int i = 0; i < m; ++i) {
            for(int j = 0; j < n; j++) {
                matrix[i][j] = sc.nextInt();
            }
        }

        for(int i = 0; i < m; ++i) {
            System.out.println();
            for(int j = 0; j < n; j++) {
                System.out.print(matrix[i][j] + " ");
            }
        }
     }

     public static int[][] solve(int[][] matrix) {
        return new int[0][0];
     }
}
```

implmenting to remember, I've tried scanning comma delimited by setting the pattern to non-digits, e.g

```
 sc.useDelimiter(Pattern.compile("\\D"))
```

that failed. So I returned to scanning the input in one line at a time and splitting by comma.

I also tried printing out using streams.

```
import java.util.Scanner;
import java.util.regex.Pattern;
import java.util.*;

public class HelloWorld{

     public static void main(String []args){
        Scanner sc = new Scanner(System.in);
        String[] nl = sc.nextLine().split(",");
        int m = Integer.parseInt(nl[0]);
        int n = Integer.parseInt(nl[1]);
        int[][] matrix = new int[m][n];



        for(int i = 0; i < m; ++i) {
            nl = sc.nextLine().split(",");
            for(int j = 0; j < n; ++j) {
                matrix[i][j] = Integer.parseInt(nl[j]);
            }
        }

        sc.close();

        matrix = setZeros(matrix);

        Arrays.stream(matrix).forEach(e ->

            Arrays.stream(e).forEach(l ->

                System.out.print(e+" ")

            )
        );
     }

     public static int[][] setZeros(int[][] matrix){
        //input is a matrix with some 0 elements
        //set the entire row and col of the 0 el to be 0
        //return matrix
        //go from the O(m+n) space to the O(1) space solution.
        return matrix;

     }


}
```

That didn't work either. I get memory addresses instead of ints.

```
 Arrays.stream(matrix).flatMapToInt(x -> Arrays.stream(x)).forEach(e -> System.out.println(e));
```

This did the trick. [reference](https://stackoverflow.com/questions/22601036/stream-from-two-dimensional-array-in-java)

Your final solution for this, did quite poorly with memory usage on leetcode's testcases.

"Runtime: 1 ms, faster than 96.40% of Java online submissions for Set Matrix Zeroes.
Memory Usage: 40.4 MB, less than 17.50% of Java online submissions for Set Matrix Zeroes."

Also you made an index mistake in the final step where you were meant to set the first column to 0s if there was a 0 initially. Because you copied and pasted the code, you used wrong code that started from the second column.

Also, for these in-place optimizations, ask yourself if new ata structures you plan to use have the same shape and structure to fit in the existing data structure. In this case if arrays exist in matrices.

```
import java.util.Scanner;
import java.util.regex.Pattern;
import java.util.*;

public class HelloWorld{

     public static void main(String []args){
        Scanner sc = new Scanner(System.in);
        String[] nl = sc.nextLine().split(",");
        int m = Integer.parseInt(nl[0]);
        int n = Integer.parseInt(nl[1]);
        int[][] matrix = new int[m][n];



        for(int i = 0; i < m; ++i) {
            nl = sc.nextLine().split(",");
            for(int j = 0; j < n; ++j) {
                matrix[i][j] = Integer.parseInt(nl[j]);
            }
        }

        sc.close();

        setZeros(matrix);

        for(int i = 0; i < m; ++i) {
            for(int j = 0; j < n; ++j) {
                System.out.print(matrix[i][j] + " ");
            }
            System.out.println();
        }
     }

     public static void setZeros(int[][] matrix){

        //phase 1: find which rows and cols to set to 0
        //loop through all rows and cols in O(mxn) time, storing
        //0s in the first row and first col
        //you cannot set first row and col to 0 if there were no 0s there initially.

        if(matrix.length == 0 || matrix[0].length == 0) {
            return;
        }

        boolean[] isZeros = new boolean[2];

        for(int e : matrix[0]) {
            if(e == 0) {
                isZeros[0] = true;
                break;
            }
        }

        for(int[] e : matrix) {
            if(e[0] == 0) {
                isZeros[1] = true;
                break;
            }
        }

        for(int i = 1; i < matrix.length; ++i) {
            for(int j = 1; j < matrix[0].length; ++j) {
                if(matrix[i][j] == 0) {
                    matrix[0][j] = 0;
                    matrix[i][0] = 0;
                    continue;
                }
            }
        }



        //phase 2: set these rows and cols to 0
        for(int i = 1; i < matrix.length; ++i) {
            if(matrix[i][0] == 0) {
                //setMatrixRowI === 0;
                Arrays.fill(matrix[i], 0);
            }
        }

        for(int j = 1; j < matrix[0].length; ++j) {
            if(matrix[0][j] == 0) {
                //setMatrixRowI === 0;
                for(int i = 1; i < matrix.length; ++i){
                    matrix[i][j] = 0;
                }
            }
        }

        if(isZeros[0]) {
            Arrays.fill(matrix[0], 0);
        }

        if(isZeros[1]) {
            for(int i = 0; i < matrix.length; ++i){
                    matrix[i][0] = 0;
            }
        }


     }


}
```

9 [string rotation]()

String Rotation: Assume you have a method isSubst ring which checks if one word is a substring
of another. Given two strings, 51 and 52, write code to check if 52 is a rotation of 51 using only one
call to isSubstring (e.g., "waterbottle" is a rotation of"erbottlewat").

I read through the answer for this and just wanted to impl it.

let y = wat, x = erbottle
then yx = waterbottle and xy =erbottlewat
it is always the case that yxyx contains xy
therefore

```
//yxyx.contains(xy) gives our answer
```

as for running time. concatenation is O(yx + yx) -> O(yx)
contains is ... lets say O(nm) [ref](https://stackoverflow.com/questions/4089558/what-is-the-big-o-of-string-contains-in-java)

## Linked Lists

2.1 [remove duplicates]()

Remove Dups: Write code to remove duplicates from an unsorted linked list. FOLLOW UP How would you solve this problem if a temporary buffer is not allowed?

(Page 106).

pseudo:

```
input: head or linkedlist of unsorted linkedlist
expected output: void

unsorted: means duplicates can exist at any point in the list
naive solution: for every node, loop through the list deleting duplicates O(n^2)
using a  hashset: for every node check if it exists in hashset, if it does, delete, if not add to hashset
not using a hashset: sort the list in O(nlogn) time and remove dups in O(n) time and O(1) space, by, for every node, if same node delete, if new replace holder.

* I did not ask if it was a singly or doubly linked list. This makes a difference in deletion.

```

2.2 [Return Kth to last elem of linkedlist]()

```
problem: return kth to last elem of a singly linked list:
singly linked list: I can't just find the last elem and go back k-1 times.

Input: Head node or LinkedList instance of singly linkedList
output: LinkedList Node

approach: use the runner method. Two pointers:
- p1 starts at head
- p2 maintains a k-1 distance ahead of p1

if(p2.next == null) ==> end of list
return p1
else p2 = p2.next
p1 = p1.next
```

Runtime of O(n-k-1) === O(n-k)

2.3 [Delete middle node of singly linkedlist]()

```
problem: delete the middle node of a singly linked list given only access to that node
middle node: not the head or tail node
singly linked list: cannot go back to previous node so cannot set prev to skip current
access to that node: are not given head, just that node

input: a node to delete
sub-problem: how to go back to prev node to delete curr node? assume head? Head is not given.

approach: for each node from current, clone next node, move to next node, repeat
end case:  node prior to last node should clone the null endcase
if not, use runner method.
p1 current node
p2 to check for end node
while p2 is not end node, clone
if p2 is end node, p1 clone and p1 set to end node
```

2.4 [Partition]()

```
problem: partition linkedlist around element x; all elements < x should come before all elems > x. X can appear in any position; not neccessarily in the middle.

Q: is it a singly or doubly linked list? assume it's single.

input: Linked list, partition val

approach: maintain a pointer to original head, ph,
maintain another pointer to the partition elemen, pe
maintain a pointer to tail, pt.

maintain a pointer to new head nPh, nPt
for each next elm from pe, if e < pe, make new nPh, delete from curr position. if e > pe, make new nPt, delete from curr position.

sub-problem: all nodes < x come before all nodes > x. ^ just ensures all nodes less than x come before x.

do another sweep, this time from ph to pe, for each node > than x, make new tail.

sub-problem: what if ph itself > pe?

modify other sweep, from ph to pe, for each el < pe, make new head.

```

2.5 [Sum Lists]()

You have two numbers represented by a linked list, where each node contains a single digit. The digits are stored in reverse order, such that the 1 's digit is at the head of the list. Write a function that adds the two numbers and returns the sum as a linked list. EXAMPLE Input: (7-) 1 -) 6) + (5 -) 9 -) 2).Thatis,617 + 295. Output: 2 -) 1 -) 9. That is, 912. FOLLOW UP Suppose the digits are stored in forward order. Repeat the above problem. EXAMPLE Input: (6 -) 1 -) 7) + (2 -) 9 -)

(Page 107).

```
problem: given two numbers whose digits are nodes in a linkedlist, return the sum of the two numbers as a linkedlist. The given linkedlist has it's digits reversed.

input: two linkedlists with digits, reversed.
output: linkedlist with digits, reversed.

clarification: are the numbers the same length? nothing to suggest this.

approach, create a new linkedlist to store the output.

keep track of head of both input lists and new linkelist

while head is not null

sum the two values, such that new linkedlist gets the remainder by 10, and carryover is value of division

update heads to head.next for each.


subproblem: how to create nodes on the fly for new linkedlist?

subproblem: how to terminate summation.

if(one of the input list heads == null, summation ends, but which was null)

sum the val of the one thats not null with carry over,

if theres stil carry over, append to new linkedlist

```

problem: what if the digits were not reversed?

```
approach: reverse the lists in O(n) time then run the summation, and reverse the result.

sub-problem: how to reverse the singly linked list?

approach:
for each curr node, know the prev node and the next node

perform the ffg assignments

curr node.next = prev node
prev node = curr node
curr node = next node
next node = curr node.next

```

2.6 [Palindrome]()

Implement a function to check if a linked list is a palindrome.

(Page 107).

```
problem: impl a func to check if a linked list is a palindrome

assumption: it's singly linked list

input: linkedlist

output: boolean

palindrome: if we forward, or backword, we get the same sequence of characters

approach 1:
- reverse the linked list in a new linked list in O(n) time
- iterate through both linkedlists comparing characters as you go
- if any mismatch occurs then its not a palindrome, elese it is
O(n) time o(n) space

approach 2:

- reverse only half of the linked list
- compare with the other half in the same iterative approach

O(n) time and O(n) space

approach 3:
- push all elements of the first of half of the linkedlist into a stack
- ignore any odd middle elements
- iteratively pop each element from the stack while comparing with the each subsequent element from the second half of the linkedlist
- if any mistmatch occurs then it's a palindrome else its not a palindrome

O(n) time and O(n) space




```

2.6 [Intersection]()

Intersection: Given two (singly) linked lists, determine if the two lists intersect. Return the intersecting node. Note that the intersection is defined based on reference, not value. That is, if the kth node of the first linked list is the exact same node (by reference) as the jth node of the second linked list, then they are intersecting.

(Page 107).

```
problem: given two SINLGLY LINKED LISTS. Determine if they INTERSECT. Intersection is by reference i.e if the kth noe of ll1 is the same node by reference as the jth node of ll2, then they intersect

intersect: as of sets, an intersection occurs when an element exists in both sets.

simply: check if there is an element common to both linkedlists by reference, not by value

approach 1:
- for every element in one linkedlist, chec if it exists in the other linkedlist.
this is O(m xn) time, but only O(1) space

edge case: data could consist of two really long ll with duplicate references
ans: store each elem in a hashset and only proceedd with execution if the element has not been seen before, else, skip.


approach 2:
- push each element of ll1 into a hashset. in O(m) time, O(m) space
- for each elm in second ll, check if it exists in hashset
if it does, then intersection has occured, return
O(n) time

O(m+n) time O(m) space

```

2.8 [Loop Detection]()

Given a circular linked list, implement an algorithm that returns the node at the beginning of the loop. DEFINITION Circular linked list: A (corrupt) linked list in which a node's next pointer points to an earlier node, so as to make a loop in the linked list. EXAMPLE Input: A -) B -) C -) 0 -) E - ) C[thesameCasearlierl Output: C

(Page 107).

```
Problem: given a circlular linkedlist, impl algo that returns the node at the beginning of the loop

examp: a -> b -> c -> d ->e -> c
return: c

input: a circular linkedlist
assumption: all input is of a circular ll

approach 1: interate through each reference, and for each interate from the beginning checking if it's been seen before. O(n^2) time.

approach 2: iterate through each ref, store in hashset if it doensnt already exist. else, return.
O(n) time and O(n) space
```

3.1 [Three In One]()

Describe how you could use a single array to implement three stacks.

(Page 110).

Problem: implement three stacks using one array
stack: a lifo data structure with unlimited length, and constant time pop, push, peep, and isEmpty.
sub-problem: how to grow the array when full?
assumption: array is long enough for what is needed.
approach: segment the array into three, as follows:

- st0 starts from 0 in increments of 3
- st1 starts from 1 in increments of 3
- st2 starts from 2 in increments of 3

such that st0 has 0, 3, 6, 9, ... allocated to it
st1 has 1, 4, 7, 10, ... to it
st2 has 2, 5, 8, 11, ... to it

Maintain a pointer to the top of each stack; the top being the highest index of the respective stack with an element.

st0 = 0, st1 = 1, st2 = 2

pop(stack) {
if stack top index = 0 && empty retun empty exception
val = val at stack top index
stack top index = stack top index - 3
return val

}

similar for push, peep, and isEmpty

Analysis: should allow doubling array capacity in O(n) time.

3.2 [Stack Min]()

How would you design a stack which, in addition to push and pop, has a function min which returns the minimum element? Push, pop and min should all operate in 0(1) time.

(Page 110).

Approach: I would simply maintain a min property, such that for every push, if the elem is smaller than the curr min, the min elem, is updated.

for every pop, after popping, update the min elem in O(n) time by scanning through the stack, such that:

if curr elem is < min, update min, keep scanning.

issue: doesn't this mean that the pop is actually O(n) time?

3.3 [Stack of Plates]()

Imagine a (literal) stack of plates. If the stack gets too high, it might topple. Therefore, in real life, we would likely start a new stack when the previous stack exceeds some threshold. Implement a data structure SetOfStacks that mimics this. SetOfStacks should be composed of several stacks and should create a new stack once the previous one exceeds capacity. SetOfStacks. push () and SetOfStacks. pop () should behave identically to a single stack (that is, pop ( ) should return the same values as it would if there were just a single stack). FOLLOW UP Implement a function popAt (int index) which performs a pop operation on a specific sub-stack.

(Page 111).

Problem:

- implement setOfStacks which creates a new stack when a threshold is reached.
- pop and push should work as though it's one stack
- it impls popAt(int index) that selects the stack to pop from

assumptions:

- popAt() maintains the invariant of O(1) access time
- setOfStacks depends on existing Stack data structures

approach: on construction, setOfStacks should create a collection of stacks maintained in an array, arrayList or, stack.
array presents issues with increasing capcity when full,
stack makes popAt O(1) impossible
so arrayList is the best datastructure for this

- define a threshold after which a new stack is added to the arraylist
- maintain a pointer to the last index of the arraylist
- for push, when threshold is reached, create new stack, push into that, append to arraylist and inc pointer

for pop, if stack at pointer is empty, dec pointer, pop from stack at new pointer, or else pop from pointer stack

for popAt, access stack at given index of arraylist, and pop.

analysis: space O(n), pop, push, popAt are O(1)

3.4 [Queue via Stacks]()

Stacks: Implement a MyQueue class which implements a queue using two stacks.

(Page 111).

Problem: implement a queue with two stacks
stack: lifo data structure
queue: fifo data structure

subproblem: how to get a fifo from a lifo

approach: imagine two stack of plates, from one stack you want to get the plate at the bottom,
stack every element from the top to the bottom onto the other stack, and then you can get the elem,
and restack every element back

in order to maintain order, one stack must be empty at all times.

subproblem: which operation should have O(1) access time, and which should have O(n) access time?

approach 1:

maintain two stacks, a push stack and a pop stack
on every push, if push stack is not empty push into it,
else, pop every elem from the pop stack into the push stack and push into it, if pop stack is not empty

on every pop, if pop stack is not empty, pop from it,
else, pop every elem from push stack into pop stack and pop from it, if push stack is not empty

approach 2:
maintain O(1) pop time for pop, and O(n) for push

on every pop, pop from pop if not empty
on every push, pop every elm from pop stack into push stack, push, and then pop every elm back.

3.5 [Sort Stack]

Write a program to sort a stack such that the smallest items are on the top. You can use an additional temporary stack, but you may not copy the elements into any other data structure (such as an array). The stack supports the following operations: push, pop, peek, and isEmpty.

(Page 111).

problem: sort a stack using only a temporary stack and nothing else, if extra space is needed.

stack supports push, pop, peek, isEmpty

approach:

- create a temp stack

- pk = peek of temp stack
- if pop of main stack >= pk, push into temp stack
- if pop main < pk,
  while pop main < pk, pop from temp stack and push into main stack
  push pop of main stack into temp stack

when done, pop every thing from temp stack into main stack

I think this is O(n^2)

3.5 [Animal Shelter]()

An animal shelter, which holds only dogs and cats, operates on a strictly"first in, first out" basis. People must adopt either the "oldest" (based on arrival time) of all animals at the shelter, or they can select whether they would prefer a dog or a cat (and will receive the oldest animal of that type). They cannot select which specific animal they would like. Create the data structures to maintain this system and implement operations such as enqueue, dequeueAny, dequeueDog, and dequeueCat. You may use the built-in Linked List data structure.

(Page 111).

problem: impl an Animal shelter that has the ffg rules:

- can only adopt the oldest animal or the oldest of either a cat or a dog
- impl enqueue, dequeueAny, dequeueDog, and dequeueCat

approach: use two list data structs to rep two queues, one for cat one for dog

subproblem: how to use Linkedlist for a queue: - enqueue to head, and dequeue from tail

implemtation:

enqueue(Animal a) {
if a.type == cat: queue to head of cat list
if is dog, queue to head of dog list
else, throw not accepted animal exception
}

dequeueAny() {
peek at tail of both lists
return the older of the two

    sub-problem: how do you identify the older animal?
    add a time of addtion to animal class.

}

dequeueDog/Cat() {
dequeue from the end of the respective list
return that
}
