<script setup lang="ts">
import InputText from "primevue/inputtext";
import Button from "primevue/button";
import { useForm } from "vee-validate";
import * as yup from "yup";

const { errors, handleSubmit, defineField } = useForm({
    validationSchema: yup.object({
        name: yup.string().required("Name is required"),
    }),
});

const [name, nameAttrs] = defineField("name");

const onSubmit = handleSubmit((values) => {
    console.log("value", values);
    emit("update:modelValue", values.name);
    emit("submit");
});

defineProps<{
    title: string;
    placeholder?: string;
    modelValue: string;
}>();

const emit = defineEmits<{
    (e: "submit"): void;
    (e: "close"): void;
    (e: "update:modelValue", name: string): void;
}>();
</script>
<template>
    <div
        v-motion
        :initial="{ opacity: 0 }"
        :enter="{ opacity: 1 }"
        :duration="100"
        class="fixed z-[9999] top-0 left-0 w-full h-full bg-mark-bg flex justify-center items-center"
        @click="$emit('close')"
    >
        <div
            v-motion
            :initial="{ opacity: 0, scale: 0.5 }"
            :enter="{ opacity: 1, scale: 1 }"
            :duration="100"
            class="w-[400px] bg-white rounded-xl p-5"
            @click.stop
        >
            <div class="flex justify-between">
                <p class="text-lg font-semibold">{{ title }}</p>
                <div
                    class="inline-flex justify-center items-center rounded-full cursor-pointer w-8 h-8 hover:bg-slate-50"
                    @click="$emit('close')"
                >
                    <span class="i-material-symbols-light-close-rounded text-xl"></span>
                </div>
            </div>
            <form @submit="onSubmit">
                <InputText
                    v-model="name"
                    size="small"
                    class="w-full mt-5"
                    :placeholder="placeholder || 'Workspace name'"
                    v-bind="nameAttrs"
                    :invalid="errors.name"
                    @enter="onSubmit"
                />
                <div
                    v-if="errors.name"
                    class="flex items-center gap-1 text-danger"
                >
                    <span class="i-solar-danger-circle-bold-duotone text-lg"></span
                    >{{ errors.name }}
                </div>
                <Button
                    type="button"
                    label="Save"
                    class="w-full mt-5"
                    @click="onSubmit"
                ></Button>
            </form>
        </div>
    </div>
</template>
