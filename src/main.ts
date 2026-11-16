// src/main.ts
// 应用入口：极限战力速查表

import 'reflect-metadata';
import { generatePowerGrid, COLUMN_LABELS, FOOTER_NOTES, type PowerGrid } from './calculate/core/grid';
import { ARMSNAMEARR } from './calculate/core/single';

function fmt(n: number): string {
  return (n / 1e8).toFixed(2) + "亿";
}

/** 合并连续相同备注，返回 <td> 数组 */
function buildFooterCells(): string[] {
  const cells: string[] = [];
  for (let i = 0; i < FOOTER_NOTES.length; ) {
    const note = FOOTER_NOTES[i];
    let span = 1;
    while (i + span < FOOTER_NOTES.length && FOOTER_NOTES[i + span] === note) span++;
    const style = span > 1 ? ' style="text-align:center"' : "";
    cells.push(`<td${span > 1 ? ` colspan="${span}"` : ""}${style}>${note}</td>`);
    i += span;
  }
  return cells;
}

function buildTable(title: string, grid: PowerGrid): HTMLTableElement {
  const table = document.createElement("table");
  table.id = "power-table";

  const totalCols = COLUMN_LABELS.length + 1;
  const footerCells = buildFooterCells();

  table.innerHTML = `
    <thead>
      <tr>
        <th colspan="${totalCols}" style="text-align:center;font-size:1.1em;">${title}</th>
      </tr>
      <tr>
        <th class="corner">总统 \\ VIP</th>
        ${COLUMN_LABELS.map((l) => `<th>${l}</th>`).join("")}
      </tr>
    </thead>
    <tbody>
      ${(["无总统", "有总统"] as const).map((label, rowIdx) => `
        <tr>
          <td class="row-label">${label}</td>
          ${(grid[rowIdx] ?? []).map((val, colIdx) => {
            // v0-6格（列2）+ 有总统（行1）在游戏中不可用
            if (colIdx === 2 && rowIdx === 1) return `<td style="color:#999">—</td>`;
            return `<td>${fmt(val)}</td>`;
          }).join("")}
        </tr>`).join("")}
    </tbody>
    <tfoot>
      <tr>
        <td class="row-label">备注</td>
        ${footerCells.join("")}
      </tr>
    </tfoot>`;

  return table;
}

try {
  const loading = document.getElementById("loading-msg");
  const wrapper = document.querySelector(".table-wrapper")!;

  // 表一：不带电弧
  const list1 = ARMSNAMEARR.filter((n) => n !== "electricCurve");
  console.time("战力表（不带电弧）");
  const grid1 = generatePowerGrid(list1);
  console.timeEnd("战力表（不带电弧）");
  wrapper.appendChild(buildTable("爆枪突击 v37.21 极限战力表（不带电弧）", grid1));

  // 表二：带电弧
  const list2 = ["electricCurve", ...ARMSNAMEARR];
  console.time("战力表（带电弧）");
  const grid2 = generatePowerGrid(list2);
  console.timeEnd("战力表（带电弧）");
  wrapper.appendChild(buildTable("爆枪突击 v37.21 极限战力表（带电弧）", grid2));

  // 备注：电弧二（进阶电弧）当前版本尚无法制作，避免误导玩家
  const note = document.createElement("div");
  note.className = "note-warning";
  note.textContent =
    "⚠️ 备注：当前版本「电弧二」（电弧进阶形态）尚无法制作——进阶所需碎片数量已超出当前获取上限、相关获取渠道尚未开放，实际游戏内暂不可获得。上方「带电弧」表为电弧满配（含进阶）的理论数值，仅供参照。";
  wrapper.appendChild(note);

  loading?.remove();
} catch (e) {
  const pre = document.createElement("pre");
  pre.style.cssText = "background:#300;color:#f55;padding:16px;margin:16px;border-radius:8px;";
  pre.textContent = `❌ 错误: ${e instanceof Error ? e.message + "\n\n" + e.stack : String(e)}`;
  document.body.appendChild(pre);
}
