const buttons = document.querySelectorAll('.btn');

buttons.forEach((button) => {
  button.addEventListener('click', () => {
    button.classList.add('clicked');
    setTimeout(() => button.classList.remove('clicked'), 200);
  });
});

const canvas = document.getElementById('weightCanvas');
const slider = document.getElementById('weightSlider');
const ctx = canvas?.getContext('2d');
const image = new Image();
image.src = 'assets/weightloss-slider.jpg';

const drawImage = (value = 0) => {
  if (!ctx || !canvas || !image.complete) return;
  const baseWidth = canvas.width;
  const baseHeight = canvas.height;
  const maxFactor = 0.35;
  const intensity = (value / 100) * maxFactor;

  ctx.clearRect(0, 0, baseWidth, baseHeight);

  // Draw image in horizontal slices with localized scaling around mid-body.
  const slices = 120;
  const sliceH = baseHeight / slices;
  for (let i = 0; i < slices; i += 1) {
    const y = i * sliceH;
    const t = y / baseHeight;
    // Emphasize torso/hip region for a more realistic effect.
    const torsoCenter = 0.55;
    const torsoWidth = 0.28;
    const dist = Math.abs(t - torsoCenter);
    const falloff = Math.max(0, 1 - dist / torsoWidth);
    const scaleX = 1 + intensity * falloff;

    const srcY = y;
    const srcH = sliceH;
    const dstW = baseWidth * scaleX;
    const dstX = (baseWidth - dstW) / 2;

    ctx.drawImage(
      image,
      0,
      srcY,
      baseWidth,
      srcH,
      dstX,
      srcY,
      dstW,
      srcH
    );
  }
};

image.onload = () => drawImage(Number(slider?.value || 0));
slider?.addEventListener('input', (event) => {
  const value = Number(event.target.value);
  drawImage(value);
});
