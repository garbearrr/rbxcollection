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
    Merge<T extends V>(collection: Collection<K, T>, whenInSelf: (value: V, key: K) => Keep<V>, whenInOther: (valueOther: T, key: K) => Keep<V>, whenInBoth: (value: V, valueOther: T, key: K) => Keep<V>): Collection<K, V>;
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
