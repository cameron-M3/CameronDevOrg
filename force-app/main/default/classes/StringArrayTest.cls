public with sharing class StringArrayTest {
    
        public static List<String> generateStringArray(Integer numStrings) {
            List<String> result = new List<String>();
            for (Integer i = 0; i < numStrings; i++) {
                result.add('Test ' + i);
            }
            return result;
        }

}