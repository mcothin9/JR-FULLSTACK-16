const express = require('express');

const app = express();

/**
 * para: req, res, next
 * application.method(path, callback function/route handler)
 */
app.get('/', (req, res) => {
    // 有 if 判断时一定要有return，避免执行后面的代码
    if (true) {
        res.send('hello, mithcell');
        return;
    }
    // 1
    res.send('hello, mitchell');
    return;
    // 2
    return res.send('hello, mithcell');
});

app.post()

app.listen(3000);

