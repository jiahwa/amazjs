const {addPrivateProperty, trace, isFunction, isArray, memorizer, memorize, array, partial, enumeration} = require("./interface");

// test enumeration
/**
 * Chinese Chess
 * 中国象棋
 * @param {object} conf 属性配置
 * @argument {string} rank 军衔
 * @argument {string} side 阵营
 * @argument {[x, y]} position 坐标
 */
var Chess = function(conf) {
    conf = {
        rank: conf.rank,
        side: conf.side,
        position: conf.position
    };
    this.rank = conf.rank;
    this.side = conf.side;
    this.position = conf.position;
};
// 使用枚举类型工厂定义军衔
Chess.Rank = enumeration({
    instance: {
        general: 1,     // 将|帅
        advisors: 2,    // 士
        elephants: 3,   // 相|象
        chariots: 4,    // 车
        horses: 5,      // 马
        cannons: 6,     // 炮
        soldiers: 7     // 卒|兵
    }
})
// 使用枚举类型工厂定义红黑阵营
Chess.Side = enumeration({
    instance: {
        Red: 1,     // 红方
        Black: 2    // 黑方
    }
});
// 使用枚举类型工厂定义棋子坐标
Chess.Position = enumeration({
    instance: {
        general: [[5, 1], [5, 10]],
        advisors: [[4, 1], [6, 1], [4, 10], [6, 10]],
        elephants: [[3, 1], [7, 1], [3, 10], [7, 10]],
        horses: [[2, 1], [8, 1], [2, 10], [8, 10]],
        chariots: [[1, 1], [10, 1], [1, 10], [10, 10]],
        cannons: [[2, 3], [8, 3], [2, 8], [8, 8]],
        soldiers: [[1, 4], [3, 4], [5, 4], [7, 4], [10, 4],
                    [1, 7], [3, 7], [5, 7], [7, 7], [9, 7]]
    }
});
// 定义描述棋子的特征
Chess.prototype.toString = function() {
    return this.rank + " of " + this.side;
};

// 判断下一步棋着的位置
Chess.prototype.moveTo = function() {
    
}

