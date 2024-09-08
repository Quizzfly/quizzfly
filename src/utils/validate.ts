import { i18n } from "@/plugins/i18n";
const t = (val: string) => {
    return i18n.global.t(val);
};

function validEmail(email: string) {
    if (email == "" || email == null || email == undefined) {
        return {
            mess: t("validation.em_blank"),
            check: false,
        };
    } else {
        const re =
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        if (!re.test(email)) {
            return {
                mess: t("validation.em_format"),
                check: false,
            };
        } else {
            return {
                mess: "",
                check: true,
            };
        }
    }
}

function validPass(pass: string, longPass?: string) {
    if (pass == "" || pass == null || pass == undefined) {
        return {
            mess: t("validation.ps_blank"),
            check: false,
        };
    } else {
        // let re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,32}$/;
        const re = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,32}$/;
        if (!re.test(pass)) {
            if (!longPass) {
                return {
                    mess: t("error_code.VAL_SIG0202"),
                    check: false,
                };
            } else {
                return {
                    mess: t("validation.ps_format"),
                    check: false,
                };
            }
        } else {
            return {
                mess: "",
                check: true,
            };
        }
    }
}

function validPassConfirm(confirmPass: string, pass: string, longPass?: string) {
    if (confirmPass === "" || confirmPass == null || confirmPass == undefined) {
        return {
            mess: t("validation.ps_confirm_blank"),
            check: false,
        };
    } else if (!validPass(confirmPass).check) {
        if (!longPass) {
            return {
                mess: t("error_code.VAL_SIG0202"),
                check: false,
            };
        } else {
            return {
                mess: t("validation.ps_format"),
                check: false,
            };
        }
    } else if (confirmPass != pass) {
        return {
            mess: t("validation.ps_confirm_match"),
            check: false,
        };
    } else
        return {
            mess: "",
            check: true,
        };
}

export { validEmail, validPass, validPassConfirm };
