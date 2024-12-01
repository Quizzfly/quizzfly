<script setup lang="ts">
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { Card } from '@/components/ui/card'
import { useGroupStore } from '@/stores/group/group'
const groupStore = useGroupStore()

const groupInfo = computed(() => {
  return groupStore.getGroupInfo
})
</script>
<template>
  <div class="p-6 flex flex-col h-screen overflow-hidden">
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/groups"> Groups </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>
            <RouterLink :to="{ name: 'group-detail' }">
              {{ groupInfo.name }}
            </RouterLink>
          </BreadcrumbPage>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>cmcmc</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
    <Card class="h-full mt-6"></Card>
  </div>
</template>
