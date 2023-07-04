-- Compiled with roblox-ts v2.1.0
--[[
	*
	* A callback that receives type {@link T} and returns type {@link R}
]]
--[[
	*
	* DO NOT USE THIS CLASS
	* @internal
	* A common base class both {@link Ok} and {@link Err} both inherit from
]]
local _Result
do
	_Result = {}
	function _Result:constructor()
	end
	function _Result:is_err()
		return not self:is_ok()
	end
	function _Result:unsafe_unwrap()
		return self.value
	end
	function _Result:unwrap_ok(msg)
		if self:is_ok() then
			return self:unsafe_unwrap()
		end
		if msg == nil then
			error({ "Attempted to unwrap Err() as Ok()", self })
		end
		error(msg)
	end
	function _Result:unwrap_err(msg)
		if self:is_err() then
			return self:unsafe_unwrap()
		end
		if msg == nil then
			error({ "Attempted to unwrap Ok() as Err()", self })
		end
		error(msg)
	end
end
local Ok
do
	local super = _Result
	Ok = setmetatable({}, {
		__tostring = function()
			return "Ok"
		end,
		__index = super,
	})
	Ok.__index = Ok
	function Ok.new(...)
		local self = setmetatable({}, Ok)
		return self:constructor(...) or self
	end
	function Ok:constructor(value)
		super.constructor(self)
		self.value = value
	end
	function Ok:is_ok()
		return true
	end
	function Ok:unwrap_func(okCallback, errCallback)
		return okCallback(self.value)
	end
	function Ok:unwrap_or(alternative)
		return self.value
	end
end
local Err
do
	local super = _Result
	Err = setmetatable({}, {
		__tostring = function()
			return "Err"
		end,
		__index = super,
	})
	Err.__index = Err
	function Err.new(...)
		local self = setmetatable({}, Err)
		return self:constructor(...) or self
	end
	function Err:constructor(value)
		super.constructor(self)
		self.value = value
	end
	function Err:is_ok()
		return false
	end
	function Err:unwrap_func(okCallback, errCallback)
		return errCallback(self.value)
	end
	function Err:unwrap_or(alternative)
		return alternative
	end
end
return {
	Ok = Ok,
	Err = Err,
}
