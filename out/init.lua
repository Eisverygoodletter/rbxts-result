-- Compiled with roblox-ts v2.1.0
--[[
	*
	* A callback that receives type T and returns type R
]]
--[[
	*
	* DO NOT USE THIS CLASS
	* @internal
	* A common base class both `Ok` and `Err` both inherit from
]]
local _Result
do
	_Result = {}
	function _Result:constructor()
	end
	function _Result:isErr()
		return not self:isOk()
	end
	function _Result:unsafeUnwrap()
		return self.value
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
	function Ok:isOk()
		return true
	end
	function Ok:unwrapFunc(okCallback, errCallback)
		return okCallback(self.value)
	end
	function Ok:unwrapOr(alternative)
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
	function Err:isOk()
		return false
	end
	function Err:unwrapFunc(okCallback, errCallback)
		return errCallback(self.value)
	end
	function Err:unwrapOr(alternative)
		return alternative
	end
end
return {
	Ok = Ok,
	Err = Err,
}
