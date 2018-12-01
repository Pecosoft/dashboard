export default function (status) {
  return status === 0 ? '未回复'
    : status === 1 ? '已回复' : 'unknown'
}
