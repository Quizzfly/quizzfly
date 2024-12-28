<script setup lang="ts">
import type { DateRange } from 'radix-vue'
import { Button } from '@/components/ui/button'

import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { RangeCalendar } from '@/components/ui/range-calendar'
import { cn } from '@/lib/utils'
import { CalendarDate, DateFormatter, getLocalTimeZone } from '@internationalized/date'
import { CalendarIcon } from '@radix-icons/vue'
import { type Ref, ref } from 'vue'

const emit = defineEmits<{
  (e: 'update:modelValue', value: DateRange): void
}>()
const df = new DateFormatter('en-US', {
  dateStyle: 'medium',
})

const currentYear = new Date().getFullYear()
const currentMonth = new Date().getMonth() + 1
const currentDay = new Date().getDate()
const value = ref({
  start: new CalendarDate(currentYear, currentMonth, 0),
  end: new CalendarDate(currentYear, currentMonth, currentDay),
}) as Ref<DateRange>

const handleUpdate = (val: DateRange) => {
  value.value = val
  emit('update:modelValue', val)
}
</script>

<template>
  <Popover>
    <PopoverTrigger as-child>
      <Button
        variant="outline"
        :class="
          cn('w-[280px] justify-start text-left font-normal', !value && 'text-muted-foreground')
        "
      >
        <CalendarIcon class="mr-2 h-4 w-4" />
        <template v-if="value.start">
          <template v-if="value.end">
            {{ df.format(value.start.toDate(getLocalTimeZone())) }} -
            {{ df.format(value.end.toDate(getLocalTimeZone())) }}
          </template>

          <template v-else>
            {{ df.format(value.start.toDate(getLocalTimeZone())) }}
          </template>
        </template>
        <template v-else> Pick a date </template>
      </Button>
    </PopoverTrigger>
    <PopoverContent class="w-auto p-0">
      <RangeCalendar
        initial-focus
        :number-of-months="2"
        :model-value="value"
        @update:model-value="handleUpdate"
        @update:start-value="(startDate) => (value.start = startDate)"
      />
    </PopoverContent>
  </Popover>
</template>
