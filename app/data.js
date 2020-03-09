import { ObservableArray } from "tns-core-modules/data/observable-array"

export const cartesianData = {
    getCountriesData: function(){
        return new ObservableArray([
            { Country: 'Germany', Amount: 15, SecondVal: 10, ThirdVal: 24, FourthVal: 20, Impact: 0, Year: 0 },
            { Country: 'France', Amount: 13, SecondVal: 5, ThirdVal: 5,  FourthVal: 35, Impact: 0, Year: 0 },
            { Country: 'Bulgaria', Amount: 24, SecondVal: 17, ThirdVal: 2, FourthVal: 60, Impact: 0, Year: 0 },
            { Country: 'Spain', Amount: 11, SecondVal: 1, ThirdVal: 24, FourthVal: 70, Impact: 0, Year: 0 },
            { Country: 'USA', Amount: 18, SecondVal: 8, ThirdVal: 51,  FourthVal: 10, Impact: 0, Year: 0 }
        ])
    }, 
    getTasksData: function(){
        return new ObservableArray([
          { Name: 'Groceries', High: 30, Low: 12, Sales: 0, Margin: 0 },
          { Name: 'Tools', High: 135, Low: 124, Sales: 0, Margin: 0 },
          { Name: 'Electronics', High: 55, Low: 12, Sales: 0, Margin: 0 },
          { Name: 'Gardening', High: 50, Low: 29, Sales: 0, Margin: 0 }
        ]);
    }
}