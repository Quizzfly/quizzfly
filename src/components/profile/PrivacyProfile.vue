<script setup lang="ts">
import { Switch } from '../ui/switch'
</script>

<template>
  <div class="w-full flex items-start gap-8 max-lg:flex-col">
    <div class="w-2/4 p-4 rounded-md shadow flex flex-col gap-10 max-lg:w-full">
      <div class="header flex items-center justify-between">
        <h3 class="text-lg font-semibold">Notifications</h3>
      </div>
      <div class="body flex items-start gap-6 flex-col">
        <h2 class="text-left font-medium text-base">Email me when someone:</h2>
        <div class="form flex items-center gap-4 flex-col w-full">
          <div
            class="form-data w-full flex items-center gap-2 justify-between shadow-item p-2 rounded"
          >
            <label
              for="shareKahoot"
              class="font-normal text-base"
              >Shares a kahoot with you</Label
            >
            <Switch id="shareKahoot" />
          </div>
          <div
            class="form-data w-full flex items-center gap-2 justify-between shadow-item p-2 rounded"
          >
            <label
              for="feature"
              class="font-normal text-base"
              >Features your quizzfly to other users</Label
            >
            <Switch id="feature" />
          </div>
          <div
            class="form-data w-full flex items-center gap-2 justify-between shadow-item p-2 rounded"
          >
            <label
              for="shareother"
              class="font-normal text-base"
              >Shares your quizzfly with other users</Label
            >
            <Switch id="shareother" />
          </div>
          <div
            class="form-data w-full flex items-center gap-2 justify-between shadow-item p-2 rounded"
          >
            <label
              for="favourite"
              class="font-normal text-base"
              >Favourites your quizzfly</Label
            >
            <Switch id="favourite" />
          </div>
        </div>
      </div>
    </div>
    <div class="w-2/4 flex flex-col gap-10 max-lg:w-full">
      <div class="shadow rounded-md p-4 flex flex-col gap-8">
        <div class="header">
          <h3 class="text-lg font-semibold">Privacy and marketing</h3>
        </div>
        <div class="w-full grid gap-4">
          <div class="body flex items-start gap-6 flex-col w-full">
            <div class="form flex items-center gap-4 flex-col w-full">
              <div
                class="form-data w-full flex items-center gap-2 justify-between shadow-item p-2 rounded"
              >
                <label
                  for="shareKahoot"
                  class="font-normal text-base w-full"
                  >I have read and agree with the quizzfly? <span>terms and conditions</span> and
                  <span>privacy policy</span> and agree to quizzfly! collecting and processing my
                  personal data as described in the <span>privacy policy</span></Label
                >
                <Switch id="shareKahoot" />
              </div>
              <div
                class="form-data w-full flex items-center gap-2 justify-between shadow-item p-2 rounded"
              >
                <label
                  for="feature"
                  class="font-normal text-base"
                  >I want to receive marketing messages with recommendations and other relevant
                  information from quizzfly!</Label
                >
                <Switch id="feature" />
              </div>
              <div
                class="form-data w-full flex items-center gap-2 justify-between shadow-item p-2 rounded"
              >
                <label
                  for="shareother"
                  class="font-normal text-base"
                  >I want to receive relevant information, exclusive invitations and special offers
                  by quizzfly from third party companies. Quizzfly will never share my personal
                  information with other companies.</Label
                >
                <Switch id="shareother" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style>
.shadow {
  box-shadow:
    rgba(0, 0, 0, 0.1) 0px 1px 3px 0px,
    rgba(0, 0, 0, 0.06) 0px 1px 2px 0px;
}

.shadow-item {
  box-shadow: rgba(0, 0, 0, 0.05) 0px 0px 0px 1px;
}
</style>
