const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;
const DATA_FILE = '/data/files.json';

// 确保数据文件存在
if (!fs.existsSync(DATA_FILE)) {
    fs.writeFileSync(DATA_FILE, JSON.stringify({
        'test1': {
            id: 'test1',
            name: 'test1.md',
            content: '# 标题\n\n## 二级标题\n\n这是 **粗体** 和 *斜体* 文本。\n\n- 列表项 1\n- 列表项 2\n- 列表项 3\n\n```javascript\nconsole.log("Hello, World!");\n```\n\n[链接示例](https://example.com)'
        },
        'test2': {
            id: 'test2',
            name: 'test2.md',
            content: '**标题**'
        }
    }, null, 2));
}

app.use(express.json());
app.use(express.static('public'));

// 获取所有文件
app.get('/api/files', (req, res) => {
    const data = JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
    res.json(Object.values(data));
});

// 创建文件
app.post('/api/files', (req, res) => {
    const data = JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
    const file = { ...req.body, updated_at: new Date().toISOString() };
    data[file.id] = file;
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
    res.json(file);
});

// 更新文件
app.put('/api/files/:id', (req, res) => {
    const data = JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
    const { id } = req.params;
    if (data[id]) {
        data[id] = { ...data[id], ...req.body, updated_at: new Date().toISOString() };
        fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
        res.json(data[id]);
    } else {
        res.status(404).json({ error: 'File not found' });
    }
});

// 删除文件
app.delete('/api/files/:id', (req, res) => {
    const data = JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
    const { id } = req.params;
    if (data[id]) {
        delete data[id];
        fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
        res.status(204).end();
    } else {
        res.status(404).json({ error: 'File not found' });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
