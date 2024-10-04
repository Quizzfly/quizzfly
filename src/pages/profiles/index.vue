<script setup lang="ts">
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import EditProfile from '@/components/profile/EditProfile.vue'
import PrivacyProfile from '@/components/profile/PrivacyProfile.vue'
import ChangePasswordProfile from '@/components/profile/ChangePasswordProfile.vue'
import BillingProfile from '@/components/profile/BillingProfile.vue'
</script>
<template>
  <div class="w-full p-8 flex flex-col gap-6">
    <h2 class="text-2xl font-semibold">Setting</h2>
    <Tabs
      default-value="edit-profile"
      class=""
    >
      <TabsList class="mb-8">
        <TabsTrigger value="edit-profile"> Edit profile </TabsTrigger>
        <TabsTrigger value="privacy"> Privacy </TabsTrigger>
        <TabsTrigger value="change-password"> Change password </TabsTrigger>
        <TabsTrigger value="billing"> Billing </TabsTrigger>
      </TabsList>
      <TabsContent value="edit-profile"> <EditProfile></EditProfile> </TabsContent>
      <TabsContent value="privacy"> <PrivacyProfile></PrivacyProfile> </TabsContent>
      <TabsContent value="change-password">
        <ChangePasswordProfile></ChangePasswordProfile
      ></TabsContent>
      <TabsContent value="billing"> <BillingProfile></BillingProfile> </TabsContent>
    </Tabs>
  </div>
</template>

<style lang="scss" scoped></style>
