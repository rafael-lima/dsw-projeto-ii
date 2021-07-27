import User from "../models/User";
import Task from "../models/Task";

export default {
  async index(req, res) {
    try {
      const { user_id } = req.params;
  
      const user = await User.findByPk(user_id, {
        include: { association: "tasks" }
      });
  
      return res.json(user.tasks);
    } catch (err) {
      console.log("Erro:" + err);
    }
  },
  async show(req, res) {
    try {
      const { user_id, id} = req.params;
  
      const task = await Task.findOne({
        where: {
          user_id: user_id,
          id: id
        }
      });
  
      return res.json(task);
    } catch (err) {
      console.log("Erro: " + err);
    }
  },
  async create(req, res) {
    try {
      const { user_id } = req.params;
      const { text, date } = req.body;
  
      const user = await User.findByPk(user_id);
      
      if (user) {
        const task = await Task.create({ text, date, user_id });
  
        return res.json(task);
      } else {
        return res.status(400).json({ error: "User not found." });
      }
    } catch (err) {
      console.log("Erro: " + err);
    }
  },
  async update(req, res) {
    try {
      const { text, date, done } = req.body;
      const { user_id, id } = req.params;
  
      const task = await Task.findOne({
        where: {
          user_id: user_id,
          id: id
        }
      });
  
      task.text = (text != task.text) && text ? text : task.text;
      task.date = (date != task.date) && date ? date : task.date;
      task.done = (done != task.done) && (done != undefined) ? done : task.done;
  
      task.status = task.done || (task.date < Date.now()) ? "ARCHIVED" : "ACTIVE";
  
      task.updated = !task.updated && true;
  
      task.save();
  
      return res.json(task);
    } catch (err) {
      console.log("Erro: " + err);
    }
  },
  async destroy(req, res) {
    try {
      const { user_id, id } = req.params;
  
      const task = await Task.findOne({
        where: {
          user_id: user_id,
          id: id
        }
      });
  
      task.destroy();
  
      return res.json();
    } catch (err) {
      console.log("Erro: " + err);
    }
  },
  async destroyAll(req, res) {
    try {
      const { user_id } = req.params;
  
      const user = await User.findByPk(user_id, {
        include: { association: "tasks" }
      });
  
      user.tasks.forEach((task) => task.destroy());
  
      return res.json();
    } catch (err) {
      console.log("Erro: " + err);
    }
  }
};