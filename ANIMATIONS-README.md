## Animations setting (home/research)

✨ Quick guide to customizing/changing animations

## D3.js Network Animation (Current)

The new network animation shows a real-time contact network visualization using D3.js. It displays people as nodes and their interactions as links that appear and disappear over time.

### Configuration

All settings are controlled in `src/components/ui/intro-animation/network-config.js`:

```javascript
// Simulation parameters
simulation: {
  numPeople: 40,              // Number of people/nodes in the network
  maxDuration: 300,           // Total simulation duration in seconds
  numContacts: 150,           // Number of contact interactions
  animationSpeed: 100,        // Animation speed in milliseconds per step
},

// Visual appearance
visual: {
  nodeRadius: 8,              // Size of each person/node
  linkDistance: 50,           // Preferred distance between connected nodes
  chargeStrength: -180,       // Force pushing nodes apart (negative = repulsion)
  linkColor: '#000000',       // Color of active connections (black)
  linkOpacity: 0.7,           // Opacity of connections
},
```

### Customizing the Animation

To modify the network animation:

1. **Colors**: Update `nodeColors` array in the config for different node colors
2. **Speed**: Adjust `animationSpeed` to make the animation faster/slower
3. **Network Size**: Change `numPeople` and `numContacts` for larger/smaller networks
4. **Forces**: Modify `chargeStrength` and `linkDistance` to change the layout behavior

### Switching Back to Other Animations

To use a different animation, update `src/pages/index.jsx`:

```jsx
// For D3 Network Animation (current)
import { NetworkAnimation } from '../components/ui/intro-animation/network-animation';
<NetworkAnimation />

// For Static Logo
import { StaticPlaceholder } from '../components/ui/intro-animation/static-placeholder';
<StaticPlaceholder />

// For Original 3D Animation (if issues are resolved)
import { IntroAnimation } from '../components/ui/intro-animation';
<IntroAnimation />
```

---

## Legacy Animation Documentation

To replace the intro animation, implement a new one and place the JS file under ```src/components/ui/intro-animation/animations```. 

Then import the file into ```src/pages/index.js``` like so:

```
import { MyAnimation } from '../components/ui/intro-animation/my-animation';

function IndexPage({ data }) {
	const { news } = data.news.childMarkdownRemark.frontmatter;

	return (
		<Layout>
			<Seo title="Colabo" image="/images/home.png" />
			<HomeHero>
				<MyAnimation />
				<ConditionalComponent data={news}>
					<NewsFeed newsItems={news} />
				</ConditionalComponent>
			</HomeHero>
		</Layout>
	);
}
```

## Original logo & blobs animation from 360D

## ✅ Scene:

Here you can control the camera settings (range, position, scene size).

