import { ObservableArray } from "tns-core-modules/data/observable-array"

export const returnObservableArr = (arr) => {   
    return new ObservableArray(arr)
}