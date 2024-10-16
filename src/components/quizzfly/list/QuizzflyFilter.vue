<script setup lang="ts">
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectLabel,
  SelectItem,
} from '@/components/ui/select'
</script>
<template>
  <div class="flex justify-between">
    <div></div>
    <div>
      <div class="flex items-center gap-2">
        <Select>
          <SelectTrigger class="bg-white">
            <SelectValue placeholder="Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <Selectlabel>Type</Selectlabel>
              <SelectItem value="DRAFT"> Draft </SelectItem>
              <SelectItem value="RECENT"> Recent </SelectItem>
              <SelectItem value="FAVOR"> Favorite </SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>

        <!-- layouts -->
        <div
          class="min-w-[40px] h-[40px] flex justify-center items-center hover:bg-gray-200 rounded-md cursor-pointer"
        >
          <span class="i-material-symbols-light-grid-view-outline-rounded text-[30px]"></span>
        </div>
        <div
          class="min-w-[40px] h-[40px] flex justify-center items-center hover:bg-gray-200 rounded-md cursor-pointer"
        >
          <span class="i-material-symbols-light-event-list-outline-rounded text-[30px]"></span>
        </div>
      </div>
    </div>
  </div>
</template>
