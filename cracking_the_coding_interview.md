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

8 [Zero Matrix]

Write an algorithm such that if an element in an MxN matrix is 0, its entire row and column are set to O.

(Page 103).

- It seemed so easy that you completely failed to spot the error in that straight forward attempt. She expalains in the book. Naively replace as you go will lead to an entire matrix of zeros when there's even one 0.
- Anyway, that runtime would have been O(MN) and given a wrong solution. So?
- Her solution is also O(MN) time as well becasue she has to scan the entire matrix.
- Her space usage however comes down from O(MN) space (using a duplicate matrix to store positions of 0), to O(M+N) (using two, arrays, on to store rows with 0, the other cols with 0), to  O(1), using the first row and the fist col.
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