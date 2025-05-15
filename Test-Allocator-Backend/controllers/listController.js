const XLSX = require('xlsx');
const ListItem = require('../models/listSchema');
const agentDetail = require('../models/agentSchema');

const uploadList = async (req, res) => {
  const buffer = req.file.buffer;
  const ext = req.file.originalname.split('.').pop();

  let items = [];

  if (ext === 'csv') {
    const content = buffer.toString('utf8');
    const lines = content.split('\n').filter(Boolean);
    const headers = lines[0].split(',').map(h => h.trim().toLowerCase());

    if (!['firstname', 'phone', 'notes'].every(h => headers.includes(h))) {
      return res.status(400).json({ message: 'Invalid CSV headers' });
    }

    for (let i = 1; i < lines.length; i++) {
      const row = lines[i].split(',');
      items.push({
        firstName: row[headers.indexOf('firstname')].trim(),
        phone: row[headers.indexOf('phone')].trim(),
        notes: row[headers.indexOf('notes')].trim()
      });
    }

  } else if (ext === 'xlsx' || ext === 'xls') {
    const workbook = XLSX.read(buffer);
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    items = XLSX.utils.sheet_to_json(sheet, { header: ['firstName', 'phone', 'notes'], range: 1 });
  } else {
    return res.status(400).json({ message: 'Unsupported file format' });
  }

  if (!items.length) return res.status(400).json({ message: 'No data found' });

  // Fetch 5 agents
  const agents = await agentDetail.find({ role: 'agent' }).limit(5);
  if (agents.length < 1) return res.status(400).json({ message: 'No agents available' });

  // Distribute items
  const distributed = items.map((item, index) => ({
    ...item,
    agent: agents[index % agents.length]._id
  }));

  await ListItem.insertMany(distributed);
  res.status(201).json({ message: 'List uploaded and distributed successfully' });
}

const getList = async (req, res) => {
  try {
    const items = await ListItem.find().populate('agent', 'name email');

    // Group by agent
    const grouped = {};
    items.forEach(item => {
      const key = item.agent?._id || 'Unassigned';
      if (!grouped[key]) {
        grouped[key] = {
          agent: item.agent || { name: 'Unassigned', email: '' },
          tasks: []
        };
      }
      grouped[key].tasks.push(item);
    });

    res.json(Object.values(grouped));
  } catch (err) {
    res.status(500).json({ message: 'Failed to group tasks', error: err.message });
  }
}

const deleteList = async (req, res) => {
  try {
    const item = await ListItem.deleteMany();
    if (!item) return res.status(400).json({ message: 'List not found'});
    res.status(200).json({ message: 'List deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete list', error: err.message})
  }
}

  module.exports = { uploadList, getList, deleteList};