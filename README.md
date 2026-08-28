# 爆枪突击 - 极限战力速查表

基于游戏内战斗力量化模型构建的战力计算工具，输出 VIP 等级 × 总统状态的极限战力速查表。

---

## 在线访问

~~[www.bqtj-calculator.com](https://www.bqtj-calculator.com)~~（已停用）

---

## 功能特性

- **极限战力表**：横轴为 VIP 等级（v0 分 4/5/6 格 ~ v10），纵轴为总统有/无，每格为 Top6 武器汇总人物总战力
- **九大乘区精确计算**：完整实现基础属性→战力加成→伤害加成→神级加成→弹容/射速/装弹/精准度→战力显示的全链路
- **极限配置**：基于当前版本极限军队（109级）+ 军衔（联邦大元帅）+ 96级零件 + 满进阶

---

## 技术栈

- **TypeScript** — 全量类型安全
- **Vite** — 开发服务器 + 生产构建
- **class-transformer** — JSON → 模型实例映射
- 无其他外部运行时依赖

---

## 命令

```bash
npm install        # 安装依赖
npm run dev        # 启动开发服务器（热更新）
npm run build      # 类型检查 + 生产构建 → dist/
npm run preview    # 预览生产构建
```

---

## 项目结构

```
src/
├── main.ts                         ← 应用入口：渲染战力表
├── calculate/
│   ├── core/
│   │   ├── single.ts               ← 单武器九乘区计算
│   │   ├── bonus.ts                ← Bonus 类：满配加成数据
│   │   └── grid.ts                 ← 极限战力表生成
│   └── utils/
│       ├── base.ts                 ← 等级/战力基础函数
│       ├── parts.ts                ← 零件系数查表 + 零件效能函数
│       ├── evo.ts                  ← 进阶系数查表
│       └── armsDataCreator.ts      ← 精准度/射程/伤害计算
├── model/                          ← 武器/子弹数据模型
└── data/
    └── arms.json                   ← 181 把武器静态数据
```

## 旧版项目

旧版交互式计算器（jQuery + 原生 JS）保留在 [`archive/legacy-ui`](../../tree/archive/legacy-ui) 分支，可通过 Git Worktree 检出对比：

```bash
git worktree add ../bqtj-calculator-legacy archive/legacy-ui
```

---

## 免责声明

数据均为模拟计算，但与游戏实际分毫不差，已经广泛验证。项目没有防呆设计，若遇到计算误差或问题，请优先自查。
