module.exports = mongoose => {
  var schema = mongoose.Schema(
      {
        day: Date,
        name: String,
        last_nav_price: Number,
        type: String,
        invested_nav_price: Number,
        unit_no_of_shares: Number,
        profit: Number,
        current_total: Number,
        percentage: Number
      },
      { timestamps: true }
  );

  schema.method("toJSON", function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const Portfolio = mongoose.model("portfolio", schema);

  return Portfolio;
};
