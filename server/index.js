import express from 'express';
import cors from 'cors';
import multer from 'multer';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { mkdir } from 'node:fs/promises';
import { pool } from './db.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const publicDirectory = path.resolve(__dirname, '../public');
const uploadDirectory = path.join(publicDirectory, 'uploads');
const app = express();
const port = Number(process.env.PORT ?? 3001);
const tableNames = ['cai_dat_web', 'menu', 'chuyen_khoa', 'bac_si', 'dich_vu', 'bai_viet', 'banner', 'dat_lich', 'lien_he', 'thong_ke_doi_ngu'];
const primaryKeys = { cai_dat_web: 'ma_cai_dat', menu: 'id', chuyen_khoa: 'id', bac_si: 'id', dich_vu: 'id', bai_viet: 'id', banner: 'id', dat_lich: 'id', lien_he: 'id', thong_ke_doi_ngu: 'id' };
const columnsCache = new Map();
const mockStaffStats = [
  { so: 2, label: 'GIÁO SƯ - P. GIÁO SƯ' },
  { so: 5, label: 'TIẾN SĨ - BÁC SĨ CKII' },
  { so: 6, label: 'THẠC SĨ - BÁC SĨ CKI' },
  { so: 40, label: 'BÁC SĨ' },
  { so: 50, label: 'KỸ THUẬT VIÊN' },
  { so: 50, label: 'ĐIỀU DƯỠNG' },
];

await mkdir(uploadDirectory, { recursive: true });
app.use(cors());
app.use(express.json({ limit: '2mb' }));
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static(uploadDirectory));

function assertTable(table) {
  if (!tableNames.includes(table)) {
    const error = new Error('Bảng không được hỗ trợ');
    error.status = 404;
    throw error;
  }
}

async function getColumns(table) {
  assertTable(table);
  if (!columnsCache.has(table)) {
    const [rows] = await pool.query('SELECT COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = ?', [table]);
    columnsCache.set(table, rows.map((row) => row.COLUMN_NAME));
  }
  return columnsCache.get(table);
}

function cleanPayload(payload, columns) {
  return Object.fromEntries(Object.entries(payload ?? {}).filter(([key, value]) => columns.includes(key) && value !== undefined));
}

async function listRows(table, req, res) {
  const columns = await getColumns(table);
  if (!columns.length) {
    return res.json({ data: [], page: 1, limit: Number(req.query.limit) || 50, total: 0, pages: 0 });
  }
  const page = Math.max(Number(req.query.page) || 1, 1);
  const limit = Math.min(Math.max(Number(req.query.limit) || 50, 1), 100);
  const offset = (page - 1) * limit;
  const search = String(req.query.search ?? '').trim();
  const searchColumns = columns.filter((column) => /^(ten|name|title|tieu|mo_ta|slug|email|sdt|trang_thai|gia_tri)/i.test(column));
  const where = [];
  const params = [];
  if (search && searchColumns.length) {
    where.push(`(${searchColumns.map((column) => `\`${column}\` LIKE ?`).join(' OR ')})`);
    params.push(...searchColumns.map(() => `%${search}%`));
  }
  for (const column of columns) {
    if (req.query[column] !== undefined) {
      where.push(`\`${column}\` = ?`);
      params.push(req.query[column]);
    }
  }
  const whereSql = where.length ? ` WHERE ${where.join(' AND ')}` : '';
  const orderColumn = columns.includes(req.query.sort) ? req.query.sort : (primaryKeys[table] ?? 'id');
  const direction = String(req.query.direction).toLowerCase() === 'desc' ? 'DESC' : 'ASC';
  const [rows] = await pool.query(`SELECT * FROM \`${table}\`${whereSql} ORDER BY \`${orderColumn}\` ${direction} LIMIT ? OFFSET ?`, [...params, limit, offset]);
  const [countRows] = await pool.query(`SELECT COUNT(*) AS total FROM \`${table}\`${whereSql}`, params);
  const total = Number(countRows[0].total);
  res.json({ data: rows, page, limit, total, pages: Math.ceil(total / limit) });
}

async function getRow(table, req, res) {
  await getColumns(table);
  const key = primaryKeys[table];
  if (table === 'bac_si') {
    const [rows] = await pool.query(`SELECT bac_si.*, chuyen_khoa.ten_chuyen_khoa FROM bac_si LEFT JOIN chuyen_khoa ON bac_si.chuyen_khoa_id = chuyen_khoa.id WHERE bac_si.\`${key}\` = ? LIMIT 1`, [req.params.id]);
    if (!rows.length) return res.status(404).json({ error: 'Không tìm thấy dữ liệu' });
    return res.json(rows[0]);
  }
  const [rows] = await pool.query(`SELECT * FROM \`${table}\` WHERE \`${key}\` = ? LIMIT 1`, [req.params.id]);
  if (!rows.length) return res.status(404).json({ error: 'Không tìm thấy dữ liệu' });
  res.json(rows[0]);
}

