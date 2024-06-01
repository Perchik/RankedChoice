const loadSvgs = (context: __WebpackModuleApi.RequireContext) => {
  return context.keys().map(context);
};

export const bodySvgs = loadSvgs(
  require.context("../../public/svgs/body", false, /\.svg$/)
);
export const hairSvgs = loadSvgs(
  require.context("../../public/svgs/hair", false, /\.svg$/)
);
