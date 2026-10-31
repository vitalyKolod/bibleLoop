export type SoundName = 'correct' | 'incorrect' | 'complete';
type Player = { pause: () => void; seekTo: (seconds: number) => Promise<void>; play: () => void };
// A later request or mute invalidates pending seeks so sounds never start late.
export function createSoundController(players: Record<SoundName, Player>, enabled: () => boolean) {
  let sequence = 0;
  function stop() {
    sequence += 1;
    Object.values(players).forEach((player) => {
      try {
        player.pause();
      } catch {
        /* Audio must never block a lesson. */
      }
    });
  }
  async function play(name: SoundName) {
    stop();
    const request = sequence;
    if (!enabled()) return;
    try {
      await players[name].seekTo(0);
      if (request === sequence && enabled()) players[name].play();
    } catch {
      /* Audio is optional, including blocked web playback. */
    }
  }
  return { play, stop };
}
