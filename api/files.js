import { supabase } from './config.js';

export default async function handler(req, res) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  const { method, query, body } = req;
  const { id } = query;

  try {
    switch (method) {
      case 'GET':
        // 获取所有文件
        const { data: files, error } = await supabase
          .from('files')
          .select('*')
          .order('created_at', { ascending: true });

        if (error) throw error;
        return res.status(200).json(files);

      case 'POST':
        // 创建新文件
        const { data: newFile, error: createError } = await supabase
          .from('files')
          .insert([{
            id: body.id,
            name: body.name,
            content: body.content
          }])
          .select()
          .single();

        if (createError) throw createError;
        return res.status(201).json(newFile);

      case 'PUT':
        // 更新文件
        const { data: updatedFile, error: updateError } = await supabase
          .from('files')
          .update({
            name: body.name,
            content: body.content,
            updated_at: new Date().toISOString()
          })
          .eq('id', id)
          .select()
          .single();

        if (updateError) throw updateError;
        return res.status(200).json(updatedFile);

      case 'DELETE':
        // 删除文件
        const { error: deleteError } = await supabase
          .from('files')
          .delete()
          .eq('id', id);

        if (deleteError) throw deleteError;
        return res.status(204).end();

      default:
        res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
        return res.status(405).end(`Method ${method} Not Allowed`);
    }
  } catch (error) {
    console.error('API Error:', error);
    return res.status(500).json({ error: error.message });
  }
}
