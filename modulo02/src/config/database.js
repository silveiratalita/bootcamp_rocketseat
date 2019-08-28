module.exports = {
  dialect: "postgres",
  host: "localhost",
  username: "postgres",
  passwors: "docker",
  database: "gobarber",
  define: {
    timestamps: true,
    underscored: true,
    underescoredAll: true,
  },
};
