const Mutations = {
  // async createItem(parent, args, ctx, info) {
  //   const item = await ctx.db.mutation.createItem(
  //     {
  //       data: { ...args }
  //     },
  //     info
  //   );
  //   return item;
  // },
  // updateItem(parent, args, ctx, info) {
  //   const update = { ...args };
  //   delete update.id;
  //   return ctx.db.mutation.updateItem(
  //     { data: update, where: { id: args.id } },
  //     info
  //   );
  // },
  // deleteItem(parent, args, ctx, info) {
  //   return ctx.db.mutation.deleteItem({ where: { id: args.id } }, info);
  // },
  // createMovie() {
  // }
};

module.exports = Mutations;
