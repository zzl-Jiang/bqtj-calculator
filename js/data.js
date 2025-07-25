export const DATA_STORE = {
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