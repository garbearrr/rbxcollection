/// <reference types="@rbxts/compiler-types" />
/// <reference types="@rbxts/compiler-types" />
import { BaseModule } from "@rbxgar/basemodule";
import { EventModule } from "@rbxgar/event";
export declare function Collection<K extends defined, V extends defined>(): Collection<K, V>;
export declare type Collection<K, V> = CollectionMethods<K, V> & BaseModule;
export declare type Keep<V> = {
    keep: false;
} | {
    keep: true;
    value: V;
};
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
    /**
     * Converts the collection into an array of its values.
     */
    Array(): V[];
    /**
     * Retrieves the value at the specified index from the collection.
     */
    At(index: number): V | undefined;
    /**
     * Removes all entries from the collection.
     */
    Clear(): void;
    /**
     * Creates and returns a new collection with the same entries as the original.
     */
    Clone(): Collection<K, V>;
    /**
     * Merges the current collection with one or more other collections.
     */
    Concat(...collections: Collection<K, V>[]): Collection<K, V>;
    /**
     * Removes the entry with the specified key from the collection.
     */
    Delete(key: K): boolean;
    /**
     * Deconstructor marking the object as destroyed. This will fire the OnDestroy event.
     */
    Destroy(): void;
    /**
     * Returns a new collection containing entries not present in the provided collection.
     */
    Difference(collection: Collection<K, V>): Collection<K, V>;
    /**
     * Retrieves the value associated with the specified key from the collection.
     */
    Each(fn: (value: V, key: K) => void): Collection<K, V>;
    /**
     * Ensures an entry with the specified key exists in the collection. If not, sets it with a default value.
     */
    Ensure(key: K, defaultValue: V): V;
    /**
     * Returns an array of [key, value] pairs from the collection.
     */
    Entries(): [K, V][];
    /**
     * Compares the collection with another one for equality.
     */
    Equals(collection: Collection<K, V>): boolean;
    /**
     * Checks if every entry in the collection satisfies a test.
     */
    Every(fn: (value: V, key: K) => boolean): boolean;
    /**
     * Filters the collection based on a test and returns a new collection.
     */
    Filter(fn: (value: V, key: K) => boolean): Collection<K, V>;
    /**
     * Finds a value in the collection that satisfies a test.
     */
    Find(fn: (value: V, key: K) => boolean): V | undefined;
    /**
     * Finds a key in the collection that satisfies a test on its associated value.
     */
    FindKey(fn: (value: V, key: K) => boolean): K | undefined;
    /**
     * Retrieves the first value or first 'count' values from the collection.
     */
    First(): V | V[] | undefined;
    /**
     * Maps each entry in the collection into an array using a function, then flattens the result into a single array.
     */
    FlatMap<U extends defined>(fn: (value: V, key: K) => U[]): U[];
    /**
     * Executes a function for each entry in the collection.
     */
    ForEach(fn: (value: V, key: K) => void): void;
    Get(key: K): V | undefined;
    /**
     * Checks if an entry with the specified key exists in the collection.
     */
    Has(key: K): boolean;
    /**
     * Checks if entries for all specified keys exist in the collection.
     */
    HasAll(...keys: K[]): boolean;
    /**
     * Checks if an entry for any of the specified keys exists in the collection.
     */
    HasAny(...keys: K[]): boolean;
    /**
     * Returns a new collection containing only the entries that are also present in the provided collection.
     */
    Intersect(collection: Collection<K, V>): Collection<K, V>;
    /**
     * Checks if the collection is empty.
     */
    IsEmpty(): boolean;
    /**
     * Converts the collection into an array of its keys.
     */
    KeyArray(): K[];
    /**
     * Retrieves the key at the specified index from the collection.
     */
    KeyAt(index: number): K | undefined;
    /**
     * Converts the collection into an array of its keys.
     */
    Keys(): K[];
    /**
     * Retrieves the last value in the collection.
     */
    Last(): V | V[] | undefined;
    /**
     * Retrieves the last key in the collection.
     */
    LastKey(): K | undefined;
    /**
     * Maps each entry in the collection into a new array using a function.
     */
    Map<T extends defined>(fn: (value: V, key: K) => T): T[];
    /**
     * Returns a new collection with values modified based on a function.
     */
    MapValues(fn: (value: V, key: K) => V): Collection<K, V>;
    /**
     * Merges the collection with another one based on some merge criteria.
     */
    Merge<T extends V>(collection: Collection<K, T>, whenInSelf: (value: V, key: K) => Keep<V>, whenInOther: (valueOther: T, key: K) => Keep<V>, whenInBoth: (value: V, valueOther: T, key: K) => Keep<V>): Collection<K, V>;
    /**
     * Splits the collection into two based on a test. One with entries that pass the test and another with entries that fail.
     */
    Partition(fn: (value: V, key: K) => boolean): [Collection<K, V>, Collection<K, V>];
    /**
     * Retrieves a random value from the collection.
     */
    Random(): V | undefined;
    /**
     * Retrieves a random key from the collection.
     */
    RandomKey(): K | undefined;
    /**
     * Reduces the collection to a single value using a function.
     */
    Reduce<T>(fn: (accumulator: T, value: V, key: K) => T, initialValue: T): T;
    /**
     * Reverses the order of entries in the collection.
     */
    Reverse(): Collection<K, V>;
    /**
     * Adds an entry with a specified key and value to the collection.
     */
    Set(key: K, value: V): V;
    /**
     * Returns the number of entries in the collection.
     */
    Size(): number;
    /**
     * Checks if any entry in the collection satisfies a test.
     */
    Some(fn: (value: V, key: K) => boolean): boolean;
    /**
     * Returns a new collection sorted based on the provided comparator function.
     */
    Sort(fn: (a: V, b: V) => number): Collection<K, V>;
    /**
     * Removes entries from the collection that satisfy a test and returns the count of removed entries.
     */
    Sweep(fn: (value: V, key: K) => boolean): number;
    /**
     * Executes a function with the collection and returns the collection.
     */
    Tap(fn: (collection: Collection<K, V>) => void): Collection<K, V>;
    /**
     * Converts the collection into an array of its values.
     */
    ToJSON(): V[];
    /**
     * Converts the collection into an array of its values.
     */
    Values(): V[];
}
