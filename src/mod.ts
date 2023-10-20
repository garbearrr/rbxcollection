import { BaseModule, DeclareModule } from "@rbxgar/basemodule";
import { EventModule } from "@rbxgar/event";

export function Collection<K extends defined, V extends defined>(): Collection<K, V> {
	const _Map: Map<K, V> = new Map<K, V>();
	const _Events: CollectionEvents<K, V> = {
		OnAdd: EventModule<V>(),
		OnDestroy: EventModule<Map<K, V>>(),
		OnRemove: EventModule<V>(),
	};

	const state: CollectionParams<K, V> = {
		IsDestroyed: false,
	};

	const methods = (state: CollectionParams<K, V>): CollectionMethods<K, V> => ({
		// Converts the collection into an array of its values.
        Array(): V[] {
			const values: V[] = [];
			_Map.forEach((value) => {
				values.push(value);
			});
			return values;
		},

        // Retrieves the value at the specified index from the collection.
		At(index: number): V | undefined {
			const values = methods(state).Array();
			const normalizedIndex = index >= 0 ? index : values.size() + index;
			return values[normalizedIndex];
		},

        // Removes all entries from the collection.
		Clear(): void {
			_Map.clear();
		},

        // Creates and returns a new collection with the same entries as the original.
		Clone(): Collection<K, V> {
			const clone = Collection<K, V>();
			_Map.forEach((value, key) => {
				clone.Set(key, value);
			});
			return clone;
		},

        // Merges the current collection with one or more other collections.
		Concat(...collections: Collection<K, V>[]): Collection<K, V> {
			const clone = methods(state).Clone();
			collections.forEach((collection) => {
				collection.ForEach((value, key) => {
					clone.Set(key, value);
				});
			});
			return clone;
		},

        // Removes the entry with the specified key from the collection.
		Delete(key: K): boolean {
			return _Map.delete(key);
		},

		// Deconstructor marking the object as destroyed. This will fire the OnDestroy event.
		Destroy(): void {
			_Events.OnDestroy.Fire(_Map);

			for (const [_Event] of pairs(_Events)) {
				(_Events as unknown as {[key: string]: EventModule<any>})[_Event].Destroy();
			}
            
			_Map.clear();
		},

        // Returns a new collection containing entries not present in the provided collection.
		Difference(collection: Collection<K, V>): Collection<K, V> {
			const clone = methods(state).Clone();
			collection.ForEach((value, key) => {
				if (clone.Has(key)) {
					clone.Delete(key);
				}
			});
			return clone;
		},

        // Retrieves the value associated with the specified key from the collection.
		Get(key: K): V | undefined {
			return _Map.get(key);
		},

        // Executes a function for each entry in the collection.
		Each(fn: (value: V, key: K) => void): Collection<K, V> {
			_Map.forEach((value, key) => {
				fn(value, key);
			});
			const Module =  { ...state, ...methods(state), IsDestroyed: () => IsDestroyed(state) };
			return DeclareModule(Module);
		},

        // Ensures an entry with the specified key exists in the collection. If not, sets it with a default value.
		Ensure(key: K, defaultValue: V): V {
			if (!_Map.has(key)) {
				_Map.set(key, defaultValue);
			}
			return _Map.get(key)!;
		},

        // Returns an array of [key, value] pairs from the collection.
		Entries(): [K, V][] {
			const entries: [K, V][] = [];
			_Map.forEach((value, key) => {
				entries.push([key, value]);
			});
			return entries;
		},

        // Compares the collection with another one for equality.
		Equals(collection: Collection<K, V>): boolean {
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
		Every(fn: (value: V, key: K) => boolean): boolean {
			for (const [key, value] of _Map) {
				if (!fn(value, key)) {
					return false;
				}
			}
			return true;
		},

        // Filters the collection based on a test and returns a new collection.
		Filter(fn: (value: V, key: K) => boolean): Collection<K, V> {
			const results = Collection<K, V>();
			for (const [key, value] of _Map) {
				if (fn(value, key)) {
					results.Set(key, value);
				}
			}
			return results;
		},

        // Finds a value in the collection that satisfies a test.
		Find(fn: (value: V, key: K) => boolean): V | undefined {
			for (const [key, value] of _Map) {
				if (fn(value, key)) {
					return value;
				}
			}
			return undefined;
		},

        // Finds a key in the collection that satisfies a test on its associated value.
		FindKey(fn: (value: V, key: K) => boolean): K | undefined {
			for (const [key, value] of _Map) {
				if (fn(value, key)) {
					return key;
				}
			}
			return undefined;
		},

        // Retrieves the first value or first 'count' values from the collection.
		First(count?: number): V | V[] | undefined {
			const iterator = _Map[Symbol.iterator]();

			if (count === undefined) {
				const first = iterator.next();
				return first.done ? undefined : first.value[1];
			}

			if (count < 0) {
				return [];
			}

			const values: V[] = [];
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
		FlatMap<U extends defined>(fn: (value: V, key: K) => U[]): U[] {
			const results: U[] = [];
			_Map.forEach((value, key) => {
				const mappedValues = fn(value, key);
				mappedValues.forEach((mappedValue) => {
					results.push(mappedValue);
				});
			});
			return results;
		},

        // Executes a function for each entry in the collection.
		ForEach(fn: (value: V, key: K) => void): void {
			for (const [key, value] of _Map) {
				fn(value, key);
			}
		},

        // Checks if an entry with the specified key exists in the collection.
		Has(key: K): boolean {
			return _Map.has(key);
		},

        // Checks if entries for all specified keys exist in the collection.
		HasAll(...keys: K[]): boolean {
			return keys.every((key: K) => _Map.has(key));
		},

        // Checks if an entry for any of the specified keys exists in the collection.
		HasAny(...keys: K[]): boolean {
			return keys.some((key: K) => _Map.has(key));
		},

        // Returns a new collection containing only the entries that are also present in the provided collection.
		Intersect(collection: Collection<K, V>): Collection<K, V> {
			const clone = methods(state).Clone();
			collection.ForEach((value, key) => {
				if (!clone.Has(key)) {
					clone.Delete(key);
				}
			});
			return clone;
		},

        // Checks if the collection is empty.
		IsEmpty(): boolean {
			return _Map.size() === 0;
		},

        // Converts the collection into an array of its keys.
		KeyArray(): K[] {
			const keys: K[] = [];
			_Map.forEach((_value, key) => {
				keys.push(key);
			});
			return keys;
		},

        // Retrieves the key at the specified index from the collection.
		KeyAt(index: number): K | undefined {
			const keys = methods(state).KeyArray();
			const normalizedIndex = index >= 0 ? index : keys.size() + index;
			return keys[normalizedIndex];
		},

        // Converts the collection into an array of its keys.
		Keys(): K[] {
			return methods(state).KeyArray();
		},

        // Retrieves the last value in the collection.
		Last(): V | V[] | undefined {
			const iterator = _Map[Symbol.iterator]();
			let iteratorResult = iterator.next();
			let last: V | undefined = undefined;
			while (!iteratorResult.done) {
				last = iteratorResult.value[1];
				iteratorResult = iterator.next();
			}
			return last;
		},

        // Retrieves the last key in the collection.
		LastKey(): K | undefined {
			const iterator = _Map[Symbol.iterator]();
			let iteratorResult = iterator.next();
			let lastKey: K | undefined = undefined;
			while (!iteratorResult.done) {
				lastKey = iteratorResult.value[0];
				iteratorResult = iterator.next();
			}
			return lastKey;
		},

        // Maps each entry in the collection into a new array using a function.
		Map<T extends defined>(fn: (value: V, key: K) => T): T[] {
			const arr: T[] = [];
			_Map.forEach((value, key) => {
				arr.push(fn(value, key));
			});
			return arr;
		},

        // Returns a new collection with values modified based on a function.
		MapValues(fn: (value: V, key: K) => V): Collection<K, V> {
			const clone = methods(state).Clone();
			clone.ForEach((value, key) => {
				clone.Set(key, fn(value, key));
			});
			return clone;
		},

        // Merges the collection with another one based on some merge criteria.
		Merge<T extends V>(
			collection: Collection<K, T>,
			whenInSelf: (value: V, key: K) => Keep<V>,
			whenInOther: (valueOther: T, key: K) => Keep<V>,
			whenInBoth: (value: V, valueOther: T, key: K) => Keep<V>,
		): Collection<K, V> {
			const clone = methods(state).Clone();
			collection.ForEach((value, key) => {
				if (clone.Has(key)) {
					const keep = whenInBoth(clone.Get(key)!, value, key);
					if (keep.keep) {
						clone.Set(key, keep.value);
					} else {
						clone.Delete(key);
					}
				} else {
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
		Partition(fn: (value: V, key: K) => boolean): [Collection<K, V>, Collection<K, V>] {
			const clone = methods(state).Clone();
			const truthy = Collection<K, V>();
			const falsy = Collection<K, V>();
			clone.ForEach((value, key) => {
				if (fn(value, key)) {
					truthy.Set(key, value);
				} else {
					falsy.Set(key, value);
				}
			});
			return [truthy, falsy];
		},

        // Retrieves a random value from the collection.
		Random(): V | undefined {
			const values = methods(state).Array();
			return values[math.floor(math.random() * values.size())];
		},

        // Retrieves a random key from the collection.
		RandomKey(): K | undefined {
			const keys = methods(state).KeyArray();
			return keys[math.floor(math.random() * keys.size())];
		},

        // Reduces the collection to a single value using a function.
		Reduce<T>(fn: (accumulator: T, value: V, key: K) => T, initial: T): T {
			let accumulator = initial;
			for (const [key, value] of _Map) {
				accumulator = fn(accumulator, value, key);
			}
			return accumulator;
		},

        // Reverses the order of entries in the collection.
		Reverse(): Collection<K, V> {
			const clone = methods(state).Clone();
			const entries = clone.Entries();
			clone.Clear();
			entries.forEach(([key, value]) => {
				clone.Set(key, value);
			});
			return clone;
		},

        // Adds an entry with a specified key and value to the collection.
		Set(key: K, value: V): V {
			_Map.set(key, value);
			_Events.OnAdd.Fire(value);
			return value;
		},

        // Returns the number of entries in the collection.
		Size(): number {
			return _Map.size();
		},

        // Checks if any entry in the collection satisfies a test.
		Some(fn: (value: V, key: K) => boolean): boolean {
			for (const [key, value] of _Map) {
				if (fn(value, key)) {
					return true;
				}
			}
			return false;
		},

        // Returns a new collection sorted based on the provided comparator function.
        Sort(fn: (a: V, b: V) => number): Collection<K, V> {
            // Gather entries from the map
            const entries: [K, V][] = [];
            _Map.forEach((value, key) => {
                entries.push([key, value]);
            });
        
            // Implementing Bubble Sort
            let swapped: boolean;
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
            const sortedCollection = Collection<K, V>();
            for (const [key, value] of entries) {
                sortedCollection.Set(key, value);
            }
        
            return sortedCollection;
        },        

        // Removes entries from the collection that satisfy a test and returns the count of removed entries.
		Sweep(fn: (value: V, key: K) => boolean): number {
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
		Tap(fn: (collection: Collection<K, V>) => void): Collection<K, V> {
			const Module =  { ...state, ...methods(state), IsDestroyed: () => IsDestroyed(state) };
			const Declared = DeclareModule(Module);
			fn(Declared);
			return Declared;
		},

        // Converts the collection into an array of its values.
		ToJSON(): V[] {
			return [...methods(state).Values()];
		},

        // Converts the collection into an array of its values.
		Values(): V[] {
			const values: V[] = [];
			_Map.forEach((value) => {
				values.push(value);
			});
			return values;
		},

		..._Events,
	});

	const IsDestroyed = (state: CollectionParams<K, V>) => state.IsDestroyed;

	const Module =  { ...state, ...methods(state), IsDestroyed: () => IsDestroyed(state) };
	return DeclareModule(Module);
}

export declare type Collection<K, V> = CollectionMethods<K, V> & BaseModule;
export declare type Keep<V> = { keep: false } | { keep: true; value: V };
export declare type Comparator<K, V> = (a: [K, V], b: [K, V]) => boolean;

export interface CollectionEvents<K, V> {
	OnAdd: EventModule<V>;
	OnDestroy: EventModule<Map<K, V>>;
	OnRemove: EventModule<V>;
}

export interface CollectionParams<K, V> {
	IsDestroyed: boolean;
}

export interface CollectionMethods<K, V> extends CollectionEvents<K, V> {
	Array(): V[];
	At(index: number): V | undefined;
	Clear(): void;
	Clone(): Collection<K, V>;
	Concat(...collections: Collection<K, V>[]): Collection<K, V>;
	Delete(key: K): boolean;
	Destroy(): void;
	Difference(collection: Collection<K, V>): Collection<K, V>;
	Each(fn: (value: V, key: K) => void): Collection<K, V>;
	Ensure(key: K, defaultValue: V): V;
	Entries(): [K, V][];
	Equals(collection: Collection<K, V>): boolean;
	Every(fn: (value: V, key: K) => boolean): boolean;
	Filter(fn: (value: V, key: K) => boolean): Collection<K, V>;
	Find(fn: (value: V, key: K) => boolean): V | undefined;
	FindKey(fn: (value: V, key: K) => boolean): K | undefined;
	First(): V | V[] | undefined;
	FlatMap<U extends defined>(fn: (value: V, key: K) => U[]): U[];
	ForEach(fn: (value: V, key: K) => void): void;
	Get(key: K): V | undefined;
	Has(key: K): boolean;
	HasAll(...keys: K[]): boolean;
	HasAny(...keys: K[]): boolean;
	Intersect(collection: Collection<K, V>): Collection<K, V>;
	IsEmpty(): boolean;
	KeyArray(): K[];
	KeyAt(index: number): K | undefined;
	Keys(): K[];
	Last(): V | V[] | undefined;
	LastKey(): K | undefined;
	Map<T extends defined>(fn: (value: V, key: K) => T): T[];
	MapValues(fn: (value: V, key: K) => V): Collection<K, V>;
	Merge<T extends V>(
		collection: Collection<K, T>,
		whenInSelf: (value: V, key: K) => Keep<V>,
		whenInOther: (valueOther: T, key: K) => Keep<V>,
		whenInBoth: (value: V, valueOther: T, key: K) => Keep<V>,
	): Collection<K, V>;
	Partition(fn: (value: V, key: K) => boolean): [Collection<K, V>, Collection<K, V>];
	Random(): V | undefined;
	RandomKey(): K | undefined;
	Reduce<T>(fn: (accumulator: T, value: V, key: K) => T, initialValue: T): T;
	Reverse(): Collection<K, V>;
	Set(key: K, value: V): V;
	Size(): number;
	Some(fn: (value: V, key: K) => boolean): boolean;
    Sort(fn: (a: V, b: V) => number): Collection<K, V>;
	Sweep(fn: (value: V, key: K) => boolean): number;
	Tap(fn: (collection: Collection<K, V>) => void): Collection<K, V>;
	ToJSON(): V[];
	Values(): V[];
}
