import ExportJsonExcel from 'js-export-excel'

const exportExcel = (filePrefix, rows, cols) => {
  let option = {}
  let dt = new Date()
  dt = dt.getFullYear() + '' + (dt.getMonth() + 1) + '' + (dt.getDate() + 1)

  option.fileName = filePrefix + '_' + dt
  option.datas=[
    {
      sheetData: rows,
      sheetName: dt,
      sheetFilter: cols.map(col => col.prop),
      sheetHeader: cols.map(col => col.label),
      columnWidths: cols.map(col => parseInt(col.width))
    }
  ]

  return new ExportJsonExcel(option).saveExcel()
}

export default exportExcel
