<template>
    <div>
          <p>
            <span>书写于 {{ humanDayToNow(dayjsCreatedAt) }}</span>
            <span v-if="dayjsUpdatedAt.isValid()">
                , 最近一次更新于 {{ humanDayToNow(dayjsUpdatedAt) }}
            </span>
          </p>
         <strong v-if="expired">注意: 这篇文章已经有相当一段时间没有更新了. <br/> 文章中任何有时效性的信息应当在仔细审阅后再使用. <br/> 如果有任何更新建议, 请留言. </strong>
    </div>
</template>

<script>
import { dayjs, toDayjs, formatDate, dayToNow, humanDayToNow } from "../utils/date";

export default {
    props: ["createdAt", "updatedAt"],
    data(){
        return {
            expiredDays: 180
        }
    },
    computed: {
        dayjsCreatedAt() {
            return toDayjs(this.createdAt)
        },
        dayjsUpdatedAt() {
            return toDayjs(this.updatedAt)
        },
        lastUpdate() {
            return this.dayjsUpdatedAt.isValid() ? dayjs.max(this.dayjsCreatedAt, this.dayjsUpdatedAt) : this.dayjsCreatedAt
        },
        days() {
            return dayToNow(this.lastUpdate)
        },
        expired() {
            return this.days > this.expiredDays
        }
    },
    methods: {
        humanDayToNow
    }
}
</script>