👉🏻 [GitHub - intro-animation.jsx](https://github.com/glivera-team/colabo-web/blob/f2f39162f288bd8bdd070ff5f5b70824e79e183f/src/components/ui/intro-animation/intro-animation.jsx)

```
<Canvas
    // flat
    linear
    dpr={1}
    className={styles.canvasIn}
    resize={{ scroll: false }}
    camera={{
        near: -1000,
        far: 1000,
        left: frustumSize * aspect - 2,
        right: (frustumSize * aspect) / 2,
        top: frustumSize / 2,
        bottom: frustumSize / -2,
    }}
    orthographic
>
    <CanvasInner aspect={aspect} />
</Canvas>
```

## ✅ Blobs (floating, position, dimensions) animations

1. In this file you can change the settings for individual blobs (desktop/mobile).

👉🏻 [GitHub - constants.js](https://github.com/glivera-team/colabo-web/blob/f2f39162f288bd8bdd070ff5f5b70824e79e183f/src/components/ui/intro-animation/constants.js)

`rangeX`, `rangeY` - min. and max. random position for floating animation

`scale` - changes the total number of parts (points) of the blob, which directly affects performance

`pointSize` - changes the blob point size - does not affect performance

`indent` - increases the distance between parts (points)

```
{
    scale: 0.6,
    position: { x: -0.35, y: -0.25 },
    rangeX: { min: -0.1, max: 0.3 },
    rangeY: { min: -0.4, max: 0.1 },
    indent: 0.01,
    pointSize: 0.6,
}
```

2. Rate of blob movement with floating animation.
   A random value between the numbers a and b indicates the duration of the blob's movement.

`const randomTime = () => getRandomFloat(4, 7);`

👉🏻 [GitHub - floating.js](https://github.com/glivera-team/colabo-web/blob/1dc3b52b1fd43ac1161ab1813d7577b61470d0eb/src/components/ui/intro-animation/animations/floating.js)

3. Hover-effect - moving blobs when hovering the cursor:
   👉🏻 [GitHub - animation-canvas.jsx](https://github.com/glivera-team/colabo-web/blob/535412d5feff22e65efc62a9fd27b6760076ecba/src/components/ui/intro-animation/animation-canvas.jsx)

With the parameter `400` you can adjust the axis movement force when pointing.
The `0.05` and `0.15` are the max. and min. values of the axis movement force when pointing.

```
pointerTl.to(
    $blobsMeshRef.current?.material.uniforms.uPointerPower.value,
    {
        x: -gsap.utils.clamp(-0.05, 0.05, deltaX / 400),
        y: gsap.utils.clamp(-0.15, 0.15, deltaY / (400 * aspect)),
        duration: 1,
        ease: 'Power1.inOut',
        onComplete: () => pointerLeaveAnim(),
    },
);
```

4. The color of the blobs is set in this file:
   👉🏻 [GitHub - blobs-color-change.js](https://github.com/glivera-team/colabo-web/blob/7826d10cbd313f79a0d6fdb57d7145fe2026ce75/src/components/ui/intro-animation/animations/blobs-color-change.js)

`const colorsArray = [0xffdd4a, 0xff7bce, 0x9b84ff, 0x5ecdff, 0xc6ff55];`

Animation duration and easing as well ( default linear ).

```
{
	ease: 'none',
	duration: 8,
}
```

## ✅ Logo animation

👉🏻 [GitHub - animation-canvas.jsx](https://github.com/glivera-team/colabo-web/blob/535412d5feff22e65efc62a9fd27b6760076ecba/src/components/ui/intro-animation/animation-canvas.jsx)

1. The animation can be replaced by inserting a new animation json into the `animationData` parameter.

`56:`

```
{
	container: document.body,
	renderer: 'canvas',
	rendererSettings: {
	context,
	className: 'lottie-intro-anim',
	},
	animationData: animation,
	loop: false,
}
```

2. The animation resolution (dpr) can be changed with these parameters:

```
51: $canvasRef.current.width = window.innerWidth / 2;
52: $canvasRef.current.height = window.innerHeight / 2;
```

4. Whole size of the animation (like for blobs) can be changed in this part:

`443: <planeGeometry args={[*width*, *height*, 2, 2]} />`

5. An additional distortion effect is applied to the animation.
   The shader program is located in this file:
   👉🏻 [GitHub - logo-material.js](https://github.com/glivera-team/colabo-web/blob/8a8475c746e571d0b7f85199cbeb1fc747d1b956/src/components/ui/intro-animation/materials/logo-material.js)

By changing the x, y values, we control the distortion over time.

```
float wavePower = 40.;
float waveCount = 15.;

float xMult = sin(newUV.y * waveCount) / wavePower;
float yMult = sin(newUV.x * waveCount) / wavePower;

newUV.x = newUV.x + xMult * (sin(uTime) * yMult) * 20. * uDistProgress;
newUV.y = newUV.y + yMult * (sin(uTime) * xMult) * 20. * uDistProgress;
```

In this file you can find GSAP timelines for the `uDistProgress` parameter, it is responsible for the animation progress.
👉🏻 [GitHub - logo-distortion.js](https://github.com/glivera-team/colabo-web/blob/b4ecd56e5c53ecdc1d3d2f2a1b3e1a0d0d062b4d/src/components/ui/intro-animation/animations/logo-distortion.js)

# Research animations

## ✅ Color change effect

This is achieved by changing the `--animated-bg-color` variable for html.

Here you can also change the easing, duration, colors and other settings for the animation.
👉🏻 [GitHub - use-animated-bg.js](https://github.com/glivera-team/colabo-web/blob/a9c38452840f04dbbcdcf05d5097132fee59042f/src/hooks/use-animated-bg/use-animated-bg.js)

## ✅ Lottie animations

👉🏻 [GitHub - area-item.jsx](https://github.com/glivera-team/colabo-web/blob/a9c38452840f04dbbcdcf05d5097132fee59042f/src/components/ui/area-item/area-item.jsx)

Configuration for lottie animations, methods to stop/start on hover.
You can replace the animation by adding the required json to the `animations` object.

```
import epidemologyAnimation from './lotties/epidemology.json';
import visualizationAnimation from './lotties/visualization.json';
import learningAnimation from './lotties/learning.json';

const animations = {
	epidemology: epidemologyAnimation,
	learning: learningAnimation,
	visualization: visualizationAnimation,
};

const defaultOptions = {
	loop: true,
	autoplay: false,
	animationData: animations[animation],
};

const playAnimation = () => {
	if (lottieRef.current) {
		lottieRef.current.play();
	}
};

const pauseAnimation = () => {
	if (lottieRef.current) {
		lottieRef.current.stop();
	}
};
```


