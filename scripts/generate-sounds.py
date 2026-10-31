"""Create original, quiet PCM sound effects. No third-party samples."""
import math
import struct
import wave
from pathlib import Path

RATE = 22050
OUT = Path(__file__).resolve().parents[1] / 'assets' / 'sounds'
OUT.mkdir(parents=True, exist_ok=True)

def render(name, notes, duration):
    samples = []
    for i in range(int(duration * RATE)):
        t = i / RATE
        value = 0
        for start, frequency, length, gain in notes:
            age = t - start
            if 0 <= age < length:
                envelope = min(age / .012, 1) * (1 - age / length) ** 2
                tone = math.sin(2 * math.pi * frequency * age)
                tone += .18 * math.sin(2 * math.pi * frequency * 2 * age)
                value += gain * envelope * tone
        samples.append(struct.pack('<h', int(max(-1, min(1, value)) * 32767)))
    with wave.open(str(OUT / (name + '.wav')), 'wb') as file:
        file.setnchannels(1)
        file.setsampwidth(2)
        file.setframerate(RATE)
        file.writeframes(b''.join(samples))

render('correct', [(0, 659.25, .23, .22), (.09, 880, .3, .2)], .42)
render('incorrect', [(0, 293.66, .2, .17), (.09, 261.63, .22, .13)], .34)
render('complete', [(0, 523.25, .36, .18), (.12, 659.25, .36, .18), (.24, 783.99, .42, .16), (.38, 1046.5, .55, .15)], .96)
