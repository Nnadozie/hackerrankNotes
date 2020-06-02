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

This first solution aimed for O(logn) using binary search. Perfect if the string characters were sorted. However that's not specified, so the sorting will take o(nlogn), making it worse than O(n), the runtime of the solution she provided in the book. Pseudocode:

```
URLify(String str) {
    char[] chars = str.toCharArray();
    int index = binarySearch(" ");
    while(index != -1){
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

It makes the same data structure mistake as the false logn solution, among other failures, doing no justice to the problem.
