import { UI_HANDLER } from "./ui.js";

export const STORAGE_HANDLER = {
    KEY: 'bqtj_calculator_data',
    save: function() {
        try {
            const dataToSave = {};
                UI_HANDLER.$form.find('input:not([readonly]), select').each(function() {
                const $el = $(this);
                if ($el.attr('id')) {
                    dataToSave[$el.attr('id')] = $el.val();
                }
            });
            localStorage.setItem(this.KEY, JSON.stringify(dataToSave));
                alert('数据已成功记录到您的浏览器中！');
        } catch (e) {
            console.error("保存到localStorage失败:", e);
            alert("数据保存失败，可能是浏览器存储已满。");
        }
    },
    load: function() {
        try {
            const data = localStorage.getItem(this.KEY);
            return data ? JSON.parse(data) : null;
        } catch (e) {
            console.error("从localStorage加载数据失败:", e);
            return null;
        }
    },
    clear: function() {
        localStorage.removeItem(this.KEY);
    }
};