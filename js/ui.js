import { DATA_STORE } from "./data.js";

export const UI_HANDLER = {
    $form: $('#power-calculator-app'),
    $resultDisplay: $('#final-result-display'),
    $weaponSlotsContainer: $('#weapon-slots-container'),

    populateWeapons: function() {
        const $select = $('#arms_name');
        $select.append($('<option>', { value: "", text: "---选择武器---" }));
        DATA_STORE.weaponsData.forEach(weapon => {
            $select.append($('<option>', { value: weapon.cnName, text: weapon.cnName }));
        });
    },

    createWeaponSlots: function(num) {
        this.$weaponSlotsContainer.empty();
        let weaponOptionsHTML = '<option value="">-未选择-</option>';
        DATA_STORE.weaponsData.forEach(weapon => {
            weaponOptionsHTML += `<option value="${weapon.cnName}">${weapon.cnName}</option>`;
        });

        for (let i = 1; i <= num; i++) {
            const slotHTML = `
                <div class="weapon-slot">
                    <label for="weapon-select-${i}">武器${i}:</label>
                    <select id="weapon-select-${i}" class="weapon-slot-select">${weaponOptionsHTML}</select>
                    <input type="text" id="weapon-power-${i}" class="weapon-slot-power" readonly placeholder="该武器战力">
                </div>`;
            this.$weaponSlotsContainer.append(slotHTML);
        }
    },

    initTabber: function() {
        const $tabContainer = $('#calculator-tabs'); // 使用ID选择器，确保唯一性
        if (!$tabContainer.length) return;

        const $tabs = $tabContainer.find('.tab-btn');
        const $indicator = $tabContainer.find('.tab-indicator');
        const $panes = $('.tab-pane'); // 面板在容器外部，全局查找

        function updateIndicator($activeTab) {
            if (!$activeTab || !$activeTab.length || !$indicator.length) return;

            const tabPosition = $activeTab.position(); // 相对于父元素的位置
            const tabWidth = $activeTab.outerWidth();   // 包含padding和border的宽度

            $indicator.css({
                'left': tabPosition.left + 'px',
                'width': tabWidth + 'px'
            });
        }

        // 初始化指示器位置
        updateIndicator($tabContainer.find('.tab-btn.active'));

        // 绑定点击事件
        $tabs.on('click', function() {
            const $this = $(this);
            if ($this.hasClass('active')) return; // 如果已经是激活状态，则不执行任何操作

            // 更新按钮和面板的 active 状态
            $tabs.removeClass('active');
            $this.addClass('active');

            $panes.removeClass('active');
            // 注意：HTML中面板ID需要对应，例如 "tab-pane-single-weapon"
            const paneId = '#tab-pane-' + $this.data('tab'); 
            $(paneId).addClass('active');

            // 更新指示器位置
            updateIndicator($this);
        });

        // 窗口大小变化时重新计算指示器位置
        $(window).on('resize', () => {
            updateIndicator($tabContainer.find('.tab-btn.active'));
        });
    },

    getAllInputs: function() {
        const inputs = {};
        const numericFields = [
            'arms_lv', 'evo_lv', 'dps_mul', 'get_dps_mul', 'pet_dps', 'parts_dps_mul', 
            'ea0_dps', 'ea_dps0', 'ea0_dps_mul', 'ea_dps_mul0', 'vip_dps_mul', 
            'whole_dps_mul', 'more_dps_mul', 'parts_dps_lv', 'parts_dps', 'dps1', 
            'hurt_add1', 'strengthen_lv', 'strengthen_hurt_mul', 'ea0_hurt_mul', 
            'ea_hurt_mul0', 'ea0_hurt', 'ea_hurt0', 'get_hurt_add', 'hurt1', 'dps_all', 
            'hurt_all', 'zodiac_hurt_add', 'evo_hurt_mul', 'red_hurt_mul', 'hurt_ratio', 
            'parts_capacity_lv', 'parts_capacity_mul', 'ea0_capacity_mul', 
            'ea_capacity_mul0', 'ea0_capacity', 'ea_capacity0', 'get_capacity_mul', 
            'capacity_real', 'capacity', 'parts_attack_gap_lv', 'parts_attack_gap_mul', 
            'ea0_attack_gap', 'get_attack_gap_add', 'attack_gap', 'attack_speed', 
            'parts_reload_lv', 'parts_reload_mul', 'ea0_reload', 'ea_reload0', 
            'get_reload_mul', 'reload_gap', 'parts_precision_lv', 'parts_shoot_range_lv', 
            'parts_shake_angle', 'parts_shoot_angle', 'parts_shoot_range', 
            'get_angle_add_mul', 'precision_real', 'precision', 'shoot_range', 'element', 
            'ele_add_dps', 'base_special_num', 'skill_num', 'god_skill_num', 
            'skill_special_mul', 'ui_dps_mul', 'type_ui_dps_mul', 'show_dps_mul', 
            'final_dps', 'attack_gap0', 'capacity0', 'reload_gap0', 'shoot_angle0', 
            'shake_angle0', 'shoot_range0', 'bullet_num', 'dps0', 'hurt_ratio0', 
            'attack_speed0', 'precision0'
        ];

        this.$form.find('input, select').each(function() {
            const $el = $(this);
            const id = $el.attr('id');
            if (id) {
                if ($el.attr('type') === 'number' || numericFields.includes(id)) {
                    inputs[id] = parseFloat($el.val()) || 0;
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
                // 格式化数字显示
                if (typeof value === 'number' && !Number.isInteger(value)) {
                    value = parseFloat(value.toPrecision(6)); // 增加精度以便显示更小的小数
                }
                $el.val(value);
            }
        }
    },

    showFinalResults: function(results) {
        const resultText = `
最终面板战力: ${results.final_dps.toFixed(0)}
伤害: ${results.hurt_ratio.toFixed(0)}
弹容: ${results.capacity}
射速: ${results.attack_speed.toFixed(2)}
装弹时间: ${results.reload_gap.toFixed(2)}s
精准度: ${results.precision.toFixed(4)}
射程: ${results.shoot_range.toFixed(0)}
        `.trim();
        this.$resultDisplay.text(resultText).hide().fadeIn(300);
    }
};