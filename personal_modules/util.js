module.exports.flatten = function (arr) {
    return Array.prototype.concat(...arr)
}

module.exports.isParamEmpty = function (obj){
  return (Object.entries(obj).length === 0 && obj.constructor === Object) 
}
