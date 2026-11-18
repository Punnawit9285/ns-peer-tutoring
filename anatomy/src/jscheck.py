import asyncio, json, sys
import os; ROOT = 'site_pub' if os.environ.get('PUBLIC') == '1' else 'site'
from playwright.async_api import async_playwright
async def main():
    async with async_playwright() as p:
        b = await p.chromium.launch(executable_path='/usr/bin/google-chrome', args=['--no-sandbox'])
        for deck in ('ns', 'rs'):
            d = json.load(open(f'/home/claude/work/site_data_{deck.upper()}.json'))
            ids = [it['id'] for s in d['sections'] for it in s['items']]
            for mode in ('student', 'tutor'):
                pg = await b.new_page(viewport={'width': 1300, 'height': 900}); errs = []
                pg.on('pageerror', lambda e: errs.append(str(e)))
                pg.on('console', lambda m: errs.append(m.text) if m.type == 'error' else None)
                await pg.goto(f'file:///home/claude/work/{ROOT}/{deck}/{mode}.html', wait_until='load')
                miss = 0
                for i in ids:
                    await pg.evaluate(f'location.hash = {json.dumps("#" + i)}')
                    await pg.wait_for_timeout(15)
                    ok = await pg.evaluate(f'!!document.querySelector("#present [data-id=\'{i}\']") || !!document.querySelector(".card")')
                    if not ok: miss += 1
                # press keys
                for k in ['ArrowRight', 'Space', 'Enter', 'b', 'b', 'l']:
                    await pg.keyboard.press(k if k != 'Space' else ' ')
                print(deck, mode, len(ids), 'cards; errors:', errs[:5], 'missing', miss)
                await pg.close()
        await b.close()
asyncio.run(main())
