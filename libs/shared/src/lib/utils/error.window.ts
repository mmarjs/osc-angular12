/**
 * https://speakerdeck.com/bovandersteene/agentconf-where-is-my-error-gone
 * https://github.com/cheeaun/javascript-error-logging
 */
function analyzeError(error: Error) {
  const frames = error.stack.split('\n');
  const firstFrameIndex = 1; // only for Chrome
  const firstFrame = frames[firstFrameIndex].split('/');
  const analyzedFrame = firstFrame[firstFrame.length - 1]
    .replace(/[)]/g, '')
    .split(':');
  const analyzeFunction = frames[firstFrameIndex].trim().split(' ')[1];

  return {
    type: error.name,
    message: error.message,
    function: analyzeFunction,
    fileName: analyzedFrame[0],
    line: analyzedFrame[1],
    column: analyzedFrame[2]
  };
}

export function handleErrors() {
  window.addEventListener('error', function (event: ErrorEvent) {
    console.log(analyzeError(event.error));
  });
}
