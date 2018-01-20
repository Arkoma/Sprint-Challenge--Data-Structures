/* eslint-disable no-unused-vars */
/* eslint-disable class-methods-use-this */
const { LimitedArray, getIndexBelowMax, LinkedList } = require('./hash-table-helpers');

class HashTable {
  constructor(limit = 8) {
    this.limit = limit;
    this.storage = new LimitedArray(this.limit);
    // Do not modify anything inside of the constructor
  }

  resize() {
    // doubles the limit value on the HashTable constructor
    this.limit *= 2;
    // assigns the Limited Array to the variable oldStorage
    const oldStorage = this.storage;
    // sets a new assigns a new Limited Array with the new
    // limit to this.storage.
    this.storage = new LimitedArray(this.limit);
    // runs a callback function on the oldStorage variable
    // called each that iterates over the limited array passing each
    // k,v pair through the insert method. in the new limited array
    // with the new limit.
    oldStorage.each((bucket) => {
      if (!bucket) return;
      bucket.forEach((pair) => {
        this.insert(pair[0], pair[1]);
      });
    });
  }

  capacityIsFull() {
    //
    let fullCells = 0;
    this.storage.each((bucket) => {
      if (bucket !== undefined) fullCells++;
    });
    return fullCells / this.limit >= 0.75;
  }

  // Adds the given key, value pair to the hash table
  // Fetch the bucket associated with the given key using the
  // getIndexBelowMax function
  // If no bucket has been created for that index, instantiate a new
  // bucket and add the key, value pair to that new bucket
  // If the key already exists in the bucket, the newer value should overwrite the older value associated with that key
  insert(key, value) {
    if (this.capacityIsFull()) this.resize();
    const index = getIndexBelowMax(key.toString(), this.limit);
    let bucket = this.storage.get(index);
    bucket = new LinkedList();
    // bucket = bucket.filter(item => item[0] !== key);
    // bucket.push([key, value]);
    if (bucket.contains(value) === false) {
      bucket.addToTail([key, value]);
      this.storage.set(index, bucket);
    }
  }
  // Removes the key, value pair from the hash table
  // Fetch the bucket associated with the given key using the getIndexBelowMax function
  // Remove the key, value pair from the bucket
  remove(key) {
    const index = getIndexBelowMax(key.toString(), this.limit);
    let bucket = this.storage.get(index);
    if (bucket) {
      bucket = bucket.filter(item => item[0] !== key);
      this.storage.set(index, bucket);
    }
  }
  // Fetches the value associated with the given key from the hash table
  // Fetch the bucket associated with the given key using the getIndexBelowMax function
  // Find the key, value pair inside the bucket and return the value
  retrieve(key) {
    const index = getIndexBelowMax(key.toString(), this.limit);
    const bucket = this.storage.get(index);
    // let retrieved;
    // if (bucket) {
    //   retrieved = bucket.filter(item => item[0] === key)[0];
    // }

    // return retrieved ? retrieved[1] : undefined;
  }
}

module.exports = HashTable;
