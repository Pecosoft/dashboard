export default function (timestamp) {
  timestamp = parseInt(timestamp)
  if (String(timestamp).length <= 11) timestamp *= 1000

  let dt = new Date(timestamp)

  return dt.getFullYear() + '-' + (dt.getMonth() + 1) + '-' + dt.getDate() + ' ' +
    dt.getHours() + ':' + dt.getMinutes() + ':' + dt.getSeconds()
}
