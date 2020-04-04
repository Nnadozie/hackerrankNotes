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