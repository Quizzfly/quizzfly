<script setup lang="ts">
import { forgotPasswordApi } from '@/services/auth'
import ErrorMessage from '@/components/base/ErrorMessage.vue'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useForm } from 'vee-validate'
import * as yup from 'yup'
// import Vue from 'vue';
// import { validEmail } from '~/modules/validation/ValidAuth.js';
// import { mapActions } from 'vuex';
// import { forgot_password_client_api } from '~/services/authService';
// import langAuth from '~/components/Layout/langAuth.vue';
// import QuestionPopup from '~/components/Layout/QuestionPopup.vue';
// export default Vue.extend({
//     auth: false,
//     components: {
//         langAuth,
//         QuestionPopup,
//     },
//     middleware: 'guest',
//     data() {
//         return {
//             checked: false,
//             email: '',
//             errorEmail: '',
//             question: null,
//         };
//     },
//     methods: {
//         ...mapActions({
//             set_noti_mess: 'noti_mess/set_noti_mess',
//         }),
//         checkEmail() {
//             const check = validEmail(this.email);
//             this.errorEmail = check.mess;

//             return check.check;
//         },
//         onGoToLogin() {
//             this.$router.push('/login');
//         },
//         onGoToHomePage() {
//             this.$router.push('/');
//         },
//         async sendForgotPassword() {
//             if (this.checkEmail()) {
//                 try {
//                     await forgot_password_client_api({
//                         email: this.email,
//                     }).then(() => {
//                         this.question = {
//                             type: 'SUCCESS',
//                             body: this.$t('question.check_email_confirm'),
//                         };
//                     });
//                 } catch (e) {
//                     this.errorEmail = e;
//                 }
//             }
//         },
//     },
// });
const errorEmail = ref()

const handleForgot = async () => {
  try {
    if (!email.value) {
      errorEmail.value = 'Email must not be blank'
      return
    }
    await forgotPasswordApi(email.value)
  } catch (error) {
    notify.error(((error as any).data?.error?.message as string) || 'Send forgot password error')
  }
}

const { errors, defineField } = useForm({
  validationSchema: yup.object({
    email: yup.string().email().required('Email is required'),
  }),
})

const [email, emailAttrs] = defineField('email')
</script>
<template>
  <div class="h-full flex p-8">
    <div class="flex-1 flex justify-center items-center">
      <form
        class="p-6 rounded-xl"
        @submit="handleForgot"
      >
        <div class="flex items-center gap-0.5 mb-4">
          <h1 class="text-[344054] text-lg font-semibold mt-3">Forgot password</h1>
        </div>
        <div>
          <h2 class="mt-1 text-[#667085]">Enter your email to reset password</h2>
        </div>
        <div class="mt-6">
          <div class="form-data">
            <Label for="email">Email</Label>
            <Input
              id="email"
              v-model="email"
              placeholder="Enter email..."
              v-bind="emailAttrs"
              :invalid="errors.email"
              type="email"
              class="h-10 mt-1 bg-slate-50 border-slate-200 outline-none"
            />
            <ErrorMessage
              class="text-xs mt-0.5"
              :error="errors.email"
            />
          </div>
        </div>
        <Button class="mt-4 w-full h-10 bg-primary"> Submit </Button>
        <div class="text-end mt-6">
          <RouterLink
            class="text-[#0921D9] text-xs font-semibold"
            to="/login"
          >
            Come back
          </RouterLink>
        </div>
      </form>
    </div>
    <div class="flex-1 relative max-md:hidden">
      <img
        class="absolute top-0 left-0 w-full h-full object-cover rounded-3xl"
        src="@/assets/img/auth-bg.png"
        alt=""
      />
    </div>
  </div>
</template>
<style scoped></style>
