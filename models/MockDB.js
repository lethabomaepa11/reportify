export default class MockDB{
    insert(name, data) {
        //function to insert item into localstorage without overwriting the currently stored items
        //get the stored string
        let item = localStorage.getItem(name);
        //check if its not empty
        if (item) {
            //parse to javascript array
            item = JSON.parse(item);
            //push new data
            item.push(data);
        }
        else {
            //no data exists for that item
            //create new array for that item
            item = [data];
        }

        //store the item in the localstorage
        localStorage.setItem(name, JSON.stringify(item));
    }

    get(name) {
        //returns the object/array from localstorage
        let item = localStorage.getItem(name);
        if (item) {
            return JSON.parse(item);
        }
        return null;
    }
}
