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
        // 假设 DATA_STORE 此时已经有数据
        DATA_STORE.weaponsData.forEach(weapon => {
            optionsHTML += `<option value="${weapon.cnName}">${weapon.cnName}</option>`;
        });
        
        // 缓存HTML（包含一个默认的“未选择”项）
        this._weaponOptionsHTML = '<option value="">-未选择-</option>' + optionsHTML;
    },


    // 在 populateWeapons 中缓存选项，供全局使用
    populateWeapons: function() {
        const $select = $('#arms_name');
        if (!$select.length) {
            console.error("在 populateWeapons 中未找到 #arms_name");
            return;
        }
        // 直接使用缓存好的HTML
        $select.html(this._weaponOptionsHTML);
        // 设置一个默认的“请选择”项
        $select.prepend('<option value="" selected disabled>---选择武器---</option>');
        $select.val(''); // 确保默认选中“请选择”
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
射速: ${results.attack_speed.toFixed(2)}
装弹时间: ${results.reload_gap.toFixed(2)}s
精准度: ${results.precision.toFixed(4)}
射程: ${results.shoot_range.toFixed(0)}
        `.trim();
        $resultDisplay.text(resultText).hide().fadeIn(300);
    }
};