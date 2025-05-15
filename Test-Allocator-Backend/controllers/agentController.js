const bcrypt = require('bcryptjs');
const agentSchema = require('../models/agentSchema');

const agentAdd = async (req, res) => {
  const { name, email, mobile, password } = req.body;

  const existingUser = await agentSchema.findOne({ email });
  if (existingUser) return res.status(400).json({ message: 'Email already in use' });

  const hashedPassword = await bcrypt.hash(password, 10);
  const newAgent = new agentSchema({ name, email, mobile, password: hashedPassword, role: 'agent' });

  await newAgent.save();
  res.status(201).json({ message: 'Agent added successfully' });
}

const getAgents = async (req, res) => {
  try {
    const agents = await agentSchema.find();
    return res.json(agents);
  } catch (error) {
    return res.status(500).json({ message: 'Error fetching agents' });
  }
}

const deleteAgent = async (req, res) => {
  try {
    const agentId = req.params.id;
    console.log(agentId);
    const agent = await agentSchema.findByIdAndDelete(agentId);

    if (!agent) 
      return res.status(404).json({ message: 'Agent not found' });

    res.json({ message: 'Agent deleted successfully' });
  } catch (error) {
    return res.status(500).json({ message: 'Error deleting agent' });
  }
};



module.exports = { agentAdd, getAgents, deleteAgent };