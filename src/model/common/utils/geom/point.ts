// frontend/src/data/archive/common/utils/geom/Point.ts

/**
 * Point 对象表示二维坐标系中的某个位置。
 * 它复刻了 flash.geom.Point 的核心功能。
 */
export class Point {
    public x: number;
    public y: number;

    constructor(x: number = 0, y: number = 0) {
        this.x = x;
        this.y = y;
    }

    /**
     * 返回一个新的 Point 对象，其值为此 Point 对象与传入的 Point 对象的 x 和 y 值之和。
     * @param v 要添加的 Point 对象。
     * @returns 一个新的 Point 对象。
     */
    public add(v: Point): Point {
        return new Point(this.x + v.x, this.y + v.y);
    }

    /**
     * 克隆 Point 对象。
     * @returns 一个新的 Point 实例，其 x 和 y 与当前实例相同。
     */
    public clone(): Point {
        return new Point(this.x, this.y);
    }
    
    /**
     * 将源 Point 对象中的所有点数据复制到当前 Point 对象中。
     * @param sourcePoint 要从中复制数据的 Point 对象。
     */
    public copyFrom(sourcePoint: Point): void {
        this.x = sourcePoint.x;
        this.y = sourcePoint.y;
    }

    /**
     * 比较两个点是否相等。
     * @param toCompare 要比较的 Point 对象。
     * @returns 如果两个点具有相同的 x 和 y 值，则返回 true。
     */
    public equals(toCompare: Point): boolean {
        return this.x === toCompare.x && this.y === toCompare.y;
    }
    
    /**
     * 将 Point 的成员设置为指定值。
     * @param x x 坐标。
     * @param y y 坐标。
     */
    public setTo(x: number, y: number): void {
        this.x = x;
        this.y = y;
    }

    /**
     * 返回一个新的 Point 对象，其值为此 Point 对象与传入的 Point 对象的 x 和 y 值之差。
     * @param v 要减去的 Point 对象。
     * @returns 一个新的 Point 对象。
     */
    public subtract(v: Point): Point {
        return new Point(this.x - v.x, this.y - v.y);
    }

    /**
     * 返回此 Point 对象的字符串表示形式。
     * 格式为 "(x=x, y=y)"。
     */
    public toString(): string {
        return `(x=${this.x}, y=${this.y})`;
    }

    // ==========================================================
    // 静态方法 (Static Methods)
    // ==========================================================
    
    /**
     * 返回 pt1 和 pt2 之间的距离。
     * @param pt1 第一个点。
     * @param pt2 第二个点。
     * @returns 两点之间的距离。
     */
    public static distance(pt1: Point, pt2: Point): number {
        const dx = pt1.x - pt2.x;
        const dy = pt1.y - pt2.y;
        return Math.sqrt(dx * dx + dy * dy);
    }
    
    /**
     * 通过将两个点（作为向量）相加来确定一个新点。
     * @param pt1 第一个点。
     * @param pt2 第二个点。
     * @returns 新的点。
     */
    public static add(pt1: Point, pt2: Point): Point {
        return new Point(pt1.x + pt2.x, pt1.y + pt2.y);
    }
}