async function createRow(table, req, res) {
  const payload = cleanPayload(req.body, await getColumns(table));
  const entries = Object.entries(payload);
  if (!entries.length) return res.status(400).json({ error: 'Dữ liệu tạo mới đang trống' });
  const [result] = await pool.query(`INSERT INTO \`${table}\` (${entries.map(([key]) => `\`${key}\``).join(', ')}) VALUES (${entries.map(() => '?').join(', ')})`, entries.map(([, value]) => value));
  const key = primaryKeys[table];
  const id = payload[key] ?? result.insertId;
  const [rows] = await pool.query(`SELECT * FROM \`${table}\` WHERE \`${key}\` = ? LIMIT 1`, [id]);
  res.status(201).json(rows[0] ?? { ...payload, [key]: id });
}

async function updateRow(table, req, res) {
  const columns = await getColumns(table);
  const key = primaryKeys[table];
  const payload = cleanPayload(req.body, columns);
  delete payload[key];
  const entries = Object.entries(payload);
  if (!entries.length) return res.status(400).json({ error: 'Không có trường cần cập nhật' });
  await pool.query(`UPDATE \`${table}\` SET ${entries.map(([column]) => `\`${column}\` = ?`).join(', ')} WHERE \`${key}\` = ?`, [...entries.map(([, value]) => value), req.params.id]);
  return getRow(table, req, res);
}

async function deleteRow(table, req, res) {
  await getColumns(table);
  const [result] = await pool.query(`DELETE FROM \`${table}\` WHERE \`${primaryKeys[table]}\` = ?`, [req.params.id]);
  if (!result.affectedRows) return res.status(404).json({ error: 'Không tìm thấy dữ liệu' });
  res.status(204).send();
}

app.get('/api/all', async (req, res, next) => {
  try {
    const [settings] = await pool.query('SELECT * FROM cai_dat_web');
    const [menu] = await pool.query('SELECT * FROM menu WHERE hien_thi = 1 ORDER BY thu_tu');
    const [chuyenkhoa] = await pool.query('SELECT * FROM chuyen_khoa ORDER BY id');
    const [bacsi] = await pool.query('SELECT bac_si.*, chuyen_khoa.ten_chuyen_khoa FROM bac_si LEFT JOIN chuyen_khoa ON bac_si.chuyen_khoa_id = chuyen_khoa.id ORDER BY bac_si.id');
    res.json({ settings, menu, chuyenkhoa, bacsi });
  } catch (error) {
    next(error);
  }
});

app.get('/api/thong-ke-doi-ngu', async (_req, res, next) => {
  try {
    const columns = await getColumns('thong_ke_doi_ngu');
    if (!columns.length) return res.json(mockStaffStats);
    const [rows] = await pool.query('SELECT * FROM thong_ke_doi_ngu ORDER BY thu_tu');
    res.json(rows.map((row) => ({ so: Number(row.so), label: row.label })));
  } catch (error) {
    next(error);
  }
});

for (const table of tableNames) {
  const route = `/api/${table.replaceAll('_', '-')}`;
  app.get(route, (req, res, next) => listRows(table, req, res).catch(next));
  app.get(`${route}/:id`, (req, res, next) => getRow(table, req, res).catch(next));
  app.post(route, (req, res, next) => createRow(table, req, res).catch(next));
  app.put(`${route}/:id`, (req, res, next) => updateRow(table, req, res).catch(next));
  app.delete(`${route}/:id`, (req, res, next) => deleteRow(table, req, res).catch(next));
}

// Giữ URL tin tức cũ để các link public hiện tại không bị gãy.
for (const method of ['get', 'post']) {
  app[method]('/api/tin-tuc', (req, res, next) => {
    const handler = method === 'get' ? listRows : createRow;
    handler('bai_viet', req, res).catch(next);
  });
}
app.get('/api/tin-tuc/:id', (req, res, next) => getRow('bai_viet', req, res).catch(next));
app.put('/api/tin-tuc/:id', (req, res, next) => updateRow('bai_viet', req, res).catch(next));
app.delete('/api/tin-tuc/:id', (req, res, next) => deleteRow('bai_viet', req, res).catch(next));

const upload = multer({
  storage: multer.diskStorage({
    destination: uploadDirectory,
    filename: (_req, file, callback) => callback(null, `${Date.now()}-${Math.random().toString(36).slice(2, 8)}${path.extname(file.originalname).toLowerCase()}`),
  }),
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (_req, file, callback) => callback(null, file.mimetype.startsWith('image/')),
});

app.post('/api/upload', upload.single('file'), (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'Vui lòng chọn một ảnh hợp lệ' });
  res.status(201).json({ url: `/uploads/${req.file.filename}`, filename: req.file.filename });
});

app.use((error, _req, res, _next) => {
  console.error(error);
  res.status(error.status ?? 500).json({ error: error.message ?? 'Lỗi máy chủ' });
});

app.listen(port, () => console.log(`✅ API chạy: http://localhost:${port}/api/all`));