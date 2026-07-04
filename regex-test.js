const p = String.raw`(?=(?:\D*\d){7,15}\D*$)[0-9\(\)+.\s\-]+`;
console.log("pattern:", p);
const re = new RegExp("^(?:" + p + ")$", "v");
console.log("source:", re.source);
console.log("plain digits (10):", re.test("4064146472"));
console.log("formatted:", re.test("(406) 414-6472"));
console.log("spoofed (18):", re.test("329083528039580923"));
console.log("short (3):", re.test("123"));
