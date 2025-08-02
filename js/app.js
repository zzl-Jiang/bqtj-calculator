import { DATA_STORE } from './data.js';
import { CALC_LOGIC } from './logic.js';
import { UI_HANDLER } from './ui.js';
import { STORAGE_HANDLER } from './storage.js';
import { GRAPHICAL_UI_HANDLER } from './graphical_ui.js'; // 确保路径正确

$(function() {
    const App = {

        currentCalculationState: {}, // 用于存储当前计算状态，便于在标签页间共享
        latestTotalPower: 0, // 总战力的存储
        all_weaponNum: 6, // 武器槽位
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
                    GRAPHICAL_UI_HANDLER.init({ totalPower: this.latestTotalPower });
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
                console.log('change 事件触发!')
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
                    console.log('切换武器事件触发!')
                    this.rebuildCurrentState();
                    // 注意：切换武器后，不需要手动更新UI，因为后续的计算会刷新整个UI
                }
                
                // 只有在 change 事件后，才触发完整的计算和UI重绘
                this.runSingleWeaponCalculation();
            });

            $pane.on('click', '#btn-calculate-all', () => this.runSingleWeaponCalculation(true));

            // 初始加载时运行一次计算
            this.runSingleWeaponCalculation();
        },

        setupTotalPowerTab: function() {
            // console.log("人物总战力标签页设置...");  
            // 从图形化UI模块获取当前已装备的武器列表
            const equippedWeapons = GRAPHICAL_UI_HANDLER.getEquippedWeapons();
            const weaponNum = equippedWeapons.length;

            $('#weapon_num').val(weaponNum); // 用状态去更新UI
            // console.log(`获取 weaponNum 成功，值为: ${weaponNum}`);

            // 先只创建空的 select 元素
            UI_HANDLER.createWeaponSlots(weaponNum); 
            
            // 显式地为所有新的下拉框填充选项
            $('#weapon-slots-container .weapon-select').each(function() {
                UI_HANDLER.populateWeapons($(this)); // 假设 populateWeapons 可以接收一个jQuery对象作为目标
            });
            
            // 尝试从 localStorage 加载之前保存的总战力配置 (如果有)
            const savedTotalPowerConfig = this.loadTotalPowerSlots();

            console.log("已装备武器:", equippedWeapons);
            console.log("已保存的槽位配置:", savedTotalPowerConfig);

            // 遍历所有武器槽，按优先级填充
            for (let i = 1; i <= weaponNum; i++) {
                const $select = $(`#weapon-select-${i}`);
                let weaponToSelect = null;

                // 优先级1：使用上次保存的该槽位的武器
                if (savedTotalPowerConfig && savedTotalPowerConfig[i]) {
                    weaponToSelect = savedTotalPowerConfig[i];
                } 
                // 优先级2：按顺序使用图形化界面中已装备的武器
                else if (equippedWeapons[i - 1]) { // 数组索引从0开始
                    weaponToSelect = equippedWeapons[i - 1].name;
                }

                if (weaponToSelect) {
                    // 检查这个武器是否真的在下拉框的选项里
                    if ($select.find(`option[value="${weaponToSelect}"]`).length > 0) {
                        $select.val(weaponToSelect);
                        console.log(`总战力槽 ${i} 已自动选择武器: ${weaponToSelect}`);
                    } else {
                        console.warn(`无法为槽位 ${i} 选择武器 "${weaponToSelect}"，该武器不在选项中。`);
                    }
                }
            }

            // 绑定此标签页的专属事件
            const $pane = $('#tab-pane-total-power');

            // 解绑旧事件防止重复绑定
            $pane.off('change', '#weapon_num');
            $pane.off('click', '#btn-apply-quick-settings');
            $pane.off('click', '#btn-calculate-total-power');
            $pane.off('click', '#btn-save-total-power-slots');
            $pane.off('change', '.weapon-select');

            // 重新绑定
            $pane.on('change', '#weapon_num', () => {
                const num = parseInt($('#weapon_num').val());
                UI_HANDLER.createWeaponSlots(num);
                this.setupTotalPowerTab();
            });
            $pane.on('change', '.weapon-select', () => this.runTotalPowerCalculationFromTotalPowerTab());
            $pane.on('click', '#btn-apply-quick-settings', () => this.applyQuickSettings());
            $pane.on('click', '#btn-calculate-total-power', () => this.runTotalPowerCalculationFromTotalPowerTab());

            $pane.on('click', '#btn-save-total-power-slots', () => {
                this.saveTotalPowerSlots();
                alert('总战力武器槽配置已保存！');
            });

            // 更新快捷设置区域的摘要信息
            this.updateQuickSettingsSummary();
            this.runTotalPowerCalculation(); 
        },

        /**
         * 这是一个专门为 "total-power" 标签页设计的计算函数。
         * 它会从该标签页的UI读取武器选择，而不是从GRAPHICAL_UI_HANDLER获取。
         * 这允许用户在该标签页进行 "what-if" 模拟。
         */
        runTotalPowerCalculationFromTotalPowerTab: function() {
            console.log("正在从 '总战力' 标签页的UI执行计算...");
            const weaponNum = parseInt($('#weapon_num').val()) || 0;
            if (weaponNum === 0) {
                $('#total_dps').val(0);
                return;
            }

            let individualPowers = [];
            let selectedWeaponNames = [];
            let selectedWeaponTypes = new Set();
            let hasError = false;

            this.rebuildCurrentState();
            const globalState = this.preprocessInputs(this.currentCalculationState);

            for (let i = 1; i <= weaponNum; i++) {
                const weaponName = $(`#weapon-select-${i}`).val();
                if (!weaponName) {
                    alert(`请选择武器槽 ${i} 的武器！`);
                    hasError = true;
                    break;
                }
                selectedWeaponNames.push(weaponName);
            }

            if (hasError) {
                $('#total_dps').val(0);
                return;
            }

            // 与 runTotalPowerCalculation 类似的计算逻辑，但数据源是 selectedWeaponNames
            selectedWeaponNames.forEach((weaponName, index) => {
                const weaponBaseData = DATA_STORE.weaponsDataMap[weaponName];
                if (!weaponBaseData) {
                    $(`#weapon-power-${index + 1}`).val('错误');
                    return;
                }

                let singleWeaponState = { ...globalState, ...weaponBaseData };
                singleWeaponState.arms_name = singleWeaponState.cnName;
                
                const result = CALC_LOGIC.calculateAll(singleWeaponState);
                const singlePower = result.final_dps || 0;

                individualPowers.push(singlePower);
                selectedWeaponTypes.add(weaponBaseData.arms_type);
                $(`#weapon-power-${index + 1}`).val(singlePower.toFixed(0));
            });

            const tripleCrit = parseFloat(globalState.triple_crit) || 0;
            const uniqueWeaponTypeNum = selectedWeaponTypes.size;
            
            const totalDps = CALC_LOGIC.calculateTotalCharacterPower(
                individualPowers, 
                tripleCrit, 
                weaponNum, 
                uniqueWeaponTypeNum
            );
            
            // 只更新 total-power 标签页的UI，不影响 graphical UI 的战力显示
            $('#total_dps').val(totalDps.toFixed(0));
            console.log(`'总战力' 标签页模拟计算完成: ${totalDps.toFixed(0)}`);
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

            // 监听来自图形化UI的数据变更事件
            $(document).on('graphicalDataChanged', (event, data) => {
                console.log('App捕获到 graphicalDataChanged 事件:', data);

                // 重新运行总战力计算来反映数据的变化
                this.runTotalPowerCalculation(); 

                // 如果单武器页可见，且修改的是当前武器，也需要刷新
                const currentWeaponNameOnPage = $('#arms_name').val();
                if (data.item && data.item.name === currentWeaponNameOnPage && $('#tab-pane-single-weapon').is(':visible')) {
                    this.rebuildCurrentState(); // 重建 state 以获取最新的武器数据
                    this.runSingleWeaponCalculation();
                }
            });
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
            summaryUpdates.quick_percent_dps_mul = DATA_STORE.state.ea0_dps_mul || 0;

            // 汇总神战 (dps_all)
            summaryUpdates.quick_god_dps_mul = DATA_STORE.state.dps_all || 0;

            // 汇总百分比普伤 (ea0_hurt_mul)
            summaryUpdates.quick_percent_hurt_mul = DATA_STORE.state.ea0_hurt_mul || 0;

            // 汇总神伤 (hurt_all)
            summaryUpdates.quick_god_hurt_mul = DATA_STORE.state.hurt_all || 0;
            
            summaryUpdates.quick_whole_dps = DATA_STORE.state.whole_dps_mul * 100 || 0;
            summaryUpdates.quick_shoot_speed = DATA_STORE.state.ea0_attack_gap * 100 || 0;

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
            detailedUpdates.dps_all_president = presidentBonus;
            detailedUpdates.hurt_all_president = presidentBonus;
            
            detailedUpdates.ea0_attack_gap = quickShootSpeed / 100.0;
            console.log('detailedUpdates:', detailedUpdates);

            Object.assign(DATA_STORE.state, detailedUpdates);
            DATA_STORE.state = this.preprocessInputs(DATA_STORE.state);
            console.log('更新后状态:', DATA_STORE.state);

            this.updateQuickSettingsSummary();

            // 自动触发一次完整计算
            this.runTotalPowerCalculation();

            // 提示用户
            const $btn = $('#btn-apply-quick-settings');
            $btn.text('已应用!').addClass('is-applied'); // 添加一个类
            setTimeout(() => {
                $btn.text('应用快捷参数').removeClass('is-applied'); // 移除类
            }, 1000);
        },
        
        rebuildCurrentState: function() {
            const baseState = { ...DATA_STORE.state}; // 获取全局状态的基础副本
            console.log('rebuildCurrentState函数调用。当前状态:', baseState);

            let weaponName = (this.currentCalculationState && this.currentCalculationState.arms_name) || 
                DATA_STORE.state.arms_name || $('#arms_name').val(); // 获取当前武器名称
            // 如果没有指定武器名称，尝试从全局状态或默认值中获取
            if (!weaponName && DATA_STORE.weaponsData && DATA_STORE.weaponsData.length > 0) {
                // 使用武器列表中的第一个武器作为默认武器
                weaponName = DATA_STORE.weaponsData[0].cnName;
                console.log(`未找到当前武器，已自动设置为默认武器: ${weaponName}`);
            }

            const weaponData = weaponName ? DATA_STORE.weaponsDataMap[weaponName] : {}; // 获取武器的基础数据
            const equipData = this.createFlatEquipTable(DATA_STORE.equipData);
            // console.log("平铺后的装备属性表:", equipData);

            const dynamicEquipBonuses = {};
            DATA_STORE.equipData.forEach(equip => {
                const level = equip.equip_lv;
                if (equip.equip_type === 'head') {
                }
                if (equip.equip_type === 'coat') {
                    dynamicEquipBonuses.ea0_dps_coat = CALC_LOGIC.getEquipBonusByLevel('dps', level);
                    dynamicEquipBonuses.ea0_dps_mul_equip_coat = CALC_LOGIC.getEquipBonusByLevel('dpsMul', level);
                    dynamicEquipBonuses.ea0_hurt_coat = CALC_LOGIC.getEquipBonusByLevel('hurt', level);
                    dynamicEquipBonuses.ea0_hurt_mul_equip_coat = CALC_LOGIC.getEquipBonusByLevel('hurtMul', level);
                }
                if (equip.equip_type === 'pants') {
                    dynamicEquipBonuses.ea0_dps_pants = CALC_LOGIC.getEquipBonusByLevel('dps', level);
                    dynamicEquipBonuses.ea0_dps_mul_equip_pants = CALC_LOGIC.getEquipBonusByLevel('dpsMul', level);
                    dynamicEquipBonuses.ea0_hurt_pants = CALC_LOGIC.getEquipBonusByLevel('hurt', level);
                    dynamicEquipBonuses.ea0_hurt_mul_equip_pants = CALC_LOGIC.getEquipBonusByLevel('hurtMul', level);
                    dynamicEquipBonuses.ea0_dps_mul_equip_strengthen = CALC_LOGIC.getStrengthenBonusByLevel('addMul', equip.strengthen_lv);
                    console.log("强化加成：", dynamicEquipBonuses.ea0_dps_mul_equip_strengthen);
                }
                if (equip.equip_type === 'belt') {
                }
            });

            this.currentCalculationState = Object.assign({}, baseState, weaponData, equipData, dynamicEquipBonuses);
            if (weaponName) {
                this.currentCalculationState.arms_name = weaponName; // 确保武器名称被正确设置
            }
        },

        /**
         * 将 equipData 数组平铺成一个包含所有独特属性的单一对象。
         * @param {Array<object>} equipDataArray - 包含装备对象的数组。
         * @returns {object} - 一个平铺后的属性对象。
         */
        createFlatEquipTable(equipDataArray) {
            // 定义要忽略的通用属性键
            const excludedKeys = new Set([
                'cnName',
                'evo_lv',
                'color',
                'strengthen_lv',
                'equip_lv',
                'equip_type',
                'baseName'
            ]);

            // 创建一个空对象来存储结果
            const flatTable = {};

            // 遍历 equipData 数组
            for (const equipItem of equipDataArray) {
                // 遍历当前装备对象的每个属性 (使用 Object.entries 获取 [key, value] 对)
                for (const [key, value] of Object.entries(equipItem)) {
                    // 如果 key 不在忽略列表中
                    if (!excludedKeys.has(key)) {
                        // 将这个键值对添加到结果对象中
                        flatTable[key] = value;
                    }
                }
            }

            return flatTable;
        },
        
        runSingleWeaponCalculation: function(showResults = false) {
            console.log('单次计算函数调用。');
            if (!this.currentCalculationState || !this.currentCalculationState.arms_name) {
                console.error("计算失败：未提供武器名称或计算输入。");
                return;
            }

            const processedInputs = this.preprocessInputs(this.currentCalculationState);
            console.log('传入数据：', processedInputs);

            const result = CALC_LOGIC.calculateAll(processedInputs);
            const finalUIData = Object.assign({}, processedInputs, result);
            UI_HANDLER.updateForm(finalUIData); // 更新表单以显示计算结果

            if ($('#quick_percent_dps_mul').length) {
                this.updateQuickSettingsSummary(); // 更新快捷设置摘要
            }

            if (showResults) {
                UI_HANDLER.showFinalResults(result); // 显示最终结果
            }
        },

        computedPropertiesConfig: {
            'parts_dps_mul': ['parts_dps_mul_hunter', 'parts_dps_mul_chip'],
            'ea0_dps_mul_equip': ['ea0_dps_mul_equip_coat', 'ea0_dps_mul_equip_pants', 'ea0_dps_mul_equip_strengthen'],
            'ea0_hurt_mul_equip': ['ea0_hurt_mul_equip_coat', 'ea0_hurt_mul_equip_pants'],
            'ea0_dps_mul': ['ea0_dps_mul_equip', 'ea0_dps_mul_weapon', 'ea0_dps_mul_device', 'ea0_dps_mul_title',
                'ea0_dps_mul_union', 'ea0_dps_mul_rank', 'ea0_dps_mul_battle', 'ea0_dps_mul_honor', 'ea0_dps_mul_medal'],
            'ea0_hurt_mul': ['ea0_hurt_mul_equip', 'ea0_hurt_mul_medal'],
            'dps_all_equip': ['dps_all_equip_head', 'dps_all_equip_coat', 'dps_all_equip_belt', 'dps_all_equip_pants'],
            'dps_all': ['dps_all_equip', 'dps_all_fashion', 'dps_all_vehicle', 'dps_all_title', 'dps_all_food',
                'dps_all_peak', 'dps_all_president', 'dps_all_card', 'dps_all_building'],
            'hurt_all': ['hurt_all_president', 'hurt_all_fashion', 'hurt_all_card', 'hurt_all_set'],
            'ea0_dps': ['ea0_dps_coat', 'ea0_dps_pants'],
            'ea0_hurt': ['ea0_hurt_coat', 'ea0_hurt_pants'],
            'ea0_capacity_mul': ['ea0_capacity_mul_belt'],
            'ea0_reload_equip': ['ea0_reload_belt'],
            'ea0_reload': ['ea0_reload_equip', 'ea0_reload_medal'],
            'ea0_capacity': ['ea0_capacity_belt'],
        },

        preprocessInputs: function(inputs) {
            const processed = { ...inputs };

            for (const [parentKey, childKeys] of Object.entries(this.computedPropertiesConfig)) {
                let sum = 0;
                childKeys.forEach(childKey => {
                    sum += parseFloat(processed[childKey]) || 0;
                });
                processed[parentKey] = parseFloat(sum.toFixed(4));
            }

            return processed;
        },

        runTotalPowerCalculation: function() {
            console.log("正在执行总战力计算...");

            const equippedWeapons = GRAPHICAL_UI_HANDLER.getEquippedWeapons();
            const weaponNum = equippedWeapons.length; 

            if (weaponNum === 0) {
                $('#total_dps').val(0);
                this.latestTotalPower = 0;
                GRAPHICAL_UI_HANDLER.update({ totalPower: 0 });
                console.error('武器数量为0');
                return;
            }

            let individualPowers = [];
            let selectedWeaponTypes = new Set();

            // 确保我们拥有最新的全局参数
            this.rebuildCurrentState(); 
            const globalState = this.preprocessInputs(this.currentCalculationState);
            console.log('currentCalculationState:', this.currentCalculationState);
            console.log('总战力计算使用的全局参数:', globalState);


            equippedWeapons.forEach((weapon, index) => {
                const weaponName = weapon.name;

                if (!weaponName) {
                    console.error(`装备槽 ${index + 1} 的武器没有名称。`);
                    return; // 跳过这个无效的武器
                }

                const weaponBaseData = DATA_STORE.weaponsDataMap[weaponName];
                if (!weaponBaseData) {
                    console.error(`无法找到武器 [${weaponName}] 的基础数据`);
                    // 如果 total-power 标签页可见，更新对应的输入框
                    if ($(`#weapon-power-${index + 1}`).length) {
                        $(`#weapon-power-${index + 1}`).val('错误');
                    }
                    return; // 跳过这个武器
                }
                // 合并全局状态和当前武器的专属数据进行计算
                let singleWeaponState = Object.assign({}, globalState, weaponBaseData);
                singleWeaponState.arms_name = singleWeaponState.cnName; 
                
                const result = CALC_LOGIC.calculateAll(singleWeaponState);
                const singlePower = result.final_dps || 0;

                individualPowers.push(singlePower);
                selectedWeaponTypes.add(weaponBaseData.arms_type);

                // 如果 total-power 标签页可见，则更新其UI上的单个武器战力值
                if ($(`#weapon-power-${index + 1}`).length) {
                    $(`#weapon-power-${index + 1}`).val(singlePower.toFixed(0));
                }
            });

            // 使用内存中的战力数组计算总战力
            const tripleCrit = parseFloat(globalState.triple_crit) || 0;
            const uniqueWeaponTypeNum = selectedWeaponTypes.size;
            
            const totalDps = CALC_LOGIC.calculateTotalCharacterPower(
                individualPowers, 
                tripleCrit, 
                weaponNum, 
                uniqueWeaponTypeNum
            );

            // 更新最终的总战力到UI
            this.latestTotalPower = totalDps;
            if ($('#total_dps').length) {
                $('#total_dps').val(totalDps.toFixed(0));
            }
            $(document).trigger('totalPowerUpdated', { totalPower: this.latestTotalPower });
            console.log('战力组成:', individualPowers);
            console.log("总战力计算完成:", totalDps);
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
        },

        /**
         * 保存当前总战力页面的武器槽选择
         */
        saveTotalPowerSlots: function() {
            const weaponNum = parseInt($('#weapon_num').val()) || 0;
            const slotsConfig = {};
            for (let i = 1; i <= weaponNum; i++) {
                slotsConfig[i] = $(`#weapon-select-${i}`).val();
            }
            STORAGE_HANDLER.saveItem('total_power_slots_config', slotsConfig); 
        },

        /**
         * 从 localStorage 加载已保存的总战力武器槽选择
         */
        loadTotalPowerSlots: function() {
            return STORAGE_HANDLER.loadItem('total_power_slots_config');
        },

    };

    

    // --- 启动应用程序 ---
    App.init();
});