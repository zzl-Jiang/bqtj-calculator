import { DATA_STORE } from "./data.js";

export const CALC_LOGIC = {
    /**
     * 根据属性名称和等级，从装备成长表中获取对应的加成值。
     * @param {string} propertyName - 要查询的属性名称 (例如 'dps', 'hurtMul', 'capacity')。
     * @param {number} level - 装备的等级 (从1开始)。
     * @returns {number} - 查找到的加成数值，如果找不到则返回 0。
     */
    getEquipBonusByLevel: function(propertyName, level) {
        const table = DATA_STORE.EQUIP_RANGE_TABLE;

        if (!table || !table.hasOwnProperty(propertyName) || !Array.isArray(table[propertyName])) {
            console.warn(`[getEquipBonusByLevel] 属性 "${propertyName}" 在装备成长表中不存在或格式不正确。`);
            return 0;
        }

        const bonusArray = table[propertyName];
        
        if (bonusArray.length === 0) {
            return 0;
        }

        let index = Math.round(level);

        if (index < 0) {
            index = 0
        }
        if (index >= bonusArray.length) {
            index = bonusArray.length - 1;
        }

        return bonusArray[index] || 0;
    },
    /**
     * 根据属性名称和强化等级，从物品强化表中获取对应的加成值。
     * @param {string} propertyName - 要查询的属性名称 (例如 'successRate', 'addMul')。
     * @param {number} level - 物品的强化等级 (从1开始)。
     * @returns {number} - 查找到的加成数值，如果找不到则返回 0。
     */
    getStrengthenBonusByLevel: function(propertyName, level) {
        const table = DATA_STORE.ITEM_STRENGTHEN_TABLE;
        if (!table || !table.hasOwnProperty(propertyName) || !Array.isArray(table[propertyName])) {
            console.warn(`[getStrengthenBonusByLevel] 属性 "${propertyName}" 在物品强化表中不存在或格式不正确。`);
            return 0;
        }

        const bonusArray = table[propertyName];
        if (bonusArray.length === 0) {
            return 0;
        }
        let index = Math.round(level) - 1;
        if (index < 0) {
            index = 0;
        }
        if (index >= bonusArray.length) {
            index = bonusArray.length - 1;
        }
        return bonusArray[index] || 0;
    },
    getDpsByLv: (lv) => {
        if (lv >= 51 && lv <= 104) return lv * lv * 15 - 28000;
        if (lv >= 1 && lv < 51) return lv * lv * 4 + 20;
        return 1;
    },
    getPrecision: (shakeAngle, aimAngle, shootRange) => {
        const val1 = Math.max(1 - shakeAngle / 30, 0.4);
        const val2 = Math.max(1 - aimAngle / 30, 0.3);
        const val3 = Math.min((shootRange / 1.2 + 500) / 1100, 1);
        return val1 * val2 * val3;
    },
    getVipBonusByLv: function(lv) {
        const vipBonuses = [0, 0.1, 0.15, 0.2, 0.25, 0.3, 0.35, 0.4, 0.5, 0.6, 0.7]; // VIP 0-10
        if (lv >= 0 && lv < vipBonuses.length) {
            return vipBonuses[lv];
        }
        return vipBonuses[vipBonuses.length - 1]; // 超出范围则返回最大值
    },
    getPresidentBonusByLv: function(lv) {
        return (parseFloat(lv) || 0) * 0.04;
    },
    getHurt: (reloadGap, capacity, attackGap, bulletNum, specialNum, shakeAngle, aimAngle, shootRange, dps0) => {
        if (attackGap <= 0) return 0;
        const totalTime = attackGap * capacity + reloadGap;
        if (totalTime <= 0) return 0;

        const reloadMultiplier = 1 - reloadGap / totalTime;
        const precision = CALC_LOGIC.getPrecision(shakeAngle, aimAngle, shootRange);
        const denominator = reloadMultiplier * (bulletNum * specialNum / attackGap * precision);

        return denominator > 0 ? (dps0 / denominator) : 0;
    },
    getHurtmulByStrengthenlv: (lv) => {
        if (lv <= 9) return lv * 0.1;
        if (lv <= 13) return 0.9 + (lv - 9) * 0.15;
        if (lv <= 17) return 1.5 + (lv - 13) * 0.2;
        if (lv <= 22) return 2.3 + (lv - 17) * 0.25;
        if (lv <= 27) return 3.55 + (lv - 22) * 0.3;
        if (lv <= 30) return 5.05 + (lv - 27) * 0.25;
        return 5.8;
    },
    getMulByLv: (armsLv, partLv) => {
        if (partLv == 0) return 0;
        if (partLv > armsLv) { partLv = armsLv };
        const dpsArms = CALC_LOGIC.getDpsByLv(armsLv);
        const dpsPart = CALC_LOGIC.getDpsByLv(partLv);
        return dpsArms > 0 ? (1 - (1 - dpsPart / dpsArms) * 0.4) : 1;
    },
    getUiDpsMul: (color, type, name, evoLv) => {
        let v = 1.0;
        if (type === "crossbow") {
            v = 2.6;
        } else if (["flamer", "howitzer", "wavegun", "laser", "lightning", "weather", "cutter"].includes(type)) {
            v = 2.0;
        }

        const isPurGold = color === "purgold";
        const isYaGold = color === "yagold";

        if (["darkgold", "purgold", "yagold"].includes(color)) {
            if (type === "sniper") { v *= (isPurGold || isYaGold) ? 1.35 : 1.3; } 
            else if (type === "shotgun") { v *= isYaGold ? 1.21 : (isPurGold ? 1.23 : 1.15); } 
            else if (type === "rocket") { if (isPurGold || isYaGold) { v *= (name === "卡特巨炮") ? 1.12 : 0.8; } else { v *= 0.95; } } 
            else if (type === "rifle" && (isPurGold || isYaGold)) { v *= 1.08; } 
            else if (type === "pistol" && (isPurGold || isYaGold)) { v *= 1.03; } 
            else if (type === "flamer") { if (evoLv >= 9) v *= 0.97; if (isYaGold) v *= 0.735; else if (isPurGold) v *= 0.8; } 
            else if (type === "laser") { if (evoLv >= 9) v *= 0.965; if (isPurGold || isYaGold) v *= 0.83; } 
            else if (type === "energy") { v = 1.462; if (isPurGold || isYaGold) v *= 0.84; } 
            else if (type === "lightning" && name === "极源" && (isPurGold || isYaGold)) { v *= 0.84; }
        }
        return v;
    },
    getDpsValueByLv: (lv) => {
        if (lv > 87) return 1.5;
        if (lv >= 84) return 1.4;
        if (lv >= 70) return 1.3;
        if (lv >= 65) return 1.2;
        if (lv >= 60) return 1.1;
        if (lv >= 55) return 1;
        if (lv >= 50) return .9;
        if (lv >= 45) return .75;
        if (lv >= 40) return .6;
        if (lv >= 35) return .45;
        return .3;
    },
    getCapacityValueByLv: (lv) => {
        if (lv > 87) return .89;
        if (lv >= 84) return .88;
        if (lv >= 70) return .87;
        if (lv >= 65) return .86;
        if (lv >= 60) return .85;
        if (lv >= 55) return .83;
        if (lv >= 50) return .81;
        if (lv >= 45) return .73;
        if (lv >= 40) return .65;
        if (lv >= 35) return .57;
        if (lv >= 30) return .49;
        if (lv >= 25) return .41;
        if (lv >= 20) return .33;
        return .25;
    },
    getAttackGapValueByLv: (lv) => {
        if (lv > 87) return -0.58;
        if (lv >= 84) return -0.57;
        if (lv >= 70) return -0.56;
        if (lv >= 65) return -0.55;
        if (lv >= 60) return -0.54;
        if (lv >= 55) return -0.52;
        if (lv >= 50) return -0.5;
        if (lv >= 45) return -0.46;
        if (lv >= 40) return -0.42;
        if (lv >= 35) return -0.38;
        if (lv >= 30) return -0.34;
        if (lv >= 25) return -0.3;
        if (lv >= 20) return -0.26;
        return -0.22;
    },
    getReloadValueByLv: (lv) => {
        if (lv > 87) return -0.81;
        if (lv >= 84) return -0.8;
        if (lv >= 70) return -0.79;
        if (lv >= 65) return -0.77;
        if (lv >= 60) return -0.75;
        if (lv >= 55) return -0.72;
        if (lv >= 50) return -0.69;
        if (lv >= 45) return -0.62;
        if (lv >= 40) return -0.55;
        if (lv >= 35) return -0.48;
        if (lv >= 30) return -0.41;
        if (lv >= 25) return -0.34;
        if (lv >= 20) return -0.27;
        return -0.2;
    },
    getPrecisionValueByLv: (lv) => {
        if (lv > 87) return -0.65;
        if (lv >= 84) return -0.64;
        if (lv >= 70) return -0.63;
        if (lv >= 65) return -0.61;
        if (lv >= 60) return -0.59;
        if (lv >= 55) return -0.57;
        if (lv >= 50) return -0.55;
        if (lv >= 45) return -0.5;
        if (lv >= 40) return -0.45;
        if (lv >= 35) return -0.4;
        if (lv >= 30) return -0.35;
        if (lv >= 25) return -0.3;
        if (lv >= 20) return -0.25;
        return -0.2;
    },
    getShootRangeValueByLv: (lv) => {
        if (lv > 87) return 610;
        if (lv >= 84) return 600;
        if (lv >= 70) return 585;
        if (lv >= 65) return 570;
        if (lv >= 60) return 550;
        if (lv >= 55) return 525;
        if (lv >= 50) return 500;
        if (lv >= 45) return 450;
        if (lv >= 40) return 400;
        if (lv >= 35) return 350;
        if (lv >= 30) return 300;
        if (lv >= 25) return 250;
        if (lv >= 20) return 200;
        return 150;
    },
    calculateAll: function(inputs) {
        // === 在函数最开始，对所有输入进行类型转换 ===
        // console.log('inputs.parts_dps_mul:', inputs.parts_dps_mul);
        for (const key in inputs) {
            if (typeof inputs[key] === 'string' && !isNaN(parseFloat(inputs[key]))) {
                inputs[key] = parseFloat(inputs[key]);
            }
        }
        const results = {};

        const { 
            getDpsByLv, getHurtmulByStrengthenlv, getUiDpsMul, getDpsValueByLv, 
            getCapacityValueByLv, getAttackGapValueByLv, getReloadValueByLv, 
            getPrecisionValueByLv, getShootRangeValueByLv, getMulByLv, 
            getHurt, getPrecision 
        } = this;
        const { 
            YEAR_WEAPON_NAMES, DARKGOLD_WEAPON_NAMES, ROCKETCATE_NAMES, CONS_NAMES, 
            YEAR_HURT_MUL_ARR, DARKGOLD_HURT_MUL_ARR, 
            ROCKETCATE_HURT_MUL_ARR, HURT_MUL_ARR, CONS_HURT_MUL_ARR
        } = DATA_STORE;

        // --- 基础属性计算 ---
        let armsLv = Math.max(1, Math.min(99, inputs.arms_lv));
        if (inputs.arms_name == "野黑激") armsLv -= 4;
        results.dps0 = getDpsByLv(armsLv + 5);
        results.strengthen_hurt_mul = getHurtmulByStrengthenlv(inputs.strengthen_lv);

        // --- 进阶与颜色相关计算 ---
        let evoHurtMul = 0;
        console.log('武器名称:', inputs.arms_name);
        if (YEAR_WEAPON_NAMES.includes(inputs.arms_name)) {
            evoHurtMul = (YEAR_HURT_MUL_ARR[inputs.evo_lv] || 0) / 100;
        } else if (DARKGOLD_WEAPON_NAMES.includes(inputs.arms_name)) {
            evoHurtMul = (DARKGOLD_HURT_MUL_ARR[inputs.evo_lv] || 0) / 100;
        } else if (ROCKETCATE_NAMES.includes(inputs.arms_name)) {
            evoHurtMul = (ROCKETCATE_HURT_MUL_ARR[inputs.evo_lv] || 0) / 100;
        } else if (CONS_NAMES.includes(inputs.arms_name)) {
            evoHurtMul = (CONS_HURT_MUL_ARR[0]) / 100;
        } else if (inputs.arms_name == "野黑激") {
            evoHurtMul = 11 / 2.3 / 2;
        } else {
            evoHurtMul = (HURT_MUL_ARR[inputs.evo_lv] || 0) / 100;
            // console.log('普通武器进阶系数计算结果:', evoHurtMul);
        }
        results.evo_hurt_mul = evoHurtMul;
        console.log('evo_lv:', inputs.evo_lv);
        console.log('evo_hurt_mul:', evoHurtMul);

        let lvIndex = inputs.evo_lv;
        if (YEAR_WEAPON_NAMES.includes(inputs.arms_name)) lvIndex = inputs.evo_lv === 0 ? 9 : 13;
        else if (DARKGOLD_WEAPON_NAMES.includes(inputs.arms_name)) lvIndex = inputs.evo_lv + 9;
        
        let color = "black";
        if (lvIndex >= 15) color = "yagold";
        else if (lvIndex >= 13) color = "purgold";
        else if (lvIndex >= 9) color = "darkgold";
        results.arms_color = color;
        results.type_ui_dps_mul = getUiDpsMul(results.arms_color, inputs.arms_type, inputs.arms_name, inputs.evo_lv);

        // --- 零件属性计算 ---
        results.parts_dps = getDpsByLv(inputs.parts_dps_lv) * getDpsValueByLv(inputs.parts_dps_lv);
        console.log('伤害零件等级:', inputs.parts_dps_lv);
        console.log('弹容零件等级:', inputs.parts_capacity_lv);
        console.log('攻速零件等级:', inputs.parts_attack_gap_lv);
        console.log('装弹零件等级:', inputs.parts_reload_lv);
        console.log('精准零件等级:', inputs.parts_precision_lv);
        console.log('射程零件等级:', inputs.parts_shoot_range_lv);
        results.parts_capacity_mul = getCapacityValueByLv(inputs.parts_capacity_lv) * getMulByLv(armsLv, inputs.parts_capacity_lv);
        results.parts_attack_gap_mul = getAttackGapValueByLv(inputs.parts_attack_gap_lv) * getMulByLv(armsLv, inputs.parts_attack_gap_lv);
        results.parts_reload_mul = getReloadValueByLv(inputs.parts_reload_lv) * getMulByLv(armsLv, inputs.parts_reload_lv);
        let precVal = getPrecisionValueByLv(inputs.parts_precision_lv) * getMulByLv(armsLv, inputs.parts_precision_lv);
        results.parts_shake_angle = precVal;
        results.parts_shoot_angle = precVal / 2;
        results.parts_shoot_range = getShootRangeValueByLv(inputs.parts_shoot_range_lv) * getMulByLv(armsLv, inputs.parts_shoot_range_lv);
        
        // --- 技能与元素计算 ---
        let godSkillNum = inputs.god_skill_num;
        // 特殊规则：非无双、生肖、天秤座的神技数量要-1计算
        if (inputs.arms_name != "野黑激" && (results.arms_color !== "purgold" && results.arms_color !== "yagold" && !YEAR_WEAPON_NAMES.includes(inputs.arms_name) && inputs.arms_name !== "天秤座")) {
            if (godSkillNum > 0) godSkillNum -= 1;
        }
        results.skill_special_mul = 1 + (inputs.base_special_num + inputs.skill_num) * 0.15 + godSkillNum * 0.2;
        results.ele_add_dps = inputs.element / 100 * 0.3;

        // --- 战力与伤害核心计算 (dps1, hurt1, hurt_ratio) ---
        let dps0_calculate = results.dps0 * inputs.get_dps_mul * inputs.dps_mul;
        if (inputs.arms_name == "野黑激") dps0_calculate = results.dps0 * inputs.dps_mul;
        results.hurt_ratio0 = getHurt(inputs.reload_gap0, inputs.capacity0, inputs.attack_gap0, inputs.bullet_num, 1, inputs.shake_angle0, inputs.shoot_angle0, inputs.shoot_range0, dps0_calculate);
        
        let dps1_base = dps0_calculate * (1 + inputs.parts_dps_mul) * (1 + inputs.ea0_dps_mul + inputs.ea_dps_mul0);
        // console.log("dps0_calculate:", dps0_calculate);
        // console.log("parts_dps_mul:", inputs.parts_dps_mul);
        // console.log("ea0_dps_mul:", inputs.ea0_dps_mul);
        // console.log("ea_dps_mul0:", inputs.ea_dps_mul0);
        // console.log("dps1_base:", dps1_base);
        let dps1_add = (inputs.ea_dps0 + inputs.ea0_dps + results.parts_dps + inputs.pet_dps) * inputs.get_dps_mul * inputs.dps_mul;
        // console.log("dps1_add:", dps1_add);
        let dps1 = (dps1_base + dps1_add) * (1 + inputs.vip_dps_mul) * (1 + inputs.whole_dps_mul) * (1 + inputs.more_dps_mul);
        // console.log("dps1:", dps1);
        results.dps1 = dps1;
        results.hurt_add1 = getHurt(inputs.reload_gap0, inputs.capacity0, inputs.attack_gap0, inputs.bullet_num, 1, inputs.shake_angle0, inputs.shoot_angle0, inputs.shoot_range0, dps1) - results.hurt_ratio0;
        // console.log("hurt_add1:", results.hurt_add1);
        let hurt1 = results.hurt_ratio0 * (1 + inputs.ea0_hurt_mul + results.strengthen_hurt_mul + inputs.ea_hurt_mul0) + inputs.get_hurt_add * (inputs.ea0_hurt + inputs.ea_hurt0) + results.hurt_add1;
        // console.log('results.hurt_ratio0:', results.hurt_ratio0);
        // console.log("ea0_hurt_mul:", inputs.ea0_hurt_mul);
        // console.log("strengthen_hurt_mul:", results.strengthen_hurt_mul);
        // console.log("ea_hurt_mul0:", inputs.ea_hurt_mul0);
        // console.log("get_hurt_add:", inputs.get_hurt_add);
        results.hurt1 = hurt1;
        // console.log("hurt1:", hurt1);
        let hurtRatio = hurt1 * (1 + inputs.dps_all + inputs.hurt_all) * results.evo_hurt_mul * (1 + inputs.red_hurt_mul) * (1 + inputs.zodiac_hurt_add);
        results.hurt_ratio = hurtRatio;
        // console.log('inputs.dps_all:', inputs.dps_all);
        // console.log('inputs.hurt_all:', inputs.hurt_all);
        // console.log('results.evo_hurt_mul:', results.evo_hurt_mul);
        // console.log('inputs.red_hurt_mul:', inputs.red_hurt_mul);
        // console.log('inputs.zodiac_hurt_add:', inputs.zodiac_hurt_add);
        // console.log("hurt_ratio:", hurtRatio);
        // --- 面板属性计算 (弹容, 射速, 装弹, 精准, 射程) ---
        let capacityReal = inputs.capacity0 * (1 + inputs.ea0_capacity_mul + inputs.ea_capacity_mul0 + results.parts_capacity_mul) + inputs.ea0_capacity * inputs.get_capacity_mul + inputs.ea_capacity0;
        // console.log('ea0_capacity:', inputs.ea0_capacity);
        // console.log('ea_capacity0:', inputs.ea_capacity0);
        // console.log('parts_capacity_mul:', results.parts_capacity_mul);
        // console.log('ea0_capacity_mul:', inputs.ea0_capacity_mul);
        // console.log('ea_capacity_mul0:', inputs.ea_capacity_mul0);
        results.capacity_real = capacityReal;
        results.capacity = Math.ceil(capacityReal);
        // console.log("计算后的弹容 (capacity_real):", capacityReal);
        // console.log("计算后的弹容 (capacity):", results.capacity);
        
        let attackGap = (inputs.attack_gap0 * (1 + results.parts_attack_gap_mul * inputs.get_attack_gap_add)) / (1 + inputs.ea0_attack_gap);
        attackGap = Math.max(attackGap, 0.05);
        results.attack_gap = attackGap;
        results.attack_speed = attackGap > 0 ? 1 / attackGap : 0;
        
        let reloadGap = (inputs.reload_gap0 / (1 + (inputs.ea0_reload + inputs.ea_reload0) * inputs.get_reload_mul)) * (1 + results.parts_reload_mul * inputs.get_reload_mul);
        reloadGap = Math.max(reloadGap, 0.7 * attackGap);
        results.reload_gap = reloadGap;
        
        let shakeAngle = inputs.shake_angle0 * (1 + results.parts_shake_angle * inputs.get_angle_add_mul);
        let shootAngle = inputs.shoot_angle0 * (1 + results.parts_shoot_angle * inputs.get_angle_add_mul);
        let shootRange = (inputs.shoot_range0 / 1.2 + results.parts_shoot_range) * 1.2;
        results.precision_real = getPrecision(shakeAngle, shootAngle, shootRange);
        results.precision = getPrecision(shakeAngle, shootAngle, 720); // 面板精准统一用720射程计算
        results.shoot_range = shootRange;
        results.precision0 = getPrecision(inputs.shake_angle0, inputs.shoot_angle0, inputs.shoot_range0);

        // --- 最终面板战力计算 ---
        let finalDps = 0;
        if (inputs.dps_mul > 0) {
            let r_mul = (capacityReal * attackGap + reloadGap > 0) ? (1 - reloadGap / (capacityReal * attackGap + reloadGap)) : 1;
            
            finalDps = (
                hurtRatio * 
                r_mul * 
                (inputs.bullet_num / attackGap * results.precision_real) * 
                results.skill_special_mul * 
                inputs.ui_dps_mul * 
                results.type_ui_dps_mul * 
                (1 + results.ele_add_dps) * 
                (1 + inputs.show_dps_mul)
            ) / inputs.dps_mul;
        }
        results.final_dps = finalDps;

        return results;
    },

    calculateTotalCharacterPower: function(individualPowers, tripleCrit, weaponNum, uniqueWeaponTypeNum) {
        if (weaponNum <= 0) return 0;

        const { WEAPON_NUM_ADD, WEAPON_TYPE_NUM_ADD } = DATA_STORE;

        const tripleCritValue = 1 + 2 * tripleCrit;
        const weaponNumAddValue = (WEAPON_NUM_ADD[weaponNum - 1] || WEAPON_NUM_ADD[WEAPON_NUM_ADD.length - 1]);
        const weaponTypeNumAddValue = (WEAPON_TYPE_NUM_ADD[uniqueWeaponTypeNum - 1] || WEAPON_TYPE_NUM_ADD[WEAPON_TYPE_NUM_ADD.length - 1]);
        
        const totalMultiplier = weaponNumAddValue * weaponTypeNumAddValue;
        const dpsSum = individualPowers.reduce((sum, power) => sum + power, 0);
        
        const totalDps = dpsSum * tripleCritValue * totalMultiplier;
        return totalDps;
    }
};