<script setup lang="ts">
import InputText from "@/components/base/InputText.vue";
import ErrorMessage from "@/components/base/ErrorMessage.vue";
import Button from "@/components/base/Button.vue";

import { useForm } from "vee-validate";
import * as yup from "yup";
import { loginApi, registerApi } from "@/services/auth";
import { apiExceptionHandler } from "@/utils/exceptionHandler";

const { errors, handleSubmit, defineField } = useForm({
    validationSchema: yup.object({
        email: yup.string().email().required("Email is required"),
        name: yup.string().required("name is required"),
        password: yup.string().required("Password is required"),
    }),
});

const [email, emailAttrs] = defineField("email");
const [password, passwordAttrs] = defineField("password");
const [name, nameAttrs] = defineField("name");

const router = useRouter();
const onSubmit = handleSubmit(async (values) => {
    try {
        const data = await registerApi({
            email: values.email,
            name: values.name,
            password: values.password,
        });
        console.log(data);
        router.push({ name: "login" });
        notify.success("Register success");
    } catch (error) {
        notify.error(apiExceptionHandler(error).message);
    }
});
</script>
<template>
    <div class="h-full flex">
        <div class="flex-1 flex justify-center items-center">
            <form
                class="w-[360px] form-shadow p-6 rounded-xl"
                @submit="onSubmit"
            >
                <img
                    src=""
                    alt=""
                />
                <h1 class="text-[344054] text-lg font-semibold mt-3">Đăng ký</h1>
                <h2 class="mt-1 text-[#667085]">Hello, welcome back to your account</h2>
                <div class="mt-6">
                    <InputText
                        v-model="email"
                        placeholder="Enter email..."
                        v-bind="emailAttrs"
                        :invalid="errors.email"
                        type="email"
                    />
                    <ErrorMessage :error="errors.email" />
                    <InputText
                        v-model="name"
                        placeholder="Enter name..."
                        v-bind="nameAttrs"
                        :invalid="errors.name"
                        type="text"
                    />
                    <ErrorMessage :error="errors.name" />
                    <InputText
                        v-model="password"
                        placeholder="Enter password..."
                        v-bind="passwordAttrs"
                        :invalid="errors.password"
                        type="password"
                    />
                    <ErrorMessage :error="errors.password" />
                </div>
                <div class="text-end">
                    <div
                        class="text-[#0921D9] text-xs font-semibold"
                        :to="{ name: 'password-forgot' }"
                    >
                        Quên mật khẩu
                    </div>
                </div>
                <Button
                    class="mt-6"
                    label="Đăng ký"
                ></Button>
            </form>
        </div>
        <div class="flex-1 relative max-md:hidden">
            <img
                class="absolute top-0 left-0 w-full h-full object-cover rounded-tl-3xl rounded-bl-3xl"
                src="/assets/images/bg.avif"
                alt=""
            />
        </div>
    </div>
</template>
<style scoped>
.form-shadow {
    box-shadow:
        0px 1px 3px 0px rgba(16, 24, 40, 0.1),
        0px 1px 2px 0px rgba(16, 24, 40, 0.06);
}
</style>
