import { i18n } from "@/plugins/i18n";
import { useMasterStore } from "@/stores/master";
const { t } = i18n.global;

export const formatDateTime = (timeStamp: number): string => {
    const masterStore = useMasterStore();
    const dateFormat = new Date(timeStamp);
    let dateConverted = "";
    switch (masterStore.getLocale.code) {
        case "en": {
            dateConverted =
                dateFormat.getFullYear() +
                "/" +
                (dateFormat.getMonth() + 1) +
                "/" +
                dateFormat.getDate();
            break;
        }
        case "vi": {
            dateConverted =
                dateFormat.getDate() +
                "/" +
                (dateFormat.getMonth() + 1) +
                "/" +
                dateFormat.getFullYear();
            break;
        }
        case "ja": {
            dateConverted =
                dateFormat.getFullYear() +
                "/" +
                (dateFormat.getMonth() + 1) +
                "/" +
                dateFormat.getDate();
            break;
        }
    }
    return dateConverted;
};

const convertTime = (date: number): string => {
    const now: number = Date.now();
    const seconds = Math.floor((now - date) / 1000);

    let interval = seconds / 31536000;

    if (interval > 1) {
        return Math.floor(interval) + " " + t("common.years");
    }

    interval = seconds / 2592000;
    if (interval > 1) {
        return Math.floor(interval) + " " + t("common.months");
    }

    interval = seconds / 86400;
    if (interval > 1) {
        return Math.floor(interval) + " " + t("common.days");
    }

    interval = seconds / 3600;
    if (interval > 1) {
        return Math.floor(interval) + " " + t("common.hours");
    }

    interval = seconds / 60;
    if (interval > 1) {
        return Math.floor(interval) + " " + t("common.minutes");
    } else {
        return " 1" + " " + t("common.minutes");
    }
};

export function timeAgo(date: number, label: string): string {
    let timeAgo = convertTime(date);

    if (label) {
        timeAgo = timeAgo + " " + label;
    }
    return timeAgo;
}

export function getTimezoneOffsetString(): string {
    const offsetInMinutes = new Date().getTimezoneOffset();
    const offsetInHours = Math.abs(offsetInMinutes / 60);
    const offsetSign = offsetInMinutes >= 0 ? "-" : "+";

    // Xác định dấu (+ hoặc -) và số mã múi giờ
    const timezoneString = `UTC${offsetSign}${offsetInHours}`;
    return timezoneString;
}
