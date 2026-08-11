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

  console.time("战力表");
  const grid = generatePowerGrid(ARMSNAMEARR);
  console.timeEnd("战力表");
  wrapper.appendChild(buildTable("爆枪突击 v36.60 极限战力表", grid));

  loading?.remove();
} catch (e) {
  const pre = document.createElement("pre");
  pre.style.cssText = "background:#300;color:#f55;padding:16px;margin:16px;border-radius:8px;";
  pre.textContent = `❌ 错误: ${e instanceof Error ? e.message + "\n\n" + e.stack : String(e)}`;
  document.body.appendChild(pre);
}
