export default (localData, page, size) => {
  let len = localData.length
  let start = (page - 1) * size
  let end = start + size
  if (end <= len) {
    // 本地数据足够，不需要从远程获取
    return false
  }
  let needStart = len
  let needEnd = needStart + (end - len)
  return {
    start: needStart,
    end: needEnd
  }
}
