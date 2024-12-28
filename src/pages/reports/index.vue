<script setup lang="ts">
import type { DateRange } from 'radix-vue'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  Pagination,
  PaginationEllipsis,
  PaginationList,
  PaginationListItem,
  PaginationNext,
  PaginationPrev,
} from '@/components/ui/pagination'
import DateRangePicker from '@/components/base/DateRangePicker.vue'
import { getRoomsApi } from '@/services/room'
import type { IPaging, ReportRoom } from '@/types'
import { useRouteQuery } from '@vueuse/router'
import { Button } from '@/components/ui/button'

const pageQuery = useRouteQuery<number>('page', 1)

const pageQueryComputed = computed({
  get: () => Number(pageQuery.value),
  set: (value) => {
    pageQuery.value = value
    fetchRooms()
  },
})

const rooms = ref<ReportRoom[]>([])
const meta = ref<IPaging>({
  has_next_page: false,
  has_previous_page: false,
  limit: 0,
  current_page: 0,
  total_pages: 0,
  total_records: 0,
})
const fetchRooms = async () => {
  const rangeDateBody: any = {
    // from_date: dateRange.value?.start?.toString() as string,
    // to_date: dateRange.value?.end?.toString() as string,
  }

  if (dateRange.value?.start) {
    rangeDateBody.from_date = dateRange.value.start.toString() as string
  }

  if (dateRange.value?.end) {
    rangeDateBody.to_date = dateRange.value.end.toString() as string
  }

  const { data, meta: paging } = await getRoomsApi(
    pageQueryComputed.value,
    dateRange.value ? rangeDateBody : undefined,
  )
  rooms.value = data
  meta.value = paging!
}

const dateRange = ref<DateRange | null>(null)

onBeforeMount(() => {
  fetchRooms()
})

const handleClearFilter = () => {
  dateRange.value = null
  fetchRooms()
}
</script>
<template>
  <div class="p-5 h-full flex flex-col">
    <h1 class="text-2xl font-medium text-black">Reports</h1>
    <p class="text-gray-500">This is the reports page. You can add your own content here.</p>
    <div class="flex items-center gap-5 mt-5">
      <DateRangePicker
        v-model="dateRange"
        class="w-60"
      />
      <Button
        class="btn btn-primary"
        @click="fetchRooms"
        >Filter</Button
      >

      <Button
        class="btn btn-primary"
        variant="outline"
        @click="handleClearFilter"
        >Clear filter</Button
      >
    </div>
    <p
      v-if="dateRange?.start || dateRange?.end"
      class="mt-3 text-gray-500"
    >
      Showing data from date
      <span v-if="dateRange?.start">
        {{ dateRange.start }}
      </span>
      to
      <span v-if="dateRange?.end">
        {{ dateRange.end }}
      </span>
    </p>
    <div
      class="flex flex-col justify-between w-full mt-3 flex-auto h-full overflow-hidden border rounded-2xl bg-white"
    >
      <Table class="w-full overflow-y-auto">
        <TableCaption v-if="rooms.length === 0"> No room! </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead class="w-[100px]"> Participants </TableHead>
            <TableHead class="text-center">Questions</TableHead>
            <TableHead>Room PIN</TableHead>
            <TableHead>Quizzfly name</TableHead>
            <TableHead> Time </TableHead>
            <TableHead> </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow
            v-for="room in rooms"
            :key="room.id"
          >
            <TableCell class="font-medium text-center">
              {{ room.participant_count }}
            </TableCell>
            <TableCell class="text-center">{{ room.question_count }}</TableCell>
            <TableCell>{{ room.room_pin }}</TableCell>
            <TableCell>
              {{ room.quizzfly?.title || 'Untitled' }}
            </TableCell>
            <TableCell>
              {{
                new Date(room.created_at)
                  .toISOString()
                  .replace('T', ' ')
                  .replace('Z', '')
                  .slice(0, 19)
              }}
            </TableCell>
            <TableCell>
              <RouterLink :to="{ name: 'reports-detail', params: { id: room.id } }">
                <Button
                  variant="secondary"
                  class="text-xs"
                  >View</Button
                >
              </RouterLink>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
      <div class="flex justify-center py-4">
        <Pagination
          v-slot="{ page }"
          v-model:page="pageQueryComputed"
          :total="meta.total_records"
          :items-per-page="meta.limit"
          :sibling-count="1"
          show-edges
        >
          <PaginationList
            v-slot="{ items }"
            class="flex items-center gap-1"
          >
            <PaginationPrev />

            <template v-for="(item, index) in items">
              <PaginationListItem
                v-if="item.type === 'page'"
                :key="index"
                :value="item.value"
                as-child
              >
                <Button
                  class="w-9 h-9 p-0 rounded-md"
                  :variant="item.value === page ? 'default' : 'outline'"
                  @click="pageQuery = Number(item.value)"
                >
                  {{ item.value }}
                </Button>
              </PaginationListItem>
              <PaginationEllipsis
                v-else
                :key="item.type"
                :index="index"
              />
            </template>

            <PaginationNext />
          </PaginationList>
        </Pagination>
      </div>
    </div>
  </div>
</template>
