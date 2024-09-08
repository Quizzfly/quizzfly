<script setup lang="ts">
import { forgotPasswordApi } from "@/services/auth";
import { notify } from "@/utils/toast";

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
const email = ref("");
const checkEmail = () => {};
const errorEmail = ref();

async function handleForgot() {
    try {
        if (!email.value) {
            errorEmail.value = "Email must not be blank";
            return;
        }
        await forgotPasswordApi(email.value);
    } catch (error) {
        notify.error(
            ((error as any).data?.error?.message as string) || "Send forgot password error",
        );
    }
}
</script>
<template>
    <div>
        <!-- <question-popup
            v-if="question != null"
            :question="question"
            @close="$router.push('/login')"
            @accept="question.action()"
        /> -->
        <div class="forgot-header">
        </div>
        <div class="forgot-container">
            <div class="forgot-container-head">{{ $t("auth.forgot_pass") }}</div>
            <div class="forgot-container-intro">{{ $t("auth.we_reset_pass") }}</div>
            <br />
            <div class="forgot-input-container">
                <div class="forgot-input-label">{{ $t("auth.email") }} :</div>
                <input
                    v-model="email"
                    type="text"
                    class="forgot-input"
                    :placeholder="$t('placeholder.enter_email')"
                    @input="checkEmail"
                />
                <div class="login-validation">{{ errorEmail }}</div>
                <div
                    class="fotgot-btn"
                    @click="handleForgot"
                >
                    {{ $t("common.send") }}
                </div>
            </div>
        </div>
        <langAuth :on-top="true" />
    </div>
</template>
<style scoped>
.forgot-header {
    width: 100%;
    height: 56px;
    background: #334d6e;
    display: flex;
    align-items: center;
}

.forgot-container {
    text-align: center;
}

.forgot-container-head {
    font-weight: bold;
    font-size: 36px;
    line-height: 42px;
    text-align: center;

    /* Dark green */
    color: #00693b;
    margin-top: 74px;
}

.forgot-container-intro {
    font-weight: normal;
    font-size: 16px;
    line-height: 24px;

    /* or 150% */
    text-align: center;
    letter-spacing: 0.02em;

    /* Body text 2 */
    color: #525252;
    margin-top: 24px;
    max-width: 556px;
    clear: both;
    display: inline-block;
}

.forgot-input-label {
    font-weight: normal;
    font-size: 15px;
    line-height: 24px;

    /* identical to box height, or 160% */
    letter-spacing: 0.02em;

    /* Title text */
    color: #363445;
}

.forgot-input-container {
    width: 556px;
    height: 200px;
    clear: both;
    display: inline-block;
    text-align: left;
    margin-top: 24px;
}

.forgot-input {
    width: 566px;
    height: 48px;
    background: #dde1cd;
    border-radius: 4px;
    border: none;
    font-weight: normal;
    font-size: 16px;
    line-height: 24px;
    letter-spacing: 0.02em;
    color: #525252;
    padding: 0px 12px;
}

.login-validation {
    font-weight: normal;
    font-size: 14px;
    line-height: 22px;
    display: flex;
    align-items: center;
    letter-spacing: 0.02em;
    color: #f46414;
    height: 24px;
}

.fotgot-btn {
    width: 566px;
    height: 48px;
    background: #00693b;
    border-radius: 4px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: 500;
    font-size: 16px;
    line-height: 24px;
    text-align: center;
    letter-spacing: 0.02em;
    color: #ffffff;
}

.fotgot-btn:hover {
    cursor: pointer;
}

.logoImg:hover {
    cursor: pointer;
}
</style>
