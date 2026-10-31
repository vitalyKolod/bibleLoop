// Static requires let Metro bundle local artwork on iOS, Android and web.
// Screens select semantic states; asset filenames stay in this registry.
const mascotIdle = require('../../../assets/mascot/idle.png');
const mascotPointing = require('../../../assets/mascot/pointing.png');
export const mascotAssets = {
  idle: mascotIdle,
  happy: mascotIdle,
  thinking: require('../../../assets/mascot/thinking.png'),
  speaking: mascotPointing,
  correct: require('../../../assets/mascot/correct.png'),
  wrong: require('../../../assets/mascot/wrong.png'),
  celebrate: require('../../../assets/mascot/celebrate.png'),
  reading: mascotPointing,
  pointing: mascotPointing,
} as const;
export const abrahamAssets = {
  idle: require('../../../assets/characters/abraham/idle.png'),
  happy: require('../../../assets/characters/abraham/happy.png'),
  thinking: require('../../../assets/characters/abraham/thinking.png'),
  speaking: require('../../../assets/characters/abraham/speaking.png'),
  praying: require('../../../assets/characters/abraham/praying.png'),
  pointing: require('../../../assets/characters/abraham/pointing.png'),
  walking: require('../../../assets/characters/abraham/walking.png'),
  celebrate: require('../../../assets/characters/abraham/celebrate.png'),
} as const;
