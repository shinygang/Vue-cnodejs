//IE9-不支持数组的indexOf()
if (!Array.prototype.indexOf) {
  Array.prototype.indexOf = function (value) {
    for (var i = 0, len = this.length; i < len; i++) {
      if (this[i] == value) {
        return i
      }
    }
    return -1
  }
}

//检查ele是否有className
function hasClass(ele, className) {
  if (ele && ele.className) {
    var classes = ele.className.split(/\s+/)//这里必须要切成数组之后再判断
    if (classes.indexOf(className) != -1) {
      return true
    }
  }
  return false
}

// 判断arr是否为一个数组，返回一个bool值
function isArray(arr) {
  return Array.isArray(arr) || Object.prototype.toString.call(arr) === "[object Array]"
}

// 对字符串头尾进行空格字符的去除、包括全角半角空格、Tab等，返回一个字符串
function trim(str) {
  return str.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "")
}

//把一个类数组转换成数组
function toArray(obj) {
  if (obj.nodeType == 1) {
    return [obj]
  }
  var arr = []
  for (var i = 0; i < obj.length; i++) {
    arr.push(obj[i])
  }
  return arr
}

export default function selector(selector) {
  var all = selector.split(/\s+/)
  var result = [], rooot = [document]
  for (var i = 0; i < all.length; i++) {
    var type = all[i][0]
    switch (type) {
      //ID
      case "#":
        for (var j = 0; j < rooot.length; j++) {
          var ele = rooot[j].getElementById(all[i].slice(1))
          if (ele) {
            result.push(ele)
          }
        }
        break

      //class
      case ".":
        for (var j = 0; j < rooot.length; j++) {
          if (document.getElementsByClassName) {
            var eles = rooot[j].getElementsByClassName(all[i].slice(1))
            if (eles) {
              result = result.concat(Array.prototype.slice.call(eles))
            }
          } else {
            var arr = rooot[j].getElementsByTagName("*")
            for (var i = 0; i < arr.length; i++) {
              if (hasClass(arr[i], className)) {
                result.push(arr[i])
              }
            }
          }
        }
        break
      //属性
      case "[":
        var att = all[i].slice(1, all[i].length - 1).split("=")
        var key = att[0], value = att[1]
        for (var j = 0; j < rooot.length; j++) {
          var eles = rooot[j].getElementsByTagName("*")
          for (var i = 0; i < eles.length; i++) {
            if (value) {
              for (var i = 0; i < eles.length; i++) {
                if (eles[i].getAttribute(key) == value) {
                  result.push(eles[i])
                }
              }
            } else {
              for (var i = 0; i < eles.length; i++) {
                if (eles[i].getAttribute(key)) {
                  result.push(eles[i])
                }
              }
            }
          }
        }
        break
      //tag
      default:
        for (var j = 0; j < rooot.length; j++) {
          eles = rooot[j].getElementsByTagName(all[i])
          if (eles) {
            result = result.concat(Array.prototype.slice.call(eles))
          }
        }
    }//switch
    rooot = result
    result = []
  }//for
  return rooot[0]
}
