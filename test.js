
bubbleSort = (arr) => {
    console.log('BUBBLE SORT');
    for(let i = 0; i< arr.length -1; i++){
        for(let j = 0; j< arr.length -i- 1; j++){
            if(arr[j] > arr[j+1]){
                arr[j] = arr[j] + arr[j+1]
                arr[j+1] = arr[j] - arr[j+1]
                arr[j] = arr[j] - arr[j+1]
            }
        }
    }
    console.log(arr);
    return arr;
}



SelectionSort = (arr) => {
    console.log('SELECTION SORT');
    for(let i = 0; i < arr.length - 1; i++){
        //console.log('++++++++++++++++', i);
        for(let j = i; j < arr.length; j++){
            //console.log(j);
            if(arr[i] > arr[j]){
                arr[i] = arr[i] + arr[j]
                arr[j] = arr[i] - arr[j]
                arr[i] = arr[i] - arr[j]
            }
        }
    }
    console.log(arr);
    return arr;
}

let arr = [5,6,2,3,10,1,8,4,7,9];
//bubbleSort(arr);
SelectionSort(arr);
