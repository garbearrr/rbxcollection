-- Compiled with roblox-ts v2.2.0
local TS = _G[script]
local DeclareModule = TS.import(script, TS.getModule(script, "@rbxgar", "basemodule").dist["mod.js"]).DeclareModule
local EventModule = TS.import(script, TS.getModule(script, "@rbxgar", "event").dist["mod.js"]).EventModule
local function Collection()
	local _Map = {}
	local _Events = {
		OnAdd = EventModule(),
		OnDestroy = EventModule(),
		OnRemove = EventModule(),
	}
	local state = {
		IsDestroyed = false,
	}
	local methods, IsDestroyed
	methods = function(state)
		local _object = {
			Array = function(self)
				local values = {}
				local _arg0 = function(value)
					local _value = value
					table.insert(values, _value)
				end
				for _k, _v in _Map do
					_arg0(_v, _k, _Map)
				end
				return values
			end,
			At = function(self, index)
				local values = methods(state):Array()
				local normalizedIndex = if index >= 0 then index else #values + index
				return values[normalizedIndex + 1]
			end,
			Clear = function(self)
				table.clear(_Map)
			end,
			Clone = function(self)
				local clone = Collection()
				local _arg0 = function(value, key)
					clone:Set(key, value)
				end
				for _k, _v in _Map do
					_arg0(_v, _k, _Map)
				end
				return clone
			end,
			Concat = function(self, ...)
				local collections = { ... }
				local clone = methods(state):Clone()
				local _collections = collections
				local _arg0 = function(collection)
					collection:ForEach(function(value, key)
						clone:Set(key, value)
					end)
				end
				for _k, _v in _collections do
					_arg0(_v, _k - 1, _collections)
				end
				return clone
			end,
			Delete = function(self, key)
				local _key = key
				-- ▼ Map.delete ▼
				local _valueExisted = _Map[_key] ~= nil
				_Map[_key] = nil
				-- ▲ Map.delete ▲
				return _valueExisted
			end,
			Destroy = function(self)
				_Events.OnDestroy:Fire(_Map)
				for _Event in pairs(_Events) do
					_Events[_Event]:Destroy()
				end
				table.clear(_Map)
			end,
			Difference = function(self, collection)
				local clone = methods(state):Clone()
				collection:ForEach(function(value, key)
					if clone:Has(key) then
						clone:Delete(key)
					end
				end)
				return clone
			end,
			Get = function(self, key)
				local _key = key
				return _Map[_key]
			end,
			Each = function(self, fn)
				local _arg0 = function(value, key)
					fn(value, key)
				end
				for _k, _v in _Map do
					_arg0(_v, _k, _Map)
				end
				local _object_1 = {}
				for _k, _v in state do
					_object_1[_k] = _v
				end
				for _k, _v in methods(state) do
					_object_1[_k] = _v
				end
				_object_1.IsDestroyed = function()
					return IsDestroyed(state)
				end
				local Module = _object_1
				return DeclareModule(Module)
			end,
			Ensure = function(self, key, defaultValue)
				local _key = key
				if not (_Map[_key] ~= nil) then
					local _key_1 = key
					local _defaultValue = defaultValue
					_Map[_key_1] = _defaultValue
				end
				local _key_1 = key
				return _Map[_key_1]
			end,
			Entries = function(self)
				local entries = {}
				local _arg0 = function(value, key)
					local _arg0_1 = { key, value }
					table.insert(entries, _arg0_1)
				end
				for _k, _v in _Map do
					_arg0(_v, _k, _Map)
				end
				return entries
			end,
			Equals = function(self, collection)
				-- ▼ ReadonlyMap.size ▼
				local _size = 0
				for _ in _Map do
					_size += 1
				end
				-- ▲ ReadonlyMap.size ▲
				if _size ~= collection:Size() then
					return false
				end
				for key, value in _Map do
					if not collection:Has(key) or collection:Get(key) ~= value then
						return false
					end
				end
				return true
			end,
			Every = function(self, fn)
				for key, value in _Map do
					if not fn(value, key) then
						return false
					end
				end
				return true
			end,
			Filter = function(self, fn)
				local results = Collection()
				for key, value in _Map do
					if fn(value, key) then
						results:Set(key, value)
					end
				end
				return results
			end,
			Find = function(self, fn)
				for key, value in _Map do
					if fn(value, key) then
						return value
					end
				end
				return nil
			end,
			FindKey = function(self, fn)
				for key, value in _Map do
					if fn(value, key) then
						return key
					end
				end
				return nil
			end,
			First = function(self, count)
				local iterator = _Map[Symbol.iterator](_Map)
				if count == nil then
					local first = iterator.next()
					return if first.done then nil else first.value[2]
				end
				if count < 0 then
					return {}
				end
				local values = {}
				local iterCount = 0
				local iteratorResult = iterator.next()
				while not iteratorResult.done and iterCount < count do
					local _arg0 = iteratorResult.value[2]
					table.insert(values, _arg0)
					iterCount += 1
					iteratorResult = iterator.next()
				end
				return if #values == 0 then nil elseif #values == 1 then values[1] else values
			end,
			FlatMap = function(self, fn)
				local results = {}
				local _arg0 = function(value, key)
					local mappedValues = fn(value, key)
					local _arg0_1 = function(mappedValue)
						local _mappedValue = mappedValue
						table.insert(results, _mappedValue)
					end
					for _k, _v in mappedValues do
						_arg0_1(_v, _k - 1, mappedValues)
					end
				end
				for _k, _v in _Map do
					_arg0(_v, _k, _Map)
				end
				return results
			end,
			ForEach = function(self, fn)
				for key, value in _Map do
					fn(value, key)
				end
			end,
			Has = function(self, key)
				local _key = key
				return _Map[_key] ~= nil
			end,
			HasAll = function(self, ...)
				local keys = { ... }
				local _keys = keys
				local _arg0 = function(key)
					local _key = key
					return _Map[_key] ~= nil
				end
				-- ▼ ReadonlyArray.every ▼
				local _result = true
				for _k, _v in _keys do
					if not _arg0(_v, _k - 1, _keys) then
						_result = false
						break
					end
				end
				-- ▲ ReadonlyArray.every ▲
				return _result
			end,
			HasAny = function(self, ...)
				local keys = { ... }
				local _keys = keys
				local _arg0 = function(key)
					local _key = key
					return _Map[_key] ~= nil
				end
				-- ▼ ReadonlyArray.some ▼
				local _result = false
				for _k, _v in _keys do
					if _arg0(_v, _k - 1, _keys) then
						_result = true
						break
					end
				end
				-- ▲ ReadonlyArray.some ▲
				return _result
			end,
			Intersect = function(self, collection)
				local clone = methods(state):Clone()
				collection:ForEach(function(value, key)
					if not clone:Has(key) then
						clone:Delete(key)
					end
				end)
				return clone
			end,
			IsEmpty = function(self)
				-- ▼ ReadonlyMap.size ▼
				local _size = 0
				for _ in _Map do
					_size += 1
				end
				-- ▲ ReadonlyMap.size ▲
				return _size == 0
			end,
			KeyArray = function(self)
				local keys = {}
				local _arg0 = function(_value, key)
					local _key = key
					table.insert(keys, _key)
				end
				for _k, _v in _Map do
					_arg0(_v, _k, _Map)
				end
				return keys
			end,
			KeyAt = function(self, index)
				local keys = methods(state):KeyArray()
				local normalizedIndex = if index >= 0 then index else #keys + index
				return keys[normalizedIndex + 1]
			end,
			Keys = function(self)
				return methods(state):KeyArray()
			end,
			Last = function(self)
				local iterator = _Map[Symbol.iterator](_Map)
				local iteratorResult = iterator.next()
				local last = nil
				while not iteratorResult.done do
					last = iteratorResult.value[2]
					iteratorResult = iterator.next()
				end
				return last
			end,
			LastKey = function(self)
				local iterator = _Map[Symbol.iterator](_Map)
				local iteratorResult = iterator.next()
				local lastKey = nil
				while not iteratorResult.done do
					lastKey = iteratorResult.value[1]
					iteratorResult = iterator.next()
				end
				return lastKey
			end,
			Map = function(self, fn)
				local arr = {}
				local _arg0 = function(value, key)
					local _arg0_1 = fn(value, key)
					table.insert(arr, _arg0_1)
				end
				for _k, _v in _Map do
					_arg0(_v, _k, _Map)
				end
				return arr
			end,
			MapValues = function(self, fn)
				local clone = methods(state):Clone()
				clone:ForEach(function(value, key)
					clone:Set(key, fn(value, key))
				end)
				return clone
			end,
			Merge = function(self, collection, whenInSelf, whenInOther, whenInBoth)
				local clone = methods(state):Clone()
				collection:ForEach(function(value, key)
					if clone:Has(key) then
						local keep = whenInBoth(clone:Get(key), value, key)
						if keep.keep then
							clone:Set(key, keep.value)
						else
							clone:Delete(key)
						end
					else
						local keep = whenInOther(value, key)
						if keep.keep then
							clone:Set(key, keep.value)
						end
					end
				end)
				clone:ForEach(function(value, key)
					local keep = whenInSelf(value, key)
					if not keep.keep then
						clone:Delete(key)
					end
				end)
				return clone
			end,
			Partition = function(self, fn)
				local clone = methods(state):Clone()
				local truthy = Collection()
				local falsy = Collection()
				clone:ForEach(function(value, key)
					if fn(value, key) then
						truthy:Set(key, value)
					else
						falsy:Set(key, value)
					end
				end)
				return { truthy, falsy }
			end,
			Random = function(self)
				local values = methods(state):Array()
				return values[math.floor(math.random() * #values) + 1]
			end,
			RandomKey = function(self)
				local keys = methods(state):KeyArray()
				return keys[math.floor(math.random() * #keys) + 1]
			end,
			Reduce = function(self, fn, initial)
				local accumulator = initial
				for key, value in _Map do
					accumulator = fn(accumulator, value, key)
				end
				return accumulator
			end,
			Reverse = function(self)
				local clone = methods(state):Clone()
				local entries = clone:Entries()
				clone:Clear()
				local _arg0 = function(_param)
					local key = _param[1]
					local value = _param[2]
					clone:Set(key, value)
				end
				for _k, _v in entries do
					_arg0(_v, _k - 1, entries)
				end
				return clone
			end,
			Set = function(self, key, value)
				local _key = key
				local _value = value
				_Map[_key] = _value
				_Events.OnAdd:Fire(value)
				return value
			end,
			Size = function(self)
				-- ▼ ReadonlyMap.size ▼
				local _size = 0
				for _ in _Map do
					_size += 1
				end
				-- ▲ ReadonlyMap.size ▲
				return _size
			end,
			Some = function(self, fn)
				for key, value in _Map do
					if fn(value, key) then
						return true
					end
				end
				return false
			end,
			Sort = function(self, fn)
				-- Gather entries from the map
				local entries = {}
				local _arg0 = function(value, key)
					local _arg0_1 = { key, value }
					table.insert(entries, _arg0_1)
				end
				for _k, _v in _Map do
					_arg0(_v, _k, _Map)
				end
				-- Implementing Bubble Sort
				local swapped
				repeat
					do
						swapped = false
						do
							local i = 0
							local _shouldIncrement = false
							while true do
								if _shouldIncrement then
									i += 1
								else
									_shouldIncrement = true
								end
								if not (i < #entries - 1) then
									break
								end
								if fn(entries[i + 1][2], entries[i + 1 + 1][2]) > 0 then
									local _index = i + 1
									local _index_1 = i + 1 + 1
									entries[_index], entries[_index_1] = entries[i + 1 + 1], entries[i + 1]
									swapped = true
								end
							end
						end
					end
				until not swapped
				-- Create a new sorted collection
				local sortedCollection = Collection()
				for _, _binding in entries do
					local key = _binding[1]
					local value = _binding[2]
					sortedCollection:Set(key, value)
				end
				return sortedCollection
			end,
			Sweep = function(self, fn)
				local count = 0
				local _arg0 = function(value, key)
					if fn(value, key) then
						local _key = key
						_Map[_key] = nil
						count += 1
					end
				end
				for _k, _v in _Map do
					_arg0(_v, _k, _Map)
				end
				return count
			end,
			Tap = function(self, fn)
				local _object_1 = {}
				for _k, _v in state do
					_object_1[_k] = _v
				end
				for _k, _v in methods(state) do
					_object_1[_k] = _v
				end
				_object_1.IsDestroyed = function()
					return IsDestroyed(state)
				end
				local Module = _object_1
				local Declared = DeclareModule(Module)
				fn(Declared)
				return Declared
			end,
			ToJSON = function(self)
				local _array = {}
				local _length = #_array
				local _array_1 = methods(state):Values()
				table.move(_array_1, 1, #_array_1, _length + 1, _array)
				return _array
			end,
			Values = function(self)
				local values = {}
				local _arg0 = function(value)
					local _value = value
					table.insert(values, _value)
				end
				for _k, _v in _Map do
					_arg0(_v, _k, _Map)
				end
				return values
			end,
		}
		for _k, _v in _Events do
			_object[_k] = _v
		end
		return _object
	end
	IsDestroyed = function(state)
		return state.IsDestroyed
	end
	local _object = {}
	for _k, _v in state do
		_object[_k] = _v
	end
	for _k, _v in methods(state) do
		_object[_k] = _v
	end
	_object.IsDestroyed = function()
		return IsDestroyed(state)
	end
	local Module = _object
	return DeclareModule(Module)
end
return {
	Collection = Collection,
}
