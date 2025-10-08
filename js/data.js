/**
 * 将 xmltodict 生成的JSON数据，转换为扁平的属性成长表。
 * @param {object} sourceJson - 从python转换来的JSON对象。
 * @returns {object} - 格式化后的JS对象，如 { dps: [5, 7, ...], dpsMul: [0.02, 0.02, ...] }
 */
function transformPropertyJson(sourceJson) {
    const propertyTable = {};

    if (!sourceJson || !sourceJson.data || !Array.isArray(sourceJson.data.pro)) {
        console.error("输入的JSON格式不正确，缺少 data.pro 数组。");
        return propertyTable;
    }

    // 遍历 pro 数组中的每一个属性对象
    for (const prop of sourceJson.data.pro) {
        const name = prop["@name"];
        const textContent = prop["#text"];

        // 如果没有属性名，或者没有数据，就跳过
        if (!name || typeof textContent !== 'string') {
            // 对于没有#text的属性（如dpsAll），创建一个空数组
            if (name) {
                propertyTable[name] = [];
            }
            continue;
        }

        // 处理 #text 字符串
        const values = textContent.trim().split(/\s+/).filter(v => v);

        // 将字符串数组转换为数值数组
        const processedValues = values.map(val => {
            if (val.includes('%')) {
                return parseFloat(val.replace('%', '')) / 100;
            }
            return parseFloat(val);
        });

        propertyTable[name] = processedValues;
    }

    return propertyTable;
}

import equipRangeJson from '../json/equipRange.js'
import itemStrengthenJson from '../json/itemsStrengthen.js'

