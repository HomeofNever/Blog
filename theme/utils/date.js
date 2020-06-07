import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import LocalizedFormat from 'dayjs/plugin/localizedFormat'
import relativeTime from 'dayjs/plugin/relativeTime'
import minMax from 'dayjs/plugin/minMax'

import 'dayjs/locale/zh-cn'

dayjs.extend(customParseFormat)
dayjs.extend(LocalizedFormat)
dayjs.extend(relativeTime)
dayjs.extend(minMax)
const possibleFormat = ['YYYY-MM-DD', 'YYYY-MM-DD HH-mm-ss']

const toDayjs = (date) => date instanceof Date ? dayjs(date) : dayjs(date, possibleFormat, 'zh-cn')
const formatDate = (date)  => toDayjs(date).format('L')
const dayToNow = (date) => dayjs().diff(toDayjs(date), 'day')
const humanDayToNow  = (date) => toDayjs(date).fromNow()

export {
  dayjs,
  toDayjs,
  formatDate,
  dayToNow,
  humanDayToNow
}