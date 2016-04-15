module.exports = {
   target: "es5",
   module: "system",
   noImplicitAny: false,
   removeComments: true,
   experimentalAsyncFunctions: true,
   experimentalDecorators: true,
   emitDecoratorMetadata: true,
   optional: [
      "es7.decorators",
      "es7.classProperties"
   ]
};
