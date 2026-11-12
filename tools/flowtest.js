/* node tools/flowtest.js: print every preset's path through every flowchart (each must end at its source's answer). */
global.window = global; require('../src/flows.js');
const D = window.FLOWS.paths;
for (const name of Object.keys(D)) {
  console.log('== ' + name);
  for (const c of D[name].cases) {
    const r = D[name].path(JSON.parse(JSON.stringify(c.v)));
    console.log('  ' + c.b.padEnd(24) + (r.err ? 'ERR ' + r.err : r.steps.map(s => s.n + (s.val ? '(' + s.val.replace(/<[^>]+>/g, '') + ')' : '')).join(' → ') + '  ⇒ ' + r.dx));
  }
}
