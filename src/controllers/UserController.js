import User from "../models/User";

export default {
  async index(req, res) {
    try {
      const users = await User.findAll();
  
      return res.json(users);
    } catch (err) {
      console.log("Erro: " + err);
    }
  },
  async show(req, res) {
    try {
      const id = parseInt(req.params.id);
  
      const user = await User.findOne({
        where: { id: id },
        include: { association: "tasks" }
      });
  
      return res.json(user);
    } catch (err) {
      console.log("Erro: " + err);
    }
  },
  async create(req, res) {
    try {
      const { nick, password_hash } = req.body;
  
      const user = await User.create({ nick, password_hash });
  
      return res.json(user);
    } catch (err) {
      console.log("Erro: " + err);
    }
  },
  async update(req, res) {
    try {
      const { nick, password_hash } = req.body;
      const id = parseInt(req.params.id);
  
      const user = await User.findOne({
        where: { id: id }
      });
  
      if (user.nick != nick) user.nick = nick;
  
      if (user.password_hash != password_hash)
        user.password_hash = password_hash;
  
      user.save();
  
      return res.json(user);
    } catch (err) {
      console.log("Erro: " + err);
    }
  },
  async destroy(req, res) {
    try {
      const id = parseInt(req.params.id);
  
      const user = await User.findOne({
        where: { id: id }
      });
  
      user.destroy();
  
      return res.json();
    } catch (err) {
      console.log("Erro: " + err);
    }
  }
};