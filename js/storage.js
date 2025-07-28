// js/storage.js

export const STORAGE_HANDLER = {
    KEY: 'bqtj_calculator_data',

    /**
     * 保存指定的 JavaScript 对象到 localStorage。
     * @param {object} stateObject - 需要被保存的状态对象 (通常是 DATA_STORE.state)。
     */
    save: function(stateObject) {
        if (!stateObject) {
            console.error("保存失败：未提供要保存的状态对象。");
            alert("数据保存失败：内部错误。");
            return;
        }

        try {
            // 我们不再从UI读取，而是直接序列化传入的对象
            const dataToSave = JSON.stringify(stateObject);
            localStorage.setItem(this.KEY, dataToSave);
            alert('配置已成功保存到您的浏览器中！');
        } catch (e) {
            console.error("保存到localStorage失败:", e);
            alert("数据保存失败，可能是浏览器存储已满或数据无法序列化。");
        }
    },

    /**
     * 从 localStorage 加载数据。
     * @returns {object | null} - 返回解析后的数据对象，如果不存在或出错则返回 null。
     */
    load: function() {
        try {
            const dataString = localStorage.getItem(this.KEY);
            if (dataString) {
                return JSON.parse(dataString);
            }
            return null; // 没有找到数据，返回 null
        } catch (e) {
            console.error("从localStorage加载数据失败:", e);
            return null; // 解析出错，返回 null
        }
    },

    /**
     * 清除 localStorage 中保存的数据。
     */
    clear: function() {
        localStorage.removeItem(this.KEY);
        console.log("已清除已保存的数据。");
    }
};