import { DATA_STORE } from './data.js';
import { CALC_LOGIC } from './logic.js';
import { UI_HANDLER } from './ui.js';
import { STORAGE_HANDLER } from './storage.js';
import { GRAPHICAL_UI_HANDLER } from './graphical_ui.js'; // 确保路径正确

$(function() {
    const App = {
        currentCalculationState: {}, // 用于存储当前计算状态，便于在标签页间共享
        // ======================================================
        // 1. 全局初始化
        // ======================================================
        init: function() {
            UI_HANDLER.init();          // 初始化 UI 模块
            this.loadData();               // 从localStorage加载数据（如果有）
            this.bindGlobalEvents();       // 绑定全局事件（非标签页特定）
            this.initTabSystem();          // 初始化标签页切换逻辑
            this.initPopovers();           // 初始化全局的 Popover 逻辑
            
            this.rebuildCurrentState(); // 重建当前状态，确保所有输入框都被正确初始化

            // 初始加载默认的标签页
            const initialTab = $('.tab-btn.active').data('tab') || 'graphical';
            this.loadTabContent(initialTab);
            this.updateTabIndicator($('.tab-btn.active')); 
        },

        // ======================================================
        // 2. 标签页系统
        // ======================================================
        initTabSystem: function() {
            $('#calculator-tabs').on('click', '.tab-btn', (e) => {
                const $button = $(e.currentTarget);
                if ($button.hasClass('active')) return;

                const tabName = $button.data('tab');

                $('.tab-btn').removeClass('active');
                $button.addClass('active');

                this.updateTabIndicator($button);

                this.loadTabContent(tabName);
            });
        },

        loadTabContent: async function(tabName) {
            const contentContainer = $('.tab-content');
            const filePath = `templates/${tabName}.html`;

            // 获取当前容器的高度
            const currentHeight = contentContainer.height();
            // 设置 min-height 来防止坍塌，并显示加载动画
            contentContainer.css('min-height', currentHeight + 'px').html('<div class="loader"></div>');
            
            try {
                const response = await fetch(filePath);
                if (!response.ok) throw new Error(`无法加载模板: ${filePath}`);
                const htmlContent = await response.text();
                
                contentContainer.html(htmlContent);
                contentContainer.find('.tab-pane').addClass('active');

                // 设置标签页并绑定其专属事件
                this.setupTab(tabName);

            } catch (error) {
                console.error('加载标签页内容失败:', error);
                contentContainer.html(`<p class="error-message">错误：无法加载内容。请检查文件路径或网络连接。</p>`);
            } finally {
                // 恢复原来的 min-height
                contentContainer.css('min-height', '');
            }
        },

        updateTabIndicator: function($activeTab) {
            const $indicator = $('.tab-indicator');
            
            // 确保活动标签和指示器都存在
            if (!$activeTab.length || !$indicator.length) {
                return;
            }

            const tabPosition = $activeTab.position(); // 获取按钮相对于其父容器的位置
            const tabWidth = $activeTab.outerWidth();   // 获取按钮的完整宽度 (包括 padding)

            // 设置指示器的 left 和 width，触发 CSS transition
            $indicator.css({
                left: `${tabPosition.left}px`,
                width: `${tabWidth}px`
            });
        },

        // ======================================================
        // 3. 标签页专属的设置与事件绑定
        // ======================================================
        setupTab: function(tabName) {
            // 将全局状态填充到新加载的模板中
            UI_HANDLER.updateForm(DATA_STORE.state);
           
            switch (tabName) {
                case 'single-weapon':
                    this.setupSingleWeaponTab();
                    break;
                case 'total-power':
                    this.setupTotalPowerTab();
                    break;
                case 'graphical':
                    GRAPHICAL_UI_HANDLER.init();
                    break;
            }

            // 更新所有popover关联的主输入框
            $('.popover-container').each((index, el) => {
                this.updateMainParamFromPopover($(el));
            });
        },

        setupSingleWeaponTab: function() {
            UI_HANDLER.populateWeapons();
            
            this.rebuildCurrentState();
            UI_HANDLER.updateForm(this.currentCalculationState);

            const $pane = $('#tab-pane-single-weapon');
            
            // 清除旧的绑定
            $pane.off('input change');

            // 绑定 input 事件，只做最轻量级的后台状态更新
            $pane.on('input', 'input[type="number"]', (e) => {
                const $target = $(e.target);
                const key = $target.attr('id');
                const value = $target.val(); // 获取原始字符串值

                // 直接用原始字符串更新 state，不进行强制类型转换
                // 这样 state 中就会有 "0." 这样的中间值
                this.currentCalculationState[key] = value; 
            });

            // 绑定 change 事件，用于最终的计算和渲染
            // 'change' 事件会在 <input> 失去焦点且值已改变，或 <select> 选择新值时触发
            $pane.on('change', 'select, input[type="number"]', (e) => {
                const $target = $(e.target);
                const key = $target.attr('id');
                let value = $target.val();

                // 在这里进行最终的验证和类型转换
                const numValue = parseFloat(value);
                if (!isNaN(numValue) && isFinite(value) && value.trim() !== '') {
                    value = numValue;
                } else if (value.trim() === '') {
                    // 如果用户清空了输入框，可以视为 0
                    value = 0;
                    // 更新UI，把空字符串变成 "0"
                    $target.val(value); 
                } else {
                    // 如果输入了 "abc" 这样的非法字符，可以回退到之前的值
                    // 为了简单起见，先假设用户不会恶意输入，后续有需要再加
                }

                // 用清理过的数据更新 state
                this.currentCalculationState[key] = value;

                // 如果是切换武器，需要重建整个 state
                if (key === 'arms_name') {
                    this.rebuildCurrentState();
                    // 注意：切换武器后，不需要手动更新UI，因为后续的计算会刷新整个UI
                }
                
                // 只有在 change 事件后，才触发完整的计算和UI重绘
                this.runSingleWeaponCalculation();
            });

            // 初始加载时运行一次计算
            this.runSingleWeaponCalculation();
        },

        setupTotalPowerTab: function() {
            // console.log("人物总战力标签页设置...");

            const weaponNum = parseInt($('#weapon_num').val());
            // console.log(`获取 weaponNum 成功，值为: ${weaponNum}`);

            UI_HANDLER.createWeaponSlots(weaponNum);
            // console.log("UI_HANDLER.createWeaponSlots 调用完成");
            
            // 从当前表单状态恢复武器槽选择，而不仅仅是localStorage
            const currentInputs = UI_HANDLER.getAllInputs();
            for (let i = 1; i <= weaponNum; i++) {
                const weaponId = `weapon-select-${i}`;
                if (currentInputs[weaponId]) {
                    $(`#${weaponId}`).val(currentInputs[weaponId]);
                }
            }

            // 绑定此标签页的专属事件
            const $pane = $('#tab-pane-total-power');
            $pane.on('change', '#weapon_num', () => {
                const num = parseInt($('#weapon_num').val());
                UI_HANDLER.createWeaponSlots(num);
            });
            $pane.on('click', '#btn-apply-quick-settings', () => this.applyQuickSettings());
            $pane.on('click', '#btn-calculate-total-power', () => this.runTotalPowerCalculation());

            // 更新快捷设置区域的摘要信息
            this.updateQuickSettingsSummary();
        },

        // ======================================================
        // 4. 全局事件绑定
        // ======================================================
        bindGlobalEvents: function() {
            const appContainer = $('#power-calculator-app');
            
            appContainer.on('click', '#btn-save-data', () => {
                const stateKeys = Object.keys(DATA_STORE.state);
                const dataToSave = {};

                for (const key of stateKeys) {
                    if (this.currentCalculationState.hasOwnProperty(key)) {
                        dataToSave[key] = this.currentCalculationState[key];
                    }
                }

                Object.assign(DATA_STORE.state, dataToSave); // 更新全局状态
                
                STORAGE_HANDLER.save(DATA_STORE.state); 
            });
            appContainer.on('click', '#btn-clear-data', () => this.clearData());
        },

        // ======================================================
        // 5. Popover 逻辑
        // ======================================================
        initPopovers: function() {
            const appContainer = $('#power-calculator-app');

            appContainer.on('click', '.info-icon', function(e) {
                e.preventDefault();
                e.stopPropagation();
                const $icon = $(this);
                const targetId = $icon.data('popover-target');
                const $popover = $(targetId);
                if (!$popover.length) return;

                const isCurrentlyVisible = $popover.hasClass('visible');
                $('.popover-container').removeClass('visible'); // Close all others

                if (!isCurrentlyVisible) {
                    const iconOffset = $icon.offset();
                    const containerOffset = appContainer.offset();
                    $popover.css({
                        top: (iconOffset.top - containerOffset.top + $icon.outerHeight() + 5) + 'px',
                        left: (iconOffset.left - containerOffset.left) + 'px',
                    }).addClass('visible');
                }
            });

            appContainer.on('click', '.close-popover', function() {
                $(this).closest('.popover-container').removeClass('visible');
            });

            $(document).on('click', function(e) {
                if (!$(e.target).closest('.popover-container, .info-icon').length) {
                    $('.popover-container').removeClass('visible');
                }
            });
            
            $('.popover-container').removeClass('visible');
        },


        // ======================================================
        // 6. 其他函数
        // ======================================================

        updateMainParamFromPopover: function($popover) {
            const mainInputId = $popover.data('main-input-id');
            if (!mainInputId) return;

            const $mainInput = $('#' + mainInputId);
            let sum = 0;
            $popover.find('.constituent-input').each(function() {
                sum += parseFloat($(this).val()) || 0;
            });
            $mainInput.val(sum.toFixed(4)).trigger('input');
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
            $btn.text('已应用!').addClass('is-applied'); // 添加一个类
            setTimeout(() => {
                $btn.text('应用快捷参数').removeClass('is-applied'); // 移除类
            }, 1000);
        },
        
        rebuildCurrentState: function() {
            const baseState = { ...DATA_STORE.state}; // 获取全局状态的基础副本

            let weaponName = (this.currentCalculationState && this.currentCalculationState.arms_name) || 
                DATA_STORE.state.arms_name || $('#arms_name').val(); // 获取当前武器名称
            // 如果没有指定武器名称，尝试从全局状态或默认值中获取
            if (!weaponName && DATA_STORE.weaponsData && DATA_STORE.weaponsData.length > 0) {
                // 使用武器列表中的第一个武器作为默认武器
                weaponName = DATA_STORE.weaponsData[0].cnName;
                console.log(`未找到当前武器，已自动设置为默认武器: ${weaponName}`);
            }

            const weaponData = weaponName ? DATA_STORE.weaponsDataMap[weaponName] : {}; // 获取武器的基础数据

            this.currentCalculationState = Object.assign({}, baseState, weaponData); // 合并全局状态和武器数据
            if (weaponName) {
                this.currentCalculationState.arms_name = weaponName; // 确保武器名称被正确设置
            }
        },
        
        runSingleWeaponCalculation: function(showResults = false) {
            if (!this.currentCalculationState || !this.currentCalculationState.arms_name) {
                console.error("计算失败：未提供武器名称或计算输入。");
                return;
            }

            const processedInputs = this.preprocessInputs(this.currentCalculationState);

            const result = CALC_LOGIC.calculateAll(processedInputs);
            const finalUIData = Object.assign({}, processedInputs, result);
            UI_HANDLER.updateForm(finalUIData); // 更新表单以显示计算结果

            if ($('quik_percent_dps_mul').length) {
                this.updateQuickSettingsSummary(); // 更新快捷设置摘要
            }

            if (showResults) {
                UI_HANDLER.showFinalResults(result); // 显示最终结果
            }
        },

        /**
         * 预处理器，在计算前确保所有父属性都是最新的
         * @param {object} inputs - 原始的 currentCalculationState
         * @returns {object} - 一个新的、所有父属性都已更新的对象
         */
        preprocessInputs: function(inputs) {
            // 创建一个副本，避免修改原始的 currentCalculationState
            const processed = { ...inputs };

            // 计算 parts_dps_mul
            processed.parts_dps_mul = (parseFloat(processed.parts_dps_mul_hunter) || 0) + 
                                    (parseFloat(processed.parts_dps_mul_chip) || 0);

            // 计算 ea0_dps_mul
            processed.ea0_dps_mul = (parseFloat(processed.ea0_dps_mul_equip) || 0) +
                                    (parseFloat(processed.ea0_dps_mul_weapon) || 0) +
                                    (parseFloat(processed.ea0_dps_mul_device) || 0) +
                                    (parseFloat(processed.ea0_dps_mul_title) || 0) +
                                    (parseFloat(processed.ea0_dps_mul_union) || 0) +
                                    (parseFloat(processed.ea0_dps_mul_rank) || 0) +
                                    (parseFloat(processed.ea0_dps_mul_battle) || 0) +
                                    (parseFloat(processed.ea0_dps_mul_honor) || 0) +
                                    (parseFloat(processed.ea0_dps_mul_medal) || 0);
            
            // 计算 ea0_hurt_mul
            processed.ea0_hurt_mul = (parseFloat(processed.ea0_hurt_mul_equip) || 0) +
                                    (parseFloat(processed.ea0_hurt_mul_medal) || 0);

            // 计算 dps_all
            processed.dps_all = (parseFloat(processed.dps_all_equip) || 0) +
                                (parseFloat(processed.dps_all_fashion) || 0) +
                                (parseFloat(processed.dps_all_vehicle) || 0) +
                                (parseFloat(processed.dps_all_title) || 0) +
                                (parseFloat(processed.dps_all_food ) || 0) +
                                (parseFloat(processed.dps_all_peak) || 0) +
                                (parseFloat(processed.dps_all_president) || 0) +
                                (parseFloat(processed.dps_all_card) || 0) +
                                (parseFloat(processed.dps_all_building) || 0);
            
            // 计算 hurt_all
            processed.hurt_all = (parseFloat(processed.hurt_all_equip) || 0) +
                                (parseFloat(processed.hurt_all_fashion) || 0) +
                                (parseFloat(processed.hurt_all_card) || 0) +
                                (parseFloat(processed.hurt_all_set) || 0);

            return processed;
        },

        runTotalPowerCalculation: function() {
            // console.log("一键计算按钮被点击，runTotalPowerCalculation 函数开始执行...");
            // 将当前页面的输入（如三暴）也同步到 state
            const currentTotalPowerInputs = UI_HANDLER.getAllInputs();
            Object.assign(DATA_STORE.state, currentTotalPowerInputs);
            
            const weaponNum = parseInt(DATA_STORE.state.weapon_num);
            const tripleCrit = parseFloat(DATA_STORE.state.triple_crit) || 0;

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

                // 合并全局状态和当前武器的特定数据
                const singleWeaponInputs = { ...DATA_STORE.state, ...weaponBaseData };
                
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
                // 将加载的数据合并到全局 state 中
                Object.assign(DATA_STORE.state, loadedData);
                // console.log('成功从localStorage加载数据并更新全局状态。');
            }
            // 无论是否加载成功，都用当前的 state 更新 UI
            UI_HANDLER.updateForm(DATA_STORE.state);
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
});