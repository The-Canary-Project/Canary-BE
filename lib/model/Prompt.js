const pool = require('../utils/pool');

module.exports = class Prompt {
  id;
  text;
  imageUrl;
  type;
  teacherId;
  activityName;
  categories;
  answers;
  timer;

  constructor(row) {
    this.id = row.id;
    this.text = row.text;
    this.imageUrl = row.image_url;
    this.type = row.type;
    this.teacherId = row.teacher_id;
    this.activityName = row.activity_name;
    this.categories = row.categories;
    this.answers = row.answers;
    this.timer = row.timer;
  }

  static async insert(prompt) {
    const { rows } = await pool.query(
      `INSERT INTO prompts (
      text,
      image_url,
      type,
      teacher_id,
      activity_name,
      categories,
      answers,
      timer
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      RETURNING *`,
      [
        prompt.text,
        prompt.imageUrl,
        prompt.type,
        prompt.teacherId,
        prompt.activityName,
        JSON.stringify(prompt.categories),
        JSON.stringify(prompt.answers),
        prompt.timer
      ]
    );

    if(!rows[0]) return null;
    return new Prompt(rows[0]);
  }
};
