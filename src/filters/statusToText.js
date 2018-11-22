export default function (status) {
  return status === 0 ? '未受理'
    : status === 1 ? '已受理'
      : status === 2 ? '已派单'
        : status === 3 ? '已接单'
          : status === 4 ? '维修中'
            : status === 5 ? '已完成'
              : status === 6 ? '已评价' : 'unknown'
}
