/**
 * [Flattens a two dimensional array]
 * @param  {[Array]} arr [Two dimensional array]
 * @return {[Array]}     [One dimensional array]
 */
module.exports.flatten = function (arr) {
    return Array.prototype.concat(...arr)
}

module.exports.isParamEmpty = function (obj){
  return (Object.entries(obj).length === 0 && obj.constructor === Object)
}
