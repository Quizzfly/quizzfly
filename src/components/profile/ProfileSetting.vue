<script setup lang="ts">
import { useAuthStore } from "@/stores/auth";
import Button from "primevue/button";
import InputText from "primevue/inputtext";
import ErrorMessage from "@/components/base/ErrorMessage.vue";
import { useForm } from "vee-validate";
import * as yup from "yup";
import { updateProfileApi } from "@/services/auth";
import { apiExceptionHandler } from "@/utils/exceptionHandler";

const authStore = useAuthStore();

const { errors, handleSubmit, defineField } = useForm({
    validationSchema: yup.object({
        first_name: yup.string().required("First name is required"),
        last_name: yup.string().required("Last name is required"),
    }),
    initialValues: {
        first_name: authStore.getUser?.first_name,
        last_name: authStore.getUser?.last_name,
    },
});

const [firstName, firstNameAttrs] = defineField("first_name");
const [lastName, lastNameAttrs] = defineField("last_name");

onBeforeMount(() => {
    console.log(authStore.getUser);
});

const onSubmit = handleSubmit(async (values) => {
    console.log("value", values);
    try {
        await updateProfileApi({
            first_name: String(values.first_name),
            last_name: String(values.last_name),
        });
        notify.success("Update profile successfully");
    } catch (error) {
        notify.error(apiExceptionHandler(error).message || "Update profile error");
    }
});

defineEmits<{
    (e: "close"): void;
}>();
</script>
<template>
    <form
        v-motion
        class="flex flex-col h-full justify-between gap-5 p-5 pt-0"
        :initial="{ opacity: 0, x: -200 }"
        :enter="{ opacity: 1, x: 0 }"
        :duration="100"
        @submit="onSubmit"
    >
        <div class="flex gap-5">
            <div class="flex-auto">
                <!-- INPUT field -->
                <div class="flex flex-col gap-2">
                    <label for="username">Email</label>
                    <InputText
                        disabled
                        :value="authStore.getUser?.email"
                    />
                </div>

                <div class="flex flex-col gap-1 mt-5">
                    <label for="username">First name</label>
                    <InputText
                        v-model="firstName"
                        v-bind="firstNameAttrs"
                    />
                    <ErrorMessage :error="errors.first_name" />
                </div>

                <div class="flex flex-col gap-1 mt-5">
                    <label for="username">Last name</label>
                    <InputText
                        v-model="lastName"
                        v-bind="lastNameAttrs"
                    />
                    <ErrorMessage :error="errors.last_name" />
                </div>
            </div>
            <div>
                <p class="font-semibold">Profile photo</p>
                <img
                    class="w-40 h-40 object-cover rounded-md"
                    src="https://ca.slack-edge.com/THKAHJS9K-U04FWMNAVEK-9e02a3035100-512"
                    alt=""
                />
                <Button
                    label="Upload photo"
                    size="small"
                    severity="secondary"
                    outlined
                    class="w-full bg-white mt-5"
                />
            </div>
        </div>
        <div class="flex justify-end gap-4">
            <Button
                label="Cancel"
                severity="secondary"
                size="small"
                @click="$emit('close')"
            />
            <Button
                type="submit"
                label="Save"
                size="small"
            />
        </div>
    </form>
</template>
