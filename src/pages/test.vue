<template>
    <div class="card flex flex-col justify-center">
        <Select
            v-model="selectedCity"
            :options="cities"
            option-label="name"
            placeholder="Select a City"
            class="w-full md:w-56"
        />
        <div class="h-[500px]">
            <SplitPanel>
                <template #left> b </template>
                <template #right>
                    <div class="shadow-md">a</div>
                </template>
            </SplitPanel>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import Select from "primevue/select";
import SplitPanel from "@/components/base/SplitPanel.vue";
const selectedCity = ref();
const cities = ref([
    { name: "New York", code: "NY" },
    { name: "Rome", code: "RM" },
    { name: "London", code: "LDN" },
    { name: "Istanbul", code: "IST" },
    { name: "Paris", code: "PRS" },
]);
</script>
