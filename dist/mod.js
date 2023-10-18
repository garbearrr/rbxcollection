"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Collection = void 0;
const event_1 = require("@rbxgar/event");
function Collection() {
    const _Map = new Map();
    const _Events = {
        OnAdd: (0, event_1.EventModule)(),
        OnDestroy: (0, event_1.EventModule)(),
        OnRemove: (0, event_1.EventModule)(),
    };
    const state = {};
    const methods = (state) => ({
        // Converts the collection into an array of its values.
        Array() {
            const values = [];
            _Map.forEach((value) => {
                values.push(value);
            });
            return values;
        },
        // Retrieves the value at the specified index from the collection.
        At(index) {
            const values = methods(state).Array();
            const normalizedIndex = index >= 0 ? index : values.size() + index;
            return values[normalizedIndex];
        },
        // Removes all entries from the collection.
        Clear() {
            _Map.clear();
        },
        // Creates and returns a new collection with the same entries as the original.
        Clone() {
            const clone = Collection();
            _Map.forEach((value, key) => {
                clone.Set(key, value);
            });
            return clone;
        },
        // Merges the current collection with one or more other collections.
        Concat(...collections) {
            const clone = methods(state).Clone();
            collections.forEach((collection) => {
                collection.ForEach((value, key) => {
                    clone.Set(key, value);
                });
            });
            return clone;
        },
        // Removes the entry with the specified key from the collection.
        Delete(key) {
            return _Map.delete(key);
        },
        // Deconstructor marking the object as destroyed. This will fire the OnDestroy event.
        Destroy() {
            _Events.OnDestroy.Fire(_Map);
            for (const _Event in _Events) {
                _Events[_Event].Destroy();
            }
            _Map.clear();
        },
        // Returns a new collection containing entries not present in the provided collection.
        Difference(collection) {
            const clone = methods(state).Clone();
            collection.ForEach((value, key) => {
                if (clone.Has(key)) {
                    clone.Delete(key);
                }
            });
            return clone;
        },
        // Retrieves the value associated with the specified key from the collection.
        Get(key) {
            return _Map.get(key);
        },
        // Executes a function for each entry in the collection.
        Each(fn) {
            _Map.forEach((value, key) => {
                fn(value, key);
            });
            return { ...state, ...methods(state) };
        },
        // Ensures an entry with the specified key exists in the collection. If not, sets it with a default value.
        Ensure(key, defaultValue) {
            if (!_Map.has(key)) {
                _Map.set(key, defaultValue);
            }
            return _Map.get(key);
        },
        // Returns an array of [key, value] pairs from the collection.
        Entries() {
            const entries = [];
            _Map.forEach((value, key) => {
                entries.push([key, value]);
            });
            return entries;
        },
        // Compares the collection with another one for equality.
        Equals(collection) {
            if (_Map.size() !== collection.Size()) {
                return false;
            }
            for (const [key, value] of _Map) {
                if (!collection.Has(key) || collection.Get(key) !== value) {
                    return false;
                }
            }
            return true;
        },
        // Checks if every entry in the collection satisfies a test.
        Every(fn) {
            for (const [key, value] of _Map) {
                if (!fn(value, key)) {
                    return false;
                }
            }
            return true;
        },
        // Filters the collection based on a test and returns a new collection.
        Filter(fn) {
            const results = Collection();
            for (const [key, value] of _Map) {
                if (fn(value, key)) {
                    results.Set(key, value);
                }
            }
            return results;
        },
        // Finds a value in the collection that satisfies a test.
        Find(fn) {
            for (const [key, value] of _Map) {
                if (fn(value, key)) {
                    return value;
                }
            }
            return undefined;
        },
        // Finds a key in the collection that satisfies a test on its associated value.
        FindKey(fn) {
            for (const [key, value] of _Map) {
                if (fn(value, key)) {
                    return key;
                }
            }
            return undefined;
        },
        // Retrieves the first value or first 'count' values from the collection.
        First(count) {
            const iterator = _Map[Symbol.iterator]();
            if (count === undefined) {
                const first = iterator.next();
                return first.done ? undefined : first.value[1];
            }
            if (count < 0) {
                return [];
            }
            const values = [];
            let iterCount = 0;
            let iteratorResult = iterator.next();
            while (!iteratorResult.done && iterCount < count) {
                values.push(iteratorResult.value[1]);
                iterCount++;
                iteratorResult = iterator.next();
            }
            return values.size() === 0 ? undefined : values.size() === 1 ? values[0] : values;
        },
        // Maps each entry in the collection into an array using a function, then flattens the result into a single array.
        FlatMap(fn) {
            const results = [];
            _Map.forEach((value, key) => {
                const mappedValues = fn(value, key);
                mappedValues.forEach((mappedValue) => {
                    results.push(mappedValue);
                });
            });
            return results;
        },
        // Executes a function for each entry in the collection.
        ForEach(fn) {
            for (const [key, value] of _Map) {
                fn(value, key);
            }
        },
        // Checks if an entry with the specified key exists in the collection.
        Has(key) {
            return _Map.has(key);
        },
        // Checks if entries for all specified keys exist in the collection.
        HasAll(...keys) {
            return keys.every((key) => _Map.has(key));
        },
        // Checks if an entry for any of the specified keys exists in the collection.
        HasAny(...keys) {
            return keys.some((key) => _Map.has(key));
        },
        // Returns a new collection containing only the entries that are also present in the provided collection.
        Intersect(collection) {
            const clone = methods(state).Clone();
            collection.ForEach((value, key) => {
                if (!clone.Has(key)) {
                    clone.Delete(key);
                }
            });
            return clone;
        },
        // Checks if the collection is empty.
        IsEmpty() {
            return _Map.size() === 0;
        },
        // Converts the collection into an array of its keys.
        KeyArray() {
            const keys = [];
            _Map.forEach((_value, key) => {
                keys.push(key);
            });
            return keys;
        },
        // Retrieves the key at the specified index from the collection.
        KeyAt(index) {
            const keys = methods(state).KeyArray();
            const normalizedIndex = index >= 0 ? index : keys.size() + index;
            return keys[normalizedIndex];
        },
        // Converts the collection into an array of its keys.
        Keys() {
            return methods(state).KeyArray();
        },
        // Retrieves the last value in the collection.
        Last() {
            const iterator = _Map[Symbol.iterator]();
            let iteratorResult = iterator.next();
            let last = undefined;
            while (!iteratorResult.done) {
                last = iteratorResult.value[1];
                iteratorResult = iterator.next();
            }
            return last;
        },
        // Retrieves the last key in the collection.
        LastKey() {
            const iterator = _Map[Symbol.iterator]();
            let iteratorResult = iterator.next();
            let lastKey = undefined;
            while (!iteratorResult.done) {
                lastKey = iteratorResult.value[0];
                iteratorResult = iterator.next();
            }
            return lastKey;
        },
        // Maps each entry in the collection into a new array using a function.
        Map(fn) {
            const arr = [];
            _Map.forEach((value, key) => {
                arr.push(fn(value, key));
            });
            return arr;
        },
        // Returns a new collection with values modified based on a function.
        MapValues(fn) {
            const clone = methods(state).Clone();
            clone.ForEach((value, key) => {
                clone.Set(key, fn(value, key));
            });
            return clone;
        },
        // Merges the collection with another one based on some merge criteria.
        Merge(collection, whenInSelf, whenInOther, whenInBoth) {
            const clone = methods(state).Clone();
            collection.ForEach((value, key) => {
                if (clone.Has(key)) {
                    const keep = whenInBoth(clone.Get(key), value, key);
                    if (keep.keep) {
                        clone.Set(key, keep.value);
                    }
                    else {
                        clone.Delete(key);
                    }
                }
                else {
                    const keep = whenInOther(value, key);
                    if (keep.keep) {
                        clone.Set(key, keep.value);
                    }
                }
            });
            clone.ForEach((value, key) => {
                const keep = whenInSelf(value, key);
                if (!keep.keep) {
                    clone.Delete(key);
                }
            });
            return clone;
        },
        // Splits the collection into two based on a test. One with entries that pass the test and another with entries that fail.
        Partition(fn) {
            const clone = methods(state).Clone();
            const truthy = Collection();
            const falsy = Collection();
            clone.ForEach((value, key) => {
                if (fn(value, key)) {
                    truthy.Set(key, value);
                }
                else {
                    falsy.Set(key, value);
                }
            });
            return [truthy, falsy];
        },
        // Retrieves a random value from the collection.
        Random() {
            const values = methods(state).Array();
            return values[math.floor(math.random() * values.size())];
        },
        // Retrieves a random key from the collection.
        RandomKey() {
            const keys = methods(state).KeyArray();
            return keys[math.floor(math.random() * keys.size())];
        },
        // Reduces the collection to a single value using a function.
        Reduce(fn, initial) {
            let accumulator = initial;
            for (const [key, value] of _Map) {
                accumulator = fn(accumulator, value, key);
            }
            return accumulator;
        },
        // Reverses the order of entries in the collection.
        Reverse() {
            const clone = methods(state).Clone();
            const entries = clone.Entries();
            clone.Clear();
            entries.forEach(([key, value]) => {
                clone.Set(key, value);
            });
            return clone;
        },
        // Adds an entry with a specified key and value to the collection.
        Set(key, value) {
            _Map.set(key, value);
            _Events.OnAdd.Fire(value);
            return value;
        },
        // Returns the number of entries in the collection.
        Size() {
            return _Map.size();
        },
        // Checks if any entry in the collection satisfies a test.
        Some(fn) {
            for (const [key, value] of _Map) {
                if (fn(value, key)) {
                    return true;
                }
            }
            return false;
        },
        // Returns a new collection sorted based on the provided comparator function.
        Sort(fn) {
            // Gather entries from the map
            const entries = [];
            _Map.forEach((value, key) => {
                entries.push([key, value]);
            });
            // Implementing Bubble Sort
            let swapped;
            do {
                swapped = false;
                for (let i = 0; i < entries.size() - 1; i++) {
                    if (fn(entries[i][1], entries[i + 1][1]) > 0) {
                        [entries[i], entries[i + 1]] = [entries[i + 1], entries[i]];
                        swapped = true;
                    }
                }
            } while (swapped);
            // Create a new sorted collection
            const sortedCollection = Collection();
            for (const [key, value] of entries) {
                sortedCollection.Set(key, value);
            }
            return sortedCollection;
        },
        // Removes entries from the collection that satisfy a test and returns the count of removed entries.
        Sweep(fn) {
            let count = 0;
            _Map.forEach((value, key) => {
                if (fn(value, key)) {
                    _Map.delete(key);
                    count++;
                }
            });
            return count;
        },
        // Executes a function with the collection and returns the collection.
        Tap(fn) {
            fn({ ...state, ...methods(state) });
            return { ...state, ...methods(state) };
        },
        // Converts the collection into an array of its values.
        ToJSON() {
            return [...methods(state).Values()];
        },
        // Converts the collection into an array of its values.
        Values() {
            const values = [];
            _Map.forEach((value) => {
                values.push(value);
            });
            return values;
        },
        ..._Events,
    });
    return { ...state, ...methods(state) };
}
exports.Collection = Collection;
