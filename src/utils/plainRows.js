export default rows => {
  let plainRows = []
  for (let i = 0, len = rows.length; i < len; i++) {
    let row = rows[i]
    let plainRow = {}
    for (let field in row) {
      if (typeof row[field] !== typeof {}) {
        plainRow[field] = row[field]
      } else {
        let subRow = row[field]
        for (let subField in subRow) {
          if (typeof subRow[subField] !== typeof {}) {
            plainRow[field+'_'+subField] = subRow[subField]
          }
        }
      }
    }
    plainRows.push(plainRow)
  }
  return plainRows
}
