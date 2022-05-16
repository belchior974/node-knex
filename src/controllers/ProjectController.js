const knex = require("../database");

module.exports = {
  async index(request, response, next) {
    try {
      const { user_id, page = 1 } = request.query;

      const query = knex("projects")
        .limit(10)
        .offset((page - 1) * 10);

      const countObject = knex("projects").count();

      if (user_id) {
        query
          .where({ user_id })
          .join("users", "users.id", "=", "projects.user_id")
          .select("projects.*", "users.username")
          .where("users.deleted_at", null);

        countObject.where({ user_id });
      }

      const [count] = await countObject;
      response.header("X-Total-Count", count["count"]);
      const results = await query;
      return response.json(results);
    } catch (error) {
      next(error);
    }
  },

  async create(request, response, next) {
    try {
      const { title, user_id } = request.body;
      await knex("projects").insert({ title, user_id });
      return response.status(201).send();
    } catch (error) {
      next(error);
    }
  },

  async update(request, response, next) {
    try {
      const { title } = request.body;
      const { id } = request.params;

      await knex("projects").update({ title }).where({ id });

      return response.send();
    } catch (error) {
      next(error);
    }
  },

  async delete(request, response, next) {
    try {
      const { id } = request.params;

      await knex("projects").where({ id }).update("deleted_at", new Date());

      return response.send();
    } catch (error) {
      next(error);
    }
  },
};
