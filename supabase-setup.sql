-- 在 Supabase SQL Editor 中运行此脚本

-- 创建 files 表（支持文件夹）
CREATE TABLE IF NOT EXISTS files (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  content TEXT DEFAULT '',
  is_folder BOOLEAN DEFAULT FALSE,
  parent_id TEXT,
  path TEXT DEFAULT '/',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 创建更新时间触发器
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = timezone('utc'::text, now());
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_files_updated_at
  BEFORE UPDATE ON files
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- 启用行级安全（可选，如需认证）
ALTER TABLE files ENABLE ROW LEVEL SECURITY;

-- 允许所有操作（开发环境，生产环境建议添加认证）
CREATE POLICY "Enable all access for all users"
  ON files FOR ALL
  USING (true)
  WITH CHECK (true);
