// js/graphical_ui.js
import { DATA_STORE } from './data.js';
// 数据可以放在模块内部，因为它们专属于这个UI
const graphicalItemsData = [
    // 装备
    { 
        id: 'equip-head',
        type: 'equipment', 
        slotType: 'equip-right',
        name: '战神的蔑视', 
        baseName: '狂人头盔',
        iconUrl: '../images/equip/madpur_head.png', 
        isLocked: true 
    },
    { 
        id: 'equip-coat',
        type: 'equipment', 
        slotType: 'equip-left',
        name: '战神的戒严', 
        baseName: '狂人战衣',
        iconUrl: '../images/equip/madpur_coat.png', 
        isLocked: true 
    },
    { 
        id: 'equip-belt', 
        type: 'equipment', 
        slotType: 'equip-right',
        name: '战神的降临', 
        baseName: '狂人腰带',
        iconUrl: '../images/equip/madpur_belt.png', 
        isLocked: true 
    },
    { 
        id: 'equip-pants', 
        type: 'equipment', 
        slotType: 'equip-left',
        name: '战神的讨伐', 
        baseName: '狂人战裤',
        iconUrl: '../images/equip/madpur_pants.png', 
        isLocked: true 
    },
    {
        id: 'jewelry',
        type: 'jewelry',
        slotType: 'jewelry',
        name: '超远视镜',
        level: 1,
        isLocked: true,
        iconUrl: '../images/jewelry/superGlasses.png'
    },
    {
        id: 'shell',
        type: 'shell',
        slotType: 'shell',
        name: '海绵护盾',
        level: 3,
        isLocked: true,
        iconUrl: '../images/shell/spongeShell.png'
    },
    { 
        id: 'costume', 
        type: 'equipment', 
        slotType: 'costume',
        name: '时装显示', 
        isCostume: true 
    },
    { 
        id: 'footer-fashion', 
        type: 'equipment', 
        slotType: 'footer-item', 
        name: '时装', 
        iconUrl: '../images/fashion/xiaoAi.png',
        isLocked: true
    },
    { 
        id: 'footer-weapon', 
        type: 'equipment', 
        slotType: 'footer-item', 
        name: '副手', 
        level: 4, 
        iconUrl: '../images/weapon/sickle.png', 
        isLocked: true 
    },
    { 
        id: 'footer-device', 
        type: 'equipment', 
        slotType: 'footer-item', 
        name: '装置', 
        level: 8, 
        iconUrl: '../images/device/blackHole.png', 
        isLocked: true 
    },
    { 
        id: 'footer-vehicle', 
        type: 'equipment', 
        slotType: 'footer-item', 
        name: '神圣盖亚', 
        level: 99, 
        enhancementLevel: 50, 
        iconUrl: '../images/vehicle/godGaia.png', 
        isLocked: true 
    },
    // 武器
    { 
        id: 'arm-1', 
        type: 'arms', 
        slotType: 'arms',
        name: '猩焰', 
        iconUrl: '../images/arms/redFire.png', 
        lock_parts_precision_lv: true,
        lock_parts_shoot_range_lv: true,
        isLocked: true 
    },
    { 
        id: 'arm-2', 
        type: 'arms', 
        slotType: 'arms',
        name: '银狐', 
        iconUrl: '../images/arms/pistolFox.png', 
        isLocked: true 
    },
    { 
        id: 'arm-3', 
        type: 'arms', 
        slotType: 'arms',
        name: '铄金', 
        iconUrl: '../images/arms/meltFlamer.png', 
        lock_parts_shoot_range_lv: true,
        isLocked: true 
    },
    { 
        id: 'arm-4', 
        type: 'arms', 
        slotType: 'arms',
        name: '赤鼬', 
        iconUrl: '../images/arms/shotgunSkunk.png', 
        isLocked: true 
    },
    { 
        id: 'arm-5', 
        type: 'arms', 
        slotType: 'arms',
        name: '金蝉', 
        iconUrl: '../images/arms/sniperCicada.png', 
        isLocked: true 
    },
    { 
        id: 'arm-6', 
        type: 'arms',
        slotType: 'arms',
        name: '青蜂', 
        iconUrl: '../images/arms/rifleHornet.png', 
        isLocked: true 
    },
    { 
        id: 'arm-7', 
        type: 'arms',
        slotType: 'arms_bag',
        name: '卡特巨炮', 
        iconUrl: '../images/arms/rocketCate.png', 
        lock_parts_shoot_range_lv: true,
        isLocked: true 
    },
    {
        id: 'arm-8', 
        type: 'arms',
        slotType: 'arms_bag',
        name: '极源', 
        iconUrl: '../images/arms/extremeGun.png', 
        lock_parts_shoot_range_lv: true,
        isLocked: true 
    },
    {
        id: 'arm-9', 
        type: 'arms',
        slotType: 'arms_bag',
        name: '隼武', 
        iconUrl: '../images/arms/falconGun.png', 
        lock_parts_shoot_range_lv: true,
        isLocked: true 
    },
    {
        id: 'arm-10', 
        type: 'arms',
        slotType: 'arms_bag',
        name: '光锥', 
        iconUrl: '../images/arms/lightCone.png', 
        lock_parts_precision_lv: true,
        isLocked: true 
    },
    {
        id: 'arm-11', 
        type: 'arms',
        slotType: 'arms_bag',
        name: '辰龙', 
        iconUrl: '../images/arms/yearDragon.png', 
        isLocked: true 
    },
    {
        id: 'arm-12', 
        type: 'arms',
        slotType: 'arms_bag',
        name: '未羊', 
        iconUrl: '../images/arms/yearSheep.png', 
        lock_parts_precision_lv: true,
        isLocked: true 
    },
    {
        id: 'arm-13', 
        type: 'arms',
        slotType: 'arms_bag',
        name: '寅虎', 
        iconUrl: '../images/arms/yearTiger.png', 
        lock_parts_shoot_range_lv: true,
        isLocked: true 
    }
];

