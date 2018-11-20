export default row => {
  let fields = [];
  for (var field in row) {
    if (typeof row[field] !== typeof {}) {
      fields.push(field)
    }
  }
  return fields;
}
