<script lang="ts" setup>
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import ScrollArea from '../ui/scroll-area/ScrollArea.vue'
</script>
<template>
  <div class="flex flex-col bg-white w-[400px] shadow-lg rounded-lg">
    <div class="flex p-4 items-center justify-between rounded-t-lg">
      <h3 class="text-base font-medium">Notification</h3>
      <p class="cursor-pointer text-sm text-primary">Read all</p>
    </div>
    <div class="h-0.5 w-full bg-slate-100"></div>
    <ScrollArea>
      <div class="flex flex-col cursor-pointer max-h-[400px] pr-2">
        <div class="flex gap-3 p-4 hover:bg-slate-50">
          <Avatar class="border-2">
            <AvatarImage src="item.avatar" />
            <AvatarFallback>H</AvatarFallback>
          </Avatar>
          <div class="flex flex-col gap-2 w-full relative">
            <div class="flex gap-0 flex-col">
              <h3 class="text-base font-semibold">Trung Dong</h3>
              <p class="text-sm font-normal text-slate-700">
                Anh Nam đã mời bạn vào một group bí mật
              </p>
            </div>
            <div class="w-full flex">
              <p class="w-full text-right text-xs font-normal text-slate-500">9 phút trước</p>
            </div>
            <div class="absolute -top-1 -right-1 w-3 h-3 bg-primary rounded-full"></div>
          </div>
        </div>
        <div class="h-px w-full bg-slate-100"></div>
        <div class="flex gap-3 p-4 hover:bg-slate-50">
          <Avatar class="border-2">
            <AvatarImage src="item.avatar" />
            <AvatarFallback>H</AvatarFallback>
          </Avatar>
          <div class="flex flex-col gap-2 w-full">
            <div class="flex gap-0 flex-col">
              <h3 class="text-base font-semibold">Trung Dong</h3>
              <p class="text-sm font-normal text-slate-700">
                Anh Nam đã mời bạn vào một group bí mật
              </p>
            </div>
            <div class="w-full flex">
              <p class="w-full text-right text-xs font-normal text-slate-500">9 phút trước</p>
            </div>
          </div>
        </div>
        <div class="h-px w-full bg-slate-100"></div>
        <div class="flex flex-col cursor-pointer">
          <div class="flex gap-3 p-4 hover:bg-slate-50">
            <Avatar class="border-2">
              <AvatarImage src="item.avatar" />
              <AvatarFallback>H</AvatarFallback>
            </Avatar>
            <div class="flex flex-col gap-2 w-full">
              <div class="flex gap-0 flex-col">
                <h3 class="text-base font-semibold">Trung Dong</h3>
                <p class="text-sm font-normal text-slate-700">
                  Anh Nam đã mời bạn vào một group bí mật
                </p>
              </div>
              <div class="w-full flex">
                <p class="w-full text-right text-xs font-normal text-slate-500">9 phút trước</p>
              </div>
            </div>
          </div>
          <div class="h-px w-full bg-slate-100"></div>
          <div class="flex gap-3 p-4 hover:bg-slate-50">
            <Avatar class="border-2">
              <AvatarImage src="item.avatar" />
              <AvatarFallback>H</AvatarFallback>
            </Avatar>
            <div class="flex flex-col gap-2 w-full">
              <div class="flex gap-0 flex-col">
                <h3 class="text-base font-semibold">Trung Dong</h3>
                <p class="text-sm font-normal text-slate-700">
                  Anh Nam đã mời bạn vào một group bí mật
                </p>
              </div>
              <div class="w-full flex">
                <p class="w-full text-right text-xs font-normal text-slate-500">9 phút trước</p>
              </div>
            </div>
          </div>
        </div>
        <div class="h-px w-full bg-slate-100"></div>
        <div class="flex flex-col cursor-pointer">
          <div class="flex gap-3 p-4 hover:bg-slate-50">
            <Avatar class="border-2">
              <AvatarImage src="item.avatar" />
              <AvatarFallback>H</AvatarFallback>
            </Avatar>
            <div class="flex flex-col gap-2 w-full">
              <div class="flex gap-0 flex-col">
                <h3 class="text-base font-semibold">Trung Dong</h3>
                <p class="text-sm font-normal text-slate-700">
                  Anh Nam đã mời bạn vào một group bí mật
                </p>
              </div>
              <div class="w-full flex">
                <p class="w-full text-right text-xs font-normal text-slate-500">9 phút trước</p>
              </div>
            </div>
          </div>
          <div class="h-px w-full bg-slate-100"></div>
          <div class="flex gap-3 p-4 hover:bg-slate-50">
            <Avatar class="border-2">
              <AvatarImage src="item.avatar" />
              <AvatarFallback>H</AvatarFallback>
            </Avatar>
            <div class="flex flex-col gap-2 w-full">
              <div class="flex gap-0 flex-col">
                <h3 class="text-base font-semibold">Trung Dong</h3>
                <p class="text-sm font-normal text-slate-700">
                  Anh Nam đã mời bạn vào một group bí mật
                </p>
              </div>
              <div class="w-full flex">
                <p class="w-full text-right text-xs font-normal text-slate-500">9 phút trước</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ScrollArea>
    <div class="h-0.5 w-full bg-slate-100"></div>
    <div class="flex items-center justify-center my-3">
      <p class="text-sm text-primary cursor-pointer">See more</p>
    </div>
  </div>
</template>