const EVO_LEVEL_OPTIONS = [
    { value: 0, text: 'I' },
    { value: 1, text: 'II' },
    { value: 2, text: 'III' },
    { value: 3, text: '闪耀I' },
    { value: 4, text: '闪耀II' },
    { value: 5, text: '闪耀III' },
    { value: 6, text: '闪耀IV' },
    { value: 7, text: '绝世I' },
    { value: 8, text: '绝世II' },
    { value: 9, text: '超凡I' },
    { value: 10, text: '超凡II' },
    { value: 11, text: '超凡III' },
    { value: 12, text: '超凡IV' },
    { value: 13, text: '无双I' },
    { value: 14, text: '无双II' },
    { value: 15, text: '氩星' }
];

const CATE_EVO_LEVEL_OPTIONS = [
    { value: 4, text: 'I' },
    { value: 5, text: 'II' },
    { value: 6, text: 'III' },
    { value: 7, text: '闪耀I' },
    { value: 13, text: '无双I' }
];

const DARKGOLD_EVO_LEVEL_OPTIONS = [
    { value: 0, text: 'I' },
    { value: 1, text: 'II' },
    { value: 2, text: 'III' },
    { value: 3, text: 'IV' },
    { value: 4, text: '无双I' }
];

const YEAR_EVO_LEVEL_OPTIONS = [
    { value: 0, text: 'I' },
    { value: 1, text: '无双I' },
];

const DARKGOLD_EQUIP_EVO_OPTIONS = [
    { value: 0, text: 'I' },
    { value: 1, text: 'II' },
    { value: 2, text: 'III' },
    { value: 3, text: 'IV' },
    { value: 4, text: '闪耀I' },
    { value: 5, text: '闪耀II' },
    { value: 6, text: '闪耀III' },
    { value: 7, text: '闪耀IV' },
    { value: 8, text: '超凡I' },
    { value: 9, text: '超凡II' },
    { value: 10, text: '超凡III' },
    { value: 11, text: '超凡IV' },
    { value: 12, text: '超凡V' },
    { value: 13, text: '超凡VI' },
    { value: 14, text: '超凡VII' },
    { value: 15, text: '超凡VIII' },
    { value: 16, text: '无双I' },
    { value: 17, text: '无双II' },
];

