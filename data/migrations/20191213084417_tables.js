
exports.up = function(knex) {
  return knex.schema
    .createTable('project', tbl => {
        tbl.increments();
        tbl.string('project_name', 255)
        .notNullable()
        tbl.string('project_description', 255)
        .nullable()
        tbl.boolean('completed')
        .defaultTo(false)
    })
    .createTable('resource', tbl => {
        tbl.increments();
        tbl.string('resource_name', 255)
        .notNullable()
        .unique()
        tbl.string('resource_description')
        .nullable()
    })
    .createTable('task', tbl => {
        tbl.increments();
        tbl.string('task_description', 255)
        .notNullable()
        tbl.string('task_notes')
        .nullable()
        tbl.boolean('task_completed')
        .defaultTo(false)
        tbl.integer('project_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('project')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
    })
    .createTable('project_resources', tbl => {
        tbl.increments();
        tbl.integer('resource_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('resource')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
        tbl.integer('project_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('project')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
    })
};

exports.down = function(knex) {
    return knex.schema
    .dropTableIfExists('project')
    .dropTableIfExists('resource')
    .dropTableIfExists('task')
    .dropTableIfExists('project_resources');
};
