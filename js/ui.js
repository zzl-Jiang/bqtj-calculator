import { DATA_STORE } from "./data.js";

export const UI_HANDLER = {
    $form: $('#power-calculator-app'),
    _weaponOptionsHTML: null, // 缓存武器选项HTML

    /**
     * UI模块的初始化函数
     * 在 App.init() 时调用，用于预加载和缓存全局资源
     */
    init: function() {
        // 如果已经初始化过，则直接返回
        if (this._weaponOptionsHTML) return;

        console.log("UI_HANDLER 初始化，正在缓存武器选项...");
        
        let optionsHTML = '';
        DATA_STORE.weaponsData.forEach(weapon => {
            optionsHTML += `<option value="${weapon.cnName}">${weapon.cnName}</option>`;
        });
        
        // 缓存HTML（包含一个默认的“未选择”项）
        this._weaponOptionsHTML = '<option value="">-未选择-</option>' + optionsHTML;
    },


    /**
     * 为一个或多个 <select> 元素填充武器选项
     * @param {jQuery} [$targetSelects] - (可选) 指定要填充的select元素。如果未提供，则填充 id="arms_name" 的元素。
     */
    populateWeapons: function($targetSelects) {
        const $selects = $targetSelects || $('#arms_name');

        if (!$selects.length) return;

        // 先清空，防止重复填充
        $selects.empty();

        // 添加一个默认的“请选择”选项
        $selects.append('<option value="">-- 请选择武器 --</option>');

        DATA_STORE.weaponsData.forEach(weapon => {
            $selects.append(`<option value="${weapon.cnName}">${weapon.cnName}</option>`);
        });
    },

    createWeaponSlots: function(num) {
        const $container = $('#weapon-slots-container');

        if (!$container.length) {
            console.error("在 createWeaponSlots 中未找到容器 #weapon-slots-container");
            return;
        }

        $container.empty(); // 清空现有的武器槽
        if (!this._weaponOptionsHTML) {
            console.error("武器选项尚未初始化！");
            return;
        }

        for (let i = 1; i <= num; i++) {
            const slotHTML = `
                <div class="weapon-slot">
                    <label for="weapon-select-${i}">武器${i}:</label>
                    <select id="weapon-select-${i}" class="weapon-slot-select">${this._weaponOptionsHTML}</select>
                    <input type="text" id="weapon-power-${i}" class="weapon-slot-power" readonly placeholder="该武器战力">
                </div>`;
            $container.append(slotHTML);
        }
    },
    

    getAllInputs: function() {
        const inputs = {};
        this.$form.find('input, select').each(function() {
            const $el = $(this);
            const id = $el.attr('id');
            if (id) {
                // 如果是数字输入框或选择器，尝试解析为浮点数，否则取其值
                if ($el.is('input[type="number"], select')) {
                    const parsedValue = parseFloat($el.val());
                    inputs[id] = isNaN(parsedValue) ? 0 : parsedValue;
                } else {
                    inputs[id] = $el.val();
                }
            }
        });
        return inputs;
    },

    updateForm: function(data) {
        for (const id in data) {
            const $el = $('#' + id);
            if ($el.length) {
                let value = data[id];
                // 格式化数字显示，使用 toFixed 避免科学计数法，并根据小数位数决定是否格式化
                if (typeof value === 'number' && !Number.isInteger(value)) {
                    // 仅对小数进行格式化
                    const decimalPart = value.toString().split('.')[1] || '';
                    if (decimalPart.length > 4) {
                       value = value.toFixed(4);
                    }
                }
                $el.val(value);
            }
        }
    },

    showFinalResults: function(results) {
        const $resultDisplay = $('#final-result-display');

        if (!$resultDisplay.length) {
            console.error("在 showFinalResults 中未找到 #final-result-display 容器！");
            return;
        }

        const resultText = `
最终面板战力: ${results.final_dps.toFixed(0)}
伤害: ${results.hurt_ratio.toFixed(0)}
弹容: ${results.capacity}
射速: ${results.attack_speed.toFixed(4)}
装弹时间: ${results.reload_gap.toFixed(4)}s
精准度: ${results.precision.toFixed(4)}
射程: ${results.shoot_range.toFixed(2)}
        `.trim();
        $resultDisplay.text(resultText).hide().fadeIn(300);
    }
};