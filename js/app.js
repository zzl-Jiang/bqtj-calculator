import { DATA_STORE } from './data.js';
import { CALC_LOGIC } from './logic.js';
import { UI_HANDLER } from './ui.js';
import { STORAGE_HANDLER } from './storage.js';
import { GRAPHICAL_UI_HANDLER } from './graphical_ui.js'; // 确保路径正确

$(function() {
    const App = {
        // ======================================================
        // 1. 全局初始化
        // ======================================================
        init: function() {
            UI_HANDLER.init();          // 初始化 UI 模块
            this.loadData();               // 从localStorage加载数据（如果有）
            this.bindGlobalEvents();       // 绑定全局事件（非标签页特定）
            this.initTabSystem();          // 初始化标签页切换逻辑
            this.initPopovers();           // 初始化全局的 Popover 逻辑
            
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
            // console.log("单武器战力标签页设置...");

            UI_HANDLER.populateWeapons();
            // console.log("populateWeapons 调用完成");

            // 绑定此标签页的专属事件
            const $pane = $('#tab-pane-single-weapon');
            // console.log("获取 $pane 成功");

            $pane.on('change input', 'select, input[type="number"]', (e) => {
                if ($(e.target).is('#arms_name')) {
                    this.updateBaseData();
                } else {
                    this.runSingleWeaponCalculation();
                }
            });
            // console.log("change/input 事件绑定完成");

            $pane.on('click', '#btn-calculate-all', () => {
                // 当按钮被点击时，这里的代码应该被执行
                // console.log("#btn-calculate-all 被点击");
                this.runSingleWeaponCalculation(true); // 调用计算并显示结果
            });
            // console.log("#btn-calculate-all 的 click 事件绑定完成");

            // 初始加载时，根据当前选中的武器更新一次
            this.updateBaseData();
            // console.log("updateBaseData 调用完成");
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
            
            // 在调用 save 时，将全局状态对象传进去
            appContainer.on('click', '#btn-save-data', () => {
                // 在保存前，确保最新的UI输入已经同步到state
                const currentUIInputs = UI_HANDLER.getAllInputs();
                Object.assign(DATA_STORE.state, currentUIInputs);
                
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
        
        updateBaseData: function() {
            const weaponName = $('#arms_name').val();
            const weaponData = DATA_STORE.weaponsDataMap[weaponName];
            if (weaponData) {
                UI_HANDLER.updateForm(weaponData);
            }
            this.runSingleWeaponCalculation();
        },
        
        runSingleWeaponCalculation: function(showResults = false) {
            // 从 UI 获取最新的输入值，并同步更新到全局 state
            const currentUIInputs = UI_HANDLER.getAllInputs();
            Object.assign(DATA_STORE.state, currentUIInputs);

            // 获取当前选定武器的基础数据
            const weaponName = DATA_STORE.state.arms_name || $('#arms_name').val();
            const weaponBaseData = DATA_STORE.weaponsDataMap[weaponName] || {};
            
            // 合并全局状态和武器专属数据作为计算输入
            const calculationInputs = { ...DATA_STORE.state, ...weaponBaseData };
            
            const results = CALC_LOGIC.calculateAll(calculationInputs);
            
            // 将计算结果更新到UI
            UI_HANDLER.updateForm(results);
            
            // 如果总战力页面已加载，则更新其摘要
            if ($('#quick_percent_dps_mul').length) {
                this.updateQuickSettingsSummary();
            }

            if (showResults) {
                UI_HANDLER.showFinalResults(results);
            }
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