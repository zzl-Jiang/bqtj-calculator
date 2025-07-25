import { DATA_STORE } from './data.js';
import { CALC_LOGIC } from './logic.js';
import { UI_HANDLER } from './ui.js';
import { STORAGE_HANDLER } from './storage.js';

$(function() {
    const App = {
        init: function() {
            UI_HANDLER.populateWeapons();
            UI_HANDLER.initTabber();
            this.setupTotalPowerSection();
            this.initPopovers();
            this.loadData();
            this.bindEvents();
            this.updateBaseData(); // 初始加载时根据默认武器计算一次
        },

        initPopovers: function() {
            $('#power-calculator-app').on('click', '.info-icon', function(e) {
                e.preventDefault();
                e.stopPropagation();

                const $icon = $(this);
                const targetId = $icon.data('popover-target');
                const $popover = $(targetId);

                if (!$popover.length) return;

                // 用 hasClass 判断
                const isCurrentlyVisible = $popover.hasClass('visible');

                // 用 removeClass 关闭所有其他popover
                $('.popover-container').removeClass('visible');

                if (!isCurrentlyVisible) {
                    // 用 addClass 显示
                    const iconOffset = $icon.offset();
                    $popover.css({
                        top: (iconOffset.top + $icon.outerHeight() + 5) + 'px',
                        left: iconOffset.left + 'px',
                    }).addClass('visible');
                }
            });

            // 关闭按钮的逻辑也要修改
            $('.close-popover').on('click', function() {
                // 用 removeClass 关闭
                $(this).closest('.popover-container').removeClass('visible');
            });

            // 构成项输入的逻辑保持不变
            $('.constituent-input').on('input', (event) => {
                const $popover = $(event.target).closest('.popover-container');
                App.updateMainParamFromPopover($popover);
            });

            // 点击页面其他地方关闭的逻辑也要修改
            $(document).on('click', function(e) {
                if (!$(e.target).closest('.popover-container.visible, .info-icon').length) {
                    // 用 removeClass 关闭
                    $('.popover-container').removeClass('visible');
                }
            });
            
            // 初始化时确保没有 .visible 类
            $('.popover-container').removeClass('visible');
        },

        // 辅助函数，用于从弹出窗口计算主参数值
        updateMainParamFromPopover: function($popover) {
            const mainInputId = $popover.data('main-input-id');
            if (!mainInputId) return;

            const $mainInput = $('#' + mainInputId);
            let sum = 0;

            // 遍历当前弹出窗口内所有的构成项输入框并求和
            $popover.find('.constituent-input').each(function() {
                sum += parseFloat($(this).val()) || 0;
            });

            // 更新主输入框的值，并触发 input 事件
            $mainInput.val(sum.toFixed(4));
            
            // 手动触发input事件，让整个计算链条能接收到这个值的变化
            $mainInput.trigger('input');
        },

        bindEvents: function() {
            // 单武器计算器的事件
            $('#tab-pane-single-weapon').on('change input', 'select, input[type="number"]', (event) => {
                if ($(event.target).is('#arms_name')) {
                    this.updateBaseData();
                } else {
                    this.runSingleWeaponCalculation();
                }
            });
            $('#btn-calculate-all').on('click', () => this.runSingleWeaponCalculation(true));
            $('#btn-save-data').on('click', () => STORAGE_HANDLER.save());
            $('#btn-clear-data').on('click', () => this.clearData());

            // 总战力计算器的事件
            $('#tab-pane-total-power').on('change', '#weapon_num', () => {
                const num = parseInt($('#weapon_num').val());
                UI_HANDLER.createWeaponSlots(num);
            });
            
            // 绑定“应用快捷参数”按钮的点击事件
            $('#btn-apply-quick-settings').on('click', () => this.applyQuickSettings());
            
            $('#btn-calculate-total-power').on('click', () => this.runTotalPowerCalculation());
        },

        updateQuickSettingsSummary: function() {
            const summaryUpdates = {};

            // 汇总百分比普战 (ea0_dps_mul)
            // 这里的逻辑可以根据未来扩展，目前直接读取
            summaryUpdates.quick_percent_dps_mul = parseFloat($('#ea0_dps_mul').val()) || 0;

            // 汇总神战 (dps_all)
            summaryUpdates.quick_god_dps_mul = parseFloat($('#dps_all').val()) || 0;

            // 汇总百分比普伤 (ea0_hurt_mul + strengthen_hurt_mul)
            const percentHurt = parseFloat($('#ea0_hurt_mul').val()) || 0;
            const strengthenHurt = parseFloat($('#strengthen_hurt_mul').val()) || 0;
            summaryUpdates.quick_percent_hurt_mul = (percentHurt + strengthenHurt).toFixed(2);

            // 汇总神伤 (hurt_all)
            summaryUpdates.quick_god_hurt_mul = parseFloat($('#hurt_all').val()) || 0;
            
            // 使用 UI_HANDLER 更新快捷区域的只读输入框
            UI_HANDLER.updateForm(summaryUpdates);
        },

        applyQuickSettings: function() {
            // 从快捷输入框读取值
            const quickVipLv = parseInt($('#quick_vip_lv').val()) || 0;
            const quickPresidentLv = parseInt($('#quick_president_lv').val()) || 0;
            const quickWholeDps = parseFloat($('#quick_whole_dps').val()) || 0;
            const quickShootSpeed = parseFloat($('#quick_shoot_speed').val()) || 0;

            // 进行计算
            const detailedUpdates = {};
            detailedUpdates.vip_dps_mul = CALC_LOGIC.getVipBonusByLv(quickVipLv);
            
            // 计算总统加成和全体战力加成
            const presidentBonus = CALC_LOGIC.getPresidentBonusByLv(quickPresidentLv);
            detailedUpdates.whole_dps_mul = (quickWholeDps / 100.0);
            detailedUpdates.dps_all = presidentBonus + 5.03;
            detailedUpdates.hurt_all = presidentBonus + 1.61;
            
            detailedUpdates.ea0_attack_gap = quickShootSpeed / 100.0;

            // 使用 UI_HANDLER 更新详细输入框
            UI_HANDLER.updateForm(detailedUpdates);

            // 自动触发一次完整计算并显示结果
            this.runSingleWeaponCalculation(true);

            // 提示用户
            const $btn = $('#btn-apply-quick-settings');
            $btn.text('已应用!').css('opacity', 0.5);
            setTimeout(() => {
                $btn.text('应用快捷参数').css('opacity', 1);
            }, 1000);
        },


        setupTotalPowerSection: function() {
            const initialWeaponNum = parseInt($('#weapon_num').val());
            UI_HANDLER.createWeaponSlots(initialWeaponNum);
        },

        updateBaseData: function() {
            const weaponName = $('#arms_name').val();
            const weaponData = DATA_STORE.weaponsDataMap[weaponName];
            if (weaponData) {
                UI_HANDLER.updateForm(weaponData);
            }
            this.runSingleWeaponCalculation();
        },

        runSingleWeaponCalculation: function(showResults = false) {
            const currentInputs = UI_HANDLER.getAllInputs();
            const results = CALC_LOGIC.calculateAll(currentInputs);
            UI_HANDLER.updateForm(results);

            this.updateQuickSettingsSummary(); // 更新快捷设置摘要

            if (showResults) {
                UI_HANDLER.showFinalResults(results);
            }
        },

        runTotalPowerCalculation: function() {
            const globalParams = UI_HANDLER.getAllInputs();
            const weaponNum = parseInt($('#weapon_num').val());
            const tripleCrit = parseFloat($('#triple_crit').val()) || 0;

            let individualPowers = [];
            let selectedWeaponTypes = new Set();
            let hasError = false;

            for (let i = 1; i <= weaponNum; i++) {
                const weaponName = $(`#weapon-select-${i}`).val();
                if (!weaponName) {
                    alert(`请选择武器槽 ${i} 的武器！`);
                    hasError = true; 
                    break;
                }
                const weaponBaseData = DATA_STORE.weaponsDataMap[weaponName];
                selectedWeaponTypes.add(weaponBaseData.arms_type);

                // 合并全局参数和当前武器的特定参数进行计算
                const singleWeaponInputs = { ...globalParams, ...weaponBaseData, arms_name: weaponName };
                const singleWeaponResult = CALC_LOGIC.calculateAll(singleWeaponInputs);
                
                const finalDps = singleWeaponResult.final_dps;
                individualPowers.push(finalDps);
                $(`#weapon-power-${i}`).val(finalDps.toFixed(0));
            }

            if (hasError) return;

            const uniqueWeaponTypeNum = selectedWeaponTypes.size;
            const totalDps = CALC_LOGIC.calculateTotalCharacterPower(individualPowers, tripleCrit, weaponNum, uniqueWeaponTypeNum);
            $('#total_dps').val(totalDps.toFixed(0));
        },

        loadData: function() {
            const loadedData = STORAGE_HANDLER.load();
            if (loadedData) {
                UI_HANDLER.updateForm(loadedData);
                const num = loadedData['weapon_num'] ? parseInt(loadedData['weapon_num']) : 6;
                UI_HANDLER.createWeaponSlots(num);
                // 加载数据后，武器槽也需要填充
                for (let i = 1; i <= num; i++) {
                    if (loadedData[`weapon-select-${i}`]) {
                        $(`#weapon-select-${i}`).val(loadedData[`weapon-select-${i}`]);
                    }
                }
            $('.popover-container').each((index, el) => {
                this.updateMainParamFromPopover($(el));
            });
                console.log('成功从localStorage加载数据。');
            }
        },

        clearData: function() {
            if (confirm('确定要清除所有已保存的数据吗？此操作不可撤销。')) {
                STORAGE_HANDLER.clear();
                alert('已清除数据，页面将刷新以恢复默认值。');
                location.reload();
            }
        }
    };

    // --- 启动应用程序 ---
    App.init();
})