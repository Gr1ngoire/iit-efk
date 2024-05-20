import { writeFileSync } from "fs";

const clear = ({ filePath }) => writeFileSync(filePath, "");
const append = ({ filePath, content }) =>
  writeFileSync(filePath, content, { flag: "a+" });

export { clear, append };
