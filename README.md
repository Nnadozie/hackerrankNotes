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
