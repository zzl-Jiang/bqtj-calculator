/**
 * ===================================================================
 * 爆枪突击 - 战力计算器
 * -------------------------------------------------------------------
 * 本文件采用模块化结构，将代码分为以下几个部分：
 * - DATA_STORE: 存储所有静态数据和常量。
 * - CALC_LOGIC: 包含所有核心计算逻辑，与UI无关。
 * - UI_HANDLER: 负责所有与DOM相关的操作（读/写页面元素）。
 * - STORAGE_HANDLER: 负责浏览器本地存储功能。
 * - App: 主应用程序控制器，协调所有模块工作。
 * ===================================================================
 */

$(function() {

    // ===================================================================
    // 模块 1: DATA_STORE - 静态数据中心
    // ===================================================================
    const DATA_STORE = {
        YEAR_WEAPON_NAMES: ["辰龙", "未羊", "寅虎"],
        DARKGOLD_WEAPON_NAMES: ["隼武", "极源"],
        ROCKETCATE_NAMES: ["卡特巨炮"],
        
        HURT_MUL_ARR: [
            90, 100, 110, 145, 155, 165, 180, 195, 
            205, 220, 230, 240, 250, 300, 340, 380
        ],
        YEAR_HURT_MUL_ARR: [100, 125],
        DARKGOLD_HURT_MUL_ARR: [150, 180, 210, 250, 300, 340, 380],
        ROCKETCATE_HURT_MUL_ARR: [
            90, 100, 110, 145, 155, 165, 180, 195, 
            195, 195, 195, 195, 195, 210, 220, 230
        ],
        
        WEAPON_TYPE_NUM_ADD: [1.2, 1.4, 1.6, 1.8, 2, 2.2],
        WEAPON_NUM_ADD: [1, 0.9, 0.8, 0.75, 0.7, 0.7],
        
        weaponsData: [
            { 
                "cnName": "猩焰", "arms_type": "rocket", "attack_gap0": 1.3, "capacity0": 7, "reload_gap0": 3, 
                "shoot_angle0": 0, "shake_angle0": 0, "shoot_range0": 918, "bullet_num": 1, "get_dps_mul": 1.3, 
                "dps_mul": 1.8, "ui_dps_mul": 2, "show_dps_mul": 0.05, "base_special_num": 4, "skill_num": 2, 
                "god_skill_num": 3, "evo_lv": 15, "ea_dps_mul0": 0.3, "ea_dps0": 0, "ea_hurt_mul0": 0, 
                "ea_hurt0": 0, "ea_capacity_mul0": 0, "ea_capacity0": 0, "ea_reload0": 0, "get_hurt_add": 7.5, 
                "get_capacity_mul": 1, "get_attack_gap_add": 1, "get_reload_mul": 1, "get_angle_add_mul": 1 
            },
            { 
                "cnName": "银狐", "arms_type": "pistol", "attack_gap0": 0.25, "capacity0": 19, "reload_gap0": 1.5, 
                "shoot_angle0": 0, "shake_angle0": 1, "shoot_range0": 600, "bullet_num": 1, "get_dps_mul": 1.3, 
                "dps_mul": 1.6, "ui_dps_mul": 1.4, "show_dps_mul": 0.05, "base_special_num": 4, "skill_num": 2, 
                "god_skill_num": 3, "evo_lv": 15, "ea_dps_mul0": 0.11, "ea_dps0": 0, "ea_hurt_mul0": 0, 
                "ea_hurt0": 0, "ea_capacity_mul0": 0, "ea_capacity0": 0, "ea_reload0": 0, "get_hurt_add": 1, 
                "get_capacity_mul": 2, "get_attack_gap_add": 1, "get_reload_mul": 1, "get_angle_add_mul": 1 
            },
            { 
                "cnName": "青蜂", "arms_type": "rifle", "attack_gap0": 0.1, "capacity0": 35, "reload_gap0": 4, 
                "shoot_angle0": 0, "shake_angle0": 5, "shoot_range0": 600, "bullet_num": 1, "get_dps_mul": 1.3, 
                "dps_mul": 1.7, "ui_dps_mul": 1, "show_dps_mul": 0, "base_special_num": 4, "skill_num": 2, 
                "god_skill_num": 3, "evo_lv": 15, "ea_dps_mul0": 0.34, "ea_dps0": 0, "ea_hurt_mul0": 0.06, 
                "ea_hurt0": 0, "ea_capacity_mul0": 0, "ea_capacity0": 0, "ea_reload0": 0, "get_hurt_add": 0.4, 
                "get_capacity_mul": 4, "get_attack_gap_add": 0.7, "get_reload_mul": 1, "get_angle_add_mul": 1 
            },
            { 
                "cnName": "金蝉", "arms_type": "sniper", "attack_gap0": 1.2, "capacity0": 6, "reload_gap0": 4, 
                "shoot_angle0": 0, "shake_angle0": 0, "shoot_range0": 720, "bullet_num": 1, "get_dps_mul": 1.3, 
                "dps_mul": 2.4, "ui_dps_mul": 1, "show_dps_mul": 0, "base_special_num": 4, "skill_num": 2, 
                "god_skill_num": 3, "evo_lv": 15, "ea_dps_mul0": 0.12, "ea_dps0": 0, "ea_hurt_mul0": 0.2, 
                "ea_hurt0": 0, "ea_capacity_mul0": 0, "ea_capacity0": 0, "ea_reload0": 0, "get_hurt_add": 7, 
                "get_capacity_mul": 1, "get_attack_gap_add": 1, "get_reload_mul": 1, "get_angle_add_mul": 1 
            },
            { 
                "cnName": "铄金", "arms_type": "flamer", "attack_gap0": 0.07, "capacity0": 70, "reload_gap0": 3, 
                "shoot_angle0": 0, "shake_angle0": 5, "shoot_range0": 468, "bullet_num": 1, "get_dps_mul": 1.3, 
                "dps_mul": 2.4, "ui_dps_mul": 1.92, "show_dps_mul": 0, "base_special_num": 1, "skill_num": 0, 
                "god_skill_num": 3, "evo_lv": 15, "ea_dps_mul0": 0.32, "ea_dps0": 0, "ea_hurt_mul0": 0, 
                "ea_hurt0": 0, "ea_capacity_mul0": 0, "ea_capacity0": 0, "ea_reload0": 0, "get_hurt_add": 0.3, 
                "get_capacity_mul": 7, "get_attack_gap_add": 0.5, "get_reload_mul": 1, "get_angle_add_mul": 1 
            },
            { 
                "cnName": "赤鼬", "arms_type": "shotgun", "attack_gap0": 0.95, "capacity0": 6, "reload_gap0": 2.5, 
                "shoot_angle0": 22, "shake_angle0": 1, "shoot_range0": 600, "bullet_num": 11, "get_dps_mul": 1.3, 
                "dps_mul": 1, "ui_dps_mul": 1, "show_dps_mul": 0, "base_special_num": 4, "skill_num": 2, 
                "god_skill_num": 3, "evo_lv": 15, "ea_dps_mul0": 0.08, "ea_dps0": 0, "ea_hurt_mul0": 0, 
                "ea_hurt0": 0, "ea_capacity_mul0": 0, "ea_capacity0": 0, "ea_reload0": 0, "get_hurt_add": 0.5285714285714286, 
                "get_capacity_mul": 1, "get_attack_gap_add": 1, "get_reload_mul": 1, "get_angle_add_mul": 0.3 
            },
            { 
                "cnName": "光锥", "arms_type": "laser", "attack_gap0": 0.7, "capacity0": 8, "reload_gap0": 2, 
                "shoot_angle0": 0, "shake_angle0": 0, "shoot_range0": 1080, "bullet_num": 1, "get_dps_mul": 1.3, 
                "dps_mul": 0.7, "ui_dps_mul": 2.65, "show_dps_mul": 0, "base_special_num": 2, "skill_num": 2, 
                "god_skill_num": 3, "evo_lv": 13, "ea_dps_mul0": 0, "ea_dps0": 0, "ea_hurt_mul0": 0, 
                "ea_hurt0": 0, "ea_capacity_mul0": 0, "ea_capacity0": 0, "ea_reload0": 0, "get_hurt_add": 0.3, 
                "get_capacity_mul": 0.2, "get_attack_gap_add": 0, "get_reload_mul": 1, "get_angle_add_mul": 1 
            },
            { 
                "cnName": "辰龙", "arms_type": "lightning", "attack_gap0": 1.2, "capacity0": 8, "reload_gap0": 2, 
                "shoot_angle0": 15, "shake_angle0": 1, "shoot_range0": 600, "bullet_num": 10, "get_dps_mul": 1.3, 
                "dps_mul": 1.9, "ui_dps_mul": 2.1, "show_dps_mul": 0, "base_special_num": 2, "skill_num": 2, 
                "god_skill_num": 1, "evo_lv": 1, "ea_dps_mul0": 0, "ea_dps0": 0, "ea_hurt_mul0": 0, 
                "ea_hurt0": 0, "ea_capacity_mul0": 0, "ea_capacity0": 0, "ea_reload0": 0, "get_hurt_add": 0.5285714285714286, 
                "get_capacity_mul": 0.2, "get_attack_gap_add": 1, "get_reload_mul": 1, "get_angle_add_mul": 1 
            },
            { 
                "cnName": "未羊", "arms_type": "wavegun", "attack_gap0": 1, "capacity0": 6, "reload_gap0": 3, 
                "shoot_angle0": 0, "shake_angle0": 0, "shoot_range0": 1080, "bullet_num": 1, "get_dps_mul": 1.3, 
                "dps_mul": 1.9, "ui_dps_mul": 2.3, "show_dps_mul": 0, "base_special_num": 3, "skill_num": 1, 
                "god_skill_num": 1, "evo_lv": 1, "ea_dps_mul0": 0.85, "ea_dps0": 0, "ea_hurt_mul0": 0, 
                "ea_hurt0": 0, "ea_capacity_mul0": 0, "ea_capacity0": 0, "ea_reload0": 0, "get_hurt_add": 5, 
                "get_capacity_mul": 0.2, "get_attack_gap_add": 1, "get_reload_mul": 1, "get_angle_add_mul": 1 
            },
            { 
                "cnName": "寅虎", "arms_type": "cutter", "attack_gap0": 0.8, "capacity0": 8, "reload_gap0": 2, 
                "shoot_angle0": 1, "shake_angle0": 0, "shoot_range0": 666, "bullet_num": 1, "get_dps_mul": 1.3, 
                "dps_mul": 1.9, "ui_dps_mul": 2.3, "show_dps_mul": 0, "base_special_num": 3, "skill_num": 2, 
                "god_skill_num": 2, "evo_lv": 1, "ea_dps_mul0": 0, "ea_dps0": 0, "ea_hurt_mul0": 0, 
                "ea_hurt0": 0, "ea_capacity_mul0": 0, "ea_capacity0": 0, "ea_reload0": 0, "get_hurt_add": 5, 
                "get_capacity_mul": 0.2, "get_attack_gap_add": 1, "get_reload_mul": 1, "get_angle_add_mul": 1 
            },
            { 
                "cnName": "卡特巨炮", "arms_type": "rocket", "attack_gap0": 1.4, "capacity0": 7, "reload_gap0": 3, 
                "shoot_angle0": 60, "shake_angle0": 0, "shoot_range0": 918, "bullet_num": 10, "get_dps_mul": 1.3, 
                "dps_mul": 1.8, "ui_dps_mul": 2, "show_dps_mul": 0, "base_special_num": 4, "skill_num": 2, 
                "god_skill_num": 3, "evo_lv": 13, "ea_dps_mul0": 0.3, "ea_dps0": 0, "ea_hurt_mul0": 0, 
                "ea_hurt0": 0, "ea_capacity_mul0": 0, "ea_capacity0": 0, "ea_reload0": 0, "get_hurt_add": 7.5, 
                "get_capacity_mul": 1, "get_attack_gap_add": 1, "get_reload_mul": 1, "get_angle_add_mul": 1 
            },
            { 
                "cnName": "隼武", "arms_type": "energy", "attack_gap0": 0.7, "capacity0": 15, "reload_gap0": 1, 
                "shoot_angle0": 1, "shake_angle0": 0, "shoot_range0": 912, "bullet_num": 3, "get_dps_mul": 1.3, 
                "dps_mul": 3.5, "ui_dps_mul": 2, "show_dps_mul": 0, "base_special_num": 2, "skill_num": 2, 
                "god_skill_num": 3, "evo_lv": 4, "ea_dps_mul0": 0, "ea_dps0": 0, "ea_hurt_mul0": 0, 
                "ea_hurt0": 0, "ea_capacity_mul0": 0, "ea_capacity0": 0, "ea_reload0": 0, "get_hurt_add": 0.5, 
                "get_capacity_mul": 1, "get_attack_gap_add": 1, "get_reload_mul": 1, "get_angle_add_mul": 1 
            },
            { 
                "cnName": "极源", "arms_type": "lightning", "attack_gap0": 0.8, "capacity0": 13, "reload_gap0": 2, 
                "shoot_angle0": 1, "shake_angle0": 0, "shoot_range0": 1290, "bullet_num": 1, "get_dps_mul": 1.3, 
                "dps_mul": 0.5, "ui_dps_mul": 1.49, "show_dps_mul": 0, "base_special_num": 2, "skill_num": 2, 
                "god_skill_num": 2, "evo_lv": 4, "ea_dps_mul0": 0, "ea_dps0": 0, "ea_hurt_mul0": 0, 
                "ea_hurt0": 0, "ea_capacity_mul0": 0, "ea_capacity0": 0, "ea_reload0": 0, "get_hurt_add": 0.5285714285714286, 
                "get_capacity_mul": 0.2, "get_attack_gap_add": 1, "get_reload_mul": 1, "get_angle_add_mul": 1 
            },
            { 
                "cnName": "处女座", "arms_type": "blink", "attack_gap0": 0.5, "capacity0": 15, "reload_gap0": 1, 
                "shoot_angle0": 0, "shake_angle0": 0, "shoot_range0": 1200, "bullet_num": 1, "get_dps_mul": 1.3, 
                "dps_mul": 8, "ui_dps_mul": 2.27, "show_dps_mul": 0, "base_special_num": 4, "skill_num": 2, 
                "god_skill_num": 2, "evo_lv": 14, "ea_dps_mul0": 0, "ea_dps0": 0, "ea_hurt_mul0": 0, 
                "ea_hurt0": 0, "ea_capacity_mul0": 0, "ea_capacity0": 0, "ea_reload0": 0, "get_hurt_add": 0.5, 
                "get_capacity_mul": 1, "get_attack_gap_add": 1, "get_reload_mul": 1, "get_angle_add_mul": 1 
            },
            { 
                "cnName": "天秤座", "arms_type": "rocket", "attack_gap0": 0.8, "capacity0": 10, "reload_gap0": 2, 
                "shoot_angle0": 0, "shake_angle0": 0, "shoot_range0": 804, "bullet_num": 1, "get_dps_mul": 1.3, 
                "dps_mul": 1, "ui_dps_mul": 1.8, "show_dps_mul": 0, "base_special_num": 3, "skill_num": 2, 
                "god_skill_num": 2, "evo_lv": 10, "ea_dps_mul0": 0, "ea_dps0": 0, "ea_hurt_mul0": 0, 
                "ea_hurt0": 0, "ea_capacity_mul0": 0, "ea_capacity0": 0, "ea_reload0": 0, "get_hurt_add": 7.5, 
                "get_capacity_mul": 1, "get_attack_gap_add": 1, "get_reload_mul": 1, "get_angle_add_mul": 1 
            }
        ],
        weaponsDataMap: {},
        init: function() {
            this.weaponsData.sort((a, b) => a.cnName.localeCompare(b.cnName, 'zh-Hans-CN'));
            this.weaponsData.forEach(weapon => {
                weapon.attack_speed0 = weapon.attack_gap0 > 0 ? (1 / weapon.attack_gap0) : 0;
                this.weaponsDataMap[weapon.cnName] = weapon;
            });
        }
    };
    DATA_STORE.init();

    // ===================================================================
    // 模块 2: CALC_LOGIC - 纯计算模块
    // ===================================================================
    const CALC_LOGIC = {
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
        // 将长三元运算符链改为更易读的 if/else if 结构
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
            const results = {};

            const { 
                getDpsByLv, getHurtmulByStrengthenlv, getUiDpsMul, getDpsValueByLv, 
                getCapacityValueByLv, getAttackGapValueByLv, getReloadValueByLv, 
                getPrecisionValueByLv, getShootRangeValueByLv, getMulByLv, 
                getHurt, getPrecision 
            } = this;
            const { 
                YEAR_WEAPON_NAMES, DARKGOLD_WEAPON_NAMES, ROCKETCATE_NAMES, 
                YEAR_HURT_MUL_ARR, DARKGOLD_HURT_MUL_ARR, 
                ROCKETCATE_HURT_MUL_ARR, HURT_MUL_ARR 
            } = DATA_STORE;

            // --- 基础属性计算 ---
            let armsLv = Math.max(1, Math.min(99, inputs.arms_lv));
            results.dps0 = getDpsByLv(armsLv + 5);
            results.strengthen_hurt_mul = getHurtmulByStrengthenlv(inputs.strengthen_lv);

            // --- 进阶与颜色相关计算 ---
            let evoHurtMul = 0;
            if (YEAR_WEAPON_NAMES.includes(inputs.arms_name)) {
                evoHurtMul = (YEAR_HURT_MUL_ARR[inputs.evo_lv] || 0) / 100;
            } else if (DARKGOLD_WEAPON_NAMES.includes(inputs.arms_name)) {
                evoHurtMul = (DARKGOLD_HURT_MUL_ARR[inputs.evo_lv] || 0) / 100;
            } else if (ROCKETCATE_NAMES.includes(inputs.arms_name)) {
                evoHurtMul = (ROCKETCATE_HURT_MUL_ARR[inputs.evo_lv] || 0) / 100;
            } else {
                evoHurtMul = (HURT_MUL_ARR[inputs.evo_lv] || 0) / 100;
            }
            results.evo_hurt_mul = evoHurtMul;

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
            if (results.arms_color !== "purgold" && results.arms_color !== "yagold" && !YEAR_WEAPON_NAMES.includes(inputs.arms_name) && inputs.arms_name !== "天秤座") {
                if (godSkillNum > 0) godSkillNum -= 1;
            }
            results.skill_special_mul = 1 + (inputs.base_special_num + inputs.skill_num) * 0.15 + godSkillNum * 0.2;
            results.ele_add_dps = inputs.element / 100 * 0.3;

            // --- 战力与伤害核心计算 (dps1, hurt1, hurt_ratio) ---
            let dps0_calculate = results.dps0 * inputs.get_dps_mul * inputs.dps_mul;
            results.hurt_ratio0 = getHurt(inputs.reload_gap0, inputs.capacity0, inputs.attack_gap0, inputs.bullet_num, 1, inputs.shake_angle0, inputs.shoot_angle0, inputs.shoot_range0, dps0_calculate);
            
            let dps1_base = dps0_calculate * (1 + inputs.parts_dps_mul) * (1 + inputs.ea0_dps_mul + inputs.ea_dps_mul0);
            let dps1_add = (inputs.ea_dps0 + inputs.ea0_dps + results.parts_dps + inputs.pet_dps) * inputs.get_dps_mul * inputs.dps_mul;
            let dps1 = (dps1_base + dps1_add) * (1 + inputs.vip_dps_mul) * (1 + inputs.whole_dps_mul) * (1 + inputs.more_dps_mul);
            results.dps1 = dps1;
            results.hurt_add1 = getHurt(inputs.reload_gap0, inputs.capacity0, inputs.attack_gap0, inputs.bullet_num, 1, inputs.shake_angle0, inputs.shoot_angle0, inputs.shoot_range0, dps1) - results.hurt_ratio0;
            
            let hurt1 = results.hurt_ratio0 * (1 + inputs.ea0_hurt_mul + results.strengthen_hurt_mul + inputs.ea_hurt_mul0) + inputs.get_hurt_add * (inputs.ea0_hurt + inputs.ea_hurt0) + results.hurt_add1;
            results.hurt1 = hurt1;

            let hurtRatio = hurt1 * (1 + inputs.dps_all + inputs.hurt_all) * results.evo_hurt_mul * (1 + inputs.red_hurt_mul) * (1 + inputs.zodiac_hurt_add);
            results.hurt_ratio = hurtRatio;

            // --- 面板属性计算 (弹容, 射速, 装弹, 精准, 射程) ---
            let capacityReal = inputs.capacity0 * (1 + inputs.ea0_capacity_mul + inputs.ea_capacity_mul0 + results.parts_capacity_mul) + inputs.ea0_capacity * inputs.get_capacity_mul + inputs.ea_capacity0;
            results.capacity_real = capacityReal;
            results.capacity = Math.ceil(capacityReal);
            
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

    // ===================================================================
    // 模块 3: UI_HANDLER - 页面交互模块
    // ===================================================================
    const UI_HANDLER = {
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



    // ===================================================================
    // 模块 4: STORAGE_HANDLER - 本地存储模块
    // ===================================================================
    const STORAGE_HANDLER = {
        KEY: 'bqtj_calculator_data',
        save: function() {
            try {
                const dataToSave = {};
                 UI_HANDLER.$form.find('input:not([readonly]), select').each(function() {
                    const $el = $(this);
                    if ($el.attr('id')) {
                        dataToSave[$el.attr('id')] = $el.val();
                    }
                });
                localStorage.setItem(this.KEY, JSON.stringify(dataToSave));
                 alert('数据已成功记录到您的浏览器中！');
            } catch (e) {
                console.error("保存到localStorage失败:", e);
                alert("数据保存失败，可能是浏览器存储已满。");
            }
        },
        load: function() {
            try {
                const data = localStorage.getItem(this.KEY);
                return data ? JSON.parse(data) : null;
            } catch (e) {
                console.error("从localStorage加载数据失败:", e);
                return null;
            }
        },
        clear: function() {
            localStorage.removeItem(this.KEY);
        }
    };

    // ===================================================================
    // 模块 5: App - 主应用程序控制器
    // ===================================================================
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
});