export const GRAPHICAL_UI_HANDLER = {
    cache: {}, // 用于缓存DOM元素
    currentlyClickedSlotId: null, // 用于存储当前被点击的装备槽物品ID
    isInitialized: false,

    /**
     * 初始化模块，只在第一次加载标签页时执行
     */
    init: function(initialData = {}) {
        
        // 缓存容器元素
        this.cache.equipmentLeft = $('#equipment-left');
        this.cache.equipmentRight = $('#equipment-right');
        this.cache.jewelry = $('#jewelry');
        this.cache.shell = $('#shell');
        this.cache.costumeContainer = $('#costume-slot-container');
        this.cache.footerItemsContainer = $('#footer-items-container');
        this.cache.armsPanel = $('#arms-panel');

        // 缓存模态框相关元素
        this.cache.armSwitchModal = $('#arm-switch-modal');
        this.cache.modalTitle = $('#modal-title');
        this.cache.armInventoryPanel = $('#arm-inventory-panel');
        this.cache.closeArmModalBtn = $('#close-arm-modal');
        this.cache.modalTabs = $('.modal-tabs');
        this.cache.modalTabPanes = {
            'switch': $('#modal-tab-content-switch'),
            'adjust': $('#modal-tab-content-adjust'),
            'parts': $('#modal-tab-content-parts')
        };

        // 缓存其他静态信息元素 (用于未来的update)
        this.cache.power = $('.power-value');
        this.cache.level = $('.char-level');
        this.cache.vip = $('.char-vip');
        
        // 渲染所有物品
        this.renderAllItems();
        this.bindEvents(); // 将所有事件绑定集中到一个函数中
        if (initialData.totalPower !== undefined) {
            this.update({ totalPower: initialData.totalPower });
        }

        $(document).on('totalPowerUpdated', (event, data) => {
            // 当事件被触发时，这个回调函数会自动执行
            console.log("图形化界面收到了战力更新通知！");
            
            // 'data' 就是 trigger 时传递的那个对象
            this.update(data);
        });

        if (!this.isInitialized) {
            $(document).trigger('graphicalDataChanged', {
                type: 'paramUpdate'
            });
            this.isInitialized = true;
        }
    },

    /**
     * 绑定所有事件
     */
    bindEvents: function() {
        // 定义一个包含所有可交互物品槽 class 的选择器字符串
        const allItemSlotsSelector = '.arm-slot, .equip-slot, .jewelry-slot, .shell-slot';

        // 使用事件委托，将点击事件绑定在顶层容器上
        $('#tab-pane-graphical').on('click', allItemSlotsSelector, (e) => {
            const clickedSlot = e.currentTarget;
            const itemId = $(clickedSlot).data('item-id');

            // 检查物品是否有 isCostume 属性，如果是，则不打开模态框
            const itemData = this.getItemById(itemId);
            if (itemData && itemData.isCostume) {
                console.log("点击了时装切换框，不执行任何操作。");
                return;
            }
            
            if (itemId) { // 确保点击的槽位有物品
                this.openItemModal(itemId);
            }
        });

        // 给模态框的关闭按钮绑定事件
        this.cache.closeArmModalBtn.on('click', () => {
            this.closeItemModal();
        });

        // 点击模态框背景也可以关闭
        this.cache.armSwitchModal.on('click', (e) => {
            if (e.target === this.cache.armSwitchModal[0]) {
                this.closeItemModal();
            }
        });

        // 背包武器点击事件 (只在“切换武器”标签页内生效)
        this.cache.armInventoryPanel.on('click', '.arm-slot', (e) => {
            const inventoryItemId = $(e.currentTarget).data('item-id');
            this.swapItems(this.currentlyClickedSlotId, inventoryItemId);
        });

        // 为模态框内的标签页按钮绑定点击事件
        this.cache.modalTabs.on('click', '.modal-tab-btn', (e) => {
            const tabName = $(e.currentTarget).data('tab');
            this.switchModalTab(tabName);
        });

        // “调整参数”表单的事件
        // 使用事件委托，因为表单是动态生成的
        this.cache.modalTabPanes['adjust'].on('change', 'input, select', (e) => {
            const input = $(e.currentTarget);
            const paramName = input.attr('name');
            const newValue = input.val();
            const updatedValue = this.updateItemParameter(this.currentlyClickedSlotId, paramName, newValue);
            if (updatedValue !== undefined && updatedValue != newValue) {
                input.val(updatedValue);
            }
        });
        // “调整零件”表单的事件
        this.cache.modalTabPanes['parts'].on('change', 'input', (e) => {
            const input = $(e.currentTarget);
            const paramName = input.attr('name');
            const newValue = input.val();
            const updatedValue = this.updateItemParameter(this.currentlyClickedSlotId, paramName, newValue);
            if (updatedValue !== undefined && updatedValue != newValue) {
                input.val(updatedValue);
            }
        });
    },

    /**
     * 辅助函数：根据ID获取完整的、合并了DATA_STORE数据的物品对象
     * @param {string} itemId - 物品的ID
     * @returns {object | null} - 合并后的完整物品对象
     */
    getMergedItemById: function(itemId) {
        // 从本模块的数组中找到UI基础数据
        const uiItemData = graphicalItemsData.find(item => item.id === itemId);
        if (!uiItemData) return null;

        let mergedData = {};

        if (uiItemData.type === 'arms') {
            // 如果是武器，从 DATA_STORE 获取业务数据
            const businessData = DATA_STORE.weaponsDataMap[uiItemData.name];
            if (!businessData) {
                console.warn(`在DATA_STORE中找不到武器 [${uiItemData.name}] 的业务数据`);
                return uiItemData; // 即使找不到，也返回基础数据，避免崩溃
            }

            // 合并数据：将业务数据合并到UI数据上
            // 为了不修改原始数据，创建一个新对象，还需要将 DATA_STORE 的字段名转换为 UI 期望的字段名
            mergedData = {
                ...uiItemData, // 基础UI属性 (id, iconUrl, slotType...)
                level: businessData.arms_lv,
                enhancementLevel: businessData.strengthen_lv,
                evoLevel: businessData.evo_lv,
                element: businessData.element,
                color: businessData.color,
                // 零件等级
                parts_dps_lv: businessData.parts_dps_lv,
                parts_capacity_lv: businessData.parts_capacity_lv,
                parts_attack_gap_lv: businessData.parts_attack_gap_lv,
                parts_reload_lv: businessData.parts_reload_lv,
                parts_precision_lv: businessData.parts_precision_lv,
                parts_shoot_range_lv: businessData.parts_shoot_range_lv,
                // 特零加成
                parts_dps_mul_hunter: businessData.parts_dps_mul_hunter,
                parts_dps_mul_chip: businessData.parts_dps_mul_chip,
            };

            // 动态计算颜色
            mergedData.color = this.updateArmColor(mergedData); 
        }
        else if (uiItemData.type === 'equipment') {
            const businessData = DATA_STORE.equipDataMap[uiItemData.baseName]
            if (!businessData) {
                console.warn(`在DATA_STORE中找不到装备 [${uiItemData.name}] 的业务数据`);
                return uiItemData; // 即使找不到，也返回基础数据，避免崩溃
            }
            
            mergedData = {
                ...uiItemData, // 基础UI属性 (id, iconUrl, slotType...)
                level: businessData.equip_lv,
                enhancementLevel: businessData.strengthen_lv,
                evoLevel: businessData.evo_lv,
                color: businessData.color,
            };

            mergedData.color = this.updateEquipColor(mergedData);
        }

        return mergedData;
    },

    /**
     * 打开武器切换模态框
     * @param {string} itemId - 被点击的装备槽中的物品ID
     */
    openItemModal: function(itemId) {
        this.currentlyClickedSlotId = itemId; // 记录是从哪个槽点开的
        const itemData = this.getItemDataByName(this.getItemById(itemId).name);

        if (!itemData) return;

        // 清空并重新渲染背包面板
        this.cache.armInventoryPanel.empty();

        this.cache.modalTitle.text(`正在编辑: ${itemData.name}`);
        this.switchModalTab('switch');
        
        // 显示模态框
        this.cache.armSwitchModal.fadeIn(200);
    },

    /**
     * 关闭武器切换模态框
     */
    closeItemModal: function() {
        this.cache.armSwitchModal.fadeOut(200);
        this.currentlyClickedSlotId = null; // 清理状态
    },

    /**
     * 执行武器交换的核心逻辑
     * @param {string} equippedItemId - 装备槽中的物品ID
     * @param {string} inventoryItemId - 背包中被点击的物品ID
     */
    swapItems: function(equippedItemId, inventoryItemId) {
        console.log(`准备交换: 装备槽[${equippedItemId}] <-> 背包[${inventoryItemId}]`);

        // 在 graphicalItemsData 数组中找到这两个物品的索引
        const equippedItemIndex = graphicalItemsData.findIndex(item => item.id === equippedItemId);
        const inventoryItemIndex = graphicalItemsData.findIndex(item => item.id === inventoryItemId);

        if (equippedItemIndex === -1 || inventoryItemIndex === -1) {
            console.error("交换失败：找不到物品。");
            return;
        }

        // 交换它们的核心属性，这里只交换 slotType
        const equippedItem = graphicalItemsData[equippedItemIndex];
        const inventoryItem = graphicalItemsData[inventoryItemIndex];

        // 交换 slotType
        [equippedItem.slotType, inventoryItem.slotType] = [inventoryItem.slotType, equippedItem.slotType];

        console.log("交换后数据:", graphicalItemsData);

        // 交换完成后，关闭模态框
        this.closeItemModal();

        // 重新渲染所有UI来反映数据的变化！
        this.renderAllItems();

        // 触发全局事件，通知数据已变更
        $(document).trigger('graphicalDataChanged', {
            type: 'swap',
            swappedItems: [equippedItemId, inventoryItemId]
        });
    },

    /**
     * 切换模态框内的标签页
     * @param {string} tabName - 'switch' 或 'adjust' 或 'parts'
     */
    switchModalTab: function(tabName) {
        // 更新按钮的激活状态
        this.cache.modalTabs.find('.modal-tab-btn').removeClass('active');
        this.cache.modalTabs.find(`.modal-tab-btn[data-tab="${tabName}"]`).addClass('active');

        // 切换内容面板的显示
        Object.values(this.cache.modalTabPanes).forEach($pane => $pane.removeClass('active'));
        this.cache.modalTabPanes[tabName].addClass('active');
        
        // 根据激活的标签页，动态加载其内容
        this.loadModalTabContent(tabName);
    },

    /**
     * 根据标签页名称，加载对应的内容
     * @param {string} tabName 
     */
    loadModalTabContent: function(tabName) {
        const itemData = this.getMergedItemById(this.currentlyClickedSlotId);
        if (!itemData) return;
        
        const isArm = itemData.type === 'arms';
        const isEquipment = itemData.type === 'equipment';

        // “切换”标签页：武器和装备可以切换
        if (isArm || isEquipment) {
            this.cache.modalTabs.find('[data-tab="switch"]').show();
        } else {
            this.cache.modalTabs.find('[data-tab="switch"]').hide();
        }
        
        // “零件”标签页：只有武器有
        if (isArm) {
            this.cache.modalTabs.find('[data-tab="parts"]').show();
        } else {
            this.cache.modalTabs.find('[data-tab="parts"]').hide();
        }

        // 根据标签页和物品类型加载内容
        switch(tabName) {
            case 'switch':
                // 传递物品类型，让渲染函数知道要找哪种背包
                this.renderInventoryForSwitching(itemData.type);
                break;
            case 'adjust':
                // 传递完整的物品数据，让表单生成函数知道要生成哪种表单
                this.renderAdjustParamsForm(itemData);
                break;
            case 'parts':
                 // 再次确认是武器才渲染
                if (isArm) {
                    this.renderPartsParamsForm(itemData);
                }
                break;
        }
    },

    /**
     * 渲染“切换”标签页的内容
     * @param {string} itemType - 当前编辑的物品类型 ('arms', 'equipment' 等)
     */
    renderInventoryForSwitching: function(itemType) {
        this.cache.armInventoryPanel.empty();

        // 根据物品类型决定背包的 slotType
        let bagSlotType = '';
        if (itemType === 'arms') {
            bagSlotType = 'arms_bag';
        } else if (itemType === 'equipment') {
            bagSlotType = 'equip_bag';
        } else {
            // 其他类型暂时不支持切换
            return;
        }

        graphicalItemsData
            // 使用动态的 bagSlotType 进行筛选
            .filter(itemStub => itemStub.slotType === bagSlotType)
            .map(itemStub => this.getMergedItemById(itemStub.id))
            .forEach(fullItemData => {
                if (fullItemData) {
                    const itemHtml = this.renderItemSlot(fullItemData);
                    this.cache.armInventoryPanel.append(itemHtml);
                }
            });
        this.scaleImages();
    },

    /**
     * 渲染“调整参数”标签页的表单
     * @param {object} itemData - 当前正在编辑的物品的数据
     */
    renderAdjustParamsForm: function(itemData) {
        const formContainer = this.cache.modalTabPanes['adjust'];
        formContainer.empty(); // 清空旧表单

        let evo_options = EVO_LEVEL_OPTIONS;
        if (itemData.name === '卡特巨炮') evo_options = CATE_EVO_LEVEL_OPTIONS;
        else if (DATA_STORE.DARKGOLD_WEAPON_NAMES.includes(itemData.name)) evo_options = DARKGOLD_EVO_LEVEL_OPTIONS;
        else if (DATA_STORE.YEAR_WEAPON_NAMES.includes(itemData.name)) evo_options = YEAR_EVO_LEVEL_OPTIONS;
        else if (itemData.type === 'equipment') evo_options = DARKGOLD_EQUIP_EVO_OPTIONS;

        // 动态生成进阶等级的 <option> 标签
        const evoLevelOptionsHtml = evo_options.map(option => {
            // 检查当前选项的值是否与物品的进阶等级匹配
            const isSelected = (option.value === itemData.evoLevel) ? 'selected' : '';
            return `<option value="${option.value}" ${isSelected}>${option.text} (+${option.value})</option>`;
        }).join('');

        let formHtml = '';
        switch (itemData.type) {
            case 'equipment':
            case 'arms':
                if (itemData.slotType !== 'footer-item') {
                    formHtml = `
                        <div class="param-adjust-form">
                            <div class="form-group">
                                <label for="param-level">等级 (Level):</label>
                                <input type="number" id="param-level" name="level" value="${itemData.level || ''}">
                            </div>
                            <div class="form-group">
                                <label for="param-enhancement">强化等级 (Enhancement):</label>
                                <input type="number" id="param-enhancement" name="enhancementLevel" value="${itemData.enhancementLevel || ''}">
                            </div>
                            <div class="form-group">
                                <label for="param-element">元素附加 (Element):</label>
                                <input type="number" id="param-element" name="element" value="${itemData.element || ''}">
                            </div>
                            <div class="form-group">
                                <label for="param-evo-level">进阶等级 (EvoLevel):</label>
                                <select id="param-evo-level" name="evoLevel">
                                    ${evoLevelOptionsHtml}
                                </select>
                            </div>
                        </div>
                    `;
                }
                break;
            case 'jewelry':
            case 'shell':
            default:
                formHtml = `<div class="param-adjust-form"><p>该类型物品暂无可调整的参数。</p></div>`;
                break;
        }
        
        formContainer.html(formHtml);
    },

    /**
     * 渲染“调整零件”标签页的表单
     * @param {object} itemData - 当前正在编辑的物品的数据
     */
    renderPartsParamsForm: function(itemData) {
        const formContainer = this.cache.modalTabPanes['parts'];
        formContainer.empty(); // 清空旧表单

        // 零件配置表
        const partsConfig = {
            parts_dps_lv: '伤害零件等级:',
            parts_capacity_lv: '弹容零件等级:',
            parts_attack_gap_lv: '攻速零件等级:',
            parts_reload_lv: '换弹零件等级:',
            parts_precision_lv: '精准零件等级:',
            parts_shoot_range_lv: '射程零件等级:',
            parts_dps_mul_hunter: '猎人技能器加成',
            parts_dps_mul_chip: '腐蚀芯片加成',
        };

        // 总的表单容器
        const $form = $('<div class="param-parts-form"></div>');

        // 循环生成元素
        Object.keys(partsConfig).forEach(partName => {
            
            // 确保 itemData 中有这个零件的属性，没有则默认为 0
            if (itemData[partName] === undefined) {
                itemData[partName] = 0;
            }

            // 为每个零件创建一行 (form-group)
            const $formGroup = $('<div class="form-group"></div>');
            
            // 创建 <label>
            const $label = $('<label></label>')
                .attr('for', `param-${partName}`)
                .text(partsConfig[partName]); // 设置显示的文本

            // 创建 <input>
            const $input = $('<input>')
                .attr('type', 'number')
                .attr('id', `param-${partName}`)  // 设置唯一的id
                .attr('name', partName)   // name属性用于事件处理器识别是哪个零件
                .val(itemData[partName] || 0);  // 设置当前值

            // 构造“锁定”属性的名称，例如 "lock_parts_capacity_lv"
            const lockPropertyName = `lock_${partName}`;

            // 检查 itemData 中是否存在这个锁定属性且其值为 true
            if (itemData[lockPropertyName] === true) {
                // 给 input 元素添加 readonly 属性
                $input.prop('readonly', true);
            }

            // 将 label 和 input 添加到 form-group 中
            $formGroup.append($label, $input);

            // 将这一行添加到总的表单中
            $form.append($formGroup);
        });

        // 创建 <span> (说明)
        const $span = $('<span></span>')
            .text('注：零件生效等级不得超过武器等级。零件等级取不超过武器等级的最接近实体。例如，89级武器设置90级零件，仅生效87级零件效果。');
        
        // 将构建好的完整表单一次性添加到页面中
        formContainer.append($span, $form);
    },

    /**
     * 更新物品参数的逻辑
     * @param {string} itemId 
     * @param {string} paramName - 要更新的属性名 (e.g., 'level')
     * @param {*} newValue - 新的值
     */
    updateItemParameter: function(itemId, paramName, newValue) {
        // 获取物品的UI数据，主要是为了拿到 name
        const uiItemData = this.getItemById(itemId); // getItemById 现在只获取UI数据
        if (!uiItemData) return;

        const rules = [
            { test: 'level',            limits: { min: 1, max: 99, step: 1 } },
            { test: 'evoLevel',         limits: { min: 1, max: 15, step: 1 } },
            { test: 'enhancementLevel', limits: { min: 0, max: 30, step: 1 } },
            { test: 'element',          limits: { min: 0, max: 55, step: 1 } },
            { test: /^parts_.*_lv$/,    limits: { min: 0, max: 93, step: 3 } },
            { test: /^parts_dps_mul_/,  limits: { min: 0, max: 0.3, step: 0.01 } },
        ];

        function getClampedValue(param_name, new_value) {
            for (const rule of rules) {
                const isMatch = (rule.test instanceof RegExp)
                    ? rule.test.test(param_name)
                    : (rule.test === param_name);

                if (isMatch) {
                    const { min, max, step } = rule.limits;
                    let clampedValue = new_value;

                    if (min != null) {
                        clampedValue = Math.max(min, clampedValue);
                    }
                    if (max != null) {
                        clampedValue = Math.min(max, clampedValue);
                    }
                    if (step != null && step > 0) {
                        // 如果是整数步长，直接取模即可，因为没有精度问题
                        if (step % 1 === 0 && (min == null || min % 1 === 0)) {
                            clampedValue = clampedValue - (clampedValue - (min || 0)) % step;
                        } else {
                            // 计算放大倍数
                            const stepStr = step.toString();
                            const decimalPlaces = stepStr.includes('.') ? stepStr.split('.')[1].length : 0;
                            const multiplier = Math.pow(10, decimalPlaces);

                            // 将所有数值转为整数进行计算，使用 Math.round 避免乘法带来的微小误差
                            const intValue = Math.round(clampedValue * multiplier);
                            const intMin = Math.round((min || 0) * multiplier);
                            const intStep = Math.round(step * multiplier);
                            
                            // 用整数进行取模运算
                            const remainder = (intValue - intMin) % intStep;
                            
                            // 计算结果并转换回浮点数
                            clampedValue = (intValue - remainder) / multiplier;
                        }
                    }
                    return clampedValue;
                }
            }
            return new_value;
        }

        let itemInDataStore = {};
        let paramMap = {};

        if (uiItemData.type === 'arms') {
            itemInDataStore = DATA_STORE.weaponsDataMap[uiItemData.name];

            paramMap = {
                level: 'arms_lv',
                enhancementLevel: 'strengthen_lv',
                element: 'element',
                evoLevel: 'evo_lv',
                parts_dps_lv: 'parts_dps_lv',
                parts_capacity_lv: 'parts_capacity_lv',
                parts_attack_gap_lv: 'parts_attack_gap_lv',
                parts_reload_lv: 'parts_reload_lv',
                parts_precision_lv: 'parts_precision_lv',
                parts_shoot_range_lv: 'parts_shoot_range_lv',
                parts_dps_mul_hunter: 'parts_dps_mul_hunter',
                parts_dps_mul_chip: 'parts_dps_mul_chip',
            };
        }
        else if (uiItemData.type === 'equipment') {
            itemInDataStore = DATA_STORE.equipDataMap[uiItemData.baseName]

            paramMap = {
                level: 'equip_lv',
                enhancementLevel: 'strengthen_lv',
                evoLevel: 'evo_lv',
            };
        }

        if (!itemInDataStore) {
            console.error(`更新失败: 在DATA_STORE中找不到对象 [${uiItemData.name}]`);
            return;
        }

        const dataStoreKey = paramMap[paramName];
        if (!dataStoreKey) {
            console.warn(`未知参数 [${paramName}]，无法同步到 DATA_STORE`);
            return;
        }

        newValue = getClampedValue(paramName, newValue);
        
        console.log(`正在更新 [${itemId}] 的参数 [${paramName}] 为:`, newValue);
        itemInDataStore[dataStoreKey] = newValue;

        // 参数修改后，需要重新渲染UI以反映变化
        // 这里可以只渲染被修改的那个槽位，也可以为了简单先重绘所有
        this.renderAllItems();

        // 触发全局事件，通知数据已变更
        $(document).trigger('graphicalDataChanged', {
            type: 'paramUpdate',
            item: this.getMergedItemById(itemId) // 传递合并后的完整对象
        });

        return newValue
    },

    /**
     * 根据武器evoLevel更新其颜色属性
     * @param {object} itemData - 要更新的物品对象
     */
    updateArmColor: function(itemData) {
        // 只对武器进行处理
        if (itemData.type !== 'arms') return;

        let evoLevel = itemData.evoLevel || 0; // 暂存变量，方便对不同体系武器进行颜色判定

        if (DATA_STORE.DARKGOLD_WEAPON_NAMES.includes(itemData.name)) evoLevel += 9;
        else if (DATA_STORE.YEAR_WEAPON_NAMES.includes(itemData.name)) evoLevel = evoLevel === 0 ? 9 : 13;

        let newColor = 'black'; // 默认颜色
        if (evoLevel >= 15) newColor = 'yagold';
        else if (evoLevel >= 13) newColor = 'purgold';
        else if (evoLevel >= 9) newColor = 'darkgold';

        const armInDataStore = DATA_STORE.weaponsDataMap[itemData.name];
        // 只有当数据源中存在该武器，并且计算出的新颜色与旧颜色不同时，才更新
        if (armInDataStore && armInDataStore.color !== newColor) {
            console.log(`武器 [${itemData.name}] 的颜色因 evoLevel 变化而更新为: ${newColor}`);
            armInDataStore.color = newColor; // 将新颜色写回数据源！
        }

        return newColor;
    },

    /**
     * 根据装备evoLevel和baseName更新其颜色属性
     * @param {object} itemData - 要更新的物品对象
     */
    updateEquipColor: function(itemData) {
        if (itemData.type !== 'equipment') return;

        let evoLevel = itemData.evoLevel || 0;

        let newColor = 'black';
        if (itemData.baseName.startsWith('狂人')) {
            if (evoLevel < 16) newColor = 'darkgold';
            else newColor = 'purgold';
        };

        const equipInDataStore = DATA_STORE.equipDataMap[itemData.baseName];
        // 只有当数据源中存在该装备，并且计算出的新颜色与旧颜色不同时，才更新
        if (equipInDataStore && equipInDataStore.color !== newColor) {
            console.log(`武器 [${itemData.name}] 的颜色因 evoLevel 变化而更新为: ${newColor}`);
            equipInDataStore.color = newColor; // 将新颜色写回数据源！
        }

        return newColor;
    },

    /**
     * 辅助函数：根据ID获取物品数据
     */
    getItemById: function(itemId) {
        return graphicalItemsData.find(item => item.id === itemId) || null;
    },

    /**
     * 遍历数据并渲染所有物品槽
     */
    renderAllItems: function() {
        // 清空所有容器
        this.cache.equipmentLeft.empty();
        this.cache.equipmentRight.empty();
        this.cache.jewelry.empty();
        this.cache.shell.empty();
        this.cache.costumeContainer.empty();
        this.cache.footerItemsContainer.empty();
        this.cache.armsPanel.empty();

        graphicalItemsData.forEach(itemStub => {
            const item = this.getMergedItemById(itemStub.id);
            if (!item) return;
            const itemHtml = this.renderItemSlot(item);
            
            // 根据 slotType 将 HTML 插入到正确的容器中
            switch (item.slotType) {
                case 'equip-left':
                    this.cache.equipmentLeft.append(itemHtml);
                    break;
                case 'equip-right':
                    this.cache.equipmentRight.append(itemHtml);
                    break;
                case 'jewelry':
                    this.cache.jewelry.append(itemHtml);
                    break;
                case 'shell':
                    this.cache.shell.append(itemHtml);
                    break;
                case 'costume':
                    this.cache.costumeContainer.append(itemHtml);
                    break;
                case 'footer-item':
                    this.cache.footerItemsContainer.append(itemHtml);
                    break;
                case 'arms':
                    if (item.slotType === "arms_bag") { break; }
                    this.cache.armsPanel.append(itemHtml);
                    break;
            }
        });

        this.scaleImages();
    },

    /**
     * 查找所有需要缩放的图片并设置其尺寸
     */
    scaleImages: function() {
        const imagesToScale = document.querySelectorAll('.arm-icon');
        
        imagesToScale.forEach(img => {
            const scaleRatio = 0.7;

            // 定义缩放函数
            const applyScaling = () => {
                if (img.naturalWidth > 0 && img.naturalHeight > 0) {
                    img.style.width = (img.naturalWidth * scaleRatio) + 'px';
                    img.style.height = (img.naturalHeight * scaleRatio) + 'px';
                }
            };

            // 如果图片已经加载完成（例如从缓存中读取），则立即缩放
            if (img.complete) {
                applyScaling();
            } else {
                // 否则，等待图片加载完成后再缩放
                img.onload = applyScaling;
            }
        });
    },

    /**
     * 根据单个物品数据对象，生成其HTML字符串
     * @param {object} item - 物品数据
     * @returns {string} - HTML字符串
     */
    renderItemSlot: function(item) {
        // 获取所有需要显示的星星图片路径数组
        const starImagePaths = this.getStarImagesForLevel(item.enhancementLevel);

        // 将路径数组转换成多个 <img> 标签的HTML字符串
        const starImagesHtml = starImagePaths
            .map(path => `<img src="${path}" class="item-enhancement-star" alt="Enhancement star">`)
            .join('');

        // 将所有 <img> 标签包裹在一个容器中
        const finalStarsHtml = starImagesHtml 
            ? `<div class="item-enhancement-stars-container">${starImagesHtml}</div>` 
            : '';

        if (!item.color) {
            item.color = 'white'; // 默认颜色为白色
        }
        let backType = 'equip';
        if (item.type === 'arms') {
            backType = 'arm';
        }
        const backHtml = `<img src="../images/icons/back/${backType}_${item.color}.png" 
            class="item-background ${backType}-background" alt="${item.color} background">`;
        const lockIconHtml = item.isLocked ? `<img src="../images/icons/lock.png" class="item-lock-icon" alt="Locked">` : '';
        const levelHtml = item.level > 0 ? `<span class="item-level">${item.level || ''}</span>` : '';
        
        if (item.isCostume) {
            return `<div class="item-slot costume-slot"><div class="check-border"><img src="../images/icons/check.png" 
                style="width:14px; height:14px;"></div> 时装</div>`;
        }

        let slotClass = 'equip-slot';
        switch (item.type) {
            case 'jewelry':
                slotClass = 'jewelry-slot';
                break;
            case 'shell':
                slotClass = 'shell-slot';
                break;
            case 'arms':
                slotClass = 'arm-slot';
                break;
        }
        const qualityDataAttr = item.color ? `data-quality="${item.color}"` : '';

        return `
            <div class="item-slot ${slotClass}" data-item-id="${item.id}" ${qualityDataAttr}>
                ${backHtml}
                ${levelHtml}
                ${lockIconHtml}
                <img src="${item.iconUrl}" alt="${item.name}" class="${backType}-icon">
                ${finalStarsHtml}
            </div>
        `;
    },

    /**
     * 根据强化等级获取所有对应阶段的星星图片路径数组
     * @param {number} level - 强化等级
     * @returns {string[]} - 图片路径数组
     */
    getStarImagesForLevel: function(level = 0) {
        const imagePaths = [];
        const step = 5;
        const maxImageLevel = 50;

        if (level < step) {
            return []; // 等级太低，没有星星图片
        }

        // 循环遍历每一个强化阶段 (5, 10, 15, ...)
        for (let currentStep = step; currentStep <= level; currentStep += step) {
            // 确保不会请求超过最高等级的图片
            const imageLevel = Math.min(currentStep, maxImageLevel);
            imagePaths.push(`../images/stars/str_${imageLevel}.png`);
        }
        
        return imagePaths;
    },

    /**
     * 提供一个公共接口，根据名称返回图形化UI中的物品数据
     * @param {string} itemName - 物品的名称
     * @returns {object | null} - 找到的物品对象，或 null
     */
    getItemDataByName: function(itemName) {
        if (!itemName) return null;
        return graphicalItemsData.find(item => item.name === itemName) || null;
    },

    /**
     * 提供一个获取所有图形化武器数据的接口
     * @returns {object[]} - 所有类型为 'arms' 的物品对象数组
     */
    getAllWeaponData: function() {
        return graphicalItemsData.filter(item => item.type === 'arms');
    },

    /**
     * 提供一个只获取“已装备”武器数据的接口
     * @returns {object[]} - 所有 slotType 为 'arms' 的武器对象数组
     */
    getEquippedWeapons: function() {
        return graphicalItemsData.filter(item => item.slotType === 'arms');
    },
    
    /**
     * 接收动态数据，更新UI上的显示
     * @param {object} data - 包含需要更新的数据的对象，例如 { totalPower: 12345 }
     */
    update: function(data) {
        // 更新总战力
        if (data.totalPower !== undefined) {
            const formattedPower = formatPowerNumber(data.totalPower);

            // 直接查询当前DOM中的元素
            const $powerValueElement = $('.power-value');
            
            if ($powerValueElement.length) {
                $powerValueElement.text(formattedPower);
                console.log(`图形化界面：战力已更新为 ${formattedPower}`);
            } else {
                console.warn("图形化界面：找不到 .power-value 元素进行更新。");
            }
        }

        // 更新角色等级 (如果数据中有)
        if (data.charLevel !== undefined) {
            // 同样使用实时查询
            $('.char-level').text(`Lv.${data.charLevel}`);
        }
        
        // 这里的逻辑可以根据需要扩展
        function formatPowerNumber(num, decimals = 2) {
            if (typeof num !== 'number' || isNaN(num)) {
                return '0';
            }

            const numAbs = Math.abs(num);

            if (numAbs < 10000) {
                // 小于1万，直接显示，可以加上千位分隔符
                return num.toLocaleString('en-US');
            } else if (numAbs < 100000000) {
                // 大于等于1万，小于1亿
                const value = num / 10000;
                // toFixed 返回的是字符串，我们再转成数字，让 toLocaleString 添加千位分隔符
                const formattedValue = parseFloat(value.toFixed(decimals)).toLocaleString('en-US');
                return formattedValue + '万';
            } else {
                // 大于等于1亿
                const value = num / 100000000;
                const formattedValue = parseFloat(value.toFixed(decimals)).toLocaleString('en-US');
                return formattedValue + '亿';
            }
        }
    }
    
};