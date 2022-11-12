const akaneko = require("akaneko");
let a: any;
async function yourFunctionName() {
  a = await akaneko.nsfw.hentai();
}

yourFunctionName();

export default (req: any, res: any) => {
  setTimeout(() => res.status(200).json({url: `${a}`}), 500);
};
