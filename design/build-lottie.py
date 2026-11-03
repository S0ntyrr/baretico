"""Genera src/assets/obra-negra-mark.json: la pieza original del equipo (Lottie).
Concepto: el logo se "construye": se trazan la formaleta (marco), entra el
colado naranja con anticipación y rebote, cae la varilla y todo se sostiene.
Ejecutar: python3 design/build-lottie.py
"""
import json, pathlib

FR, OP = 30, 120
BLACK = [0.067, 0.067, 0.067, 1]
ORANGE = [1, 0.353, 0.122, 1]

def ease(t, s, out=(0.7, 0), inn=(0.3, 1)):
    return {"t": t, "s": s, "o": {"x": [out[0]] * len(s), "y": [out[1]] * len(s)},
            "i": {"x": [inn[0]] * len(s), "y": [inn[1]] * len(s)}}

def kf(*frames):
    """frames: (t, value_list, [out],[in]) ; last frame has no easing."""
    ks = [ease(*f) if i < len(frames) - 1 else {"t": f[0], "s": f[1]} for i, f in enumerate(frames)]
    return {"a": 1, "k": ks}

def st(v): return {"a": 0, "k": v}

def tr_layer(p, s=None, o=None, a=(0, 0, 0)):
    return {"o": o or st(100), "r": st(0), "p": p if isinstance(p, dict) else st(p),
            "a": st(list(a)), "s": s or st([100, 100, 100])}

def group(items):
    return {"ty": "gr", "nm": "g", "it": items + [{"ty": "tr", "p": st([0, 0]), "a": st([0, 0]),
            "s": st([100, 100]), "r": st(0), "o": st(100), "sk": st(0), "sa": st(0)}]}

def rect(w, h, x=0, y=0): return {"ty": "rc", "d": 1, "s": st([w, h]), "p": st([x, y]), "r": st(0)}
def fill(c): return {"ty": "fl", "c": st(c), "o": st(100), "r": 1}
def stroke(c, w): return {"ty": "st", "c": st(c), "o": st(100), "w": st(w), "lc": 1, "lj": 1, "ml": 4}

fade = kf((0, [100]), (100, [100]), (118, [0]))

def layer(ind, nm, ks, shapes):
    return {"ddd": 0, "ind": ind, "ty": 4, "nm": nm, "sr": 1, "ks": ks, "ao": 0,
            "shapes": shapes, "ip": 0, "op": OP, "st": 0, "bm": 0}

# 1. Formaleta (marco) trazada con trim path. Anticipación: se encoge a 94% antes del colado.
frame = layer(3, "formaleta",
    tr_layer([100, 100, 0], s=kf((0, [100, 100, 100]), (28, [100, 100, 100]), (36, [94, 94, 100]),
                                 (44, [103, 103, 100], (0.2, 0), (0.4, 1)), (54, [100, 100, 100])), o=fade),
    [group([rect(128, 128), stroke(BLACK, 12),
            {"ty": "tm", "s": st(0), "e": kf((0, [0]), (30, [100])), "o": st(45), "m": 1}])])

# 2. Colado naranja: crece desde la base con rebote (aceleración + follow-through).
pour = layer(2, "colado",
    tr_layer([100, 158, 0], s=kf((0, [100, 0, 100]), (36, [100, 0, 100]), (48, [100, 112, 100], (0.5, 0), (0.2, 1)),
                                 (56, [100, 96, 100]), (62, [100, 100, 100])), o=fade),
    [group([rect(104, 52, 0, -26), fill(ORANGE)])])

# 3. Varilla: barra negra que cae desde arriba y asienta (anticipación: sube primero).
bar = layer(1, "varilla",
    tr_layer(kf((0, [100, -30, 0]), (56, [100, -30, 0]), (62, [100, -40, 0]),
                (74, [100, 86, 0], (0.6, 0), (0.15, 1)), (80, [100, 82, 0]), (86, [100, 84, 0])), o=fade),
    [group([rect(104, 10), fill(BLACK)])])

data = {"v": "5.7.4", "fr": FR, "ip": 0, "op": OP, "w": 200, "h": 200, "nm": "obra-negra-mark",
        "ddd": 0, "assets": [], "layers": [bar, pour, frame]}
out = pathlib.Path(__file__).resolve().parent.parent / "src/assets/obra-negra-mark.json"
out.write_text(json.dumps(data, separators=(",", ":")))
print("ok", out, out.stat().st_size, "bytes")
