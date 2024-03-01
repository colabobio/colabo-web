import { shaderMaterial } from '@react-three/drei';
import * as T from 'three';

export const LogoMaterial = shaderMaterial(
	{
		alphaTest: true,
		uTexture: null,
		uTime: 1,
		uDistProgress: 1,
		uPointer: new T.Vector2(),
		uPointerPower: new T.Vector2(),
		uAspect: 1,
	},
	// vertex shader
	`
			varying vec2 vUv;
			varying vec3 vPosition;
			uniform float uTime;
			void main() {
				vUv = uv;
				vPosition = position;
				vec4 glPos = projectionMatrix * modelViewMatrix * vec4( vPosition, 1.0 );
				gl_Position = glPos;
			}
			`,
	// fragment shader
	`
			varying vec3 vPosition;
			varying vec2 vUv;
			uniform float uTime;
      uniform sampler2D uTexture;
      uniform float uDistProgress;
      uniform vec2 uPointer;
      uniform vec2 uPointerPower;
      uniform float uAspect;

			float distBetween(vec2 currentPos, vec2 pointerPos) {
				vec2 diff = currentPos - pointerPos;
				float distance = sqrt(dot(diff, diff));
				return distance;
			}

			void main()	{
				vec2 newUV = vUv;
				float wavePower = 40.;
				float waveCount = 15.;

				float xMult = sin(newUV.y * waveCount) / wavePower;
				float yMult = sin(newUV.x * waveCount) / wavePower;

				newUV.x = newUV.x + xMult * (sin(uTime) * yMult) * 20. * uDistProgress;
				newUV.y = newUV.y + yMult * (sin(uTime) * xMult) * 20. * uDistProgress;

				vec2 power = clamp(uPointerPower, -.4, .4);

				float dist = distBetween(newUV, vec2(uPointer.x , 1. - uPointer.y ));

				vec2 offset = (1. - dist) * (1. - dist) * power;

				newUV = newUV + offset / 3.;

				vec4 color = texture2D(uTexture, newUV);

				// if (dist <= 0.1) {
				// 	color = vec4(0.,0.,0.,1.);
				// }
        gl_FragColor = color;

			}
		`,
);

export default LogoMaterial;
