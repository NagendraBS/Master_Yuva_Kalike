package demoTest;

import java.lang.reflect.Array;
import java.util.Arrays;
import java.util.Iterator;

public class Test2 {


    public static void main(String[] args) {


        Integer a[] = {4,4,4,4,4,4} ;

        int max = a[0];
        int  min = a[0];

        int res[] = new int[a.length];

        for( int i= 0 ; i < a.length ; i++){

            if(a[i] > max)
                max = a[i];
            if(a[i] < min)
                min=a[i];

            res[i] = max - min;


        }

        //Iterator
        Arrays.stream(res).forEach(System.out::print);


    }
}

