//# 引入mock
const Mock = require('mockjs');
//# 获取list数据的接口
Mock.mock('/todolist', 'get', function(options) {
    let a = [];
    for (let i = 0; i < 5; i++) {
        let o = Mock.mock({
            _id: "@id()",
            title: '@string("lower",5)',
            completed: "@boolean"
        })
        a.push(o)
    }
    return a
});
//# 添加数据的接口
Mock.mock('/addtodo', 'post', function(options) {
    let o = JSON.parse(options.body);
    return Mock.mock({
        _id: "@id()",
        title: o.title,
        completed: false
    })
});