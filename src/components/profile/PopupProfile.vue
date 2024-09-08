<script setup lang="ts">
import ProfileSetting from './ProfileSetting.vue'
import AccountSetting from './AccountSetting.vue'

const tab = ref<'profile' | 'account'>('profile')

defineEmits<{
  (e: 'close'): void
}>()
</script>
<template>
  <div
    id="profile-popup"
    v-motion
    :initial="{ opacity: 0 }"
    :enter="{ opacity: 1 }"
    :duration="100"
    class="fixed top-0 left-0 w-full h-full bg-mark-bg z-[999] flex justify-center items-center"
    @click="$emit('close')"
  >
    <div
      class="w-full max-w-[650px] bg-white min-h-[450px] rounded-lg overflow-hidden flex flex-col"
      @click.stop
    >
      <!-- Profile header -->
      <div class="flex justify-between p-5">
        <div class="flex gap-5">
          <p
            :class="{ 'text-bodydark': tab !== 'profile' }"
            class="text-lg font-semibold cursor-pointer"
            @click="tab = 'profile'"
          >
            Profile setting
          </p>
          <p
            :class="{ 'text-bodydark': tab !== 'account' }"
            class="text-lg font-semibold cursor-pointer"
            @click="tab = 'account'"
          >
            Account setting
          </p>
        </div>
        <div
          class="inline-flex justify-center items-center rounded-full cursor-pointer w-8 h-8 hover:bg-slate-50"
          @click="$emit('close')"
        >
          <span class="i-material-symbols-light-close-rounded text-xl"></span>
        </div>
      </div>
      <!-- Profile content -->
      <ProfileSetting
        v-if="tab === 'profile'"
        @close="$emit('close')"
      />
      <AccountSetting
        v-else
        @close="$emit('close')"
      />
    </div>
  </div>
</template>
