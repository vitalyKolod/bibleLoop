import { test, expect, jest } from '@jest/globals';
import { createSoundController } from '../src/shared/audio/controller';
function player() {
  return { pause: jest.fn(), seekTo: jest.fn(async () => {}), play: jest.fn() };
}
function setup() {
  const players = { correct: player(), incorrect: player(), complete: player() };
  let enabled = true;
  return {
    players,
    controller: createSoundController(players, () => enabled),
    mute: () => {
      enabled = false;
    },
  };
}
test('muting prevents playback', async () => {
  const s = setup();
  s.mute();
  await s.controller.play('correct');
  expect(s.players.correct.play).not.toHaveBeenCalled();
});
test('a later sound cancels an earlier pending seek', async () => {
  const s = setup();
  let resolve!: () => void;
  s.players.correct.seekTo.mockImplementation(
    () =>
      new Promise<void>((done) => {
        resolve = done;
      }),
  );
  const first = s.controller.play('correct');
  await s.controller.play('complete');
  resolve();
  await first;
  expect(s.players.correct.play).not.toHaveBeenCalled();
  expect(s.players.complete.play).toHaveBeenCalledTimes(1);
});
test('muting during a seek prevents delayed playback', async () => {
  const s = setup();
  const pending = s.controller.play('correct');
  s.mute();
  s.controller.stop();
  await pending;
  expect(s.players.correct.play).not.toHaveBeenCalled();
});
test('audio failures do not interrupt lessons', async () => {
  const s = setup();
  s.players.incorrect.seekTo.mockRejectedValue(new Error('unavailable'));
  await expect(s.controller.play('incorrect')).resolves.toBeUndefined();
});
