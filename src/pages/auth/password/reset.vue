<script setup lang="ts">
// import { validPass, validPassConfirm } from '~/modules/validation/ValidAuth.js';
// import { reset_password_client_api } from '~/services/authService';
// import langAuth from '~/components/Layout/langAuth.vue';
// import QuestionPopup from '~/components/Layout/QuestionPopup.vue';
// //for confirm password reset
// export default {
//     auth: false,
//     components: {
//         langAuth,
//         QuestionPopup,
//     },
//     middleware: 'guest',
//     data() {
//         return {
//             password: null,
//             confirm_password: null,
//             token: null,
//             checked: false,
//             errorPassword: '',
//             errorConfirmPassword: '',
//             question: null,
//         };
//     },

//     created() {
//         this.token = this.$route.query.token;
//         if (!this.token) {
//             this.$router.push('/login');
//         }
//     },

//     methods: {
//         checkPassword() {
//             const check = validPass(this.password);
//             this.errorPassword = check.mess;

//             return check.check;
//         },
//         checkConfirmPassword() {
//             const check = validPassConfirm(this.confirm_password, this.password);
//             this.errorConfirmPassword = check.mess;

//             return check.check;
//         },
//         async resetPassword() {
//             if (this.checkPassword() && this.checkConfirmPassword()) {
//                 try {
//                     await reset_password_client_api({
//                         confirm_token: this.token,
//                         password: this.password,
//                         confirm_password: this.confirm_password,
//                     }).then(() => {
//                         this.question = {
//                             type: 'SUCCESS',
//                             body: this.$t('question.reset_pass_success'),
//                             router: '/login',
//                         };
//                     });
//                 } catch {}
//             }
//         },
//     },
// };
const password = ref('');
const confirm_password = ref('');
const errorPassword = ref('');
const errorConfirmPassword = ref('');

const checkPassword = () => {};
const resetPassword = () => {};
const checkConfirmPassword = () => {};
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
            <div class="forgot-container-head">{{ $t('auth.create_new_pass') }}</div>
            <div class="forgot-container-intro"></div>
            <br />
            <div class="forgot-input-container">
                <div class="forgot-input-label">{{ $t('auth.new_pass') }}</div>
                <input
                    v-model="password"
                    type="password"
                    class="forgot-input"
                    :placeholder="$t('placeholder.enter_pass')"
                    @input="checkPassword"
                />
                <div class="login-validation">{{ errorPassword }}</div>

                <div class="forgot-input-label">{{ $t('auth.confirm_pass') }}</div>
                <input
                    v-model="confirm_password"
                    type="password"
                    class="forgot-input"
                    :placeholder="$t('placeholder.enter_confirm_pass')"
                    @input="checkConfirmPassword"
                />
                <div class="login-validation">{{ errorConfirmPassword }}</div>

                <div
                    class="fotgot-btn"
                    @click="resetPassword"
                >
                    {{ $t('common.send') }}
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

    /* identical to box height, or 157% */
    display: flex;
    align-items: center;
    letter-spacing: 0.02em;

    /* highlight */
    color: #f46414;
    min-height: 24px;
}

.fotgot-btn {
    width: 566px;
    height: 48px;

    /* Dark green */
    background: #00693b;
    border-radius: 4px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: 500;
    font-size: 16px;
    line-height: 24px;

    /* identical to box height, or 150% */
    text-align: center;
    letter-spacing: 0.02em;

    color: #ffffff;
}

.fotgot-btn:hover {
    cursor: pointer;
}
</style>
