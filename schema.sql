-- schema.sql
DROP TABLE IF EXISTS posts;
CREATE TABLE posts (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 添加一些初始数据（可选）
INSERT INTO posts (title, content) VALUES ('Hello World', 'This is the first post on our new CMS!');
INSERT INTO posts (title, content) VALUES ('React Router V7', 'Loaders and Actions are awesome features.');
