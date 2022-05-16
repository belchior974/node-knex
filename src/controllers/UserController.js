const knex = require("../database");

module.exports = {
  async index(request, response) {
    const results = await knex("users").where("deleted_at", null);
    return response.status(200).json(results);
  },

  async getById(request, response, next) {
    try {
      const { id } = request.params;

      const results = await knex("users").where({ id });
      return response.status(200).json(results);

    } catch (error) {
      next(error);
    }
  },

  async create(request, response, next) {
    try {
      const { username } = request.body;
      await knex("users").insert({ username });
      return response.status(201).send();
    } catch (error) {
      next(error);
    }
  },

  async update(request, response, next) {
    try {
      const { username } = request.body;
      const { id } = request.params;

      await knex("users").update({ username }).where({ id });

      return response.send();
    } catch (error) {
      next(error);
    }
  },

  async delete(request, response, next) {
    try {
      const { id } = request.params;
      await knex("users").where({ id }).update("deleted_at", new Date());
      return response.status(200).json({ mensagem: `O usuário de ID ${id} foi apagado com sucesso :)` })
    } catch (error) {
      next(error);
    }
  },
};
