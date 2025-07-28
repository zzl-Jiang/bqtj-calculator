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
        enhancementLevel: 25, 
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
        enhancementLevel: 25, 
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
        enhancementLevel: 25, 
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
        enhancementLevel: 25, 
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
        level: 99, 
        enhancementLevel: 27, 
        iconUrl: '../images/arms/redFire.png', 
        isLocked: true 
    },
    { 
        id: 'weapon-2', 
        type: 'weapon', 
        slotType: 'arms',
        color: 'yagold',
        name: '银狐', 
        level: 99, 
        enhancementLevel: 27, 
        iconUrl: '../images/arms/pistolFox.png', 
        isLocked: true 
    },
    { 
        id: 'weapon-3', 
        type: 'weapon', 
        slotType: 'arms',
        color: 'yagold',
        name: '铄金', 
        level: 99, 
        enhancementLevel: 27, 
        iconUrl: '../images/arms/meltFlamer.png', 
        isLocked: true 
    },
    { 
        id: 'weapon-4', 
        type: 'weapon', 
        slotType: 'arms',
        color: 'yagold',
        name: '赤鼬', 
        level: 99, 
        enhancementLevel: 27, 
        iconUrl: '../images/arms/shotgunSkunk.png', 
        isLocked: true 
    },
    { 
        id: 'weapon-5', 
        type: 'weapon', 
        slotType: 'arms',
        color: 'yagold',
        name: '金蝉', 
        level: 99,
        enhancementLevel: 27, 
        iconUrl: '../images/arms/sniperCicada.png', 
        isLocked: true 
    },
    { 
        id: 'weapon-6', 
        type: 'weapon',
        slotType: 'arms',
        color: 'yagold',
        name: '青蜂', 
        level: 99, 
        enhancementLevel: 27, 
        iconUrl: '../images/arms/rifleHornet.png', 
        isLocked: true 
    },
];


export const GRAPHICAL_UI_HANDLER = {
    cache: {}, // 用于缓存DOM元素

    /**
     * 初始化模块，只在第一次加载标签页时执行
     */
    init: function() {
        
        // 缓存容器元素
        this.cache.equipmentLeft = $('#equipment-left');
        this.cache.equipmentRight = $('#equipment-right');
        this.cache.jewelry = $('#jewelry');
        this.cache.shell = $('#shell');
        this.cache.costumeContainer = $('#costume-slot-container');
        this.cache.footerItemsContainer = $('#footer-items-container');
        this.cache.capacityPanel = $('#capacity-panel');
        this.cache.armsPanel = $('#arms-panel');

        // 缓存其他静态信息元素 (用于未来的update)
        this.cache.power = $('.power-value');
        this.cache.level = $('.char-level');
        this.cache.vip = $('.char-vip');
        
        // 渲染所有物品
        this.renderAllItems();
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
     * 接收计算器结果，更新UI上的动态数据
     * @param {object} results - 来自计算逻辑的结果
     */
    update: function(results) {
        // 更新战力
        if (this.cache.power.length) {
            this.cache.power.text(results.final_dps.toFixed(0));
        }

        // 更新等级
        if (this.cache.level.length) {
            this.cache.level.text(`Lv.${results.arms_lv}`);
        }
        
        // 这里的逻辑可以根据需要扩展，比如更新血量、防御等
    }
};