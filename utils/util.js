const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  return [year, month, day].map(formatNumber).join('.')
}
const week = (data,isNum = false) =>{
  const  week= ["星期日","星期一", "星期二", "星期三", "星期四", "星期五", "星期六"]
  if(isNum){
    return data.getDay()
  }
  return week[data.getDay()]
}
const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

module.exports = {
  formatTime: formatTime,
  week: week
}
