"""Genera src/assets/baretico-mark.json — PIEZA ORIGINAL del equipo (Lottie).
Concepto: Baretico se "arma" para salir: aparece la cabeza con rebote, bajan las
gafas, la gorra sube (anticipación), cae y aplasta la cabeza (squash), las orejas
siguen moviéndose después del golpe (follow-through) y queda posando.
Ejecutar: python3 design/build-lottie.py
"""
import json, pathlib

FR, OP = 30, 120
def rgb(h): h = h.lstrip('#'); return [int(h[i:i+2], 16) / 255 for i in (0, 2, 4)] + [1]
BROWN, BROWN_L, NOSE = rgb('#4A2C20'), rgb('#6A4331'), rgb('#111111')
NEON, LENS, CAMO, CAMO_D = rgb('#6BFF2E'), rgb('#2A7A12'), rgb('#5E7F2F'), rgb('#3C5420')

def st(v): return {"a": 0, "k": v}
def kf(*frames, out=(0.6, 0), inn=(0.3, 1)):
    ks = []
    for i, (t, s, *e) in enumerate(frames):
        k = {"t": t, "s": s}
        if i < len(frames) - 1:
            o, n = (e[0] if e else out), (e[1] if len(e) > 1 else inn)
            k["o"] = {"x": [o[0]] * len(s), "y": [o[1]] * len(s)}
            k["i"] = {"x": [n[0]] * len(s), "y": [n[1]] * len(s)}
        ks.append(k)
    return {"a": 1, "k": ks}

def el(cx, cy, w, h): return {"ty": "el", "d": 1, "s": st([w, h]), "p": st([cx, cy])}
def rc(cx, cy, w, h, r=0): return {"ty": "rc", "d": 1, "s": st([w, h]), "p": st([cx, cy]), "r": st(r)}
def fl(c): return {"ty": "fl", "c": st(c), "o": st(100), "r": 1}
def sk(c, w): return {"ty": "st", "c": st(c), "o": st(100), "w": st(w), "lc": 2, "lj": 2, "ml": 4}
def path(v, i, o, closed=True): return {"ty": "sh", "ks": st({"v": v, "i": i, "o": o, "c": closed})}
def gr(*items): return {"ty": "gr", "it": list(items) + [{"ty": "tr", "p": st([0, 0]), "a": st([0, 0]), "s": st([100, 100]), "r": st(0), "o": st(100)}]}

fade = kf((0, [100]), (104, [100]), (118, [0]))
def layer(ind, nm, anchor, shapes, p=None, s=None, r=None, o=None):
    return {"ddd": 0, "ind": ind, "ty": 4, "nm": nm, "sr": 1, "ao": 0, "ip": 0, "op": OP, "st": 0, "bm": 0,
            "ks": {"a": st(anchor + [0]), "p": p or st(anchor + [0]), "s": s or st([100, 100, 100]),
                   "r": r or st(0), "o": o or fade}, "shapes": shapes}

# Cabeza: pop con overshoot (0-18) y squash al recibir la gorra (52-62).
head_s = kf((0, [0, 0, 100]), (10, [112, 112, 100], (0.3, 0), (0.4, 1)), (16, [96, 96, 100]), (20, [100, 100, 100]),
            (50, [100, 100, 100]), (54, [108, 90, 100], (0.2, 0), (0.4, 1)), (62, [97, 103, 100]), (68, [100, 100, 100]))
head = layer(4, "cabeza", [100, 170], [
    gr(el(100, 134, 24, 16), fl(NOSE)),
    gr(el(100, 144, 58, 42), fl(BROWN_L)),
    gr(el(86, 108, 12, 12), fl(NOSE)), gr(el(114, 108, 12, 12), fl(NOSE)),
    gr(el(100, 112, 118, 112), fl(BROWN)),
], s=head_s)
# Orejas: follow-through tras el golpe de la gorra.
def ear(ind, x, sign):
    return layer(ind, "oreja", [x, 92], [gr(el(x, 126, 36, 74), fl(BROWN))], s=head_s,
                 r=kf((0, [0]), (52, [0]), (58, [18 * sign]), (66, [-10 * sign]), (74, [5 * sign]), (82, [0])))
# Gafas: bajan desde arriba con rebote corto (18-34).
glasses = layer(2, "gafas", [100, 108], [
    gr(path([[96, 102], [104, 102]], [[0, 0], [0, 0]], [[0, 0], [0, 0]], False), sk(NEON, 5)),
    gr(el(78, 106, 42, 42), fl(LENS), sk(NEON, 7)), gr(el(122, 106, 42, 42), fl(LENS), sk(NEON, 7)),
], p=kf((0, [100, -40, 0]), (18, [100, -40, 0]), (30, [100, 112, 0], (0.5, 0), (0.25, 1)), (34, [100, 106, 0]), (38, [100, 108, 0])))
# Gorra: anticipación (sube) → cae acelerando → aplasta → rebota.
cap = layer(1, "gorra", [100, 82], [
    gr(rc(100, 86, 132, 12, 6), fl(CAMO_D)),
    gr(path([[44, 84], [100, 40], [156, 84]], [[0, 0], [-31, 0], [0, -24]], [[0, -24], [31, 0], [0, 0]]), fl(CAMO)),
    gr(el(100, 66, 30, 12), fl(NEON)),
], p=kf((0, [100, -80, 0]), (36, [100, -80, 0]), (42, [100, -96, 0], (0.4, 0), (0.6, 1)), (52, [100, 84, 0], (0.6, 0), (0.95, 0.6)),
        (58, [100, 76, 0]), (64, [100, 83, 0]), (68, [100, 82, 0])),
   s=kf((0, [100, 100, 100]), (50, [92, 112, 100]), (53, [112, 84, 100]), (60, [98, 103, 100]), (66, [100, 100, 100])))

data = {"v": "5.7.4", "fr": FR, "ip": 0, "op": OP, "w": 200, "h": 200, "nm": "baretico-mark", "ddd": 0, "assets": [],
        "layers": [cap, glasses, head, ear(5, 50, -1), ear(6, 150, 1)]}
out = pathlib.Path(__file__).resolve().parent.parent / "src/assets/baretico-mark.json"
out.write_text(json.dumps(data, separators=(",", ":")))
print("ok", out.name, out.stat().st_size, "bytes")
