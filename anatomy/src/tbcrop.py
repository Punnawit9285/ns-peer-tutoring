#!/usr/bin/env python3
"""NS I tidbits board -> tb/ns_*.jpg: each tile is a board region (the 3D-app photo with its handwritten labels and notes).
python3 tbcrop.py "NS I Tidbits.pdf" <work>/tb
Rects are in board points (each page is 5000 x 4000). The build reads the tiles as ('tb', key) figures."""
import os, sys
import pymupdf

TILES = {
    # page 1 · back & vertebral column
    'ns_curves': (1, (465, 180, 705, 340)), 'ns_cerv': (1, (20, 110, 470, 590)), 'ns_c7va': (1, (40, 590, 600, 725)),
    'ns_thoracic': (1, (20, 760, 482, 1235)), 'ns_regions': (1, (480, 895, 795, 1125)), 'ns_disc': (1, (20, 1255, 480, 1420)),
    'ns_alpll': (1, (20, 1495, 560, 1720)), 'ns_ivforamen': (1, (25, 1720, 500, 1900)), 'ns_postlig': (1, (20, 1900, 820, 2250)),
    'ns_nuchal': (1, (30, 2078, 360, 2500)), 'ns_erector': (1, (15, 2605, 580, 2960)), 'ns_transverso': (1, (585, 2640, 945, 2872)),
    'ns_splenius': (1, (20, 2980, 560, 3200)), 'ns_backsum': (1, (575, 2960, 945, 3195)), 'ns_longis': (1, (595, 3195, 945, 3430)),
    'ns_subocc': (1, (20, 3205, 560, 3410)),
    # page 1 · skull
    'ns_bones': (1, (975, 80, 1610, 400)), 'ns_ptplates': (1, (1440, 260, 1940, 450)), 'ns_sutures': (1, (975, 440, 1720, 705)),
    'ns_orbitrim': (1, (975, 700, 1250, 885)), 'ns_processes': (1, (975, 975, 1680, 1305)), 'ns_foramina': (1, (975, 1375, 1905, 2005)),
    'ns_base': (1, (975, 2005, 1905, 2340)), 'ns_sella': (1, (962, 2330, 1640, 2700)),
    # page 1 · superficial face & neck, mastication, neck muscles
    'ns_face1': (1, (1940, 116, 2375, 455)), 'ns_face2': (1, (1940, 465, 2420, 795)), 'ns_face3': (1, (1940, 795, 2360, 1245)),
    'ns_face4': (1, (1940, 1245, 2470, 1555)), 'ns_face5': (1, (1940, 1572, 2480, 1865)), 'ns_face6': (1, (1940, 1880, 2740, 2215)),
    'ns_scalp': (1, (2395, 105, 2770, 525)), 'ns_facialn': (1, (2440, 528, 3035, 805)), 'ns_faceart': (1, (2440, 790, 3035, 1245)),
    'ns_mastic': (1, (1940, 2300, 2605, 2565)), 'ns_mandmove': (1, (1940, 2570, 2520, 3045)), 'ns_suprahyoid': (1, (2530, 2555, 2940, 3015)),
    'ns_neckm1': (1, (1940, 3160, 2530, 3495)), 'ns_neckm2': (1, (1940, 3500, 2420, 4000)), 'ns_scalene': (1, (2470, 3080, 3035, 3390)),
    # page 1 · deep face, floor of mouth, salivary glands
    'ns_mandpt': (1, (3050, 120, 3605, 385)), 'ns_maxart': (1, (3640, 120, 4500, 375)), 'ns_pterion': (1, (4490, 120, 4920, 335)),
    'ns_v3a': (1, (3580, 345, 4260, 645)), 'ns_v3b': (1, (4200, 345, 4920, 640)), 'ns_mastnerves': (1, (3700, 640, 4500, 830)),
    'ns_chorda': (1, (4490, 600, 5000, 835)), 'ns_tongue': (1, (3050, 990, 3545, 1610)), 'ns_palate': (1, (3530, 935, 4200, 1530)),
    'ns_palnerves': (1, (4400, 950, 5000, 1420)), 'ns_veli': (1, (3050, 1620, 4010, 1905)), 'ns_salivary': (1, (4250, 1455, 5000, 1925)),
    # page 1 · neck arteries, veins and nerves
    'ns_jugular': (1, (3050, 1985, 3700, 2365)), 'ns_jvnotes': (1, (3050, 2368, 3470, 2665)), 'ns_eca1': (1, (3790, 1985, 4300, 2365)), 'ns_eca2': (1, (4280, 1985, 5000, 2335)),
    'ns_arch': (1, (4620, 2230, 5000, 2660)), 'ns_subcl1': (1, (3480, 2370, 3998, 2695)), 'ns_subcl2': (1, (4000, 2370, 4560, 2760)),
    'ns_vagus1': (1, (3050, 2680, 3420, 3060)), 'ns_vagus2': (1, (3420, 2680, 4070, 3190)), 'ns_rln': (1, (4260, 2680, 5000, 3125)),
    'ns_ansa': (1, (3050, 3050, 3730, 3770)), 'ns_neckmnerves': (1, (3890, 3170, 4910, 3800)), 'ns_carotidtri': (1, (3050, 3770, 3430, 4000)),
    # page 2 · cranial cavity and cranial nerves
    'ns_sinuses': (2, (15, 95, 700, 450)), 'ns_bleeds': (2, (690, 140, 960, 310)), 'ns_cavernous': (2, (630, 300, 960, 615)),
    'ns_cn1': (2, (20, 790, 520, 1225)), 'ns_cn5': (2, (20, 1215, 960, 1420)), 'ns_cn7': (2, (20, 1400, 960, 1785)),
    'ns_cn10': (2, (150, 1770, 960, 2150)), 'ns_ppg': (2, (15, 2370, 960, 3005)), 'ns_otic': (2, (15, 3000, 960, 3505)),
    'ns_pssum': (2, (15, 3510, 960, 3800)),
    # page 2 · brain & spinal cord, bones
    'ns_brainstem': (2, (975, 55, 1905, 475)), 'ns_symtrunk': (2, (975, 515, 1440, 805)), 'ns_cervnerve': (2, (1445, 515, 1905, 805)),
    'ns_willis': (2, (975, 830, 1905, 1565)), 'ns_cordblood': (2, (975, 1630, 1905, 2060)), 'ns_rib': (2, (1180, 2150, 1820, 2445)),
    'ns_soupbones': (2, (975, 2480, 1905, 2745)),
    # page 2 · the parts of the ear, eye and histology boards that belong to these lectures
    'ns_ear': (2, (1950, 2160, 2760, 3000)), 'ns_thyroidclin': (2, (2690, 2580, 3040, 3010)), 'ns_eom': (2, (4440, 510, 4990, 905)),
    'ns_eyenerve': (2, (3040, 1085, 3900, 1405)), 'ns_histo1': (2, (3050, 2990, 4020, 3460)), 'ns_histo2': (2, (3050, 3480, 3720, 3880)),
    'ns_histo3': (2, (3700, 3480, 4420, 3880)),
}

if __name__ == '__main__':
    src, out = sys.argv[1], sys.argv[2]
    os.makedirs(out, exist_ok=True)
    d = pymupdf.open(src)
    for k, (pg, r) in TILES.items():
        r = pymupdf.Rect(r); z = min(3.5, 1500 / max(r.width, r.height))
        d[pg - 1].get_pixmap(matrix=pymupdf.Matrix(z, z), clip=r).save(f'{out}/{k}.jpg', jpg_quality=90)
    print(len(TILES), 'tiles ->', out)
