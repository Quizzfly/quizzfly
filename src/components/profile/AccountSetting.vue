<script setup lang="ts">
import { useAuthStore } from "@/stores";
import { apiExceptionHandler } from "@/utils/exceptionHandler";
import { useI18n } from "vue-i18n";
const { t } = useI18n();
import Button from "primevue/button";
import InputText from "primevue/inputtext";
import ErrorMessage from "../base/ErrorMessage.vue";
import { useForm } from "vee-validate";
import * as yup from "yup";
import { passwordRegex } from "@/utils/regex";
import { changePasswordApi } from "@/services/auth";

import Message from "primevue/message";

const authStore = useAuthStore();

const { errors, handleSubmit, defineField } = useForm({
    validationSchema: yup.object().shape({
        old_password: yup
            .string()
            .matches(passwordRegex, t("validation.ps_format"))
            .required(t("validation.ps_old_blank")),
        new_password: yup
            .string()
            .matches(passwordRegex, t("validation.ps_format"))
            .required(t("validation.ps_blank")),
        confirmation_password: yup
            .string()
            .oneOf([yup.ref("new_password")], t("validation.ps_confirm_match"))
            .required(t("validation.ps_confirm_blank")),
    }),
});

const [oldPassword, oldPasswordAttrs] = defineField("old_password");
const [newPassword, newPasswordAttrs] = defineField("new_password");
const [confirmationPassword, confirmationPasswordAttrs] = defineField("confirmation_password");
const messageError = ref("");

const onSubmit = handleSubmit(async (values) => {
    console.log("value", values);
    try {
        await changePasswordApi({
            old_password: String(values.old_password),
            new_password: String(values.new_password),
            confirm_new_password: String(values.confirmation_password),
        });
        notify.success("Change password successfully");
    } catch (error) {
        messageError.value = apiExceptionHandler(error).message || "Change password error";
        setTimeout(() => {
            messageError.value = "";
        }, 1500);
        // notify.error(apiExceptionHandler(error).message || "Change password error");
    }
});

onBeforeMount(() => {});

defineEmits<{
    (e: "close"): void;
}>();
</script>
<template>
    <form
        v-motion
        class="flex flex-col justify-between h-full gap-5 p-5 pt-0"
        :initial="{ opacity: 0, x: 200 }"
        :enter="{ opacity: 1, x: 0 }"
        :duration="100"
        @submit="onSubmit"
    >
        <div class="flex-auto">
            <!-- INPUT field -->
            <div class="flex gap-5">
                <div class="flex-1 flex flex-col gap-2">
                    <label for="username">First name</label>
                    <InputText
                        :value="authStore.getUser?.first_name"
                        disabled
                    />
                </div>

                <div class="flex-1 flex flex-col gap-2">
                    <label for="username">Last name</label>
                    <InputText
                        :value="authStore.getUser?.last_name"
                        disabled
                    />
                </div>
            </div>

            <div class="flex flex-col gap-1 mt-5">
                <label for="username">Password</label>
                <InputText
                    v-model="oldPassword"
                    placeholder="Old password"
                    v-bind="oldPasswordAttrs"
                    :invalid="errors.old_password"
                    type="password"
                />
                <ErrorMessage :error="errors.old_password" />
            </div>

            <div class="flex flex-col gap-1 mt-2">
                <label for="username">Password</label>
                <InputText
                    v-model="newPassword"
                    placeholder="New password"
                    v-bind="newPasswordAttrs"
                    :invalid="errors.new_password"
                    type="password"
                />
                <ErrorMessage :error="errors.new_password" />
            </div>

            <div class="flex flex-col gap-1 mt-2">
                <label for="username">Confirm password</label>
                <InputText
                    v-model="confirmationPassword"
                    placeholder="Confirm password"
                    v-bind="confirmationPasswordAttrs"
                    :invalid="errors.confirmation_password"
                    type="password"
                />
                <ErrorMessage :error="errors.confirmation_password" />
            </div>
            <transition-group
                name="p-message"
                tag="div"
                class="flex flex-col mt-2"
            >
                <Message
                    v-if="messageError"
                    severity="error"
                    >{{ messageError }}</Message
                >
            </transition-group>
        </div>
        <div class="flex justify-end gap-4">
            <Button
                label="Cancel"
                severity="secondary"
                size="small"
                @click="$emit('close')"
            />
            <Button
                label="Save"
                size="small"
                type="submit"
            />
        </div>
    </form>
</template>
