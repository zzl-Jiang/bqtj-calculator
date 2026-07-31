// src/table/renderer.ts
// 纯 DOM 渲染：将战力二维数组渲染为 HTML 表格

/** 格式化大数字（万/亿） */
function formatPower(n: number): string {
  if (n >= 1e8) return (n / 1e8).toFixed(2) + '亿';
  if (n >= 1e4) return (n / 1e4).toFixed(0) + '万';
  return n.toFixed(0);
}

/**
 * 渲染战力速查表到 #power-table
 * @param grid - grid[vip][president]，维度 11×11
 */
export function renderTable(grid: number[][]): void {
  const thead = document.querySelector('#power-table thead');
  const tbody = document.querySelector('#power-table tbody');
  if (!thead || !tbody) return;
  thead.innerHTML = '';
  tbody.innerHTML = '';

  // 表头行
  const headerRow = document.createElement('tr');
  const corner = document.createElement('th');
  corner.className = 'corner';
  corner.textContent = 'VIP ▼ 总统 ▶';
  headerRow.appendChild(corner);
  for (let p = 0; p <= 10; p++) {
    const th = document.createElement('th');
    th.textContent = `总统${p}`;
    headerRow.appendChild(th);
  }
  thead.appendChild(headerRow);

  // 数据行
  const maxVip = grid.length - 1;
  const maxPres = grid[0]?.length ? grid[0].length - 1 : 10;

  for (let v = 0; v < grid.length; v++) {
    const row = document.createElement('tr');
    const label = document.createElement('td');
    label.className = 'row-label';
    label.textContent = `v${v}`;
    row.appendChild(label);

    for (let p = 0; p < grid[v].length; p++) {
      const td = document.createElement('td');
      td.textContent = formatPower(grid[v][p]);
      if (v === maxVip && p === maxPres) {
        td.classList.add('max-cell');
      }
      row.appendChild(td);
    }
    tbody.appendChild(row);
  }
}