export const DATA_STORE = {
    YEAR_WEAPON_NAMES: ["辰龙", "未羊", "寅虎"],
    DARKGOLD_WEAPON_NAMES: ["隼武", "极源"],
    ROCKETCATE_NAMES: ["卡特巨炮"],
    CONS_NAMES: ["处女座", "天秤座", "狮子座", "巨蟹座"],
    
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
    CONS_HURT_MUL_ARR: [
        100, 125
    ],
    
    WEAPON_TYPE_NUM_ADD: [1.2, 1.4, 1.6, 1.8, 2, 2.2],
    WEAPON_NUM_ADD: [1, 0.9, 0.8, 0.75, 0.7, 0.7],

    EQUIP_RANGE_TABLE: transformPropertyJson(equipRangeJson),
    ITEM_STRENGTHEN_TABLE: transformPropertyJson(itemStrengthenJson),
    
    weaponsData: [
        { 
            "cnName": "猩焰", "arms_lv": 99, "arms_type": "rocket", "attack_gap0": 1.3, "capacity0": 7, "reload_gap0": 3, 
            "shoot_angle0": 0, "shake_angle0": 0, "shoot_range0": 918, "bullet_num": 1, "get_dps_mul": 1.3, 
            "dps_mul": 1.8, "ui_dps_mul": 2, "show_dps_mul": 0.05, "base_special_num": 4, "skill_num": 2, 
            "god_skill_num": 3, "evo_lv": 15, "ea_dps_mul0": 0.3, "ea_dps0": 0, "ea_hurt_mul0": 0, 
            "ea_hurt0": 0, "ea_capacity_mul0": 0, "ea_capacity0": 0, "ea_reload0": 0, "get_hurt_add": 7.5, 
            "get_capacity_mul": 1, "get_attack_gap_add": 1, "get_reload_mul": 1, "get_angle_add_mul": 1,
            "parts_dps_mul_hunter": 0.3, "parts_dps_mul_chip": 0.3, "strengthen_lv": 28,"parts_dps_lv": 93, 
            "parts_capacity_lv": 93, "parts_attack_gap_lv": 93, "parts_reload_lv": 93, "parts_precision_lv": 0, 
            "parts_shoot_range_lv": 0, "color": "yagold", "element": 55,
        },
        { 
            "cnName": "银狐", "arms_lv": 99, "arms_type": "pistol", "attack_gap0": 0.25, "capacity0": 19, "reload_gap0": 1.5, 
            "shoot_angle0": 0, "shake_angle0": 1, "shoot_range0": 600, "bullet_num": 1, "get_dps_mul": 1.3, 
            "dps_mul": 1.6, "ui_dps_mul": 1.4, "show_dps_mul": 0, "base_special_num": 4, "skill_num": 2, 
            "god_skill_num": 3, "evo_lv": 15, "ea_dps_mul0": 0.11, "ea_dps0": 0, "ea_hurt_mul0": 0, 
            "ea_hurt0": 0, "ea_capacity_mul0": 0, "ea_capacity0": 0, "ea_reload0": 0, "get_hurt_add": 1, 
            "get_capacity_mul": 2, "get_attack_gap_add": 1, "get_reload_mul": 1, "get_angle_add_mul": 1, 
            "parts_dps_mul_hunter": 0.3, "parts_dps_mul_chip": 0.3, "strengthen_lv": 28, "parts_dps_lv": 93, 
            "parts_capacity_lv": 93, "parts_attack_gap_lv": 93, "parts_reload_lv": 93, "parts_precision_lv": 93, 
            "parts_shoot_range_lv": 93, "color": "yagold", "element": 55,
        },
        { 
            "cnName": "青蜂", "arms_lv": 99, "arms_type": "rifle", "attack_gap0": 0.1, "capacity0": 35, "reload_gap0": 4, 
            "shoot_angle0": 0, "shake_angle0": 5, "shoot_range0": 600, "bullet_num": 1, "get_dps_mul": 1.3, 
            "dps_mul": 1.7, "ui_dps_mul": 1, "show_dps_mul": 0, "base_special_num": 4, "skill_num": 2, 
            "god_skill_num": 3, "evo_lv": 15, "ea_dps_mul0": 0.34, "ea_dps0": 0, "ea_hurt_mul0": 0.06, 
            "ea_hurt0": 0, "ea_capacity_mul0": 0, "ea_capacity0": 0, "ea_reload0": 0, "get_hurt_add": 0.4, 
            "get_capacity_mul": 4, "get_attack_gap_add": 0.7, "get_reload_mul": 1, "get_angle_add_mul": 1,
            "parts_dps_mul_hunter": 0.3, "parts_dps_mul_chip": 0.3, "strengthen_lv": 28, "parts_dps_lv": 93, 
            "parts_capacity_lv": 93, "parts_attack_gap_lv": 93, "parts_reload_lv": 93, "parts_precision_lv": 93, 
            "parts_shoot_range_lv": 93, "color": "yagold", "element": 55,
        },
        { 
            "cnName": "金蝉", "arms_lv": 99, "arms_type": "sniper", "attack_gap0": 1.2, "capacity0": 6, "reload_gap0": 4, 
            "shoot_angle0": 0, "shake_angle0": 0, "shoot_range0": 720, "bullet_num": 1, "get_dps_mul": 1.3, 
            "dps_mul": 2.4, "ui_dps_mul": 1, "show_dps_mul": 0, "base_special_num": 4, "skill_num": 2, 
            "god_skill_num": 3, "evo_lv": 15, "ea_dps_mul0": 0.12, "ea_dps0": 0, "ea_hurt_mul0": 0.2, 
            "ea_hurt0": 0, "ea_capacity_mul0": 0, "ea_capacity0": 0, "ea_reload0": 0, "get_hurt_add": 7, 
            "get_capacity_mul": 1, "get_attack_gap_add": 1, "get_reload_mul": 1, "get_angle_add_mul": 1,
            "parts_dps_mul_hunter": 0.3, "parts_dps_mul_chip": 0.3, "strengthen_lv": 28, "parts_dps_lv": 93, 
            "parts_capacity_lv": 93, "parts_attack_gap_lv": 93, "parts_reload_lv": 93, "parts_precision_lv": 93, 
            "parts_shoot_range_lv": 93, "color": "yagold", "element": 55,
        },
        { 
            "cnName": "铄金", "arms_lv": 99, "arms_type": "flamer", "attack_gap0": 0.07, "capacity0": 70, "reload_gap0": 3, 
            "shoot_angle0": 0, "shake_angle0": 5, "shoot_range0": 468, "bullet_num": 1, "get_dps_mul": 1.3, 
            "dps_mul": 2.4, "ui_dps_mul": 1.92, "show_dps_mul": 0, "base_special_num": 1, "skill_num": 0, 
            "god_skill_num": 3, "evo_lv": 15, "ea_dps_mul0": 0.32, "ea_dps0": 0, "ea_hurt_mul0": 0, 
            "ea_hurt0": 0, "ea_capacity_mul0": 0, "ea_capacity0": 0, "ea_reload0": 0, "get_hurt_add": 0.3, 
            "get_capacity_mul": 7, "get_attack_gap_add": 0.5, "get_reload_mul": 1, "get_angle_add_mul": 1,
            "parts_dps_mul_hunter": 0.3, "parts_dps_mul_chip": 0.3, "strengthen_lv": 28, "parts_dps_lv": 93, 
            "parts_capacity_lv": 93, "parts_attack_gap_lv": 93, "parts_reload_lv": 93, "parts_precision_lv": 93, 
            "parts_shoot_range_lv": 0, "color": "yagold", "element": 55,
        },
        { 
            "cnName": "赤鼬", "arms_lv": 99, "arms_type": "shotgun", "attack_gap0": 0.95, "capacity0": 6, "reload_gap0": 2.5, 
            "shoot_angle0": 22, "shake_angle0": 1, "shoot_range0": 600, "bullet_num": 11, "get_dps_mul": 1.3, 
            "dps_mul": 1, "ui_dps_mul": 1, "show_dps_mul": 0, "base_special_num": 4, "skill_num": 2, 
            "god_skill_num": 3, "evo_lv": 15, "ea_dps_mul0": 0.08, "ea_dps0": 0, "ea_hurt_mul0": 0, 
            "ea_hurt0": 0, "ea_capacity_mul0": 0, "ea_capacity0": 0, "ea_reload0": 0, "get_hurt_add": 0.5285714285714286, 
            "get_capacity_mul": 1, "get_attack_gap_add": 1, "get_reload_mul": 1, "get_angle_add_mul": 0.3,
            "parts_dps_mul_hunter": 0.3, "parts_dps_mul_chip": 0.3, "strengthen_lv": 28, "parts_dps_lv": 93, 
            "parts_capacity_lv": 93, "parts_attack_gap_lv": 93, "parts_reload_lv": 93, "parts_precision_lv": 93, 
            "parts_shoot_range_lv": 93, "color": "yagold", "element": 55,
        },
        { 
            "cnName": "光锥", "arms_lv": 99, "arms_type": "laser", "attack_gap0": 0.7, "capacity0": 8, "reload_gap0": 2, 
            "shoot_angle0": 0, "shake_angle0": 0, "shoot_range0": 1080, "bullet_num": 1, "get_dps_mul": 1.3, 
            "dps_mul": 0.7, "ui_dps_mul": 2.65, "show_dps_mul": 0, "base_special_num": 2, "skill_num": 2, 
            "god_skill_num": 3, "evo_lv": 13, "ea_dps_mul0": 0, "ea_dps0": 0, "ea_hurt_mul0": 0, 
            "ea_hurt0": 0, "ea_capacity_mul0": 0, "ea_capacity0": 0, "ea_reload0": 0, "get_hurt_add": 0.3, 
            "get_capacity_mul": 0.2, "get_attack_gap_add": 0, "get_reload_mul": 1, "get_angle_add_mul": 1,
            "parts_dps_mul_hunter": 0.3, "parts_dps_mul_chip": 0.3, "strengthen_lv": 28, "parts_dps_lv": 93, 
            "parts_capacity_lv": 93, "parts_attack_gap_lv": 0, "parts_reload_lv": 93, "parts_precision_lv": 0, 
            "parts_shoot_range_lv": 93, "color": "purgold", "element": 55,
        },
        { 
            "cnName": "辰龙", "arms_lv": 99, "arms_type": "lightning", "attack_gap0": 1.2, "capacity0": 8, "reload_gap0": 2, 
            "shoot_angle0": 15, "shake_angle0": 1, "shoot_range0": 600, "bullet_num": 10, "get_dps_mul": 1.3, 
            "dps_mul": 1.9, "ui_dps_mul": 2.1, "show_dps_mul": 0, "base_special_num": 2, "skill_num": 2, 
            "god_skill_num": 1, "evo_lv": 1, "ea_dps_mul0": 0, "ea_dps0": 0, "ea_hurt_mul0": 0, 
            "ea_hurt0": 0, "ea_capacity_mul0": 0, "ea_capacity0": 0, "ea_reload0": 0, "get_hurt_add": 0.5285714285714286, 
            "get_capacity_mul": 0.2, "get_attack_gap_add": 1, "get_reload_mul": 1, "get_angle_add_mul": 1,
            "parts_dps_mul_hunter": 0.3, "parts_dps_mul_chip": 0.3, "strengthen_lv": 28, "parts_dps_lv": 93, 
            "parts_capacity_lv": 93, "parts_attack_gap_lv": 93, "parts_reload_lv": 93, "parts_precision_lv": 93, 
            "parts_shoot_range_lv": 93, "color": "purgold", "element": 55,
        },
        { 
            "cnName": "未羊", "arms_lv": 99, "arms_type": "wavegun", "attack_gap0": 1, "capacity0": 6, "reload_gap0": 3, 
            "shoot_angle0": 0, "shake_angle0": 0, "shoot_range0": 1080, "bullet_num": 1, "get_dps_mul": 1.3, 
            "dps_mul": 1.9, "ui_dps_mul": 2.3, "show_dps_mul": 0, "base_special_num": 3, "skill_num": 1, 
            "god_skill_num": 1, "evo_lv": 1, "ea_dps_mul0": 0.05, "ea_dps0": 0, "ea_hurt_mul0": 0, 
            "ea_hurt0": 0, "ea_capacity_mul0": 0, "ea_capacity0": 0, "ea_reload0": 0, "get_hurt_add": 5, 
            "get_capacity_mul": 0.2, "get_attack_gap_add": 1, "get_reload_mul": 1, "get_angle_add_mul": 1,
            "parts_dps_mul_hunter": 0.3, "parts_dps_mul_chip": 0.3, "strengthen_lv": 28, "parts_dps_lv": 93, 
            "parts_capacity_lv": 93, "parts_attack_gap_lv": 93, "parts_reload_lv": 93, "parts_precision_lv": 0, 
            "parts_shoot_range_lv": 93, "color": "purgold", "element": 55,
        },
        { 
            "cnName": "寅虎", "arms_lv": 99, "arms_type": "cutter", "attack_gap0": 0.8, "capacity0": 8, "reload_gap0": 2, 
            "shoot_angle0": 1, "shake_angle0": 0, "shoot_range0": 666, "bullet_num": 1, "get_dps_mul": 1.3, 
            "dps_mul": 1.9, "ui_dps_mul": 2.3, "show_dps_mul": 0, "base_special_num": 3, "skill_num": 2, 
            "god_skill_num": 2, "evo_lv": 1, "ea_dps_mul0": 0, "ea_dps0": 0, "ea_hurt_mul0": 0, 
            "ea_hurt0": 0, "ea_capacity_mul0": 0, "ea_capacity0": 0, "ea_reload0": 0, "get_hurt_add": 5, 
            "get_capacity_mul": 0.2, "get_attack_gap_add": 1, "get_reload_mul": 1, "get_angle_add_mul": 1,
            "parts_dps_mul_hunter": 0.3, "parts_dps_mul_chip": 0.3, "strengthen_lv": 28, "parts_dps_lv": 93, 
            "parts_capacity_lv": 93, "parts_attack_gap_lv": 93, "parts_reload_lv": 93, "parts_precision_lv": 93, 
            "parts_shoot_range_lv": 0, "color": "purgold", "element": 55,
        },
        { 
            "cnName": "卡特巨炮", "arms_lv": 99, "arms_type": "rocket", "attack_gap0": 1.4, "capacity0": 7, "reload_gap0": 3, 
            "shoot_angle0": 60, "shake_angle0": 0, "shoot_range0": 918, "bullet_num": 10, "get_dps_mul": 1.3, 
            "dps_mul": 1.8, "ui_dps_mul": 2, "show_dps_mul": 0, "base_special_num": 4, "skill_num": 2, 
            "god_skill_num": 3, "evo_lv": 13, "ea_dps_mul0": 0.3, "ea_dps0": 0, "ea_hurt_mul0": 0, 
            "ea_hurt0": 0, "ea_capacity_mul0": 0, "ea_capacity0": 0, "ea_reload0": 0, "get_hurt_add": 7.5, 
            "get_capacity_mul": 1, "get_attack_gap_add": 1, "get_reload_mul": 1, "get_angle_add_mul": 1,
            "parts_dps_mul_hunter": 0.3, "parts_dps_mul_chip": 0.3, "strengthen_lv": 28, "parts_dps_lv": 93, 
            "parts_capacity_lv": 93, "parts_attack_gap_lv": 93, "parts_reload_lv": 93, "parts_precision_lv": 93, 
            "parts_shoot_range_lv": 0, "color": "purgold", "element": 55,
        },
        { 
            "cnName": "隼武", "arms_lv": 99, "arms_type": "energy", "attack_gap0": 0.7, "capacity0": 15, "reload_gap0": 1, 
            "shoot_angle0": 1, "shake_angle0": 0, "shoot_range0": 912, "bullet_num": 3, "get_dps_mul": 1.3, 
            "dps_mul": 3.5, "ui_dps_mul": 2, "show_dps_mul": 0, "base_special_num": 2, "skill_num": 2, 
            "god_skill_num": 3, "evo_lv": 4, "ea_dps_mul0": 0, "ea_dps0": 0, "ea_hurt_mul0": 0, 
            "ea_hurt0": 0, "ea_capacity_mul0": 0, "ea_capacity0": 0, "ea_reload0": 0, "get_hurt_add": 0.5, 
            "get_capacity_mul": 1, "get_attack_gap_add": 1, "get_reload_mul": 1, "get_angle_add_mul": 1,
            "parts_dps_mul_hunter": 0.3, "parts_dps_mul_chip": 0.3, "strengthen_lv": 28, "parts_dps_lv": 93, 
            "parts_capacity_lv": 93, "parts_attack_gap_lv": 93, "parts_reload_lv": 93, "parts_precision_lv": 93, 
            "parts_shoot_range_lv": 0, "color": "purgold", "element": 55,
        },
        { 
            "cnName": "极源", "arms_lv": 99, "arms_type": "lightning", "attack_gap0": 0.8, "capacity0": 13, "reload_gap0": 2, 
            "shoot_angle0": 1, "shake_angle0": 0, "shoot_range0": 1290, "bullet_num": 1, "get_dps_mul": 1.3, 
            "dps_mul": 0.5, "ui_dps_mul": 1.49, "show_dps_mul": 0, "base_special_num": 2, "skill_num": 2, 
            "god_skill_num": 2, "evo_lv": 4, "ea_dps_mul0": 0, "ea_dps0": 0, "ea_hurt_mul0": 0, 
            "ea_hurt0": 0, "ea_capacity_mul0": 0, "ea_capacity0": 0, "ea_reload0": 0, "get_hurt_add": 0.5285714285714286, 
            "get_capacity_mul": 0.2, "get_attack_gap_add": 1, "get_reload_mul": 1, "get_angle_add_mul": 1,
            "parts_dps_mul_hunter": 0.3, "parts_dps_mul_chip": 0.3, "strengthen_lv": 28, "parts_dps_lv": 93, 
            "parts_capacity_lv": 93, "parts_attack_gap_lv": 93, "parts_reload_lv": 93, "parts_precision_lv": 93, 
            "parts_shoot_range_lv": 0, "color": "purgold", "element": 55,
        },
        { 
            "cnName": "处女座", "arms_lv": 99, "arms_type": "blink", "attack_gap0": 0.5, "capacity0": 15, "reload_gap0": 1, 
            "shoot_angle0": 0, "shake_angle0": 0, "shoot_range0": 1200, "bullet_num": 1, "get_dps_mul": 1.3, 
            "dps_mul": 8, "ui_dps_mul": 2.27, "show_dps_mul": 0, "base_special_num": 4, "skill_num": 2, 
            "god_skill_num": 2, "evo_lv": 14, "ea_dps_mul0": 0, "ea_dps0": 0, "ea_hurt_mul0": 0, 
            "ea_hurt0": 0, "ea_capacity_mul0": 0, "ea_capacity0": 0, "ea_reload0": 0, "get_hurt_add": 0.5, 
            "get_capacity_mul": 1, "get_attack_gap_add": 1, "get_reload_mul": 1, "get_angle_add_mul": 1,
            "parts_dps_mul_hunter": 0.3, "parts_dps_mul_chip": 0.3, "strengthen_lv": 28, "parts_dps_lv": 93, 
            "parts_capacity_lv": 93, "parts_attack_gap_lv": 93, "parts_reload_lv": 93, "parts_precision_lv": 0, 
            "parts_shoot_range_lv": 0, "color": "purgold", "element": 55,
        },
        { 
            "cnName": "天秤座", "arms_lv": 99, "arms_type": "rocket", "attack_gap0": 0.8, "capacity0": 10, "reload_gap0": 2, 
            "shoot_angle0": 0, "shake_angle0": 0, "shoot_range0": 804, "bullet_num": 1, "get_dps_mul": 1.3, 
            "dps_mul": 1, "ui_dps_mul": 1.8, "show_dps_mul": 0, "base_special_num": 3, "skill_num": 2, 
            "god_skill_num": 2, "evo_lv": 10, "ea_dps_mul0": 0, "ea_dps0": 0, "ea_hurt_mul0": 0, 
            "ea_hurt0": 0, "ea_capacity_mul0": 0, "ea_capacity0": 0, "ea_reload0": 0, "get_hurt_add": 7.5, 
            "get_capacity_mul": 1, "get_attack_gap_add": 1, "get_reload_mul": 1, "get_angle_add_mul": 1,
            "parts_dps_mul_hunter": 0.3, "parts_dps_mul_chip": 0.3, "strengthen_lv": 28, "parts_dps_lv": 93, 
            "parts_capacity_lv": 93, "parts_attack_gap_lv": 93, "parts_reload_lv": 93, "parts_precision_lv": 93, 
            "parts_shoot_range_lv": 0, "color": "darkgold", "element": 55,
        },
        { 
            "cnName": "狮子座", "arms_lv": 99, "arms_type": "wavegun", "attack_gap0": 0.45, "capacity0": 17, "reload_gap0": 1.3, 
            "shoot_angle0": 0, "shake_angle0": 0, "shoot_range0": 1100, "bullet_num": 1, "get_dps_mul": 1.3, 
            "dps_mul": 51, "ui_dps_mul": 4.98, "show_dps_mul": 0.05, "base_special_num": 2, "skill_num": 2, 
            "god_skill_num": 1, "evo_lv": 15, "ea_dps_mul0": 0.05, "ea_dps0": 0, "ea_hurt_mul0": 0, 
            "ea_hurt0": 0, "ea_capacity_mul0": 0, "ea_capacity0": 0, "ea_reload0": 0, "get_hurt_add": 5, 
            "get_capacity_mul": 0.2, "get_attack_gap_add": 1, "get_reload_mul": 1, "get_angle_add_mul": 1,
            "parts_dps_mul_hunter": 0.3, "parts_dps_mul_chip": 0.3, "strengthen_lv": 28,"parts_dps_lv": 93, 
            "parts_capacity_lv": 93, "parts_attack_gap_lv": 93, "parts_reload_lv": 93, "parts_precision_lv": 0, 
            "parts_shoot_range_lv": 93, "color": "yagold", "element": 55
        },
        { 
            "cnName": "野黑激", "arms_lv": 99, "arms_type": "laser", "attack_gap0": 0.3, "capacity0": 6, "reload_gap0": 2.5, 
            "shoot_angle0": 0, "shake_angle0": 0, "shoot_range0": 950, "bullet_num": 1, "get_dps_mul": 1.3, 
            "dps_mul": 0.9, "ui_dps_mul": 2.1, "show_dps_mul": 0.05, "base_special_num": 4, "skill_num": 2, 
            "god_skill_num": 3, "evo_lv": 1, "ea_dps_mul0": 0, "ea_dps0": 0, "ea_hurt_mul0": 0, 
            "ea_hurt0": 0, "ea_capacity_mul0": 0, "ea_capacity0": 0, "ea_reload0": 0, "get_hurt_add": 0.3, 
            "get_capacity_mul": 0.2, "get_attack_gap_add": 0, "get_reload_mul": 1, "get_angle_add_mul": 1,
            "parts_dps_mul_hunter": 0.3, "parts_dps_mul_chip": 0.3, "strengthen_lv": 28, "parts_dps_lv": 93, 
            "parts_capacity_lv": 93, "parts_attack_gap_lv": 0, "parts_reload_lv": 93, "parts_precision_lv": 0, 
            "parts_shoot_range_lv": 93, "color": "black", "element": 55,
        }
    ],

    equipData: [
        {
            cnName: "战神的蔑视",
            dps_all_equip_head: 0.87,
            evo_lv: 17, color: "purgold", strengthen_lv: 28, equip_lv: 99, equip_type: "head", baseName: "狂人头盔",
        },
        {
            cnName: "战神的戒严", ea0_dps_coat: 24400, ea0_dps_mul_equip_coat: 0.87, ea0_hurt_mul_equip_coat: 0.87, 
            dps_all_equip_coat: 0.89, ea0_hurt_coat: 12559,
            evo_lv: 17, color: "purgold", strengthen_lv: 28, equip_lv: 99, equip_type: "coat", baseName: "狂人战衣",
        },
        {
            cnName: "战神的讨伐", ea0_dps_pants: 24400, ea0_dps_mul_equip_pants: 0.87, ea0_hurt_mul_equip_pants: 0.87, 
            dps_all_equip_pants: 0.89, ea0_dps_mul_equip_strengthen: 1.06, ea0_hurt_pants: 12559,
            evo_lv: 17, color: "purgold", strengthen_lv: 28, equip_lv: 99, equip_type: "pants", baseName: "狂人战裤",
        },
        {
            cnName: "战神的降临", ea0_capacity_belt: 48, ea0_capacity_mul_belt: 0.87, 
            ea0_reload_belt: 2.08, dps_all_equip_belt: 0.91,
            evo_lv: 17, color: "purgold", strengthen_lv: 28, equip_lv: 99, equip_type: "belt", baseName: "狂人腰带",
        },
    ],

    weaponsDataMap: {},
    equipDataMap: {},

    // 全局动态状态 (State)
    state: {
        // --- 战力加成 ---
        pet_dps: 620250,
        parts_dps_mul: 0.6,
        ea0_dps: 48800,
        ea0_dps_mul: 7.23,
        ea0_dps_mul_equip: 2.8,
        ea0_dps_mul_weapon: 0.50,
        ea0_dps_mul_device: 0.90,
        ea0_dps_mul_title: 1.00,
        ea0_dps_mul_union: 0.60,
        ea0_dps_mul_rank: 0.35,
        ea0_dps_mul_battle: 0.76,
        ea0_dps_mul_honor: 0.14,
        ea0_dps_mul_medal: 0.18,
        vip_dps_mul: 0.7,
        whole_dps_mul: 0.2110,
        more_dps_mul: 0,

        // --- 伤害加成 ---
        ea0_hurt_mul: 1.94,
        ea0_hurt_mul_equip: 1.74,
        ea0_hurt_mul_medal: 0.20,
        ea0_hurt: 25118,
        
        // --- 神级加成 ---
        dps_all: 5.43,
        hurt_all: 2.01,
        dps_all_equip: 3.56,
        dps_all_fashion: 0.23,
        dps_all_vehicle: 0.30,
        dps_all_title: 0,
        dps_all_food: 0.53,
        dps_all_peak: 0.15,
        dps_all_president: 0.40,
        dps_all_card: 0.11,
        dps_all_building: 0.15,
        hurt_all_president: 0.40,
        hurt_all_fashion: 0,
        hurt_all_card: 0.11,
        hurt_all_set: 1.50,
        zodiac_hurt_add: 0,
        red_hurt_mul: 0,

        // --- 弹容加成 ---
        ea0_capacity_mul: 0.87,
        ea0_capacity: 48,

        // --- 射速加成 ---
        ea0_attack_gap: 0.06,

        // --- 装弹加成 ---
        ea0_reload: 2.37,
        ea0_reload_equip: 2.08,
        ea0_reload_medal: 0.28,

        // --- 人物总战力页参数 ---
        quick_vip_lv: 10,
        quick_president_lv: 10,
        quick_whole_dps: 21.1,
        quick_shoot_speed: 6,
        triple_crit: 0.14
    },

    init: function() {
        console.log("装备属性成长表已通过JSON模块导入并转换:", this.EQUIP_RANGE_TABLE);
        console.log("物品强化属性表已通过JSON模块导入并转换:", this.ITEM_STRENGTHEN_TABLE)
        this.weaponsData.sort((a, b) => a.cnName.localeCompare(b.cnName, 'zh-Hans-CN'));
        this.weaponsData.forEach(weapon => {
            weapon.attack_speed0 = weapon.attack_gap0 > 0 ? (1 / weapon.attack_gap0) : 0;
            this.weaponsDataMap[weapon.cnName] = weapon;
        });

        // 处理装备数据
        this.equipData.forEach(equip => {
            this.equipDataMap[equip.baseName] = equip;
        });
    }
};
DATA_STORE.init();