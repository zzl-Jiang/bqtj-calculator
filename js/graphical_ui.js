// js/graphical_ui.js

// 数据可以放在模块内部，因为它们专属于这个UI
const graphicalItemsData = [
    // 装备
    { 
        id: 'equip-head',
        type: 'equipment', 
        slotType: 'equip-right',
        color: 'purgold',
        name: '战神的蔑视', 
        level: 99, 
        enhancementLevel: 28, 
        iconUrl: '../images/equip/madpur_head.png', 
        isLocked: true 
    },
    { 
        id: 'equip-coat',
        type: 'equipment', 
        slotType: 'equip-left',
        color: 'purgold',
        name: '战神的戒严', 
        level: 99, 
        enhancementLevel: 28, 
        iconUrl: '../images/equip/madpur_coat.png', 
        isLocked: true 
    },
    { 
        id: 'equip-belt', 
        type: 'equipment', 
        slotType: 'equip-right',
        color: 'purgold',
        name: '战神的降临', 
        level: 99, 
        enhancementLevel: 28, 
        iconUrl: '../images/equip/madpur_belt.png', 
        isLocked: true 
    },
    { 
        id: 'equip-pants', 
        type: 'equipment', 
        slotType: 'equip-left',
        color: 'purgold',
        name: '战神的讨伐', 
        level: 99, 
        enhancementLevel: 28, 
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
        id: 'weapon-1', 
        type: 'weapon', 
        slotType: 'arms',
        color: 'yagold',
        name: '猩焰', 
        evoLevel: 15,
        level: 99, 
        enhancementLevel: 28, 
        iconUrl: '../images/arms/redFire.png', 
        isLocked: true 
    },
    { 
        id: 'weapon-2', 
        type: 'weapon', 
        slotType: 'arms',
        color: 'yagold',
        name: '银狐', 
        evoLevel: 15,
        level: 99, 
        enhancementLevel: 28, 
        iconUrl: '../images/arms/pistolFox.png', 
        isLocked: true 
    },
    { 
        id: 'weapon-3', 
        type: 'weapon', 
        slotType: 'arms',
        color: 'yagold',
        name: '铄金', 
        evoLevel: 15,
        level: 99, 
        enhancementLevel: 28, 
        iconUrl: '../images/arms/meltFlamer.png', 
        isLocked: true 
    },
    { 
        id: 'weapon-4', 
        type: 'weapon', 
        slotType: 'arms',
        color: 'yagold',
        name: '赤鼬', 
        evoLevel: 15,
        level: 99, 
        enhancementLevel: 28, 
        iconUrl: '../images/arms/shotgunSkunk.png', 
        isLocked: true 
    },
    { 
        id: 'weapon-5', 
        type: 'weapon', 
        slotType: 'arms',
        color: 'yagold',
        name: '金蝉', 
        evoLevel: 15,
        level: 99,
        enhancementLevel: 28, 
        iconUrl: '../images/arms/sniperCicada.png', 
        isLocked: true 
    },
    { 
        id: 'weapon-6', 
        type: 'weapon',
        slotType: 'arms',
        color: 'yagold',
        name: '青蜂', 
        evoLevel: 15,
        level: 99, 
        enhancementLevel: 28, 
        iconUrl: '../images/arms/rifleHornet.png', 
        isLocked: true 
    },
    { 
        id: 'weapon-7', 
        type: 'weapon',
        slotType: 'arms_bag',
        color: 'yagold',
        name: '卡特巨炮', 
        evoLevel: 15,
        level: 99, 
        enhancementLevel: 28, 
        iconUrl: '../images/arms/rocketCate.png', 
        isLocked: true 
    },
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
        this.cache.capacityPanel = $('#capacity-panel');
        this.cache.armsPanel = $('#arms-panel');

        // 缓存模态框相关元素
        this.cache.weaponSwitchModal = $('#weapon-switch-modal');
        this.cache.modalTitle = $('#modal-title');
        this.cache.weaponInventoryPanel = $('#weapon-inventory-panel');
        this.cache.closeWeaponModalBtn = $('#close-weapon-modal');
        this.cache.modalTabs = $('.modal-tabs');
        this.cache.modalTabPanes = {
            'switch': $('#modal-tab-content-switch'),
            'adjust': $('#modal-tab-content-adjust')
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
        // 给已装备的武器槽绑定点击事件，用于打开模态框
        this.cache.armsPanel.on('click', '.arm-slot', (e) => {
            const clickedSlot = e.currentTarget;
            const itemId = $(clickedSlot).data('item-id');
            this.openWeaponModal(itemId);
        });

        // 给模态框的关闭按钮绑定事件
        this.cache.closeWeaponModalBtn.on('click', () => {
            this.closeWeaponModal();
        });

        // 点击模态框背景也可以关闭
        this.cache.weaponSwitchModal.on('click', (e) => {
            if (e.target === this.cache.weaponSwitchModal[0]) {
                this.closeWeaponModal();
            }
        });

        // 背包武器点击事件 (只在“切换武器”标签页内生效)
        this.cache.weaponInventoryPanel.on('click', '.arm-slot', (e) => {
            const inventoryItemId = $(e.currentTarget).data('item-id');
            this.swapWeapons(this.currentlyClickedSlotId, inventoryItemId);
        });

        // 为模态框内的标签页按钮绑定点击事件
        this.cache.modalTabs.on('click', '.modal-tab-btn', (e) => {
            const tabName = $(e.currentTarget).data('tab');
            this.switchModalTab(tabName);
        });

        // “调整参数”表单的事件
        // 使用事件委托，因为表单是动态生成的
        this.cache.modalTabPanes['adjust'].on('change', 'input', (e) => {
            const input = $(e.currentTarget);
            const paramName = input.attr('name');
            const newValue = input.val();
            this.updateItemParameter(this.currentlyClickedSlotId, paramName, newValue);
        });
    },

    /**
     * 打开武器切换模态框
     * @param {string} itemId - 被点击的装备槽中的物品ID
     */
    openWeaponModal: function(itemId) {
        this.currentlyClickedSlotId = itemId; // 记录是从哪个槽点开的
        const itemData = this.getItemDataByName(this.getItemById(itemId).name);

        if (!itemData) return;

        // 清空并重新渲染背包面板
        this.cache.weaponInventoryPanel.empty();

        this.cache.modalTitle.text(`正在编辑: ${itemData.name}`);
        this.switchModalTab('switch');
        
        // 显示模态框
        this.cache.weaponSwitchModal.fadeIn(200);
    },

    /**
     * 关闭武器切换模态框
     */
    closeWeaponModal: function() {
        this.cache.weaponSwitchModal.fadeOut(200);
        this.currentlyClickedSlotId = null; // 清理状态
    },

    /**
     * 执行武器交换的核心逻辑
     * @param {string} equippedItemId - 装备槽中的物品ID
     * @param {string} inventoryItemId - 背包中被点击的物品ID
     */
    swapWeapons: function(equippedItemId, inventoryItemId) {
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
        this.closeWeaponModal();

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
     * @param {string} tabName - 'switch' 或 'adjust'
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
        const itemData = this.getItemById(this.currentlyClickedSlotId);
        if (!itemData) return;
        
        switch(tabName) {
            case 'switch':
                this.renderInventoryForSwitching();
                break;
            case 'adjust':
                this.renderAdjustParamsForm(itemData);
                break;
        }
    },

    /**
     * 渲染“切换武器”标签页的内容 (从 openWeaponModal 中提取)
     */
    renderInventoryForSwitching: function() {
        this.cache.weaponInventoryPanel.empty();
        const inventoryWeapons = graphicalItemsData.filter(item => 
            item.slotType === "arms_bag"
        );
        inventoryWeapons.forEach(item => {
            const itemHtml = this.renderItemSlot(item);
            this.cache.weaponInventoryPanel.append(itemHtml);
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

        const formHtml = `
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
                    <label for="param-name">进阶等级 (EvoLevel):</label>
                    <input type="number" id="param-evo-level" name="evoLevel" value="${itemData.evoLevel || ''}">
                </div>
                <!-- 在这里添加更多调整的参数 -->
            </div>
        `;
        
        formContainer.html(formHtml);
        this.renderAllItems(); // 因为可能进阶等级发生改变导致武器背景/描边需要变化
    },

    /**
     * 更新物品参数的逻辑
     * @param {string} itemId 
     * @param {string} paramName - 要更新的属性名 (e.g., 'level')
     * @param {*} newValue - 新的值
     */
    updateItemParameter: function(itemId, paramName, newValue) {
        const itemIndex = graphicalItemsData.findIndex(item => item.id === itemId);
        if (itemIndex === -1) return;

        // 将输入值转换为合适的类型
        const originalValue = graphicalItemsData[itemIndex][paramName];
        if (typeof originalValue === 'number') {
            newValue = parseFloat(newValue) || 0;
        }
        
        console.log(`正在更新 [${itemId}] 的参数 [${paramName}] 为:`, newValue);
        graphicalItemsData[itemIndex][paramName] = newValue;

        if (paramName === 'evoLevel') {
            this.updateArmColor(graphicalItemsData[itemIndex]);
        }

        // 参数修改后，需要重新渲染UI以反映变化
        // 这里可以只渲染被修改的那个槽位，也可以为了简单先重绘所有
        this.renderAllItems();

        // 触发全局事件，通知数据已变更
        const updatedItem = this.getItemById(itemId);
        $(document).trigger('graphicalDataChanged', {
            type: 'paramUpdate',
            item: updatedItem // 传递整个更新后的物品对象
        });
    },

    /**
     * 根据武器evoLevel更新其颜色属性
     * @param {object} itemData - 要更新的物品对象
     */
    updateArmColor: function(itemData) {
        // 只对武器进行处理
        if (itemData.type !== 'weapon') return;

        let newColor = 'black'; // 默认颜色
        const evoLevel = itemData.evoLevel || 0;

        if (evoLevel >= 15) newColor = 'yagold';
        else if (evoLevel >= 13) newColor = 'purgold';
        else if (evoLevel >= 9) newColor = 'darkgold';

        if (itemData.color !== newColor) {
            console.log(`武器 [${itemData.name}] 的颜色因 evoLevel 变化而更新为: ${newColor}`);
            itemData.color = newColor;
        }
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
        this.cache.capacityPanel.empty();
        this.cache.armsPanel.empty();

        graphicalItemsData.forEach(item => {
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
                case 'capacity':
                    this.cache.capacityPanel.append(itemHtml);
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
        if (item.type === 'weapon') {
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
            case 'weapon':
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
     * @returns {object[]} - 所有类型为 'weapon' 的物品对象数组
     */
    getAllWeaponData: function() {
        return graphicalItemsData.filter(item => item.type === 'weapon');
    },

    /**
     * 提供一个只获取“已装备”武器数据的接口
     * @returns {object[]} - 所有 slotType 为 'arms' 的武器对象数组
     */
    getEquippedWeapons: function() {
        // 我们假设装备中的武器 slotType 是 'arms'
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

            // 不再使用 this.cache.power，而是直接查询当前DOM中的元素
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
            // 同样使用实时查询以保证健壮性
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